/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Tetris/ComboCounter/ComboCounter.ts":
/*!*************************************************!*\
  !*** ./src/Tetris/ComboCounter/ComboCounter.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComboCounter": () => (/* binding */ ComboCounter)
/* harmony export */ });
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");


class ComboCounter {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
    }
    onFallTickProcessed(event) {
        if (event.transferredToMatrixFigures.length <= 0) {
            return;
        }
        if (event.squashedLines.length > 0) {
            event.gameData.combo += 1;
        }
        else {
            event.gameData.combo = 0;
        }
    }
}


/***/ }),

/***/ "./src/Tetris/CommandBus/CommandBus.ts":
/*!*********************************************!*\
  !*** ./src/Tetris/CommandBus/CommandBus.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommandBus": () => (/* binding */ CommandBus),
/* harmony export */   "CommandType": () => (/* binding */ CommandType),
/* harmony export */   "DropFiguresCommand": () => (/* binding */ DropFiguresCommand),
/* harmony export */   "FiguresFallTickCommand": () => (/* binding */ FiguresFallTickCommand),
/* harmony export */   "GameOverCommand": () => (/* binding */ GameOverCommand),
/* harmony export */   "InitGameCommand": () => (/* binding */ InitGameCommand),
/* harmony export */   "MoveDownCommand": () => (/* binding */ MoveDownCommand),
/* harmony export */   "MoveLeftCommand": () => (/* binding */ MoveLeftCommand),
/* harmony export */   "MoveRightCommand": () => (/* binding */ MoveRightCommand),
/* harmony export */   "MoveToXCommand": () => (/* binding */ MoveToXCommand),
/* harmony export */   "MoveToYCommand": () => (/* binding */ MoveToYCommand),
/* harmony export */   "PauseGameCommand": () => (/* binding */ PauseGameCommand),
/* harmony export */   "RenderCommand": () => (/* binding */ RenderCommand),
/* harmony export */   "ResumeGameCommand": () => (/* binding */ ResumeGameCommand),
/* harmony export */   "TurnClockwiseCommand": () => (/* binding */ TurnClockwiseCommand),
/* harmony export */   "TurnToStateCommand": () => (/* binding */ TurnToStateCommand)
/* harmony export */ });
var CommandType;
(function (CommandType) {
    CommandType[CommandType["InitGame"] = 0] = "InitGame";
    CommandType[CommandType["ResumeGame"] = 1] = "ResumeGame";
    CommandType[CommandType["PauseGame"] = 2] = "PauseGame";
    CommandType[CommandType["FiguresFallTick"] = 3] = "FiguresFallTick";
    CommandType[CommandType["GameOver"] = 4] = "GameOver";
    CommandType[CommandType["Render"] = 5] = "Render";
    CommandType[CommandType["MoveLeft"] = 6] = "MoveLeft";
    CommandType[CommandType["MoveRight"] = 7] = "MoveRight";
    CommandType[CommandType["TurnClockwise"] = 8] = "TurnClockwise";
    CommandType[CommandType["MoveDown"] = 9] = "MoveDown";
    CommandType[CommandType["FiguresFallDown"] = 10] = "FiguresFallDown";
    CommandType[CommandType["MoveToX"] = 11] = "MoveToX";
    CommandType[CommandType["MoveToY"] = 12] = "MoveToY";
    CommandType[CommandType["TurnToState"] = 13] = "TurnToState";
})(CommandType || (CommandType = {}));
class InitGameCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.InitGame;
    }
}
class ResumeGameCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.ResumeGame;
    }
}
class PauseGameCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.PauseGame;
    }
}
class FiguresFallTickCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.FiguresFallTick;
    }
}
class GameOverCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.GameOver;
    }
}
class RenderCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.Render;
    }
}
class MoveLeftCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.MoveLeft;
    }
}
class MoveRightCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.MoveRight;
    }
}
class TurnClockwiseCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.TurnClockwise;
    }
}
class MoveDownCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.MoveDown;
    }
}
class MoveToXCommand {
    gameData;
    x;
    constructor(gameData, x) {
        this.gameData = gameData;
        this.x = x;
    }
    getCommandType() {
        return CommandType.MoveToX;
    }
}
class MoveToYCommand {
    gameData;
    y;
    constructor(gameData, y) {
        this.gameData = gameData;
        this.y = y;
    }
    getCommandType() {
        return CommandType.MoveToY;
    }
}
class TurnToStateCommand {
    gameData;
    turnState;
    constructor(gameData, turnState) {
        this.gameData = gameData;
        this.turnState = turnState;
    }
    getCommandType() {
        return CommandType.TurnToState;
    }
}
class DropFiguresCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.FiguresFallDown;
    }
}
class CommandBus {
    handlers = new Map();
    addHandler(event, handler, unique = true) {
        let handlers = this.handlers.get(event) || [];
        if (unique && handlers.some(boundHandler => boundHandler === handler)) {
            return;
        }
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }
    removeHandler(event, handler) {
        let handlers = this.handlers.get(event) || [];
        let index = handlers.indexOf(handler);
        if (index > 0) {
            handlers.splice(index, 1);
        }
        this.handlers.set(event, handlers);
    }
    run(payload) {
        let handlers = this.handlers.get(payload.getCommandType()) || [];
        handlers.forEach(handler => { handler(payload); });
    }
}


/***/ }),

/***/ "./src/Tetris/Common.ts":
/*!******************************!*\
  !*** ./src/Tetris/Common.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Coordinate": () => (/* binding */ Coordinate),
/* harmony export */   "FallingFigure": () => (/* binding */ FallingFigure),
/* harmony export */   "GameData": () => (/* binding */ GameData),
/* harmony export */   "GameSettings": () => (/* binding */ GameSettings),
/* harmony export */   "Stats": () => (/* binding */ Stats)
/* harmony export */ });
/* harmony import */ var _Figures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Figures */ "./src/Tetris/Figures.ts");

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
class Stats {
    figuresFallen = 0;
    linesSquashed = 0;
}
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
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.TFigure(),
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.RightLFigure(),
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.LeftLFigure(),
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.SquareFigure(),
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.StickFigure(),
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.LZFigure(),
            new _Figures__WEBPACK_IMPORTED_MODULE_0__.RZFigure(),
        ]));
    }
}


/***/ }),

/***/ "./src/Tetris/EventBus/EventBus.ts":
/*!*****************************************!*\
  !*** ./src/Tetris/EventBus/EventBus.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventBus": () => (/* binding */ EventBus),
/* harmony export */   "EventType": () => (/* binding */ EventType),
/* harmony export */   "FallTickProcessedEvent": () => (/* binding */ FallTickProcessedEvent),
/* harmony export */   "FiguresMovedEvent": () => (/* binding */ FiguresMovedEvent),
/* harmony export */   "FiguresSpawnedEvent": () => (/* binding */ FiguresSpawnedEvent),
/* harmony export */   "GameOverEvent": () => (/* binding */ GameOverEvent),
/* harmony export */   "LevelUpEvent": () => (/* binding */ LevelUpEvent)
/* harmony export */ });
var EventType;
(function (EventType) {
    EventType[EventType["FallingTickProcessed"] = 0] = "FallingTickProcessed";
    EventType[EventType["GameOver"] = 1] = "GameOver";
    EventType[EventType["FiguresMoved"] = 2] = "FiguresMoved";
    EventType[EventType["LevelUp"] = 3] = "LevelUp";
    EventType[EventType["FiguresSpawned"] = 4] = "FiguresSpawned";
})(EventType || (EventType = {}));
class FallTickProcessedEvent {
    gameData;
    transferredToMatrixFigures;
    squashedLines;
    droppedLines;
    constructor(gameData, transferredToMatrixFigures, squashedLines, droppedLines) {
        this.gameData = gameData;
        this.transferredToMatrixFigures = transferredToMatrixFigures;
        this.squashedLines = squashedLines;
        this.droppedLines = droppedLines;
    }
    getEventType() {
        return EventType.FallingTickProcessed;
    }
}
class GameOverEvent {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getEventType() {
        return EventType.GameOver;
    }
}
class FiguresMovedEvent {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getEventType() {
        return EventType.FiguresMoved;
    }
}
class LevelUpEvent {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getEventType() {
        return EventType.LevelUp;
    }
}
class FiguresSpawnedEvent {
    gameData;
    newFigures;
    constructor(gameData, newFigures) {
        this.gameData = gameData;
        this.newFigures = newFigures;
    }
    getEventType() {
        return EventType.FiguresSpawned;
    }
}
class EventBus {
    handlers = new Map();
    on(event, handler, unique = true) {
        let handlers = this.handlers.get(event) || [];
        if (unique && handlers.some(boundHandler => boundHandler === handler)) {
            return;
        }
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }
    off(event, handler) {
        let handlers = this.handlers.get(event) || [];
        let index = handlers.indexOf(handler);
        if (index > 0) {
            handlers.splice(index, 1);
        }
        this.handlers.set(event, handlers);
    }
    fire(eventPayload) {
        let handlers = this.handlers.get(eventPayload.getEventType()) || [];
        handlers.forEach(handler => { handler(eventPayload); });
    }
}


/***/ }),

/***/ "./src/Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor.ts":
/*!******************************************************************************!*\
  !*** ./src/Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegularFallingFiguresProcessor": () => (/* binding */ RegularFallingFiguresProcessor)
/* harmony export */ });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils/FigurePlacingChecker */ "./src/Tetris/Utils/FigurePlacingChecker.ts");




class FallingResult {
    transferredFigures = [];
    isGameOver = false;
}
class RegularFallingFiguresProcessor {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.FiguresFallTick, this.processFiguresFallTickCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.FiguresFallDown, this.processDropFiguresCommand.bind(this));
    }
    processFiguresFallTickCommand(command) {
        const fallingResult = this.fallFiguresForOneCell(command.gameData);
        let squashedLines = this.squashLines(command.gameData.matrix);
        if (fallingResult.isGameOver) {
            this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.GameOverCommand(command.gameData));
        }
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FallTickProcessedEvent(command.gameData, fallingResult.transferredFigures, squashedLines, 0));
    }
    processDropFiguresCommand(command) {
        let fallingResult = new FallingResult();
        let droppedLines = 0;
        while (command.gameData.fallingFigures.length > 0) {
            const oneCellFallingResult = this.fallFiguresForOneCell(command.gameData);
            fallingResult.transferredFigures.push(...oneCellFallingResult.transferredFigures);
            fallingResult.isGameOver = fallingResult.isGameOver || oneCellFallingResult.isGameOver;
            droppedLines++;
        }
        let squashedLines = this.squashLines(command.gameData.matrix);
        if (fallingResult.isGameOver) {
            this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.GameOverCommand(command.gameData));
        }
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FallTickProcessedEvent(command.gameData, fallingResult.transferredFigures, squashedLines, droppedLines - 1));
    }
    fallFiguresForOneCell(gameData) {
        let fallingResult = new FallingResult();
        gameData.fallingFigures.forEach((fallingFigure, index) => {
            if (this.figureCanFall(gameData.matrix, fallingFigure)) {
                fallingFigure.position.y++;
            }
            else {
                let figureGameOverResult = this.transferFigureToMatrix(gameData.matrix, fallingFigure);
                fallingResult.transferredFigures.push(...gameData.fallingFigures.splice(index, 1));
                fallingResult.isGameOver = fallingResult.isGameOver || figureGameOverResult;
            }
        });
        return fallingResult;
    }
    figureCanFall(matrix, fallingFigure) {
        return _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_3__.FigurePlacingChecker.canFigureBePlaced(fallingFigure.figure.getTurn(fallingFigure.turnState), new _Common__WEBPACK_IMPORTED_MODULE_0__.Coordinate(fallingFigure.position.x, fallingFigure.position.y + 1), matrix);
    }
    transferFigureToMatrix(matrix, fallingFigure) {
        let isGameOver = false;
        fallingFigure.figure.getTurn(fallingFigure.turnState)
            .forEach((row, figureCellY) => {
            row.forEach((cellValue, figureCellX) => {
                if (!cellValue) {
                    return;
                }
                let matrixX = fallingFigure.position.x + figureCellX;
                let matrixY = fallingFigure.position.y + figureCellY;
                if (matrixY in matrix
                    && matrixX in matrix[matrixY]
                    && !matrix[matrixY][matrixX]) {
                    matrix[matrixY][matrixX] = true;
                }
                else {
                    isGameOver = true;
                }
            });
        });
        return isGameOver;
    }
    squashLines(matrix) {
        let linesToSquash = [];
        matrix.forEach((row, y) => {
            let canBeSquashed = row.every(cell => cell);
            if (canBeSquashed) {
                linesToSquash.push(y);
            }
        }, 0);
        linesToSquash.forEach(y => {
            matrix.splice(y, 1);
            matrix.unshift(new Array(matrix[0].length).fill(false));
        });
        return linesToSquash;
    }
}


/***/ }),

/***/ "./src/Tetris/Figures.ts":
/*!*******************************!*\
  !*** ./src/Tetris/Figures.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractFigure": () => (/* binding */ AbstractFigure),
/* harmony export */   "FigureTurnState": () => (/* binding */ FigureTurnState),
/* harmony export */   "LZFigure": () => (/* binding */ LZFigure),
/* harmony export */   "LeftLFigure": () => (/* binding */ LeftLFigure),
/* harmony export */   "RZFigure": () => (/* binding */ RZFigure),
/* harmony export */   "RightLFigure": () => (/* binding */ RightLFigure),
/* harmony export */   "SimplyRotatableFigure": () => (/* binding */ SimplyRotatableFigure),
/* harmony export */   "SquareFigure": () => (/* binding */ SquareFigure),
/* harmony export */   "StickFigure": () => (/* binding */ StickFigure),
/* harmony export */   "TFigure": () => (/* binding */ TFigure)
/* harmony export */ });
var FigureTurnState;
(function (FigureTurnState) {
    FigureTurnState[FigureTurnState["One"] = 0] = "One";
    FigureTurnState[FigureTurnState["Two"] = 1] = "Two";
    FigureTurnState[FigureTurnState["Three"] = 2] = "Three";
    FigureTurnState[FigureTurnState["Four"] = 3] = "Four";
})(FigureTurnState || (FigureTurnState = {}));
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
class TFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "###".split("").map(item => item === "#"),
            "-#-".split("").map(item => item === "#"),
        ];
    }
}
class RightLFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "###".split("").map(item => item === "#"),
            "--#".split("").map(item => item === "#"),
        ];
    }
}
class LeftLFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "###".split("").map(item => item === "#"),
            "#--".split("").map(item => item === "#"),
        ];
    }
}
class SquareFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "##".split("").map(item => item === "#"),
            "##".split("").map(item => item === "#"),
        ];
    }
}
class StickFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "####".split("").map(item => item === "#"),
        ];
    }
}
class LZFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "##-".split("").map(item => item === "#"),
            "-##".split("").map(item => item === "#"),
        ];
    }
}
class RZFigure extends SimplyRotatableFigure {
    getFigure() {
        return [
            "-##".split("").map(item => item === "#"),
            "##-".split("").map(item => item === "#"),
        ];
    }
}


/***/ }),

/***/ "./src/Tetris/FiguresSpawner/AlwaysOneFigureSpawner.ts":
/*!*************************************************************!*\
  !*** ./src/Tetris/FiguresSpawner/AlwaysOneFigureSpawner.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlwaysOneFigureSpawner": () => (/* binding */ AlwaysOneFigureSpawner)
/* harmony export */ });
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Figures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Figures */ "./src/Tetris/Figures.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _Utils_EnumHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils/EnumHelper */ "./src/Tetris/Utils/EnumHelper.ts");





class AlwaysOneFigureSpawner {
    eventBus;
    commandBus;
    constructor(eventBus, commandBus) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_3__.CommandType.InitGame, this.initHandler.bind(this));
    }
    initHandler(event) {
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventType.FallingTickProcessed, this.processOnFallTick.bind(this));
    }
    processOnFallTick(event) {
        this.addFigure(event.gameData);
    }
    addFigure(gameData) {
        if (gameData.fallingFigures.length > 0 || gameData.isGameOver) {
            return;
        }
        const figureIndex = Math.floor(Math.random() * gameData.settings.figures.length);
        const figure = gameData.settings.figures[figureIndex];
        const turnState = _Utils_EnumHelper__WEBPACK_IMPORTED_MODULE_4__.EnumHelper.GetRandom(_Figures__WEBPACK_IMPORTED_MODULE_1__.FigureTurnState);
        const figureMatrix = figure.getTurn(turnState);
        const figureWidth = Math.max(...figureMatrix.map(row => row.length));
        const coordinate = new _Common__WEBPACK_IMPORTED_MODULE_2__.Coordinate(Math.ceil(gameData.settings.fieldWidth / 2 - figureWidth / 2) - 1, -figureMatrix.length);
        const fallingFigure = new _Common__WEBPACK_IMPORTED_MODULE_2__.FallingFigure(figure, coordinate, turnState);
        gameData.fallingFigures.push(fallingFigure);
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.FiguresSpawnedEvent(gameData, [fallingFigure]));
    }
}


/***/ }),

/***/ "./src/Tetris/GameController.ts":
/*!**************************************!*\
  !*** ./src/Tetris/GameController.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameController": () => (/* binding */ GameController)
/* harmony export */ });
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Common */ "./src/Tetris/Common.ts");



class GameController {
    timingsHandler;
    eventBus;
    commandBus;
    gameData = _Common__WEBPACK_IMPORTED_MODULE_2__.GameData.makeSimple();
    constructor(timingsHandler, eventBus, commandBus) {
        this.timingsHandler = timingsHandler;
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.InitGame, this.initGameHandler.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.ResumeGame, this.resumeGameHandler.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.PauseGame, this.pauseGameHandler.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.GameOver, this.gameOverHandler.bind(this));
    }
    initGameHandler(command) {
        this.gameData = command.gameData;
        this.gameData.isInitialized = true;
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
    }
    resumeGameHandler(command) {
        if (this.gameData.isGameOver) {
            return;
        }
        if (!this.gameData.isInitialized) {
            this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.InitGameCommand(command.gameData));
        }
        this.fallTick();
    }
    pauseGameHandler(command) {
        this.gameData = command.gameData;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.RenderCommand(this.gameData));
    }
    gameOverHandler() {
        this.gameData.isInitialized = false;
        this.gameData.isGameOver = true;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.GameOverEvent(this.gameData));
    }
    fallTick() {
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.FiguresFallTickCommand(this.gameData));
    }
    onFallTickProcessed(event) {
        clearTimeout(this.gameData.nextTickTimeoutId);
        const delay = this.timingsHandler.getDelayForNextTickMs(this.gameData);
        if (!this.gameData.isGameOver && delay != Infinity) {
            this.gameData.nextTickTimeoutId = setTimeout(this.fallTick.bind(this), this.timingsHandler.getDelayForNextTickMs(this.gameData));
        }
    }
}


/***/ }),

/***/ "./src/Tetris/KeyboardController/KeyboardController.ts":
/*!*************************************************************!*\
  !*** ./src/Tetris/KeyboardController/KeyboardController.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyboardController": () => (/* binding */ KeyboardController)
/* harmony export */ });
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");

class KeyboardController {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.InitGame, this.processInitGameCommand.bind(this));
    }
    processInitGameCommand(command) {
        window.onkeydown = event => {
            if (event.code === 'ArrowLeft') {
                this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.MoveLeftCommand(command.gameData));
            }
            else if (event.code === 'ArrowRight') {
                this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.MoveRightCommand(command.gameData));
            }
            else if (event.code === 'ArrowUp') {
                this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.TurnClockwiseCommand(command.gameData));
            }
            else if (event.code === 'ArrowDown') {
                this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.MoveDownCommand(command.gameData));
            }
            else if (event.code === 'ArrowDown') {
                this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.MoveDownCommand(command.gameData));
            }
            else if (event.code === 'Space') {
                this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.DropFiguresCommand(command.gameData));
            }
        };
    }
}


/***/ }),

/***/ "./src/Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter.ts":
/*!*************************************************************************!*\
  !*** ./src/Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SquashedRowsCounterBasedLevelCounter": () => (/* binding */ SquashedRowsCounterBasedLevelCounter)
/* harmony export */ });
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");


class SquashedRowsCounterBasedLevelCounter {
    eventBus;
    commandBus;
    levelIncreaseOnSquashedRowsNumber;
    maxLevels;
    squashedRowsCounter = 0;
    constructor(eventBus, commandBus, levelIncreaseOnSquashedRowsNumber, maxLevels) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.levelIncreaseOnSquashedRowsNumber = levelIncreaseOnSquashedRowsNumber;
        this.maxLevels = maxLevels;
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.InitGame, this.processInitGameCommand.bind(this));
    }
    processInitGameCommand(command) {
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
    }
    onFallTickProcessed(event) {
        if (event.squashedLines.length === 0) {
            return;
        }
        this.squashedRowsCounter++;
        if (this.squashedRowsCounter >= this.levelIncreaseOnSquashedRowsNumber) {
            this.squashedRowsCounter = 0;
            event.gameData.level = Math.min(this.maxLevels, event.gameData.level + 1);
        }
    }
}


/***/ }),

/***/ "./src/Tetris/MovingHandler/MovingHandler.ts":
/*!***************************************************!*\
  !*** ./src/Tetris/MovingHandler/MovingHandler.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MovingHandler": () => (/* binding */ MovingHandler)
/* harmony export */ });
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _Figures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Figures */ "./src/Tetris/Figures.ts");
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils/FigurePlacingChecker */ "./src/Tetris/Utils/FigurePlacingChecker.ts");
/* harmony import */ var _Utils_EnumHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Utils/EnumHelper */ "./src/Tetris/Utils/EnumHelper.ts");






class MovingHandler {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.MoveLeft, this.processMoveLeftCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.MoveRight, this.processMoveRightCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.MoveDown, this.processMoveDownCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.TurnClockwise, this.processTurnClockwiseCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.MoveToX, this.processMoveToXCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.MoveToY, this.processMoveToYCommand.bind(this));
        this.commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.TurnToState, this.processTurnToStateCommand.bind(this));
    }
    processMoveLeftCommand(command) {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeMovedLeft = _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(figure.position.x - 1, figure.position.y), command.gameData.matrix);
            if (canBeMovedLeft) {
                figure.position.x--;
            }
        });
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FiguresMovedEvent(command.gameData));
    }
    processMoveRightCommand(command) {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeMovedRight = _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(figure.position.x + 1, figure.position.y), command.gameData.matrix);
            if (canBeMovedRight) {
                figure.position.x++;
            }
        });
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FiguresMovedEvent(command.gameData));
    }
    processTurnClockwiseCommand(command) {
        const allTurnStates = _Utils_EnumHelper__WEBPACK_IMPORTED_MODULE_5__.EnumHelper.ToArray(_Figures__WEBPACK_IMPORTED_MODULE_1__.FigureTurnState);
        command.gameData.fallingFigures.forEach(figure => {
            let nextTurnState = figure.turnState + 1;
            if (!(nextTurnState in allTurnStates)) {
                nextTurnState = allTurnStates[0];
            }
            const canBeTurned = _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(nextTurnState), figure.position, command.gameData.matrix);
            if (canBeTurned) {
                figure.turnState = nextTurnState;
            }
        });
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FiguresMovedEvent(command.gameData));
    }
    processMoveDownCommand(command) {
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.FiguresFallTickCommand(command.gameData));
    }
    processMoveToXCommand(command) {
        if (command.x < 0 || command.x > (command.gameData.settings.fieldWidth - 1)) {
            return;
        }
        command.gameData.fallingFigures.forEach(figure => {
            const movingModifier = command.x > figure.position.x ? 1 : -1;
            while (figure.position.x !== command.x && _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(figure.position.x + movingModifier, figure.position.y), command.gameData.matrix)) {
                figure.position.x += movingModifier;
            }
        });
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FiguresMovedEvent(command.gameData));
    }
    processMoveToYCommand(command) {
        if (command.y < 0) {
            return;
        }
        command.gameData.fallingFigures.forEach(figure => {
            while (figure.position.y < command.y && _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(figure.turnState), new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(figure.position.x, figure.position.y + 1), command.gameData.matrix)) {
                figure.position.y++;
            }
        });
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FiguresMovedEvent(command.gameData));
    }
    processTurnToStateCommand(command) {
        command.gameData.fallingFigures.forEach(figure => {
            const canBeTurned = _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingChecker.canFigureBePlaced(figure.figure.getTurn(command.turnState), figure.position, command.gameData.matrix);
            if (canBeTurned) {
                figure.turnState = command.turnState;
            }
        });
        this.eventBus.fire(new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_2__.FiguresMovedEvent(command.gameData));
    }
}


