"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquashedRowsCounterBasedLevelCounter = void 0;
const EventBus_1 = require("../EventBus/EventBus");
const CommandBus_1 = require("../CommandBus/CommandBus");
class SquashedRowsCounterBasedLevelCounter {
    eventBus;
    commandBus;
    levelIncreaseOnSquashedRowsNumber;
    maxLevels;
    squashedRowsCounter = 0;
    constructor(eventBus, commandBus, levelIncreaseOnSquashedRowsNumber, maxLevels) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.levelIncreaseOnSquashedRowsNumber = levelIncreaseOnSquashedRowsNumber;
        this.maxLevels = maxLevels;
        this.commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.processInitGameCommand.bind(this));
    }
    processInitGameCommand(command) {
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
    }
    onFallTickProcessed(event) {
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
exports.SquashedRowsCounterBasedLevelCounter = SquashedRowsCounterBasedLevelCounter;
//# sourceMappingURL=SquashedRowsCounterBasedLevelCounter.js.map