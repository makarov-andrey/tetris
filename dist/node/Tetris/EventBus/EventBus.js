"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = exports.FiguresSpawnedEvent = exports.LevelUpEvent = exports.FiguresMovedEvent = exports.GameOverEvent = exports.FallTickProcessedEvent = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType[EventType["FallingTickProcessed"] = 0] = "FallingTickProcessed";
    EventType[EventType["GameOver"] = 1] = "GameOver";
    EventType[EventType["FiguresMoved"] = 2] = "FiguresMoved";
    EventType[EventType["LevelUp"] = 3] = "LevelUp";
    EventType[EventType["FiguresSpawned"] = 4] = "FiguresSpawned";
})(EventType = exports.EventType || (exports.EventType = {}));
class FallTickProcessedEvent {
    gameData;
    transferredToMatrixFigures;
    squashedLines;
    droppedLines;
    constructor(gameData, transferredToMatrixFigures, squashedLines, droppedLines) {
        this.gameData = gameData;
        this.transferredToMatrixFigures = transferredToMatrixFigures;
        this.squashedLines = squashedLines;
        this.droppedLines = droppedLines;
    }
    getEventType() {
        return EventType.FallingTickProcessed;
    }
}
exports.FallTickProcessedEvent = FallTickProcessedEvent;
class GameOverEvent {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getEventType() {
        return EventType.GameOver;
    }
}
exports.GameOverEvent = GameOverEvent;
class FiguresMovedEvent {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getEventType() {
        return EventType.FiguresMoved;
    }
}
exports.FiguresMovedEvent = FiguresMovedEvent;
class LevelUpEvent {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getEventType() {
        return EventType.LevelUp;
    }
}
exports.LevelUpEvent = LevelUpEvent;
class FiguresSpawnedEvent {
    gameData;
    newFigures;
    constructor(gameData, newFigures) {
        this.gameData = gameData;
        this.newFigures = newFigures;
    }
    getEventType() {
        return EventType.FiguresSpawned;
    }
}
exports.FiguresSpawnedEvent = FiguresSpawnedEvent;
class EventBus {
    handlers = new Map();
    on(event, handler, unique = true) {
        let handlers = this.handlers.get(event) || [];
        if (unique && handlers.some(boundHandler => boundHandler === handler)) {
            return;
        }
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }
    off(event, handler) {
        let handlers = this.handlers.get(event) || [];
        let index = handlers.indexOf(handler);
        if (index > 0) {
            handlers.splice(index, 1);
        }
        this.handlers.set(event, handlers);
    }
    fire(eventPayload) {
        let handlers = this.handlers.get(eventPayload.getEventType()) || [];
        handlers.forEach(handler => { handler(eventPayload); });
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=EventBus.js.map