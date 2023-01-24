import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";
import {GameData} from "../../../Tetris/Common";
import {Hole} from "../../Common";

export class FilledHeightCalculator implements ScoreCalculatorInterface {
    public calculateScore(request: CalculateScoreRequest): number {
        const height = this.calculateHeight(request.imaginableMatrix);
        return -height * Math.pow(height, height / request.gameData.settings.fieldHeight) * 3;
    }

    private calculateHeight(matrix: boolean[][]): number {
        let lowestEmptyY = -1;
        matrix.every((row, y) => {
            if (row.every(val => !val)) {
                lowestEmptyY = y;
                return true;
            } else {
                return false;
            }
        });
        return matrix.length - lowestEmptyY - 1;
    }
}
