import {GameData} from "../GameData";
import {FallingFigure} from "../Structures";

export enum EventType {
    FallingTickProcessed,
    GameOver,
    FiguresMoved,
}

export interface Event {
    gameData: GameData;

    getEventType(): EventType;
}

export class FallTickProcessedEvent implements Event {
    constructor(
        public gameData: GameData,
        public transferredToMatrixFigures: FallingFigure[],
        public squashedLines: number[],
    ) {}

    public getEventType(): EventType {
        return EventType.FallingTickProcessed;
    }
}

export class GameOverEvent implements Event {
    constructor(
        public gameData: GameData,
    ) {}

    public getEventType(): EventType {
        return EventType.GameOver;
    }
}

export class FiguresMovedEvent implements Event {
    constructor(
        public gameData: GameData,
    ) {}

    public getEventType(): EventType {
        return EventType.FiguresMoved;
    }
}

export class EventBus {
    private handlers: Map<EventType, ((..._: any) => void)[]> = new Map();

    public on(event: EventType, handler: (..._: any) => void, unique: boolean = true): void {
        let handlers = this.handlers.get(event) || [];
        if (unique && handlers.some(boundHandler => boundHandler === handler)) {
            return;
        }
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }

    public off(event: EventType, handler: (..._: any) => void): void {
        let handlers = this.handlers.get(event) || [];
        let index = handlers.indexOf(handler);
        if (index > 0) {
            handlers.splice(index, 1)
        }
        this.handlers.set(event, handlers);
    }

    public fire(eventPayload: Event): void {
        let handlers = this.handlers.get(eventPayload.getEventType()) || [];
        handlers.forEach(handler => {handler(eventPayload)});
    }
}
