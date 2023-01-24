import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";
import {GameData} from "../../../Tetris/Common";
import {Hole} from "../../Common";

export class FillableCellsCalculator implements ScoreCalculatorInterface {
    calculateScore(request: CalculateScoreRequest): number {
        const fieldHeight = request.gameData.settings.fieldHeight;
        const fieldWidth = request.gameData.settings.fieldWidth;
        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(request.imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > 5) {
            fillableCellsScore = -fillableCellsCount * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth));
        }
        return fillableCellsScore;
    }

    private calculateFillableSpace(matrix: boolean[][], fieldWidth: number): [number, number] {
        let coveredColumns = new Set<number>();
        let fillableCellsCount = 0;
        let fillableHeight = 0;
        matrix.every(row => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val && coveredColumns.size > 0 && !coveredColumns.has(x)) {
                    fillableCellsCount++;
                }
            });
            if (coveredColumns.size < fieldWidth) {
                if (coveredColumns.size > 0) {
                    fillableHeight++;
                }
                return true;
            }
            return false;
        });
        return [fillableCellsCount, fillableHeight];
    }
}
