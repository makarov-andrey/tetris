import {BenchSolverFacade} from "./TetrisSolvingBench/BenchSolverFacade";
import {EventBus, EventType, FallTickProcessedEvent, GameOverEvent} from "./Tetris/EventBus/EventBus";
import {BenchRunParameters} from "./TetrisSolvingBench/Common";

const workerpool = require('workerpool');

async function solveTetris(params: BenchRunParameters) {
    const eventBus = new EventBus();
    let bench = new BenchSolverFacade(params, eventBus);
    bench.start();
    return await new Promise(resolve => {
        eventBus.on(EventType.FallingTickProcessed, (event: FallTickProcessedEvent) => {
            if (event.gameData.stats.figuresFallen >= 1_000_000) {
                bench.pause();
                resolve(event.gameData);
            }
        });
        eventBus.on(EventType.GameOver, (event: GameOverEvent) => {
            resolve(event.gameData);
        });
    });
}

// create a worker and register public functions
workerpool.worker({
    solveTetris: solveTetris,
});
