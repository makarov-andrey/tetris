import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";

export class SquashedRowsCounterBasedLevelCounter {
    private squashedRowsCounter = 0;

    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private levelIncreaseOnSquashedRowsNumber: number,
        private maxLevels: number,
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.processInitGameCommand.bind(this))
    }

    private processInitGameCommand(command: InitGameCommand) {
        this.eventBus.on(EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this))
    }

    private onFallTickProcessed(event: FallTickProcessedEvent) {
        if (event.squashedLines.length === 0) {
            return;
        }
        this.squashedRowsCounter++;
        if (this.squashedRowsCounter >= this.levelIncreaseOnSquashedRowsNumber) {
            this.squashedRowsCounter = 0;
            event.gameData.level = Math.min(this.maxLevels, event.gameData.level + 1);
        }
    }
}
