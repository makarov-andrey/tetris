import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";

export class FilledHeightCalculatorParams {
    constructor(
        public powMultiplier: number,
        public multiplier: number,
    ) {}
}

export class FilledHeightCalculator implements ScoreCalculatorInterface {
    constructor(
        private readonly params = new FilledHeightCalculatorParams(1, 3),
    ) {}

    public calculateScore(request: CalculateScoreRequest): number {
        const height = this.calculateHeight(request.imaginableMatrix);
        return -height
            * Math.pow(
                height,
                height / request.gameData.settings.fieldHeight
                * this.params.powMultiplier
            )
            * this.params.multiplier;
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
