import {BenchParamsGeneratorInterface, UnexpectedNotInitializedStateError} from "./BenchParamsGeneratorInterface";
import {BenchRunParameters} from "../Common";
import * as readline from 'readline';
import * as fs from 'fs';

export class PersistedGenerator implements BenchParamsGeneratorInterface {
    private paramsSet?: Set<string>;

    constructor(
        private readonly baseGenerator: BenchParamsGeneratorInterface,
        private readonly resultFileName: string
    ) {}

    *generate(): Generator<BenchRunParameters> {
        if (this.paramsSet === undefined) {
            throw new UnexpectedNotInitializedStateError('The generator must be initialized before using');
        }
        for (let stringyParamsTuple of this.paramsSet) {
            const paramsTuple = stringyParamsTuple.split(',').map(val => Number.parseFloat(val));
            yield BenchRunParameters.fromTuple(paramsTuple);
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

        fileReadInterface.on('line', (line: string) => {
            try {
                this.paramsSet?.delete(JSON.parse(line).par.join(','));
            } catch (e: any) {}
        });

        await new Promise(resolve => {
            fileReadInterface.once('close', resolve);
        });
    }
}
