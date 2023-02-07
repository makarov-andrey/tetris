"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileResultSaver = void 0;
const Common_1 = require("../Common");
const fs_1 = __importDefault(require("fs"));
class FileResultSaver {
    resultFilePath;
    percentiles;
    constructor(resultFilePath, percentiles) {
        this.resultFilePath = resultFilePath;
        this.percentiles = percentiles;
    }
    async save(run) {
        const log = JSON.stringify({
            ts: run.date.toISOString(),
            par: run.parameters.toTuple(),
            res: {
                perc: Common_1.StatisticsHelper.calculatePercentiles(run.result.figuresFallenPerRuns, this.percentiles),
                avg: Common_1.StatisticsHelper.calculateAverage(run.result.figuresFallenPerRuns),
            },
        });
        fs_1.default.appendFile(this.resultFilePath, log + '\n', () => { });
    }
}
exports.FileResultSaver = FileResultSaver;
