import {TimingsHandler} from "./TimingsHandler";
import {GameData} from "../Common";

export class ConstTimingsHandler implements TimingsHandler {
    constructor(
        public delayMs: number,
    ) {}

    getDelayForNextTickMs(gameData: GameData): number {
        return this.delayMs;
    }
}
