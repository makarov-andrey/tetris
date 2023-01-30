"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilledHeightCalculator = exports.FilledHeightCalculatorParams = void 0;
class FilledHeightCalculatorParams {
    powMultiplier;
    multiplier;
    constructor(powMultiplier, multiplier) {
        this.powMultiplier = powMultiplier;
        this.multiplier = multiplier;
    }
}
exports.FilledHeightCalculatorParams = FilledHeightCalculatorParams;
class FilledHeightCalculator {
    params;
    constructor(params = new FilledHeightCalculatorParams(1, 3)) {
        this.params = params;
    }
    calculateScore(request) {
        const height = this.calculateHeight(request.imaginableMatrix);
        return -height
            * Math.pow(height, height / request.gameData.settings.fieldHeight
                * this.params.powMultiplier)
            * this.params.multiplier;
    }
    calculateHeight(matrix) {
        let lowestEmptyY = -1;
        matrix.every((row, y) => {
            if (row.every(val => !val)) {
                lowestEmptyY = y;
                return true;
            }
            else {
                return false;
            }
        });
        return matrix.length - lowestEmptyY - 1;
    }
}
exports.FilledHeightCalculator = FilledHeightCalculator;
//# sourceMappingURL=FilledHeightCalculator.js.map