import {SolverRunParameters} from "../../TetrisSolver/Common";

export class UnexpectedNotInitializedStateError extends Error {}

export interface ParamsGeneratorInterface {
    init(): Promise<void>;

    /**
     * @throws UnexpectedNotInitializedStateError
     */
    generate(): Iterable<SolverRunParameters>;
}
