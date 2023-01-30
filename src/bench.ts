import express from 'express'
import {pool} from 'workerpool'
import {BenchManager} from "./TetrisSolvingBench/BenchManager";
import {StaticGenerator} from "./TetrisSolvingBench/BenchParamsGenerator/StaticGenerator";
import * as path from 'path';
import minimist from 'minimist';
import {PersistedGenerator} from "./TetrisSolvingBench/BenchParamsGenerator/PersistedGenerator";

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
});

const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.listen(3000)
