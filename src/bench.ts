import {pool} from 'workerpool'
import {BenchManager} from "./TetrisSolvingBench/BenchManager";
import {BenchParamsGenerator} from "./TetrisSolvingBench/BenchParamsGenerator";
import * as path from 'path';

const workerPool = pool(
    path.resolve('./dist/tetris_solving_worker.js'),
    {maxWorkers: 10}
);

const benchManager = new BenchManager(
    workerPool,
    new BenchParamsGenerator(),
);
await benchManager.startBench();
