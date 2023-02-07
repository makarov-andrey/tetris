import {pool} from 'workerpool'
import * as path from 'path';
import minimist from 'minimist';
import {LoadManager} from "./TetrisSolvingLoadRunner/LoadManager";
import {StaticRandomRangeGenerator} from "./TetrisSolvingLoadRunner/ParamsGenerator/StaticRandomRangeGenerator";
import {PGResultSaver} from "./TetrisSolvingLoadRunner/ResultSaver/PGResultSaver";

const argv = minimist(process.argv.slice(2));

const projectDirPath = argv.h || argv.projectDirPath || process.cwd();
process.chdir(projectDirPath);
const debugMode = (argv.d || argv.debugMode || '0') == '1';
const threads = Number.parseInt(argv.t || argv.threads || '10');
const iterations = Number.parseInt(argv.i || argv.iterations || '1000');
const workerPath = path.resolve('./dist/node/tetris_solving_worker.js');

require('dotenv').config();

function handleSignal(signal: string) {
    console.log(`Received signal ${signal}`);
}

if (debugMode) {
    console.log('Bench counter started in debug mode.');
    console.log('Process id is', process.pid);
    console.log('debugMode:', debugMode);
    console.log('threads:', threads);
    console.log('iterations:', iterations);
    console.log('projectDirPath:', projectDirPath);
    console.log('workerPath:', workerPath);

    [
        'SIGABRT', 'SIGALRM', 'SIGBUS', 'SIGCHLD', 'SIGCONT', 'SIGFPE', 'SIGHUP', 'SIGILL', 'SIGINT', 'SIGIO',
        'SIGIOT', 'SIGPIPE', 'SIGPOLL', 'SIGPROF', 'SIGPWR', 'SIGQUIT', 'SIGSEGV', 'SIGSTKFLT',
        'SIGSYS', 'SIGTERM', 'SIGTRAP', 'SIGTSTP', 'SIGTTIN', 'SIGTTOU', 'SIGUNUSED', 'SIGURG',
        'SIGUSR1', 'SIGUSR2', 'SIGVTALRM', 'SIGWINCH', 'SIGXCPU', 'SIGXFSZ', 'SIGBREAK', 'SIGLOST', 'SIGINFO',
    ].forEach(signal => process.on(signal, handleSignal));
    process.on('exit', (code) => {
        console.log(`Exit with code ${code}`);
        process.exit(code);
    });
    process.on('uncaughtException', (error, origin) => {
        console.log(`Received uncaught exception`, error, origin);
        process.exit(1);
    });
    process.on('unhandledRejection', (promise) => {
        console.log(`Received unhandled rejection`, promise);
    });
}

const workerPool = pool(workerPath, {maxWorkers: threads});

if (debugMode) {
    console.log('Worker pool has been initialized.');
}

const benchManager = new LoadManager(
    workerPool,
    new StaticRandomRangeGenerator(),
    new PGResultSaver(),
    iterations,
    debugMode,
);

benchManager.calculateBenchmarks().then(() => {
    console.log('Successfully finished');
    process.exit(0);
});

if (debugMode) {
    setInterval(() => {
        console.log(workerPool.stats());
    }, 10000)
}
