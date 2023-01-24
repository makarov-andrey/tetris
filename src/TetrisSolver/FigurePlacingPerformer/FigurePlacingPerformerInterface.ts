import {GameData} from "../../Tetris/Common";
import {FigurePlacingResult} from "../Common";

export class PlacingError extends Error {}
export class GameStateNotSupportedError extends PlacingError {}
export class InconsistentTargetStateError extends PlacingError {}
export class NotSupportedDirectionStepError extends PlacingError {}

export interface FigurePlacingPerformerInterface {
    /**
     * @throws PlacingError
     */
    place(gameData: GameData, placingResult?: FigurePlacingResult): void;
}
