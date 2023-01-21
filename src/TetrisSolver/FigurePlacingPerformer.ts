import {FallingFigure, GameData} from "../Tetris/Common";
import {CommandBus, DropFiguresCommand, MoveDownCommand, MoveLeftCommand, MoveRightCommand, TurnClockwiseCommand} from "../Tetris/CommandBus/CommandBus";
import {LevelBasedTimingsHandler} from "../Tetris/TimingsHandler/LevelBasedTimingsHandler";
import {DropPlacingStep, FigurePlacingResult, FigurePlacingStep, MoveXPlacingStep, MoveYPlacingStep, TurnPlacingStep} from "./Common";

class PlacingError extends Error {}
class GameStateNotSupportedError extends PlacingError {}
class InconsistentTargetStateError extends PlacingError {}
class NotSupportedDirectionStepError extends PlacingError {}

class StepDecorator {
    public isPerformed: boolean = false;
    constructor(
        public step: FigurePlacingStep,
    ) {}
}

class TargetState {
    constructor(
        public figures: Map<FallingFigure, FallingFigure>,
        public steps: StepDecorator[]
    ) {}

    static fromFigurePlacingResult(result?: FigurePlacingResult): TargetState|undefined {
        if (result === undefined) {
            return;
        }
        return new TargetState(
            result.figuresTargetStates,
            result.placingSteps.map(step => new StepDecorator(step)),
        );
    }
}

export class FigurePlacingPerformer {
    private nextMoveTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {});
    private targetState?: TargetState;
    private gameData: GameData = GameData.makeSimple();

    constructor(
        private commandBus: CommandBus,
        private timingsHandler = new LevelBasedTimingsHandler(100, 0.9),
    ) {}

    public place(gameData: GameData, placingResult?: FigurePlacingResult) {
        this.gameData = gameData;
        this.targetState = TargetState.fromFigurePlacingResult(placingResult);
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
        const targetFigure = this.targetState.figures.get(originalFigure);
        if (!targetFigure) {
            return;
        }

        if (originalFigure.figure !== targetFigure.figure) {
            throw new InconsistentTargetStateError("Both of the original and the target falling figures must have the same figure in it.");
        }

        let allStepsPassed = this.targetState.steps.every(stepDecorator => {
            if (stepDecorator.isPerformed && !stepDecorator.step.persisted) {
                return true;
            }
            let step = stepDecorator.step;

            if (step instanceof TurnPlacingStep) {
                if (originalFigure.turnState !== step.target) {
                    this.commandBus.run(new TurnClockwiseCommand(this.gameData));
                    return false;
                }
                stepDecorator.isPerformed = true;
            } else if (step instanceof MoveXPlacingStep) {
                if (originalFigure.position.x !== step.target) {
                    if (originalFigure.position.x > step.target) {
                        this.commandBus.run(new MoveLeftCommand(this.gameData));
                    } else {
                        this.commandBus.run(new MoveRightCommand(this.gameData));
                    }
                    return false;
                }
                stepDecorator.isPerformed = true;
            } else if (step instanceof MoveYPlacingStep) {
                if (originalFigure.position.y < step.target) {
                    this.commandBus.run(new MoveDownCommand(this.gameData));
                    return false;
                }
                stepDecorator.isPerformed = true;
            } else if (step instanceof DropPlacingStep) {
                this.commandBus.run(new DropFiguresCommand(this.gameData));
                stepDecorator.isPerformed = true;
            } else {
                throw new NotSupportedDirectionStepError("Unknown step " + step.constructor.name);
            }
            return stepDecorator.isPerformed;
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
