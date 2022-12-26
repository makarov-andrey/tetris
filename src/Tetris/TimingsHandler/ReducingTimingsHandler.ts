import {TimingsHandler} from "./TimingsHandler";
import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";

export class ReducingTimingsHandler implements TimingsHandler {
    private counter = 0;

    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private delayMs: number,
        private decreaseEveryFallenFigure: number,
        private decreaseValue: number,
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.processInitGameCommand.bind(this))
    }

    getDelayForNextTickMs(): number {
        return this.delayMs;
    }

    private processInitGameCommand(command: InitGameCommand) {
        this.eventBus.on(EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this))
    }

    private onFallTickProcessed(event: FallTickProcessedEvent) {
        if (event.transferredToMatrixFigures.length === 0) {
            return;
        }
        this.counter++;
        if (this.counter >= this.decreaseEveryFallenFigure) {
            this.counter = 0;
            this.delayMs *= this.decreaseValue;
        }
    }
}
