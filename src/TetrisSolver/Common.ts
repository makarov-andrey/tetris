import {Coordinate, FallingFigure} from "../Tetris/Common";
import {FigureTurnState} from "../Tetris/Figures";

export interface FigurePlacingStep {
    get persisted(): boolean,
}

export class TurnPlacingStep implements FigurePlacingStep{
    constructor(
        public target: FigureTurnState,
        private _persisted: boolean,
    ) {}

    get persisted(): boolean {
        return this._persisted;
    }
}

export class MoveXPlacingStep implements FigurePlacingStep{
    constructor(
        public target: number,
        private _persisted: boolean,
    ) {}

    get persisted(): boolean {
        return this._persisted;
    }
}

export class MoveYPlacingStep implements FigurePlacingStep{
    constructor(
        public target: number,
    ) {}

    get persisted(): boolean {
        return false;
    }
}

export class DropPlacingStep implements FigurePlacingStep{
    get persisted(): boolean {
        return false;
    }
}

export class FigurePlacingResult {
    constructor(
        public figuresTargetStates: Map<FallingFigure, FallingFigure>,
        public placingSteps: FigurePlacingStep[],
    ) {}
}

export class Hole {
    constructor(
        public isOpened: boolean,
        public cells: Coordinate[],
    ) {}
}
