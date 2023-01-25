import {pool} from 'workerpool'
import {BenchManager} from "./TetrisSolvingBench/BenchManager";

const workerPool = pool(
    '/Users/makarov-and/Projects/fun/tetris/dist/tetris_solving_worker.js',
    {maxWorkers: 10}
);

const benchManager = new BenchManager(workerPool);
await benchManager.startBench();
