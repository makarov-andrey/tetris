"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RZFigure = exports.LZFigure = exports.StickFigure = exports.SquareFigure = exports.LeftLFigure = exports.RightLFigure = exports.TFigure = exports.SimplyRotatableFigure = exports.AbstractFigure = exports.FigureTurnState = void 0;
var FigureTurnState;
(function (FigureTurnState) {
    FigureTurnState[FigureTurnState["One"] = 0] = "One";
    FigureTurnState[FigureTurnState["Two"] = 1] = "Two";
    FigureTurnState[FigureTurnState["Three"] = 2] = "Three";
    FigureTurnState[FigureTurnState["Four"] = 3] = "Four";
})(FigureTurnState = exports.FigureTurnState || (exports.FigureTurnState = {}));
class AbstractFigure {
    getTurn(figureTurnState) {
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
exports.AbstractFigure = AbstractFigure;
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
class SimplyRotatableFigure extends AbstractFigure {
    getNormalizedFigure() {
        let figure = this.getFigure();
        let theLongestRowSize = figure.reduce((previous, current) => Math.max(previous, current.length), 0);
        return figure.map(row => {
            let originalLength = row.length;
            row.length = theLongestRowSize;
            return row.fill(false, originalLength - 1, theLongestRowSize - 1);
        });
    }
    getFirstTurn() {
        return this.getNormalizedFigure();
    }
    getSecondTurn() {
        let originalFigure = this.getNormalizedFigure();
        let turnedFigure = [];
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
    getThirdTurn() {
        return this.getFirstTurn().reverse().map(row => row.reverse());
    }
    getForthTurn() {
        return this.getSecondTurn().reverse().map(row => row.reverse());
    }
}
exports.SimplyRotatableFigure = SimplyRotatableFigure;
class TFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "###".split("").map(item => item === "#"),
            "-#-".split("").map(item => item === "#"),
        ];
    }
}
exports.TFigure = TFigure;
class RightLFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "###".split("").map(item => item === "#"),
            "--#".split("").map(item => item === "#"),
        ];
    }
}
exports.RightLFigure = RightLFigure;
class LeftLFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "###".split("").map(item => item === "#"),
            "#--".split("").map(item => item === "#"),
        ];
    }
}
exports.LeftLFigure = LeftLFigure;
class SquareFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "##".split("").map(item => item === "#"),
            "##".split("").map(item => item === "#"),
        ];
    }
}
exports.SquareFigure = SquareFigure;
class StickFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "####".split("").map(item => item === "#"),
        ];
    }
}
exports.StickFigure = StickFigure;
class LZFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "##-".split("").map(item => item === "#"),
            "-##".split("").map(item => item === "#"),
        ];
    }
}
exports.LZFigure = LZFigure;
class RZFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "-##".split("").map(item => item === "#"),
            "##-".split("").map(item => item === "#"),
        ];
    }
}
exports.RZFigure = RZFigure;
