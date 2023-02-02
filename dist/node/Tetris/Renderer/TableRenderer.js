"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRenderer = exports.TableRendererSettings = exports.TableRendererCellColorSettings = void 0;
const CommandBus_1 = require("../CommandBus/CommandBus");
const EventBus_1 = require("../EventBus/EventBus");
const FigurePlacingChecker_1 = require("../Utils/FigurePlacingChecker");
const Common_1 = require("../Common");
class TableRendererCellColorSettings {
    filled;
    filledGameOver;
    empty;
    constructor(filled, filledGameOver, empty) {
        this.filled = filled;
        this.filledGameOver = filledGameOver;
        this.empty = empty;
    }
}
exports.TableRendererCellColorSettings = TableRendererCellColorSettings;
class TableRendererSettings {
    containerElement;
    renderProjectionFigures;
    matrixCellColors;
    fallingFigureCellColors;
    projectionFigureCellColors;
    constructor(containerElement, renderProjectionFigures = true, matrixCellColors = new TableRendererCellColorSettings('#007400', '#780000', '#fff'), fallingFigureCellColors = new TableRendererCellColorSettings('#007400', '#780000', null), projectionFigureCellColors = new TableRendererCellColorSettings('#b8e5e3', null, null)) {
        this.containerElement = containerElement;
        this.renderProjectionFigures = renderProjectionFigures;
        this.matrixCellColors = matrixCellColors;
        this.fallingFigureCellColors = fallingFigureCellColors;
        this.projectionFigureCellColors = projectionFigureCellColors;
    }
}
exports.TableRendererSettings = TableRendererSettings;
class CellColors {
    filled;
    empty;
    constructor(filled, empty) {
        this.filled = filled;
        this.empty = empty;
    }
}
class TableRenderer {
    renderSettings;
    commandBus;
    eventBus;
    cellsHtmlElementsMap = [];
    table;
    scoreDisplay;
    constructor(renderSettings, commandBus, eventBus) {
        this.renderSettings = renderSettings;
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initHandler.bind(this));
        commandBus.addHandler(CommandBus_1.CommandType.Render, this.renderCommandHandler.bind(this));
    }
    initHandler(command) {
        this.table = TableRenderer.createHtmlElement('<div style="float: left; display: table; border-collapse: collapse"></div>');
        this.cellsHtmlElementsMap = [];
        for (let y = 0; y < command.gameData.settings.fieldHeight; y++) {
            let row = TableRenderer.createHtmlElement('<div style="display: table-row"></div>');
            this.cellsHtmlElementsMap[y] = [];
            for (let x = 0; x < command.gameData.settings.fieldWidth; x++) {
                let cell = TableRenderer.createHtmlElement('<div style="display: table-cell; border: 1px solid #ccc; width: 20px; height: 20px"></div>');
                this.cellsHtmlElementsMap[y][x] = cell;
                row.appendChild(cell);
            }
            this.table.appendChild(row);
        }
        this.renderSettings.containerElement.innerHTML = '';
        this.renderSettings.containerElement.appendChild(this.table);
        this.scoreDisplay = TableRenderer.createHtmlElement(`<div style="float: left; font-family: 'Helvetica Neue', sans-serif; font-size: 20px; margin-left: 15px;">
                Level: <span id="level"></span><br>
                Score: <span id="score"></span><br>
                Combo: <span id="combo"></span><br>
                Figures fallen: <span id="figures_fallen"></span><br>
                Lines squashed: <span id="lines_squashed"></span><br>
            </div>`);
        this.renderSettings.containerElement.appendChild(this.scoreDisplay);
        this.renderSettings.containerElement.appendChild(TableRenderer.createHtmlElement('<div style="clear: both"></div>'));
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
        this.eventBus.on(EventBus_1.EventType.GameOver, this.onGameOver.bind(this));
        this.eventBus.on(EventBus_1.EventType.FiguresMoved, this.onFiguresMoved.bind(this));
    }
    onFiguresMoved(command) {
        this.renderState(command.gameData);
    }
    onFallTickProcessed(command) {
        this.renderState(command.gameData);
    }
    onGameOver(command) {
        this.renderState(command.gameData);
    }
    renderCommandHandler(command) {
        this.renderState(command.gameData);
    }
    renderState(gameData) {
        this.repaintMatrixCells(gameData.matrix, new Common_1.Coordinate(0, 0), gameData);
        if (this.renderSettings.renderProjectionFigures) {
            this.renderFallingFiguresProjection(gameData);
        }
        this.renderFallingFigures(gameData);
        this.renderStats(gameData);
    }
    renderFallingFigures(gameData) {
        gameData.fallingFigures.forEach(fallingFigure => {
            this.repaintFallingFiguresCells(fallingFigure, gameData);
        });
    }
    renderFallingFiguresProjection(gameData) {
        gameData.fallingFigures.forEach(fallingFigure => {
            const figureMatrix = fallingFigure.figure.getTurn(fallingFigure.turnState);
            const projectionFigureX = fallingFigure.position.x;
            let projectionFigureY = fallingFigure.position.y;
            while (FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Common_1.Coordinate(projectionFigureX, projectionFigureY + 1), gameData.matrix)) {
                projectionFigureY++;
            }
            this.repaintProjectionFiguresCells(figureMatrix, new Common_1.Coordinate(projectionFigureX, projectionFigureY), gameData);
        });
    }
    repaintMatrixCells(matrix, indent, gameData) {
        let colors;
        if (gameData.isGameOver) {
            colors = new CellColors(this.renderSettings.matrixCellColors.filledGameOver, this.renderSettings.matrixCellColors.empty);
        }
        else {
            colors = new CellColors(this.renderSettings.matrixCellColors.filled, this.renderSettings.matrixCellColors.empty);
        }
        this.repaintCells(matrix, indent, colors);
    }
    repaintFallingFiguresCells(fallingFigure, gameData) {
        let colors;
        if (gameData.isGameOver) {
            colors = new CellColors(this.renderSettings.fallingFigureCellColors.filledGameOver, this.renderSettings.fallingFigureCellColors.empty);
        }
        else {
            colors = new CellColors(fallingFigure.color || this.renderSettings.fallingFigureCellColors.filled, this.renderSettings.fallingFigureCellColors.empty);
        }
        this.repaintCells(fallingFigure.figure.getTurn(fallingFigure.turnState), fallingFigure.position, colors);
    }
    repaintProjectionFiguresCells(matrix, indent, gameData) {
        let colors;
        if (gameData.isGameOver) {
            colors = new CellColors(this.renderSettings.projectionFigureCellColors.filledGameOver, this.renderSettings.projectionFigureCellColors.empty);
        }
        else {
            colors = new CellColors(this.renderSettings.projectionFigureCellColors.filled, this.renderSettings.projectionFigureCellColors.empty);
        }
        this.repaintCells(matrix, indent, colors);
    }
    repaintCells(matrix, indent, cellColors) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                const realY = y + indent.y;
                const realX = x + indent.x;
                if (realY in this.cellsHtmlElementsMap
                    && realX in this.cellsHtmlElementsMap[realY]) {
                    const color = value ? cellColors.filled : cellColors.empty;
                    if (color !== null) {
                        this.cellsHtmlElementsMap[realY][realX].style.background = color;
                    }
                }
            });
        });
    }
    renderStats(gameData) {
        const levelSpan = document.getElementById('level');
        const scoreSpan = document.getElementById('score');
        const comboSpan = document.getElementById('combo');
        const figuresFallen = document.getElementById('figures_fallen');
        const linesSquashed = document.getElementById('lines_squashed');
        if (levelSpan !== null) {
            levelSpan.innerHTML = gameData.level.toString();
        }
        if (scoreSpan !== null) {
            scoreSpan.innerHTML = gameData.score.toString();
        }
        if (comboSpan !== null) {
            comboSpan.innerHTML = gameData.combo.toString();
        }
        if (figuresFallen !== null) {
            figuresFallen.innerHTML = gameData.stats.figuresFallen.toString();
        }
        if (linesSquashed !== null) {
            linesSquashed.innerHTML = gameData.stats.linesSquashed.toString();
        }
    }
    static createHtmlElement(html) {
        let container = document.createElement('div');
        container.innerHTML = html;
        if (container.children.length > 1 || container.firstElementChild === null) {
            throw 'The HTML must contain only one child';
        }
        if (!(container.firstElementChild instanceof HTMLElement)) {
            throw 'Something went wrong while trying to get HTMLElement child from div';
        }
        return container.firstElementChild;
    }
}
exports.TableRenderer = TableRenderer;
