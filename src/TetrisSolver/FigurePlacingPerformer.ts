import {GameData} from "../Tetris/Common";
import {CommandBus, DropFiguresCommand, MoveDownCommand, MoveLeftCommand, MoveRightCommand, TurnClockwiseCommand} from "../Tetris/CommandBus/CommandBus";
import {LevelBasedTimingsHandler} from "../Tetris/TimingsHandler/LevelBasedTimingsHandler";
import {DropPlacingStep, FigurePlacingResult, FigurePlacingStep, MoveXPlacingStep, MoveYPlacingStep, TurnPlacingStep} from "./Common";

class PlacingError extends Error {}
class GameStateNotSupportedError extends PlacingError {}
class InconsistentTargetStateError extends PlacingError {}
class NotSupportedDirectionStepError extends PlacingError {}

export class FigurePlacingPerformer {
    private nextMoveTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {});
    private targetState?: FigurePlacingResult;
    private gameData: GameData = GameData.makeSimple();

    constructor(
        private commandBus: CommandBus,
        private timingsHandler = new LevelBasedTimingsHandler(100, 0.9),
    ) {}

    public place(gameData: GameData, targetState?: FigurePlacingResult) {
        this.gameData = gameData;
        this.targetState = targetState;
        clearTimeout(this.nextMoveTimeoutId);
        this.nextMoveTimeoutId = setTimeout(
            this.processTick.bind(this),
            this.timingsHandler.getDelayForNextTickMs(this.gameData),
        );
    }

    private processTick() {
        if (this.gameData.fallingFigures.length === 0) {
            return;
        }
        if (this.gameData.fallingFigures.length !== 1) {
            throw new GameStateNotSupportedError();
        }
        if (this.targetState === undefined) {
            return;
        }
        const originalFigure = this.gameData.fallingFigures[0];
        const targetFigure = this.targetState.figuresTargetStates.get(originalFigure);
        if (!targetFigure) {
            return;
        }

        if (originalFigure.figure !== targetFigure.figure) {
            throw new InconsistentTargetStateError("Both of the original and the target falling figures must have the same figure in it.");
        }

        let allStepsPassed = this.targetState.placingSteps.every(step => {
            if (step instanceof TurnPlacingStep) {
                if (originalFigure.turnState !== step.target) {
                    this.commandBus.run(new TurnClockwiseCommand(this.gameData));
                    return false;
                }
                return true;
            } else if (step instanceof MoveXPlacingStep) {
                if (originalFigure.position.x !== step.target) {
                    if (originalFigure.position.x > step.target) {
                        this.commandBus.run(new MoveLeftCommand(this.gameData));
                    } else {
                        this.commandBus.run(new MoveRightCommand(this.gameData));
                    }
                    return false;
                }
                return true;
            } else if (step instanceof MoveYPlacingStep) {
                if (originalFigure.position.y < step.target) {
                    this.commandBus.run(new MoveDownCommand(this.gameData));
                    return false;
                }
                return true;
            } else if (step instanceof DropPlacingStep) {
                this.commandBus.run(new DropFiguresCommand(this.gameData));
                return true;
            } else {
                throw new NotSupportedDirectionStepError("Unknown step " + step.constructor.name);
            }
        });

        if (!allStepsPassed) {
            // this.processTick();
            this.nextMoveTimeoutId = setTimeout(
                this.processTick.bind(this),
                // 0,
                this.timingsHandler.getDelayForNextTickMs(this.gameData),
            );
        }
    }
}
