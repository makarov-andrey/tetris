import {EventBus, EventType, FiguresSpawnedEvent} from "../Tetris/EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../Tetris/CommandBus/CommandBus";
import {FigurePlacingResolver} from "./FigurePlacingResolver";
import {FigurePlacingPerformer} from "./FigurePlacingPerformer";

export class TetrisSolver {
    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private fallingFigurePlacingResolver = new FigurePlacingResolver(),
        private fallingFiguresPlacer = new FigurePlacingPerformer(commandBus),
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FiguresSpawned, this.onFiguresSpawned.bind(this));
    }

    private onFiguresSpawned(event: FiguresSpawnedEvent) {
        const targetFallingFiguresStates = this.fallingFigurePlacingResolver.resolveTargetPosition(event.gameData);
        this.fallingFiguresPlacer.place(event.gameData, targetFallingFiguresStates);
    }
}
