import {BenchRunParameters} from "../Common";

export class UnexpectedNotInitializedStateError extends Error {}

export interface BenchParamsGeneratorInterface {
    init(): Promise<void>;

    /**
     * @throws UnexpectedNotInitializedStateError
     */
    generate(): Iterable<BenchRunParameters>;
}
