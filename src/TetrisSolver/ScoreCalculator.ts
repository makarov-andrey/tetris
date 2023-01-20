import {GameData} from "../Tetris/Common";

export class ScoreCalculator {
    public calculateScore(gameData: GameData, matrix: boolean[][], squashedLinesCount: number): number {
        const fieldHeight = gameData.settings.fieldHeight;
        const fieldWidth = gameData.settings.fieldWidth;
        const squashedLinesScore = squashedLinesCount * 5;

        const originalHolesCount = this.calculateHoles(gameData.matrix);
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(matrix, gameData.matrix);
        const holesCountDecrease = originalHolesCount - holesCount;
        let holesScore: number;
        if (holesCoveredHeight === 0 || holesCount === 0) {
            holesScore = (holesCountDecrease > 0 ? holesCountDecrease * 150 : holesCountDecrease * 70);
        } else {
            holesScore = (holesCountDecrease > 0 ? holesCountDecrease * 150 : holesCountDecrease * 70)
                - holesCoveredHeight * Math.pow(holesCoveredHeight, holesCoveredHeight / (fieldHeight * holesCount)) * 5;
        }

        const height = this.calculateHeight(matrix);
        const heightScore = -height * Math.pow(height, height / fieldHeight) * 3;

        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(matrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > 5) {
            fillableCellsScore = -fillableCellsCount * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth));
        }

        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(matrix, gameData.matrix);
        let tunnelsScore: number;
        if (tunnelsCount === 0) {
            tunnelsScore = 0;
        } else {
            tunnelsScore = -tunnelsCount * 70
                - tunnelsSumHeight * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (fieldHeight * tunnelsCount)) * 7;
        }

        const score = holesScore + squashedLinesScore + heightScore + tunnelsScore + fillableCellsScore;
        if (isNaN(score)) {
            console.log(matrix, holesScore, squashedLinesScore, heightScore, tunnelsScore, fillableCellsScore);
        }
        return score;
    }

    private calculateHoles(imaginableMatrix: boolean[][]): number {
        let coveredColumns = new Set<number>;
        let holesCount = 0;
        imaginableMatrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                } else if (coveredColumns.has(x)) {
                    holesCount++;
                }
            });
        });
        return holesCount;
    }

    private calculateHolesAndCoveredHeight(imaginableMatrix: boolean[][], realMatrix: boolean[][]): [number, number] {
        const [originalTheHighestHoleY, originalTheHighestHoleCoveredY] = this.calculateTheHighestHoleCoveredY(realMatrix);
        let coveredColumnsYs = new Map<number, number>;
        let holesCoveredHeightsSum = 0;
        let holesCount = 0;
        imaginableMatrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val && !coveredColumnsYs.has(x)) {
                    coveredColumnsYs.set(x, y);
                }
                let coveredY = coveredColumnsYs.get(x);
                if (coveredY !== undefined && !val) {
                    holesCount++;
                    if (originalTheHighestHoleY !== undefined && originalTheHighestHoleCoveredY !== undefined) {
                        if (y < originalTheHighestHoleY) {
                            holesCoveredHeightsSum += y - coveredY;
                        } else if (coveredY < originalTheHighestHoleCoveredY) {
                            holesCoveredHeightsSum += originalTheHighestHoleCoveredY - coveredY;
                        }
                    }
                }
            });
        });
        return [holesCount, holesCoveredHeightsSum];
    }

    private calculateTheHighestHoleCoveredY(matrix: boolean[][]): [number|undefined, number|undefined] {
        let theHighestHoleCoveredY = undefined;
        let theHighestHoleY = undefined;
        let coveredColumnsYs = new Map<number, number>;
        matrix.some((row, y) => {
            return row.some((val, x) => {
                if (val && !coveredColumnsYs.has(x)) {
                    coveredColumnsYs.set(x, y);
                }
                let coveredY = coveredColumnsYs.get(x);
                if (coveredY !== undefined && !val) {
                    theHighestHoleY = y;
                    theHighestHoleCoveredY = coveredY;
                    return true;
                }
                return false;
            });
        });
        return [theHighestHoleY, theHighestHoleCoveredY];
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
