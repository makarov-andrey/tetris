"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillableCellsCalculator = exports.FillableCellsCalculatorParams = void 0;
class FillableCellsCalculatorParams {
    minimumValuableHeight;
    powMultiplier;
    multiplier;
    constructor(minimumValuableHeight, powMultiplier, multiplier) {
        this.minimumValuableHeight = minimumValuableHeight;
        this.powMultiplier = powMultiplier;
        this.multiplier = multiplier;
    }
}
exports.FillableCellsCalculatorParams = FillableCellsCalculatorParams;
class FillableCellsCalculator {
    params;
    constructor(params = new FillableCellsCalculatorParams(5, 1, 1)) {
        this.params = params;
    }
    calculateScore(request) {
        const fieldHeight = request.gameData.settings.fieldHeight;
        const fieldWidth = request.gameData.settings.fieldWidth;
        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(request.imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > this.params.minimumValuableHeight) {
            fillableCellsScore = -fillableCellsCount
                * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth)
                    * this.params.powMultiplier)
                * this.params.multiplier;
        }
        return fillableCellsScore;
    }
    calculateFillableSpace(matrix, fieldWidth) {
        let coveredColumns = new Set();
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
exports.FillableCellsCalculator = FillableCellsCalculator;
