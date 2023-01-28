import {WorkerPool} from "workerpool";
import {GameData} from "../Tetris/Common";
import {BenchRunParameters} from "./Common";
import {BenchParamsGenerator} from "./BenchParamsGenerator";

class RunResult {
    constructor(
        public percentiles: Array<number>,
        public average: number
    ) {}
}

export class BenchManager {
    private readonly iterations = 1000;
    private readonly valuablePercentiles = [0, 50, 95, 99, 99.9];
    private resolveWorkersPoolFreed: (value: unknown) => void = () => {};

    constructor(
        private pool: WorkerPool,
        private benchParamsGenerator: BenchParamsGenerator
    ) {}

    public async startBench() {
        console.log(this.benchParamsGenerator.count());
        for (let params of this.benchParamsGenerator.generate()) {
            // console.log('new value yielded', params);
            this.run(params).then(result => {
                // todo save the result to file instead
                console.log(`[${this.paramsToLogData(params).join(',')}]; {[${result.percentiles.join(',')}], ${result.average}}`);
            });
            // todo render cli progress bar
            await this.promiseWorkersPoolToFree();
        }
        // console.log('last pack of workers have been run');
        // console.log(this.pool.stats());
    }

    private async run(params: BenchRunParameters): Promise<RunResult> {
        let promises: Promise<number>[] = [];
        for (let i = 0; i < this.iterations; i++) {
            promises.push(new Promise(resolve => {
                this.pool.exec('solveTetris', [params])
                    .then((result: GameData) => {
                        this.checkWorkersPoolIfFree();
                        resolve(result.stats.figuresFallen);
                    });
            }));
        }
        const results = await Promise.all(promises);
        results.sort((a,b) => b - a);
        let percentileValues: Array<number> = [];
        this.valuablePercentiles.forEach(percentile => {
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

    private checkWorkersPoolIfFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
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
}
