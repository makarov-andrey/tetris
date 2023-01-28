import {FillableCellsCalculatorParams} from "../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculatorParams} from "../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1CalculatorParams} from "../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculatorParams} from "../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculatorParams} from "../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator";

export class BenchRunParameters {
    constructor(
        public readonly fillableCellsCalculatorParams: FillableCellsCalculatorParams,
        public readonly filledHeightCalculatorParams: FilledHeightCalculatorParams,
        public readonly holesV1CalculatorParams: HolesV1CalculatorParams,
        public readonly squashedRowsCalculatorParams: SquashedRowsCalculatorParams,
        public readonly tunnelsCalculatorParams: TunnelsCalculatorParams,
    ) {}
}
