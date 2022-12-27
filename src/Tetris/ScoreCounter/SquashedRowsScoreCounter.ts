import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";

export class SquashedRowsScoreCounter {
    constructor(
        private eventBus: EventBus,
        private squashedRowsRewardThresholdsMap: Map<number, number> = new Map([
            [1, 100],
            [2, 300],
            [3, 700],
            [4, 1500],
        ]),
    ) {
        eventBus.on(EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
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
        event.gameData.score += previousThresholdReward;
    }
}
