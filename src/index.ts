import { TetrisFacade } from './Tetris/TetrisFacade'

document.addEventListener('DOMContentLoaded', () => {
    let tetris = new TetrisFacade();
    tetris.start();
})
