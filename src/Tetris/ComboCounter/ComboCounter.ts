import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";

export class ComboCounter {
    constructor(
        public commandBus: CommandBus,
        public eventBus: EventBus,
    ) {
        commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }

    private onFallingTickProcessed(event: FallTickProcessedEvent) {
        if (event.transferredToMatrixFigures.length <= 0) {
            return;
        }
        if (event.squashedLines.length > 0) {
            event.gameData.combo += 1;
        } else {
            event.gameData.combo = 0;
        }
    }
}
