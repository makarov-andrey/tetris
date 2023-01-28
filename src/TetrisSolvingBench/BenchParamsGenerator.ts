import {BenchRunParameters} from "./Common";
import {FillableCellsCalculatorParams} from "../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculatorParams} from "../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1CalculatorParams} from "../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculatorParams} from "../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculatorParams} from "../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator";

export class BenchParamsGenerator {
    private readonly fillableCellsMinimumValuableHeight = [3,5,7];
    private readonly fillableCellsPowMultiplier = [0];
    private readonly fillableCellsMultiplier = [1,2,3];

    private readonly filledHeightPowMultiplier = [0];
    private readonly filledHeightMultiplier = [1,3,5];

    private readonly holesV1CountDecreaseMultiplier = [130,150,170];
    private readonly holesV1CountIncreaseMultiplier = [60,70,80];
    private readonly holesV1CoveredHeightPowMultiplier = [0];
    private readonly holesV1CoveredHeightMultiplier = [3,5,7];

    private readonly squashedRowsMultiplier = [5,10,15];

    private readonly tunnelsMinimumValuableHeight = [2,3,4];
    private readonly tunnelsCountMultiplier = [40,70,90];
    private readonly tunnelsHeightPowMultiplier = [0];
    private readonly tunnelsHeightMultiplier = [5,7,10];

    public *generate(): Generator<BenchRunParameters> {
        for (let fillableCellsMinimumValuableHeight of this.fillableCellsMinimumValuableHeight) {
            for (let fillableCellsPowMultiplier of this.fillableCellsPowMultiplier) {
                for (let fillableCellsMultiplier of this.fillableCellsMultiplier) {
                    for (let filledHeightPowMultipliers of this.filledHeightPowMultiplier) {
                        for (let filledHeightMultipliers of this.filledHeightMultiplier) {
                            for (let holesV1CountDecreaseMultiplier of this.holesV1CountDecreaseMultiplier) {
                                for (let holesV1CountIncreaseMultiplier of this.holesV1CountIncreaseMultiplier) {
                                    for (let holesV1CoveredHeightPowMultiplier of this.holesV1CoveredHeightPowMultiplier) {
                                        for (let holesV1CoveredHeightMultiplier of this.holesV1CoveredHeightMultiplier) {
                                            for (let squashedRowsMultiplier of this.squashedRowsMultiplier) {
                                                for (let tunnelsMinimumValuableHeight of this.tunnelsMinimumValuableHeight) {
                                                    for (let tunnelsCountMultiplier of this.tunnelsCountMultiplier) {
                                                        for (let tunnelsHeightPowMultiplier of this.tunnelsHeightPowMultiplier) {
                                                            for (let tunnelsHeightMultiplier of this.tunnelsHeightMultiplier) {
                                                                yield new BenchRunParameters(
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
}
