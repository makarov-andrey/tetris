import {WorkerPool, WorkerPoolStats} from "workerpool";
import {BenchRunParameters} from "./Common";
import {BenchParamsGenerator} from "./BenchParamsGenerator";

class RunResult {
    constructor(
        public percentiles: Array<number>,
        public average: number
    ) {}
}

export class BenchManager {
    private resolveWorkersPoolFreed: (value: unknown) => void = () => {};
    private resolveAllWorkersFinished: (value: unknown) => void = () => {};

    constructor(
        private readonly pool: WorkerPool,
        private readonly benchParamsGenerator: BenchParamsGenerator,
        private readonly iterations = 1000,
        private readonly percentiles = [0, 50, 95, 99, 99.9],
    ) {}

    public async startBench() {
        for (let params of this.benchParamsGenerator.generate()) {
            this.run(params).then(result => {
                console.log(`${new Date().toISOString()}; [${this.paramsToLogData(params).join(',')}]; {[${result.percentiles.join(',')}], ${result.average}}`);
            });
            await this.promiseWorkersPoolToFree();
        }
        await this.promiseAllWorkersFinished();
    }

    private async run(params: BenchRunParameters): Promise<RunResult> {
        let promises: Promise<number>[] = [];
        for (let i = 0; i < this.iterations; i++) {
            promises.push(new Promise(resolve => {
                this.pool.exec('solveTetris', [params])
                    .then((figuresFallen: number) => {
                        const stats = this.pool.stats();
                        resolve(figuresFallen);
                        this.checkWorkersPoolIfFree(stats);
                        this.checkWorkersPoolIfFinished(stats);
                    });
            }));
        }
        const results = await Promise.all(promises);
        results.sort((a,b) => b - a);
        let percentileValues: Array<number> = [];
        this.percentiles.forEach(percentile => {
            percentileValues.push(results[Math.floor(this.iterations / 100 * percentile)]);
        });
        const average = results.reduce((a, b) => a + b, 0) / results.length;
        return new RunResult(percentileValues, average);
    }

    private async promiseWorkersPoolToFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
            return;
        }
        await new Promise(resolve => {
            this.resolveWorkersPoolFreed = resolve;
        });
    }

    private checkWorkersPoolIfFree(stats: WorkerPoolStats) {
        if (stats.pendingTasks < this.iterations) {
            this.resolveWorkersPoolFreed(true);
        }
    }

    private paramsToLogData(params: BenchRunParameters): Array<number> {
        return [
            params.fillableCellsCalculatorParams.minimumValuableHeight,
            params.fillableCellsCalculatorParams.powMultiplier,
            params.fillableCellsCalculatorParams.multiplier,
            params.filledHeightCalculatorParams.powMultiplier,
            params.filledHeightCalculatorParams.multiplier,
            params.holesV1CalculatorParams.countDecreaseMultiplier,
            params.holesV1CalculatorParams.countIncreaseMultiplier,
            params.holesV1CalculatorParams.coveredHeightPowMultiplier,
            params.holesV1CalculatorParams.coveredHeightMultiplier,
            params.squashedRowsCalculatorParams.multiplier,
            params.tunnelsCalculatorParams.minimumValuableHeight,
            params.tunnelsCalculatorParams.countMultiplier,
            params.tunnelsCalculatorParams.heightPowMultiplier,
            params.tunnelsCalculatorParams.heightMultiplier,
        ];
    }

    private async promiseAllWorkersFinished() {
        return new Promise(resolve => {
            this.resolveAllWorkersFinished = resolve;
        });
    }

    private checkWorkersPoolIfFinished(stats: WorkerPoolStats) {
        if (stats.activeTasks == 0) {
            this.resolveAllWorkersFinished(true);
        }
    }
}
