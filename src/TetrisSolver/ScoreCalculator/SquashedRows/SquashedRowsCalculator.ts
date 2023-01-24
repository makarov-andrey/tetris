import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";

export class SquashedRowsCalculator implements ScoreCalculatorInterface {
    calculateScore(request: CalculateScoreRequest): number {
        return request.squashedLinesCount * 5;
    }
}
