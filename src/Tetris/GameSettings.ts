import {Figure, LeftLFigure, RightLFigure, SquareFigure, StickFigure, TFigure} from "./Figures";

export class GameSettings {
    constructor(
        public fieldWidth: number,
        public fieldHeight: number,
        public figures: Figure[],
    ) {}
}
