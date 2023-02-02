"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchRunParameters = void 0;
const FillableCellsCalculator_1 = require("../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator");
const FilledHeightCalculator_1 = require("../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator");
const HolesV1Calculator_1 = require("../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator");
const SquashedRowsCalculator_1 = require("../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator");
const TunnelsCalculator_1 = require("../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator");
class BenchRunParameters {
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
        return new BenchRunParameters(new FillableCellsCalculator_1.FillableCellsCalculatorParams(tuple[0], tuple[1], tuple[2]), new FilledHeightCalculator_1.FilledHeightCalculatorParams(tuple[3], tuple[4]), new HolesV1Calculator_1.HolesV1CalculatorParams(tuple[5], tuple[6], tuple[7], tuple[8]), new SquashedRowsCalculator_1.SquashedRowsCalculatorParams(tuple[9]), new TunnelsCalculator_1.TunnelsCalculatorParams(tuple[10], tuple[11], tuple[12], tuple[13]));
    }
}
exports.BenchRunParameters = BenchRunParameters;
