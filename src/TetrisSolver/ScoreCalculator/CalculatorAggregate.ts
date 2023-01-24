import {CalculateScoreRequest, ScoreCalculatorInterface} from "./ScoreCalculatorInterface";

export class CalculatorAggregate implements ScoreCalculatorInterface {
    constructor(
        private calculators: ScoreCalculatorInterface[]
    ) {}

    public calculateScore(request: CalculateScoreRequest): number {
        return this.calculators.reduce((score, calculator) => {
            return score + calculator.calculateScore(request);
        }, 0);
    }
}
