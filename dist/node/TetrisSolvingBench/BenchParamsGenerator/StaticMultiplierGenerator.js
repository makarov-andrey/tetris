"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticMultiplierGenerator = void 0;
const FillableCellsCalculator_1 = require("../../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator");
const FilledHeightCalculator_1 = require("../../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator");
const HolesV1Calculator_1 = require("../../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator");
const SquashedRowsCalculator_1 = require("../../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator");
const TunnelsCalculator_1 = require("../../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator");
const Common_1 = require("../../TetrisSolver/Common");
class StaticMultiplierGenerator {
    fillableCellsMinimumValuableHeight = [5, 3, 7];
    fillableCellsPowMultiplier = [0, 1];
    fillableCellsMultiplier = [2, 1, 3];
    filledHeightPowMultiplier = [0, 1];
    filledHeightMultiplier = [3, 1, 5];
    holesV1CountDecreaseMultiplier = [150, 130, 170];
    holesV1CountIncreaseMultiplier = [70, 60, 80];
    holesV1CoveredHeightPowMultiplier = [0, 1];
    holesV1CoveredHeightMultiplier = [5, 3, 7];
    squashedRowsMultiplier = [10, 5, 15];
    tunnelsMinimumValuableHeight = [3, 2, 4];
    tunnelsCountMultiplier = [70, 40, 90];
    tunnelsHeightPowMultiplier = [1, 0];
    tunnelsHeightMultiplier = [7, 5, 10];
    *generate() {
        for (let squashedRowsMultiplier of this.squashedRowsMultiplier) {
            for (let tunnelsHeightPowMultiplier of this.tunnelsHeightPowMultiplier) {
                for (let holesV1CoveredHeightPowMultiplier of this.holesV1CoveredHeightPowMultiplier) {
                    for (let fillableCellsPowMultiplier of this.fillableCellsPowMultiplier) {
                        for (let filledHeightPowMultipliers of this.filledHeightPowMultiplier) {
                            for (let tunnelsMinimumValuableHeight of this.tunnelsMinimumValuableHeight) {
                                for (let tunnelsCountMultiplier of this.tunnelsCountMultiplier) {
                                    for (let tunnelsHeightMultiplier of this.tunnelsHeightMultiplier) {
                                        for (let filledHeightMultipliers of this.filledHeightMultiplier) {
                                            for (let holesV1CoveredHeightMultiplier of this.holesV1CoveredHeightMultiplier) {
                                                for (let holesV1CountDecreaseMultiplier of this.holesV1CountDecreaseMultiplier) {
                                                    for (let holesV1CountIncreaseMultiplier of this.holesV1CountIncreaseMultiplier) {
                                                        for (let fillableCellsMinimumValuableHeight of this.fillableCellsMinimumValuableHeight) {
                                                            for (let fillableCellsMultiplier of this.fillableCellsMultiplier) {
                                                                yield new Common_1.SolverRunParameters(new FillableCellsCalculator_1.FillableCellsCalculatorParams(fillableCellsMinimumValuableHeight, fillableCellsPowMultiplier, fillableCellsMultiplier), new FilledHeightCalculator_1.FilledHeightCalculatorParams(filledHeightPowMultipliers, filledHeightMultipliers), new HolesV1Calculator_1.HolesV1CalculatorParams(holesV1CountDecreaseMultiplier, holesV1CountIncreaseMultiplier, holesV1CoveredHeightPowMultiplier, holesV1CoveredHeightMultiplier), new SquashedRowsCalculator_1.SquashedRowsCalculatorParams(squashedRowsMultiplier), new TunnelsCalculator_1.TunnelsCalculatorParams(tunnelsMinimumValuableHeight, tunnelsCountMultiplier, tunnelsHeightPowMultiplier, tunnelsHeightMultiplier));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    count() {
        return this.fillableCellsMinimumValuableHeight.length
            * this.fillableCellsPowMultiplier.length
            * this.fillableCellsMultiplier.length
            * this.filledHeightPowMultiplier.length
            * this.filledHeightMultiplier.length
            * this.holesV1CountDecreaseMultiplier.length
            * this.holesV1CountIncreaseMultiplier.length
            * this.holesV1CoveredHeightPowMultiplier.length
            * this.holesV1CoveredHeightMultiplier.length
            * this.squashedRowsMultiplier.length
            * this.tunnelsMinimumValuableHeight.length
            * this.tunnelsCountMultiplier.length
            * this.tunnelsHeightPowMultiplier.length
            * this.tunnelsHeightMultiplier.length;
    }
    async init() {
        return;
    }
}
exports.StaticMultiplierGenerator = StaticMultiplierGenerator;
