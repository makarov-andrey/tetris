import {FillableCellsCalculatorParams} from "../../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculatorParams} from "../../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1CalculatorParams} from "../../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculatorParams} from "../../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculatorParams} from "../../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator";
import {ParamsGeneratorInterface} from "./ParamsGeneratorInterface";
import {SolverRunParameters} from "../../TetrisSolver/Common";

export class StaticMultiplierGenerator implements ParamsGeneratorInterface {
    private readonly fillableCellsMinimumValuableHeight = [5, 3, 7];
    private readonly fillableCellsPowMultiplier = [0, 1];
    private readonly fillableCellsMultiplier = [2, 1, 3];

    private readonly filledHeightPowMultiplier = [0, 1];
    private readonly filledHeightMultiplier = [3, 1, 5];

    private readonly holesV1CountDecreaseMultiplier = [150, 130, 170];
    private readonly holesV1CountIncreaseMultiplier = [70, 60, 80];
    private readonly holesV1CoveredHeightPowMultiplier = [0, 1];
    private readonly holesV1CoveredHeightMultiplier = [5, 3, 7];

    private readonly squashedRowsMultiplier = [10, 5, 15];

    private readonly tunnelsMinimumValuableHeight = [3, 2, 4];
    private readonly tunnelsCountMultiplier = [70, 40, 90];
    private readonly tunnelsHeightPowMultiplier = [1, 0];
    private readonly tunnelsHeightMultiplier = [7, 5, 10];

    public* generate(): Generator<SolverRunParameters> {
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
                                                                yield new SolverRunParameters(
                                                                    new FillableCellsCalculatorParams(
                                                                        fillableCellsMinimumValuableHeight,
                                                                        fillableCellsPowMultiplier,
                                                                        fillableCellsMultiplier,
                                                                    ),
                                                                    new FilledHeightCalculatorParams(
                                                                        filledHeightPowMultipliers,
                                                                        filledHeightMultipliers,
                                                                    ),
                                                                    new HolesV1CalculatorParams(
                                                                        holesV1CountDecreaseMultiplier,
                                                                        holesV1CountIncreaseMultiplier,
                                                                        holesV1CoveredHeightPowMultiplier,
                                                                        holesV1CoveredHeightMultiplier,
                                                                    ),
                                                                    new SquashedRowsCalculatorParams(
                                                                        squashedRowsMultiplier,
                                                                    ),
                                                                    new TunnelsCalculatorParams(
                                                                        tunnelsMinimumValuableHeight,
                                                                        tunnelsCountMultiplier,
                                                                        tunnelsHeightPowMultiplier,
                                                                        tunnelsHeightMultiplier,
                                                                    ),
                                                                );
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

    public count(): number {
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
