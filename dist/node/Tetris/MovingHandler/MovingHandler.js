"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingHandler = void 0;
const CommandBus_1 = require("../CommandBus/CommandBus");
const Figures_1 = require("../Figures");
const EventBus_1 = require("../EventBus/EventBus");
const Common_1 = require("../Common");
const FigurePlacingChecker_1 = require("../Utils/FigurePlacingChecker");
const EnumHelper_1 = require("../Utils/EnumHelper");
class MovingHandler {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.commandBus.addHandler(CommandBus_1.CommandType.MoveLeft, this.processMoveLeftCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.MoveRight, this.processMoveRightCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.MoveDown, this.processMoveDownCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.TurnClockwise, this.processTurnClockwiseCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.MoveToX, this.processMoveToXCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.MoveToY, this.processMoveToYCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.TurnToState, this.processTurnToStateCommand.bind(this));
    }
    processMoveLeftCommand(command) {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeMovedLeft = FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new Common_1.Coordinate(figure.position.x - 1, figure.position.y), command.gameData.matrix);
            if (canBeMovedLeft) {
                figure.position.x--;
            }
        });
        this.eventBus.fire(new EventBus_1.FiguresMovedEvent(command.gameData));
    }
    processMoveRightCommand(command) {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeMovedRight = FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new Common_1.Coordinate(figure.position.x + 1, figure.position.y), command.gameData.matrix);
            if (canBeMovedRight) {
                figure.position.x++;
            }
        });
        this.eventBus.fire(new EventBus_1.FiguresMovedEvent(command.gameData));
    }
    processTurnClockwiseCommand(command) {
        const allTurnStates = EnumHelper_1.EnumHelper.ToArray(Figures_1.FigureTurnState);
        command.gameData.fallingFigures.forEach(figure => {
            let nextTurnState = figure.turnState + 1;
            if (!(nextTurnState in allTurnStates)) {
                nextTurnState = allTurnStates[0];
            }
            const canBeTurned = FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(nextTurnState), figure.position, command.gameData.matrix);
            if (canBeTurned) {
                figure.turnState = nextTurnState;
            }
        });
        this.eventBus.fire(new EventBus_1.FiguresMovedEvent(command.gameData));
    }
    processMoveDownCommand(command) {
        this.commandBus.run(new CommandBus_1.FiguresFallTickCommand(command.gameData));
    }
    processMoveToXCommand(command) {
        if (command.x < 0 || command.x > (command.gameData.settings.fieldWidth - 1)) {
            return;
        }
        command.gameData.fallingFigures.forEach(figure => {
            const movingModifier = command.x > figure.position.x ? 1 : -1;
            while (figure.position.x !== command.x && FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new Common_1.Coordinate(figure.position.x + movingModifier, figure.position.y), command.gameData.matrix)) {
                figure.position.x += movingModifier;
            }
        });
        this.eventBus.fire(new EventBus_1.FiguresMovedEvent(command.gameData));
    }
    processMoveToYCommand(command) {
        if (command.y < 0) {
            return;
        }
        command.gameData.fallingFigures.forEach(figure => {
            while (figure.position.y < command.y && FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new Common_1.Coordinate(figure.position.x, figure.position.y + 1), command.gameData.matrix)) {
                figure.position.y++;
            }
        });
        this.eventBus.fire(new EventBus_1.FiguresMovedEvent(command.gameData));
    }
    processTurnToStateCommand(command) {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeTurned = FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(command.turnState), figure.position, command.gameData.matrix);
            if (canBeTurned) {
                figure.turnState = command.turnState;
            }
        });
        this.eventBus.fire(new EventBus_1.FiguresMovedEvent(command.gameData));
    }
}
exports.MovingHandler = MovingHandler;
