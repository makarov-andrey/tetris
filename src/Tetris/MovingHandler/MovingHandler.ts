import {CommandBus, CommandType, MoveLeftCommand, MoveRightCommand, TurnClockwiseCommand, MoveDownCommand, FiguresFallTickCommand} from "../CommandBus/CommandBus";
import {FigureTurnState} from "../Figures";
import {EventBus, FiguresMovedEvent} from "../EventBus/EventBus";
import {Coordinate, FallingFigure} from "../Structures";
import {FigurePlacingChecker} from "../Utils/FigurePlacingChecker";

export class MovingHandler {
    constructor(
        private commandBus: CommandBus,
        private eventBus: EventBus,
    ) {
        this.commandBus.addHandler(CommandType.MoveLeft, this.processMoveLeftCommand.bind(this));
        this.commandBus.addHandler(CommandType.MoveRight, this.processMoveRightCommand.bind(this));
        this.commandBus.addHandler(CommandType.MoveDown, this.processMoveDownCommand.bind(this));
        this.commandBus.addHandler(CommandType.TurnClockwise, this.processTurnClockwiseCommand.bind(this));
    }

    private processMoveLeftCommand(command: MoveLeftCommand): void {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeMovedLeft = FigurePlacingChecker.canFigureBePlaced(
                figure.figure.getTurn(figure.turnState),
                new Coordinate(figure.position.x - 1, figure.position.y),
                command.gameData.matrix
            );
            if (canBeMovedLeft) {
                figure.position.x--;
            }
        });
        this.eventBus.fire(new FiguresMovedEvent(command.gameData));
    }

    private processMoveRightCommand(command: MoveRightCommand): void {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeMovedRight = FigurePlacingChecker.canFigureBePlaced(
                figure.figure.getTurn(figure.turnState),
                new Coordinate(figure.position.x + 1, figure.position.y),
                command.gameData.matrix
            );
            if (canBeMovedRight) {
                figure.position.x++;
            }
        });
        this.eventBus.fire(new FiguresMovedEvent(command.gameData));
    }

    private processTurnClockwiseCommand(command: TurnClockwiseCommand): void {
        const allTurnStates = this.getTurnStatesAsArray();
        command.gameData.fallingFigures.forEach(figure => {
            let nextTurnState = figure.turnState + 1;
            if (!(nextTurnState in allTurnStates)) {
                nextTurnState = allTurnStates[0];
            }
            const canBeTurned = FigurePlacingChecker.canFigureBePlaced(
                figure.figure.getTurn(nextTurnState),
                figure.position,
                command.gameData.matrix
            );
            if (canBeTurned) {
                figure.turnState = nextTurnState;
            }
        });
        this.eventBus.fire(new FiguresMovedEvent(command.gameData));
    }

    private processMoveDownCommand(command: MoveDownCommand): void {
        this.commandBus.run(new FiguresFallTickCommand(command.gameData));
    }

    private getTurnStatesAsArray(): FigureTurnState[] {
        return Object.keys(FigureTurnState)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n)) as unknown as FigureTurnState[];
    }
}
