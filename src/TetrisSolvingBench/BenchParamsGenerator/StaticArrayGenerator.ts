import {BenchParamsGeneratorInterface} from "./BenchParamsGeneratorInterface";
import {SolverRunParameters, SolverRunParametersTuple} from "../../TetrisSolver/Common";

export class StaticArrayGenerator implements BenchParamsGeneratorInterface {
    constructor(
        private list: SolverRunParametersTuple[] = []
    ) {}

    generate(): Iterable<SolverRunParameters> {
        return this.list.map(params => SolverRunParameters.fromTuple(params));
    }

    async init(): Promise<void> {
        return;
    }
}
