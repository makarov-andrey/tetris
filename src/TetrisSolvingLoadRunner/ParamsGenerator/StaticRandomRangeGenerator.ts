import {ParamsGeneratorInterface} from "./ParamsGeneratorInterface";
import {SolverRunParameters} from "../../TetrisSolver/Common";
import {FillableCellsCalculatorParams} from "../../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculatorParams} from "../../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1CalculatorParams} from "../../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculatorParams} from "../../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculatorParams} from "../../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator";

export class StaticRandomRangeGenerator implements ParamsGeneratorInterface {
    private readonly fillableCellsMinimumValuableHeight: [number, number] = [0, 10];
    private readonly fillableCellsPowMultiplier: [number, number] = [0, 3];
    private readonly fillableCellsMultiplier: [number, number] = [0, 5];

    private readonly filledHeightPowMultiplier: [number, number] = [0, 3];
    private readonly filledHeightMultiplier: [number, number] = [0, 5];

    private readonly holesV1CountDecreaseMultiplier: [number, number] = [50, 250];
    private readonly holesV1CountIncreaseMultiplier: [number, number] = [30, 150];
    private readonly holesV1CoveredHeightPowMultiplier: [number, number] = [0, 3];
    private readonly holesV1CoveredHeightMultiplier: [number, number] = [0, 7];

    private readonly squashedRowsMultiplier: [number, number] = [0, 30];

    private readonly tunnelsMinimumValuableHeight: [number, number] = [1,5];
    private readonly tunnelsCountMultiplier: [number, number] = [0, 100];
    private readonly tunnelsHeightPowMultiplier: [number, number] = [0, 3];
    private readonly tunnelsHeightMultiplier: [number, number] = [5, 20];

    *generate(): Iterable<SolverRunParameters> {
        while(true) {
            yield new SolverRunParameters(
                new FillableCellsCalculatorParams(
                    this.randInt(this.fillableCellsMinimumValuableHeight),
                    this.randDouble(this.fillableCellsPowMultiplier),
                    this.randDouble(this.fillableCellsMultiplier),
                ),
                new FilledHeightCalculatorParams(
                    this.randDouble(this.filledHeightPowMultiplier),
                    this.randDouble(this.filledHeightMultiplier),
                ),
                new HolesV1CalculatorParams(
                    this.randDouble(this.holesV1CountDecreaseMultiplier),
                    this.randDouble(this.holesV1CountIncreaseMultiplier),
                    this.randDouble(this.holesV1CoveredHeightPowMultiplier),
                    this.randDouble(this.holesV1CoveredHeightMultiplier),
                ),
                new SquashedRowsCalculatorParams(
                    this.randDouble(this.squashedRowsMultiplier),
                ),
                new TunnelsCalculatorParams(
                    this.randInt(this.tunnelsMinimumValuableHeight),
                    this.randDouble(this.tunnelsCountMultiplier),
                    this.randDouble(this.tunnelsHeightPowMultiplier),
                    this.randDouble(this.tunnelsHeightMultiplier),
                ),
            );
        }
    }

    private randDouble([min, max]: [number, number]): number {
        return Math.random() * (max - min) + min;
    }

    private randInt(range: [number, number]): number {
        return Math.round(this.randDouble(range));
    }

    async init(): Promise<void> {
        return;
    }
}
