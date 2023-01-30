"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsCounter = void 0;
const CommandBus_1 = require("../CommandBus/CommandBus");
const EventBus_1 = require("../EventBus/EventBus");
class StatsCounter {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }
    onFallingTickProcessed(event) {
        event.gameData.stats.figuresFallen += event.transferredToMatrixFigures.length;
        event.gameData.stats.linesSquashed += event.squashedLines.length;
    }
}
exports.StatsCounter = StatsCounter;
//# sourceMappingURL=StatsCounter.js.map