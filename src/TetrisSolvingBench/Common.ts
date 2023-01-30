import {FillableCellsCalculatorParams} from "../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculatorParams} from "../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1CalculatorParams} from "../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculatorParams} from "../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculatorParams} from "../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator";

export type BenchRunParametersTuple = [
    number, // fillableCellsCalculatorParams.minimumValuableHeight,
    number, // fillableCellsCalculatorParams.powMultiplier,
    number, // fillableCellsCalculatorParams.multiplier,
    number, // filledHeightCalculatorParams.powMultiplier,
    number, // filledHeightCalculatorParams.multiplier,
    number, // holesV1CalculatorParams.countDecreaseMultiplier,
    number, // holesV1CalculatorParams.countIncreaseMultiplier,
    number, // holesV1CalculatorParams.coveredHeightPowMultiplier,
    number, // holesV1CalculatorParams.coveredHeightMultiplier,
    number, // squashedRowsCalculatorParams.multiplier,
    number, // tunnelsCalculatorParams.minimumValuableHeight,
    number, // tunnelsCalculatorParams.countMultiplier,
    number, // tunnelsCalculatorParams.heightPowMultiplier,
    number, // tunnelsCalculatorParams.heightMultiplier,
];

export class BenchRunParameters {
    constructor(
        public readonly fillableCellsCalculatorParams: FillableCellsCalculatorParams,
        public readonly filledHeightCalculatorParams: FilledHeightCalculatorParams,
        public readonly holesV1CalculatorParams: HolesV1CalculatorParams,
        public readonly squashedRowsCalculatorParams: SquashedRowsCalculatorParams,
        public readonly tunnelsCalculatorParams: TunnelsCalculatorParams,
    ) {}

    public toTuple(): BenchRunParametersTuple {
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

    public static fromTuple(tuple: Array<number>): BenchRunParameters;
    public static fromTuple(tuple: BenchRunParametersTuple): BenchRunParameters {
        return new BenchRunParameters(
            new FillableCellsCalculatorParams(tuple[0],tuple[1],tuple[2]),
            new FilledHeightCalculatorParams(tuple[3],tuple[4]),
            new HolesV1CalculatorParams(tuple[5],tuple[6],tuple[7],tuple[8]),
            new SquashedRowsCalculatorParams(tuple[9]),
            new TunnelsCalculatorParams(tuple[10],tuple[11],tuple[12],tuple[13]),
        );
    }
}
