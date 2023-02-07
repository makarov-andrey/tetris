"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolverRunParameters = exports.Hole = exports.FigurePlacingResult = exports.DropPlacingStep = exports.MoveYPlacingStep = exports.MoveXPlacingStep = exports.TurnPlacingStep = exports.SolverData = void 0;
const Common_1 = require("../Tetris/Common");
const FillableCellsCalculator_1 = require("./ScoreCalculator/FillableCells/FillableCellsCalculator");
const FilledHeightCalculator_1 = require("./ScoreCalculator/FilledHeight/FilledHeightCalculator");
const HolesV1Calculator_1 = require("./ScoreCalculator/Holes/HolesV1Calculator");
const SquashedRowsCalculator_1 = require("./ScoreCalculator/SquashedRows/SquashedRowsCalculator");
const TunnelsCalculator_1 = require("./ScoreCalculator/Tunnels/TunnelsCalculator");
class Settings {
    speed;
    constructor(speed) {
        this.speed = speed;
    }
}
class SolverData {
    isResumed;
    settings;
    gameData;
    constructor(isResumed, settings, gameData) {
        this.isResumed = isResumed;
        this.settings = settings;
        this.gameData = gameData;
    }
    static makeSimple() {
        return new SolverData(false, new Settings(5), Common_1.GameData.makeSimple());
    }
}
exports.SolverData = SolverData;
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
class SolverRunParameters {
    fillableCellsCalculatorParams;
    filledHeightCalculatorParams;
    holesV1CalculatorParams;
    squashedRowsCalculatorParams;
    tunnelsCalculatorParams;
    constructor(fillableCellsCalculatorParams, filledHeightCalculatorParams, holesV1CalculatorParams, squashedRowsCalculatorParams, tunnelsCalculatorParams) {
        this.fillableCellsCalculatorParams = fillableCellsCalculatorParams;
        this.filledHeightCalculatorParams = filledHeightCalculatorParams;
        this.holesV1CalculatorParams = holesV1CalculatorParams;
        this.squashedRowsCalculatorParams = squashedRowsCalculatorParams;
        this.tunnelsCalculatorParams = tunnelsCalculatorParams;
    }
    toTuple() {
        return [
            this.fillableCellsCalculatorParams.minimumValuableHeight,
            this.fillableCellsCalculatorParams.powMultiplier,
            this.fillableCellsCalculatorParams.multiplier,
            this.filledHeightCalculatorParams.powMultiplier,
            this.filledHeightCalculatorParams.multiplier,
            this.holesV1CalculatorParams.countDecreaseMultiplier,
            this.holesV1CalculatorParams.countIncreaseMultiplier,
            this.holesV1CalculatorParams.coveredHeightPowMultiplier,
            this.holesV1CalculatorParams.coveredHeightMultiplier,
            this.squashedRowsCalculatorParams.multiplier,
            this.tunnelsCalculatorParams.minimumValuableHeight,
            this.tunnelsCalculatorParams.countMultiplier,
            this.tunnelsCalculatorParams.heightPowMultiplier,
            this.tunnelsCalculatorParams.heightMultiplier,
        ];
    }
    static fromTuple(tuple) {
        return new SolverRunParameters(new FillableCellsCalculator_1.FillableCellsCalculatorParams(tuple[0], tuple[1], tuple[2]), new FilledHeightCalculator_1.FilledHeightCalculatorParams(tuple[3], tuple[4]), new HolesV1Calculator_1.HolesV1CalculatorParams(tuple[5], tuple[6], tuple[7], tuple[8]), new SquashedRowsCalculator_1.SquashedRowsCalculatorParams(tuple[9]), new TunnelsCalculator_1.TunnelsCalculatorParams(tuple[10], tuple[11], tuple[12], tuple[13]));
    }
}
exports.SolverRunParameters = SolverRunParameters;
