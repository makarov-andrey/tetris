import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";

export class TunnelsCalculatorParams {
    constructor(
        public minimumValuableHeight: number,
        public countMultiplier: number,
        public heightPowMultiplier: number,
        public heightMultiplier: number,
    ) {}
}

export class TunnelsCalculator implements ScoreCalculatorInterface {
    constructor(
        private readonly params = new TunnelsCalculatorParams(3, 70, 1, 7),
    ) {}

    calculateScore(request: CalculateScoreRequest): number {
        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(request.imaginableMatrix, request.gameData.matrix);
        if (tunnelsCount === 0) {
            return 0;
        }

        return (-tunnelsCount * this.params.countMultiplier)
            - (tunnelsSumHeight
                * Math.pow(
                    tunnelsSumHeight,
                    tunnelsSumHeight / (request.gameData.settings.fieldHeight * tunnelsCount)
                        * this.params.heightPowMultiplier
                )
                * this.params.heightMultiplier);
    }

    private calculateTunnelsExceptUncovered(imaginableMatrix: boolean[][], realMatrix: boolean[][]): [number, number] {
        let realCoveredColumns = new Set<number>();
        realMatrix.every((row) => {
            row.forEach((val, x) => {
                if (val) {
                    realCoveredColumns.add(x);
                }
            });
        });

        let imaginableCoveredColumns = new Set<number>();
        let tunnels = new Map<number, number>;
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
                    && (x === fieldWidth - 1 || imaginableCoveredColumns.has(x + 1))
                ) {
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
