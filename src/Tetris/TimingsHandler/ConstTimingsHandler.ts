import {TimingsHandler} from "./TimingsHandler";

export class ConstTimingsHandler implements TimingsHandler {
    constructor(
        public delayMs: number,
    ) {}

    getDelayForNextTickMs(): number {
        return this.delayMs;
    }
}
