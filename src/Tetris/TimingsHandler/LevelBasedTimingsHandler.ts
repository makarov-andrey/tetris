import {TimingsHandler} from "./TimingsHandler";
import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";

export class LevelBasedTimingsHandler implements TimingsHandler {
    private squashedRowsCounter = 0;
    private delayMs = 0;
    private level = 1;

    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private levelIncreaseOnSquashedRowsNumber: number,
        private initialDelayMs: number,
        private maxLevels: number,
        initialLevel: number,
    ) {
        this.delayMs = initialDelayMs
        this.level = initialLevel;
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
            this.level = Math.min(this.maxLevels, this.level + event.squashedLines.length);
        }
    }

    getDelayForNextTickMs(): number {
        return Math.pow(0.8 - (this.level - 1) * 0.007, this.level - 1) * this.initialDelayMs;
    }
}
