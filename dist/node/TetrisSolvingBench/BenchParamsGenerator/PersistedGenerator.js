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
    paramsSet;
    constructor(baseGenerator, resultFileName) {
        this.baseGenerator = baseGenerator;
        this.resultFileName = resultFileName;
    }
    *generate() {
        if (this.paramsSet === undefined) {
            throw new BenchParamsGeneratorInterface_1.UnexpectedNotInitializedStateError('The generator must be initialized before using');
        }
        for (let stringyParamsTuple of this.paramsSet) {
            const paramsTuple = stringyParamsTuple.split(',').map(val => Number.parseFloat(val));
            yield Common_1.BenchRunParameters.fromTuple(paramsTuple);
        }
    }
    async init() {
        if (this.paramsSet !== undefined) {
            return;
        }
        this.paramsSet = new Set();
        for (let params of this.baseGenerator.generate()) {
            this.paramsSet.add(params.toTuple().join(','));
        }
        const fileReadInterface = readline.createInterface({
            input: fs.createReadStream(this.resultFileName),
            crlfDelay: Infinity
        });
        fileReadInterface.on('line', (line) => {
            try {
                this.paramsSet?.delete(JSON.parse(line).par.join(','));
            }
            catch (e) { }
        });
        await new Promise(resolve => {
            fileReadInterface.once('close', resolve);
        });
    }
}
exports.PersistedGenerator = PersistedGenerator;
//# sourceMappingURL=PersistedGenerator.js.map