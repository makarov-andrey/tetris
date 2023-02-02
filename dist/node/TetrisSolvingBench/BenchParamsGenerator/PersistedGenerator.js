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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistedGenerator = void 0;
const BenchParamsGeneratorInterface_1 = require("./BenchParamsGeneratorInterface");
const Common_1 = require("../Common");
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
class PersistedGenerator {
    baseGenerator;
    resultFileName;
    debugMode;
    shuffle;
    params;
    constructor(baseGenerator, resultFileName, debugMode, shuffle = true) {
        this.baseGenerator = baseGenerator;
        this.resultFileName = resultFileName;
        this.debugMode = debugMode;
        this.shuffle = shuffle;
    }
    *generate() {
        if (this.params === undefined) {
            throw new BenchParamsGeneratorInterface_1.UnexpectedNotInitializedStateError('The generator must be initialized before using');
        }
        for (let stringyParamsTuple of this.params) {
            const paramsTuple = stringyParamsTuple.split(',').map(val => Number.parseFloat(val));
            yield Common_1.BenchRunParameters.fromTuple(paramsTuple);
        }
    }
    async init() {
        if (this.params !== undefined) {
            return;
        }
        if (this.debugMode) {
            console.log('Started to collect params');
        }
        let paramsSet = new Set();
        for (let params of this.baseGenerator.generate()) {
            paramsSet.add(params.toTuple().join(','));
        }
        if (this.debugMode) {
            console.log(`${paramsSet.size} params have been collected from base generator`);
        }
        const fileReadInterface = readline.createInterface({
            input: fs.createReadStream(this.resultFileName),
            crlfDelay: Infinity
        });
        fileReadInterface.on('line', (line) => {
            try {
                paramsSet.delete(JSON.parse(line).par.join(','));
            }
            catch (e) { }
        });
        await new Promise(resolve => {
            fileReadInterface.once('close', resolve);
        });
        this.params = [...paramsSet];
        if (this.shuffle) {
            for (let i = this.params.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.params[i], this.params[j]] = [this.params[j], this.params[i]];
            }
        }
        if (this.debugMode) {
            console.log(`${paramsSet.size} params remains to process`);
        }
    }
}
exports.PersistedGenerator = PersistedGenerator;
