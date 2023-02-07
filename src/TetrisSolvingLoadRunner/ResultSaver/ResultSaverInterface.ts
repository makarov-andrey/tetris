import {RunInfo} from "../Common";

export interface ResultSaverInterface {
    save(runResult: RunInfo): Promise<void>;
}
