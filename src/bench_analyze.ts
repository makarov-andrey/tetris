import * as path from 'path';
import minimist from 'minimist';
import readline from "readline";
import fs from "fs";
import {StaticGenerator} from "./TetrisSolvingBench/BenchParamsGenerator/StaticGenerator";

const argv = minimist(process.argv.slice(2));
const resultFilePath = path.resolve(argv.r || argv.resultFilePath || './result.txt');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val: string) => Number.parseFloat(val));

const fileReadInterface = readline.createInterface({
    input: fs.createReadStream(resultFilePath),
    crlfDelay: Infinity
});

let maxAvg = -Infinity;
let maxAvgLine = "";

let maxPrcLines: [number, string][] = [];

let allLinesCount: number = 0;
let timestampsByHours: Map<number, number[]> = new Map();

fileReadInterface.on('line', (line: string) => {
    try {
        const lineData: {ts: string, par: number[], res:{perc: number[], avg: number}} = JSON.parse(line);
        if (lineData.res.avg > maxAvg) {
            maxAvg = lineData.res.avg;
            maxAvgLine = line;
        }
        lineData.res.perc.forEach((val, index) => {
            let [maxVal, maxLine] = maxPrcLines[index] || [-Infinity, String];
            if (val > maxVal) {
                maxPrcLines[index] = [val, line];
            }
        })

        const eventDate = new Date(lineData.ts);
        const hourStartDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), eventDate.getHours(), 0, 0, 0);

        let timestamps = timestampsByHours.get(hourStartDate.getTime()) || [];
        timestamps.push(eventDate.getTime());
        timestampsByHours.set(hourStartDate.getTime(), timestamps);

        allLinesCount++;
    } catch (e: any) {}
});

fileReadInterface.once('close', () => {
    let linesAwards: Map<string, string[]> = new Map([
        [maxAvgLine, ['Max average']]
    ]);
    maxPrcLines.forEach(([val, line], index) => {
        let awards = linesAwards.get(line) || [];
        awards.push(`Max percentile ${percentiles[index] !== undefined ? percentiles[index] : `by index ${index}`}`);
        linesAwards.set(line, awards);
    });
    linesAwards.forEach((awards, line) => {
        const res: {perc: number[], avg: number} = JSON.parse(line).res
        console.log(line);
        console.log('Awards:', awards);
        console.log();
    });

    const allParamsNumber = new StaticGenerator().count();
    const countedPercent = allLinesCount/allParamsNumber*100;
    const valuableHours = [...timestampsByHours].filter(([hourStartTs, timestamps]) => {
        timestamps.sort((a, b) => a - b);
        const hourEndTs = hourStartTs + 60*60*1000;
        timestamps.push(hourEndTs);
        let lastTs = hourStartTs;
        return  timestamps.every(ts => {
            const result = (ts - lastTs) / 1000 < 120;
            lastTs = ts;
            return result;
        });
    });
    const speedPerHour = valuableHours.reduce((sum, [hourStartTs, timestamps]) => sum + timestamps.length, 0) / valuableHours.length;
    const remainsParams = allParamsNumber-allLinesCount;
    const remainsDays = Math.floor(remainsParams/speedPerHour/24);
    const remainsHours = (remainsParams - (remainsDays*24*speedPerHour))/speedPerHour;
    console.log(`All params number: ${allParamsNumber}`);
    console.log(`Counted: ${allLinesCount}, ${Math.round(countedPercent*100)/100}%`);
    console.log(`Average speed: ${Math.round(speedPerHour*100)/100}/hour`);
    console.log(`Remains ${remainsParams} params, ${remainsDays} days and ${Math.ceil(remainsHours)} hours`);
});
