"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsHelper = exports.RunResult = exports.RunInfo = void 0;
class RunInfo {
    date;
    parameters;
    result;
    constructor(date, parameters, result) {
        this.date = date;
        this.parameters = parameters;
        this.result = result;
    }
}
exports.RunInfo = RunInfo;
class RunResult {
    figuresFallenPerRuns;
    constructor(figuresFallenPerRuns) {
        this.figuresFallenPerRuns = figuresFallenPerRuns;
    }
}
exports.RunResult = RunResult;
class StatisticsHelper {
    static calculatePercentiles(original, percentiles) {
        original.sort((a, b) => b - a);
        let percentileValues = [];
        percentiles.forEach(percentile => {
            percentileValues.push(original[Math.floor(original.length / 100 * percentile)]);
        });
        return percentileValues;
    }
    static calculateAverage(original) {
        return original.reduce((a, b) => a + b, 0) / original.length;
    }
}
exports.StatisticsHelper = StatisticsHelper;
