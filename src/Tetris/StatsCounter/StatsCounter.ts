import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";
import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";

export class StatsCounter {
    constructor(
        private commandBus: CommandBus,
        private eventBus: EventBus,
    ) {
        commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }

    private onFallingTickProcessed(event: FallTickProcessedEvent) {
        event.gameData.stats.figuresFallen += event.transferredToMatrixFigures.length;
        event.gameData.stats.linesSquashed += event.squashedLines.length;
    }
}
