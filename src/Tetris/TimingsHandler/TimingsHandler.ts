import {GameData} from "../GameData";

export interface TimingsHandler {
    getDelayForNextTickMs(gameData: GameData): number;
}
