import {TimingsHandler} from "./TimingsHandler";
import {GameData} from "../Common";

export class LevelBasedTimingsHandler implements TimingsHandler {
    constructor(
        private initialDelayMs: number,
    ) {}

    getDelayForNextTickMs(gameData: GameData): number {
        return Math.pow(0.8 - (gameData.level - 1) * 0.007, gameData.level - 1) * this.initialDelayMs;
    }
}
