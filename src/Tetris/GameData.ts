import {FallingFigure} from "./Structures";
import {GameSettings} from "./GameSettings";
import {LeftLFigure, LZFigure, RightLFigure, RZFigure, SquareFigure, StickFigure, TFigure} from "./Figures";

export class GameData {
    constructor(
        public isInitialized: boolean = false,
        public isGameOver: boolean = false,
        public fallingFigures: FallingFigure[] = [],
        public matrix: boolean[][] = [],
        public nextTickTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {}),
        public settings: GameSettings,
    ) {}

    static makeSimple(width: number = 12, height: number = 25): GameData {
        return new GameData(
            false,
            false,
            [],
            new Array(height).fill([])
                .map(_ => new Array(width).fill(false)),
            setTimeout(() => {}),
            new GameSettings(
                width,
                height,
                [
                    new TFigure(),
                    new RightLFigure(),
                    new LeftLFigure(),
                    new SquareFigure(),
                    new StickFigure(),
                    new LZFigure(),
                    new RZFigure(),
                ],
            ),
        )
    }
}
