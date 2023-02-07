"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadManager = void 0;
const Common_1 = require("./Common");
class LoadManager {
    pool;
    paramsGenerator;
    resultSaver;
    iterations;
    debugMode;
    resolveWorkersPoolFreed = () => { };
    resolveAllWorkersFinished = () => { };
    constructor(pool, paramsGenerator, resultSaver, iterations, debugMode) {
        this.pool = pool;
        this.paramsGenerator = paramsGenerator;
        this.resultSaver = resultSaver;
        this.iterations = iterations;
        this.debugMode = debugMode;
    }
    async calculateBenchmarks() {
        await this.paramsGenerator.init();
        for (let params of this.paramsGenerator.generate()) {
            this.run(params).then(result => {
                const runInfo = new Common_1.RunInfo(new Date(), params, result);
                if (this.debugMode) {
                    console.log([runInfo.date, runInfo.parameters.toTuple(), runInfo.result]);
                }
                this.resultSaver.save(runInfo);
            });
            await this.promiseWorkersPoolToFree();
        }
        await this.promiseAllWorkersFinished();
    }
    async run(params) {
        let promises = [];
        for (let i = 0; i < this.iterations; i++) {
            promises.push(new Promise(resolve => {
                this.pool.exec('solveTetris', [params.toTuple()])
                    .then((figuresFallen) => {
                    const stats = this.pool.stats();
                    resolve(figuresFallen);
                    this.checkWorkersPoolIfFree(stats);
                    this.checkWorkersPoolIfFinished(stats);
                });
            }));
        }
        const results = await Promise.all(promises);
        return new Common_1.RunResult(results);
    }
    async promiseWorkersPoolToFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
            return;
        }
        await new Promise(resolve => {
            this.resolveWorkersPoolFreed = resolve;
        });
    }
    checkWorkersPoolIfFree(stats) {
        if (stats.pendingTasks < this.iterations) {
            this.resolveWorkersPoolFreed(true);
        }
    }
    async promiseAllWorkersFinished() {
        return new Promise(resolve => {
            this.resolveAllWorkersFinished = resolve;
        });
    }
    checkWorkersPoolIfFinished(stats) {
        if (stats.activeTasks == 0) {
            this.resolveAllWorkersFinished(true);
        }
    }
}
exports.LoadManager = LoadManager;
