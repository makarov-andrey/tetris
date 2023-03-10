import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";

export class HolesV1CalculatorParams {
    constructor(
        public countDecreaseMultiplier: number,
        public countIncreaseMultiplier: number,
        public coveredHeightPowMultiplier: number,
        public coveredHeightMultiplier: number,
    ) {}
}

export class HolesV1Calculator implements ScoreCalculatorInterface {
    constructor(
        private readonly params = new HolesV1CalculatorParams(150, 70, 1, 5),
    ) {}

    calculateScore(request: CalculateScoreRequest): number {
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(request.imaginableMatrix, request.gameData.matrix);
        const holesCountDecrease = request.originalHoles.length - holesCount;
        let holesScore = holesCountDecrease > 0
            ? holesCountDecrease * this.params.countDecreaseMultiplier
            : holesCountDecrease * this.params.countIncreaseMultiplier;
        if (holesCoveredHeight !== 0 && holesCount !== 0) {
            holesScore -=
                holesCoveredHeight
                * Math.pow(
                    holesCoveredHeight,
                    holesCoveredHeight / (request.gameData.settings.fieldHeight * holesCount)
                        * this.params.coveredHeightPowMultiplier
                ) * this.params.coveredHeightMultiplier;
        }
        return holesScore;
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
}
