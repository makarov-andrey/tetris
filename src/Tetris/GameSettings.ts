import {Figure} from "./Figures";

export class GameSettings {
    constructor(
        public fieldWidth: number,
        public fieldHeight: number,
        public figures: Figure[],
    ) {}
}
