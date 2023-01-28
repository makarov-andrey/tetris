import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";

export class SquashedRowsCalculatorParams {
    constructor(
        public multiplier: number
    ) {}
}

export class SquashedRowsCalculator implements ScoreCalculatorInterface {
    constructor(
        private readonly params = new SquashedRowsCalculatorParams(5),
    ) {}

    calculateScore(request: CalculateScoreRequest): number {
        return request.squashedLinesCount * this.params.multiplier;
    }
}
