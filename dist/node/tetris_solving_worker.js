"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workerpool_1 = __importDefault(require("workerpool"));
const BenchSolverFacade_1 = require("./TetrisSolvingBench/BenchSolverFacade");
const EventBus_1 = require("./Tetris/EventBus/EventBus");
const Common_1 = require("./TetrisSolvingBench/Common");
function solveTetris(paramsTuple) {
    const params = Common_1.BenchRunParameters.fromTuple(paramsTuple);
    const eventBus = new EventBus_1.EventBus();
    let bench = new BenchSolverFacade_1.BenchSolverFacade(params, eventBus);
    bench.start();
    return new Promise(resolve => {
        eventBus.on(EventBus_1.EventType.FallingTickProcessed, (event) => {
            if (event.gameData.stats.figuresFallen >= 1000000) {
                bench.pause();
                resolve(event.gameData.stats.figuresFallen);
            }
        });
        eventBus.on(EventBus_1.EventType.GameOver, (event) => {
            resolve(event.gameData.stats.figuresFallen);
        });
    });
}
// create a worker and register public functions
workerpool_1.default.worker({
    solveTetris: solveTetris,
});
