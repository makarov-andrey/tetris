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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workerpool_1 = require("workerpool");
const BenchManager_1 = require("./TetrisSolvingBench/BenchManager");
const StaticGenerator_1 = require("./TetrisSolvingBench/BenchParamsGenerator/StaticGenerator");
const path = __importStar(require("path"));
const minimist_1 = __importDefault(require("minimist"));
const PersistedGenerator_1 = require("./TetrisSolvingBench/BenchParamsGenerator/PersistedGenerator");
let running = true;
function killProcess() {
    console.log('Killed');
    running = false;
}
function keepRunning() {
    setTimeout(() => {
        if (running) {
            keepRunning();
        }
    }, 1000);
}
process.on('SIGTERM', killProcess);
process.on('SIGINT', killProcess);
process.on('uncaughtException', function (e) {
    console.log('[uncaughtException] app will be terminated: ', e.stack);
    killProcess();
});
const argv = (0, minimist_1.default)(process.argv.slice(2));
const threads = Number.parseInt(argv.t || argv.threads || '10');
const iterations = Number.parseInt(argv.i || argv.iterations || '1000');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val) => Number.parseFloat(val));
const resultFilePath = path.resolve(argv.r || argv.resultFilePath || './result.txt');
const workerPath = path.resolve('./dist/node/tetris_solving_worker.js');
const workerPool = (0, workerpool_1.pool)(workerPath, { maxWorkers: threads });
const benchManager = new BenchManager_1.BenchManager(workerPool, new PersistedGenerator_1.PersistedGenerator(new StaticGenerator_1.StaticGenerator(), resultFilePath), resultFilePath, iterations, percentiles);
benchManager.calculateBenchmarks().then(() => {
    console.log('Successfully finished');
    killProcess();
});
keepRunning();
//# sourceMappingURL=bench.js.map