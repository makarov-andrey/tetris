import {EventBus, EventType, FiguresSpawnedEvent} from "../Tetris/EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../Tetris/CommandBus/CommandBus";
import {FigurePlacingResolver} from "./FigurePlacingResolver";
import {FigurePlacingPerformer} from "./FigurePlacingPerformer";
import {ScoreCalculator} from "./ScoreCalculator";
import {HolesHelper} from "./HolesHelper";

export class TetrisSolver {
    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private fallingFigurePlacingResolver = new FigurePlacingResolver(
            commandBus,
            new ScoreCalculator(),
            new HolesHelper(),
        ),
        private fallingFiguresPlacer = new FigurePlacingPerformer(commandBus),
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FiguresSpawned, this.onFiguresSpawned.bind(this));
    }

    private onFiguresSpawned(event: FiguresSpawnedEvent) {
        const targetFallingFiguresStates = this.fallingFigurePlacingResolver.resolve(event.gameData);
        this.fallingFiguresPlacer.place(event.gameData, targetFallingFiguresStates);
    }
}
