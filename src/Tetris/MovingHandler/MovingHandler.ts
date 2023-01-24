import {
    CommandBus,
    CommandType,
    MoveLeftCommand,
    MoveRightCommand,
    TurnClockwiseCommand,
    MoveDownCommand,
    FiguresFallTickCommand,
    MoveToXCommand,
    MoveToYCommand,
    TurnToStateCommand
} from "../CommandBus/CommandBus";
import {FigureTurnState} from "../Figures";
import {EventBus, FiguresMovedEvent} from "../EventBus/EventBus";
import {Coordinate, FallingFigure} from "../Common";
import {FigurePlacingChecker} from "../Utils/FigurePlacingChecker";
import {EnumHelper} from "../Utils/EnumHelper";

export class MovingHandler {
    constructor(
        private commandBus: CommandBus,
        private eventBus: EventBus,
    ) {
        this.commandBus.addHandler(CommandType.MoveLeft, this.processMoveLeftCommand.bind(this));
        this.commandBus.addHandler(CommandType.MoveRight, this.processMoveRightCommand.bind(this));
        this.commandBus.addHandler(CommandType.MoveDown, this.processMoveDownCommand.bind(this));
        this.commandBus.addHandler(CommandType.TurnClockwise, this.processTurnClockwiseCommand.bind(this));
        this.commandBus.addHandler(CommandType.MoveToX, this.processMoveToXCommand.bind(this));
        this.commandBus.addHandler(CommandType.MoveToY, this.processMoveToYCommand.bind(this));
        this.commandBus.addHandler(CommandType.TurnToState, this.processTurnToStateCommand.bind(this));
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
        const allTurnStates = EnumHelper.ToArray(FigureTurnState);
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

    private processMoveToXCommand(command: MoveToXCommand): void {
        if (command.x < 0 || command.x > (command.gameData.settings.fieldWidth - 1)) {
            return;
        }
        command.gameData.fallingFigures.forEach(figure => {
            const movingModifier = command.x > figure.position.x ? 1 : -1;
            while (figure.position.x !== command.x && FigurePlacingChecker.canFigureBePlaced(
                figure.figure.getTurn(figure.turnState),
                new Coordinate(figure.position.x + movingModifier, figure.position.y),
                command.gameData.matrix
            )) {
                figure.position.x += movingModifier;
            }
        });
        this.eventBus.fire(new FiguresMovedEvent(command.gameData));
    }

    private processMoveToYCommand(command: MoveToYCommand): void {
        if (command.y < 0) {
            return;
        }
        command.gameData.fallingFigures.forEach(figure => {
            while (figure.position.y < command.y && FigurePlacingChecker.canFigureBePlaced(
                figure.figure.getTurn(figure.turnState),
                new Coordinate(figure.position.x, figure.position.y + 1),
                command.gameData.matrix
            )) {
                figure.position.y++;
            }
        });
        this.eventBus.fire(new FiguresMovedEvent(command.gameData));
    }

    private processTurnToStateCommand(command: TurnToStateCommand): void {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeTurned = FigurePlacingChecker.canFigureBePlaced(
                figure.figure.getTurn(command.turnState),
                figure.position,
                command.gameData.matrix
            );
            if (canBeTurned) {
                figure.turnState = command.turnState;
            }
        });
        this.eventBus.fire(new FiguresMovedEvent(command.gameData));
    }
}
