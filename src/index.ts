import { TetrisFacade } from './Tetris/TetrisFacade'
import {EventBus} from "./Tetris/EventBus/EventBus";
import {CommandBus} from "./Tetris/CommandBus/CommandBus";
import {TetrisSolver} from "./TetrisSolver/TetrisSolver";

document.addEventListener('DOMContentLoaded', () => {
    const eventBus = new EventBus();
    const commandBus = new CommandBus();
    let tetris = new TetrisFacade(eventBus, commandBus);
    let solver = new TetrisSolver(eventBus, commandBus);

    tetris.start();
})
