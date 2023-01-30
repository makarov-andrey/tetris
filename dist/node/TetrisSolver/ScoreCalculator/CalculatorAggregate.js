"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorAggregate = void 0;
class CalculatorAggregate {
    calculators;
    constructor(calculators) {
        this.calculators = calculators;
    }
    calculateScore(request) {
        return this.calculators.reduce((score, calculator) => {
            return score + calculator.calculateScore(request);
        }, 0);
    }
}
exports.CalculatorAggregate = CalculatorAggregate;
//# sourceMappingURL=CalculatorAggregate.js.map