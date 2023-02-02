"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = require("./Tetris/EventBus/EventBus");
const CommandBus_1 = require("./Tetris/CommandBus/CommandBus");
const TetrisFacade_1 = require("./Tetris/TetrisFacade");
const TetrisSolverFacade_1 = require("./TetrisSolver/TetrisSolverFacade");
document.addEventListener('DOMContentLoaded', () => {
    const eventBus = new EventBus_1.EventBus();
    const commandBus = new CommandBus_1.CommandBus();
    let tetris = new TetrisFacade_1.TetrisFacade(eventBus, commandBus);
    TetrisSolverFacade_1.TetrisSolverFacade.initSolver(eventBus, commandBus);
    tetris.start();
});
