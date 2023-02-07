import {ParamsGeneratorInterface} from "./ParamsGeneratorInterface";
import {SolverRunParameters, SolverRunParametersTuple} from "../../TetrisSolver/Common";

export class StaticArrayGenerator implements ParamsGeneratorInterface {
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
