import {FallingFigure, GameData} from "../Tetris/Common";
import {CommandBus, DropFiguresCommand, MoveLeftCommand, MoveRightCommand, TurnClockwiseCommand} from "../Tetris/CommandBus/CommandBus";
import {LevelBasedTimingsHandler} from "../Tetris/TimingsHandler/LevelBasedTimingsHandler";

class PlacingError extends Error {}
class GameStateNotSupportedError extends PlacingError {}
class InconsistentTargetStateError extends PlacingError {}

export class FigurePlacingPerformer {
    private nextMoveTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {});
    private targetFallingFiguresStates: Map<FallingFigure, FallingFigure> = new Map();
    private gameData: GameData = GameData.makeSimple();

    constructor(
        private commandBus: CommandBus,
        private timingsHandler = new LevelBasedTimingsHandler(100, 0.9),
    ) {}

    public place(gameData: GameData, targetFallingFiguresStates: Map<FallingFigure, FallingFigure>) {
        this.gameData = gameData;
        this.targetFallingFiguresStates = targetFallingFiguresStates;
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
        const originalFigure = this.gameData.fallingFigures[0];
        const targetFigure = this.targetFallingFiguresStates.get(originalFigure);
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

        this.nextMoveTimeoutId = setTimeout(
            this.processTick.bind(this),
            this.timingsHandler.getDelayForNextTickMs(this.gameData),
        );
    }
}
