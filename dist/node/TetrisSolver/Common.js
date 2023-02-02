"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hole = exports.FigurePlacingResult = exports.DropPlacingStep = exports.MoveYPlacingStep = exports.MoveXPlacingStep = exports.TurnPlacingStep = void 0;
class TurnPlacingStep {
    target;
    _persisted;
    constructor(target, _persisted) {
        this.target = target;
        this._persisted = _persisted;
    }
    get persisted() {
        return this._persisted;
    }
}
exports.TurnPlacingStep = TurnPlacingStep;
class MoveXPlacingStep {
    target;
    _persisted;
    constructor(target, _persisted) {
        this.target = target;
        this._persisted = _persisted;
    }
    get persisted() {
        return this._persisted;
    }
}
exports.MoveXPlacingStep = MoveXPlacingStep;
class MoveYPlacingStep {
    target;
    constructor(target) {
        this.target = target;
    }
    get persisted() {
        return false;
    }
}
exports.MoveYPlacingStep = MoveYPlacingStep;
class DropPlacingStep {
    get persisted() {
        return false;
    }
}
exports.DropPlacingStep = DropPlacingStep;
class FigurePlacingResult {
    figuresTargetStates;
    placingSteps;
    constructor(figuresTargetStates, placingSteps) {
        this.figuresTargetStates = figuresTargetStates;
        this.placingSteps = placingSteps;
    }
}
exports.FigurePlacingResult = FigurePlacingResult;
class Hole {
    isOpened;
    cells;
    constructor(isOpened, cells) {
        this.isOpened = isOpened;
        this.cells = cells;
    }
}
exports.Hole = Hole;
