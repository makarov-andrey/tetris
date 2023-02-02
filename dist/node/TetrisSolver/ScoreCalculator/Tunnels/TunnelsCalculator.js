"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TunnelsCalculator = exports.TunnelsCalculatorParams = void 0;
class TunnelsCalculatorParams {
    minimumValuableHeight;
    countMultiplier;
    heightPowMultiplier;
    heightMultiplier;
    constructor(minimumValuableHeight, countMultiplier, heightPowMultiplier, heightMultiplier) {
        this.minimumValuableHeight = minimumValuableHeight;
        this.countMultiplier = countMultiplier;
        this.heightPowMultiplier = heightPowMultiplier;
        this.heightMultiplier = heightMultiplier;
    }
}
exports.TunnelsCalculatorParams = TunnelsCalculatorParams;
class TunnelsCalculator {
    params;
    constructor(params = new TunnelsCalculatorParams(3, 70, 1, 7)) {
        this.params = params;
    }
    calculateScore(request) {
        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(request.imaginableMatrix, request.gameData.matrix);
        if (tunnelsCount === 0) {
            return 0;
        }
        return (-tunnelsCount * this.params.countMultiplier)
            - (tunnelsSumHeight
                * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (request.gameData.settings.fieldHeight * tunnelsCount)
                    * this.params.heightPowMultiplier)
                * this.params.heightMultiplier);
    }
    calculateTunnelsExceptUncovered(imaginableMatrix, realMatrix) {
        let realCoveredColumns = new Set();
        realMatrix.every((row) => {
            row.forEach((val, x) => {
                if (val) {
                    realCoveredColumns.add(x);
                }
            });
        });
        let imaginableCoveredColumns = new Set();
        let tunnels = new Map;
        const fieldWidth = imaginableMatrix[0].length;
        imaginableMatrix.every((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    imaginableCoveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val
                    && !imaginableCoveredColumns.has(x)
                    && !realCoveredColumns.has(x)
                    && (x === 0 || imaginableCoveredColumns.has(x - 1))
                    && (x === fieldWidth - 1 || imaginableCoveredColumns.has(x + 1))) {
                    tunnels.set(x, (tunnels.get(x) || 0) + 1);
                }
            });
            return imaginableCoveredColumns.size < fieldWidth;
        });
        let tunnelsSumHeight = 0;
        let tunnelsCount = 0;
        tunnels.forEach(height => {
            if (height >= this.params.minimumValuableHeight) {
                tunnelsSumHeight += height;
                tunnelsCount++;
            }
        });
        return [tunnelsSumHeight, tunnelsCount];
    }
}
exports.TunnelsCalculator = TunnelsCalculator;
