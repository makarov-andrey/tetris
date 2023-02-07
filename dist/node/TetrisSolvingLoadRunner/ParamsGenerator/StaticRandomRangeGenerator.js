"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticRandomRangeGenerator = void 0;
const Common_1 = require("../../TetrisSolver/Common");
const FillableCellsCalculator_1 = require("../../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator");
const FilledHeightCalculator_1 = require("../../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator");
const HolesV1Calculator_1 = require("../../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator");
const SquashedRowsCalculator_1 = require("../../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator");
const TunnelsCalculator_1 = require("../../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator");
class StaticRandomRangeGenerator {
    fillableCellsMinimumValuableHeight = [0, 10];
    fillableCellsPowMultiplier = [0, 3];
    fillableCellsMultiplier = [0, 5];
    filledHeightPowMultiplier = [0, 3];
    filledHeightMultiplier = [0, 5];
    holesV1CountDecreaseMultiplier = [50, 250];
    holesV1CountIncreaseMultiplier = [30, 150];
    holesV1CoveredHeightPowMultiplier = [0, 3];
    holesV1CoveredHeightMultiplier = [0, 7];
    squashedRowsMultiplier = [0, 30];
    tunnelsMinimumValuableHeight = [1, 5];
    tunnelsCountMultiplier = [0, 100];
    tunnelsHeightPowMultiplier = [0, 3];
    tunnelsHeightMultiplier = [5, 20];
    *generate() {
        while (true) {
            yield new Common_1.SolverRunParameters(new FillableCellsCalculator_1.FillableCellsCalculatorParams(this.randInt(this.fillableCellsMinimumValuableHeight), this.randDouble(this.fillableCellsPowMultiplier), this.randDouble(this.fillableCellsMultiplier)), new FilledHeightCalculator_1.FilledHeightCalculatorParams(this.randDouble(this.filledHeightPowMultiplier), this.randDouble(this.filledHeightMultiplier)), new HolesV1Calculator_1.HolesV1CalculatorParams(this.randDouble(this.holesV1CountDecreaseMultiplier), this.randDouble(this.holesV1CountIncreaseMultiplier), this.randDouble(this.holesV1CoveredHeightPowMultiplier), this.randDouble(this.holesV1CoveredHeightMultiplier)), new SquashedRowsCalculator_1.SquashedRowsCalculatorParams(this.randDouble(this.squashedRowsMultiplier)), new TunnelsCalculator_1.TunnelsCalculatorParams(this.randInt(this.tunnelsMinimumValuableHeight), this.randDouble(this.tunnelsCountMultiplier), this.randDouble(this.tunnelsHeightPowMultiplier), this.randDouble(this.tunnelsHeightMultiplier)));
        }
    }
    randDouble([min, max]) {
        return Math.random() * (max - min) + min;
    }
    randInt(range) {
        return Math.round(this.randDouble(range));
    }
    async init() {
        return;
    }
}
exports.StaticRandomRangeGenerator = StaticRandomRangeGenerator;
