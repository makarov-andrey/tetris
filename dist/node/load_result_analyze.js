"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const minimist_1 = __importDefault(require("minimist"));
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
const StaticMultiplierGenerator_1 = require("./TetrisSolvingLoadRunner/ParamsGenerator/StaticMultiplierGenerator");
const argv = (0, minimist_1.default)(process.argv.slice(2));
const resultFilePath = path.resolve(argv.r || argv.resultFilePath || './result.txt');
const percentiles = (argv.p || argv.percentiles || '0,50,95,99,99.9').split(',').map((val) => Number.parseFloat(val));
const fileReadInterface = readline_1.default.createInterface({
    input: fs_1.default.createReadStream(resultFilePath),
    crlfDelay: Infinity
});
let maxAvg = -Infinity;
let maxAvgLine = "";
let maxPrcLines = [];
let allLinesCount = 0;
let timestampsByHours = new Map();
fileReadInterface.on('line', (line) => {
    try {
        const lineData = JSON.parse(line);
        if (lineData.res.avg > maxAvg) {
            maxAvg = lineData.res.avg;
            maxAvgLine = line;
        }
        lineData.res.perc.forEach((val, index) => {
            let [maxVal, maxLine] = maxPrcLines[index] || [-Infinity, String];
            if (val > maxVal) {
                maxPrcLines[index] = [val, line];
            }
        });
        const eventDate = new Date(lineData.ts);
        const hourStartDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), eventDate.getHours(), 0, 0, 0);
        let timestamps = timestampsByHours.get(hourStartDate.getTime()) || [];
        timestamps.push(eventDate.getTime());
        timestampsByHours.set(hourStartDate.getTime(), timestamps);
        allLinesCount++;
    }
    catch (e) { }
});
fileReadInterface.once('close', () => {
    let linesAwards = new Map([
        [maxAvgLine, ['Max average']]
    ]);
    maxPrcLines.forEach(([val, line], index) => {
        let awards = linesAwards.get(line) || [];
        awards.push(`Max percentile ${percentiles[index] !== undefined ? percentiles[index] : `by index ${index}`}`);
        linesAwards.set(line, awards);
    });
    linesAwards.forEach((awards, line) => {
        const res = JSON.parse(line).res;
        console.log(line);
        console.log('Awards:', awards);
        console.log();
    });
    const allParamsNumber = new StaticMultiplierGenerator_1.StaticMultiplierGenerator().count();
    const countedPercent = allLinesCount / allParamsNumber * 100;
    const valuableHours = [...timestampsByHours].filter(([hourStartTs, timestamps]) => {
        timestamps.sort((a, b) => a - b);
        const hourEndTs = hourStartTs + 60 * 60 * 1000;
        timestamps.push(hourEndTs);
        let lastTs = hourStartTs;
        return timestamps.every(ts => {
            const result = (ts - lastTs) / 1000 < 120;
            lastTs = ts;
            return result;
        });
    });
    const speedPerHour = valuableHours.reduce((sum, [hourStartTs, timestamps]) => sum + timestamps.length, 0) / valuableHours.length;
    const remainsParams = allParamsNumber - allLinesCount;
    const remainsDays = Math.floor(remainsParams / speedPerHour / 24);
    const remainsHours = (remainsParams - (remainsDays * 24 * speedPerHour)) / speedPerHour;
    console.log(`All params number: ${allParamsNumber}`);
    console.log(`Counted: ${allLinesCount}, ${Math.round(countedPercent * 100) / 100}%`);
    console.log(`Average speed: ${Math.round(speedPerHour * 100) / 100}/hour`);
    console.log(`Remains ${remainsParams} params, ${remainsDays} days and ${Math.ceil(remainsHours)} hours`);
});
