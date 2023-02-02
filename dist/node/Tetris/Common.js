"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameData = exports.Stats = exports.GameSettings = exports.FallingFigure = exports.Coordinate = void 0;
const Figures_1 = require("./Figures");
/**
 * x for horizontal positioning
 * y for vertical positioning
 */
class Coordinate {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Coordinate = Coordinate;
class FallingFigure {
    figure;
    position;
    turnState;
    color;
    constructor(figure, position, turnState, color = undefined) {
        this.figure = figure;
        this.position = position;
        this.turnState = turnState;
        this.color = color;
    }
}
exports.FallingFigure = FallingFigure;
class GameSettings {
    fieldWidth;
    fieldHeight;
    figures;
    constructor(fieldWidth, fieldHeight, figures) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.figures = figures;
    }
}
exports.GameSettings = GameSettings;
class Stats {
    figuresFallen = 0;
    linesSquashed = 0;
}
exports.Stats = Stats;
class GameData {
    isInitialized;
    isGameOver;
    fallingFigures;
    matrix;
    nextTickTimeoutId;
    settings;
    level;
    score;
    combo;
    stats;
    constructor(isInitialized = false, isGameOver = false, fallingFigures = [], matrix = [], nextTickTimeoutId = setTimeout(() => {
    }), settings, level = 1, score = 0, combo = 0, stats = new Stats()) {
        this.isInitialized = isInitialized;
        this.isGameOver = isGameOver;
        this.fallingFigures = fallingFigures;
        this.matrix = matrix;
        this.nextTickTimeoutId = nextTickTimeoutId;
        this.settings = settings;
        this.level = level;
        this.score = score;
        this.combo = combo;
        this.stats = stats;
    }
    static makeSimple(width = 10, height = 20) {
        return new GameData(false, false, [], new Array(height).fill([])
            .map(_ => new Array(width).fill(false)), setTimeout(() => {
        }), new GameSettings(width, height, [
            new Figures_1.TFigure(),
            new Figures_1.RightLFigure(),
            new Figures_1.LeftLFigure(),
            new Figures_1.SquareFigure(),
            new Figures_1.StickFigure(),
            new Figures_1.LZFigure(),
            new Figures_1.RZFigure(),
        ]));
    }
}
exports.GameData = GameData;
