import {pool} from 'workerpool'
import {BenchManager} from "./TetrisSolvingBench/BenchManager";
import {BenchParamsGenerator} from "./TetrisSolvingBench/BenchParamsGenerator";
import * as path from 'path';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const threads = Number.parseInt(argv.t || argv.threads || '10');
const iterations = Number.parseInt(argv.i || argv.iterations || '1000');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val: string) => Number.parseFloat(val));

const workerPath = path.resolve('./dist/tetris_solving_worker.js');
const workerPool = pool(workerPath, {maxWorkers: threads});

const benchManager = new BenchManager(
    workerPool,
    new BenchParamsGenerator(),
    iterations,
    percentiles
);
await benchManager.startBench();
