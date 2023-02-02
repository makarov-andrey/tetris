"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolesV1Calculator = exports.HolesV1CalculatorParams = void 0;
class HolesV1CalculatorParams {
    countDecreaseMultiplier;
    countIncreaseMultiplier;
    coveredHeightPowMultiplier;
    coveredHeightMultiplier;
    constructor(countDecreaseMultiplier, countIncreaseMultiplier, coveredHeightPowMultiplier, coveredHeightMultiplier) {
        this.countDecreaseMultiplier = countDecreaseMultiplier;
        this.countIncreaseMultiplier = countIncreaseMultiplier;
        this.coveredHeightPowMultiplier = coveredHeightPowMultiplier;
        this.coveredHeightMultiplier = coveredHeightMultiplier;
    }
}
exports.HolesV1CalculatorParams = HolesV1CalculatorParams;
class HolesV1Calculator {
    params;
    constructor(params = new HolesV1CalculatorParams(150, 70, 1, 5)) {
        this.params = params;
    }
    calculateScore(request) {
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(request.imaginableMatrix, request.gameData.matrix);
        const holesCountDecrease = request.originalHoles.length - holesCount;
        let holesScore = holesCountDecrease > 0
            ? holesCountDecrease * this.params.countDecreaseMultiplier
            : holesCountDecrease * this.params.countIncreaseMultiplier;
        if (holesCoveredHeight !== 0 && holesCount !== 0) {
            holesScore -=
                holesCoveredHeight
                    * Math.pow(holesCoveredHeight, holesCoveredHeight / (request.gameData.settings.fieldHeight * holesCount)
                        * this.params.coveredHeightPowMultiplier) * this.params.coveredHeightMultiplier;
        }
        return holesScore;
    }
    calculateHolesAndCoveredHeight(imaginableMatrix, realMatrix) {
        const [originalTheHighestHoleY, originalTheHighestHoleCoveredY] = this.calculateTheHighestHoleCoveredY(realMatrix);
        let coveredColumnsYs = new Map;
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
                        }
                        else if (coveredY < originalTheHighestHoleCoveredY) {
                            holesCoveredHeightsSum += originalTheHighestHoleCoveredY - coveredY;
                        }
                    }
                }
            });
        });
        return [holesCount, holesCoveredHeightsSum];
    }
    calculateTheHighestHoleCoveredY(matrix) {
        let theHighestHoleCoveredY = undefined;
        let theHighestHoleY = undefined;
        let coveredColumnsYs = new Map;
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
exports.HolesV1Calculator = HolesV1Calculator;
