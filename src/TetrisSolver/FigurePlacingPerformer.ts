import {GameData} from "../Tetris/Common";
import {CommandBus, DropFiguresCommand, MoveLeftCommand, MoveRightCommand, TurnClockwiseCommand} from "../Tetris/CommandBus/CommandBus";
import {LevelBasedTimingsHandler} from "../Tetris/TimingsHandler/LevelBasedTimingsHandler";
import {FigurePlacingResult} from "./Common";

class PlacingError extends Error {}
class GameStateNotSupportedError extends PlacingError {}
class InconsistentTargetStateError extends PlacingError {}

export class FigurePlacingPerformer {
    private nextMoveTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {});
    private targetState: FigurePlacingResult|undefined;
    private gameData: GameData = GameData.makeSimple();

    constructor(
        private commandBus: CommandBus,
        private timingsHandler = new LevelBasedTimingsHandler(100, 0.9),
    ) {}

    public place(gameData: GameData, targetState: FigurePlacingResult|undefined) {
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

        if (originalFigure.turnState != targetFigure.turnState) {
            this.commandBus.run(new TurnClockwiseCommand(this.gameData));
        } else if (originalFigure.position.x != targetFigure.position.x) {
            if (originalFigure.position.x > targetFigure.position.x) {
                this.commandBus.run(new MoveLeftCommand(this.gameData));
            } else {
                this.commandBus.run(new MoveRightCommand(this.gameData));
            }
        } else {
            this.commandBus.run(new DropFiguresCommand(this.gameData));
            return;
        }

        // this.processTick();
        this.nextMoveTimeoutId = setTimeout(
            this.processTick.bind(this),
            // 0,
            this.timingsHandler.getDelayForNextTickMs(this.gameData),
        );
    }
}
