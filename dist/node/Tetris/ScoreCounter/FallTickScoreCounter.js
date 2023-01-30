"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallTickScoreCounter = void 0;
const EventBus_1 = require("../EventBus/EventBus");
const CommandBus_1 = require("../CommandBus/CommandBus");
class FallTickScoreCounter {
    commandBus;
    eventBus;
    squashedRowsRewardThresholdsMap;
    rewardOnCombo;
    constructor(commandBus, eventBus, squashedRowsRewardThresholdsMap = new Map([
        [1, 100],
        [2, 300],
        [3, 500],
        [4, 800],
    ]), rewardOnCombo = 50) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.squashedRowsRewardThresholdsMap = squashedRowsRewardThresholdsMap;
        this.rewardOnCombo = rewardOnCombo;
        commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }
    onFallingTickProcessed(event) {
        if (event.squashedLines.length < 0) {
            return;
        }
        let previousThresholdReward = 0;
        this.squashedRowsRewardThresholdsMap.forEach((reward, rowsSquashedThreshold) => {
            if (rowsSquashedThreshold > event.squashedLines.length) {
                return;
            }
            previousThresholdReward = reward;
        });
        event.gameData.score +=
            previousThresholdReward * event.gameData.level
                + this.rewardOnCombo * Math.max(0, event.gameData.combo - 1) * event.gameData.level
                + event.droppedLines * 2 * event.gameData.level;
    }
}
exports.FallTickScoreCounter = FallTickScoreCounter;
//# sourceMappingURL=FallTickScoreCounter.js.map