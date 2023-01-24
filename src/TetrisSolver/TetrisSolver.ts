import {EventBus, EventType, FiguresSpawnedEvent} from "../Tetris/EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../Tetris/CommandBus/CommandBus";
import {FigurePlacingResolver} from "./FigurePlacingResolver/FigurePlacingResolver";
import {FigurePlacingPerformerInterface} from "./FigurePlacingPerformer/FigurePlacingPerformerInterface";

export class TetrisSolver {
    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private figurePlacingResolver: FigurePlacingResolver,
        private figurePlacingPerformer: FigurePlacingPerformerInterface,
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FiguresSpawned, this.onFiguresSpawned.bind(this));
    }

    private onFiguresSpawned(event: FiguresSpawnedEvent) {
        const targetFallingFiguresStates = this.figurePlacingResolver.resolve(event.gameData);
        this.figurePlacingPerformer.place(event.gameData, targetFallingFiguresStates);
    }
}
