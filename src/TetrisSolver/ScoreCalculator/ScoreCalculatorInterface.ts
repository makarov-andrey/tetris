import {GameData} from "../../Tetris/Common";
import {Hole} from "../Common";

export class CalculateScoreRequest {
    constructor(
        public gameData: GameData,
        public originalHoles: Hole[],
        public originalCoveredColumns: Map<number, number>,
        public imaginableMatrix: boolean[][],
        public imaginableCoveredColumns: Map<number, number>,
        public squashedLinesCount: number,
    ) {}
}

export interface ScoreCalculatorInterface {
    calculateScore(request: CalculateScoreRequest): number;
}
