import {GameData} from "../Common";

export interface TimingsHandler {
    getDelayForNextTickMs(gameData: GameData): number;
}
