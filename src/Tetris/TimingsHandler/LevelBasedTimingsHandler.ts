import {TimingsHandler} from "./TimingsHandler";
import {GameData} from "../Common";

export class LevelBasedTimingsHandler implements TimingsHandler {
    constructor(
        private initialDelayMs: number,
        private base: number = 0.8,
    ) {}

    getDelayForNextTickMs(gameData: GameData): number {
        return Math.pow(this.base - (gameData.level - 1) * 0.007, gameData.level - 1) * this.initialDelayMs;
    }
}
