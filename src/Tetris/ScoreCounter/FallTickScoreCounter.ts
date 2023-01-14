import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";

export class FallTickScoreCounter {
    constructor(
        private commandBus: CommandBus,
        private eventBus: EventBus,
        private squashedRowsRewardThresholdsMap: Map<number, number> = new Map([
            [1, 100],
            [2, 300],
            [3, 500],
            [4, 800],
        ]),
        private rewardOnCombo = 50,
    ) {
        commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }

    private onFallingTickProcessed(event: FallTickProcessedEvent) {
        if (event.squashedLines.length < 0) {
            return
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
