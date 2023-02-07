import {SolverRunParameters} from "../TetrisSolver/Common";

export class RunInfo {
    constructor(
        public date: Date,
        public parameters: SolverRunParameters,
        public result: RunResult,
    ) {}
}

export class RunResult {
    constructor(
        public figuresFallenPerRuns: number[],
    ) {}
}

export class StatisticsHelper {
    public static calculatePercentiles(original: number[], percentiles: number[]): number[] {
        original.sort((a,b) => b - a);
        let percentileValues: Array<number> = [];
        percentiles.forEach(percentile => {
            percentileValues.push(original[Math.floor(original.length / 100 * percentile)]);
        });
        return percentileValues;
    }

    public static calculateAverage(original: number[]): number {
        return original.reduce((a, b) => a + b, 0) / original.length;
    }
}
