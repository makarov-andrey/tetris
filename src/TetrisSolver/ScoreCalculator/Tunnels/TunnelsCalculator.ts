import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";
import {GameData} from "../../../Tetris/Common";
import {Hole} from "../../Common";

export class TunnelsCalculator implements ScoreCalculatorInterface {
    calculateScore(request: CalculateScoreRequest): number {
        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(request.imaginableMatrix, request.gameData.matrix);
        let tunnelsScore: number;
        if (tunnelsCount === 0) {
            tunnelsScore = 0;
        } else {
            tunnelsScore = -tunnelsCount * 70
                - tunnelsSumHeight * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (request.gameData.settings.fieldHeight * tunnelsCount)) * 7;
        }
        return tunnelsScore;
    }

    private calculateTunnelsExceptUncovered(imaginableMatrix: boolean[][], realMatrix: boolean[][]): [number, number] {
        let realCoveredColumns = new Set<number>();
        realMatrix.every((row) => {
            row.forEach((val, x) => {
                if (val) {
                    realCoveredColumns.add(x);
                }
            });
        });

        let imaginableCoveredColumns = new Set<number>();
        let tunnels = new Map<number, number>;
        const fieldWidth = imaginableMatrix[0].length;
        imaginableMatrix.every((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    imaginableCoveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val
                    && !imaginableCoveredColumns.has(x)
                    && !realCoveredColumns.has(x)
                    && (x === 0 || imaginableCoveredColumns.has(x - 1))
                    && (x === fieldWidth - 1 || imaginableCoveredColumns.has(x + 1))
                ) {
                    tunnels.set(x, (tunnels.get(x) || 0) + 1);
                }
            });
            return imaginableCoveredColumns.size < fieldWidth;
        });
        let tunnelsSumHeight = 0;
        let tunnelsCount = 0;
        tunnels.forEach(height => {
            if (height >= 3) {
                tunnelsSumHeight += height;
                tunnelsCount++;
            }
        });
        return [tunnelsSumHeight, tunnelsCount];
    }
}
