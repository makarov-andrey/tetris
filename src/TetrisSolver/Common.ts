import {Coordinate, FallingFigure, GameData} from "../Tetris/Common";
import {FigureTurnState} from "../Tetris/Figures";
import {FillableCellsCalculatorParams} from "./ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculatorParams} from "./ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1CalculatorParams} from "./ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculatorParams} from "./ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculatorParams} from "./ScoreCalculator/Tunnels/TunnelsCalculator";

class Settings {
    constructor(
        public speed: number,
    ) {}
}

export class SolverData {
    constructor(
        public isResumed: boolean,
        public settings: Settings,
        public gameData: GameData,
    ) {}

    static makeSimple(): SolverData {
        return new SolverData(
            false,
            new Settings(5),
            GameData.makeSimple(),
        );
    }
}


export interface FigurePlacingStep {
    get persisted(): boolean,
}

export class TurnPlacingStep implements FigurePlacingStep{
    constructor(
        public target: FigureTurnState,
        private _persisted: boolean,
    ) {}

    get persisted(): boolean {
        return this._persisted;
    }
}

export class MoveXPlacingStep implements FigurePlacingStep{
    constructor(
        public target: number,
        private _persisted: boolean,
    ) {}

    get persisted(): boolean {
        return this._persisted;
    }
}

export class MoveYPlacingStep implements FigurePlacingStep{
    constructor(
        public target: number,
    ) {}

    get persisted(): boolean {
        return false;
    }
}

export class DropPlacingStep implements FigurePlacingStep{
    get persisted(): boolean {
        return false;
    }
}

export class FigurePlacingResult {
    constructor(
        public figuresTargetStates: Map<FallingFigure, FallingFigure>,
        public placingSteps: FigurePlacingStep[],
    ) {}
}

export class Hole {
    constructor(
        public isOpened: boolean,
        public cells: Coordinate[],
    ) {}
}

export type SolverRunParametersTuple = [
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

export class SolverRunParameters {
    constructor(
        public readonly fillableCellsCalculatorParams: FillableCellsCalculatorParams,
        public readonly filledHeightCalculatorParams: FilledHeightCalculatorParams,
        public readonly holesV1CalculatorParams: HolesV1CalculatorParams,
        public readonly squashedRowsCalculatorParams: SquashedRowsCalculatorParams,
        public readonly tunnelsCalculatorParams: TunnelsCalculatorParams,
    ) {
    }

    public toTuple(): SolverRunParametersTuple {
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

    public static fromTuple(tuple: Array<number>): SolverRunParameters;
    public static fromTuple(tuple: SolverRunParametersTuple): SolverRunParameters {
        return new SolverRunParameters(
            new FillableCellsCalculatorParams(tuple[0], tuple[1], tuple[2]),
            new FilledHeightCalculatorParams(tuple[3], tuple[4]),
            new HolesV1CalculatorParams(tuple[5], tuple[6], tuple[7], tuple[8]),
            new SquashedRowsCalculatorParams(tuple[9]),
            new TunnelsCalculatorParams(tuple[10], tuple[11], tuple[12], tuple[13]),
        );
    }
}
