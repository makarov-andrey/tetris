import {EventBus} from "./Tetris/EventBus/EventBus";
import {CommandBus} from "./Tetris/CommandBus/CommandBus";
import {TetrisFacade} from './Tetris/TetrisFacade'
import {TetrisSolverFacade} from "./TetrisSolver/TetrisSolverFacade";

document.addEventListener('DOMContentLoaded', () => {
    const eventBus = new EventBus();
    const commandBus = new CommandBus();
    let tetris = new TetrisFacade(eventBus, commandBus);
    TetrisSolverFacade.initSolver(eventBus, commandBus);

    tetris.start();
});
