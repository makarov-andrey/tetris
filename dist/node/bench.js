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
const path = __importStar(require("path"));
const minimist_1 = __importDefault(require("minimist"));
const BenchManager_1 = require("./TetrisSolvingBench/BenchManager");
const StaticArrayGenerator_1 = require("./TetrisSolvingBench/BenchParamsGenerator/StaticArrayGenerator");
function handleSignal(signal) {
    console.log(`Received signal ${signal}`);
}
const argv = (0, minimist_1.default)(process.argv.slice(2));
const projectDirPath = argv.h || argv.projectDirPath || process.cwd();
process.chdir(projectDirPath);
const debugMode = (argv.d || argv.debugMode || '0') == '1';
const threads = Number.parseInt(argv.t || argv.threads || '10');
const iterations = Number.parseInt(argv.i || argv.iterations || '1000');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val) => Number.parseFloat(val));
const resultFilePath = path.resolve(argv.r || argv.resultFilePath || './result.txt');
const workerPath = path.resolve('./dist/node/tetris_solving_worker.js');
if (debugMode) {
    console.log('Bench counter started in debug mode.');
    console.log('Process id is', process.pid);
    console.log('debugMode:', debugMode);
    console.log('threads:', threads);
    console.log('iterations:', iterations);
    console.log('percentiles:', percentiles);
    console.log('projectDirPath:', projectDirPath);
    console.log('workerPath:', workerPath);
    console.log('resultFilePath:', resultFilePath);
    [
        'SIGABRT', 'SIGALRM', 'SIGBUS', 'SIGCHLD', 'SIGCONT', 'SIGFPE', 'SIGHUP', 'SIGILL', 'SIGINT', 'SIGIO',
        'SIGIOT', 'SIGPIPE', 'SIGPOLL', 'SIGPROF', 'SIGPWR', 'SIGQUIT', 'SIGSEGV', 'SIGSTKFLT',
        'SIGSYS', 'SIGTERM', 'SIGTRAP', 'SIGTSTP', 'SIGTTIN', 'SIGTTOU', 'SIGUNUSED', 'SIGURG',
        'SIGUSR1', 'SIGUSR2', 'SIGVTALRM', 'SIGWINCH', 'SIGXCPU', 'SIGXFSZ', 'SIGBREAK', 'SIGLOST', 'SIGINFO',
    ].forEach(signal => process.on(signal, handleSignal));
    process.on('exit', (code) => {
        console.log(`Exit with code ${code}`);
    });
    process.on('uncaughtException', (error, origin) => {
        console.log(`Received uncaught exception`, error, origin);
    });
    process.on('unhandledRejection', (promise) => {
        console.log(`Received unhandled rejection`, promise);
    });
}
const workerPool = (0, workerpool_1.pool)(workerPath, { maxWorkers: threads });
if (debugMode) {
    console.log('Worker pool has been initialized.');
}
const benchManager = new BenchManager_1.BenchManager(workerPool, new StaticArrayGenerator_1.StaticArrayGenerator([
    [3, 1, 1, 0, 5, 170, 80, 1, 7, 5, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 170, 80, 1, 7, 15, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 10, 2, 40, 1, 10],
    [7, 0, 3, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 5, 2, 40, 1, 10],
    [7, 0, 1, 1, 1, 130, 80, 0, 3, 10, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 150, 80, 1, 7, 15, 2, 40, 1, 10],
    [5, 0, 2, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 7],
    [5, 0, 3, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 80, 0, 3, 5, 2, 40, 1, 5],
    [5, 1, 1, 0, 5, 150, 80, 1, 7, 15, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 5, 170, 80, 0, 3, 5, 2, 40, 1, 5],
    [5, 1, 1, 0, 5, 170, 80, 1, 7, 5, 2, 40, 1, 10],
    [3, 1, 1, 0, 1, 170, 80, 1, 7, 15, 2, 40, 1, 10],
    [5, 1, 1, 0, 5, 170, 80, 1, 7, 15, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 130, 80, 0, 7, 15, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 10, 2, 40, 1, 7],
    [7, 0, 2, 1, 1, 170, 70, 1, 3, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 5, 130, 80, 1, 7, 15, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 170, 80, 0, 5, 5, 2, 40, 1, 5],
    [3, 1, 1, 0, 1, 170, 80, 1, 7, 5, 2, 40, 1, 10],
    [5, 1, 1, 0, 5, 130, 80, 1, 7, 15, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 5, 5, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 5, 5, 2, 40, 1, 7],
    [7, 1, 1, 1, 1, 130, 80, 0, 3, 15, 2, 40, 1, 7],
    [5, 0, 2, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 5],
    [7, 1, 1, 0, 5, 170, 60, 1, 3, 5, 2, 40, 0, 10],
    [3, 1, 1, 0, 1, 170, 70, 1, 7, 5, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 150, 80, 0, 3, 15, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 170, 80, 0, 3, 10, 2, 40, 1, 5],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 1, 150, 80, 1, 7, 15, 2, 40, 1, 10],
    [7, 0, 1, 1, 1, 170, 60, 1, 3, 5, 2, 40, 0, 10],
    [7, 0, 2, 1, 1, 150, 80, 0, 3, 10, 2, 40, 1, 10],
    [7, 1, 1, 0, 5, 170, 80, 1, 7, 5, 2, 40, 1, 10],
    [7, 0, 1, 1, 1, 150, 80, 0, 3, 10, 2, 40, 1, 10],
    [5, 0, 2, 1, 1, 170, 80, 0, 3, 15, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 150, 80, 0, 3, 15, 2, 40, 1, 7],
    [3, 1, 1, 0, 5, 170, 60, 0, 5, 5, 2, 40, 1, 5],
    [5, 0, 1, 1, 1, 150, 80, 0, 3, 10, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 5],
    [5, 0, 2, 1, 1, 130, 80, 0, 3, 5, 2, 40, 1, 7],
    [7, 0, 2, 1, 1, 150, 80, 0, 3, 5, 2, 40, 1, 5],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 5, 2, 40, 1, 5],
    [3, 1, 1, 0, 5, 170, 70, 1, 7, 5, 2, 40, 1, 10],
    [5, 1, 1, 0, 1, 170, 70, 1, 7, 5, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 80, 0, 3, 10, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 170, 80, 1, 5, 5, 2, 40, 1, 10],
    [3, 0, 3, 1, 5, 170, 60, 1, 7, 15, 2, 40, 1, 5],
    [7, 0, 2, 1, 1, 150, 80, 0, 3, 10, 2, 40, 1, 7],
    [7, 0, 2, 1, 1, 170, 80, 0, 3, 15, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 5, 5, 2, 40, 1, 5],
    [5, 0, 2, 1, 1, 170, 70, 1, 3, 5, 2, 40, 1, 7],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 15, 2, 40, 1, 10],
    [5, 0, 2, 1, 1, 130, 80, 1, 3, 5, 2, 40, 1, 10],
    [5, 0, 2, 1, 1, 170, 80, 0, 3, 5, 2, 40, 1, 5],
    [7, 1, 1, 0, 5, 170, 80, 1, 3, 5, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 150, 80, 1, 3, 5, 2, 40, 1, 10],
    [7, 1, 1, 0, 5, 170, 80, 1, 3, 15, 2, 40, 1, 5],
    [5, 0, 3, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 7],
    [7, 0, 1, 1, 1, 130, 80, 0, 3, 10, 2, 40, 1, 7],
    [5, 0, 2, 1, 1, 130, 80, 0, 3, 5, 2, 40, 1, 5],
    [7, 0, 1, 1, 1, 170, 60, 1, 3, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 5, 170, 80, 0, 3, 5, 2, 40, 1, 10],
    [7, 0, 3, 1, 1, 170, 80, 1, 3, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 1, 170, 80, 1, 7, 5, 2, 40, 0, 10],
    [5, 0, 2, 1, 1, 150, 80, 1, 3, 5, 2, 40, 1, 10],
    [7, 0, 3, 1, 1, 150, 80, 1, 3, 5, 2, 40, 1, 10],
    [5, 0, 2, 1, 1, 130, 80, 0, 3, 5, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 70, 1, 3, 5, 2, 40, 1, 10],
    [7, 0, 1, 1, 1, 130, 80, 0, 3, 15, 2, 40, 1, 10],
    [3, 1, 1, 1, 1, 170, 80, 1, 7, 15, 2, 40, 1, 10],
    [3, 1, 1, 0, 5, 170, 80, 0, 5, 5, 2, 40, 1, 10],
    [7, 0, 1, 1, 1, 150, 80, 0, 3, 15, 2, 40, 1, 10],
    [7, 0, 1, 1, 1, 130, 80, 0, 3, 15, 2, 40, 1, 7],
    [3, 1, 1, 0, 5, 130, 80, 1, 7, 10, 2, 40, 1, 10],
    [5, 0, 2, 1, 1, 170, 80, 0, 3, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 1, 150, 80, 1, 5, 15, 2, 40, 1, 10],
    [5, 1, 1, 0, 5, 170, 80, 0, 3, 5, 2, 40, 1, 10],
    [7, 0, 2, 1, 1, 170, 80, 0, 3, 5, 2, 40, 1, 7],
    [5, 0, 2, 1, 1, 150, 80, 0, 3, 15, 2, 40, 1, 10],
    [5, 1, 1, 0, 5, 170, 80, 0, 3, 5, 2, 40, 1, 5],
    [5, 0, 2, 1, 1, 150, 80, 0, 3, 10, 2, 40, 1, 10],
    [3, 1, 1, 0, 1, 170, 80, 1, 3, 10, 2, 40, 0, 5],
    [7, 1, 1, 1, 5, 170, 80, 1, 3, 15, 2, 40, 1, 5],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 5, 2, 40, 0, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 5, 5, 2, 40, 0, 10],
    [3, 1, 1, 0, 1, 170, 80, 1, 3, 10, 2, 40, 1, 5],
    [7, 1, 1, 1, 1, 130, 80, 0, 3, 10, 2, 40, 1, 10],
    [7, 1, 1, 1, 1, 130, 80, 0, 3, 10, 2, 40, 1, 7],
    [5, 0, 2, 1, 1, 130, 80, 0, 5, 5, 2, 40, 1, 7],
    [3, 1, 1, 0, 5, 130, 80, 1, 7, 15, 2, 40, 1, 5],
    [7, 0, 2, 1, 1, 150, 70, 1, 3, 5, 2, 40, 1, 10],
    [3, 1, 1, 1, 1, 150, 80, 1, 7, 15, 2, 40, 1, 10],
    [5, 0, 1, 1, 1, 130, 80, 0, 3, 15, 2, 40, 1, 7],
    [5, 0, 1, 1, 1, 170, 80, 0, 3, 10, 2, 40, 1, 10],
    [3, 1, 1, 0, 3, 170, 70, 1, 7, 5, 2, 40, 1, 10],
    [7, 0, 3, 1, 5, 150, 60, 1, 7, 5, 2, 40, 0, 5],
]), resultFilePath, iterations, percentiles, debugMode);
benchManager.calculateBenchmarks().then(() => {
    console.log('Successfully finished');
});
if (debugMode) {
    setInterval(() => {
        console.log(workerPool.stats());
    }, 10000);
}
