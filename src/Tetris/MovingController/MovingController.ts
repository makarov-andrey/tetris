import {CommandBus, CommandType, FiguresFallDownCommand, InitGameCommand, MoveLeftCommand, MoveRightCommand, TurnClockwiseCommand, MoveDownCommand} from "../CommandBus/CommandBus";
import {GameData} from "../GameData";

export class MovingController {
    constructor(
        private commandBus: CommandBus
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.processInitGameCommand.bind(this));
    }

    private processInitGameCommand(command: InitGameCommand) {
        window.onkeydown = event => {
            if (event.code === 'ArrowLeft') {
                this.commandBus.run(new MoveLeftCommand(command.gameData));
            } else if (event.code === 'ArrowRight') {
                this.commandBus.run(new MoveRightCommand(command.gameData));
            } else if (event.code === 'ArrowUp') {
                this.commandBus.run(new TurnClockwiseCommand(command.gameData));
            } else if (event.code === 'ArrowDown') {
                this.commandBus.run(new MoveDownCommand(command.gameData));
            } else if (event.code === 'ArrowDown') {
                this.commandBus.run(new MoveDownCommand(command.gameData));
            } else if (event.code === 'Space') {
                this.commandBus.run(new FiguresFallDownCommand(command.gameData));
            }
        };
    }
}