/***/ }),

/***/ "./src/Tetris/Renderer/TableRenderer.ts":
/*!**********************************************!*\
  !*** ./src/Tetris/Renderer/TableRenderer.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableRenderer": () => (/* binding */ TableRenderer),
/* harmony export */   "TableRendererCellColorSettings": () => (/* binding */ TableRendererCellColorSettings),
/* harmony export */   "TableRendererSettings": () => (/* binding */ TableRendererSettings)
/* harmony export */ });
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/FigurePlacingChecker */ "./src/Tetris/Utils/FigurePlacingChecker.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common */ "./src/Tetris/Common.ts");




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
        commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.InitGame, this.initHandler.bind(this));
        commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.Render, this.renderCommandHandler.bind(this));
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
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventType.GameOver, this.onGameOver.bind(this));
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventType.FiguresMoved, this.onFiguresMoved.bind(this));
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
        this.repaintMatrixCells(gameData.matrix, new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(0, 0), gameData);
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
            while (_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_2__.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(projectionFigureX, projectionFigureY + 1), gameData.matrix)) {
                projectionFigureY++;
            }
            this.repaintProjectionFiguresCells(figureMatrix, new _Common__WEBPACK_IMPORTED_MODULE_3__.Coordinate(projectionFigureX, projectionFigureY), gameData);
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


/***/ }),

/***/ "./src/Tetris/ScoreCounter/FallTickScoreCounter.ts":
/*!*********************************************************!*\
  !*** ./src/Tetris/ScoreCounter/FallTickScoreCounter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FallTickScoreCounter": () => (/* binding */ FallTickScoreCounter)
/* harmony export */ });
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");


class FallTickScoreCounter {
    commandBus;
    eventBus;
    squashedRowsRewardThresholdsMap;
    rewardOnCombo;
    constructor(commandBus, eventBus, squashedRowsRewardThresholdsMap = new Map([
        [1, 100],
        [2, 300],
        [3, 500],
        [4, 800],
    ]), rewardOnCombo = 50) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        this.squashedRowsRewardThresholdsMap = squashedRowsRewardThresholdsMap;
        this.rewardOnCombo = rewardOnCombo;
        commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }
    onFallingTickProcessed(event) {
        if (event.squashedLines.length < 0) {
            return;
        }
        let previousThresholdReward = 0;
        this.squashedRowsRewardThresholdsMap.forEach((reward, rowsSquashedThreshold) => {
            if (rowsSquashedThreshold > event.squashedLines.length) {
                return;
            }
            previousThresholdReward = reward;
        });
        event.gameData.score +=
            previousThresholdReward * event.gameData.level
                + this.rewardOnCombo * Math.max(0, event.gameData.combo - 1) * event.gameData.level
                + event.droppedLines * 2 * event.gameData.level;
    }
}


/***/ }),

/***/ "./src/Tetris/StatsCounter/StatsCounter.ts":
/*!*************************************************!*\
  !*** ./src/Tetris/StatsCounter/StatsCounter.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsCounter": () => (/* binding */ StatsCounter)
/* harmony export */ });
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");


class StatsCounter {
    commandBus;
    eventBus;
    constructor(commandBus, eventBus) {
        this.commandBus = commandBus;
        this.eventBus = eventBus;
        commandBus.addHandler(_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventType.FallingTickProcessed, this.onFallingTickProcessed.bind(this));
    }
    onFallingTickProcessed(event) {
        event.gameData.stats.figuresFallen += event.transferredToMatrixFigures.length;
        event.gameData.stats.linesSquashed += event.squashedLines.length;
    }
}


/***/ }),

/***/ "./src/Tetris/TetrisFacade.ts":
/*!************************************!*\
  !*** ./src/Tetris/TetrisFacade.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TetrisFacade": () => (/* binding */ TetrisFacade)
/* harmony export */ });
/* harmony import */ var _GameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameController */ "./src/Tetris/GameController.ts");
/* harmony import */ var _Renderer_TableRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Renderer/TableRenderer */ "./src/Tetris/Renderer/TableRenderer.ts");
/* harmony import */ var _FallingFiguresProcessor_RegularFallingFiguresProcessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FallingFiguresProcessor/RegularFallingFiguresProcessor */ "./src/Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor.ts");
/* harmony import */ var _FiguresSpawner_AlwaysOneFigureSpawner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FiguresSpawner/AlwaysOneFigureSpawner */ "./src/Tetris/FiguresSpawner/AlwaysOneFigureSpawner.ts");
/* harmony import */ var _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _MovingHandler_MovingHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MovingHandler/MovingHandler */ "./src/Tetris/MovingHandler/MovingHandler.ts");
/* harmony import */ var _ScoreCounter_FallTickScoreCounter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ScoreCounter/FallTickScoreCounter */ "./src/Tetris/ScoreCounter/FallTickScoreCounter.ts");
/* harmony import */ var _LevelCounter_SquashedRowsCounterBasedLevelCounter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LevelCounter/SquashedRowsCounterBasedLevelCounter */ "./src/Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _ComboCounter_ComboCounter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ComboCounter/ComboCounter */ "./src/Tetris/ComboCounter/ComboCounter.ts");
/* harmony import */ var _TimingsHandler_ConstTimingsHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TimingsHandler/ConstTimingsHandler */ "./src/Tetris/TimingsHandler/ConstTimingsHandler.ts");
/* harmony import */ var _StatsCounter_StatsCounter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./StatsCounter/StatsCounter */ "./src/Tetris/StatsCounter/StatsCounter.ts");
/* harmony import */ var _KeyboardController_KeyboardController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./KeyboardController/KeyboardController */ "./src/Tetris/KeyboardController/KeyboardController.ts");














class TetrisFacade {
    eventBus;
    commandBus;
    gameController;
    movingHandler;
    keyboardController;
    fallingFiguresProcessor;
    figuresSpawner;
    levelCounter;
    comboCounter;
    scoreCounter;
    statsCounter;
    tableRenderer;
    gameData;
    constructor(eventBus = new _EventBus_EventBus__WEBPACK_IMPORTED_MODULE_4__.EventBus(), commandBus = new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_5__.CommandBus(), gameController = new _GameController__WEBPACK_IMPORTED_MODULE_0__.GameController(
    // new LevelBasedTimingsHandler(2000),
    new _TimingsHandler_ConstTimingsHandler__WEBPACK_IMPORTED_MODULE_11__.ConstTimingsHandler(2000), eventBus, commandBus), movingHandler = new _MovingHandler_MovingHandler__WEBPACK_IMPORTED_MODULE_6__.MovingHandler(commandBus, eventBus), keyboardController = new _KeyboardController_KeyboardController__WEBPACK_IMPORTED_MODULE_13__.KeyboardController(commandBus), fallingFiguresProcessor = new _FallingFiguresProcessor_RegularFallingFiguresProcessor__WEBPACK_IMPORTED_MODULE_2__.RegularFallingFiguresProcessor(commandBus, eventBus), figuresSpawner = new _FiguresSpawner_AlwaysOneFigureSpawner__WEBPACK_IMPORTED_MODULE_3__.AlwaysOneFigureSpawner(eventBus, commandBus), levelCounter = new _LevelCounter_SquashedRowsCounterBasedLevelCounter__WEBPACK_IMPORTED_MODULE_8__.SquashedRowsCounterBasedLevelCounter(eventBus, commandBus, 8, 15), comboCounter = new _ComboCounter_ComboCounter__WEBPACK_IMPORTED_MODULE_10__.ComboCounter(commandBus, eventBus), scoreCounter = new _ScoreCounter_FallTickScoreCounter__WEBPACK_IMPORTED_MODULE_7__.FallTickScoreCounter(commandBus, eventBus), statsCounter = new _StatsCounter_StatsCounter__WEBPACK_IMPORTED_MODULE_12__.StatsCounter(commandBus, eventBus), tableRenderer = new _Renderer_TableRenderer__WEBPACK_IMPORTED_MODULE_1__.TableRenderer(new _Renderer_TableRenderer__WEBPACK_IMPORTED_MODULE_1__.TableRendererSettings(document.body), commandBus, eventBus), gameData = _Common__WEBPACK_IMPORTED_MODULE_9__.GameData.makeSimple()) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.gameController = gameController;
        this.movingHandler = movingHandler;
        this.keyboardController = keyboardController;
        this.fallingFiguresProcessor = fallingFiguresProcessor;
        this.figuresSpawner = figuresSpawner;
        this.levelCounter = levelCounter;
        this.comboCounter = comboCounter;
        this.scoreCounter = scoreCounter;
        this.statsCounter = statsCounter;
        this.tableRenderer = tableRenderer;
        this.gameData = gameData;
    }
    start(gameData) {
        gameData = gameData || _Common__WEBPACK_IMPORTED_MODULE_9__.GameData.makeSimple();
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_5__.InitGameCommand(gameData));
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_5__.ResumeGameCommand(gameData));
    }
    resume() {
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_5__.ResumeGameCommand(this.gameData));
    }
    pause() {
        this.commandBus.run(new _CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_5__.PauseGameCommand(this.gameData));
    }
}


/***/ }),

/***/ "./src/Tetris/TimingsHandler/ConstTimingsHandler.ts":
/*!**********************************************************!*\
  !*** ./src/Tetris/TimingsHandler/ConstTimingsHandler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstTimingsHandler": () => (/* binding */ ConstTimingsHandler)
/* harmony export */ });
class ConstTimingsHandler {
    delayMs;
    constructor(delayMs) {
        this.delayMs = delayMs;
    }
    getDelayForNextTickMs(gameData) {
        return this.delayMs;
    }
}


/***/ }),

/***/ "./src/Tetris/Utils/EnumHelper.ts":
/*!****************************************!*\
  !*** ./src/Tetris/Utils/EnumHelper.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumHelper": () => (/* binding */ EnumHelper)
/* harmony export */ });
class EnumHelper {
    static ToArray(val) {
        return Object.keys(val)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n));
    }
    static GetRandom(val) {
        const values = EnumHelper.ToArray(val);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
    }
}


/***/ }),

/***/ "./src/Tetris/Utils/FigurePlacingChecker.ts":
/*!**************************************************!*\
  !*** ./src/Tetris/Utils/FigurePlacingChecker.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FigurePlacingChecker": () => (/* binding */ FigurePlacingChecker)
/* harmony export */ });
class FigurePlacingChecker {
    static canFigureBePlaced(targetFigureMatrix, targetPosition, matrix) {
        return targetFigureMatrix.every((row, y) => {
            return row.every((value, x) => {
                const realY = targetPosition.y + y;
                const realX = targetPosition.x + x;
                return !value
                    || (realY < 0
                        && realX >= 0
                        && realX <= matrix[0].length - 1) || (realY in matrix
                    && realX in matrix[realY]
                    && !matrix[realY][realX]);
            });
        });
    }
}


/***/ }),

/***/ "./src/TetrisSolver/Common.ts":
/*!************************************!*\
  !*** ./src/TetrisSolver/Common.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropPlacingStep": () => (/* binding */ DropPlacingStep),
/* harmony export */   "FigurePlacingResult": () => (/* binding */ FigurePlacingResult),
/* harmony export */   "Hole": () => (/* binding */ Hole),
/* harmony export */   "MoveXPlacingStep": () => (/* binding */ MoveXPlacingStep),
/* harmony export */   "MoveYPlacingStep": () => (/* binding */ MoveYPlacingStep),
/* harmony export */   "TurnPlacingStep": () => (/* binding */ TurnPlacingStep)
/* harmony export */ });
class TurnPlacingStep {
    target;
    _persisted;
    constructor(target, _persisted) {
        this.target = target;
        this._persisted = _persisted;
    }
    get persisted() {
        return this._persisted;
    }
}
class MoveXPlacingStep {
    target;
    _persisted;
    constructor(target, _persisted) {
        this.target = target;
        this._persisted = _persisted;
    }
    get persisted() {
        return this._persisted;
    }
}
class MoveYPlacingStep {
    target;
    constructor(target) {
        this.target = target;
    }
    get persisted() {
        return false;
    }
}
class DropPlacingStep {
    get persisted() {
        return false;
    }
}
class FigurePlacingResult {
    figuresTargetStates;
    placingSteps;
    constructor(figuresTargetStates, placingSteps) {
        this.figuresTargetStates = figuresTargetStates;
        this.placingSteps = placingSteps;
    }
}
class Hole {
    isOpened;
    cells;
    constructor(isOpened, cells) {
        this.isOpened = isOpened;
        this.cells = cells;
    }
}


/***/ }),

/***/ "./src/TetrisSolver/FigurePlacingPerformer/FigurePlacingPerformerInterface.ts":
/*!************************************************************************************!*\
  !*** ./src/TetrisSolver/FigurePlacingPerformer/FigurePlacingPerformerInterface.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameStateNotSupportedError": () => (/* binding */ GameStateNotSupportedError),
/* harmony export */   "InconsistentTargetStateError": () => (/* binding */ InconsistentTargetStateError),
/* harmony export */   "NotSupportedDirectionStepError": () => (/* binding */ NotSupportedDirectionStepError),
/* harmony export */   "PlacingError": () => (/* binding */ PlacingError)
/* harmony export */ });
class PlacingError extends Error {
}
class GameStateNotSupportedError extends PlacingError {
}
class InconsistentTargetStateError extends PlacingError {
}
class NotSupportedDirectionStepError extends PlacingError {
}


/***/ }),

/***/ "./src/TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer.ts":
/*!**********************************************************************************!*\
  !*** ./src/TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstantFigurePlacingPerformer": () => (/* binding */ InstantFigurePlacingPerformer)
/* harmony export */ });
/* harmony import */ var _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Tetris/CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common */ "./src/TetrisSolver/Common.ts");
/* harmony import */ var _FigurePlacingPerformerInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FigurePlacingPerformerInterface */ "./src/TetrisSolver/FigurePlacingPerformer/FigurePlacingPerformerInterface.ts");



class InstantFigurePlacingPerformer {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    place(gameData, placingResult) {
        if (typeof setImmediate !== 'undefined') {
            setImmediate(() => this.placeImpl(gameData, placingResult));
        }
        else {
            setTimeout(() => this.placeImpl(gameData, placingResult), 0);
        }
    }
    placeImpl(gameData, placingResult) {
        if (gameData.fallingFigures.length === 0) {
            return;
        }
        if (gameData.fallingFigures.length !== 1) {
            throw new _FigurePlacingPerformerInterface__WEBPACK_IMPORTED_MODULE_2__.GameStateNotSupportedError();
        }
        if (placingResult === undefined) {
            return;
        }
        const originalFigure = gameData.fallingFigures[0];
        const targetFigure = placingResult.figuresTargetStates.get(originalFigure);
        if (!targetFigure) {
            return;
        }
        if (originalFigure.figure !== targetFigure.figure) {
            throw new _FigurePlacingPerformerInterface__WEBPACK_IMPORTED_MODULE_2__.InconsistentTargetStateError("Both of the original and the target falling figures must have the same figure in it.");
        }
        placingResult.placingSteps.forEach(step => {
            if (step instanceof _Common__WEBPACK_IMPORTED_MODULE_1__.TurnPlacingStep) {
                this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.TurnToStateCommand(gameData, step.target));
            }
            else if (step instanceof _Common__WEBPACK_IMPORTED_MODULE_1__.MoveXPlacingStep) {
                this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.MoveToXCommand(gameData, step.target));
            }
            else if (step instanceof _Common__WEBPACK_IMPORTED_MODULE_1__.MoveYPlacingStep) {
                this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.MoveToYCommand(gameData, step.target));
            }
            else if (step instanceof _Common__WEBPACK_IMPORTED_MODULE_1__.DropPlacingStep) {
                this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_0__.DropFiguresCommand(gameData));
            }
            else {
                throw new _FigurePlacingPerformerInterface__WEBPACK_IMPORTED_MODULE_2__.NotSupportedDirectionStepError("Unknown step " + step.constructor.name);
            }
        });
    }
}


/***/ }),

/***/ "./src/TetrisSolver/FigurePlacingResolver/FigurePlacingResolver.ts":
/*!*************************************************************************!*\
  !*** ./src/TetrisSolver/FigurePlacingResolver/FigurePlacingResolver.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FigurePlacingResolver": () => (/* binding */ FigurePlacingResolver)
/* harmony export */ });
/* harmony import */ var _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Tetris/Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _Tetris_Utils_EnumHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tetris/Utils/EnumHelper */ "./src/Tetris/Utils/EnumHelper.ts");
/* harmony import */ var _Tetris_Figures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tetris/Figures */ "./src/Tetris/Figures.ts");
/* harmony import */ var _Tetris_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Tetris/Utils/FigurePlacingChecker */ "./src/Tetris/Utils/FigurePlacingChecker.ts");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common */ "./src/TetrisSolver/Common.ts");
/* harmony import */ var _Utils_HolesHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Utils/HolesHelper */ "./src/TetrisSolver/Utils/HolesHelper.ts");
/* harmony import */ var _ScoreCalculator_ScoreCalculatorInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ScoreCalculator/ScoreCalculatorInterface */ "./src/TetrisSolver/ScoreCalculator/ScoreCalculatorInterface.ts");







