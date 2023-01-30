"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboCounter = void 0;
const EventBus_1 = require("../EventBus/EventBus");
const CommandBus_1 = require("../CommandBus/CommandBus");
class ComboCounter {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
    }
    onFallTickProcessed(event) {
        if (event.transferredToMatrixFigures.length <= 0) {
            return;
        }
        if (event.squashedLines.length > 0) {
            event.gameData.combo += 1;
        }
        else {
            event.gameData.combo = 0;
        }
    }
}
exports.ComboCounter = ComboCounter;
//# sourceMappingURL=ComboCounter.js.map