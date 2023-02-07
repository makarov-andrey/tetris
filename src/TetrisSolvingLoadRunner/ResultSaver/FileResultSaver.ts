import {ResultSaverInterface} from "./ResultSaverInterface";
import {RunInfo, StatisticsHelper} from "../Common";
import fs from "fs";

export class FileResultSaver implements ResultSaverInterface {
    constructor(
        private readonly resultFilePath: string,
        private readonly percentiles: number[],
    ) {}

    async save(run: RunInfo): Promise<void> {
        const log = JSON.stringify({
            ts: run.date.toISOString(),
            par: run.parameters.toTuple(),
            res: {
                perc: StatisticsHelper.calculatePercentiles(run.result.figuresFallenPerRuns, this.percentiles),
                avg: StatisticsHelper.calculateAverage(run.result.figuresFallenPerRuns),
            },
        });
        fs.appendFile(this.resultFilePath, log + '\n', () => {});
    }
}
