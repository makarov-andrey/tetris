"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchManager = void 0;
const fs = __importStar(require("fs"));
class RunResult {
    percentiles;
    average;
    constructor(percentiles, average) {
        this.percentiles = percentiles;
        this.average = average;
    }
}
class BenchManager {
    pool;
    benchParamsGenerator;
    resultFilePath;
    iterations;
    percentiles;
    debugMode;
    resolveWorkersPoolFreed = () => { };
    resolveAllWorkersFinished = () => { };
    constructor(pool, benchParamsGenerator, resultFilePath, iterations, percentiles, debugMode) {
        this.pool = pool;
        this.benchParamsGenerator = benchParamsGenerator;
        this.resultFilePath = resultFilePath;
        this.iterations = iterations;
        this.percentiles = percentiles;
        this.debugMode = debugMode;
    }
    async calculateBenchmarks() {
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
                if (this.debugMode) {
                    console.log(log);
                }
                fs.appendFile(this.resultFilePath, log + '\n', () => { });
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
        results.sort((a, b) => b - a);
        let percentileValues = [];
        this.percentiles.forEach(percentile => {
            percentileValues.push(results[Math.floor(this.iterations / 100 * percentile)]);
        });
        const average = results.reduce((a, b) => a + b, 0) / results.length;
        return new RunResult(percentileValues, average);
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
exports.BenchManager = BenchManager;
//# sourceMappingURL=BenchManager.js.map