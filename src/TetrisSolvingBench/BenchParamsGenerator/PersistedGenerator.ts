import {BenchParamsGeneratorInterface, UnexpectedNotInitializedStateError} from "./BenchParamsGeneratorInterface";
import * as readline from 'readline';
import * as fs from 'fs';
import {SolverRunParameters} from "../../TetrisSolver/Common";

export class PersistedGenerator implements BenchParamsGeneratorInterface {
    private params?: Array<string>;

    constructor(
        private readonly baseGenerator: BenchParamsGeneratorInterface,
        private readonly resultFileName: string,
        private readonly debugMode: boolean,
        private readonly shuffle: boolean = true,
    ) {}

    *generate(): Generator<SolverRunParameters> {
        if (this.params === undefined) {
            throw new UnexpectedNotInitializedStateError('The generator must be initialized before using');
        }
        for (let stringyParamsTuple of this.params) {
            const paramsTuple = stringyParamsTuple.split(',').map(val => Number.parseFloat(val));
            yield SolverRunParameters.fromTuple(paramsTuple);
        }
    }

    async init() {
        if (this.params !== undefined) {
            return;
        }

        if (this.debugMode) {
            console.log('Started to collect params');
        }

        let paramsSet: Set<string> = new Set();
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

        fileReadInterface.on('line', (line: string) => {
            try {
                paramsSet.delete(JSON.parse(line).par.join(','));
            } catch (e: any) {}
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
