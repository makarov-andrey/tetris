import {EventBus} from "./Tetris/EventBus/EventBus";
import {CommandBus} from "./Tetris/CommandBus/CommandBus";
import {TetrisFacade} from './Tetris/TetrisFacade'
import {TetrisSolverFacade} from "./TetrisSolver/TetrisSolverFacade";
import {SolverRunParameters} from "./TetrisSolver/Common";

document.addEventListener('DOMContentLoaded', () => {
    const eventBus = new EventBus();
    const commandBus = new CommandBus();
    let tetris = new TetrisFacade(eventBus, commandBus);
    TetrisSolverFacade.initSolver(
        // SolverRunParameters.fromTuple([3, 1, 1, 0, 5, 170, 80, 1, 7, 5, 2, 40, 1, 10]),
        eventBus,
        commandBus,
    );
    tetris.start();
});
