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
function handleSignal(signal) {
    console.log(`Received signal ${signal}`);
}
const argv = (0, minimist_1.default)(process.argv.slice(2));
const debugMode = (argv.d || argv.debugMode || '0') == '1';
const threads = Number.parseInt(argv.t || argv.threads || '10');
const iterations = Number.parseInt(argv.i || argv.iterations || '1000');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val) => Number.parseFloat(val));
const projectDirPath = argv.h || argv.projectDirPath;
if (projectDirPath !== undefined) {
    process.chdir(projectDirPath);
}
const resultFilePath = path.resolve(argv.r || argv.resultFilePath || './result.txt');
if (debugMode) {
    console.log('Bench counter started in debug mode.');
    console.log('Process id is', process.pid);
    console.log('Arguments:');
    console.log('debugMode', debugMode);
    console.log('threads', threads);
    console.log('iterations', iterations);
    console.log('percentiles', percentiles);
    console.log('resultFilePath', resultFilePath);
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
const workerPath = path.resolve('./dist/node/tetris_solving_worker.js');
const workerPool = (0, workerpool_1.pool)(workerPath, { maxWorkers: threads });
if (debugMode) {
    console.log('Resolved worker path: ', workerPath);
}
if (debugMode) {
    console.log('Worker pool has been initialized.');
}
const benchManager = new BenchManager_1.BenchManager(workerPool, new PersistedGenerator_1.PersistedGenerator(new StaticGenerator_1.StaticGenerator(), resultFilePath, debugMode), resultFilePath, iterations, percentiles, debugMode);
benchManager.calculateBenchmarks().then(() => {
    console.log('Successfully finished');
});
if (debugMode) {
    setInterval(() => {
        console.log(workerPool.stats());
    }, 10000);
}
//# sourceMappingURL=bench.js.map