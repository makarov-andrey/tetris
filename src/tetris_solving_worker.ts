import workerpool from 'workerpool';
import {BenchSolverFacade} from "./TetrisSolvingBench/BenchSolverFacade";
import {EventBus, EventType, FallTickProcessedEvent, GameOverEvent} from "./Tetris/EventBus/EventBus";
import {BenchRunParameters, BenchRunParametersTuple} from "./TetrisSolvingBench/Common";

function solveTetris(paramsTuple: BenchRunParametersTuple): Promise<number> {
    const params = BenchRunParameters.fromTuple(paramsTuple);
    const eventBus = new EventBus();
    let bench = new BenchSolverFacade(params, eventBus);
    bench.start();
    return new Promise(resolve => {
        eventBus.on(EventType.FallingTickProcessed, (event: FallTickProcessedEvent) => {
            if (event.gameData.stats.figuresFallen >= 1_000_000) {
                bench.pause();
                resolve(event.gameData.stats.figuresFallen);
            }
        });
        eventBus.on(EventType.GameOver, (event: GameOverEvent) => {
            resolve(event.gameData.stats.figuresFallen);
        });
    });
}

// create a worker and register public functions
workerpool.worker({
    solveTetris: solveTetris,
});