class PlaceResolvingError extends Error {
}
class GameStateNotSupportedError extends PlaceResolvingError {
}
class FigurePlacingResolver {
    commandBus;
    scoreCalculator;
    constructor(commandBus, scoreCalculator) {
        this.commandBus = commandBus;
        this.scoreCalculator = scoreCalculator;
    }
    resolve(gameData) {
        if (gameData.fallingFigures.length === 0) {
            return;
        }
        if (gameData.fallingFigures.length !== 1) {
            throw new GameStateNotSupportedError();
        }
        const originalFigure = gameData.fallingFigures[0];
        let maxScore = -Infinity;
        let theBestResult = new _Common__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingResult(new Map(), []);
        this.processStates(gameData, (imaginableFigure, score, placingDirections) => {
            if (score > maxScore) {
                maxScore = score;
                theBestResult = new _Common__WEBPACK_IMPORTED_MODULE_4__.FigurePlacingResult(new Map([[originalFigure, imaginableFigure]]), placingDirections);
            }
        });
        // let debugMode = true;
        /*let debugMode = 'debugMode' in window && window.debugMode;
        let imaginableFigure = theBestResult.figuresTargetStates.get(originalFigure);
        if (debugMode && imaginableFigure !== undefined) {
            let fakeGameData = structuredClone(gameData);
            imaginableFigure.color = '#f00';
            fakeGameData.fallingFigures = [imaginableFigure];
            this.commandBus.run(new RenderCommand(fakeGameData));

            this.processStates(gameData, undefined, (imaginableFigure: FallingFigure) => {
                imaginableFigure.color = '#00f';
                fakeGameData.fallingFigures = [imaginableFigure];
                this.commandBus.run(new RenderCommand(fakeGameData));
            })
        }*/
        return theBestResult;
    }
    processStates(gameData, onAfterScoreCalculates, onBeforeScoreCalculates) {
        const originalFigure = gameData.fallingFigures[0];
        let enums = _Tetris_Utils_EnumHelper__WEBPACK_IMPORTED_MODULE_1__.EnumHelper.ToArray(_Tetris_Figures__WEBPACK_IMPORTED_MODULE_2__.FigureTurnState);
        while (enums[0] !== originalFigure.turnState) {
            enums.unshift(enums.pop());
        }
        let matrices = new Map();
        let stringyMatrices = new Set();
        enums.forEach(turnState => {
            let figureMatrix = originalFigure.figure.getTurn(turnState);
            let stringyFigureMatrix = figureMatrix.map(row => row.map(val => val ? "1" : "0").join()).join("\n");
            if (!stringyMatrices.has(stringyFigureMatrix)) {
                stringyMatrices.add(stringyFigureMatrix);
                matrices.set(turnState, figureMatrix);
            }
        });
        const originalMatrixHoles = _Utils_HolesHelper__WEBPACK_IMPORTED_MODULE_5__.HolesHelper.collectHoles(gameData.matrix);
        const originalCoveredColumns = _Utils_HolesHelper__WEBPACK_IMPORTED_MODULE_5__.HolesHelper.collectCoveredColumns(gameData.matrix);
        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                let coordinate = new _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__.Coordinate(x, y);
                let squashedLinesCount = this.squashLines(imaginableMatrix);
                let imaginableFigure = new _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__.FallingFigure(originalFigure.figure, coordinate, turnState);
                if (onBeforeScoreCalculates) {
                    onBeforeScoreCalculates(imaginableFigure);
                }
                let imaginableCoveredColumns = _Utils_HolesHelper__WEBPACK_IMPORTED_MODULE_5__.HolesHelper.collectCoveredColumns(imaginableMatrix);
                let calculateScoreRequest = new _ScoreCalculator_ScoreCalculatorInterface__WEBPACK_IMPORTED_MODULE_6__.CalculateScoreRequest(gameData, originalMatrixHoles, originalCoveredColumns, imaginableMatrix, imaginableCoveredColumns, squashedLinesCount);
                let score = this.scoreCalculator.calculateScore(calculateScoreRequest);
                let directions = this.makeSimplePlacingSteps(imaginableFigure);
                if (onAfterScoreCalculates) {
                    onAfterScoreCalculates(imaginableFigure, score, directions);
                }
            }
        });
        originalMatrixHoles.filter(hole => hole.isOpened && hole.cells.length > 0).forEach(hole => {
            let topY = gameData.settings.fieldHeight, leftX = gameData.settings.fieldWidth, bottomY = -1, rightX = -1;
            hole.cells.forEach(cell => {
                topY = Math.min(topY, cell.y);
                leftX = Math.min(leftX, cell.x);
                bottomY = Math.max(bottomY, cell.y);
                rightX = Math.max(rightX, cell.x);
            });
            matrices.forEach((figureMatrix, turnState) => {
                for (let y = Math.max(topY - figureMatrix.length + 1, 0); y <= bottomY; y++) {
                    for (let x = Math.max(leftX - figureMatrix[0].length + 1, 0); x <= rightX; x++) {
                        let coordinate = new _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__.Coordinate(x, y);
                        let imaginableFigure = new _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__.FallingFigure(originalFigure.figure, coordinate, turnState);
                        if (onBeforeScoreCalculates) {
                            onBeforeScoreCalculates(imaginableFigure);
                        }
                        if (_Tetris_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_3__.FigurePlacingChecker.canFigureBePlaced(figureMatrix, coordinate, gameData.matrix)) {
                            let directions = this.makePushInPlacingSteps(gameData, imaginableFigure, originalCoveredColumns);
                            if (directions !== undefined) {
                                let imaginableMatrix = this.imagineFigurePlacing(gameData.matrix, figureMatrix, coordinate);
                                let squashedLinesCount = this.squashLines(imaginableMatrix);
                                let imaginableCoveredColumns = _Utils_HolesHelper__WEBPACK_IMPORTED_MODULE_5__.HolesHelper.collectCoveredColumns(imaginableMatrix);
                                let calculateScoreRequest = new _ScoreCalculator_ScoreCalculatorInterface__WEBPACK_IMPORTED_MODULE_6__.CalculateScoreRequest(gameData, originalMatrixHoles, originalCoveredColumns, imaginableMatrix, imaginableCoveredColumns, squashedLinesCount);
                                let score = this.scoreCalculator.calculateScore(calculateScoreRequest);
                                if (onAfterScoreCalculates) {
                                    onAfterScoreCalculates(imaginableFigure, score, directions);
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    squashLines(matrix) {
        let linesToSquash = [];
        matrix.forEach((row, y) => {
            let canBeSquashed = row.every(cell => cell);
            if (canBeSquashed) {
                linesToSquash.push(y);
            }
        }, 0);
        linesToSquash.forEach(y => {
            matrix.splice(y, 1);
            matrix.unshift(new Array(matrix[0].length).fill(false));
        });
        return linesToSquash.length;
    }
    imagineFigureDrop(gameMatrix, figureMatrix, targetX) {
        let targetY = -figureMatrix.length;
        while (_Tetris_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_3__.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__.Coordinate(targetX, targetY + 1), gameMatrix)) {
            targetY++;
        }
        return [
            targetY,
            this.imagineFigurePlacing(gameMatrix, figureMatrix, new _Tetris_Common__WEBPACK_IMPORTED_MODULE_0__.Coordinate(targetX, targetY)),
        ];
    }
    imagineFigurePlacing(gameMatrix, figureMatrix, targetCoordinate) {
        let imaginableMatrix = structuredClone(gameMatrix);
        figureMatrix.forEach((row, figureY) => {
            row.forEach((val, figureX) => {
                const realY = targetCoordinate.y + figureY;
                const realX = targetCoordinate.x + figureX;
                if (realY in imaginableMatrix
                    && realX in imaginableMatrix[realY]
                    && val) {
                    imaginableMatrix[realY][realX] = true;
                }
            });
        });
        return imaginableMatrix;
    }
    makePushInPlacingSteps(gameData, imaginableFigure, originalCoveredColumns) {
        let figureMatrix = imaginableFigure.figure.getTurn(imaginableFigure.turnState);
        let targetX = _Utils_HolesHelper__WEBPACK_IMPORTED_MODULE_5__.HolesHelper.findTheWayOutFromHole(gameData.matrix, imaginableFigure.position, originalCoveredColumns, figureMatrix);
        if (targetX === undefined) {
            return undefined;
        }
        return [
            new _Common__WEBPACK_IMPORTED_MODULE_4__.TurnPlacingStep(imaginableFigure.turnState, true),
            new _Common__WEBPACK_IMPORTED_MODULE_4__.MoveXPlacingStep(targetX, false),
            new _Common__WEBPACK_IMPORTED_MODULE_4__.MoveYPlacingStep(imaginableFigure.position.y),
            new _Common__WEBPACK_IMPORTED_MODULE_4__.MoveXPlacingStep(imaginableFigure.position.x, true),
            new _Common__WEBPACK_IMPORTED_MODULE_4__.DropPlacingStep(),
        ];
    }
    makeSimplePlacingSteps(imaginableFigure) {
        return [
            new _Common__WEBPACK_IMPORTED_MODULE_4__.TurnPlacingStep(imaginableFigure.turnState, true),
            new _Common__WEBPACK_IMPORTED_MODULE_4__.MoveXPlacingStep(imaginableFigure.position.x, true),
            new _Common__WEBPACK_IMPORTED_MODULE_4__.DropPlacingStep(),
        ];
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/CalculatorAggregate.ts":
/*!*****************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/CalculatorAggregate.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculatorAggregate": () => (/* binding */ CalculatorAggregate)
/* harmony export */ });
class CalculatorAggregate {
    calculators;
    constructor(calculators) {
        this.calculators = calculators;
    }
    calculateScore(request) {
        return this.calculators.reduce((score, calculator) => {
            return score + calculator.calculateScore(request);
        }, 0);
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts":
/*!***********************************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillableCellsCalculator": () => (/* binding */ FillableCellsCalculator)
/* harmony export */ });
class FillableCellsCalculator {
    calculateScore(request) {
        const fieldHeight = request.gameData.settings.fieldHeight;
        const fieldWidth = request.gameData.settings.fieldWidth;
        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(request.imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > 5) {
            fillableCellsScore = -fillableCellsCount * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth));
        }
        return fillableCellsScore;
    }
    calculateFillableSpace(matrix, fieldWidth) {
        let coveredColumns = new Set();
        let fillableCellsCount = 0;
        let fillableHeight = 0;
        matrix.every(row => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val && coveredColumns.size > 0 && !coveredColumns.has(x)) {
                    fillableCellsCount++;
                }
            });
            if (coveredColumns.size < fieldWidth) {
                if (coveredColumns.size > 0) {
                    fillableHeight++;
                }
                return true;
            }
            return false;
        });
        return [fillableCellsCount, fillableHeight];
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts":
/*!*********************************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilledHeightCalculator": () => (/* binding */ FilledHeightCalculator)
/* harmony export */ });
class FilledHeightCalculator {
    calculateScore(request) {
        const height = this.calculateHeight(request.imaginableMatrix);
        return -height * Math.pow(height, height / request.gameData.settings.fieldHeight) * 3;
    }
    calculateHeight(matrix) {
        let lowestEmptyY = -1;
        matrix.every((row, y) => {
            if (row.every(val => !val)) {
                lowestEmptyY = y;
                return true;
            }
            else {
                return false;
            }
        });
        return matrix.length - lowestEmptyY - 1;
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts":
/*!*********************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HolesV1Calculator": () => (/* binding */ HolesV1Calculator)
/* harmony export */ });
class HolesV1Calculator {
    calculateScore(request) {
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(request.imaginableMatrix, request.gameData.matrix);
        const holesCountDecrease = request.originalHoles.length - holesCount;
        let holesScore;
        if (holesCoveredHeight === 0 || holesCount === 0) {
            holesScore = (holesCountDecrease > 0 ? holesCountDecrease * 150 : holesCountDecrease * 70);
        }
        else {
            holesScore = (holesCountDecrease > 0 ? holesCountDecrease * 150 : holesCountDecrease * 70)
                - holesCoveredHeight * Math.pow(holesCoveredHeight, holesCoveredHeight / (request.gameData.settings.fieldHeight * holesCount)) * 5;
        }
        return holesScore;
    }
    calculateHolesAndCoveredHeight(imaginableMatrix, realMatrix) {
        const [originalTheHighestHoleY, originalTheHighestHoleCoveredY] = this.calculateTheHighestHoleCoveredY(realMatrix);
        let coveredColumnsYs = new Map;
        let holesCoveredHeightsSum = 0;
        let holesCount = 0;
        imaginableMatrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val && !coveredColumnsYs.has(x)) {
                    coveredColumnsYs.set(x, y);
                }
                let coveredY = coveredColumnsYs.get(x);
                if (coveredY !== undefined && !val) {
                    holesCount++;
                    if (originalTheHighestHoleY !== undefined && originalTheHighestHoleCoveredY !== undefined) {
                        if (y < originalTheHighestHoleY) {
                            holesCoveredHeightsSum += y - coveredY;
                        }
                        else if (coveredY < originalTheHighestHoleCoveredY) {
                            holesCoveredHeightsSum += originalTheHighestHoleCoveredY - coveredY;
                        }
                    }
                }
            });
        });
        return [holesCount, holesCoveredHeightsSum];
    }
    calculateTheHighestHoleCoveredY(matrix) {
        let theHighestHoleCoveredY = undefined;
        let theHighestHoleY = undefined;
        let coveredColumnsYs = new Map;
        matrix.some((row, y) => {
            return row.some((val, x) => {
                if (val && !coveredColumnsYs.has(x)) {
                    coveredColumnsYs.set(x, y);
                }
                let coveredY = coveredColumnsYs.get(x);
                if (coveredY !== undefined && !val) {
                    theHighestHoleY = y;
                    theHighestHoleCoveredY = coveredY;
                    return true;
                }
                return false;
            });
        });
        return [theHighestHoleY, theHighestHoleCoveredY];
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/ScoreCalculatorInterface.ts":
/*!**********************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/ScoreCalculatorInterface.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CalculateScoreRequest": () => (/* binding */ CalculateScoreRequest)
/* harmony export */ });
class CalculateScoreRequest {
    gameData;
    originalHoles;
    originalCoveredColumns;
    imaginableMatrix;
    imaginableCoveredColumns;
    squashedLinesCount;
    constructor(gameData, originalHoles, originalCoveredColumns, imaginableMatrix, imaginableCoveredColumns, squashedLinesCount) {
        this.gameData = gameData;
        this.originalHoles = originalHoles;
        this.originalCoveredColumns = originalCoveredColumns;
        this.imaginableMatrix = imaginableMatrix;
        this.imaginableCoveredColumns = imaginableCoveredColumns;
        this.squashedLinesCount = squashedLinesCount;
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts":
/*!*********************************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SquashedRowsCalculator": () => (/* binding */ SquashedRowsCalculator)
/* harmony export */ });
class SquashedRowsCalculator {
    calculateScore(request) {
        return request.squashedLinesCount * 5;
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts":
/*!***********************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TunnelsCalculator": () => (/* binding */ TunnelsCalculator)
/* harmony export */ });
class TunnelsCalculator {
    calculateScore(request) {
        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(request.imaginableMatrix, request.gameData.matrix);
        let tunnelsScore;
        if (tunnelsCount === 0) {
            tunnelsScore = 0;
        }
        else {
            tunnelsScore = -tunnelsCount * 70
                - tunnelsSumHeight * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (request.gameData.settings.fieldHeight * tunnelsCount)) * 7;
        }
        return tunnelsScore;
    }
    calculateTunnelsExceptUncovered(imaginableMatrix, realMatrix) {
        let realCoveredColumns = new Set();
        realMatrix.every((row) => {
            row.forEach((val, x) => {
                if (val) {
                    realCoveredColumns.add(x);
                }
            });
        });
        let imaginableCoveredColumns = new Set();
        let tunnels = new Map;
        const fieldWidth = imaginableMatrix[0].length;
        imaginableMatrix.every((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    imaginableCoveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val
                    && !imaginableCoveredColumns.has(x)
                    && !realCoveredColumns.has(x)
                    && (x === 0 || imaginableCoveredColumns.has(x - 1))
                    && (x === fieldWidth - 1 || imaginableCoveredColumns.has(x + 1))) {
                    tunnels.set(x, (tunnels.get(x) || 0) + 1);
                }
            });
            return imaginableCoveredColumns.size < fieldWidth;
        });
        let tunnelsSumHeight = 0;
        let tunnelsCount = 0;
        tunnels.forEach(height => {
            if (height >= 3) {
                tunnelsSumHeight += height;
                tunnelsCount++;
            }
        });
        return [tunnelsSumHeight, tunnelsCount];
    }
}


/***/ }),

/***/ "./src/TetrisSolver/TetrisSolver.ts":
/*!******************************************!*\
  !*** ./src/TetrisSolver/TetrisSolver.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TetrisSolver": () => (/* binding */ TetrisSolver)
/* harmony export */ });
/* harmony import */ var _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Tetris/EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tetris/CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");


class TetrisSolver {
    eventBus;
    commandBus;
    figurePlacingResolver;
    figurePlacingPerformer;
    constructor(eventBus, commandBus, figurePlacingResolver, figurePlacingPerformer) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.figurePlacingResolver = figurePlacingResolver;
        this.figurePlacingPerformer = figurePlacingPerformer;
        this.commandBus.addHandler(_Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(_Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventType.FiguresSpawned, this.onFiguresSpawned.bind(this));
    }
    onFiguresSpawned(event) {
        const targetFallingFiguresStates = this.figurePlacingResolver.resolve(event.gameData);
        this.figurePlacingPerformer.place(event.gameData, targetFallingFiguresStates);
    }
}


/***/ }),

/***/ "./src/TetrisSolver/TetrisSolverFacade.ts":
/*!************************************************!*\
  !*** ./src/TetrisSolver/TetrisSolverFacade.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TetrisSolverFacade": () => (/* binding */ TetrisSolverFacade)
/* harmony export */ });
/* harmony import */ var _FigurePlacingResolver_FigurePlacingResolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FigurePlacingResolver/FigurePlacingResolver */ "./src/TetrisSolver/FigurePlacingResolver/FigurePlacingResolver.ts");
/* harmony import */ var _ScoreCalculator_CalculatorAggregate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScoreCalculator/CalculatorAggregate */ "./src/TetrisSolver/ScoreCalculator/CalculatorAggregate.ts");
/* harmony import */ var _ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScoreCalculator/SquashedRows/SquashedRowsCalculator */ "./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts");
/* harmony import */ var _ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScoreCalculator/FillableCells/FillableCellsCalculator */ "./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts");
/* harmony import */ var _ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ScoreCalculator/Holes/HolesV1Calculator */ "./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts");
/* harmony import */ var _ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ScoreCalculator/FilledHeight/FilledHeightCalculator */ "./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts");
/* harmony import */ var _ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ScoreCalculator/Tunnels/TunnelsCalculator */ "./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts");
/* harmony import */ var _TetrisSolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TetrisSolver */ "./src/TetrisSolver/TetrisSolver.ts");
/* harmony import */ var _FigurePlacingPerformer_InstantFigurePlacingPerformer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FigurePlacingPerformer/InstantFigurePlacingPerformer */ "./src/TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer.ts");









class TetrisSolverFacade {
    static initSolver(eventBus, commandBus) {
        return new _TetrisSolver__WEBPACK_IMPORTED_MODULE_7__.TetrisSolver(eventBus, commandBus, new _FigurePlacingResolver_FigurePlacingResolver__WEBPACK_IMPORTED_MODULE_0__.FigurePlacingResolver(commandBus, new _ScoreCalculator_CalculatorAggregate__WEBPACK_IMPORTED_MODULE_1__.CalculatorAggregate([
            new _ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_3__.FillableCellsCalculator(),
            new _ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_5__.FilledHeightCalculator(),
            new _ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_4__.HolesV1Calculator(),
            new _ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_2__.SquashedRowsCalculator(),
            new _ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_6__.TunnelsCalculator(),
        ])), 
        // new AnimatedFigurePlacingPerformer(
        //     commandBus,
        //     new LevelBasedTimingsHandler(100, 0.9),
        // ),
        new _FigurePlacingPerformer_InstantFigurePlacingPerformer__WEBPACK_IMPORTED_MODULE_8__.InstantFigurePlacingPerformer(commandBus));
    }
}


/***/ }),

/***/ "./src/TetrisSolver/Utils/HolesHelper.ts":
/*!***********************************************!*\
  !*** ./src/TetrisSolver/Utils/HolesHelper.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HolesHelper": () => (/* binding */ HolesHelper)
/* harmony export */ });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common */ "./src/TetrisSolver/Common.ts");
/* harmony import */ var _Tetris_Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tetris/Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _Tetris_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tetris/Utils/FigurePlacingChecker */ "./src/Tetris/Utils/FigurePlacingChecker.ts");



class HolesHelper {
    static collectHoles(matrix) {
        let holes = [];
        class HoleInProcess {
            cells;
            previousRowOpenXs;
            currentRowOpenXs;
            isOpened;
            continues;
            constructor(cells = [], previousRowOpenXs = [], currentRowOpenXs = [], isOpened = false, continues = false) {
                this.cells = cells;
                this.previousRowOpenXs = previousRowOpenXs;
                this.currentRowOpenXs = currentRowOpenXs;
                this.isOpened = isOpened;
                this.continues = continues;
            }
        }
        let holesInProcess = [];
        let coveredColumns = new Set();
        matrix.forEach((row, y) => {
            holesInProcess.forEach(hole => hole.continues = false);
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                }
                else if (coveredColumns.has(x)) {
                    let processingHole = holesInProcess.find(hole => {
                        return hole.previousRowOpenXs.some(prevX => prevX === x)
                            || (hole.currentRowOpenXs.length > 0
                                && hole.currentRowOpenXs[hole.currentRowOpenXs.length - 1] === x);
                    });
                    if (processingHole === undefined) {
                        processingHole = new HoleInProcess();
                        holesInProcess.push(processingHole);
                    }
                    processingHole.currentRowOpenXs.push(x);
                    processingHole.cells.push(new _Tetris_Common__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y));
                    processingHole.continues = true;
                    processingHole.isOpened = processingHole.isOpened
                        || this.doesTheWayOutFromHoleExists(matrix, new _Tetris_Common__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y), coveredColumns, [[true, true]]);
                }
            });
            let holesInProgressToRemove = [];
            holesInProcess.forEach((hole, i) => {
                if (hole.continues) {
                    hole.previousRowOpenXs = hole.currentRowOpenXs;
                    hole.currentRowOpenXs = [];
                }
                if (!hole.continues || y == matrix.length - 1) {
                    holes.push(new _Common__WEBPACK_IMPORTED_MODULE_0__.Hole(hole.isOpened, hole.cells));
                    holesInProgressToRemove.push(i);
                }
            });
            holesInProgressToRemove.reverse().forEach(i => holesInProcess.splice(i, 1));
        });
        return holes;
    }
    static doesTheWayOutFromHoleExists(matrix, initialCoordinate, coveredColumns, figureMatrix) {
        return this.findTheWayOutFromHole(matrix, initialCoordinate, coveredColumns, figureMatrix) !== undefined;
    }
    static findTheWayOutFromHole(matrix, initialCoordinate, coveredColumns, figureMatrix) {
        if (coveredColumns instanceof Map) {
            coveredColumns = HolesHelper.convertCoveredColumnsToXs(coveredColumns);
        }
        // trying to find the way out from the left side
        let targetXCandidate;
        for (let x = initialCoordinate.x - 1; x >= 0; x--) {
            if (!_Tetris_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_2__.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new _Tetris_Common__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, initialCoordinate.y), matrix)) {
                break;
            }
            let allColumnsFreeToFall = true;
            for (let checkFallX = x + figureMatrix[0].length - 1; checkFallX >= x; checkFallX--) {
                if (coveredColumns.has(checkFallX)) {
                    allColumnsFreeToFall = false;
                    break;
                }
            }
            if (allColumnsFreeToFall) {
                return x;
            }
        }
        // trying to find the way out from the right side
        for (let x = initialCoordinate.x + 1; x < matrix[0].length; x++) {
            if (!_Tetris_Utils_FigurePlacingChecker__WEBPACK_IMPORTED_MODULE_2__.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new _Tetris_Common__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, initialCoordinate.y), matrix)) {
                break;
            }
            let allColumnsFreeToFall = true;
            for (let checkFallX = x; checkFallX < x + figureMatrix[0].length; checkFallX++) {
                if (coveredColumns.has(checkFallX)) {
                    allColumnsFreeToFall = false;
                    break;
                }
            }
            if (allColumnsFreeToFall) {
                return x;
            }
        }
        return undefined;
    }
    static collectCoveredColumnsXs(matrix, toY) {
        return HolesHelper.convertCoveredColumnsToXs(HolesHelper.collectCoveredColumns(matrix, toY));
    }
    static convertCoveredColumnsToXs(coveredColumns) {
        return new Set([...coveredColumns.keys()]);
    }
    /**
     * Возвращает мапу x: y
     */
    static collectCoveredColumns(matrix, toY) {
        let coveredColumns = new Map();
        matrix.some((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.set(x, y);
                }
            });
            return (toY !== undefined && y >= toY)
                || coveredColumns.size == matrix[0].length;
        });
        return coveredColumns;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tetris/EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tetris/CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _Tetris_TetrisFacade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tetris/TetrisFacade */ "./src/Tetris/TetrisFacade.ts");
/* harmony import */ var _TetrisSolver_TetrisSolverFacade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TetrisSolver/TetrisSolverFacade */ "./src/TetrisSolver/TetrisSolverFacade.ts");




