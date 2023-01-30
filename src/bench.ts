import {pool} from 'workerpool'
import {BenchManager} from "./TetrisSolvingBench/BenchManager";
import {StaticGenerator} from "./TetrisSolvingBench/BenchParamsGenerator/StaticGenerator";
import * as path from 'path';
import minimist from 'minimist';
import {PersistedGenerator} from "./TetrisSolvingBench/BenchParamsGenerator/PersistedGenerator";

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
process.on('uncaughtException', function(e) {
    console.log('[uncaughtException] app will be terminated: ', e.stack);
    killProcess();
});

const argv = minimist(process.argv.slice(2));

const threads = Number.parseInt(argv.t || argv.threads || '10');
const iterations = Number.parseInt(argv.i || argv.iterations || '1000');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val: string) => Number.parseFloat(val));
const resultFilePath = path.resolve(argv.r || argv.resultFilePath || './result.txt');

const workerPath = path.resolve('./dist/node/tetris_solving_worker.js');
const workerPool = pool(workerPath, {maxWorkers: threads});

const benchManager = new BenchManager(
    workerPool,
    new PersistedGenerator(
        new StaticGenerator(),
        resultFilePath
    ),
    resultFilePath,
    iterations,
    percentiles,
);

benchManager.calculateBenchmarks().then(() => {
    console.log('Successfully finished');
    killProcess();
});

keepRunning();
