export enum FigureTurnState {
    One,
    Two,
    Three,
    Four,
}

export interface Figure {
    /**
     * Any figure must be able to turn 4 times in 2 dimensions.
     * All turns are clockwise.
     */
    getTurn(figureTurnState: FigureTurnState): boolean[][];
    getFirstTurn(): boolean[][];
    getSecondTurn(): boolean[][];
    getThirdTurn(): boolean[][];
    getForthTurn(): boolean[][];
}

export abstract class AbstractFigure implements Figure{
    public abstract getFirstTurn(): boolean[][];
    public abstract getSecondTurn(): boolean[][];
    public abstract getThirdTurn(): boolean[][];
    public abstract getForthTurn(): boolean[][];

    getTurn(figureTurnState: FigureTurnState): boolean[][] {
        switch (figureTurnState) {
            case FigureTurnState.One:
                return this.getFirstTurn();
            case FigureTurnState.Two:
                return this.getSecondTurn();
            case FigureTurnState.Three:
                return this.getThirdTurn();
            case FigureTurnState.Four:
                return this.getForthTurn();
        }
    }
}

/**
 * This class gives an easy way to define figures for tetris.
 * Just implement the getFigure method and return figure like this:
 * ```(ts)
 * protected getFigure(): boolean[][] {
 *     return [
 *         [true,  true, true],
 *         [false, true, false],
 *         [true,  true, true],
 *     ];
 * }
 * ```
 *
 * Or define it like this for more visual presentation:
 * ```(ts)
 * protected getFigure(): boolean[][] {
 *     return [
 *         "###".split("").map(item => item === "#"),
 *         "-#-".split("").map(item => item === "#"),
 *         "###".split("").map(item => item === "#"),
 *     ];
 * }
 * ```
 */
export abstract class SimplyRotatableFigure extends AbstractFigure {
    protected abstract getFigure(): boolean[][];

    private getNormalizedFigure(): boolean[][] {
        let figure = this.getFigure();
        let theLongestRowSize = figure.reduce(
            (previous, current) => Math.max(previous, current.length),
            0
        );
        return figure.map(row => {
            let originalLength = row.length;
            row.length = theLongestRowSize;
            return row.fill(false, originalLength - 1, theLongestRowSize - 1);
        });
    }

    public getFirstTurn(): boolean[][] {
        return this.getNormalizedFigure();
    }

    public getSecondTurn(): boolean[][] {
        let originalFigure = this.getNormalizedFigure();
        let turnedFigure: boolean[][] = [];
        let originalFigureHeight = originalFigure.length;
        let originalFigureWidth = originalFigure[0].length;
        for (let x = 0; x < originalFigureWidth; x++) {
            turnedFigure[x] = new Array(originalFigureHeight).fill(false);
            for (let y = 0; y < originalFigureHeight; y++) {
                turnedFigure[x][originalFigureHeight - y - 1] = originalFigure[y][x];
            }
        }
        return turnedFigure;
    }

    public getThirdTurn(): boolean[][] {
        return this.getFirstTurn().reverse().map(row => row.reverse());
    }

    public getForthTurn(): boolean[][] {
        return this.getSecondTurn().reverse().map(row => row.reverse());
    }
}

export class TFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "###".split("").map(item => item === "#"),
            "-#-".split("").map(item => item === "#"),
        ];
    }
}

export class RightLFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "###".split("").map(item => item === "#"),
            "--#".split("").map(item => item === "#"),
        ];
    }
}

export class LeftLFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "###".split("").map(item => item === "#"),
            "#--".split("").map(item => item === "#"),
        ];
    }
}

export class SquareFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "##".split("").map(item => item === "#"),
            "##".split("").map(item => item === "#"),
        ];
    }
}

export class StickFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "####".split("").map(item => item === "#"),
        ];
    }
}

export class LZFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "##-".split("").map(item => item === "#"),
            "-##".split("").map(item => item === "#"),
        ];
    }
}


export class RZFigure extends SimplyRotatableFigure {
    protected getFigure(): boolean[][] {
        return [
            "-##".split("").map(item => item === "#"),
            "##-".split("").map(item => item === "#"),
        ];
    }
}
