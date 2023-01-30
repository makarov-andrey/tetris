import {WorkerPool, WorkerPoolStats} from "workerpool";
import {BenchRunParameters} from "./Common";
import {BenchParamsGeneratorInterface} from "./BenchParamsGenerator/BenchParamsGeneratorInterface";
import * as fs from 'fs';

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
        private readonly benchParamsGenerator: BenchParamsGeneratorInterface,
        private readonly resultFilePath: string,
        private readonly iterations: number,
        private readonly percentiles: number[],
    ) {}

    public async calculateBenchmarks() {
        await this.benchParamsGenerator.init();
        for (let params of this.benchParamsGenerator.generate()) {
            this.run(params).then(result => {
                const log = JSON.stringify({
                    ts: new Date().toISOString(),
                    par: params.toTuple(),
                    res: {
                        perc: result.percentiles,
                        avg: result.average,
                    },
                });
                console.log(log);
                fs.appendFile(this.resultFilePath, log + '\n', () => {});
            });
            await this.promiseWorkersPoolToFree();
        }
        await this.promiseAllWorkersFinished();
    }

    private async run(params: BenchRunParameters): Promise<RunResult> {
        let promises: Promise<number>[] = [];
        for (let i = 0; i < this.iterations; i++) {
            promises.push(new Promise(resolve => {
                this.pool.exec('solveTetris', [params.toTuple()])
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
