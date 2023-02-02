"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquashedRowsCalculator = exports.SquashedRowsCalculatorParams = void 0;
class SquashedRowsCalculatorParams {
    multiplier;
    constructor(multiplier) {
        this.multiplier = multiplier;
    }
}
exports.SquashedRowsCalculatorParams = SquashedRowsCalculatorParams;
class SquashedRowsCalculator {
    params;
    constructor(params = new SquashedRowsCalculatorParams(5)) {
        this.params = params;
    }
    calculateScore(request) {
        return request.squashedLinesCount * this.params.multiplier;
    }
}
exports.SquashedRowsCalculator = SquashedRowsCalculator;
