import {Figure, FigureTurnState} from "./Figures";

/**
 * x for horizontal positioning
 * y for vertical positioning
 */
export class Coordinate {
    constructor(
        public x: number,
        public y: number,
    ) {}
}

export class FallingFigure {
    constructor(
        public figure: Figure,
        public position: Coordinate,
        public turnState: FigureTurnState,
    ) {}
}
