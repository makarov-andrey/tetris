import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";

export class FillableCellsCalculatorParams {
    constructor(
        public minimumValuableHeight: number,
        public powMultiplier: number,
        public multiplier: number,
    ) {}
}

export class FillableCellsCalculator implements ScoreCalculatorInterface {
    constructor(
        private readonly params = new FillableCellsCalculatorParams(5, 1, 1),
    ) {}

    public calculateScore(request: CalculateScoreRequest): number {
        const fieldHeight = request.gameData.settings.fieldHeight;
        const fieldWidth = request.gameData.settings.fieldWidth;
        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(request.imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > this.params.minimumValuableHeight) {
            fillableCellsScore = -fillableCellsCount
                * Math.pow(
                    fillableCellsCount,
                    fillableCellsCount / (fieldHeight * fieldWidth)
                        * this.params.powMultiplier
                )
                * this.params.multiplier;
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
