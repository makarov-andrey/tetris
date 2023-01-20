import {FallingFigure} from "../Tetris/Common";


export enum PushInDirection {
    Left,
    Right,
}

export class FigurePlacingResult {
    constructor(
        public figuresTargetStates: Map<FallingFigure, FallingFigure>,
        public pushInDirection: PushInDirection|undefined,
    ) {}
}
