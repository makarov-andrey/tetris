"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardController = void 0;
const CommandBus_1 = require("../CommandBus/CommandBus");
class KeyboardController {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
        this.commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.processInitGameCommand.bind(this));
    }
    processInitGameCommand(command) {
        window.onkeydown = event => {
            if (event.code === 'ArrowLeft') {
                this.commandBus.run(new CommandBus_1.MoveLeftCommand(command.gameData));
            }
            else if (event.code === 'ArrowRight') {
                this.commandBus.run(new CommandBus_1.MoveRightCommand(command.gameData));
            }
            else if (event.code === 'ArrowUp') {
                this.commandBus.run(new CommandBus_1.TurnClockwiseCommand(command.gameData));
            }
            else if (event.code === 'ArrowDown') {
                this.commandBus.run(new CommandBus_1.MoveDownCommand(command.gameData));
            }
            else if (event.code === 'ArrowDown') {
                this.commandBus.run(new CommandBus_1.MoveDownCommand(command.gameData));
            }
            else if (event.code === 'Space') {
                this.commandBus.run(new CommandBus_1.DropFiguresCommand(command.gameData));
            }
        };
    }
}
exports.KeyboardController = KeyboardController;
