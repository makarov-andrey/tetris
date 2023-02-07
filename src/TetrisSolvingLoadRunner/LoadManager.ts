import {WorkerPool, WorkerPoolStats} from "workerpool";
import {ParamsGeneratorInterface} from "./ParamsGenerator/ParamsGeneratorInterface";
import {SolverRunParameters} from "../TetrisSolver/Common";
import {RunInfo, RunResult} from "./Common";
import {ResultSaverInterface} from "./ResultSaver/ResultSaverInterface";

export class LoadManager {
    private resolveWorkersPoolFreed: (value: unknown) => void = () => {};
    private resolveAllWorkersFinished: (value: unknown) => void = () => {};

    constructor(
        private readonly pool: WorkerPool,
        private readonly paramsGenerator: ParamsGeneratorInterface,
        private readonly resultSaver: ResultSaverInterface,
        private readonly iterations: number,
        private readonly debugMode: boolean,
    ) {}

    public async calculateBenchmarks() {
        await this.paramsGenerator.init();
        for (let params of this.paramsGenerator.generate()) {
            this.run(params).then(result => {
                const runInfo = new RunInfo(new Date(), params, result);
                if (this.debugMode) {
                    console.log([runInfo.date, runInfo.parameters.toTuple(), runInfo.result]);
                }
                this.resultSaver.save(runInfo);
            });
            await this.promiseWorkersPoolToFree();
        }
        await this.promiseAllWorkersFinished();
    }

    private async run(params: SolverRunParameters): Promise<RunResult> {
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
        return new RunResult(results);
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
