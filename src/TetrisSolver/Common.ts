import {FallingFigure} from "../Tetris/Common";
import {FigureTurnState} from "../Tetris/Figures";

export interface FigurePlacingStep {}

export class TurnPlacingStep implements FigurePlacingStep{
    constructor(
        public target: FigureTurnState
    ) {}
}

export class MoveXPlacingStep implements FigurePlacingStep{
    constructor(
        public target: number
    ) {}
}

export class MoveYPlacingStep implements FigurePlacingStep{
    constructor(
        public target: number
    ) {}
}

export class DropPlacingStep implements FigurePlacingStep{}

export class FigurePlacingResult {
    constructor(
        public figuresTargetStates: Map<FallingFigure, FallingFigure>,
        public placingSteps: FigurePlacingStep[],
    ) {}
}