document.addEventListener('DOMContentLoaded', () => {
    const eventBus = new _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventBus();
    const commandBus = new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandBus();
    let tetris = new _Tetris_TetrisFacade__WEBPACK_IMPORTED_MODULE_2__.TetrisFacade(eventBus, commandBus);
    _TetrisSolver_TetrisSolverFacade__WEBPACK_IMPORTED_MODULE_3__.TetrisSolverFacade.initSolver(eventBus, commandBus);
    tetris.start();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQzttQkFDL0IsY0FBYyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztDQUNKOzs7Ozs7O1VDdElEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOb0Q7QUFDTTtBQUNSO0FBQ21CO0FBRXJFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSwrREFBUSxFQUFFLENBQUM7SUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxxRUFBVSxFQUFFLENBQUM7SUFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSw4REFBWSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNwRCwyRkFBNkIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFcEQsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25CLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9Db21ib0NvdW50ZXIvQ29tYm9Db3VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvQ29tbWFuZEJ1cy9Db21tYW5kQnVzLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvQ29tbW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvRXZlbnRCdXMvRXZlbnRCdXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9GYWxsaW5nRmlndXJlc1Byb2Nlc3Nvci9SZWd1bGFyRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9GaWd1cmVzLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvRmlndXJlc1NwYXduZXIvQWx3YXlzT25lRmlndXJlU3Bhd25lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0dhbWVDb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvS2V5Ym9hcmRDb250cm9sbGVyL0tleWJvYXJkQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0xldmVsQ291bnRlci9TcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9Nb3ZpbmdIYW5kbGVyL01vdmluZ0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9SZW5kZXJlci9UYWJsZVJlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvU2NvcmVDb3VudGVyL0ZhbGxUaWNrU2NvcmVDb3VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvU3RhdHNDb3VudGVyL1N0YXRzQ291bnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL1RldHJpc0ZhY2FkZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL1RpbWluZ3NIYW5kbGVyL0NvbnN0VGltaW5nc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9VdGlscy9FbnVtSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0ZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0luc3RhbnRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvRmlndXJlUGxhY2luZ1Jlc29sdmVyL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9DYWxjdWxhdG9yQWdncmVnYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxhYmxlQ2VsbHMvRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvSG9sZXMvSG9sZXNWMUNhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1NxdWFzaGVkUm93cy9TcXVhc2hlZFJvd3NDYWxjdWxhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1R1bm5lbHMvVHVubmVsc0NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9UZXRyaXNTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9UZXRyaXNTb2x2ZXJGYWNhZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9VdGlscy9Ib2xlc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEJ1cywgRXZlbnRUeXBlLCBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50fSBmcm9tIFwiLi4vRXZlbnRCdXMvRXZlbnRCdXNcIjtcbmltcG9ydCB7Q29tbWFuZEJ1cywgQ29tbWFuZFR5cGUsIEluaXRHYW1lQ29tbWFuZH0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuXG5leHBvcnQgY2xhc3MgQ29tYm9Db3VudGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHB1YmxpYyBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgKSB7XG4gICAgICAgIGNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Jbml0R2FtZSwgdGhpcy5pbml0R2FtZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0R2FtZUhhbmRsZXIoY29tbWFuZDogSW5pdEdhbWVDb21tYW5kKSB7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMub24oRXZlbnRUeXBlLkZhbGxpbmdUaWNrUHJvY2Vzc2VkLCB0aGlzLm9uRmFsbFRpY2tQcm9jZXNzZWQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGV2ZW50OiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50cmFuc2ZlcnJlZFRvTWF0cml4RmlndXJlcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGV2ZW50LmdhbWVEYXRhLmNvbWJvICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5nYW1lRGF0YS5jb21ibyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge0dhbWVEYXRhfSBmcm9tIFwiLi4vQ29tbW9uXCI7XG5pbXBvcnQge0ZpZ3VyZVR1cm5TdGF0ZX0gZnJvbSBcIi4uL0ZpZ3VyZXNcIjtcblxuZXhwb3J0IGVudW0gQ29tbWFuZFR5cGUge1xuICAgIEluaXRHYW1lLFxuICAgIFJlc3VtZUdhbWUsXG4gICAgUGF1c2VHYW1lLFxuICAgIEZpZ3VyZXNGYWxsVGljayxcbiAgICBHYW1lT3ZlcixcbiAgICBSZW5kZXIsXG4gICAgTW92ZUxlZnQsXG4gICAgTW92ZVJpZ2h0LFxuICAgIFR1cm5DbG9ja3dpc2UsXG4gICAgTW92ZURvd24sXG4gICAgRmlndXJlc0ZhbGxEb3duLFxuICAgIE1vdmVUb1gsXG4gICAgTW92ZVRvWSxcbiAgICBUdXJuVG9TdGF0ZSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kIHtcbiAgICBnYW1lRGF0YTogR2FtZURhdGE7XG5cbiAgICBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEluaXRHYW1lQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5Jbml0R2FtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXN1bWVHYW1lQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5SZXN1bWVHYW1lO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhdXNlR2FtZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuUGF1c2VHYW1lO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpZ3VyZXNGYWxsVGlja0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuRmlndXJlc0ZhbGxUaWNrO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVPdmVyQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5HYW1lT3ZlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLlJlbmRlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZlTGVmdENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuTW92ZUxlZnQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZVJpZ2h0Q29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5Nb3ZlUmlnaHQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHVybkNsb2Nrd2lzZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuVHVybkNsb2Nrd2lzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZlRG93bkNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuTW92ZURvd247XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZVRvWENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgcHVibGljIHg6IG51bWJlclxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5Nb3ZlVG9YO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVUb1lDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyB5OiBudW1iZXIsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLk1vdmVUb1k7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHVyblRvU3RhdGVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyB0dXJuU3RhdGU6IEZpZ3VyZVR1cm5TdGF0ZVxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5UdXJuVG9TdGF0ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEcm9wRmlndXJlc0NvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuRmlndXJlc0ZhbGxEb3duO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbW1hbmRCdXMge1xuICAgIHByaXZhdGUgaGFuZGxlcnM6IE1hcDxDb21tYW5kVHlwZSwgKChwYXlsb2FkOiBDb21tYW5kKSA9PiB2b2lkKVtdPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBhZGRIYW5kbGVyKGV2ZW50OiBDb21tYW5kVHlwZSwgaGFuZGxlcjogKC4uLl86IGFueSkgPT4gdm9pZCwgdW5pcXVlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmdldChldmVudCkgfHwgW107XG4gICAgICAgIGlmICh1bmlxdWUgJiYgaGFuZGxlcnMuc29tZShib3VuZEhhbmRsZXIgPT4gYm91bmRIYW5kbGVyID09PSBoYW5kbGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMuc2V0KGV2ZW50LCBoYW5kbGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUhhbmRsZXIoZXZlbnQ6IENvbW1hbmRUeXBlLCBoYW5kbGVyOiAoLi4uXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICAgICAgbGV0IGluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlcnMuc2V0KGV2ZW50LCBoYW5kbGVycyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJ1bihwYXlsb2FkOiBDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZ2V0KHBheWxvYWQuZ2V0Q29tbWFuZFR5cGUoKSkgfHwgW107XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7aGFuZGxlcihwYXlsb2FkKX0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RmlndXJlLCBGaWd1cmVUdXJuU3RhdGUsIExlZnRMRmlndXJlLCBMWkZpZ3VyZSwgUmlnaHRMRmlndXJlLCBSWkZpZ3VyZSwgU3F1YXJlRmlndXJlLCBTdGlja0ZpZ3VyZSwgVEZpZ3VyZX0gZnJvbSBcIi4vRmlndXJlc1wiO1xuXG4vKipcbiAqIHggZm9yIGhvcml6b250YWwgcG9zaXRpb25pbmdcbiAqIHkgZm9yIHZlcnRpY2FsIHBvc2l0aW9uaW5nXG4gKi9cbmV4cG9ydCBjbGFzcyBDb29yZGluYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHk6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBGYWxsaW5nRmlndXJlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGZpZ3VyZTogRmlndXJlLFxuICAgICAgICBwdWJsaWMgcG9zaXRpb246IENvb3JkaW5hdGUsXG4gICAgICAgIHB1YmxpYyB0dXJuU3RhdGU6IEZpZ3VyZVR1cm5TdGF0ZSxcbiAgICAgICAgcHVibGljIGNvbG9yOiBzdHJpbmd8dW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVTZXR0aW5ncyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBmaWVsZFdpZHRoOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBmaWVsZEhlaWdodDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZmlndXJlczogRmlndXJlW10sXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU3RhdHMge1xuICAgIHB1YmxpYyBmaWd1cmVzRmFsbGVuID0gMDtcbiAgICBwdWJsaWMgbGluZXNTcXVhc2hlZCA9IDA7XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lRGF0YSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyBpc0dhbWVPdmVyOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyBmYWxsaW5nRmlndXJlczogRmFsbGluZ0ZpZ3VyZVtdID0gW10sXG4gICAgICAgIHB1YmxpYyBtYXRyaXg6IGJvb2xlYW5bXVtdID0gW10sXG4gICAgICAgIHB1YmxpYyBuZXh0VGlja1RpbWVvdXRJZDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgfSksXG4gICAgICAgIHB1YmxpYyBzZXR0aW5nczogR2FtZVNldHRpbmdzLFxuICAgICAgICBwdWJsaWMgbGV2ZWw6IG51bWJlciA9IDEsXG4gICAgICAgIHB1YmxpYyBzY29yZTogbnVtYmVyID0gMCxcbiAgICAgICAgcHVibGljIGNvbWJvOiBudW1iZXIgPSAwLFxuICAgICAgICBwdWJsaWMgc3RhdHM6IFN0YXRzID0gbmV3IFN0YXRzKCksXG4gICAgKSB7fVxuXG4gICAgc3RhdGljIG1ha2VTaW1wbGUod2lkdGg6IG51bWJlciA9IDEwLCBoZWlnaHQ6IG51bWJlciA9IDIwKTogR2FtZURhdGEge1xuICAgICAgICByZXR1cm4gbmV3IEdhbWVEYXRhKFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgbmV3IEFycmF5KGhlaWdodCkuZmlsbChbXSlcbiAgICAgICAgICAgICAgICAubWFwKF8gPT4gbmV3IEFycmF5KHdpZHRoKS5maWxsKGZhbHNlKSksXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IEdhbWVTZXR0aW5ncyhcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBuZXcgVEZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgUmlnaHRMRmlndXJlKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBMZWZ0TEZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU3F1YXJlRmlndXJlKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTdGlja0ZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTFpGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJaRmlndXJlKCksXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtGYWxsaW5nRmlndXJlLCBHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgZW51bSBFdmVudFR5cGUge1xuICAgIEZhbGxpbmdUaWNrUHJvY2Vzc2VkLFxuICAgIEdhbWVPdmVyLFxuICAgIEZpZ3VyZXNNb3ZlZCxcbiAgICBMZXZlbFVwLFxuICAgIEZpZ3VyZXNTcGF3bmVkLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50IHtcbiAgICBnYW1lRGF0YTogR2FtZURhdGE7XG5cbiAgICBnZXRFdmVudFR5cGUoKTogRXZlbnRUeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgRmFsbFRpY2tQcm9jZXNzZWRFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgcHVibGljIHRyYW5zZmVycmVkVG9NYXRyaXhGaWd1cmVzOiBGYWxsaW5nRmlndXJlW10sXG4gICAgICAgIHB1YmxpYyBzcXVhc2hlZExpbmVzOiBudW1iZXJbXSxcbiAgICAgICAgcHVibGljIGRyb3BwZWRMaW5lczogbnVtYmVyLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRFdmVudFR5cGUoKTogRXZlbnRUeXBlIHtcbiAgICAgICAgcmV0dXJuIEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lT3ZlckV2ZW50IGltcGxlbWVudHMgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRFdmVudFR5cGUoKTogRXZlbnRUeXBlIHtcbiAgICAgICAgcmV0dXJuIEV2ZW50VHlwZS5HYW1lT3ZlcjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmVzTW92ZWRFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuRmlndXJlc01vdmVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExldmVsVXBFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuTGV2ZWxVcDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmVzU3Bhd25lZEV2ZW50IGltcGxlbWVudHMgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICAgICBwdWJsaWMgbmV3RmlndXJlczogRmFsbGluZ0ZpZ3VyZVtdLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRFdmVudFR5cGUoKTogRXZlbnRUeXBlIHtcbiAgICAgICAgcmV0dXJuIEV2ZW50VHlwZS5GaWd1cmVzU3Bhd25lZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFdmVudEJ1cyB7XG4gICAgcHJpdmF0ZSBoYW5kbGVyczogTWFwPEV2ZW50VHlwZSwgKCguLi5fOiBhbnkpID0+IHZvaWQpW10+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHVibGljIG9uKGV2ZW50OiBFdmVudFR5cGUsIGhhbmRsZXI6ICguLi5fOiBhbnkpID0+IHZvaWQsIHVuaXF1ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgICAgICBpZiAodW5pcXVlICYmIGhhbmRsZXJzLnNvbWUoYm91bmRIYW5kbGVyID0+IGJvdW5kSGFuZGxlciA9PT0gaGFuZGxlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLmhhbmRsZXJzLnNldChldmVudCwgaGFuZGxlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvZmYoZXZlbnQ6IEV2ZW50VHlwZSwgaGFuZGxlcjogKC4uLl86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmdldChldmVudCkgfHwgW107XG4gICAgICAgIGxldCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZXJzLnNldChldmVudCwgaGFuZGxlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXJlKGV2ZW50UGF5bG9hZDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5nZXQoZXZlbnRQYXlsb2FkLmdldEV2ZW50VHlwZSgpKSB8fCBbXTtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChoYW5kbGVyID0+IHtoYW5kbGVyKGV2ZW50UGF5bG9hZCl9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmUsIEdhbWVEYXRhfSBmcm9tIFwiLi4vQ29tbW9uXCI7XG5pbXBvcnQge0Ryb3BGaWd1cmVzQ29tbWFuZCwgQ29tbWFuZEJ1cywgQ29tbWFuZFR5cGUsIEdhbWVPdmVyQ29tbWFuZCwgRmlndXJlc0ZhbGxUaWNrQ29tbWFuZH0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtFdmVudEJ1cywgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0ZpZ3VyZVBsYWNpbmdDaGVja2VyfSBmcm9tIFwiLi4vVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXJcIjtcblxuY2xhc3MgRmFsbGluZ1Jlc3VsdCB7XG4gICAgcHVibGljIHRyYW5zZmVycmVkRmlndXJlczogRmFsbGluZ0ZpZ3VyZVtdID0gW107XG4gICAgcHVibGljIGlzR2FtZU92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbn1cblxuZXhwb3J0IGNsYXNzIFJlZ3VsYXJGYWxsaW5nRmlndXJlc1Byb2Nlc3NvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsVGljaywgdGhpcy5wcm9jZXNzRmlndXJlc0ZhbGxUaWNrQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuRmlndXJlc0ZhbGxEb3duLCB0aGlzLnByb2Nlc3NEcm9wRmlndXJlc0NvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRmlndXJlc0ZhbGxUaWNrQ29tbWFuZChjb21tYW5kOiBGaWd1cmVzRmFsbFRpY2tDb21tYW5kKSB7XG4gICAgICAgIGNvbnN0IGZhbGxpbmdSZXN1bHQgPSB0aGlzLmZhbGxGaWd1cmVzRm9yT25lQ2VsbChjb21tYW5kLmdhbWVEYXRhKTtcbiAgICAgICAgbGV0IHNxdWFzaGVkTGluZXMgPSB0aGlzLnNxdWFzaExpbmVzKGNvbW1hbmQuZ2FtZURhdGEubWF0cml4KTtcbiAgICAgICAgaWYgKGZhbGxpbmdSZXN1bHQuaXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgR2FtZU92ZXJDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQoXG4gICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLFxuICAgICAgICAgICAgZmFsbGluZ1Jlc3VsdC50cmFuc2ZlcnJlZEZpZ3VyZXMsXG4gICAgICAgICAgICBzcXVhc2hlZExpbmVzLFxuICAgICAgICAgICAgMFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NEcm9wRmlndXJlc0NvbW1hbmQoY29tbWFuZDogRHJvcEZpZ3VyZXNDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGxldCBmYWxsaW5nUmVzdWx0ID0gbmV3IEZhbGxpbmdSZXN1bHQoKTtcbiAgICAgICAgbGV0IGRyb3BwZWRMaW5lcyA9IDA7XG4gICAgICAgIHdoaWxlIChjb21tYW5kLmdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG9uZUNlbGxGYWxsaW5nUmVzdWx0ID0gdGhpcy5mYWxsRmlndXJlc0Zvck9uZUNlbGwoY29tbWFuZC5nYW1lRGF0YSk7XG4gICAgICAgICAgICBmYWxsaW5nUmVzdWx0LnRyYW5zZmVycmVkRmlndXJlcy5wdXNoKC4uLm9uZUNlbGxGYWxsaW5nUmVzdWx0LnRyYW5zZmVycmVkRmlndXJlcyk7XG4gICAgICAgICAgICBmYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXIgPSBmYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXIgfHwgb25lQ2VsbEZhbGxpbmdSZXN1bHQuaXNHYW1lT3ZlcjtcbiAgICAgICAgICAgIGRyb3BwZWRMaW5lcysrO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcXVhc2hlZExpbmVzID0gdGhpcy5zcXVhc2hMaW5lcyhjb21tYW5kLmdhbWVEYXRhLm1hdHJpeCk7XG4gICAgICAgIGlmIChmYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IEdhbWVPdmVyQ29tbWFuZChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KFxuICAgICAgICAgICAgY29tbWFuZC5nYW1lRGF0YSxcbiAgICAgICAgICAgIGZhbGxpbmdSZXN1bHQudHJhbnNmZXJyZWRGaWd1cmVzLFxuICAgICAgICAgICAgc3F1YXNoZWRMaW5lcyxcbiAgICAgICAgICAgIGRyb3BwZWRMaW5lcyAtIDEsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmFsbEZpZ3VyZXNGb3JPbmVDZWxsKGdhbWVEYXRhOiBHYW1lRGF0YSk6IEZhbGxpbmdSZXN1bHQge1xuICAgICAgICBsZXQgZmFsbGluZ1Jlc3VsdCA9IG5ldyBGYWxsaW5nUmVzdWx0KCk7XG4gICAgICAgIGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmZvckVhY2goKGZhbGxpbmdGaWd1cmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWd1cmVDYW5GYWxsKGdhbWVEYXRhLm1hdHJpeCwgZmFsbGluZ0ZpZ3VyZSkpIHtcbiAgICAgICAgICAgICAgICBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnkrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpZ3VyZUdhbWVPdmVyUmVzdWx0ID0gdGhpcy50cmFuc2ZlckZpZ3VyZVRvTWF0cml4KFxuICAgICAgICAgICAgICAgICAgICBnYW1lRGF0YS5tYXRyaXgsXG4gICAgICAgICAgICAgICAgICAgIGZhbGxpbmdGaWd1cmVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZhbGxpbmdSZXN1bHQudHJhbnNmZXJyZWRGaWd1cmVzLnB1c2goLi4uZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuc3BsaWNlKGluZGV4LCAxKSk7XG4gICAgICAgICAgICAgICAgZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyID0gZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyIHx8IGZpZ3VyZUdhbWVPdmVyUmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbGxpbmdSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaWd1cmVDYW5GYWxsKG1hdHJpeDogYm9vbGVhbltdW10sIGZhbGxpbmdGaWd1cmU6IEZhbGxpbmdGaWd1cmUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKFxuICAgICAgICAgICAgZmFsbGluZ0ZpZ3VyZS5maWd1cmUuZ2V0VHVybihmYWxsaW5nRmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICBuZXcgQ29vcmRpbmF0ZShmYWxsaW5nRmlndXJlLnBvc2l0aW9uLngsIGZhbGxpbmdGaWd1cmUucG9zaXRpb24ueSArIDEpLFxuICAgICAgICAgICAgbWF0cml4XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2ZlckZpZ3VyZVRvTWF0cml4KG1hdHJpeDogYm9vbGVhbltdW10sIGZhbGxpbmdGaWd1cmU6IEZhbGxpbmdGaWd1cmUpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgZmFsbGluZ0ZpZ3VyZS5maWd1cmUuZ2V0VHVybihmYWxsaW5nRmlndXJlLnR1cm5TdGF0ZSlcbiAgICAgICAgICAgIC5mb3JFYWNoKChyb3csIGZpZ3VyZUNlbGxZKSA9PiB7XG4gICAgICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGxWYWx1ZSwgZmlndXJlQ2VsbFgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjZWxsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0cml4WCA9IGZhbGxpbmdGaWd1cmUucG9zaXRpb24ueCArIGZpZ3VyZUNlbGxYO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0cml4WSA9IGZhbGxpbmdGaWd1cmUucG9zaXRpb24ueSArIGZpZ3VyZUNlbGxZO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0cml4WSBpbiBtYXRyaXhcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIG1hdHJpeFggaW4gbWF0cml4W21hdHJpeFldXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAhbWF0cml4W21hdHJpeFldW21hdHJpeFhdXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4W21hdHJpeFldW21hdHJpeFhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlzR2FtZU92ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcXVhc2hMaW5lcyhtYXRyaXg6IGJvb2xlYW5bXVtdKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgbGluZXNUb1NxdWFzaDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhbkJlU3F1YXNoZWQgPSByb3cuZXZlcnkoY2VsbCA9PiBjZWxsKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVNxdWFzaGVkKSB7XG4gICAgICAgICAgICAgICAgbGluZXNUb1NxdWFzaC5wdXNoKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgICAgbGluZXNUb1NxdWFzaC5mb3JFYWNoKHkgPT4ge1xuICAgICAgICAgICAgbWF0cml4LnNwbGljZSh5LCAxKTtcbiAgICAgICAgICAgIG1hdHJpeC51bnNoaWZ0KG5ldyBBcnJheShtYXRyaXhbMF0ubGVuZ3RoKS5maWxsKGZhbHNlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGluZXNUb1NxdWFzaDtcbiAgICB9XG59XG4iLCJleHBvcnQgZW51bSBGaWd1cmVUdXJuU3RhdGUge1xuICAgIE9uZSxcbiAgICBUd28sXG4gICAgVGhyZWUsXG4gICAgRm91cixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWd1cmUge1xuICAgIC8qKlxuICAgICAqIEFueSBmaWd1cmUgbXVzdCBiZSBhYmxlIHRvIHR1cm4gNCB0aW1lcyBpbiAyIGRpbWVuc2lvbnMuXG4gICAgICogQWxsIHR1cm5zIGFyZSBjbG9ja3dpc2UuXG4gICAgICovXG4gICAgZ2V0VHVybihmaWd1cmVUdXJuU3RhdGU6IEZpZ3VyZVR1cm5TdGF0ZSk6IGJvb2xlYW5bXVtdO1xuICAgIGdldEZpcnN0VHVybigpOiBib29sZWFuW11bXTtcbiAgICBnZXRTZWNvbmRUdXJuKCk6IGJvb2xlYW5bXVtdO1xuICAgIGdldFRoaXJkVHVybigpOiBib29sZWFuW11bXTtcbiAgICBnZXRGb3J0aFR1cm4oKTogYm9vbGVhbltdW107XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZpZ3VyZSBpbXBsZW1lbnRzIEZpZ3VyZXtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0Rmlyc3RUdXJuKCk6IGJvb2xlYW5bXVtdO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRTZWNvbmRUdXJuKCk6IGJvb2xlYW5bXVtdO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRUaGlyZFR1cm4oKTogYm9vbGVhbltdW107XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZvcnRoVHVybigpOiBib29sZWFuW11bXTtcblxuICAgIGdldFR1cm4oZmlndXJlVHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGUpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHN3aXRjaCAoZmlndXJlVHVyblN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIEZpZ3VyZVR1cm5TdGF0ZS5PbmU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RUdXJuKCk7XG4gICAgICAgICAgICBjYXNlIEZpZ3VyZVR1cm5TdGF0ZS5Ud286XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kVHVybigpO1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuVGhyZWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGhpcmRUdXJuKCk7XG4gICAgICAgICAgICBjYXNlIEZpZ3VyZVR1cm5TdGF0ZS5Gb3VyOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZvcnRoVHVybigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgZ2l2ZXMgYW4gZWFzeSB3YXkgdG8gZGVmaW5lIGZpZ3VyZXMgZm9yIHRldHJpcy5cbiAqIEp1c3QgaW1wbGVtZW50IHRoZSBnZXRGaWd1cmUgbWV0aG9kIGFuZCByZXR1cm4gZmlndXJlIGxpa2UgdGhpczpcbiAqIGBgYCh0cylcbiAqIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICogICAgIHJldHVybiBbXG4gKiAgICAgICAgIFt0cnVlLCAgdHJ1ZSwgdHJ1ZV0sXG4gKiAgICAgICAgIFtmYWxzZSwgdHJ1ZSwgZmFsc2VdLFxuICogICAgICAgICBbdHJ1ZSwgIHRydWUsIHRydWVdLFxuICogICAgIF07XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBPciBkZWZpbmUgaXQgbGlrZSB0aGlzIGZvciBtb3JlIHZpc3VhbCBwcmVzZW50YXRpb246XG4gKiBgYGAodHMpXG4gKiBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAqICAgICByZXR1cm4gW1xuICogICAgICAgICBcIiMjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAqICAgICAgICAgXCItIy1cIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gKiAgICAgICAgIFwiIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICogICAgIF07XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBseVJvdGF0YWJsZUZpZ3VyZSBleHRlbmRzIEFic3RyYWN0RmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdO1xuXG4gICAgcHJpdmF0ZSBnZXROb3JtYWxpemVkRmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgbGV0IGZpZ3VyZSA9IHRoaXMuZ2V0RmlndXJlKCk7XG4gICAgICAgIGxldCB0aGVMb25nZXN0Um93U2l6ZSA9IGZpZ3VyZS5yZWR1Y2UoXG4gICAgICAgICAgICAocHJldmlvdXMsIGN1cnJlbnQpID0+IE1hdGgubWF4KHByZXZpb3VzLCBjdXJyZW50Lmxlbmd0aCksXG4gICAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmaWd1cmUubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICBsZXQgb3JpZ2luYWxMZW5ndGggPSByb3cubGVuZ3RoO1xuICAgICAgICAgICAgcm93Lmxlbmd0aCA9IHRoZUxvbmdlc3RSb3dTaXplO1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5maWxsKGZhbHNlLCBvcmlnaW5hbExlbmd0aCAtIDEsIHRoZUxvbmdlc3RSb3dTaXplIC0gMSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGaXJzdFR1cm4oKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROb3JtYWxpemVkRmlndXJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlY29uZFR1cm4oKTogYm9vbGVhbltdW10ge1xuICAgICAgICBsZXQgb3JpZ2luYWxGaWd1cmUgPSB0aGlzLmdldE5vcm1hbGl6ZWRGaWd1cmUoKTtcbiAgICAgICAgbGV0IHR1cm5lZEZpZ3VyZTogYm9vbGVhbltdW10gPSBbXTtcbiAgICAgICAgbGV0IG9yaWdpbmFsRmlndXJlSGVpZ2h0ID0gb3JpZ2luYWxGaWd1cmUubGVuZ3RoO1xuICAgICAgICBsZXQgb3JpZ2luYWxGaWd1cmVXaWR0aCA9IG9yaWdpbmFsRmlndXJlWzBdLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBvcmlnaW5hbEZpZ3VyZVdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgIHR1cm5lZEZpZ3VyZVt4XSA9IG5ldyBBcnJheShvcmlnaW5hbEZpZ3VyZUhlaWdodCkuZmlsbChmYWxzZSk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IG9yaWdpbmFsRmlndXJlSGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICB0dXJuZWRGaWd1cmVbeF1bb3JpZ2luYWxGaWd1cmVIZWlnaHQgLSB5IC0gMV0gPSBvcmlnaW5hbEZpZ3VyZVt5XVt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHVybmVkRmlndXJlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaGlyZFR1cm4oKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJzdFR1cm4oKS5yZXZlcnNlKCkubWFwKHJvdyA9PiByb3cucmV2ZXJzZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Rm9ydGhUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2Vjb25kVHVybigpLnJldmVyc2UoKS5tYXAocm93ID0+IHJvdy5yZXZlcnNlKCkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgICAgICBcIi0jLVwiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSaWdodExGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgICAgICBcIi0tI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZWZ0TEZpZ3VyZSBleHRlbmRzIFNpbXBseVJvdGF0YWJsZUZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIiMjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgICAgIFwiIy0tXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNxdWFyZUZpZ3VyZSBleHRlbmRzIFNpbXBseVJvdGF0YWJsZUZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIiMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCIjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdGlja0ZpZ3VyZSBleHRlbmRzIFNpbXBseVJvdGF0YWJsZUZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIiMjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTFpGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIy1cIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgICAgICBcIi0jI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJaRmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiLSMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCIjIy1cIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudEJ1cywgRXZlbnRUeXBlLCBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50LCBGaWd1cmVzU3Bhd25lZEV2ZW50fSBmcm9tIFwiLi4vRXZlbnRCdXMvRXZlbnRCdXNcIjtcbmltcG9ydCB7RmlndXJlVHVyblN0YXRlfSBmcm9tIFwiLi4vRmlndXJlc1wiO1xuaW1wb3J0IHtDb29yZGluYXRlLCBGYWxsaW5nRmlndXJlLCBHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtDb21tYW5kQnVzLCBDb21tYW5kVHlwZSwgSW5pdEdhbWVDb21tYW5kfSBmcm9tIFwiLi4vQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5pbXBvcnQge0VudW1IZWxwZXJ9IGZyb20gXCIuLi9VdGlscy9FbnVtSGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBbHdheXNPbmVGaWd1cmVTcGF3bmVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0SGFuZGxlcihldmVudDogSW5pdEdhbWVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMub24oXG4gICAgICAgICAgICBFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQsXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NPbkZhbGxUaWNrLmJpbmQodGhpcyksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzT25GYWxsVGljayhldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZEZpZ3VyZShldmVudC5nYW1lRGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRGaWd1cmUoZ2FtZURhdGE6IEdhbWVEYXRhKTogdm9pZCB7XG4gICAgICAgIGlmIChnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggPiAwIHx8IGdhbWVEYXRhLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpZ3VyZUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2FtZURhdGEuc2V0dGluZ3MuZmlndXJlcy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBmaWd1cmUgPSBnYW1lRGF0YS5zZXR0aW5ncy5maWd1cmVzW2ZpZ3VyZUluZGV4XTtcbiAgICAgICAgY29uc3QgdHVyblN0YXRlID0gRW51bUhlbHBlci5HZXRSYW5kb20oRmlndXJlVHVyblN0YXRlKTtcbiAgICAgICAgY29uc3QgZmlndXJlTWF0cml4ID0gZmlndXJlLmdldFR1cm4odHVyblN0YXRlKTtcbiAgICAgICAgY29uc3QgZmlndXJlV2lkdGggPSBNYXRoLm1heCguLi5maWd1cmVNYXRyaXgubWFwKHJvdyA9PiByb3cubGVuZ3RoKSk7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZShcbiAgICAgICAgICAgIE1hdGguY2VpbChnYW1lRGF0YS5zZXR0aW5ncy5maWVsZFdpZHRoIC8gMiAtIGZpZ3VyZVdpZHRoIC8gMikgLSAxLFxuICAgICAgICAgICAgLWZpZ3VyZU1hdHJpeC5sZW5ndGgsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZhbGxpbmdGaWd1cmUgPSBuZXcgRmFsbGluZ0ZpZ3VyZShcbiAgICAgICAgICAgIGZpZ3VyZSxcbiAgICAgICAgICAgIGNvb3JkaW5hdGUsXG4gICAgICAgICAgICB0dXJuU3RhdGVcbiAgICAgICAgKTtcbiAgICAgICAgZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMucHVzaChmYWxsaW5nRmlndXJlKTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzU3Bhd25lZEV2ZW50KGdhbWVEYXRhLCBbZmFsbGluZ0ZpZ3VyZV0pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1RpbWluZ3NIYW5kbGVyfSBmcm9tIFwiLi9UaW1pbmdzSGFuZGxlci9UaW1pbmdzSGFuZGxlclwiO1xuaW1wb3J0IHtFdmVudEJ1cywgRXZlbnRUeXBlLCBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50LCBGaWd1cmVzTW92ZWRFdmVudCwgR2FtZU92ZXJFdmVudH0gZnJvbSBcIi4vRXZlbnRCdXMvRXZlbnRCdXNcIjtcbmltcG9ydCB7Q29tbWFuZEJ1cywgQ29tbWFuZFR5cGUsIEZpZ3VyZXNGYWxsVGlja0NvbW1hbmQsIEluaXRHYW1lQ29tbWFuZCwgUGF1c2VHYW1lQ29tbWFuZCwgUmVuZGVyQ29tbWFuZCwgUmVzdW1lR2FtZUNvbW1hbmR9IGZyb20gXCIuL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4vQ29tbW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBHYW1lQ29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSBnYW1lRGF0YTogR2FtZURhdGEgPSBHYW1lRGF0YS5tYWtlU2ltcGxlKCk7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHByaXZhdGUgdGltaW5nc0hhbmRsZXI6IFRpbWluZ3NIYW5kbGVyLFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Jbml0R2FtZSwgdGhpcy5pbml0R2FtZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLlJlc3VtZUdhbWUsIHRoaXMucmVzdW1lR2FtZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLlBhdXNlR2FtZSwgdGhpcy5wYXVzZUdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5HYW1lT3ZlciwgdGhpcy5nYW1lT3ZlckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0R2FtZUhhbmRsZXIoY29tbWFuZDogSW5pdEdhbWVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZURhdGEgPSBjb21tYW5kLmdhbWVEYXRhO1xuICAgICAgICB0aGlzLmdhbWVEYXRhLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdW1lR2FtZUhhbmRsZXIoY29tbWFuZDogUmVzdW1lR2FtZUNvbW1hbmQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEuaXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5nYW1lRGF0YS5pc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBJbml0R2FtZUNvbW1hbmQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmFsbFRpY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhdXNlR2FtZUhhbmRsZXIoY29tbWFuZDogUGF1c2VHYW1lQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVEYXRhID0gY29tbWFuZC5nYW1lRGF0YTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZ2FtZURhdGEubmV4dFRpY2tUaW1lb3V0SWQpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBSZW5kZXJDb21tYW5kKHRoaXMuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdhbWVPdmVySGFuZGxlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lRGF0YS5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZURhdGEuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmdhbWVEYXRhLm5leHRUaWNrVGltZW91dElkKTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBHYW1lT3ZlckV2ZW50KHRoaXMuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhbGxUaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBGaWd1cmVzRmFsbFRpY2tDb21tYW5kKHRoaXMuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmFsbFRpY2tQcm9jZXNzZWQoZXZlbnQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZ2FtZURhdGEubmV4dFRpY2tUaW1lb3V0SWQpO1xuICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMudGltaW5nc0hhbmRsZXIuZ2V0RGVsYXlGb3JOZXh0VGlja01zKHRoaXMuZ2FtZURhdGEpO1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZURhdGEuaXNHYW1lT3ZlciAmJiBkZWxheSAhPSBJbmZpbml0eSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lRGF0YS5uZXh0VGlja1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgdGhpcy5mYWxsVGljay5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIHRoaXMudGltaW5nc0hhbmRsZXIuZ2V0RGVsYXlGb3JOZXh0VGlja01zKHRoaXMuZ2FtZURhdGEpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb21tYW5kQnVzLCBDb21tYW5kVHlwZSwgRHJvcEZpZ3VyZXNDb21tYW5kLCBJbml0R2FtZUNvbW1hbmQsIE1vdmVMZWZ0Q29tbWFuZCwgTW92ZVJpZ2h0Q29tbWFuZCwgVHVybkNsb2Nrd2lzZUNvbW1hbmQsIE1vdmVEb3duQ29tbWFuZH0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLnByb2Nlc3NJbml0R2FtZUNvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzSW5pdEdhbWVDb21tYW5kKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB3aW5kb3cub25rZXlkb3duID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgTW92ZUxlZnRDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgTW92ZVJpZ2h0Q29tbWFuZChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1VwJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFR1cm5DbG9ja3dpc2VDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBNb3ZlRG93bkNvbW1hbmQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5jb2RlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IE1vdmVEb3duQ29tbWFuZChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdTcGFjZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBEcm9wRmlndXJlc0NvbW1hbmQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIFNxdWFzaGVkUm93c0NvdW50ZXJCYXNlZExldmVsQ291bnRlciB7XG4gICAgcHJpdmF0ZSBzcXVhc2hlZFJvd3NDb3VudGVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGxldmVsSW5jcmVhc2VPblNxdWFzaGVkUm93c051bWJlcjogbnVtYmVyLFxuICAgICAgICBwcml2YXRlIG1heExldmVsczogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Jbml0R2FtZSwgdGhpcy5wcm9jZXNzSW5pdEdhbWVDb21tYW5kLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzSW5pdEdhbWVDb21tYW5kKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGV2ZW50OiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3F1YXNoZWRSb3dzQ291bnRlcisrO1xuICAgICAgICBpZiAodGhpcy5zcXVhc2hlZFJvd3NDb3VudGVyID49IHRoaXMubGV2ZWxJbmNyZWFzZU9uU3F1YXNoZWRSb3dzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFzaGVkUm93c0NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgZXZlbnQuZ2FtZURhdGEubGV2ZWwgPSBNYXRoLm1pbih0aGlzLm1heExldmVscywgZXZlbnQuZ2FtZURhdGEubGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgQ29tbWFuZEJ1cyxcbiAgICBDb21tYW5kVHlwZSxcbiAgICBNb3ZlTGVmdENvbW1hbmQsXG4gICAgTW92ZVJpZ2h0Q29tbWFuZCxcbiAgICBUdXJuQ2xvY2t3aXNlQ29tbWFuZCxcbiAgICBNb3ZlRG93bkNvbW1hbmQsXG4gICAgRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCxcbiAgICBNb3ZlVG9YQ29tbWFuZCxcbiAgICBNb3ZlVG9ZQ29tbWFuZCxcbiAgICBUdXJuVG9TdGF0ZUNvbW1hbmRcbn0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVUdXJuU3RhdGV9IGZyb20gXCIuLi9GaWd1cmVzXCI7XG5pbXBvcnQge0V2ZW50QnVzLCBGaWd1cmVzTW92ZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmV9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi9VdGlscy9GaWd1cmVQbGFjaW5nQ2hlY2tlclwiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vVXRpbHMvRW51bUhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgTW92aW5nSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVMZWZ0LCB0aGlzLnByb2Nlc3NNb3ZlTGVmdENvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVSaWdodCwgdGhpcy5wcm9jZXNzTW92ZVJpZ2h0Q29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuTW92ZURvd24sIHRoaXMucHJvY2Vzc01vdmVEb3duQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuVHVybkNsb2Nrd2lzZSwgdGhpcy5wcm9jZXNzVHVybkNsb2Nrd2lzZUNvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVUb1gsIHRoaXMucHJvY2Vzc01vdmVUb1hDb21tYW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Nb3ZlVG9ZLCB0aGlzLnByb2Nlc3NNb3ZlVG9ZQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuVHVyblRvU3RhdGUsIHRoaXMucHJvY2Vzc1R1cm5Ub1N0YXRlQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlTGVmdENvbW1hbmQoY29tbWFuZDogTW92ZUxlZnRDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVNb3ZlZExlZnQgPSBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oZmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmlndXJlLnBvc2l0aW9uLnggLSAxLCBmaWd1cmUucG9zaXRpb24ueSksXG4gICAgICAgICAgICAgICAgY29tbWFuZC5nYW1lRGF0YS5tYXRyaXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoY2FuQmVNb3ZlZExlZnQpIHtcbiAgICAgICAgICAgICAgICBmaWd1cmUucG9zaXRpb24ueC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzTW92ZWRFdmVudChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzTW92ZVJpZ2h0Q29tbWFuZChjb21tYW5kOiBNb3ZlUmlnaHRDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVNb3ZlZFJpZ2h0ID0gRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoXG4gICAgICAgICAgICAgICAgZmlndXJlLmZpZ3VyZS5nZXRUdXJuKGZpZ3VyZS50dXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIG5ldyBDb29yZGluYXRlKGZpZ3VyZS5wb3NpdGlvbi54ICsgMSwgZmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEubWF0cml4XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGNhbkJlTW92ZWRSaWdodCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbi54Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NUdXJuQ2xvY2t3aXNlQ29tbWFuZChjb21tYW5kOiBUdXJuQ2xvY2t3aXNlQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbGxUdXJuU3RhdGVzID0gRW51bUhlbHBlci5Ub0FycmF5KEZpZ3VyZVR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgbGV0IG5leHRUdXJuU3RhdGUgPSBmaWd1cmUudHVyblN0YXRlICsgMTtcbiAgICAgICAgICAgIGlmICghKG5leHRUdXJuU3RhdGUgaW4gYWxsVHVyblN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICBuZXh0VHVyblN0YXRlID0gYWxsVHVyblN0YXRlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhbkJlVHVybmVkID0gRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoXG4gICAgICAgICAgICAgICAgZmlndXJlLmZpZ3VyZS5nZXRUdXJuKG5leHRUdXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVR1cm5lZCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS50dXJuU3RhdGUgPSBuZXh0VHVyblN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzTW92ZWRFdmVudChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzTW92ZURvd25Db21tYW5kKGNvbW1hbmQ6IE1vdmVEb3duQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBGaWd1cmVzRmFsbFRpY2tDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlVG9YQ29tbWFuZChjb21tYW5kOiBNb3ZlVG9YQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBpZiAoY29tbWFuZC54IDwgMCB8fCBjb21tYW5kLnggPiAoY29tbWFuZC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZFdpZHRoIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb21tYW5kLmdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmZvckVhY2goZmlndXJlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vdmluZ01vZGlmaWVyID0gY29tbWFuZC54ID4gZmlndXJlLnBvc2l0aW9uLnggPyAxIDogLTE7XG4gICAgICAgICAgICB3aGlsZSAoZmlndXJlLnBvc2l0aW9uLnggIT09IGNvbW1hbmQueCAmJiBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oZmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmlndXJlLnBvc2l0aW9uLnggKyBtb3ZpbmdNb2RpZmllciwgZmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEubWF0cml4XG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgZmlndXJlLnBvc2l0aW9uLnggKz0gbW92aW5nTW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlVG9ZQ29tbWFuZChjb21tYW5kOiBNb3ZlVG9ZQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBpZiAoY29tbWFuZC55IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGZpZ3VyZS5wb3NpdGlvbi55IDwgY29tbWFuZC55ICYmIEZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5maWd1cmUuZ2V0VHVybihmaWd1cmUudHVyblN0YXRlKSxcbiAgICAgICAgICAgICAgICBuZXcgQ29vcmRpbmF0ZShmaWd1cmUucG9zaXRpb24ueCwgZmlndXJlLnBvc2l0aW9uLnkgKyAxKSxcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbi55Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NUdXJuVG9TdGF0ZUNvbW1hbmQoY29tbWFuZDogVHVyblRvU3RhdGVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVUdXJuZWQgPSBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oY29tbWFuZC50dXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVR1cm5lZCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS50dXJuU3RhdGUgPSBjb21tYW5kLnR1cm5TdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmlndXJlc01vdmVkRXZlbnQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29tbWFuZEJ1cywgQ29tbWFuZFR5cGUsIEluaXRHYW1lQ29tbWFuZCwgUmVuZGVyQ29tbWFuZH0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtFdmVudEJ1cywgRXZlbnRUeXBlLCBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50LCBHYW1lT3ZlckV2ZW50fSBmcm9tIFwiLi4vRXZlbnRCdXMvRXZlbnRCdXNcIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi9VdGlscy9GaWd1cmVQbGFjaW5nQ2hlY2tlclwiO1xuaW1wb3J0IHtDb29yZGluYXRlLCBGYWxsaW5nRmlndXJlLCBHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgVGFibGVSZW5kZXJlckNlbGxDb2xvclNldHRpbmdzIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGZpbGxlZDogc3RyaW5nfG51bGwsXG4gICAgICAgIHB1YmxpYyBmaWxsZWRHYW1lT3Zlcjogc3RyaW5nfG51bGwsXG4gICAgICAgIHB1YmxpYyBlbXB0eTogc3RyaW5nfG51bGwsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVSZW5kZXJlclNldHRpbmdzIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBwdWJsaWMgcmVuZGVyUHJvamVjdGlvbkZpZ3VyZXM6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBwdWJsaWMgbWF0cml4Q2VsbENvbG9yczogVGFibGVSZW5kZXJlckNlbGxDb2xvclNldHRpbmdzID0gbmV3IFRhYmxlUmVuZGVyZXJDZWxsQ29sb3JTZXR0aW5ncyhcbiAgICAgICAgICAgICcjMDA3NDAwJyxcbiAgICAgICAgICAgICcjNzgwMDAwJyxcbiAgICAgICAgICAgICcjZmZmJyxcbiAgICAgICAgKSxcbiAgICAgICAgcHVibGljIGZhbGxpbmdGaWd1cmVDZWxsQ29sb3JzOiBUYWJsZVJlbmRlcmVyQ2VsbENvbG9yU2V0dGluZ3MgPSBuZXcgVGFibGVSZW5kZXJlckNlbGxDb2xvclNldHRpbmdzKFxuICAgICAgICAgICAgJyMwMDc0MDAnLFxuICAgICAgICAgICAgJyM3ODAwMDAnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgKSxcbiAgICAgICAgcHVibGljIHByb2plY3Rpb25GaWd1cmVDZWxsQ29sb3JzOiBUYWJsZVJlbmRlcmVyQ2VsbENvbG9yU2V0dGluZ3MgPSBuZXcgVGFibGVSZW5kZXJlckNlbGxDb2xvclNldHRpbmdzKFxuICAgICAgICAgICAgJyNiOGU1ZTMnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICksXG4gICAgKSB7fVxufVxuXG5jbGFzcyBDZWxsQ29sb3JzIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGZpbGxlZDogc3RyaW5nfG51bGwsXG4gICAgICAgIHB1YmxpYyBlbXB0eTogc3RyaW5nfG51bGwsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVSZW5kZXJlciB7XG4gICAgcHJpdmF0ZSBjZWxsc0h0bWxFbGVtZW50c01hcDogSFRNTEVsZW1lbnRbXVtdID0gW107XG4gICAgcHJpdmF0ZSB0YWJsZTogSFRNTEVsZW1lbnR8dW5kZWZpbmVkO1xuICAgIHByaXZhdGUgc2NvcmVEaXNwbGF5OiBIVE1MRWxlbWVudHx1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHByaXZhdGUgcmVuZGVyU2V0dGluZ3M6IFRhYmxlUmVuZGVyZXJTZXR0aW5ncyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICApIHtcbiAgICAgICAgY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuUmVuZGVyLCB0aGlzLnJlbmRlckNvbW1hbmRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEhhbmRsZXIoY29tbWFuZDogSW5pdEdhbWVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFibGUgPSBUYWJsZVJlbmRlcmVyLmNyZWF0ZUh0bWxFbGVtZW50KCc8ZGl2IHN0eWxlPVwiZmxvYXQ6IGxlZnQ7IGRpc3BsYXk6IHRhYmxlOyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlXCI+PC9kaXY+Jyk7XG4gICAgICAgIHRoaXMuY2VsbHNIdG1sRWxlbWVudHNNYXAgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjb21tYW5kLmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBUYWJsZVJlbmRlcmVyLmNyZWF0ZUh0bWxFbGVtZW50KCc8ZGl2IHN0eWxlPVwiZGlzcGxheTogdGFibGUtcm93XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICB0aGlzLmNlbGxzSHRtbEVsZW1lbnRzTWFwW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNvbW1hbmQuZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSBUYWJsZVJlbmRlcmVyLmNyZWF0ZUh0bWxFbGVtZW50KCc8ZGl2IHN0eWxlPVwiZGlzcGxheTogdGFibGUtY2VsbDsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgd2lkdGg6IDIwcHg7IGhlaWdodDogMjBweFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNIdG1sRWxlbWVudHNNYXBbeV1beF0gPSBjZWxsO1xuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFibGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNldHRpbmdzLmNvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMucmVuZGVyU2V0dGluZ3MuY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRhYmxlKTtcblxuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheSA9IFRhYmxlUmVuZGVyZXIuY3JlYXRlSHRtbEVsZW1lbnQoXG4gICAgICAgICAgICBgPGRpdiBzdHlsZT1cImZsb2F0OiBsZWZ0OyBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAyMHB4OyBtYXJnaW4tbGVmdDogMTVweDtcIj5cbiAgICAgICAgICAgICAgICBMZXZlbDogPHNwYW4gaWQ9XCJsZXZlbFwiPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgICAgU2NvcmU6IDxzcGFuIGlkPVwic2NvcmVcIj48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICAgIENvbWJvOiA8c3BhbiBpZD1cImNvbWJvXCI+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgICBGaWd1cmVzIGZhbGxlbjogPHNwYW4gaWQ9XCJmaWd1cmVzX2ZhbGxlblwiPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgICAgTGluZXMgc3F1YXNoZWQ6IDxzcGFuIGlkPVwibGluZXNfc3F1YXNoZWRcIj48L3NwYW4+PGJyPlxuICAgICAgICAgICAgPC9kaXY+YCk7XG4gICAgICAgIHRoaXMucmVuZGVyU2V0dGluZ3MuY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNjb3JlRGlzcGxheSk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKFRhYmxlUmVuZGVyZXIuY3JlYXRlSHRtbEVsZW1lbnQoJzxkaXYgc3R5bGU9XCJjbGVhcjogYm90aFwiPjwvZGl2PicpKTtcblxuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5HYW1lT3ZlciwgdGhpcy5vbkdhbWVPdmVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GaWd1cmVzTW92ZWQsIHRoaXMub25GaWd1cmVzTW92ZWQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZpZ3VyZXNNb3ZlZChjb21tYW5kOiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyU3RhdGUoY29tbWFuZC5nYW1lRGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGNvbW1hbmQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJTdGF0ZShjb21tYW5kLmdhbWVEYXRhKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2FtZU92ZXIoY29tbWFuZDogR2FtZU92ZXJFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlclN0YXRlKGNvbW1hbmQuZ2FtZURhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyQ29tbWFuZEhhbmRsZXIoY29tbWFuZDogUmVuZGVyQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlclN0YXRlKGNvbW1hbmQuZ2FtZURhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyU3RhdGUoZ2FtZURhdGE6IEdhbWVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVwYWludE1hdHJpeENlbGxzKGdhbWVEYXRhLm1hdHJpeCwgbmV3IENvb3JkaW5hdGUoMCwgMCksIGdhbWVEYXRhKTtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyU2V0dGluZ3MucmVuZGVyUHJvamVjdGlvbkZpZ3VyZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRmFsbGluZ0ZpZ3VyZXNQcm9qZWN0aW9uKGdhbWVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlckZhbGxpbmdGaWd1cmVzKGdhbWVEYXRhKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTdGF0cyhnYW1lRGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJGYWxsaW5nRmlndXJlcyhnYW1lRGF0YTogR2FtZURhdGEpOiB2b2lkIHtcbiAgICAgICAgZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmYWxsaW5nRmlndXJlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVwYWludEZhbGxpbmdGaWd1cmVzQ2VsbHMoZmFsbGluZ0ZpZ3VyZSwgZ2FtZURhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckZhbGxpbmdGaWd1cmVzUHJvamVjdGlvbihnYW1lRGF0YTogR2FtZURhdGEpOiB2b2lkIHtcbiAgICAgICAgZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmYWxsaW5nRmlndXJlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpZ3VyZU1hdHJpeCA9IGZhbGxpbmdGaWd1cmUuZmlndXJlLmdldFR1cm4oZmFsbGluZ0ZpZ3VyZS50dXJuU3RhdGUpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdGlvbkZpZ3VyZVggPSBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLng7XG4gICAgICAgICAgICBsZXQgcHJvamVjdGlvbkZpZ3VyZVkgPSBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnk7XG4gICAgICAgICAgICB3aGlsZShGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChmaWd1cmVNYXRyaXgsIG5ldyBDb29yZGluYXRlKHByb2plY3Rpb25GaWd1cmVYLCBwcm9qZWN0aW9uRmlndXJlWSArIDEpLCBnYW1lRGF0YS5tYXRyaXgpKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdGlvbkZpZ3VyZVkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVwYWludFByb2plY3Rpb25GaWd1cmVzQ2VsbHMoXG4gICAgICAgICAgICAgICAgZmlndXJlTWF0cml4LFxuICAgICAgICAgICAgICAgIG5ldyBDb29yZGluYXRlKHByb2plY3Rpb25GaWd1cmVYLCBwcm9qZWN0aW9uRmlndXJlWSksXG4gICAgICAgICAgICAgICAgZ2FtZURhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVwYWludE1hdHJpeENlbGxzKG1hdHJpeDogYm9vbGVhbltdW10sIGluZGVudDogQ29vcmRpbmF0ZSwgZ2FtZURhdGE6IEdhbWVEYXRhKTogdm9pZCB7XG4gICAgICAgIGxldCBjb2xvcnM6IENlbGxDb2xvcnM7XG4gICAgICAgIGlmIChnYW1lRGF0YS5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICBjb2xvcnMgPSBuZXcgQ2VsbENvbG9ycyhcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNldHRpbmdzLm1hdHJpeENlbGxDb2xvcnMuZmlsbGVkR2FtZU92ZXIsXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5tYXRyaXhDZWxsQ29sb3JzLmVtcHR5LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9ycyA9IG5ldyBDZWxsQ29sb3JzKFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2V0dGluZ3MubWF0cml4Q2VsbENvbG9ycy5maWxsZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5tYXRyaXhDZWxsQ29sb3JzLmVtcHR5LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcGFpbnRDZWxscyhtYXRyaXgsIGluZGVudCwgY29sb3JzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGFpbnRGYWxsaW5nRmlndXJlc0NlbGxzKGZhbGxpbmdGaWd1cmU6IEZhbGxpbmdGaWd1cmUsIGdhbWVEYXRhOiBHYW1lRGF0YSk6IHZvaWQge1xuICAgICAgICBsZXQgY29sb3JzOiBDZWxsQ29sb3JzO1xuICAgICAgICBpZiAoZ2FtZURhdGEuaXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgY29sb3JzID0gbmV3IENlbGxDb2xvcnMoXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5mYWxsaW5nRmlndXJlQ2VsbENvbG9ycy5maWxsZWRHYW1lT3ZlcixcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNldHRpbmdzLmZhbGxpbmdGaWd1cmVDZWxsQ29sb3JzLmVtcHR5LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9ycyA9IG5ldyBDZWxsQ29sb3JzKFxuICAgICAgICAgICAgICAgIGZhbGxpbmdGaWd1cmUuY29sb3IgfHwgdGhpcy5yZW5kZXJTZXR0aW5ncy5mYWxsaW5nRmlndXJlQ2VsbENvbG9ycy5maWxsZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5mYWxsaW5nRmlndXJlQ2VsbENvbG9ycy5lbXB0eSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXBhaW50Q2VsbHMoXG4gICAgICAgICAgICBmYWxsaW5nRmlndXJlLmZpZ3VyZS5nZXRUdXJuKGZhbGxpbmdGaWd1cmUudHVyblN0YXRlKSxcbiAgICAgICAgICAgIGZhbGxpbmdGaWd1cmUucG9zaXRpb24sXG4gICAgICAgICAgICBjb2xvcnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGFpbnRQcm9qZWN0aW9uRmlndXJlc0NlbGxzKG1hdHJpeDogYm9vbGVhbltdW10sIGluZGVudDogQ29vcmRpbmF0ZSwgZ2FtZURhdGE6IEdhbWVEYXRhKTogdm9pZCB7XG4gICAgICAgIGxldCBjb2xvcnM6IENlbGxDb2xvcnM7XG4gICAgICAgIGlmIChnYW1lRGF0YS5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICBjb2xvcnMgPSBuZXcgQ2VsbENvbG9ycyhcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNldHRpbmdzLnByb2plY3Rpb25GaWd1cmVDZWxsQ29sb3JzLmZpbGxlZEdhbWVPdmVyLFxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2V0dGluZ3MucHJvamVjdGlvbkZpZ3VyZUNlbGxDb2xvcnMuZW1wdHksXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sb3JzID0gbmV3IENlbGxDb2xvcnMoXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5wcm9qZWN0aW9uRmlndXJlQ2VsbENvbG9ycy5maWxsZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXR0aW5ncy5wcm9qZWN0aW9uRmlndXJlQ2VsbENvbG9ycy5lbXB0eSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXBhaW50Q2VsbHMobWF0cml4LCBpbmRlbnQsIGNvbG9ycyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBhaW50Q2VsbHMobWF0cml4OiBib29sZWFuW11bXSwgaW5kZW50OiBDb29yZGluYXRlLCBjZWxsQ29sb3JzOiBDZWxsQ29sb3JzKTogdm9pZCB7XG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWx1ZSwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxZID0geSArIGluZGVudC55O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxYID0geCArIGluZGVudC54O1xuICAgICAgICAgICAgICAgIGlmIChyZWFsWSBpbiB0aGlzLmNlbGxzSHRtbEVsZW1lbnRzTWFwXG4gICAgICAgICAgICAgICAgICAgICYmIHJlYWxYIGluIHRoaXMuY2VsbHNIdG1sRWxlbWVudHNNYXBbcmVhbFldXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdmFsdWUgPyBjZWxsQ29sb3JzLmZpbGxlZCA6IGNlbGxDb2xvcnMuZW1wdHk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc0h0bWxFbGVtZW50c01hcFtyZWFsWV1bcmVhbFhdLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclN0YXRzKGdhbWVEYXRhOiBHYW1lRGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zdCBsZXZlbFNwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGV2ZWwnKTtcbiAgICAgICAgY29uc3Qgc2NvcmVTcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJyk7XG4gICAgICAgIGNvbnN0IGNvbWJvU3BhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21ibycpO1xuICAgICAgICBjb25zdCBmaWd1cmVzRmFsbGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZ3VyZXNfZmFsbGVuJyk7XG4gICAgICAgIGNvbnN0IGxpbmVzU3F1YXNoZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluZXNfc3F1YXNoZWQnKTtcbiAgICAgICAgaWYgKGxldmVsU3BhbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV2ZWxTcGFuLmlubmVySFRNTCA9IGdhbWVEYXRhLmxldmVsLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3JlU3BhbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2NvcmVTcGFuLmlubmVySFRNTCA9IGdhbWVEYXRhLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbWJvU3BhbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tYm9TcGFuLmlubmVySFRNTCA9IGdhbWVEYXRhLmNvbWJvLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZ3VyZXNGYWxsZW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZpZ3VyZXNGYWxsZW4uaW5uZXJIVE1MID0gZ2FtZURhdGEuc3RhdHMuZmlndXJlc0ZhbGxlbi50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lc1NxdWFzaGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsaW5lc1NxdWFzaGVkLmlubmVySFRNTCA9IGdhbWVEYXRhLnN0YXRzLmxpbmVzU3F1YXNoZWQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUh0bWxFbGVtZW50KGh0bWw6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPiAxIHx8IGNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgJ1RoZSBIVE1MIG11c3QgY29udGFpbiBvbmx5IG9uZSBjaGlsZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIGdldCBIVE1MRWxlbWVudCBjaGlsZCBmcm9tIGRpdic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0V2ZW50QnVzLCBFdmVudFR5cGUsIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnR9IGZyb20gXCIuLi9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzLCBDb21tYW5kVHlwZSwgSW5pdEdhbWVDb21tYW5kfSBmcm9tIFwiLi4vQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5cbmV4cG9ydCBjbGFzcyBGYWxsVGlja1Njb3JlQ291bnRlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgICAgIHByaXZhdGUgc3F1YXNoZWRSb3dzUmV3YXJkVGhyZXNob2xkc01hcDogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXAoW1xuICAgICAgICAgICAgWzEsIDEwMF0sXG4gICAgICAgICAgICBbMiwgMzAwXSxcbiAgICAgICAgICAgIFszLCA1MDBdLFxuICAgICAgICAgICAgWzQsIDgwMF0sXG4gICAgICAgIF0pLFxuICAgICAgICBwcml2YXRlIHJld2FyZE9uQ29tYm8gPSA1MCxcbiAgICApIHtcbiAgICAgICAgY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRHYW1lSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRHYW1lSGFuZGxlcihjb21tYW5kOiBJbml0R2FtZUNvbW1hbmQpIHtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQsIHRoaXMub25GYWxsaW5nVGlja1Byb2Nlc3NlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmFsbGluZ1RpY2tQcm9jZXNzZWQoZXZlbnQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnNxdWFzaGVkTGluZXMubGVuZ3RoIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByZXZpb3VzVGhyZXNob2xkUmV3YXJkID0gMDtcbiAgICAgICAgdGhpcy5zcXVhc2hlZFJvd3NSZXdhcmRUaHJlc2hvbGRzTWFwLmZvckVhY2goKHJld2FyZCwgcm93c1NxdWFzaGVkVGhyZXNob2xkKSA9PiB7XG4gICAgICAgICAgICBpZiAocm93c1NxdWFzaGVkVGhyZXNob2xkID4gZXZlbnQuc3F1YXNoZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91c1RocmVzaG9sZFJld2FyZCA9IHJld2FyZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmdhbWVEYXRhLnNjb3JlICs9XG4gICAgICAgICAgICBwcmV2aW91c1RocmVzaG9sZFJld2FyZCAqIGV2ZW50LmdhbWVEYXRhLmxldmVsXG4gICAgICAgICAgICArIHRoaXMucmV3YXJkT25Db21ibyAqIE1hdGgubWF4KDAsIGV2ZW50LmdhbWVEYXRhLmNvbWJvIC0gMSkgKiBldmVudC5nYW1lRGF0YS5sZXZlbFxuICAgICAgICAgICAgKyBldmVudC5kcm9wcGVkTGluZXMgKiAyICogZXZlbnQuZ2FtZURhdGEubGV2ZWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb21tYW5kQnVzLCBDb21tYW5kVHlwZSwgSW5pdEdhbWVDb21tYW5kfSBmcm9tIFwiLi4vQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5pbXBvcnQge0V2ZW50QnVzLCBFdmVudFR5cGUsIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnR9IGZyb20gXCIuLi9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuXG5leHBvcnQgY2xhc3MgU3RhdHNDb3VudGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICApIHtcbiAgICAgICAgY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRHYW1lSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRHYW1lSGFuZGxlcihjb21tYW5kOiBJbml0R2FtZUNvbW1hbmQpIHtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQsIHRoaXMub25GYWxsaW5nVGlja1Byb2Nlc3NlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmFsbGluZ1RpY2tQcm9jZXNzZWQoZXZlbnQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuZ2FtZURhdGEuc3RhdHMuZmlndXJlc0ZhbGxlbiArPSBldmVudC50cmFuc2ZlcnJlZFRvTWF0cml4RmlndXJlcy5sZW5ndGg7XG4gICAgICAgIGV2ZW50LmdhbWVEYXRhLnN0YXRzLmxpbmVzU3F1YXNoZWQgKz0gZXZlbnQuc3F1YXNoZWRMaW5lcy5sZW5ndGg7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtHYW1lQ29udHJvbGxlcn0gZnJvbSAnLi9HYW1lQ29udHJvbGxlcidcbmltcG9ydCB7VGFibGVSZW5kZXJlciwgVGFibGVSZW5kZXJlclNldHRpbmdzfSBmcm9tICcuL1JlbmRlcmVyL1RhYmxlUmVuZGVyZXInXG5pbXBvcnQge1JlZ3VsYXJGYWxsaW5nRmlndXJlc1Byb2Nlc3Nvcn0gZnJvbSBcIi4vRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3IvUmVndWxhckZhbGxpbmdGaWd1cmVzUHJvY2Vzc29yXCI7XG5pbXBvcnQge0Fsd2F5c09uZUZpZ3VyZVNwYXduZXJ9IGZyb20gXCIuL0ZpZ3VyZXNTcGF3bmVyL0Fsd2F5c09uZUZpZ3VyZVNwYXduZXJcIjtcbmltcG9ydCB7RXZlbnRCdXN9IGZyb20gXCIuL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIEluaXRHYW1lQ29tbWFuZCwgUGF1c2VHYW1lQ29tbWFuZCwgUmVzdW1lR2FtZUNvbW1hbmR9IGZyb20gXCIuL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtNb3ZpbmdIYW5kbGVyfSBmcm9tIFwiLi9Nb3ZpbmdIYW5kbGVyL01vdmluZ0hhbmRsZXJcIjtcbmltcG9ydCB7TGV2ZWxCYXNlZFRpbWluZ3NIYW5kbGVyfSBmcm9tIFwiLi9UaW1pbmdzSGFuZGxlci9MZXZlbEJhc2VkVGltaW5nc0hhbmRsZXJcIjtcbmltcG9ydCB7RmFsbFRpY2tTY29yZUNvdW50ZXJ9IGZyb20gXCIuL1Njb3JlQ291bnRlci9GYWxsVGlja1Njb3JlQ291bnRlclwiO1xuaW1wb3J0IHtTcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXJ9IGZyb20gXCIuL0xldmVsQ291bnRlci9TcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXJcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuL0NvbW1vblwiO1xuaW1wb3J0IHtDb21ib0NvdW50ZXJ9IGZyb20gXCIuL0NvbWJvQ291bnRlci9Db21ib0NvdW50ZXJcIjtcbmltcG9ydCB7Q29uc3RUaW1pbmdzSGFuZGxlcn0gZnJvbSBcIi4vVGltaW5nc0hhbmRsZXIvQ29uc3RUaW1pbmdzSGFuZGxlclwiO1xuaW1wb3J0IHtTdGF0c0NvdW50ZXJ9IGZyb20gXCIuL1N0YXRzQ291bnRlci9TdGF0c0NvdW50ZXJcIjtcbmltcG9ydCB7S2V5Ym9hcmRDb250cm9sbGVyfSBmcm9tIFwiLi9LZXlib2FyZENvbnRyb2xsZXIvS2V5Ym9hcmRDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXRyaXNGYWNhZGUge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cygpLFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXMgPSBuZXcgQ29tbWFuZEJ1cygpLFxuICAgICAgICBwcml2YXRlIGdhbWVDb250cm9sbGVyID0gbmV3IEdhbWVDb250cm9sbGVyKFxuICAgICAgICAgICAgLy8gbmV3IExldmVsQmFzZWRUaW1pbmdzSGFuZGxlcigyMDAwKSxcbiAgICAgICAgICAgIG5ldyBDb25zdFRpbWluZ3NIYW5kbGVyKDIwMDApLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICApLFxuICAgICAgICBwcml2YXRlIG1vdmluZ0hhbmRsZXIgPSBuZXcgTW92aW5nSGFuZGxlcihcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBrZXlib2FyZENvbnRyb2xsZXIgPSBuZXcgS2V5Ym9hcmRDb250cm9sbGVyKFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBmYWxsaW5nRmlndXJlc1Byb2Nlc3NvciA9IG5ldyBSZWd1bGFyRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3IoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXNcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVzU3Bhd25lciA9IG5ldyBBbHdheXNPbmVGaWd1cmVTcGF3bmVyKFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICApLFxuICAgICAgICBwcml2YXRlIGxldmVsQ291bnRlciA9IG5ldyBTcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXIoXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgMTUsXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgY29tYm9Db3VudGVyID0gbmV3IENvbWJvQ291bnRlcihcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBzY29yZUNvdW50ZXIgPSBuZXcgRmFsbFRpY2tTY29yZUNvdW50ZXIoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgc3RhdHNDb3VudGVyID0gbmV3IFN0YXRzQ291bnRlcihcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSB0YWJsZVJlbmRlcmVyID0gbmV3IFRhYmxlUmVuZGVyZXIoXG4gICAgICAgICAgICBuZXcgVGFibGVSZW5kZXJlclNldHRpbmdzKFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgICAgIGV2ZW50QnVzXG4gICAgICAgICksXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YSA9IEdhbWVEYXRhLm1ha2VTaW1wbGUoKSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgc3RhcnQoZ2FtZURhdGE/OiBHYW1lRGF0YSkge1xuICAgICAgICBnYW1lRGF0YSA9IGdhbWVEYXRhIHx8IEdhbWVEYXRhLm1ha2VTaW1wbGUoKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgSW5pdEdhbWVDb21tYW5kKGdhbWVEYXRhKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFJlc3VtZUdhbWVDb21tYW5kKGdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc3VtZSgpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgUmVzdW1lR2FtZUNvbW1hbmQodGhpcy5nYW1lRGF0YSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgUGF1c2VHYW1lQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtUaW1pbmdzSGFuZGxlcn0gZnJvbSBcIi4vVGltaW5nc0hhbmRsZXJcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIENvbnN0VGltaW5nc0hhbmRsZXIgaW1wbGVtZW50cyBUaW1pbmdzSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBkZWxheU1zOiBudW1iZXIsXG4gICAgKSB7fVxuXG4gICAgZ2V0RGVsYXlGb3JOZXh0VGlja01zKGdhbWVEYXRhOiBHYW1lRGF0YSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGF5TXM7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEVudW1IZWxwZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgVG9BcnJheSh2YWw6IGFueSk6IHR5cGVvZiB2YWxbXSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpXG4gICAgICAgICAgICAubWFwKG4gPT4gTnVtYmVyLnBhcnNlSW50KG4pKVxuICAgICAgICAgICAgLmZpbHRlcihuID0+ICFOdW1iZXIuaXNOYU4obikpIGFzIHVua25vd24gYXMgdHlwZW9mIHZhbFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgR2V0UmFuZG9tKHZhbDogYW55KTogdHlwZW9mIHZhbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IEVudW1IZWxwZXIuVG9BcnJheSh2YWwpO1xuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbHVlcy5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gdmFsdWVzW3JhbmRvbUluZGV4XTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0Nvb3JkaW5hdGV9IGZyb20gXCIuLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIEZpZ3VyZVBsYWNpbmdDaGVja2VyIHtcbiAgICBwdWJsaWMgc3RhdGljIGNhbkZpZ3VyZUJlUGxhY2VkKHRhcmdldEZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10sIHRhcmdldFBvc2l0aW9uOiBDb29yZGluYXRlLCBtYXRyaXg6IGJvb2xlYW5bXVtdKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0YXJnZXRGaWd1cmVNYXRyaXguZXZlcnkoKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5ldmVyeSgodmFsdWUsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsWSA9IHRhcmdldFBvc2l0aW9uLnkgKyB5O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxYID0gdGFyZ2V0UG9zaXRpb24ueCArIHg7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB8fCAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsWSA8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHJlYWxYID49IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHJlYWxYIDw9IG1hdHJpeFswXS5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICkgfHwgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhbFkgaW4gbWF0cml4XG4gICAgICAgICAgICAgICAgICAgICAgICAmJiByZWFsWCBpbiBtYXRyaXhbcmVhbFldXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAhbWF0cml4W3JlYWxZXVtyZWFsWF1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmV9IGZyb20gXCIuLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0ZpZ3VyZVR1cm5TdGF0ZX0gZnJvbSBcIi4uL1RldHJpcy9GaWd1cmVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlndXJlUGxhY2luZ1N0ZXAge1xuICAgIGdldCBwZXJzaXN0ZWQoKTogYm9vbGVhbixcbn1cblxuZXhwb3J0IGNsYXNzIFR1cm5QbGFjaW5nU3RlcCBpbXBsZW1lbnRzIEZpZ3VyZVBsYWNpbmdTdGVwe1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdGFyZ2V0OiBGaWd1cmVUdXJuU3RhdGUsXG4gICAgICAgIHByaXZhdGUgX3BlcnNpc3RlZDogYm9vbGVhbixcbiAgICApIHt9XG5cbiAgICBnZXQgcGVyc2lzdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVyc2lzdGVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVYUGxhY2luZ1N0ZXAgaW1wbGVtZW50cyBGaWd1cmVQbGFjaW5nU3RlcHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHRhcmdldDogbnVtYmVyLFxuICAgICAgICBwcml2YXRlIF9wZXJzaXN0ZWQ6IGJvb2xlYW4sXG4gICAgKSB7fVxuXG4gICAgZ2V0IHBlcnNpc3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BlcnNpc3RlZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZlWVBsYWNpbmdTdGVwIGltcGxlbWVudHMgRmlndXJlUGxhY2luZ1N0ZXB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0YXJnZXQ6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBnZXQgcGVyc2lzdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHJvcFBsYWNpbmdTdGVwIGltcGxlbWVudHMgRmlndXJlUGxhY2luZ1N0ZXB7XG4gICAgZ2V0IHBlcnNpc3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpZ3VyZVBsYWNpbmdSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZmlndXJlc1RhcmdldFN0YXRlczogTWFwPEZhbGxpbmdGaWd1cmUsIEZhbGxpbmdGaWd1cmU+LFxuICAgICAgICBwdWJsaWMgcGxhY2luZ1N0ZXBzOiBGaWd1cmVQbGFjaW5nU3RlcFtdLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIEhvbGUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgaXNPcGVuZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyBjZWxsczogQ29vcmRpbmF0ZVtdLFxuICAgICkge31cbn1cbiIsImltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0ZpZ3VyZVBsYWNpbmdSZXN1bHR9IGZyb20gXCIuLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIFBsYWNpbmdFcnJvciBleHRlbmRzIEVycm9yIHt9XG5leHBvcnQgY2xhc3MgR2FtZVN0YXRlTm90U3VwcG9ydGVkRXJyb3IgZXh0ZW5kcyBQbGFjaW5nRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBJbmNvbnNpc3RlbnRUYXJnZXRTdGF0ZUVycm9yIGV4dGVuZHMgUGxhY2luZ0Vycm9yIHt9XG5leHBvcnQgY2xhc3MgTm90U3VwcG9ydGVkRGlyZWN0aW9uU3RlcEVycm9yIGV4dGVuZHMgUGxhY2luZ0Vycm9yIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlndXJlUGxhY2luZ1BlcmZvcm1lckludGVyZmFjZSB7XG4gICAgLyoqXG4gICAgICogQHRocm93cyBQbGFjaW5nRXJyb3JcbiAgICAgKi9cbiAgICBwbGFjZShnYW1lRGF0YTogR2FtZURhdGEsIHBsYWNpbmdSZXN1bHQ/OiBGaWd1cmVQbGFjaW5nUmVzdWx0KTogdm9pZDtcbn1cbiIsImltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge1xuICAgIENvbW1hbmRCdXMsXG4gICAgRHJvcEZpZ3VyZXNDb21tYW5kLFxuICAgIE1vdmVEb3duQ29tbWFuZCxcbiAgICBNb3ZlTGVmdENvbW1hbmQsXG4gICAgTW92ZVJpZ2h0Q29tbWFuZCxcbiAgICBNb3ZlVG9YQ29tbWFuZCxcbiAgICBNb3ZlVG9ZQ29tbWFuZCxcbiAgICBUdXJuQ2xvY2t3aXNlQ29tbWFuZCxcbiAgICBUdXJuVG9TdGF0ZUNvbW1hbmRcbn0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RHJvcFBsYWNpbmdTdGVwLCBGaWd1cmVQbGFjaW5nUmVzdWx0LCBNb3ZlWFBsYWNpbmdTdGVwLCBNb3ZlWVBsYWNpbmdTdGVwLCBUdXJuUGxhY2luZ1N0ZXB9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ1BlcmZvcm1lckludGVyZmFjZSwgR2FtZVN0YXRlTm90U3VwcG9ydGVkRXJyb3IsIEluY29uc2lzdGVudFRhcmdldFN0YXRlRXJyb3IsIE5vdFN1cHBvcnRlZERpcmVjdGlvblN0ZXBFcnJvcn0gZnJvbSBcIi4vRmlndXJlUGxhY2luZ1BlcmZvcm1lckludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFudEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIgaW1wbGVtZW50cyBGaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICkge31cblxuICAgIHB1YmxpYyBwbGFjZShnYW1lRGF0YTogR2FtZURhdGEsIHBsYWNpbmdSZXN1bHQ/OiBGaWd1cmVQbGFjaW5nUmVzdWx0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHRoaXMucGxhY2VJbXBsKGdhbWVEYXRhLCBwbGFjaW5nUmVzdWx0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxhY2VJbXBsKGdhbWVEYXRhLCBwbGFjaW5nUmVzdWx0KSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYWNlSW1wbChnYW1lRGF0YTogR2FtZURhdGEsIHBsYWNpbmdSZXN1bHQ/OiBGaWd1cmVQbGFjaW5nUmVzdWx0KSB7XG4gICAgICAgIGlmIChnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR2FtZVN0YXRlTm90U3VwcG9ydGVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2luZ1Jlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWd1cmUgPSBnYW1lRGF0YS5mYWxsaW5nRmlndXJlc1swXTtcbiAgICAgICAgY29uc3QgdGFyZ2V0RmlndXJlID0gcGxhY2luZ1Jlc3VsdC5maWd1cmVzVGFyZ2V0U3RhdGVzLmdldChvcmlnaW5hbEZpZ3VyZSk7XG4gICAgICAgIGlmICghdGFyZ2V0RmlndXJlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luYWxGaWd1cmUuZmlndXJlICE9PSB0YXJnZXRGaWd1cmUuZmlndXJlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW5jb25zaXN0ZW50VGFyZ2V0U3RhdGVFcnJvcihcIkJvdGggb2YgdGhlIG9yaWdpbmFsIGFuZCB0aGUgdGFyZ2V0IGZhbGxpbmcgZmlndXJlcyBtdXN0IGhhdmUgdGhlIHNhbWUgZmlndXJlIGluIGl0LlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYWNpbmdSZXN1bHQucGxhY2luZ1N0ZXBzLmZvckVhY2goc3RlcCA9PiB7XG4gICAgICAgICAgICBpZiAoc3RlcCBpbnN0YW5jZW9mIFR1cm5QbGFjaW5nU3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFR1cm5Ub1N0YXRlQ29tbWFuZChnYW1lRGF0YSwgc3RlcC50YXJnZXQpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcCBpbnN0YW5jZW9mIE1vdmVYUGxhY2luZ1N0ZXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBNb3ZlVG9YQ29tbWFuZChnYW1lRGF0YSwgc3RlcC50YXJnZXQpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcCBpbnN0YW5jZW9mIE1vdmVZUGxhY2luZ1N0ZXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBNb3ZlVG9ZQ29tbWFuZChnYW1lRGF0YSwgc3RlcC50YXJnZXQpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcCBpbnN0YW5jZW9mIERyb3BQbGFjaW5nU3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IERyb3BGaWd1cmVzQ29tbWFuZChnYW1lRGF0YSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90U3VwcG9ydGVkRGlyZWN0aW9uU3RlcEVycm9yKFwiVW5rbm93biBzdGVwIFwiICsgc3RlcC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb29yZGluYXRlLCBGYWxsaW5nRmlndXJlLCBHYW1lRGF0YX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RW51bUhlbHBlcn0gZnJvbSBcIi4uLy4uL1RldHJpcy9VdGlscy9FbnVtSGVscGVyXCI7XG5pbXBvcnQge0ZpZ3VyZVR1cm5TdGF0ZX0gZnJvbSBcIi4uLy4uL1RldHJpcy9GaWd1cmVzXCI7XG5pbXBvcnQge0ZpZ3VyZVBsYWNpbmdDaGVja2VyfSBmcm9tIFwiLi4vLi4vVGV0cmlzL1V0aWxzL0ZpZ3VyZVBsYWNpbmdDaGVja2VyXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIFJlbmRlckNvbW1hbmR9IGZyb20gXCIuLi8uLi9UZXRyaXMvQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5pbXBvcnQge0Ryb3BQbGFjaW5nU3RlcCwgRmlndXJlUGxhY2luZ1Jlc3VsdCwgRmlndXJlUGxhY2luZ1N0ZXAsIE1vdmVYUGxhY2luZ1N0ZXAsIE1vdmVZUGxhY2luZ1N0ZXAsIFR1cm5QbGFjaW5nU3RlcH0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtDYWxjdWxhdG9yQWdncmVnYXRlfSBmcm9tIFwiLi4vU2NvcmVDYWxjdWxhdG9yL0NhbGN1bGF0b3JBZ2dyZWdhdGVcIjtcbmltcG9ydCB7SG9sZXNIZWxwZXJ9IGZyb20gXCIuLi9VdGlscy9Ib2xlc0hlbHBlclwiO1xuaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3R9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3IvU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlXCI7XG5cbmNsYXNzIFBsYWNlUmVzb2x2aW5nRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG5cbmNsYXNzIEdhbWVTdGF0ZU5vdFN1cHBvcnRlZEVycm9yIGV4dGVuZHMgUGxhY2VSZXNvbHZpbmdFcnJvciB7XG59XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmVQbGFjaW5nUmVzb2x2ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHByaXZhdGUgc2NvcmVDYWxjdWxhdG9yOiBDYWxjdWxhdG9yQWdncmVnYXRlLFxuICAgICkge31cblxuICAgIHB1YmxpYyByZXNvbHZlKGdhbWVEYXRhOiBHYW1lRGF0YSk6IEZpZ3VyZVBsYWNpbmdSZXN1bHR8dW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRmlndXJlID0gZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXNbMF07XG5cbiAgICAgICAgbGV0IG1heFNjb3JlID0gLUluZmluaXR5O1xuICAgICAgICBsZXQgdGhlQmVzdFJlc3VsdCA9IG5ldyBGaWd1cmVQbGFjaW5nUmVzdWx0KG5ldyBNYXAoKSwgW10pO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc1N0YXRlcyhnYW1lRGF0YSwgKGltYWdpbmFibGVGaWd1cmU6IEZhbGxpbmdGaWd1cmUsIHNjb3JlOiBudW1iZXIsIHBsYWNpbmdEaXJlY3Rpb25zOiBGaWd1cmVQbGFjaW5nU3RlcFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2NvcmUgPiBtYXhTY29yZSkge1xuICAgICAgICAgICAgICAgIG1heFNjb3JlID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgdGhlQmVzdFJlc3VsdCA9IG5ldyBGaWd1cmVQbGFjaW5nUmVzdWx0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgTWFwKFtbb3JpZ2luYWxGaWd1cmUsIGltYWdpbmFibGVGaWd1cmVdXSksXG4gICAgICAgICAgICAgICAgICAgIHBsYWNpbmdEaXJlY3Rpb25zXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvLyBsZXQgZGVidWdNb2RlID0gdHJ1ZTtcbiAgICAgICAgLypsZXQgZGVidWdNb2RlID0gJ2RlYnVnTW9kZScgaW4gd2luZG93ICYmIHdpbmRvdy5kZWJ1Z01vZGU7XG4gICAgICAgIGxldCBpbWFnaW5hYmxlRmlndXJlID0gdGhlQmVzdFJlc3VsdC5maWd1cmVzVGFyZ2V0U3RhdGVzLmdldChvcmlnaW5hbEZpZ3VyZSk7XG4gICAgICAgIGlmIChkZWJ1Z01vZGUgJiYgaW1hZ2luYWJsZUZpZ3VyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgZmFrZUdhbWVEYXRhID0gc3RydWN0dXJlZENsb25lKGdhbWVEYXRhKTtcbiAgICAgICAgICAgIGltYWdpbmFibGVGaWd1cmUuY29sb3IgPSAnI2YwMCc7XG4gICAgICAgICAgICBmYWtlR2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMgPSBbaW1hZ2luYWJsZUZpZ3VyZV07XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBSZW5kZXJDb21tYW5kKGZha2VHYW1lRGF0YSkpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTdGF0ZXMoZ2FtZURhdGEsIHVuZGVmaW5lZCwgKGltYWdpbmFibGVGaWd1cmU6IEZhbGxpbmdGaWd1cmUpID0+IHtcbiAgICAgICAgICAgICAgICBpbWFnaW5hYmxlRmlndXJlLmNvbG9yID0gJyMwMGYnO1xuICAgICAgICAgICAgICAgIGZha2VHYW1lRGF0YS5mYWxsaW5nRmlndXJlcyA9IFtpbWFnaW5hYmxlRmlndXJlXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBSZW5kZXJDb21tYW5kKGZha2VHYW1lRGF0YSkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSovXG5cbiAgICAgICAgcmV0dXJuIHRoZUJlc3RSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzU3RhdGVzKFxuICAgICAgICBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIG9uQWZ0ZXJTY29yZUNhbGN1bGF0ZXM/OiAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSwgc2NvcmU6IG51bWJlciwgcGxhY2luZ0RpcmVjdGlvbnM6IEZpZ3VyZVBsYWNpbmdTdGVwW10pID0+IHZvaWQsXG4gICAgICAgIG9uQmVmb3JlU2NvcmVDYWxjdWxhdGVzPzogKGltYWdpbmFibGVGaWd1cmU6IEZhbGxpbmdGaWd1cmUpID0+IHZvaWQsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRmlndXJlID0gZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXNbMF07XG5cbiAgICAgICAgbGV0IGVudW1zID0gRW51bUhlbHBlci5Ub0FycmF5KEZpZ3VyZVR1cm5TdGF0ZSk7XG4gICAgICAgIHdoaWxlIChlbnVtc1swXSAhPT0gb3JpZ2luYWxGaWd1cmUudHVyblN0YXRlKSB7XG4gICAgICAgICAgICBlbnVtcy51bnNoaWZ0KGVudW1zLnBvcCgpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0cmljZXM6IE1hcDxGaWd1cmVUdXJuU3RhdGUsIGJvb2xlYW5bXVtdPiA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IHN0cmluZ3lNYXRyaWNlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gICAgICAgIGVudW1zLmZvckVhY2godHVyblN0YXRlID0+IHtcbiAgICAgICAgICAgIGxldCBmaWd1cmVNYXRyaXggPSBvcmlnaW5hbEZpZ3VyZS5maWd1cmUuZ2V0VHVybih0dXJuU3RhdGUpO1xuICAgICAgICAgICAgbGV0IHN0cmluZ3lGaWd1cmVNYXRyaXggPSBmaWd1cmVNYXRyaXgubWFwKHJvdyA9PiByb3cubWFwKHZhbCA9PiB2YWwgPyBcIjFcIiA6IFwiMFwiKS5qb2luKCkpLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICBpZiAoIXN0cmluZ3lNYXRyaWNlcy5oYXMoc3RyaW5neUZpZ3VyZU1hdHJpeCkpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmd5TWF0cmljZXMuYWRkKHN0cmluZ3lGaWd1cmVNYXRyaXgpO1xuICAgICAgICAgICAgICAgIG1hdHJpY2VzLnNldCh0dXJuU3RhdGUsIGZpZ3VyZU1hdHJpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTWF0cml4SG9sZXMgPSBIb2xlc0hlbHBlci5jb2xsZWN0SG9sZXMoZ2FtZURhdGEubWF0cml4KTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucyA9IEhvbGVzSGVscGVyLmNvbGxlY3RDb3ZlcmVkQ29sdW1ucyhnYW1lRGF0YS5tYXRyaXgpO1xuXG4gICAgICAgIG1hdHJpY2VzLmZvckVhY2goKGZpZ3VyZU1hdHJpeCwgdHVyblN0YXRlKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGdhbWVEYXRhLnNldHRpbmdzLmZpZWxkV2lkdGggLSBmaWd1cmVNYXRyaXhbMF0ubGVuZ3RoICsgMTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IFt5LCBpbWFnaW5hYmxlTWF0cml4XSA9IHRoaXMuaW1hZ2luZUZpZ3VyZURyb3AoZ2FtZURhdGEubWF0cml4LCBmaWd1cmVNYXRyaXgsIHgpO1xuICAgICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoeCwgeSk7XG4gICAgICAgICAgICAgICAgbGV0IHNxdWFzaGVkTGluZXNDb3VudCA9IHRoaXMuc3F1YXNoTGluZXMoaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbGV0IGltYWdpbmFibGVGaWd1cmUgPSBuZXcgRmFsbGluZ0ZpZ3VyZShvcmlnaW5hbEZpZ3VyZS5maWd1cmUsIGNvb3JkaW5hdGUsIHR1cm5TdGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlU2NvcmVDYWxjdWxhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlU2NvcmVDYWxjdWxhdGVzKGltYWdpbmFibGVGaWd1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zID0gSG9sZXNIZWxwZXIuY29sbGVjdENvdmVyZWRDb2x1bW5zKGltYWdpbmFibGVNYXRyaXgpO1xuICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGVTY29yZVJlcXVlc3QgPSBuZXcgQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgICBnYW1lRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxNYXRyaXhIb2xlcyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZU1hdHJpeCxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICBzcXVhc2hlZExpbmVzQ291bnRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHRoaXMuc2NvcmVDYWxjdWxhdG9yLmNhbGN1bGF0ZVNjb3JlKGNhbGN1bGF0ZVNjb3JlUmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbnMgPSB0aGlzLm1ha2VTaW1wbGVQbGFjaW5nU3RlcHMoaW1hZ2luYWJsZUZpZ3VyZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9uQWZ0ZXJTY29yZUNhbGN1bGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgb25BZnRlclNjb3JlQ2FsY3VsYXRlcyhpbWFnaW5hYmxlRmlndXJlLCBzY29yZSwgZGlyZWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvcmlnaW5hbE1hdHJpeEhvbGVzLmZpbHRlcihob2xlID0+IGhvbGUuaXNPcGVuZWQgJiYgaG9sZS5jZWxscy5sZW5ndGggPiAwKS5mb3JFYWNoKGhvbGUgPT4ge1xuICAgICAgICAgICAgbGV0IHRvcFkgPSBnYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodCxcbiAgICAgICAgICAgICAgICBsZWZ0WCA9IGdhbWVEYXRhLnNldHRpbmdzLmZpZWxkV2lkdGgsXG4gICAgICAgICAgICAgICAgYm90dG9tWSA9IC0xLFxuICAgICAgICAgICAgICAgIHJpZ2h0WCA9IC0xO1xuICAgICAgICAgICAgaG9sZS5jZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgIHRvcFkgPSBNYXRoLm1pbih0b3BZLCBjZWxsLnkpO1xuICAgICAgICAgICAgICAgIGxlZnRYID0gTWF0aC5taW4obGVmdFgsIGNlbGwueCk7XG4gICAgICAgICAgICAgICAgYm90dG9tWSA9IE1hdGgubWF4KGJvdHRvbVksIGNlbGwueSk7XG4gICAgICAgICAgICAgICAgcmlnaHRYID0gTWF0aC5tYXgocmlnaHRYLCBjZWxsLngpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1hdHJpY2VzLmZvckVhY2goKGZpZ3VyZU1hdHJpeCwgdHVyblN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IE1hdGgubWF4KHRvcFkgLSBmaWd1cmVNYXRyaXgubGVuZ3RoICsgMSwgMCk7IHkgPD0gYm90dG9tWTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBNYXRoLm1heChsZWZ0WCAtIGZpZ3VyZU1hdHJpeFswXS5sZW5ndGggKyAxLCAwKTsgeCA8PSByaWdodFg7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWFnaW5hYmxlRmlndXJlID0gbmV3IEZhbGxpbmdGaWd1cmUob3JpZ2luYWxGaWd1cmUuZmlndXJlLCBjb29yZGluYXRlLCB0dXJuU3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlU2NvcmVDYWxjdWxhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVTY29yZUNhbGN1bGF0ZXMoaW1hZ2luYWJsZUZpZ3VyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoZmlndXJlTWF0cml4LCBjb29yZGluYXRlLCBnYW1lRGF0YS5tYXRyaXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbnMgPSB0aGlzLm1ha2VQdXNoSW5QbGFjaW5nU3RlcHMoZ2FtZURhdGEsIGltYWdpbmFibGVGaWd1cmUsIG9yaWdpbmFsQ292ZXJlZENvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdpbmFibGVNYXRyaXggPSB0aGlzLmltYWdpbmVGaWd1cmVQbGFjaW5nKGdhbWVEYXRhLm1hdHJpeCwgZmlndXJlTWF0cml4LCBjb29yZGluYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNxdWFzaGVkTGluZXNDb3VudCA9IHRoaXMuc3F1YXNoTGluZXMoaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMgPSBIb2xlc0hlbHBlci5jb2xsZWN0Q292ZXJlZENvbHVtbnMoaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYWxjdWxhdGVTY29yZVJlcXVlc3QgPSBuZXcgQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE1hdHJpeEhvbGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdpbmFibGVNYXRyaXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhc2hlZExpbmVzQ291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5zY29yZUNhbGN1bGF0b3IuY2FsY3VsYXRlU2NvcmUoY2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQWZ0ZXJTY29yZUNhbGN1bGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQWZ0ZXJTY29yZUNhbGN1bGF0ZXMoaW1hZ2luYWJsZUZpZ3VyZSwgc2NvcmUsIGRpcmVjdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3F1YXNoTGluZXMobWF0cml4OiBib29sZWFuW11bXSk6IG51bWJlciB7XG4gICAgICAgIGxldCBsaW5lc1RvU3F1YXNoOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICBsZXQgY2FuQmVTcXVhc2hlZCA9IHJvdy5ldmVyeShjZWxsID0+IGNlbGwpO1xuICAgICAgICAgICAgaWYgKGNhbkJlU3F1YXNoZWQpIHtcbiAgICAgICAgICAgICAgICBsaW5lc1RvU3F1YXNoLnB1c2goeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgICBsaW5lc1RvU3F1YXNoLmZvckVhY2goeSA9PiB7XG4gICAgICAgICAgICBtYXRyaXguc3BsaWNlKHksIDEpO1xuICAgICAgICAgICAgbWF0cml4LnVuc2hpZnQobmV3IEFycmF5KG1hdHJpeFswXS5sZW5ndGgpLmZpbGwoZmFsc2UpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaW5lc1RvU3F1YXNoLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGltYWdpbmVGaWd1cmVEcm9wKGdhbWVNYXRyaXg6IGJvb2xlYW5bXVtdLCBmaWd1cmVNYXRyaXg6IGJvb2xlYW5bXVtdLCB0YXJnZXRYOiBudW1iZXIpOiBbbnVtYmVyLCBib29sZWFuW11bXV0ge1xuICAgICAgICBsZXQgdGFyZ2V0WSA9IC1maWd1cmVNYXRyaXgubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoZmlndXJlTWF0cml4LCBuZXcgQ29vcmRpbmF0ZSh0YXJnZXRYLCB0YXJnZXRZICsgMSksIGdhbWVNYXRyaXgpKSB7XG4gICAgICAgICAgICB0YXJnZXRZKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRhcmdldFksXG4gICAgICAgICAgICB0aGlzLmltYWdpbmVGaWd1cmVQbGFjaW5nKGdhbWVNYXRyaXgsIGZpZ3VyZU1hdHJpeCwgbmV3IENvb3JkaW5hdGUodGFyZ2V0WCwgdGFyZ2V0WSkpLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW1hZ2luZUZpZ3VyZVBsYWNpbmcoZ2FtZU1hdHJpeDogYm9vbGVhbltdW10sIGZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10sIHRhcmdldENvb3JkaW5hdGU6IENvb3JkaW5hdGUpOiBib29sZWFuW11bXSB7XG4gICAgICAgIGxldCBpbWFnaW5hYmxlTWF0cml4OiBib29sZWFuW11bXSA9IHN0cnVjdHVyZWRDbG9uZShnYW1lTWF0cml4KTtcbiAgICAgICAgZmlndXJlTWF0cml4LmZvckVhY2goKHJvdywgZmlndXJlWSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgZmlndXJlWCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxZID0gdGFyZ2V0Q29vcmRpbmF0ZS55ICsgZmlndXJlWTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsWCA9IHRhcmdldENvb3JkaW5hdGUueCArIGZpZ3VyZVg7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWxZIGluIGltYWdpbmFibGVNYXRyaXhcbiAgICAgICAgICAgICAgICAgICAgJiYgcmVhbFggaW4gaW1hZ2luYWJsZU1hdHJpeFtyZWFsWV1cbiAgICAgICAgICAgICAgICAgICAgJiYgdmFsXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdpbmFibGVNYXRyaXhbcmVhbFldW3JlYWxYXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbWFnaW5hYmxlTWF0cml4O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZVB1c2hJblBsYWNpbmdTdGVwcyhnYW1lRGF0YTogR2FtZURhdGEsIGltYWdpbmFibGVGaWd1cmU6IEZhbGxpbmdGaWd1cmUsIG9yaWdpbmFsQ292ZXJlZENvbHVtbnM6IE1hcDxudW1iZXIsIG51bWJlcj4pOiBGaWd1cmVQbGFjaW5nU3RlcFtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IGZpZ3VyZU1hdHJpeCA9IGltYWdpbmFibGVGaWd1cmUuZmlndXJlLmdldFR1cm4oaW1hZ2luYWJsZUZpZ3VyZS50dXJuU3RhdGUpO1xuICAgICAgICBsZXQgdGFyZ2V0WCA9IEhvbGVzSGVscGVyLmZpbmRUaGVXYXlPdXRGcm9tSG9sZShnYW1lRGF0YS5tYXRyaXgsIGltYWdpbmFibGVGaWd1cmUucG9zaXRpb24sIG9yaWdpbmFsQ292ZXJlZENvbHVtbnMsIGZpZ3VyZU1hdHJpeCk7XG4gICAgICAgIGlmICh0YXJnZXRYID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgbmV3IFR1cm5QbGFjaW5nU3RlcChpbWFnaW5hYmxlRmlndXJlLnR1cm5TdGF0ZSwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgTW92ZVhQbGFjaW5nU3RlcCh0YXJnZXRYLCBmYWxzZSksXG4gICAgICAgICAgICBuZXcgTW92ZVlQbGFjaW5nU3RlcChpbWFnaW5hYmxlRmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgbmV3IE1vdmVYUGxhY2luZ1N0ZXAoaW1hZ2luYWJsZUZpZ3VyZS5wb3NpdGlvbi54LCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBEcm9wUGxhY2luZ1N0ZXAoKSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1ha2VTaW1wbGVQbGFjaW5nU3RlcHMoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSk6IEZpZ3VyZVBsYWNpbmdTdGVwW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgbmV3IFR1cm5QbGFjaW5nU3RlcChpbWFnaW5hYmxlRmlndXJlLnR1cm5TdGF0ZSwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgTW92ZVhQbGFjaW5nU3RlcChpbWFnaW5hYmxlRmlndXJlLnBvc2l0aW9uLngsIHRydWUpLFxuICAgICAgICAgICAgbmV3IERyb3BQbGFjaW5nU3RlcCgpLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRvckFnZ3JlZ2F0ZSBpbXBsZW1lbnRzIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2FsY3VsYXRvcnM6IFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZVtdXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0b3JzLnJlZHVjZSgoc2NvcmUsIGNhbGN1bGF0b3IpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzY29yZSArIGNhbGN1bGF0b3IuY2FsY3VsYXRlU2NvcmUocmVxdWVzdCk7XG4gICAgICAgIH0sIDApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi8uLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0hvbGV9IGZyb20gXCIuLi8uLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIEZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBmaWVsZEhlaWdodCA9IHJlcXVlc3QuZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGZpZWxkV2lkdGggPSByZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkV2lkdGg7XG4gICAgICAgIGNvbnN0IFtmaWxsYWJsZUNlbGxzQ291bnQsIGZpbGxhYmxlSGVpZ2h0XSA9IHRoaXMuY2FsY3VsYXRlRmlsbGFibGVTcGFjZShyZXF1ZXN0LmltYWdpbmFibGVNYXRyaXgsIGZpZWxkV2lkdGgpO1xuICAgICAgICBsZXQgZmlsbGFibGVDZWxsc1Njb3JlID0gMDtcbiAgICAgICAgaWYgKGZpbGxhYmxlSGVpZ2h0ID4gNSkge1xuICAgICAgICAgICAgZmlsbGFibGVDZWxsc1Njb3JlID0gLWZpbGxhYmxlQ2VsbHNDb3VudCAqIE1hdGgucG93KGZpbGxhYmxlQ2VsbHNDb3VudCwgZmlsbGFibGVDZWxsc0NvdW50IC8gKGZpZWxkSGVpZ2h0ICogZmllbGRXaWR0aCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxsYWJsZUNlbGxzU2NvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGaWxsYWJsZVNwYWNlKG1hdHJpeDogYm9vbGVhbltdW10sIGZpZWxkV2lkdGg6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgY292ZXJlZENvbHVtbnMgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICAgICAgbGV0IGZpbGxhYmxlQ2VsbHNDb3VudCA9IDA7XG4gICAgICAgIGxldCBmaWxsYWJsZUhlaWdodCA9IDA7XG4gICAgICAgIG1hdHJpeC5ldmVyeShyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnMuYWRkKHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdmFsICYmIGNvdmVyZWRDb2x1bW5zLnNpemUgPiAwICYmICFjb3ZlcmVkQ29sdW1ucy5oYXMoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbGFibGVDZWxsc0NvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMuc2l6ZSA8IGZpZWxkV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbGFibGVIZWlnaHQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW2ZpbGxhYmxlQ2VsbHNDb3VudCwgZmlsbGFibGVIZWlnaHRdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi8uLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0hvbGV9IGZyb20gXCIuLi8uLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIEZpbGxlZEhlaWdodENhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIHB1YmxpYyBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodChyZXF1ZXN0LmltYWdpbmFibGVNYXRyaXgpO1xuICAgICAgICByZXR1cm4gLWhlaWdodCAqIE1hdGgucG93KGhlaWdodCwgaGVpZ2h0IC8gcmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodCkgKiAzO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KG1hdHJpeDogYm9vbGVhbltdW10pOiBudW1iZXIge1xuICAgICAgICBsZXQgbG93ZXN0RW1wdHlZID0gLTE7XG4gICAgICAgIG1hdHJpeC5ldmVyeSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICBpZiAocm93LmV2ZXJ5KHZhbCA9PiAhdmFsKSkge1xuICAgICAgICAgICAgICAgIGxvd2VzdEVtcHR5WSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXRyaXgubGVuZ3RoIC0gbG93ZXN0RW1wdHlZIC0gMTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NhbGN1bGF0ZVNjb3JlUmVxdWVzdCwgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlfSBmcm9tIFwiLi4vU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBIb2xlc1YxQ2FsY3VsYXRvciBpbXBsZW1lbnRzIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZSB7XG4gICAgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgW2hvbGVzQ291bnQsIGhvbGVzQ292ZXJlZEhlaWdodF0gPSB0aGlzLmNhbGN1bGF0ZUhvbGVzQW5kQ292ZXJlZEhlaWdodChyZXF1ZXN0LmltYWdpbmFibGVNYXRyaXgsIHJlcXVlc3QuZ2FtZURhdGEubWF0cml4KTtcbiAgICAgICAgY29uc3QgaG9sZXNDb3VudERlY3JlYXNlID0gcmVxdWVzdC5vcmlnaW5hbEhvbGVzLmxlbmd0aCAtIGhvbGVzQ291bnQ7XG4gICAgICAgIGxldCBob2xlc1Njb3JlOiBudW1iZXI7XG4gICAgICAgIGlmIChob2xlc0NvdmVyZWRIZWlnaHQgPT09IDAgfHwgaG9sZXNDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgaG9sZXNTY29yZSA9IChob2xlc0NvdW50RGVjcmVhc2UgPiAwID8gaG9sZXNDb3VudERlY3JlYXNlICogMTUwIDogaG9sZXNDb3VudERlY3JlYXNlICogNzApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9sZXNTY29yZSA9IChob2xlc0NvdW50RGVjcmVhc2UgPiAwID8gaG9sZXNDb3VudERlY3JlYXNlICogMTUwIDogaG9sZXNDb3VudERlY3JlYXNlICogNzApXG4gICAgICAgICAgICAgICAgLSBob2xlc0NvdmVyZWRIZWlnaHQgKiBNYXRoLnBvdyhob2xlc0NvdmVyZWRIZWlnaHQsIGhvbGVzQ292ZXJlZEhlaWdodCAvIChyZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0ICogaG9sZXNDb3VudCkpICogNTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaG9sZXNTY29yZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUhvbGVzQW5kQ292ZXJlZEhlaWdodChpbWFnaW5hYmxlTWF0cml4OiBib29sZWFuW11bXSwgcmVhbE1hdHJpeDogYm9vbGVhbltdW10pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgY29uc3QgW29yaWdpbmFsVGhlSGlnaGVzdEhvbGVZLCBvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlQ292ZXJlZFldID0gdGhpcy5jYWxjdWxhdGVUaGVIaWdoZXN0SG9sZUNvdmVyZWRZKHJlYWxNYXRyaXgpO1xuICAgICAgICBsZXQgY292ZXJlZENvbHVtbnNZcyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+O1xuICAgICAgICBsZXQgaG9sZXNDb3ZlcmVkSGVpZ2h0c1N1bSA9IDA7XG4gICAgICAgIGxldCBob2xlc0NvdW50ID0gMDtcbiAgICAgICAgaW1hZ2luYWJsZU1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICFjb3ZlcmVkQ29sdW1uc1lzLmhhcyh4KSkge1xuICAgICAgICAgICAgICAgICAgICBjb3ZlcmVkQ29sdW1uc1lzLnNldCh4LCB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNvdmVyZWRZID0gY292ZXJlZENvbHVtbnNZcy5nZXQoeCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyZWRZICE9PSB1bmRlZmluZWQgJiYgIXZhbCkge1xuICAgICAgICAgICAgICAgICAgICBob2xlc0NvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlWSAhPT0gdW5kZWZpbmVkICYmIG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA8IG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZXNDb3ZlcmVkSGVpZ2h0c1N1bSArPSB5IC0gY292ZXJlZFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdmVyZWRZIDwgb3JpZ2luYWxUaGVIaWdoZXN0SG9sZUNvdmVyZWRZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZXNDb3ZlcmVkSGVpZ2h0c1N1bSArPSBvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkgLSBjb3ZlcmVkWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFtob2xlc0NvdW50LCBob2xlc0NvdmVyZWRIZWlnaHRzU3VtXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkobWF0cml4OiBib29sZWFuW11bXSk6IFtudW1iZXJ8dW5kZWZpbmVkLCBudW1iZXJ8dW5kZWZpbmVkXSB7XG4gICAgICAgIGxldCB0aGVIaWdoZXN0SG9sZUNvdmVyZWRZID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdGhlSGlnaGVzdEhvbGVZID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgY292ZXJlZENvbHVtbnNZcyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+O1xuICAgICAgICBtYXRyaXguc29tZSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcm93LnNvbWUoKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgIWNvdmVyZWRDb2x1bW5zWXMuaGFzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdmVyZWRDb2x1bW5zWXMuc2V0KHgsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY292ZXJlZFkgPSBjb3ZlcmVkQ29sdW1uc1lzLmdldCh4KTtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZFkgIT09IHVuZGVmaW5lZCAmJiAhdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZUhpZ2hlc3RIb2xlWSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkgPSBjb3ZlcmVkWTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFt0aGVIaWdoZXN0SG9sZVksIHRoZUhpZ2hlc3RIb2xlQ292ZXJlZFldO1xuICAgIH1cbn1cbiIsImltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0hvbGV9IGZyb20gXCIuLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIENhbGN1bGF0ZVNjb3JlUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyBvcmlnaW5hbEhvbGVzOiBIb2xlW10sXG4gICAgICAgIHB1YmxpYyBvcmlnaW5hbENvdmVyZWRDb2x1bW5zOiBNYXA8bnVtYmVyLCBudW1iZXI+LFxuICAgICAgICBwdWJsaWMgaW1hZ2luYWJsZU1hdHJpeDogYm9vbGVhbltdW10sXG4gICAgICAgIHB1YmxpYyBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnM6IE1hcDxudW1iZXIsIG51bWJlcj4sXG4gICAgICAgIHB1YmxpYyBzcXVhc2hlZExpbmVzQ291bnQ6IG51bWJlcixcbiAgICApIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXI7XG59XG4iLCJpbXBvcnQge0NhbGN1bGF0ZVNjb3JlUmVxdWVzdCwgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlfSBmcm9tIFwiLi4vU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBTcXVhc2hlZFJvd3NDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcmVxdWVzdC5zcXVhc2hlZExpbmVzQ291bnQgKiA1O1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi8uLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0hvbGV9IGZyb20gXCIuLi8uLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIFR1bm5lbHNDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBbdHVubmVsc1N1bUhlaWdodCwgdHVubmVsc0NvdW50XSA9IHRoaXMuY2FsY3VsYXRlVHVubmVsc0V4Y2VwdFVuY292ZXJlZChyZXF1ZXN0LmltYWdpbmFibGVNYXRyaXgsIHJlcXVlc3QuZ2FtZURhdGEubWF0cml4KTtcbiAgICAgICAgbGV0IHR1bm5lbHNTY29yZTogbnVtYmVyO1xuICAgICAgICBpZiAodHVubmVsc0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0dW5uZWxzU2NvcmUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHVubmVsc1Njb3JlID0gLXR1bm5lbHNDb3VudCAqIDcwXG4gICAgICAgICAgICAgICAgLSB0dW5uZWxzU3VtSGVpZ2h0ICogTWF0aC5wb3codHVubmVsc1N1bUhlaWdodCwgdHVubmVsc1N1bUhlaWdodCAvIChyZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0ICogdHVubmVsc0NvdW50KSkgKiA3O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0dW5uZWxzU2NvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVUdW5uZWxzRXhjZXB0VW5jb3ZlcmVkKGltYWdpbmFibGVNYXRyaXg6IGJvb2xlYW5bXVtdLCByZWFsTWF0cml4OiBib29sZWFuW11bXSk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgcmVhbENvdmVyZWRDb2x1bW5zID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgICAgIHJlYWxNYXRyaXguZXZlcnkoKHJvdykgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhbENvdmVyZWRDb2x1bW5zLmFkZCh4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICBsZXQgdHVubmVscyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+O1xuICAgICAgICBjb25zdCBmaWVsZFdpZHRoID0gaW1hZ2luYWJsZU1hdHJpeFswXS5sZW5ndGg7XG4gICAgICAgIGltYWdpbmFibGVNYXRyaXguZXZlcnkoKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLmFkZCh4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbFxuICAgICAgICAgICAgICAgICAgICAmJiAhaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLmhhcyh4KVxuICAgICAgICAgICAgICAgICAgICAmJiAhcmVhbENvdmVyZWRDb2x1bW5zLmhhcyh4KVxuICAgICAgICAgICAgICAgICAgICAmJiAoeCA9PT0gMCB8fCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMuaGFzKHggLSAxKSlcbiAgICAgICAgICAgICAgICAgICAgJiYgKHggPT09IGZpZWxkV2lkdGggLSAxIHx8IGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5oYXMoeCArIDEpKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0dW5uZWxzLnNldCh4LCAodHVubmVscy5nZXQoeCkgfHwgMCkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMuc2l6ZSA8IGZpZWxkV2lkdGg7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgdHVubmVsc1N1bUhlaWdodCA9IDA7XG4gICAgICAgIGxldCB0dW5uZWxzQ291bnQgPSAwO1xuICAgICAgICB0dW5uZWxzLmZvckVhY2goaGVpZ2h0ID0+IHtcbiAgICAgICAgICAgIGlmIChoZWlnaHQgPj0gMykge1xuICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHR1bm5lbHNDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFt0dW5uZWxzU3VtSGVpZ2h0LCB0dW5uZWxzQ291bnRdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmlndXJlc1NwYXduZWRFdmVudH0gZnJvbSBcIi4uL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzLCBDb21tYW5kVHlwZSwgSW5pdEdhbWVDb21tYW5kfSBmcm9tIFwiLi4vVGV0cmlzL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUmVzb2x2ZXJ9IGZyb20gXCIuL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlci9GaWd1cmVQbGFjaW5nUmVzb2x2ZXJcIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ1BlcmZvcm1lckludGVyZmFjZX0gZnJvbSBcIi4vRmlndXJlUGxhY2luZ1BlcmZvcm1lci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXRyaXNTb2x2ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGZpZ3VyZVBsYWNpbmdSZXNvbHZlcjogRmlndXJlUGxhY2luZ1Jlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGZpZ3VyZVBsYWNpbmdQZXJmb3JtZXI6IEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRHYW1lSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRHYW1lSGFuZGxlcihjb21tYW5kOiBJbml0R2FtZUNvbW1hbmQpIHtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihFdmVudFR5cGUuRmlndXJlc1NwYXduZWQsIHRoaXMub25GaWd1cmVzU3Bhd25lZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmlndXJlc1NwYXduZWQoZXZlbnQ6IEZpZ3VyZXNTcGF3bmVkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RmFsbGluZ0ZpZ3VyZXNTdGF0ZXMgPSB0aGlzLmZpZ3VyZVBsYWNpbmdSZXNvbHZlci5yZXNvbHZlKGV2ZW50LmdhbWVEYXRhKTtcbiAgICAgICAgdGhpcy5maWd1cmVQbGFjaW5nUGVyZm9ybWVyLnBsYWNlKGV2ZW50LmdhbWVEYXRhLCB0YXJnZXRGYWxsaW5nRmlndXJlc1N0YXRlcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudEJ1c30gZnJvbSBcIi4uL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzfSBmcm9tIFwiLi4vVGV0cmlzL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUmVzb2x2ZXJ9IGZyb20gXCIuL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlci9GaWd1cmVQbGFjaW5nUmVzb2x2ZXJcIjtcbmltcG9ydCB7QW5pbWF0ZWRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyfSBmcm9tIFwiLi9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0FuaW1hdGVkRmlndXJlUGxhY2luZ1BlcmZvcm1lclwiO1xuaW1wb3J0IHtDYWxjdWxhdG9yQWdncmVnYXRlfSBmcm9tIFwiLi9TY29yZUNhbGN1bGF0b3IvQ2FsY3VsYXRvckFnZ3JlZ2F0ZVwiO1xuaW1wb3J0IHtTcXVhc2hlZFJvd3NDYWxjdWxhdG9yfSBmcm9tIFwiLi9TY29yZUNhbGN1bGF0b3IvU3F1YXNoZWRSb3dzL1NxdWFzaGVkUm93c0NhbGN1bGF0b3JcIjtcbmltcG9ydCB7RmlsbGFibGVDZWxsc0NhbGN1bGF0b3J9IGZyb20gXCIuL1Njb3JlQ2FsY3VsYXRvci9GaWxsYWJsZUNlbGxzL0ZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yXCI7XG5pbXBvcnQge0hvbGVzVjFDYWxjdWxhdG9yfSBmcm9tIFwiLi9TY29yZUNhbGN1bGF0b3IvSG9sZXMvSG9sZXNWMUNhbGN1bGF0b3JcIjtcbmltcG9ydCB7SG9sZXNWMkNhbGN1bGF0b3J9IGZyb20gXCIuL1Njb3JlQ2FsY3VsYXRvci9Ib2xlcy9Ib2xlc1YyQ2FsY3VsYXRvclwiO1xuaW1wb3J0IHtGaWxsZWRIZWlnaHRDYWxjdWxhdG9yfSBmcm9tIFwiLi9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3JcIjtcbmltcG9ydCB7VHVubmVsc0NhbGN1bGF0b3J9IGZyb20gXCIuL1Njb3JlQ2FsY3VsYXRvci9UdW5uZWxzL1R1bm5lbHNDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1RldHJpc1NvbHZlcn0gZnJvbSBcIi4vVGV0cmlzU29sdmVyXCI7XG5pbXBvcnQge0xldmVsQmFzZWRUaW1pbmdzSGFuZGxlcn0gZnJvbSBcIi4uL1RldHJpcy9UaW1pbmdzSGFuZGxlci9MZXZlbEJhc2VkVGltaW5nc0hhbmRsZXJcIjtcbmltcG9ydCB7SW5zdGFudEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJ9IGZyb20gXCIuL0ZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIvSW5zdGFudEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJcIjtcblxuZXhwb3J0IGNsYXNzIFRldHJpc1NvbHZlckZhY2FkZSB7XG4gICAgc3RhdGljIGluaXRTb2x2ZXIoXG4gICAgICAgIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXRyaXNTb2x2ZXIoXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBuZXcgRmlndXJlUGxhY2luZ1Jlc29sdmVyKFxuICAgICAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICAgICAgbmV3IENhbGN1bGF0b3JBZ2dyZWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZpbGxlZEhlaWdodENhbGN1bGF0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEhvbGVzVjFDYWxjdWxhdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBTcXVhc2hlZFJvd3NDYWxjdWxhdG9yKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUdW5uZWxzQ2FsY3VsYXRvcigpLFxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC8vIG5ldyBBbmltYXRlZEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIoXG4gICAgICAgICAgICAvLyAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgICAgIC8vICAgICBuZXcgTGV2ZWxCYXNlZFRpbWluZ3NIYW5kbGVyKDEwMCwgMC45KSxcbiAgICAgICAgICAgIC8vICksXG4gICAgICAgICAgICBuZXcgSW5zdGFudEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIoY29tbWFuZEJ1cyksXG4gICAgICAgIClcbiAgICB9XG59XG4iLCJpbXBvcnQge0hvbGV9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7Q29vcmRpbmF0ZX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi8uLi9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXJcIjtcblxuZXhwb3J0IGNsYXNzIEhvbGVzSGVscGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIGNvbGxlY3RIb2xlcyhtYXRyaXg6IGJvb2xlYW5bXVtdKTogSG9sZVtdIHtcbiAgICAgICAgbGV0IGhvbGVzOiBIb2xlW10gPSBbXTtcblxuICAgICAgICBjbGFzcyBIb2xlSW5Qcm9jZXNzIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjZWxsczogQ29vcmRpbmF0ZVtdID0gW10sXG4gICAgICAgICAgICAgICAgcHVibGljIHByZXZpb3VzUm93T3BlblhzOiBudW1iZXJbXSA9IFtdLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjdXJyZW50Um93T3BlblhzOiBudW1iZXJbXSA9IFtdLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjb250aW51ZXM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhvbGVzSW5Qcm9jZXNzOiBIb2xlSW5Qcm9jZXNzW10gPSBbXTtcbiAgICAgICAgbGV0IGNvdmVyZWRDb2x1bW5zOiBTZXQ8bnVtYmVyPiA9IG5ldyBTZXQoKTtcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgaG9sZXNJblByb2Nlc3MuZm9yRWFjaChob2xlID0+IGhvbGUuY29udGludWVzID0gZmFsc2UpO1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnMuYWRkKHgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY292ZXJlZENvbHVtbnMuaGFzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzaW5nSG9sZSA9IGhvbGVzSW5Qcm9jZXNzLmZpbmQoaG9sZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9sZS5wcmV2aW91c1Jvd09wZW5Ycy5zb21lKHByZXZYID0+IHByZXZYID09PSB4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChob2xlLmN1cnJlbnRSb3dPcGVuWHMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBob2xlLmN1cnJlbnRSb3dPcGVuWHNbaG9sZS5jdXJyZW50Um93T3BlblhzLmxlbmd0aCAtIDFdID09PSB4KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzaW5nSG9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZSA9IG5ldyBIb2xlSW5Qcm9jZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBob2xlc0luUHJvY2Vzcy5wdXNoKHByb2Nlc3NpbmdIb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5jdXJyZW50Um93T3BlblhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdIb2xlLmNlbGxzLnB1c2gobmV3IENvb3JkaW5hdGUoeCwgeSkpO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5jb250aW51ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5pc09wZW5lZCA9IHByb2Nlc3NpbmdIb2xlLmlzT3BlbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLmRvZXNUaGVXYXlPdXRGcm9tSG9sZUV4aXN0cyhtYXRyaXgsIG5ldyBDb29yZGluYXRlKHgsIHkpLCBjb3ZlcmVkQ29sdW1ucywgW1t0cnVlLCB0cnVlXV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGhvbGVzSW5Qcm9ncmVzc1RvUmVtb3ZlOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgaG9sZXNJblByb2Nlc3MuZm9yRWFjaCgoaG9sZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChob2xlLmNvbnRpbnVlcykge1xuICAgICAgICAgICAgICAgICAgICBob2xlLnByZXZpb3VzUm93T3BlblhzID0gaG9sZS5jdXJyZW50Um93T3BlblhzO1xuICAgICAgICAgICAgICAgICAgICBob2xlLmN1cnJlbnRSb3dPcGVuWHMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFob2xlLmNvbnRpbnVlcyB8fCB5ID09IG1hdHJpeC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbGVzLnB1c2gobmV3IEhvbGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBob2xlLmlzT3BlbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZS5jZWxscyxcbiAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIGhvbGVzSW5Qcm9ncmVzc1RvUmVtb3ZlLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBob2xlc0luUHJvZ3Jlc3NUb1JlbW92ZS5yZXZlcnNlKCkuZm9yRWFjaChpID0+IGhvbGVzSW5Qcm9jZXNzLnNwbGljZShpLCAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaG9sZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkb2VzVGhlV2F5T3V0RnJvbUhvbGVFeGlzdHMobWF0cml4OiBib29sZWFuW11bXSwgaW5pdGlhbENvb3JkaW5hdGU6IENvb3JkaW5hdGUsIGNvdmVyZWRDb2x1bW5zOiBTZXQ8bnVtYmVyPiwgZmlndXJlTWF0cml4OiBib29sZWFuW11bXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kVGhlV2F5T3V0RnJvbUhvbGUobWF0cml4LCBpbml0aWFsQ29vcmRpbmF0ZSwgY292ZXJlZENvbHVtbnMsIGZpZ3VyZU1hdHJpeCkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbmRUaGVXYXlPdXRGcm9tSG9sZShtYXRyaXg6IGJvb2xlYW5bXVtdLCBpbml0aWFsQ29vcmRpbmF0ZTogQ29vcmRpbmF0ZSwgY292ZXJlZENvbHVtbnM6IFNldDxudW1iZXI+fE1hcDxudW1iZXIsIG51bWJlcj4sIGZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIGNvdmVyZWRDb2x1bW5zID0gSG9sZXNIZWxwZXIuY29udmVydENvdmVyZWRDb2x1bW5zVG9Ycyhjb3ZlcmVkQ29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHJ5aW5nIHRvIGZpbmQgdGhlIHdheSBvdXQgZnJvbSB0aGUgbGVmdCBzaWRlXG4gICAgICAgIGxldCB0YXJnZXRYQ2FuZGlkYXRlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAobGV0IHggPSBpbml0aWFsQ29vcmRpbmF0ZS54IC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgICAgIGlmICghRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoZmlndXJlTWF0cml4LCBuZXcgQ29vcmRpbmF0ZSh4LCBpbml0aWFsQ29vcmRpbmF0ZS55KSwgbWF0cml4KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGFsbENvbHVtbnNGcmVlVG9GYWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNoZWNrRmFsbFggPSB4ICsgZmlndXJlTWF0cml4WzBdLmxlbmd0aCAtIDE7IGNoZWNrRmFsbFggPj0geDsgY2hlY2tGYWxsWC0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyZWRDb2x1bW5zLmhhcyhjaGVja0ZhbGxYKSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxDb2x1bW5zRnJlZVRvRmFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsQ29sdW1uc0ZyZWVUb0ZhbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyeWluZyB0byBmaW5kIHRoZSB3YXkgb3V0IGZyb20gdGhlIHJpZ2h0IHNpZGVcbiAgICAgICAgZm9yIChsZXQgeCA9IGluaXRpYWxDb29yZGluYXRlLnggKyAxOyB4IDwgbWF0cml4WzBdLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICBpZiAoIUZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKGZpZ3VyZU1hdHJpeCwgbmV3IENvb3JkaW5hdGUoeCwgaW5pdGlhbENvb3JkaW5hdGUueSksIG1hdHJpeCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBhbGxDb2x1bW5zRnJlZVRvRmFsbCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGVja0ZhbGxYID0geDsgY2hlY2tGYWxsWCA8IHggKyBmaWd1cmVNYXRyaXhbMF0ubGVuZ3RoOyBjaGVja0ZhbGxYKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMuaGFzKGNoZWNrRmFsbFgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbENvbHVtbnNGcmVlVG9GYWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxDb2x1bW5zRnJlZVRvRmFsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbGxlY3RDb3ZlcmVkQ29sdW1uc1hzKG1hdHJpeDogYm9vbGVhbltdW10sIHRvWT86IG51bWJlcik6IFNldDxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIEhvbGVzSGVscGVyLmNvbnZlcnRDb3ZlcmVkQ29sdW1uc1RvWHMoXG4gICAgICAgICAgICBIb2xlc0hlbHBlci5jb2xsZWN0Q292ZXJlZENvbHVtbnMobWF0cml4LCB0b1kpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvdmVyZWRDb2x1bW5zVG9Ycyhjb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPik6IFNldDxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQoWy4uLmNvdmVyZWRDb2x1bW5zLmtleXMoKV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDQv9GDIHg6IHlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbGxlY3RDb3ZlcmVkQ29sdW1ucyhtYXRyaXg6IGJvb2xlYW5bXVtdLCB0b1k/OiBudW1iZXIpOiBNYXA8bnVtYmVyLCBudW1iZXI+IHtcbiAgICAgICAgbGV0IGNvdmVyZWRDb2x1bW5zOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgICAgICBtYXRyaXguc29tZSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb3ZlcmVkQ29sdW1ucy5zZXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKHRvWSAhPT0gdW5kZWZpbmVkICYmIHkgPj0gdG9ZKVxuICAgICAgICAgICAgICAgIHx8IGNvdmVyZWRDb2x1bW5zLnNpemUgPT0gbWF0cml4WzBdLmxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3ZlcmVkQ29sdW1ucztcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7RXZlbnRCdXN9IGZyb20gXCIuL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzfSBmcm9tIFwiLi9UZXRyaXMvQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5pbXBvcnQge1RldHJpc0ZhY2FkZX0gZnJvbSAnLi9UZXRyaXMvVGV0cmlzRmFjYWRlJ1xuaW1wb3J0IHtUZXRyaXNTb2x2ZXJGYWNhZGV9IGZyb20gXCIuL1RldHJpc1NvbHZlci9UZXRyaXNTb2x2ZXJGYWNhZGVcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cygpO1xuICAgIGNvbnN0IGNvbW1hbmRCdXMgPSBuZXcgQ29tbWFuZEJ1cygpO1xuICAgIGxldCB0ZXRyaXMgPSBuZXcgVGV0cmlzRmFjYWRlKGV2ZW50QnVzLCBjb21tYW5kQnVzKTtcbiAgICBUZXRyaXNTb2x2ZXJGYWNhZGUuaW5pdFNvbHZlcihldmVudEJ1cywgY29tbWFuZEJ1cyk7XG5cbiAgICB0ZXRyaXMuc3RhcnQoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9