/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Tetris/ComboCounter/ComboCounter.ts":
/*!*************************************************!*\
  !*** ./src/Tetris/ComboCounter/ComboCounter.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter.ts":
/*!*************************************************************************!*\
  !*** ./src/Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ "./src/Tetris/ScoreCounter/FallTickScoreCounter.ts":
/*!*********************************************************!*\
  !*** ./src/Tetris/ScoreCounter/FallTickScoreCounter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ "./src/Tetris/TimingsHandler/ConstTimingsHandler.ts":
/*!**********************************************************!*\
  !*** ./src/Tetris/TimingsHandler/ConstTimingsHandler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/TetrisSolver/Utils/HolesHelper.ts":
/*!***********************************************!*\
  !*** ./src/TetrisSolver/Utils/HolesHelper.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ "./src/TetrisSolvingBench/BenchSolverFacade.ts":
/*!*****************************************************!*\
  !*** ./src/TetrisSolvingBench/BenchSolverFacade.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BenchSolverFacade": () => (/* binding */ BenchSolverFacade)
/* harmony export */ });
/* harmony import */ var _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Tetris/EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tetris/CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");
/* harmony import */ var _Tetris_GameController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tetris/GameController */ "./src/Tetris/GameController.ts");
/* harmony import */ var _Tetris_MovingHandler_MovingHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tetris/MovingHandler/MovingHandler */ "./src/Tetris/MovingHandler/MovingHandler.ts");
/* harmony import */ var _Tetris_FiguresSpawner_AlwaysOneFigureSpawner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Tetris/FiguresSpawner/AlwaysOneFigureSpawner */ "./src/Tetris/FiguresSpawner/AlwaysOneFigureSpawner.ts");
/* harmony import */ var _Tetris_LevelCounter_SquashedRowsCounterBasedLevelCounter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter */ "./src/Tetris/LevelCounter/SquashedRowsCounterBasedLevelCounter.ts");
/* harmony import */ var _Tetris_ComboCounter_ComboCounter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Tetris/ComboCounter/ComboCounter */ "./src/Tetris/ComboCounter/ComboCounter.ts");
/* harmony import */ var _Tetris_ScoreCounter_FallTickScoreCounter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Tetris/ScoreCounter/FallTickScoreCounter */ "./src/Tetris/ScoreCounter/FallTickScoreCounter.ts");
/* harmony import */ var _Tetris_StatsCounter_StatsCounter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Tetris/StatsCounter/StatsCounter */ "./src/Tetris/StatsCounter/StatsCounter.ts");
/* harmony import */ var _Tetris_Common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Tetris/Common */ "./src/Tetris/Common.ts");
/* harmony import */ var _Tetris_TimingsHandler_ConstTimingsHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Tetris/TimingsHandler/ConstTimingsHandler */ "./src/Tetris/TimingsHandler/ConstTimingsHandler.ts");
/* harmony import */ var _TetrisSolver_TetrisSolver__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../TetrisSolver/TetrisSolver */ "./src/TetrisSolver/TetrisSolver.ts");
/* harmony import */ var _TetrisSolver_FigurePlacingResolver_FigurePlacingResolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../TetrisSolver/FigurePlacingResolver/FigurePlacingResolver */ "./src/TetrisSolver/FigurePlacingResolver/FigurePlacingResolver.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_CalculatorAggregate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/CalculatorAggregate */ "./src/TetrisSolver/ScoreCalculator/CalculatorAggregate.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator */ "./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator */ "./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator */ "./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator */ "./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator */ "./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts");
/* harmony import */ var _TetrisSolver_FigurePlacingPerformer_InstantFigurePlacingPerformer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer */ "./src/TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer.ts");
/* harmony import */ var _Tetris_FallingFiguresProcessor_RegularFallingFiguresProcessor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor */ "./src/Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor.ts");





















class BenchSolverFacade {
    eventBus;
    commandBus;
    gameController;
    movingHandler;
    fallingFiguresProcessor;
    figuresSpawner;
    levelCounter;
    comboCounter;
    scoreCounter;
    statsCounter;
    gameData;
    tetrisSolver;
    constructor(eventBus = new _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventBus(), commandBus = new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandBus(), gameController = new _Tetris_GameController__WEBPACK_IMPORTED_MODULE_2__.GameController(new _Tetris_TimingsHandler_ConstTimingsHandler__WEBPACK_IMPORTED_MODULE_10__.ConstTimingsHandler(Infinity), eventBus, commandBus), movingHandler = new _Tetris_MovingHandler_MovingHandler__WEBPACK_IMPORTED_MODULE_3__.MovingHandler(commandBus, eventBus), fallingFiguresProcessor = new _Tetris_FallingFiguresProcessor_RegularFallingFiguresProcessor__WEBPACK_IMPORTED_MODULE_20__.RegularFallingFiguresProcessor(commandBus, eventBus), figuresSpawner = new _Tetris_FiguresSpawner_AlwaysOneFigureSpawner__WEBPACK_IMPORTED_MODULE_4__.AlwaysOneFigureSpawner(eventBus, commandBus), levelCounter = new _Tetris_LevelCounter_SquashedRowsCounterBasedLevelCounter__WEBPACK_IMPORTED_MODULE_5__.SquashedRowsCounterBasedLevelCounter(eventBus, commandBus, 8, 15), comboCounter = new _Tetris_ComboCounter_ComboCounter__WEBPACK_IMPORTED_MODULE_6__.ComboCounter(commandBus, eventBus), scoreCounter = new _Tetris_ScoreCounter_FallTickScoreCounter__WEBPACK_IMPORTED_MODULE_7__.FallTickScoreCounter(commandBus, eventBus), statsCounter = new _Tetris_StatsCounter_StatsCounter__WEBPACK_IMPORTED_MODULE_8__.StatsCounter(commandBus, eventBus), gameData = _Tetris_Common__WEBPACK_IMPORTED_MODULE_9__.GameData.makeSimple(), tetrisSolver = new _TetrisSolver_TetrisSolver__WEBPACK_IMPORTED_MODULE_11__.TetrisSolver(eventBus, commandBus, new _TetrisSolver_FigurePlacingResolver_FigurePlacingResolver__WEBPACK_IMPORTED_MODULE_12__.FigurePlacingResolver(commandBus, new _TetrisSolver_ScoreCalculator_CalculatorAggregate__WEBPACK_IMPORTED_MODULE_13__.CalculatorAggregate([
        new _TetrisSolver_ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_14__.FillableCellsCalculator(),
        new _TetrisSolver_ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_15__.FilledHeightCalculator(),
        new _TetrisSolver_ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_16__.HolesV1Calculator(),
        new _TetrisSolver_ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_17__.SquashedRowsCalculator(),
        new _TetrisSolver_ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_18__.TunnelsCalculator(),
    ])), new _TetrisSolver_FigurePlacingPerformer_InstantFigurePlacingPerformer__WEBPACK_IMPORTED_MODULE_19__.InstantFigurePlacingPerformer(commandBus))) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.gameController = gameController;
        this.movingHandler = movingHandler;
        this.fallingFiguresProcessor = fallingFiguresProcessor;
        this.figuresSpawner = figuresSpawner;
        this.levelCounter = levelCounter;
        this.comboCounter = comboCounter;
        this.scoreCounter = scoreCounter;
        this.statsCounter = statsCounter;
        this.gameData = gameData;
        this.tetrisSolver = tetrisSolver;
    }
    start(gameData) {
        this.gameData = gameData || _Tetris_Common__WEBPACK_IMPORTED_MODULE_9__.GameData.makeSimple();
        this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.InitGameCommand(this.gameData));
        this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.ResumeGameCommand(this.gameData));
    }
    pause() {
        this.commandBus.run(new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.PauseGameCommand(this.gameData));
    }
}


/***/ }),

/***/ "./node_modules/workerpool/dist/workerpool.js":
/*!****************************************************!*\
  !*** ./node_modules/workerpool/dist/workerpool.js ***!
  \****************************************************/
/***/ (function(module) {

var __dirname = "/";
/**
 * workerpool.js
 * https://github.com/josdejong/workerpool
 *
 * Offload tasks to a pool of workers on node.js and in the browser.
 *
 * @version 6.3.1
 * @date    2022-11-07
 *
 * @license
 * Copyright (C) 2014-2022 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 345:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_1386__) {

var Promise = __nested_webpack_require_1386__(219);
var WorkerHandler = __nested_webpack_require_1386__(751);
var environment = __nested_webpack_require_1386__(828);
var DebugPortAllocator = __nested_webpack_require_1386__(833);
var DEBUG_PORT_ALLOCATOR = new DebugPortAllocator();
/**
 * A pool to manage workers
 * @param {String} [script]   Optional worker script
 * @param {WorkerPoolOptions} [options]  See docs
 * @constructor
 */
function Pool(script, options) {
  if (typeof script === 'string') {
    this.script = script || null;
  } else {
    this.script = null;
    options = script;
  }
  this.workers = []; // queue with all workers
  this.tasks = []; // queue with tasks awaiting execution

  options = options || {};
  this.forkArgs = Object.freeze(options.forkArgs || []);
  this.forkOpts = Object.freeze(options.forkOpts || {});
  this.workerThreadOpts = Object.freeze(options.workerThreadOpts || {});
  this.debugPortStart = options.debugPortStart || 43210;
  this.nodeWorker = options.nodeWorker;
  this.workerType = options.workerType || options.nodeWorker || 'auto';
  this.maxQueueSize = options.maxQueueSize || Infinity;
  this.onCreateWorker = options.onCreateWorker || function () {
    return null;
  };
  this.onTerminateWorker = options.onTerminateWorker || function () {
    return null;
  };

  // configuration
  if (options && 'maxWorkers' in options) {
    validateMaxWorkers(options.maxWorkers);
    this.maxWorkers = options.maxWorkers;
  } else {
    this.maxWorkers = Math.max((environment.cpus || 4) - 1, 1);
  }
  if (options && 'minWorkers' in options) {
    if (options.minWorkers === 'max') {
      this.minWorkers = this.maxWorkers;
    } else {
      validateMinWorkers(options.minWorkers);
      this.minWorkers = options.minWorkers;
      this.maxWorkers = Math.max(this.minWorkers, this.maxWorkers); // in case minWorkers is higher than maxWorkers
    }

    this._ensureMinWorkers();
  }
  this._boundNext = this._next.bind(this);
  if (this.workerType === 'thread') {
    WorkerHandler.ensureWorkerThreads();
  }
}

/**
 * Execute a function on a worker.
 *
 * Example usage:
 *
 *   var pool = new Pool()
 *
 *   // call a function available on the worker
 *   pool.exec('fibonacci', [6])
 *
 *   // offload a function
 *   function add(a, b) {
 *     return a + b
 *   };
 *   pool.exec(add, [2, 4])
 *       .then(function (result) {
 *         console.log(result); // outputs 6
 *       })
 *       .catch(function(error) {
 *         console.log(error);
 *       });
 *
 * @param {String | Function} method  Function name or function.
 *                                    If `method` is a string, the corresponding
 *                                    method on the worker will be executed
 *                                    If `method` is a Function, the function
 *                                    will be stringified and executed via the
 *                                    workers built-in function `run(fn, args)`.
 * @param {Array} [params]  Function arguments applied when calling the function
 * @param {ExecOptions} [options]  Options object
 * @return {Promise.<*, Error>} result
 */
Pool.prototype.exec = function (method, params, options) {
  // validate type of arguments
  if (params && !Array.isArray(params)) {
    throw new TypeError('Array expected as argument "params"');
  }
  if (typeof method === 'string') {
    var resolver = Promise.defer();
    if (this.tasks.length >= this.maxQueueSize) {
      throw new Error('Max queue size of ' + this.maxQueueSize + ' reached');
    }

    // add a new task to the queue
    var tasks = this.tasks;
    var task = {
      method: method,
      params: params,
      resolver: resolver,
      timeout: null,
      options: options
    };
    tasks.push(task);

    // replace the timeout method of the Promise with our own,
    // which starts the timer as soon as the task is actually started
    var originalTimeout = resolver.promise.timeout;
    resolver.promise.timeout = function timeout(delay) {
      if (tasks.indexOf(task) !== -1) {
        // task is still queued -> start the timer later on
        task.timeout = delay;
        return resolver.promise;
      } else {
        // task is already being executed -> start timer immediately
        return originalTimeout.call(resolver.promise, delay);
      }
    };

    // trigger task execution
    this._next();
    return resolver.promise;
  } else if (typeof method === 'function') {
    // send stringified function and function arguments to worker
    return this.exec('run', [String(method), params]);
  } else {
    throw new TypeError('Function or string expected as argument "method"');
  }
};

/**
 * Create a proxy for current worker. Returns an object containing all
 * methods available on the worker. The methods always return a promise.
 *
 * @return {Promise.<Object, Error>} proxy
 */
Pool.prototype.proxy = function () {
  if (arguments.length > 0) {
    throw new Error('No arguments expected');
  }
  var pool = this;
  return this.exec('methods').then(function (methods) {
    var proxy = {};
    methods.forEach(function (method) {
      proxy[method] = function () {
        return pool.exec(method, Array.prototype.slice.call(arguments));
      };
    });
    return proxy;
  });
};

/**
 * Creates new array with the results of calling a provided callback function
 * on every element in this array.
 * @param {Array} array
 * @param {function} callback  Function taking two arguments:
 *                             `callback(currentValue, index)`
 * @return {Promise.<Array>} Returns a promise which resolves  with an Array
 *                           containing the results of the callback function
 *                           executed for each of the array elements.
 */
/* TODO: implement map
Pool.prototype.map = function (array, callback) {
};
*/

/**
 * Grab the first task from the queue, find a free worker, and assign the
 * worker to the task.
 * @protected
 */
Pool.prototype._next = function () {
  if (this.tasks.length > 0) {
    // there are tasks in the queue

    // find an available worker
    var worker = this._getWorker();
    if (worker) {
      // get the first task from the queue
      var me = this;
      var task = this.tasks.shift();

      // check if the task is still pending (and not cancelled -> promise rejected)
      if (task.resolver.promise.pending) {
        // send the request to the worker
        var promise = worker.exec(task.method, task.params, task.resolver, task.options).then(me._boundNext)["catch"](function () {
          // if the worker crashed and terminated, remove it from the pool
          if (worker.terminated) {
            return me._removeWorker(worker);
          }
        }).then(function () {
          me._next(); // trigger next task in the queue
        });

        // start queued timer now
        if (typeof task.timeout === 'number') {
          promise.timeout(task.timeout);
        }
      } else {
        // The task taken was already complete (either rejected or resolved), so just trigger next task in the queue
        me._next();
      }
    }
  }
};

/**
 * Get an available worker. If no worker is available and the maximum number
 * of workers isn't yet reached, a new worker will be created and returned.
 * If no worker is available and the maximum number of workers is reached,
 * null will be returned.
 *
 * @return {WorkerHandler | null} worker
 * @private
 */
Pool.prototype._getWorker = function () {
  // find a non-busy worker
  var workers = this.workers;
  for (var i = 0; i < workers.length; i++) {
    var worker = workers[i];
    if (worker.busy() === false) {
      return worker;
    }
  }
  if (workers.length < this.maxWorkers) {
    // create a new worker
    worker = this._createWorkerHandler();
    workers.push(worker);
    return worker;
  }
  return null;
};

/**
 * Remove a worker from the pool.
 * Attempts to terminate worker if not already terminated, and ensures the minimum
 * pool size is met.
 * @param {WorkerHandler} worker
 * @return {Promise<WorkerHandler>}
 * @protected
 */
Pool.prototype._removeWorker = function (worker) {
  var me = this;
  DEBUG_PORT_ALLOCATOR.releasePort(worker.debugPort);
  // _removeWorker will call this, but we need it to be removed synchronously
  this._removeWorkerFromList(worker);
  // If minWorkers set, spin up new workers to replace the crashed ones
  this._ensureMinWorkers();
  // terminate the worker (if not already terminated)
  return new Promise(function (resolve, reject) {
    worker.terminate(false, function (err) {
      me.onTerminateWorker({
        forkArgs: worker.forkArgs,
        forkOpts: worker.forkOpts,
        script: worker.script
      });
      if (err) {
        reject(err);
      } else {
        resolve(worker);
      }
    });
  });
};

/**
 * Remove a worker from the pool list.
 * @param {WorkerHandler} worker
 * @protected
 */
Pool.prototype._removeWorkerFromList = function (worker) {
  // remove from the list with workers
  var index = this.workers.indexOf(worker);
  if (index !== -1) {
    this.workers.splice(index, 1);
  }
};

/**
 * Close all active workers. Tasks currently being executed will be finished first.
 * @param {boolean} [force=false]   If false (default), the workers are terminated
 *                                  after finishing all tasks currently in
 *                                  progress. If true, the workers will be
 *                                  terminated immediately.
 * @param {number} [timeout]        If provided and non-zero, worker termination promise will be rejected
 *                                  after timeout if worker process has not been terminated.
 * @return {Promise.<void, Error>}
 */
Pool.prototype.terminate = function (force, timeout) {
  var me = this;

  // cancel any pending tasks
  this.tasks.forEach(function (task) {
    task.resolver.reject(new Error('Pool terminated'));
  });
  this.tasks.length = 0;
  var f = function f(worker) {
    DEBUG_PORT_ALLOCATOR.releasePort(worker.debugPort);
    this._removeWorkerFromList(worker);
  };
  var removeWorker = f.bind(this);
  var promises = [];
  var workers = this.workers.slice();
  workers.forEach(function (worker) {
    var termPromise = worker.terminateAndNotify(force, timeout).then(removeWorker).always(function () {
      me.onTerminateWorker({
        forkArgs: worker.forkArgs,
        forkOpts: worker.forkOpts,
        script: worker.script
      });
    });
    promises.push(termPromise);
  });
  return Promise.all(promises);
};

/**
 * Retrieve statistics on tasks and workers.
 * @return {{totalWorkers: number, busyWorkers: number, idleWorkers: number, pendingTasks: number, activeTasks: number}} Returns an object with statistics
 */
Pool.prototype.stats = function () {
  var totalWorkers = this.workers.length;
  var busyWorkers = this.workers.filter(function (worker) {
    return worker.busy();
  }).length;
  return {
    totalWorkers: totalWorkers,
    busyWorkers: busyWorkers,
    idleWorkers: totalWorkers - busyWorkers,
    pendingTasks: this.tasks.length,
    activeTasks: busyWorkers
  };
};

/**
 * Ensures that a minimum of minWorkers is up and running
 * @protected
 */
Pool.prototype._ensureMinWorkers = function () {
  if (this.minWorkers) {
    for (var i = this.workers.length; i < this.minWorkers; i++) {
      this.workers.push(this._createWorkerHandler());
    }
  }
};

/**
 * Helper function to create a new WorkerHandler and pass all options.
 * @return {WorkerHandler}
 * @private
 */
Pool.prototype._createWorkerHandler = function () {
  var overridenParams = this.onCreateWorker({
    forkArgs: this.forkArgs,
    forkOpts: this.forkOpts,
    workerThreadOpts: this.workerThreadOpts,
    script: this.script
  }) || {};
  return new WorkerHandler(overridenParams.script || this.script, {
    forkArgs: overridenParams.forkArgs || this.forkArgs,
    forkOpts: overridenParams.forkOpts || this.forkOpts,
    workerThreadOpts: overridenParams.workerThreadOpts || this.workerThreadOpts,
    debugPort: DEBUG_PORT_ALLOCATOR.nextAvailableStartingAt(this.debugPortStart),
    workerType: this.workerType
  });
};

/**
 * Ensure that the maxWorkers option is an integer >= 1
 * @param {*} maxWorkers
 * @returns {boolean} returns true maxWorkers has a valid value
 */
function validateMaxWorkers(maxWorkers) {
  if (!isNumber(maxWorkers) || !isInteger(maxWorkers) || maxWorkers < 1) {
    throw new TypeError('Option maxWorkers must be an integer number >= 1');
  }
}

/**
 * Ensure that the minWorkers option is an integer >= 0
 * @param {*} minWorkers
 * @returns {boolean} returns true when minWorkers has a valid value
 */
function validateMinWorkers(minWorkers) {
  if (!isNumber(minWorkers) || !isInteger(minWorkers) || minWorkers < 0) {
    throw new TypeError('Option minWorkers must be an integer number >= 0');
  }
}

/**
 * Test whether a variable is a number
 * @param {*} value
 * @returns {boolean} returns true when value is a number
 */
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Test whether a number is an integer
 * @param {number} value
 * @returns {boolean} Returns true if value is an integer
 */
function isInteger(value) {
  return Math.round(value) == value;
}
module.exports = Pool;

/***/ }),

/***/ 219:
/***/ (function(module) {

"use strict";


/**
 * Promise
 *
 * Inspired by https://gist.github.com/RubaXa/8501359 from RubaXa <trash@rubaxa.org>
 *
 * @param {Function} handler   Called as handler(resolve: Function, reject: Function)
 * @param {Promise} [parent]   Parent promise for propagation of cancel and timeout
 */
function Promise(handler, parent) {
  var me = this;
  if (!(this instanceof Promise)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }
  if (typeof handler !== 'function') {
    throw new SyntaxError('Function parameter handler(resolve, reject) missing');
  }
  var _onSuccess = [];
  var _onFail = [];

  // status
  this.resolved = false;
  this.rejected = false;
  this.pending = true;

  /**
   * Process onSuccess and onFail callbacks: add them to the queue.
   * Once the promise is resolve, the function _promise is replace.
   * @param {Function} onSuccess
   * @param {Function} onFail
   * @private
   */
  var _process = function _process(onSuccess, onFail) {
    _onSuccess.push(onSuccess);
    _onFail.push(onFail);
  };

  /**
   * Add an onSuccess callback and optionally an onFail callback to the Promise
   * @param {Function} onSuccess
   * @param {Function} [onFail]
   * @returns {Promise} promise
   */
  this.then = function (onSuccess, onFail) {
    return new Promise(function (resolve, reject) {
      var s = onSuccess ? _then(onSuccess, resolve, reject) : resolve;
      var f = onFail ? _then(onFail, resolve, reject) : reject;
      _process(s, f);
    }, me);
  };

  /**
   * Resolve the promise
   * @param {*} result
   * @type {Function}
   */
  var _resolve2 = function _resolve(result) {
    // update status
    me.resolved = true;
    me.rejected = false;
    me.pending = false;
    _onSuccess.forEach(function (fn) {
      fn(result);
    });
    _process = function _process(onSuccess, onFail) {
      onSuccess(result);
    };
    _resolve2 = _reject2 = function _reject() {};
    return me;
  };

  /**
   * Reject the promise
   * @param {Error} error
   * @type {Function}
   */
  var _reject2 = function _reject(error) {
    // update status
    me.resolved = false;
    me.rejected = true;
    me.pending = false;
    _onFail.forEach(function (fn) {
      fn(error);
    });
    _process = function _process(onSuccess, onFail) {
      onFail(error);
    };
    _resolve2 = _reject2 = function _reject() {};
    return me;
  };

  /**
   * Cancel te promise. This will reject the promise with a CancellationError
   * @returns {Promise} self
   */
  this.cancel = function () {
    if (parent) {
      parent.cancel();
    } else {
      _reject2(new CancellationError());
    }
    return me;
  };

  /**
   * Set a timeout for the promise. If the promise is not resolved within
   * the time, the promise will be cancelled and a TimeoutError is thrown.
   * If the promise is resolved in time, the timeout is removed.
   * @param {number} delay     Delay in milliseconds
   * @returns {Promise} self
   */
  this.timeout = function (delay) {
    if (parent) {
      parent.timeout(delay);
    } else {
      var timer = setTimeout(function () {
        _reject2(new TimeoutError('Promise timed out after ' + delay + ' ms'));
      }, delay);
      me.always(function () {
        clearTimeout(timer);
      });
    }
    return me;
  };

  // attach handler passing the resolve and reject functions
  handler(function (result) {
    _resolve2(result);
  }, function (error) {
    _reject2(error);
  });
}

/**
 * Execute given callback, then call resolve/reject based on the returned result
 * @param {Function} callback
 * @param {Function} resolve
 * @param {Function} reject
 * @returns {Function}
 * @private
 */
function _then(callback, resolve, reject) {
  return function (result) {
    try {
      var res = callback(result);
      if (res && typeof res.then === 'function' && typeof res['catch'] === 'function') {
        // method returned a promise
        res.then(resolve, reject);
      } else {
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  };
}

/**
 * Add an onFail callback to the Promise
 * @param {Function} onFail
 * @returns {Promise} promise
 */
Promise.prototype['catch'] = function (onFail) {
  return this.then(null, onFail);
};

// TODO: add support for Promise.catch(Error, callback)
// TODO: add support for Promise.catch(Error, Error, callback)

/**
 * Execute given callback when the promise either resolves or rejects.
 * @param {Function} fn
 * @returns {Promise} promise
 */
Promise.prototype.always = function (fn) {
  return this.then(fn, fn);
};

/**
 * Create a promise which resolves when all provided promises are resolved,
 * and fails when any of the promises resolves.
 * @param {Promise[]} promises
 * @returns {Promise} promise
 */
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var remaining = promises.length,
      results = [];
    if (remaining) {
      promises.forEach(function (p, i) {
        p.then(function (result) {
          results[i] = result;
          remaining--;
          if (remaining == 0) {
            resolve(results);
          }
        }, function (error) {
          remaining = 0;
          reject(error);
        });
      });
    } else {
      resolve(results);
    }
  });
};

/**
 * Create a promise resolver
 * @returns {{promise: Promise, resolve: Function, reject: Function}} resolver
 */
Promise.defer = function () {
  var resolver = {};
  resolver.promise = new Promise(function (resolve, reject) {
    resolver.resolve = resolve;
    resolver.reject = reject;
  });
  return resolver;
};

/**
 * Create a cancellation error
 * @param {String} [message]
 * @extends Error
 */
function CancellationError(message) {
  this.message = message || 'promise cancelled';
  this.stack = new Error().stack;
}
CancellationError.prototype = new Error();
CancellationError.prototype.constructor = Error;
CancellationError.prototype.name = 'CancellationError';
Promise.CancellationError = CancellationError;

/**
 * Create a timeout error
 * @param {String} [message]
 * @extends Error
 */
function TimeoutError(message) {
  this.message = message || 'timeout exceeded';
  this.stack = new Error().stack;
}
TimeoutError.prototype = new Error();
TimeoutError.prototype.constructor = Error;
TimeoutError.prototype.name = 'TimeoutError';
Promise.TimeoutError = TimeoutError;
module.exports = Promise;

/***/ }),

/***/ 751:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_21244__) {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var Promise = __nested_webpack_require_21244__(219);
var environment = __nested_webpack_require_21244__(828);
var requireFoolWebpack = __nested_webpack_require_21244__(397);

/**
 * Special message sent by parent which causes a child process worker to terminate itself.
 * Not a "message object"; this string is the entire message.
 */
var TERMINATE_METHOD_ID = '__workerpool-terminate__';

/**
 * If sending `TERMINATE_METHOD_ID` does not cause the child process to exit in this many milliseconds,
 * force-kill the child process.
 */
var CHILD_PROCESS_EXIT_TIMEOUT = 1000;
function ensureWorkerThreads() {
  var WorkerThreads = tryRequireWorkerThreads();
  if (!WorkerThreads) {
    throw new Error('WorkerPool: workerType = \'thread\' is not supported, Node >= 11.7.0 required');
  }
  return WorkerThreads;
}

// check whether Worker is supported by the browser
function ensureWebWorker() {
  // Workaround for a bug in PhantomJS (Or QtWebkit): https://github.com/ariya/phantomjs/issues/14534
  if (typeof Worker !== 'function' && ((typeof Worker === "undefined" ? "undefined" : _typeof(Worker)) !== 'object' || typeof Worker.prototype.constructor !== 'function')) {
    throw new Error('WorkerPool: Web Workers not supported');
  }
}
function tryRequireWorkerThreads() {
  try {
    return requireFoolWebpack('worker_threads');
  } catch (error) {
    if (_typeof(error) === 'object' && error !== null && error.code === 'MODULE_NOT_FOUND') {
      // no worker_threads available (old version of node.js)
      return null;
    } else {
      throw error;
    }
  }
}

// get the default worker script
function getDefaultWorker() {
  if (environment.platform === 'browser') {
    // test whether the browser supports all features that we need
    if (typeof Blob === 'undefined') {
      throw new Error('Blob not supported by the browser');
    }
    if (!window.URL || typeof window.URL.createObjectURL !== 'function') {
      throw new Error('URL.createObjectURL not supported by the browser');
    }

    // use embedded worker.js
    var blob = new Blob([__nested_webpack_require_21244__(670)], {
      type: 'text/javascript'
    });
    return window.URL.createObjectURL(blob);
  } else {
    // use external worker.js in current directory
    return __dirname + '/worker.js';
  }
}
function setupWorker(script, options) {
  if (options.workerType === 'web') {
    // browser only
    ensureWebWorker();
    return setupBrowserWorker(script, Worker);
  } else if (options.workerType === 'thread') {
    // node.js only
    WorkerThreads = ensureWorkerThreads();
    return setupWorkerThreadWorker(script, WorkerThreads, options.workerThreadOpts);
  } else if (options.workerType === 'process' || !options.workerType) {
    // node.js only
    return setupProcessWorker(script, resolveForkOptions(options), requireFoolWebpack('child_process'));
  } else {
    // options.workerType === 'auto' or undefined
    if (environment.platform === 'browser') {
      ensureWebWorker();
      return setupBrowserWorker(script, Worker);
    } else {
      // environment.platform === 'node'
      var WorkerThreads = tryRequireWorkerThreads();
      if (WorkerThreads) {
        return setupWorkerThreadWorker(script, WorkerThreads);
      } else {
        return setupProcessWorker(script, resolveForkOptions(options), requireFoolWebpack('child_process'));
      }
    }
  }
}
function setupBrowserWorker(script, Worker) {
  // create the web worker
  var worker = new Worker(script);
  worker.isBrowserWorker = true;
  // add node.js API to the web worker
  worker.on = function (event, callback) {
    this.addEventListener(event, function (message) {
      callback(message.data);
    });
  };
  worker.send = function (message) {
    this.postMessage(message);
  };
  return worker;
}
function setupWorkerThreadWorker(script, WorkerThreads, workerThreadOptions) {
  var worker = new WorkerThreads.Worker(script, _objectSpread({
    stdout: false,
    // automatically pipe worker.STDOUT to process.STDOUT
    stderr: false
  }, workerThreadOptions));
  worker.isWorkerThread = true;
  // make the worker mimic a child_process
  worker.send = function (message) {
    this.postMessage(message);
  };
  worker.kill = function () {
    this.terminate();
    return true;
  };
  worker.disconnect = function () {
    this.terminate();
  };
  return worker;
}
function setupProcessWorker(script, options, child_process) {
  // no WorkerThreads, fallback to sub-process based workers
  var worker = child_process.fork(script, options.forkArgs, options.forkOpts);
  worker.isChildProcess = true;
  return worker;
}

// add debug flags to child processes if the node inspector is active
function resolveForkOptions(opts) {
  opts = opts || {};
  var processExecArgv = process.execArgv.join(' ');
  var inspectorActive = processExecArgv.indexOf('--inspect') !== -1;
  var debugBrk = processExecArgv.indexOf('--debug-brk') !== -1;
  var execArgv = [];
  if (inspectorActive) {
    execArgv.push('--inspect=' + opts.debugPort);
    if (debugBrk) {
      execArgv.push('--debug-brk');
    }
  }
  process.execArgv.forEach(function (arg) {
    if (arg.indexOf('--max-old-space-size') > -1) {
      execArgv.push(arg);
    }
  });
  return Object.assign({}, opts, {
    forkArgs: opts.forkArgs,
    forkOpts: Object.assign({}, opts.forkOpts, {
      execArgv: (opts.forkOpts && opts.forkOpts.execArgv || []).concat(execArgv)
    })
  });
}

/**
 * Converts a serialized error to Error
 * @param {Object} obj Error that has been serialized and parsed to object
 * @return {Error} The equivalent Error.
 */
function objectToError(obj) {
  var temp = new Error('');
  var props = Object.keys(obj);
  for (var i = 0; i < props.length; i++) {
    temp[props[i]] = obj[props[i]];
  }
  return temp;
}

/**
 * A WorkerHandler controls a single worker. This worker can be a child process
 * on node.js or a WebWorker in a browser environment.
 * @param {String} [script] If no script is provided, a default worker with a
 *                          function run will be created.
 * @param {WorkerPoolOptions} _options See docs
 * @constructor
 */
function WorkerHandler(script, _options) {
  var me = this;
  var options = _options || {};
  this.script = script || getDefaultWorker();
  this.worker = setupWorker(this.script, options);
  this.debugPort = options.debugPort;
  this.forkOpts = options.forkOpts;
  this.forkArgs = options.forkArgs;
  this.workerThreadOpts = options.workerThreadOpts;

  // The ready message is only sent if the worker.add method is called (And the default script is not used)
  if (!script) {
    this.worker.ready = true;
  }

  // queue for requests that are received before the worker is ready
  this.requestQueue = [];
  this.worker.on('message', function (response) {
    if (me.terminated) {
      return;
    }
    if (typeof response === 'string' && response === 'ready') {
      me.worker.ready = true;
      dispatchQueuedRequests();
    } else {
      // find the task from the processing queue, and run the tasks callback
      var id = response.id;
      var task = me.processing[id];
      if (task !== undefined) {
        if (response.isEvent) {
          if (task.options && typeof task.options.on === 'function') {
            task.options.on(response.payload);
          }
        } else {
          // remove the task from the queue
          delete me.processing[id];

          // test if we need to terminate
          if (me.terminating === true) {
            // complete worker termination if all tasks are finished
            me.terminate();
          }

          // resolve the task's promise
          if (response.error) {
            task.resolver.reject(objectToError(response.error));
          } else {
            task.resolver.resolve(response.result);
          }
        }
      }
    }
  });

  // reject all running tasks on worker error
  function onError(error) {
    me.terminated = true;
    for (var id in me.processing) {
      if (me.processing[id] !== undefined) {
        me.processing[id].resolver.reject(error);
      }
    }
    me.processing = Object.create(null);
  }

  // send all queued requests to worker
  function dispatchQueuedRequests() {
    var _iterator = _createForOfIteratorHelper(me.requestQueue.splice(0)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var request = _step.value;
        me.worker.send(request);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var worker = this.worker;
  // listen for worker messages error and exit
  this.worker.on('error', onError);
  this.worker.on('exit', function (exitCode, signalCode) {
    var message = 'Workerpool Worker terminated Unexpectedly\n';
    message += '    exitCode: `' + exitCode + '`\n';
    message += '    signalCode: `' + signalCode + '`\n';
    message += '    workerpool.script: `' + me.script + '`\n';
    message += '    spawnArgs: `' + worker.spawnargs + '`\n';
    message += '    spawnfile: `' + worker.spawnfile + '`\n';
    message += '    stdout: `' + worker.stdout + '`\n';
    message += '    stderr: `' + worker.stderr + '`\n';
    onError(new Error(message));
  });
  this.processing = Object.create(null); // queue with tasks currently in progress

  this.terminating = false;
  this.terminated = false;
  this.terminationHandler = null;
  this.lastId = 0;
}

/**
 * Get a list with methods available on the worker.
 * @return {Promise.<String[], Error>} methods
 */
WorkerHandler.prototype.methods = function () {
  return this.exec('methods');
};

/**
 * Execute a method with given parameters on the worker
 * @param {String} method
 * @param {Array} [params]
 * @param {{resolve: Function, reject: Function}} [resolver]
 * @param {ExecOptions}  [options]
 * @return {Promise.<*, Error>} result
 */
WorkerHandler.prototype.exec = function (method, params, resolver, options) {
  if (!resolver) {
    resolver = Promise.defer();
  }

  // generate a unique id for the task
  var id = ++this.lastId;

  // register a new task as being in progress
  this.processing[id] = {
    id: id,
    resolver: resolver,
    options: options
  };

  // build a JSON-RPC request
  var request = {
    id: id,
    method: method,
    params: params
  };
  if (this.terminated) {
    resolver.reject(new Error('Worker is terminated'));
  } else if (this.worker.ready) {
    // send the request to the worker
    this.worker.send(request);
  } else {
    this.requestQueue.push(request);
  }

  // on cancellation, force the worker to terminate
  var me = this;
  return resolver.promise["catch"](function (error) {
    if (error instanceof Promise.CancellationError || error instanceof Promise.TimeoutError) {
      // remove this task from the queue. It is already rejected (hence this
      // catch event), and else it will be rejected again when terminating
      delete me.processing[id];

      // terminate worker
      return me.terminateAndNotify(true).then(function () {
        throw error;
      }, function (err) {
        throw err;
      });
    } else {
      throw error;
    }
  });
};

/**
 * Test whether the worker is working or not
 * @return {boolean} Returns true if the worker is busy
 */
WorkerHandler.prototype.busy = function () {
  return Object.keys(this.processing).length > 0;
};

/**
 * Terminate the worker.
 * @param {boolean} [force=false]   If false (default), the worker is terminated
 *                                  after finishing all tasks currently in
 *                                  progress. If true, the worker will be
 *                                  terminated immediately.
 * @param {function} [callback=null] If provided, will be called when process terminates.
 */
WorkerHandler.prototype.terminate = function (force, callback) {
  var me = this;
  if (force) {
    // cancel all tasks in progress
    for (var id in this.processing) {
      if (this.processing[id] !== undefined) {
        this.processing[id].resolver.reject(new Error('Worker terminated'));
      }
    }
    this.processing = Object.create(null);
  }
  if (typeof callback === 'function') {
    this.terminationHandler = callback;
  }
  if (!this.busy()) {
    // all tasks are finished. kill the worker
    var cleanup = function cleanup(err) {
      me.terminated = true;
      if (me.worker != null && me.worker.removeAllListeners) {
        // removeAllListeners is only available for child_process
        me.worker.removeAllListeners('message');
      }
      me.worker = null;
      me.terminating = false;
      if (me.terminationHandler) {
        me.terminationHandler(err, me);
      } else if (err) {
        throw err;
      }
    };
    if (this.worker) {
      if (typeof this.worker.kill === 'function') {
        if (this.worker.killed) {
          cleanup(new Error('worker already killed!'));
          return;
        }
        if (this.worker.isChildProcess) {
          var cleanExitTimeout = setTimeout(function () {
            if (me.worker) {
              me.worker.kill();
            }
          }, CHILD_PROCESS_EXIT_TIMEOUT);
          this.worker.once('exit', function () {
            clearTimeout(cleanExitTimeout);
            if (me.worker) {
              me.worker.killed = true;
            }
            cleanup();
          });
          if (this.worker.ready) {
            this.worker.send(TERMINATE_METHOD_ID);
          } else {
            this.requestQueue.push(TERMINATE_METHOD_ID);
          }
        } else {
          // worker_thread
          this.worker.kill();
          this.worker.killed = true;
          cleanup();
        }
        return;
      } else if (typeof this.worker.terminate === 'function') {
        this.worker.terminate(); // web worker
        this.worker.killed = true;
      } else {
        throw new Error('Failed to terminate worker');
      }
    }
    cleanup();
  } else {
    // we can't terminate immediately, there are still tasks being executed
    this.terminating = true;
  }
};

/**
 * Terminate the worker, returning a Promise that resolves when the termination has been done.
 * @param {boolean} [force=false]   If false (default), the worker is terminated
 *                                  after finishing all tasks currently in
 *                                  progress. If true, the worker will be
 *                                  terminated immediately.
 * @param {number} [timeout]        If provided and non-zero, worker termination promise will be rejected
 *                                  after timeout if worker process has not been terminated.
 * @return {Promise.<WorkerHandler, Error>}
 */
WorkerHandler.prototype.terminateAndNotify = function (force, timeout) {
  var resolver = Promise.defer();
  if (timeout) {
    resolver.promise.timeout = timeout;
  }
  this.terminate(force, function (err, worker) {
    if (err) {
      resolver.reject(err);
    } else {
      resolver.resolve(worker);
    }
  });
  return resolver.promise;
};
module.exports = WorkerHandler;
module.exports._tryRequireWorkerThreads = tryRequireWorkerThreads;
module.exports._setupProcessWorker = setupProcessWorker;
module.exports._setupBrowserWorker = setupBrowserWorker;
module.exports._setupWorkerThreadWorker = setupWorkerThreadWorker;
module.exports.ensureWorkerThreads = ensureWorkerThreads;

/***/ }),

/***/ 833:
/***/ (function(module) {

"use strict";


var MAX_PORTS = 65535;
module.exports = DebugPortAllocator;
function DebugPortAllocator() {
  this.ports = Object.create(null);
  this.length = 0;
}
DebugPortAllocator.prototype.nextAvailableStartingAt = function (starting) {
  while (this.ports[starting] === true) {
    starting++;
  }
  if (starting >= MAX_PORTS) {
    throw new Error('WorkerPool debug port limit reached: ' + starting + '>= ' + MAX_PORTS);
  }
  this.ports[starting] = true;
  this.length++;
  return starting;
};
DebugPortAllocator.prototype.releasePort = function (port) {
  delete this.ports[port];
  this.length--;
};

/***/ }),

/***/ 828:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_40334__) {

var requireFoolWebpack = __nested_webpack_require_40334__(397);

// source: https://github.com/flexdinesh/browser-or-node
var isNode = function isNode(nodeProcess) {
  return typeof nodeProcess !== 'undefined' && nodeProcess.versions != null && nodeProcess.versions.node != null;
};
module.exports.isNode = isNode;

// determines the JavaScript platform: browser or node
module.exports.platform = typeof process !== 'undefined' && isNode(process) ? 'node' : 'browser';

// determines whether the code is running in main thread or not
// note that in node.js we have to check both worker_thread and child_process
var worker_threads = tryRequireFoolWebpack('worker_threads');
module.exports.isMainThread = module.exports.platform === 'node' ? (!worker_threads || worker_threads.isMainThread) && !process.connected : typeof Window !== 'undefined';

// determines the number of cpus available
module.exports.cpus = module.exports.platform === 'browser' ? self.navigator.hardwareConcurrency : requireFoolWebpack('os').cpus().length;
function tryRequireFoolWebpack(module) {
  try {
    return requireFoolWebpack(module);
  } catch (err) {
    return null;
  }
}

/***/ }),

/***/ 670:
/***/ (function(module) {

/**
 * embeddedWorker.js contains an embedded version of worker.js.
 * This file is automatically generated,
 * changes made in this file will be overwritten.
 */
module.exports = "!function(){var __webpack_exports__={};!function(){var exports=__webpack_exports__,__webpack_unused_export__;function _typeof(r){return(_typeof=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&\"function\"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?\"symbol\":typeof r})(r)}var requireFoolWebpack=eval(\"typeof require !== 'undefined' ? require : function (module) { throw new Error('Module \\\" + module + \\\" not found.') }\"),TERMINATE_METHOD_ID=\"__workerpool-terminate__\",worker={exit:function(){}},WorkerThreads,parentPort;if(\"undefined\"!=typeof self&&\"function\"==typeof postMessage&&\"function\"==typeof addEventListener)worker.on=function(r,e){addEventListener(r,function(r){e(r.data)})},worker.send=function(r){postMessage(r)};else{if(\"undefined\"==typeof process)throw new Error(\"Script must be executed as a worker\");try{WorkerThreads=requireFoolWebpack(\"worker_threads\")}catch(error){if(\"object\"!==_typeof(error)||null===error||\"MODULE_NOT_FOUND\"!==error.code)throw error}WorkerThreads&&null!==WorkerThreads.parentPort?(parentPort=WorkerThreads.parentPort,worker.send=parentPort.postMessage.bind(parentPort),worker.on=parentPort.on.bind(parentPort)):(worker.on=process.on.bind(process),worker.send=process.send.bind(process),worker.on(\"disconnect\",function(){process.exit(1)}),worker.exit=process.exit.bind(process))}function convertError(o){return Object.getOwnPropertyNames(o).reduce(function(r,e){return Object.defineProperty(r,e,{value:o[e],enumerable:!0})},{})}function isPromise(r){return r&&\"function\"==typeof r.then&&\"function\"==typeof r.catch}worker.methods={},worker.methods.run=function(r,e){r=new Function(\"return (\"+r+\").apply(null, arguments);\");return r.apply(r,e)},worker.methods.methods=function(){return Object.keys(worker.methods)};var currentRequestId=null;worker.on(\"message\",function(e){if(e===TERMINATE_METHOD_ID)return worker.exit(0);try{var r=worker.methods[e.method];if(!r)throw new Error('Unknown method \"'+e.method+'\"');currentRequestId=e.id;var o=r.apply(r,e.params);isPromise(o)?o.then(function(r){worker.send({id:e.id,result:r,error:null}),currentRequestId=null}).catch(function(r){worker.send({id:e.id,result:null,error:convertError(r)}),currentRequestId=null}):(worker.send({id:e.id,result:o,error:null}),currentRequestId=null)}catch(r){worker.send({id:e.id,result:null,error:convertError(r)})}}),worker.register=function(r){if(r)for(var e in r)r.hasOwnProperty(e)&&(worker.methods[e]=r[e]);worker.send(\"ready\")},worker.emit=function(r){currentRequestId&&worker.send({id:currentRequestId,isEvent:!0,payload:r})},__webpack_unused_export__=worker.register,worker.emit}()}();";

/***/ }),

/***/ 397:
/***/ (function(module) {

// source of inspiration: https://github.com/sindresorhus/require-fool-webpack
var requireFoolWebpack = eval('typeof require !== \'undefined\' ' + '? require ' + ': function (module) { throw new Error(\'Module " + module + " not found.\') }');
module.exports = requireFoolWebpack;

/***/ }),

/***/ 744:
/***/ (function(__unused_webpack_module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * worker must be started as a child process or a web worker.
 * It listens for RPC messages from the parent process.
 */

// source of inspiration: https://github.com/sindresorhus/require-fool-webpack
var requireFoolWebpack = eval('typeof require !== \'undefined\'' + ' ? require' + ' : function (module) { throw new Error(\'Module " + module + " not found.\') }');

/**
 * Special message sent by parent which causes the worker to terminate itself.
 * Not a "message object"; this string is the entire message.
 */
var TERMINATE_METHOD_ID = '__workerpool-terminate__';

// var nodeOSPlatform = require('./environment').nodeOSPlatform;

// create a worker API for sending and receiving messages which works both on
// node.js and in the browser
var worker = {
  exit: function exit() {}
};
if (typeof self !== 'undefined' && typeof postMessage === 'function' && typeof addEventListener === 'function') {
  // worker in the browser
  worker.on = function (event, callback) {
    addEventListener(event, function (message) {
      callback(message.data);
    });
  };
  worker.send = function (message) {
    postMessage(message);
  };
} else if (typeof process !== 'undefined') {
  // node.js

  var WorkerThreads;
  try {
    WorkerThreads = requireFoolWebpack('worker_threads');
  } catch (error) {
    if (_typeof(error) === 'object' && error !== null && error.code === 'MODULE_NOT_FOUND') {
      // no worker_threads, fallback to sub-process based workers
    } else {
      throw error;
    }
  }
  if (WorkerThreads && /* if there is a parentPort, we are in a WorkerThread */
  WorkerThreads.parentPort !== null) {
    var parentPort = WorkerThreads.parentPort;
    worker.send = parentPort.postMessage.bind(parentPort);
    worker.on = parentPort.on.bind(parentPort);
  } else {
    worker.on = process.on.bind(process);
    worker.send = process.send.bind(process);
    // register disconnect handler only for subprocess worker to exit when parent is killed unexpectedly
    worker.on('disconnect', function () {
      process.exit(1);
    });
    worker.exit = process.exit.bind(process);
  }
} else {
  throw new Error('Script must be executed as a worker');
}
function convertError(error) {
  return Object.getOwnPropertyNames(error).reduce(function (product, name) {
    return Object.defineProperty(product, name, {
      value: error[name],
      enumerable: true
    });
  }, {});
}

/**
 * Test whether a value is a Promise via duck typing.
 * @param {*} value
 * @returns {boolean} Returns true when given value is an object
 *                    having functions `then` and `catch`.
 */
function isPromise(value) {
  return value && typeof value.then === 'function' && typeof value["catch"] === 'function';
}

// functions available externally
worker.methods = {};

/**
 * Execute a function with provided arguments
 * @param {String} fn     Stringified function
 * @param {Array} [args]  Function arguments
 * @returns {*}
 */
worker.methods.run = function run(fn, args) {
  var f = new Function('return (' + fn + ').apply(null, arguments);');
  return f.apply(f, args);
};

/**
 * Get a list with methods available on this worker
 * @return {String[]} methods
 */
worker.methods.methods = function methods() {
  return Object.keys(worker.methods);
};
var currentRequestId = null;
worker.on('message', function (request) {
  if (request === TERMINATE_METHOD_ID) {
    return worker.exit(0);
  }
  try {
    var method = worker.methods[request.method];
    if (method) {
      currentRequestId = request.id;

      // execute the function
      var result = method.apply(method, request.params);
      if (isPromise(result)) {
        // promise returned, resolve this and then return
        result.then(function (result) {
          worker.send({
            id: request.id,
            result: result,
            error: null
          });
          currentRequestId = null;
        })["catch"](function (err) {
          worker.send({
            id: request.id,
            result: null,
            error: convertError(err)
          });
          currentRequestId = null;
        });
      } else {
        // immediate result
        worker.send({
          id: request.id,
          result: result,
          error: null
        });
        currentRequestId = null;
      }
    } else {
      throw new Error('Unknown method "' + request.method + '"');
    }
  } catch (err) {
    worker.send({
      id: request.id,
      result: null,
      error: convertError(err)
    });
  }
});

/**
 * Register methods to the worker
 * @param {Object} methods
 */
worker.register = function (methods) {
  if (methods) {
    for (var name in methods) {
      if (methods.hasOwnProperty(name)) {
        worker.methods[name] = methods[name];
      }
    }
  }
  worker.send('ready');
};
worker.emit = function (payload) {
  if (currentRequestId) {
    worker.send({
      id: currentRequestId,
      isEvent: true,
      payload: payload
    });
  }
};
if (true) {
  exports.add = worker.register;
  exports.emit = worker.emit;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_50492__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_50492__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;
var environment = __nested_webpack_require_50492__(828);

/**
 * Create a new worker pool
 * @param {string} [script]
 * @param {WorkerPoolOptions} [options]
 * @returns {Pool} pool
 */
exports.pool = function pool(script, options) {
  var Pool = __nested_webpack_require_50492__(345);
  return new Pool(script, options);
};

/**
 * Create a worker and optionally register a set of methods to the worker.
 * @param {Object} [methods]
 */
exports.worker = function worker(methods) {
  var worker = __nested_webpack_require_50492__(744);
  worker.add(methods);
};

/**
 * Sends an event to the parent worker pool.
 * @param {any} payload 
 */
exports.workerEmit = function workerEmit(payload) {
  var worker = __nested_webpack_require_50492__(744);
  worker.emit(payload);
};

/**
 * Create a promise.
 * @type {Promise} promise
 */
exports.Promise = __nested_webpack_require_50492__(219);
exports.platform = environment.platform;
exports.isMainThread = environment.isMainThread;
exports.cpus = environment.cpus;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=workerpool.js.map

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./src/tetris_solving_worker.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TetrisSolvingBench_BenchSolverFacade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TetrisSolvingBench/BenchSolverFacade */ "./src/TetrisSolvingBench/BenchSolverFacade.ts");
/* harmony import */ var _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tetris/EventBus/EventBus */ "./src/Tetris/EventBus/EventBus.ts");
/* harmony import */ var _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tetris/CommandBus/CommandBus */ "./src/Tetris/CommandBus/CommandBus.ts");



const workerpool = __webpack_require__(/*! workerpool */ "./node_modules/workerpool/dist/workerpool.js");
async function solveTetris() {
    const eventBus = new _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventBus();
    const commandBus = new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_2__.CommandBus();
    let bench = new _TetrisSolvingBench_BenchSolverFacade__WEBPACK_IMPORTED_MODULE_0__.BenchSolverFacade(eventBus, commandBus);
    bench.start();
    return await new Promise(resolve => {
        eventBus.on(_Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventType.FallingTickProcessed, (event) => {
            if (event.gameData.stats.figuresFallen >= 1000000) {
                bench.pause();
                resolve(event.gameData);
            }
        });
        eventBus.on(_Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventType.GameOver, (event) => {
            resolve(event.gameData);
        });
    });
}
// create a worker and register public functions
workerpool.worker({
    solveTetris: solveTetris,
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhLElBQUksT0FBUyxFQUFFO2dCQUNqRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyx5RUFBa0IsRUFBRSxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsZ0RBQWdEO0FBQ2hELFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDZCxXQUFXLEVBQUUsV0FBVztDQUMzQixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0NvbWJvQ291bnRlci9Db21ib0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9Db21tYW5kQnVzL0NvbW1hbmRCdXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0ZhbGxpbmdGaWd1cmVzUHJvY2Vzc29yL1JlZ3VsYXJGYWxsaW5nRmlndXJlc1Byb2Nlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0ZpZ3VyZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9GaWd1cmVzU3Bhd25lci9BbHdheXNPbmVGaWd1cmVTcGF3bmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvR2FtZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9MZXZlbENvdW50ZXIvU3F1YXNoZWRSb3dzQ291bnRlckJhc2VkTGV2ZWxDb3VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvTW92aW5nSGFuZGxlci9Nb3ZpbmdIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvU2NvcmVDb3VudGVyL0ZhbGxUaWNrU2NvcmVDb3VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvU3RhdHNDb3VudGVyL1N0YXRzQ291bnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL1RpbWluZ3NIYW5kbGVyL0NvbnN0VGltaW5nc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9VdGlscy9FbnVtSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0ZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0luc3RhbnRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvRmlndXJlUGxhY2luZ1Jlc29sdmVyL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9DYWxjdWxhdG9yQWdncmVnYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxhYmxlQ2VsbHMvRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvSG9sZXMvSG9sZXNWMUNhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1NxdWFzaGVkUm93cy9TcXVhc2hlZFJvd3NDYWxjdWxhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1R1bm5lbHMvVHVubmVsc0NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9UZXRyaXNTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9VdGlscy9Ib2xlc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmluZ0JlbmNoL0JlbmNoU29sdmVyRmFjYWRlLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93b3JrZXJwb29sL2Rpc3Qvd29ya2VycG9vbC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvdGV0cmlzX3NvbHZpbmdfd29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIENvbWJvQ291bnRlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwdWJsaWMgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICkge1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GYWxsVGlja1Byb2Nlc3NlZChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudHJhbnNmZXJyZWRUb01hdHJpeEZpZ3VyZXMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuc3F1YXNoZWRMaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBldmVudC5nYW1lRGF0YS5jb21ibyArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuZ2FtZURhdGEuY29tYm8gPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtGaWd1cmVUdXJuU3RhdGV9IGZyb20gXCIuLi9GaWd1cmVzXCI7XG5cbmV4cG9ydCBlbnVtIENvbW1hbmRUeXBlIHtcbiAgICBJbml0R2FtZSxcbiAgICBSZXN1bWVHYW1lLFxuICAgIFBhdXNlR2FtZSxcbiAgICBGaWd1cmVzRmFsbFRpY2ssXG4gICAgR2FtZU92ZXIsXG4gICAgUmVuZGVyLFxuICAgIE1vdmVMZWZ0LFxuICAgIE1vdmVSaWdodCxcbiAgICBUdXJuQ2xvY2t3aXNlLFxuICAgIE1vdmVEb3duLFxuICAgIEZpZ3VyZXNGYWxsRG93bixcbiAgICBNb3ZlVG9YLFxuICAgIE1vdmVUb1ksXG4gICAgVHVyblRvU3RhdGUsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZCB7XG4gICAgZ2FtZURhdGE6IEdhbWVEYXRhO1xuXG4gICAgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBJbml0R2FtZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuSW5pdEdhbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVzdW1lR2FtZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuUmVzdW1lR2FtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXVzZUdhbWVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLlBhdXNlR2FtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmVzRmFsbFRpY2tDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsVGljaztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lT3ZlckNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuR2FtZU92ZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5SZW5kZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZUxlZnRDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLk1vdmVMZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVSaWdodENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuTW92ZVJpZ2h0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFR1cm5DbG9ja3dpc2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLlR1cm5DbG9ja3dpc2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZURvd25Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLk1vdmVEb3duO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVUb1hDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyB4OiBudW1iZXJcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuTW92ZVRvWDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZlVG9ZQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICAgICBwdWJsaWMgeTogbnVtYmVyLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5Nb3ZlVG9ZO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFR1cm5Ub1N0YXRlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICAgICBwdWJsaWMgdHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGVcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuVHVyblRvU3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHJvcEZpZ3VyZXNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsRG93bjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kQnVzIHtcbiAgICBwcml2YXRlIGhhbmRsZXJzOiBNYXA8Q29tbWFuZFR5cGUsICgocGF5bG9hZDogQ29tbWFuZCkgPT4gdm9pZClbXT4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgYWRkSGFuZGxlcihldmVudDogQ29tbWFuZFR5cGUsIGhhbmRsZXI6ICguLi5fOiBhbnkpID0+IHZvaWQsIHVuaXF1ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgICAgICBpZiAodW5pcXVlICYmIGhhbmRsZXJzLnNvbWUoYm91bmRIYW5kbGVyID0+IGJvdW5kSGFuZGxlciA9PT0gaGFuZGxlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLmhhbmRsZXJzLnNldChldmVudCwgaGFuZGxlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVIYW5kbGVyKGV2ZW50OiBDb21tYW5kVHlwZSwgaGFuZGxlcjogKC4uLl86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmdldChldmVudCkgfHwgW107XG4gICAgICAgIGxldCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZXJzLnNldChldmVudCwgaGFuZGxlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBydW4ocGF5bG9hZDogQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmdldChwYXlsb2FkLmdldENvbW1hbmRUeXBlKCkpIHx8IFtdO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge2hhbmRsZXIocGF5bG9hZCl9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0ZpZ3VyZSwgRmlndXJlVHVyblN0YXRlLCBMZWZ0TEZpZ3VyZSwgTFpGaWd1cmUsIFJpZ2h0TEZpZ3VyZSwgUlpGaWd1cmUsIFNxdWFyZUZpZ3VyZSwgU3RpY2tGaWd1cmUsIFRGaWd1cmV9IGZyb20gXCIuL0ZpZ3VyZXNcIjtcblxuLyoqXG4gKiB4IGZvciBob3Jpem9udGFsIHBvc2l0aW9uaW5nXG4gKiB5IGZvciB2ZXJ0aWNhbCBwb3NpdGlvbmluZ1xuICovXG5leHBvcnQgY2xhc3MgQ29vcmRpbmF0ZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB4OiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyB5OiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmFsbGluZ0ZpZ3VyZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBmaWd1cmU6IEZpZ3VyZSxcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBDb29yZGluYXRlLFxuICAgICAgICBwdWJsaWMgdHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGUsXG4gICAgICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lU2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZmllbGRXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZmllbGRIZWlnaHQ6IG51bWJlcixcbiAgICAgICAgcHVibGljIGZpZ3VyZXM6IEZpZ3VyZVtdLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFN0YXRzIHtcbiAgICBwdWJsaWMgZmlndXJlc0ZhbGxlbiA9IDA7XG4gICAgcHVibGljIGxpbmVzU3F1YXNoZWQgPSAwO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZURhdGEge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgaXNHYW1lT3ZlcjogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgZmFsbGluZ0ZpZ3VyZXM6IEZhbGxpbmdGaWd1cmVbXSA9IFtdLFxuICAgICAgICBwdWJsaWMgbWF0cml4OiBib29sZWFuW11bXSA9IFtdLFxuICAgICAgICBwdWJsaWMgbmV4dFRpY2tUaW1lb3V0SWQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaWMgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgICAgICAgcHVibGljIGxldmVsOiBudW1iZXIgPSAxLFxuICAgICAgICBwdWJsaWMgc2NvcmU6IG51bWJlciA9IDAsXG4gICAgICAgIHB1YmxpYyBjb21ibzogbnVtYmVyID0gMCxcbiAgICAgICAgcHVibGljIHN0YXRzOiBTdGF0cyA9IG5ldyBTdGF0cygpLFxuICAgICkge31cblxuICAgIHN0YXRpYyBtYWtlU2ltcGxlKHdpZHRoOiBudW1iZXIgPSAxMCwgaGVpZ2h0OiBudW1iZXIgPSAyMCk6IEdhbWVEYXRhIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lRGF0YShcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIG5ldyBBcnJheShoZWlnaHQpLmZpbGwoW10pXG4gICAgICAgICAgICAgICAgLm1hcChfID0+IG5ldyBBcnJheSh3aWR0aCkuZmlsbChmYWxzZSkpLFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBHYW1lU2V0dGluZ3MoXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJpZ2h0TEZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTGVmdExGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNxdWFyZUZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU3RpY2tGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IExaRmlndXJlKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSWkZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RmFsbGluZ0ZpZ3VyZSwgR2FtZURhdGF9IGZyb20gXCIuLi9Db21tb25cIjtcblxuZXhwb3J0IGVudW0gRXZlbnRUeXBlIHtcbiAgICBGYWxsaW5nVGlja1Byb2Nlc3NlZCxcbiAgICBHYW1lT3ZlcixcbiAgICBGaWd1cmVzTW92ZWQsXG4gICAgTGV2ZWxVcCxcbiAgICBGaWd1cmVzU3Bhd25lZCxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFdmVudCB7XG4gICAgZ2FtZURhdGE6IEdhbWVEYXRhO1xuXG4gICAgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQgaW1wbGVtZW50cyBFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyB0cmFuc2ZlcnJlZFRvTWF0cml4RmlndXJlczogRmFsbGluZ0ZpZ3VyZVtdLFxuICAgICAgICBwdWJsaWMgc3F1YXNoZWRMaW5lczogbnVtYmVyW10sXG4gICAgICAgIHB1YmxpYyBkcm9wcGVkTGluZXM6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2FtZU92ZXJFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuR2FtZU92ZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlndXJlc01vdmVkRXZlbnQgaW1wbGVtZW50cyBFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldEV2ZW50VHlwZSgpOiBFdmVudFR5cGUge1xuICAgICAgICByZXR1cm4gRXZlbnRUeXBlLkZpZ3VyZXNNb3ZlZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXZlbFVwRXZlbnQgaW1wbGVtZW50cyBFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldEV2ZW50VHlwZSgpOiBFdmVudFR5cGUge1xuICAgICAgICByZXR1cm4gRXZlbnRUeXBlLkxldmVsVXA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlndXJlc1NwYXduZWRFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgcHVibGljIG5ld0ZpZ3VyZXM6IEZhbGxpbmdGaWd1cmVbXSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuRmlndXJlc1NwYXduZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRCdXMge1xuICAgIHByaXZhdGUgaGFuZGxlcnM6IE1hcDxFdmVudFR5cGUsICgoLi4uXzogYW55KSA9PiB2b2lkKVtdPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBvbihldmVudDogRXZlbnRUeXBlLCBoYW5kbGVyOiAoLi4uXzogYW55KSA9PiB2b2lkLCB1bmlxdWU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICAgICAgaWYgKHVuaXF1ZSAmJiBoYW5kbGVycy5zb21lKGJvdW5kSGFuZGxlciA9PiBib3VuZEhhbmRsZXIgPT09IGhhbmRsZXIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5zZXQoZXZlbnQsIGhhbmRsZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb2ZmKGV2ZW50OiBFdmVudFR5cGUsIGhhbmRsZXI6ICguLi5fOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgICAgICBsZXQgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVycy5zZXQoZXZlbnQsIGhhbmRsZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmlyZShldmVudFBheWxvYWQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZ2V0KGV2ZW50UGF5bG9hZC5nZXRFdmVudFR5cGUoKSkgfHwgW107XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7aGFuZGxlcihldmVudFBheWxvYWQpfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb29yZGluYXRlLCBGYWxsaW5nRmlndXJlLCBHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtEcm9wRmlndXJlc0NvbW1hbmQsIENvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBHYW1lT3ZlckNvbW1hbmQsIEZpZ3VyZXNGYWxsVGlja0NvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnR9IGZyb20gXCIuLi9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nQ2hlY2tlcn0gZnJvbSBcIi4uL1V0aWxzL0ZpZ3VyZVBsYWNpbmdDaGVja2VyXCI7XG5cbmNsYXNzIEZhbGxpbmdSZXN1bHQge1xuICAgIHB1YmxpYyB0cmFuc2ZlcnJlZEZpZ3VyZXM6IEZhbGxpbmdGaWd1cmVbXSA9IFtdO1xuICAgIHB1YmxpYyBpc0dhbWVPdmVyOiBib29sZWFuID0gZmFsc2U7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWd1bGFyRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5GaWd1cmVzRmFsbFRpY2ssIHRoaXMucHJvY2Vzc0ZpZ3VyZXNGYWxsVGlja0NvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsRG93biwgdGhpcy5wcm9jZXNzRHJvcEZpZ3VyZXNDb21tYW5kLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0ZpZ3VyZXNGYWxsVGlja0NvbW1hbmQoY29tbWFuZDogRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCkge1xuICAgICAgICBjb25zdCBmYWxsaW5nUmVzdWx0ID0gdGhpcy5mYWxsRmlndXJlc0Zvck9uZUNlbGwoY29tbWFuZC5nYW1lRGF0YSk7XG4gICAgICAgIGxldCBzcXVhc2hlZExpbmVzID0gdGhpcy5zcXVhc2hMaW5lcyhjb21tYW5kLmdhbWVEYXRhLm1hdHJpeCk7XG4gICAgICAgIGlmIChmYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IEdhbWVPdmVyQ29tbWFuZChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KFxuICAgICAgICAgICAgY29tbWFuZC5nYW1lRGF0YSxcbiAgICAgICAgICAgIGZhbGxpbmdSZXN1bHQudHJhbnNmZXJyZWRGaWd1cmVzLFxuICAgICAgICAgICAgc3F1YXNoZWRMaW5lcyxcbiAgICAgICAgICAgIDBcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRHJvcEZpZ3VyZXNDb21tYW5kKGNvbW1hbmQ6IERyb3BGaWd1cmVzQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBsZXQgZmFsbGluZ1Jlc3VsdCA9IG5ldyBGYWxsaW5nUmVzdWx0KCk7XG4gICAgICAgIGxldCBkcm9wcGVkTGluZXMgPSAwO1xuICAgICAgICB3aGlsZSAoY29tbWFuZC5nYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBvbmVDZWxsRmFsbGluZ1Jlc3VsdCA9IHRoaXMuZmFsbEZpZ3VyZXNGb3JPbmVDZWxsKGNvbW1hbmQuZ2FtZURhdGEpO1xuICAgICAgICAgICAgZmFsbGluZ1Jlc3VsdC50cmFuc2ZlcnJlZEZpZ3VyZXMucHVzaCguLi5vbmVDZWxsRmFsbGluZ1Jlc3VsdC50cmFuc2ZlcnJlZEZpZ3VyZXMpO1xuICAgICAgICAgICAgZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyID0gZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyIHx8IG9uZUNlbGxGYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXI7XG4gICAgICAgICAgICBkcm9wcGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3F1YXNoZWRMaW5lcyA9IHRoaXMuc3F1YXNoTGluZXMoY29tbWFuZC5nYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBpZiAoZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBHYW1lT3ZlckNvbW1hbmQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmFsbFRpY2tQcm9jZXNzZWRFdmVudChcbiAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEsXG4gICAgICAgICAgICBmYWxsaW5nUmVzdWx0LnRyYW5zZmVycmVkRmlndXJlcyxcbiAgICAgICAgICAgIHNxdWFzaGVkTGluZXMsXG4gICAgICAgICAgICBkcm9wcGVkTGluZXMgLSAxLFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhbGxGaWd1cmVzRm9yT25lQ2VsbChnYW1lRGF0YTogR2FtZURhdGEpOiBGYWxsaW5nUmVzdWx0IHtcbiAgICAgICAgbGV0IGZhbGxpbmdSZXN1bHQgPSBuZXcgRmFsbGluZ1Jlc3VsdCgpO1xuICAgICAgICBnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5mb3JFYWNoKChmYWxsaW5nRmlndXJlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlndXJlQ2FuRmFsbChnYW1lRGF0YS5tYXRyaXgsIGZhbGxpbmdGaWd1cmUpKSB7XG4gICAgICAgICAgICAgICAgZmFsbGluZ0ZpZ3VyZS5wb3NpdGlvbi55Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBmaWd1cmVHYW1lT3ZlclJlc3VsdCA9IHRoaXMudHJhbnNmZXJGaWd1cmVUb01hdHJpeChcbiAgICAgICAgICAgICAgICAgICAgZ2FtZURhdGEubWF0cml4LFxuICAgICAgICAgICAgICAgICAgICBmYWxsaW5nRmlndXJlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBmYWxsaW5nUmVzdWx0LnRyYW5zZmVycmVkRmlndXJlcy5wdXNoKC4uLmdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLnNwbGljZShpbmRleCwgMSkpO1xuICAgICAgICAgICAgICAgIGZhbGxpbmdSZXN1bHQuaXNHYW1lT3ZlciA9IGZhbGxpbmdSZXN1bHQuaXNHYW1lT3ZlciB8fCBmaWd1cmVHYW1lT3ZlclJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxsaW5nUmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlndXJlQ2FuRmFsbChtYXRyaXg6IGJvb2xlYW5bXVtdLCBmYWxsaW5nRmlndXJlOiBGYWxsaW5nRmlndXJlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgIGZhbGxpbmdGaWd1cmUuZmlndXJlLmdldFR1cm4oZmFsbGluZ0ZpZ3VyZS50dXJuU3RhdGUpLFxuICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmFsbGluZ0ZpZ3VyZS5wb3NpdGlvbi54LCBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnkgKyAxKSxcbiAgICAgICAgICAgIG1hdHJpeFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNmZXJGaWd1cmVUb01hdHJpeChtYXRyaXg6IGJvb2xlYW5bXVtdLCBmYWxsaW5nRmlndXJlOiBGYWxsaW5nRmlndXJlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIGZhbGxpbmdGaWd1cmUuZmlndXJlLmdldFR1cm4oZmFsbGluZ0ZpZ3VyZS50dXJuU3RhdGUpXG4gICAgICAgICAgICAuZm9yRWFjaCgocm93LCBmaWd1cmVDZWxsWSkgPT4ge1xuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsVmFsdWUsIGZpZ3VyZUNlbGxYKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2VsbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdHJpeFggPSBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnggKyBmaWd1cmVDZWxsWDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdHJpeFkgPSBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnkgKyBmaWd1cmVDZWxsWTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdHJpeFkgaW4gbWF0cml4XG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBtYXRyaXhYIGluIG1hdHJpeFttYXRyaXhZXVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgIW1hdHJpeFttYXRyaXhZXVttYXRyaXhYXVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdHJpeFttYXRyaXhZXVttYXRyaXhYXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpc0dhbWVPdmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3F1YXNoTGluZXMobWF0cml4OiBib29sZWFuW11bXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IGxpbmVzVG9TcXVhc2g6IG51bWJlcltdID0gW107XG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGxldCBjYW5CZVNxdWFzaGVkID0gcm93LmV2ZXJ5KGNlbGwgPT4gY2VsbCk7XG4gICAgICAgICAgICBpZiAoY2FuQmVTcXVhc2hlZCkge1xuICAgICAgICAgICAgICAgIGxpbmVzVG9TcXVhc2gucHVzaCh5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIGxpbmVzVG9TcXVhc2guZm9yRWFjaCh5ID0+IHtcbiAgICAgICAgICAgIG1hdHJpeC5zcGxpY2UoeSwgMSk7XG4gICAgICAgICAgICBtYXRyaXgudW5zaGlmdChuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbChmYWxzZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpbmVzVG9TcXVhc2g7XG4gICAgfVxufVxuIiwiZXhwb3J0IGVudW0gRmlndXJlVHVyblN0YXRlIHtcbiAgICBPbmUsXG4gICAgVHdvLFxuICAgIFRocmVlLFxuICAgIEZvdXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlndXJlIHtcbiAgICAvKipcbiAgICAgKiBBbnkgZmlndXJlIG11c3QgYmUgYWJsZSB0byB0dXJuIDQgdGltZXMgaW4gMiBkaW1lbnNpb25zLlxuICAgICAqIEFsbCB0dXJucyBhcmUgY2xvY2t3aXNlLlxuICAgICAqL1xuICAgIGdldFR1cm4oZmlndXJlVHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGUpOiBib29sZWFuW11bXTtcbiAgICBnZXRGaXJzdFR1cm4oKTogYm9vbGVhbltdW107XG4gICAgZ2V0U2Vjb25kVHVybigpOiBib29sZWFuW11bXTtcbiAgICBnZXRUaGlyZFR1cm4oKTogYm9vbGVhbltdW107XG4gICAgZ2V0Rm9ydGhUdXJuKCk6IGJvb2xlYW5bXVtdO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGaWd1cmUgaW1wbGVtZW50cyBGaWd1cmV7XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZpcnN0VHVybigpOiBib29sZWFuW11bXTtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U2Vjb25kVHVybigpOiBib29sZWFuW11bXTtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VGhpcmRUdXJuKCk6IGJvb2xlYW5bXVtdO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRGb3J0aFR1cm4oKTogYm9vbGVhbltdW107XG5cbiAgICBnZXRUdXJuKGZpZ3VyZVR1cm5TdGF0ZTogRmlndXJlVHVyblN0YXRlKTogYm9vbGVhbltdW10ge1xuICAgICAgICBzd2l0Y2ggKGZpZ3VyZVR1cm5TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuT25lOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpcnN0VHVybigpO1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuVHdvOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlY29uZFR1cm4oKTtcbiAgICAgICAgICAgIGNhc2UgRmlndXJlVHVyblN0YXRlLlRocmVlOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRoaXJkVHVybigpO1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuRm91cjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3J0aFR1cm4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIGdpdmVzIGFuIGVhc3kgd2F5IHRvIGRlZmluZSBmaWd1cmVzIGZvciB0ZXRyaXMuXG4gKiBKdXN0IGltcGxlbWVudCB0aGUgZ2V0RmlndXJlIG1ldGhvZCBhbmQgcmV0dXJuIGZpZ3VyZSBsaWtlIHRoaXM6XG4gKiBgYGAodHMpXG4gKiBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAqICAgICByZXR1cm4gW1xuICogICAgICAgICBbdHJ1ZSwgIHRydWUsIHRydWVdLFxuICogICAgICAgICBbZmFsc2UsIHRydWUsIGZhbHNlXSxcbiAqICAgICAgICAgW3RydWUsICB0cnVlLCB0cnVlXSxcbiAqICAgICBdO1xuICogfVxuICogYGBgXG4gKlxuICogT3IgZGVmaW5lIGl0IGxpa2UgdGhpcyBmb3IgbW9yZSB2aXN1YWwgcHJlc2VudGF0aW9uOlxuICogYGBgKHRzKVxuICogcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gKiAgICAgcmV0dXJuIFtcbiAqICAgICAgICAgXCIjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gKiAgICAgICAgIFwiLSMtXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICogICAgICAgICBcIiMjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAqICAgICBdO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUgZXh0ZW5kcyBBYnN0cmFjdEZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEZpZ3VyZSgpOiBib29sZWFuW11bXTtcblxuICAgIHByaXZhdGUgZ2V0Tm9ybWFsaXplZEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIGxldCBmaWd1cmUgPSB0aGlzLmdldEZpZ3VyZSgpO1xuICAgICAgICBsZXQgdGhlTG9uZ2VzdFJvd1NpemUgPSBmaWd1cmUucmVkdWNlKFxuICAgICAgICAgICAgKHByZXZpb3VzLCBjdXJyZW50KSA9PiBNYXRoLm1heChwcmV2aW91cywgY3VycmVudC5sZW5ndGgpLFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmlndXJlLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsTGVuZ3RoID0gcm93Lmxlbmd0aDtcbiAgICAgICAgICAgIHJvdy5sZW5ndGggPSB0aGVMb25nZXN0Um93U2l6ZTtcbiAgICAgICAgICAgIHJldHVybiByb3cuZmlsbChmYWxzZSwgb3JpZ2luYWxMZW5ndGggLSAxLCB0aGVMb25nZXN0Um93U2l6ZSAtIDEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Rmlyc3RUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9ybWFsaXplZEZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWNvbmRUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsRmlndXJlID0gdGhpcy5nZXROb3JtYWxpemVkRmlndXJlKCk7XG4gICAgICAgIGxldCB0dXJuZWRGaWd1cmU6IGJvb2xlYW5bXVtdID0gW107XG4gICAgICAgIGxldCBvcmlnaW5hbEZpZ3VyZUhlaWdodCA9IG9yaWdpbmFsRmlndXJlLmxlbmd0aDtcbiAgICAgICAgbGV0IG9yaWdpbmFsRmlndXJlV2lkdGggPSBvcmlnaW5hbEZpZ3VyZVswXS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgb3JpZ2luYWxGaWd1cmVXaWR0aDsgeCsrKSB7XG4gICAgICAgICAgICB0dXJuZWRGaWd1cmVbeF0gPSBuZXcgQXJyYXkob3JpZ2luYWxGaWd1cmVIZWlnaHQpLmZpbGwoZmFsc2UpO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBvcmlnaW5hbEZpZ3VyZUhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdHVybmVkRmlndXJlW3hdW29yaWdpbmFsRmlndXJlSGVpZ2h0IC0geSAtIDFdID0gb3JpZ2luYWxGaWd1cmVbeV1beF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR1cm5lZEZpZ3VyZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGhpcmRUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RUdXJuKCkucmV2ZXJzZSgpLm1hcChyb3cgPT4gcm93LnJldmVyc2UoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZvcnRoVHVybigpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNlY29uZFR1cm4oKS5yZXZlcnNlKCkubWFwKHJvdyA9PiByb3cucmV2ZXJzZSgpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBURmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCItIy1cIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmlnaHRMRmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCItLSNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVmdExGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgICAgICBcIiMtLVwiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTcXVhcmVGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgICAgIFwiIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RpY2tGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExaRmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiIyMtXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCItIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSWkZpZ3VyZSBleHRlbmRzIFNpbXBseVJvdGF0YWJsZUZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIi0jI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgICAgIFwiIyMtXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudCwgRmlndXJlc1NwYXduZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0ZpZ3VyZVR1cm5TdGF0ZX0gZnJvbSBcIi4uL0ZpZ3VyZXNcIjtcbmltcG9ydCB7Q29vcmRpbmF0ZSwgRmFsbGluZ0ZpZ3VyZSwgR2FtZURhdGF9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7Q29tbWFuZEJ1cywgQ29tbWFuZFR5cGUsIEluaXRHYW1lQ29tbWFuZH0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vVXRpbHMvRW51bUhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQWx3YXlzT25lRmlndXJlU3Bhd25lciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEhhbmRsZXIoZXZlbnQ6IEluaXRHYW1lQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKFxuICAgICAgICAgICAgRXZlbnRUeXBlLkZhbGxpbmdUaWNrUHJvY2Vzc2VkLFxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT25GYWxsVGljay5iaW5kKHRoaXMpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc09uRmFsbFRpY2soZXZlbnQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRGaWd1cmUoZXZlbnQuZ2FtZURhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRmlndXJlKGdhbWVEYXRhOiBHYW1lRGF0YSk6IHZvaWQge1xuICAgICAgICBpZiAoZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMubGVuZ3RoID4gMCB8fCBnYW1lRGF0YS5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWd1cmVJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVEYXRhLnNldHRpbmdzLmZpZ3VyZXMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZmlndXJlID0gZ2FtZURhdGEuc2V0dGluZ3MuZmlndXJlc1tmaWd1cmVJbmRleF07XG4gICAgICAgIGNvbnN0IHR1cm5TdGF0ZSA9IEVudW1IZWxwZXIuR2V0UmFuZG9tKEZpZ3VyZVR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbnN0IGZpZ3VyZU1hdHJpeCA9IGZpZ3VyZS5nZXRUdXJuKHR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbnN0IGZpZ3VyZVdpZHRoID0gTWF0aC5tYXgoLi4uZmlndXJlTWF0cml4Lm1hcChyb3cgPT4gcm93Lmxlbmd0aCkpO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoXG4gICAgICAgICAgICBNYXRoLmNlaWwoZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aCAvIDIgLSBmaWd1cmVXaWR0aCAvIDIpIC0gMSxcbiAgICAgICAgICAgIC1maWd1cmVNYXRyaXgubGVuZ3RoLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmYWxsaW5nRmlndXJlID0gbmV3IEZhbGxpbmdGaWd1cmUoXG4gICAgICAgICAgICBmaWd1cmUsXG4gICAgICAgICAgICBjb29yZGluYXRlLFxuICAgICAgICAgICAgdHVyblN0YXRlXG4gICAgICAgICk7XG4gICAgICAgIGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLnB1c2goZmFsbGluZ0ZpZ3VyZSk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmlndXJlc1NwYXduZWRFdmVudChnYW1lRGF0YSwgW2ZhbGxpbmdGaWd1cmVdKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtUaW1pbmdzSGFuZGxlcn0gZnJvbSBcIi4vVGltaW5nc0hhbmRsZXIvVGltaW5nc0hhbmRsZXJcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudCwgRmlndXJlc01vdmVkRXZlbnQsIEdhbWVPdmVyRXZlbnR9IGZyb20gXCIuL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBGaWd1cmVzRmFsbFRpY2tDb21tYW5kLCBJbml0R2FtZUNvbW1hbmQsIFBhdXNlR2FtZUNvbW1hbmQsIFJlbmRlckNvbW1hbmQsIFJlc3VtZUdhbWVDb21tYW5kfSBmcm9tIFwiLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICAgIHByaXZhdGUgZ2FtZURhdGE6IEdhbWVEYXRhID0gR2FtZURhdGEubWFrZVNpbXBsZSgpO1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIHRpbWluZ3NIYW5kbGVyOiBUaW1pbmdzSGFuZGxlcixcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5SZXN1bWVHYW1lLCB0aGlzLnJlc3VtZUdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5QYXVzZUdhbWUsIHRoaXMucGF1c2VHYW1lSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuR2FtZU92ZXIsIHRoaXMuZ2FtZU92ZXJIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVEYXRhID0gY29tbWFuZC5nYW1lRGF0YTtcbiAgICAgICAgdGhpcy5nYW1lRGF0YS5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQsIHRoaXMub25GYWxsVGlja1Byb2Nlc3NlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3VtZUdhbWVIYW5kbGVyKGNvbW1hbmQ6IFJlc3VtZUdhbWVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZ2FtZURhdGEuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgSW5pdEdhbWVDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZhbGxUaWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXVzZUdhbWVIYW5kbGVyKGNvbW1hbmQ6IFBhdXNlR2FtZUNvbW1hbmQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IGNvbW1hbmQuZ2FtZURhdGE7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmdhbWVEYXRhLm5leHRUaWNrVGltZW91dElkKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgUmVuZGVyQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnYW1lT3ZlckhhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZURhdGEuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVEYXRhLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5nYW1lRGF0YS5uZXh0VGlja1RpbWVvdXRJZCk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgR2FtZU92ZXJFdmVudCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWxsVGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGV2ZW50OiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmdhbWVEYXRhLm5leHRUaWNrVGltZW91dElkKTtcbiAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLnRpbWluZ3NIYW5kbGVyLmdldERlbGF5Rm9yTmV4dFRpY2tNcyh0aGlzLmdhbWVEYXRhKTtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVEYXRhLmlzR2FtZU92ZXIgJiYgZGVsYXkgIT0gSW5maW5pdHkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZURhdGEubmV4dFRpY2tUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgIHRoaXMuZmFsbFRpY2suYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWluZ3NIYW5kbGVyLmdldERlbGF5Rm9yTmV4dFRpY2tNcyh0aGlzLmdhbWVEYXRhKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIFNxdWFzaGVkUm93c0NvdW50ZXJCYXNlZExldmVsQ291bnRlciB7XG4gICAgcHJpdmF0ZSBzcXVhc2hlZFJvd3NDb3VudGVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGxldmVsSW5jcmVhc2VPblNxdWFzaGVkUm93c051bWJlcjogbnVtYmVyLFxuICAgICAgICBwcml2YXRlIG1heExldmVsczogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Jbml0R2FtZSwgdGhpcy5wcm9jZXNzSW5pdEdhbWVDb21tYW5kLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzSW5pdEdhbWVDb21tYW5kKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGV2ZW50OiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3F1YXNoZWRSb3dzQ291bnRlcisrO1xuICAgICAgICBpZiAodGhpcy5zcXVhc2hlZFJvd3NDb3VudGVyID49IHRoaXMubGV2ZWxJbmNyZWFzZU9uU3F1YXNoZWRSb3dzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFzaGVkUm93c0NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgZXZlbnQuZ2FtZURhdGEubGV2ZWwgPSBNYXRoLm1pbih0aGlzLm1heExldmVscywgZXZlbnQuZ2FtZURhdGEubGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgQ29tbWFuZEJ1cyxcbiAgICBDb21tYW5kVHlwZSxcbiAgICBNb3ZlTGVmdENvbW1hbmQsXG4gICAgTW92ZVJpZ2h0Q29tbWFuZCxcbiAgICBUdXJuQ2xvY2t3aXNlQ29tbWFuZCxcbiAgICBNb3ZlRG93bkNvbW1hbmQsXG4gICAgRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCxcbiAgICBNb3ZlVG9YQ29tbWFuZCxcbiAgICBNb3ZlVG9ZQ29tbWFuZCxcbiAgICBUdXJuVG9TdGF0ZUNvbW1hbmRcbn0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVUdXJuU3RhdGV9IGZyb20gXCIuLi9GaWd1cmVzXCI7XG5pbXBvcnQge0V2ZW50QnVzLCBGaWd1cmVzTW92ZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmV9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi9VdGlscy9GaWd1cmVQbGFjaW5nQ2hlY2tlclwiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vVXRpbHMvRW51bUhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgTW92aW5nSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVMZWZ0LCB0aGlzLnByb2Nlc3NNb3ZlTGVmdENvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVSaWdodCwgdGhpcy5wcm9jZXNzTW92ZVJpZ2h0Q29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuTW92ZURvd24sIHRoaXMucHJvY2Vzc01vdmVEb3duQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuVHVybkNsb2Nrd2lzZSwgdGhpcy5wcm9jZXNzVHVybkNsb2Nrd2lzZUNvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVUb1gsIHRoaXMucHJvY2Vzc01vdmVUb1hDb21tYW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Nb3ZlVG9ZLCB0aGlzLnByb2Nlc3NNb3ZlVG9ZQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuVHVyblRvU3RhdGUsIHRoaXMucHJvY2Vzc1R1cm5Ub1N0YXRlQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlTGVmdENvbW1hbmQoY29tbWFuZDogTW92ZUxlZnRDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVNb3ZlZExlZnQgPSBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oZmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmlndXJlLnBvc2l0aW9uLnggLSAxLCBmaWd1cmUucG9zaXRpb24ueSksXG4gICAgICAgICAgICAgICAgY29tbWFuZC5nYW1lRGF0YS5tYXRyaXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoY2FuQmVNb3ZlZExlZnQpIHtcbiAgICAgICAgICAgICAgICBmaWd1cmUucG9zaXRpb24ueC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzTW92ZWRFdmVudChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzTW92ZVJpZ2h0Q29tbWFuZChjb21tYW5kOiBNb3ZlUmlnaHRDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVNb3ZlZFJpZ2h0ID0gRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoXG4gICAgICAgICAgICAgICAgZmlndXJlLmZpZ3VyZS5nZXRUdXJuKGZpZ3VyZS50dXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIG5ldyBDb29yZGluYXRlKGZpZ3VyZS5wb3NpdGlvbi54ICsgMSwgZmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEubWF0cml4XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGNhbkJlTW92ZWRSaWdodCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbi54Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NUdXJuQ2xvY2t3aXNlQ29tbWFuZChjb21tYW5kOiBUdXJuQ2xvY2t3aXNlQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbGxUdXJuU3RhdGVzID0gRW51bUhlbHBlci5Ub0FycmF5KEZpZ3VyZVR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgbGV0IG5leHRUdXJuU3RhdGUgPSBmaWd1cmUudHVyblN0YXRlICsgMTtcbiAgICAgICAgICAgIGlmICghKG5leHRUdXJuU3RhdGUgaW4gYWxsVHVyblN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICBuZXh0VHVyblN0YXRlID0gYWxsVHVyblN0YXRlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhbkJlVHVybmVkID0gRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoXG4gICAgICAgICAgICAgICAgZmlndXJlLmZpZ3VyZS5nZXRUdXJuKG5leHRUdXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVR1cm5lZCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS50dXJuU3RhdGUgPSBuZXh0VHVyblN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzTW92ZWRFdmVudChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzTW92ZURvd25Db21tYW5kKGNvbW1hbmQ6IE1vdmVEb3duQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBGaWd1cmVzRmFsbFRpY2tDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlVG9YQ29tbWFuZChjb21tYW5kOiBNb3ZlVG9YQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBpZiAoY29tbWFuZC54IDwgMCB8fCBjb21tYW5kLnggPiAoY29tbWFuZC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZFdpZHRoIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb21tYW5kLmdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmZvckVhY2goZmlndXJlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vdmluZ01vZGlmaWVyID0gY29tbWFuZC54ID4gZmlndXJlLnBvc2l0aW9uLnggPyAxIDogLTE7XG4gICAgICAgICAgICB3aGlsZSAoZmlndXJlLnBvc2l0aW9uLnggIT09IGNvbW1hbmQueCAmJiBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oZmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmlndXJlLnBvc2l0aW9uLnggKyBtb3ZpbmdNb2RpZmllciwgZmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEubWF0cml4XG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgZmlndXJlLnBvc2l0aW9uLnggKz0gbW92aW5nTW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlVG9ZQ29tbWFuZChjb21tYW5kOiBNb3ZlVG9ZQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBpZiAoY29tbWFuZC55IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGZpZ3VyZS5wb3NpdGlvbi55IDwgY29tbWFuZC55ICYmIEZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5maWd1cmUuZ2V0VHVybihmaWd1cmUudHVyblN0YXRlKSxcbiAgICAgICAgICAgICAgICBuZXcgQ29vcmRpbmF0ZShmaWd1cmUucG9zaXRpb24ueCwgZmlndXJlLnBvc2l0aW9uLnkgKyAxKSxcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbi55Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NUdXJuVG9TdGF0ZUNvbW1hbmQoY29tbWFuZDogVHVyblRvU3RhdGVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVUdXJuZWQgPSBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oY29tbWFuZC50dXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVR1cm5lZCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS50dXJuU3RhdGUgPSBjb21tYW5kLnR1cm5TdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmlndXJlc01vdmVkRXZlbnQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIEZhbGxUaWNrU2NvcmVDb3VudGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBzcXVhc2hlZFJvd3NSZXdhcmRUaHJlc2hvbGRzTWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcChbXG4gICAgICAgICAgICBbMSwgMTAwXSxcbiAgICAgICAgICAgIFsyLCAzMDBdLFxuICAgICAgICAgICAgWzMsIDUwMF0sXG4gICAgICAgICAgICBbNCwgODAwXSxcbiAgICAgICAgXSksXG4gICAgICAgIHByaXZhdGUgcmV3YXJkT25Db21ibyA9IDUwLFxuICAgICkge1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxpbmdUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GYWxsaW5nVGlja1Byb2Nlc3NlZChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuc3F1YXNoZWRMaW5lcy5sZW5ndGggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJldmlvdXNUaHJlc2hvbGRSZXdhcmQgPSAwO1xuICAgICAgICB0aGlzLnNxdWFzaGVkUm93c1Jld2FyZFRocmVzaG9sZHNNYXAuZm9yRWFjaCgocmV3YXJkLCByb3dzU3F1YXNoZWRUaHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChyb3dzU3F1YXNoZWRUaHJlc2hvbGQgPiBldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzVGhyZXNob2xkUmV3YXJkID0gcmV3YXJkO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuZ2FtZURhdGEuc2NvcmUgKz1cbiAgICAgICAgICAgIHByZXZpb3VzVGhyZXNob2xkUmV3YXJkICogZXZlbnQuZ2FtZURhdGEubGV2ZWxcbiAgICAgICAgICAgICsgdGhpcy5yZXdhcmRPbkNvbWJvICogTWF0aC5tYXgoMCwgZXZlbnQuZ2FtZURhdGEuY29tYm8gLSAxKSAqIGV2ZW50LmdhbWVEYXRhLmxldmVsXG4gICAgICAgICAgICArIGV2ZW50LmRyb3BwZWRMaW5lcyAqIDIgKiBldmVudC5nYW1lRGF0YS5sZXZlbDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdGF0c0NvdW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICkge1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxpbmdUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GYWxsaW5nVGlja1Byb2Nlc3NlZChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkge1xuICAgICAgICBldmVudC5nYW1lRGF0YS5zdGF0cy5maWd1cmVzRmFsbGVuICs9IGV2ZW50LnRyYW5zZmVycmVkVG9NYXRyaXhGaWd1cmVzLmxlbmd0aDtcbiAgICAgICAgZXZlbnQuZ2FtZURhdGEuc3RhdHMubGluZXNTcXVhc2hlZCArPSBldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aDtcbiAgICB9XG59XG4iLCJpbXBvcnQge1RpbWluZ3NIYW5kbGVyfSBmcm9tIFwiLi9UaW1pbmdzSGFuZGxlclwiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgQ29uc3RUaW1pbmdzSGFuZGxlciBpbXBsZW1lbnRzIFRpbWluZ3NIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRlbGF5TXM6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBnZXREZWxheUZvck5leHRUaWNrTXMoZ2FtZURhdGE6IEdhbWVEYXRhKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsYXlNcztcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRW51bUhlbHBlciB7XG4gICAgcHVibGljIHN0YXRpYyBUb0FycmF5KHZhbDogYW55KTogdHlwZW9mIHZhbFtdIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbClcbiAgICAgICAgICAgIC5tYXAobiA9PiBOdW1iZXIucGFyc2VJbnQobikpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gIU51bWJlci5pc05hTihuKSkgYXMgdW5rbm93biBhcyB0eXBlb2YgdmFsW107XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBHZXRSYW5kb20odmFsOiBhbnkpOiB0eXBlb2YgdmFsIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gRW51bUhlbHBlci5Ub0FycmF5KHZhbCk7XG4gICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsdWVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNbcmFuZG9tSW5kZXhdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29vcmRpbmF0ZX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgRmlndXJlUGxhY2luZ0NoZWNrZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgY2FuRmlndXJlQmVQbGFjZWQodGFyZ2V0RmlndXJlTWF0cml4OiBib29sZWFuW11bXSwgdGFyZ2V0UG9zaXRpb246IENvb3JkaW5hdGUsIG1hdHJpeDogYm9vbGVhbltdW10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldEZpZ3VyZU1hdHJpeC5ldmVyeSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcm93LmV2ZXJ5KCh2YWx1ZSwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxZID0gdGFyZ2V0UG9zaXRpb24ueSArIHk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFggPSB0YXJnZXRQb3NpdGlvbi54ICsgeDtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHx8IChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxZIDwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmVhbFggPj0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmVhbFggPD0gbWF0cml4WzBdLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICAgICAgKSB8fCAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsWSBpbiBtYXRyaXhcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHJlYWxYIGluIG1hdHJpeFtyZWFsWV1cbiAgICAgICAgICAgICAgICAgICAgICAgICYmICFtYXRyaXhbcmVhbFldW3JlYWxYXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29vcmRpbmF0ZSwgRmFsbGluZ0ZpZ3VyZX0gZnJvbSBcIi4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlVHVyblN0YXRlfSBmcm9tIFwiLi4vVGV0cmlzL0ZpZ3VyZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGaWd1cmVQbGFjaW5nU3RlcCB7XG4gICAgZ2V0IHBlcnNpc3RlZCgpOiBib29sZWFuLFxufVxuXG5leHBvcnQgY2xhc3MgVHVyblBsYWNpbmdTdGVwIGltcGxlbWVudHMgRmlndXJlUGxhY2luZ1N0ZXB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0YXJnZXQ6IEZpZ3VyZVR1cm5TdGF0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcGVyc2lzdGVkOiBib29sZWFuLFxuICAgICkge31cblxuICAgIGdldCBwZXJzaXN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJzaXN0ZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZVhQbGFjaW5nU3RlcCBpbXBsZW1lbnRzIEZpZ3VyZVBsYWNpbmdTdGVwe1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdGFyZ2V0OiBudW1iZXIsXG4gICAgICAgIHByaXZhdGUgX3BlcnNpc3RlZDogYm9vbGVhbixcbiAgICApIHt9XG5cbiAgICBnZXQgcGVyc2lzdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVyc2lzdGVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVZUGxhY2luZ1N0ZXAgaW1wbGVtZW50cyBGaWd1cmVQbGFjaW5nU3RlcHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHRhcmdldDogbnVtYmVyLFxuICAgICkge31cblxuICAgIGdldCBwZXJzaXN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEcm9wUGxhY2luZ1N0ZXAgaW1wbGVtZW50cyBGaWd1cmVQbGFjaW5nU3RlcHtcbiAgICBnZXQgcGVyc2lzdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlndXJlUGxhY2luZ1Jlc3VsdCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBmaWd1cmVzVGFyZ2V0U3RhdGVzOiBNYXA8RmFsbGluZ0ZpZ3VyZSwgRmFsbGluZ0ZpZ3VyZT4sXG4gICAgICAgIHB1YmxpYyBwbGFjaW5nU3RlcHM6IEZpZ3VyZVBsYWNpbmdTdGVwW10sXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgSG9sZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIGNlbGxzOiBDb29yZGluYXRlW10sXG4gICAgKSB7fVxufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ1Jlc3VsdH0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgUGxhY2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvciBleHRlbmRzIFBsYWNpbmdFcnJvciB7fVxuZXhwb3J0IGNsYXNzIEluY29uc2lzdGVudFRhcmdldFN0YXRlRXJyb3IgZXh0ZW5kcyBQbGFjaW5nRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBOb3RTdXBwb3J0ZWREaXJlY3Rpb25TdGVwRXJyb3IgZXh0ZW5kcyBQbGFjaW5nRXJyb3Ige31cblxuZXhwb3J0IGludGVyZmFjZSBGaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlIHtcbiAgICAvKipcbiAgICAgKiBAdGhyb3dzIFBsYWNpbmdFcnJvclxuICAgICAqL1xuICAgIHBsYWNlKGdhbWVEYXRhOiBHYW1lRGF0YSwgcGxhY2luZ1Jlc3VsdD86IEZpZ3VyZVBsYWNpbmdSZXN1bHQpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7XG4gICAgQ29tbWFuZEJ1cyxcbiAgICBEcm9wRmlndXJlc0NvbW1hbmQsXG4gICAgTW92ZURvd25Db21tYW5kLFxuICAgIE1vdmVMZWZ0Q29tbWFuZCxcbiAgICBNb3ZlUmlnaHRDb21tYW5kLFxuICAgIE1vdmVUb1hDb21tYW5kLFxuICAgIE1vdmVUb1lDb21tYW5kLFxuICAgIFR1cm5DbG9ja3dpc2VDb21tYW5kLFxuICAgIFR1cm5Ub1N0YXRlQ29tbWFuZFxufSBmcm9tIFwiLi4vLi4vVGV0cmlzL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtEcm9wUGxhY2luZ1N0ZXAsIEZpZ3VyZVBsYWNpbmdSZXN1bHQsIE1vdmVYUGxhY2luZ1N0ZXAsIE1vdmVZUGxhY2luZ1N0ZXAsIFR1cm5QbGFjaW5nU3RlcH0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlLCBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvciwgSW5jb25zaXN0ZW50VGFyZ2V0U3RhdGVFcnJvciwgTm90U3VwcG9ydGVkRGlyZWN0aW9uU3RlcEVycm9yfSBmcm9tIFwiLi9GaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnN0YW50RmlndXJlUGxhY2luZ1BlcmZvcm1lciBpbXBsZW1lbnRzIEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIHBsYWNlKGdhbWVEYXRhOiBHYW1lRGF0YSwgcGxhY2luZ1Jlc3VsdD86IEZpZ3VyZVBsYWNpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gdGhpcy5wbGFjZUltcGwoZ2FtZURhdGEsIHBsYWNpbmdSZXN1bHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGFjZUltcGwoZ2FtZURhdGEsIHBsYWNpbmdSZXN1bHQpLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGxhY2VJbXBsKGdhbWVEYXRhOiBHYW1lRGF0YSwgcGxhY2luZ1Jlc3VsdD86IEZpZ3VyZVBsYWNpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjaW5nUmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbEZpZ3VyZSA9IGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzWzBdO1xuICAgICAgICBjb25zdCB0YXJnZXRGaWd1cmUgPSBwbGFjaW5nUmVzdWx0LmZpZ3VyZXNUYXJnZXRTdGF0ZXMuZ2V0KG9yaWdpbmFsRmlndXJlKTtcbiAgICAgICAgaWYgKCF0YXJnZXRGaWd1cmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcmlnaW5hbEZpZ3VyZS5maWd1cmUgIT09IHRhcmdldEZpZ3VyZS5maWd1cmUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbmNvbnNpc3RlbnRUYXJnZXRTdGF0ZUVycm9yKFwiQm90aCBvZiB0aGUgb3JpZ2luYWwgYW5kIHRoZSB0YXJnZXQgZmFsbGluZyBmaWd1cmVzIG11c3QgaGF2ZSB0aGUgc2FtZSBmaWd1cmUgaW4gaXQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhY2luZ1Jlc3VsdC5wbGFjaW5nU3RlcHMuZm9yRWFjaChzdGVwID0+IHtcbiAgICAgICAgICAgIGlmIChzdGVwIGluc3RhbmNlb2YgVHVyblBsYWNpbmdTdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgVHVyblRvU3RhdGVDb21tYW5kKGdhbWVEYXRhLCBzdGVwLnRhcmdldCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwIGluc3RhbmNlb2YgTW92ZVhQbGFjaW5nU3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IE1vdmVUb1hDb21tYW5kKGdhbWVEYXRhLCBzdGVwLnRhcmdldCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwIGluc3RhbmNlb2YgTW92ZVlQbGFjaW5nU3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IE1vdmVUb1lDb21tYW5kKGdhbWVEYXRhLCBzdGVwLnRhcmdldCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwIGluc3RhbmNlb2YgRHJvcFBsYWNpbmdTdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgRHJvcEZpZ3VyZXNDb21tYW5kKGdhbWVEYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RTdXBwb3J0ZWREaXJlY3Rpb25TdGVwRXJyb3IoXCJVbmtub3duIHN0ZXAgXCIgKyBzdGVwLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmUsIEdhbWVEYXRhfSBmcm9tIFwiLi4vLi4vVGV0cmlzL0NvbW1vblwiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vLi4vVGV0cmlzL1V0aWxzL0VudW1IZWxwZXJcIjtcbmltcG9ydCB7RmlndXJlVHVyblN0YXRlfSBmcm9tIFwiLi4vLi4vVGV0cmlzL0ZpZ3VyZXNcIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi8uLi9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXJcIjtcbmltcG9ydCB7Q29tbWFuZEJ1cywgUmVuZGVyQ29tbWFuZH0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RHJvcFBsYWNpbmdTdGVwLCBGaWd1cmVQbGFjaW5nUmVzdWx0LCBGaWd1cmVQbGFjaW5nU3RlcCwgTW92ZVhQbGFjaW5nU3RlcCwgTW92ZVlQbGFjaW5nU3RlcCwgVHVyblBsYWNpbmdTdGVwfSBmcm9tIFwiLi4vQ29tbW9uXCI7XG5pbXBvcnQge0NhbGN1bGF0b3JBZ2dyZWdhdGV9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3IvQ2FsY3VsYXRvckFnZ3JlZ2F0ZVwiO1xuaW1wb3J0IHtIb2xlc0hlbHBlcn0gZnJvbSBcIi4uL1V0aWxzL0hvbGVzSGVscGVyXCI7XG5pbXBvcnQge0NhbGN1bGF0ZVNjb3JlUmVxdWVzdH0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvci9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuY2xhc3MgUGxhY2VSZXNvbHZpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cblxuY2xhc3MgR2FtZVN0YXRlTm90U3VwcG9ydGVkRXJyb3IgZXh0ZW5kcyBQbGFjZVJlc29sdmluZ0Vycm9yIHtcbn1cblxuZXhwb3J0IGNsYXNzIEZpZ3VyZVBsYWNpbmdSZXNvbHZlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBzY29yZUNhbGN1bGF0b3I6IENhbGN1bGF0b3JBZ2dyZWdhdGUsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIHJlc29sdmUoZ2FtZURhdGE6IEdhbWVEYXRhKTogRmlndXJlUGxhY2luZ1Jlc3VsdHx1bmRlZmluZWQge1xuICAgICAgICBpZiAoZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdhbWVTdGF0ZU5vdFN1cHBvcnRlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWd1cmUgPSBnYW1lRGF0YS5mYWxsaW5nRmlndXJlc1swXTtcblxuICAgICAgICBsZXQgbWF4U2NvcmUgPSAtSW5maW5pdHk7XG4gICAgICAgIGxldCB0aGVCZXN0UmVzdWx0ID0gbmV3IEZpZ3VyZVBsYWNpbmdSZXN1bHQobmV3IE1hcCgpLCBbXSk7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzU3RhdGVzKGdhbWVEYXRhLCAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSwgc2NvcmU6IG51bWJlciwgcGxhY2luZ0RpcmVjdGlvbnM6IEZpZ3VyZVBsYWNpbmdTdGVwW10pID0+IHtcbiAgICAgICAgICAgIGlmIChzY29yZSA+IG1heFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgbWF4U2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgICAgICB0aGVCZXN0UmVzdWx0ID0gbmV3IEZpZ3VyZVBsYWNpbmdSZXN1bHQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNYXAoW1tvcmlnaW5hbEZpZ3VyZSwgaW1hZ2luYWJsZUZpZ3VyZV1dKSxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2luZ0RpcmVjdGlvbnNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGxldCBkZWJ1Z01vZGUgPSB0cnVlO1xuICAgICAgICAvKmxldCBkZWJ1Z01vZGUgPSAnZGVidWdNb2RlJyBpbiB3aW5kb3cgJiYgd2luZG93LmRlYnVnTW9kZTtcbiAgICAgICAgbGV0IGltYWdpbmFibGVGaWd1cmUgPSB0aGVCZXN0UmVzdWx0LmZpZ3VyZXNUYXJnZXRTdGF0ZXMuZ2V0KG9yaWdpbmFsRmlndXJlKTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiBpbWFnaW5hYmxlRmlndXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBmYWtlR2FtZURhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZ2FtZURhdGEpO1xuICAgICAgICAgICAgaW1hZ2luYWJsZUZpZ3VyZS5jb2xvciA9ICcjZjAwJztcbiAgICAgICAgICAgIGZha2VHYW1lRGF0YS5mYWxsaW5nRmlndXJlcyA9IFtpbWFnaW5hYmxlRmlndXJlXTtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFJlbmRlckNvbW1hbmQoZmFrZUdhbWVEYXRhKSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1N0YXRlcyhnYW1lRGF0YSwgdW5kZWZpbmVkLCAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSkgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdpbmFibGVGaWd1cmUuY29sb3IgPSAnIzAwZic7XG4gICAgICAgICAgICAgICAgZmFrZUdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzID0gW2ltYWdpbmFibGVGaWd1cmVdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFJlbmRlckNvbW1hbmQoZmFrZUdhbWVEYXRhKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9Ki9cblxuICAgICAgICByZXR1cm4gdGhlQmVzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NTdGF0ZXMoXG4gICAgICAgIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgb25BZnRlclNjb3JlQ2FsY3VsYXRlcz86IChpbWFnaW5hYmxlRmlndXJlOiBGYWxsaW5nRmlndXJlLCBzY29yZTogbnVtYmVyLCBwbGFjaW5nRGlyZWN0aW9uczogRmlndXJlUGxhY2luZ1N0ZXBbXSkgPT4gdm9pZCxcbiAgICAgICAgb25CZWZvcmVTY29yZUNhbGN1bGF0ZXM/OiAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSkgPT4gdm9pZCxcbiAgICApIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWd1cmUgPSBnYW1lRGF0YS5mYWxsaW5nRmlndXJlc1swXTtcblxuICAgICAgICBsZXQgZW51bXMgPSBFbnVtSGVscGVyLlRvQXJyYXkoRmlndXJlVHVyblN0YXRlKTtcbiAgICAgICAgd2hpbGUgKGVudW1zWzBdICE9PSBvcmlnaW5hbEZpZ3VyZS50dXJuU3RhdGUpIHtcbiAgICAgICAgICAgIGVudW1zLnVuc2hpZnQoZW51bXMucG9wKCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXRyaWNlczogTWFwPEZpZ3VyZVR1cm5TdGF0ZSwgYm9vbGVhbltdW10+ID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgc3RyaW5neU1hdHJpY2VzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgICAgICAgZW51bXMuZm9yRWFjaCh0dXJuU3RhdGUgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZ3VyZU1hdHJpeCA9IG9yaWdpbmFsRmlndXJlLmZpZ3VyZS5nZXRUdXJuKHR1cm5TdGF0ZSk7XG4gICAgICAgICAgICBsZXQgc3RyaW5neUZpZ3VyZU1hdHJpeCA9IGZpZ3VyZU1hdHJpeC5tYXAocm93ID0+IHJvdy5tYXAodmFsID0+IHZhbCA/IFwiMVwiIDogXCIwXCIpLmpvaW4oKSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIGlmICghc3RyaW5neU1hdHJpY2VzLmhhcyhzdHJpbmd5RmlndXJlTWF0cml4KSkge1xuICAgICAgICAgICAgICAgIHN0cmluZ3lNYXRyaWNlcy5hZGQoc3RyaW5neUZpZ3VyZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbWF0cmljZXMuc2V0KHR1cm5TdGF0ZSwgZmlndXJlTWF0cml4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxNYXRyaXhIb2xlcyA9IEhvbGVzSGVscGVyLmNvbGxlY3RIb2xlcyhnYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbENvdmVyZWRDb2x1bW5zID0gSG9sZXNIZWxwZXIuY29sbGVjdENvdmVyZWRDb2x1bW5zKGdhbWVEYXRhLm1hdHJpeCk7XG5cbiAgICAgICAgbWF0cmljZXMuZm9yRWFjaCgoZmlndXJlTWF0cml4LCB0dXJuU3RhdGUpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aCAtIGZpZ3VyZU1hdHJpeFswXS5sZW5ndGggKyAxOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgW3ksIGltYWdpbmFibGVNYXRyaXhdID0gdGhpcy5pbWFnaW5lRmlndXJlRHJvcChnYW1lRGF0YS5tYXRyaXgsIGZpZ3VyZU1hdHJpeCwgeCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSh4LCB5KTtcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXNoZWRMaW5lc0NvdW50ID0gdGhpcy5zcXVhc2hMaW5lcyhpbWFnaW5hYmxlTWF0cml4KTtcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2luYWJsZUZpZ3VyZSA9IG5ldyBGYWxsaW5nRmlndXJlKG9yaWdpbmFsRmlndXJlLmZpZ3VyZSwgY29vcmRpbmF0ZSwgdHVyblN0YXRlKTtcbiAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVTY29yZUNhbGN1bGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVTY29yZUNhbGN1bGF0ZXMoaW1hZ2luYWJsZUZpZ3VyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMgPSBIb2xlc0hlbHBlci5jb2xsZWN0Q292ZXJlZENvbHVtbnMoaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0ZVNjb3JlUmVxdWVzdCA9IG5ldyBDYWxjdWxhdGVTY29yZVJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAgIGdhbWVEYXRhLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE1hdHJpeEhvbGVzLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENvdmVyZWRDb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICBpbWFnaW5hYmxlTWF0cml4LFxuICAgICAgICAgICAgICAgICAgICBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgIHNxdWFzaGVkTGluZXNDb3VudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5zY29yZUNhbGN1bGF0b3IuY2FsY3VsYXRlU2NvcmUoY2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IHRoaXMubWFrZVNpbXBsZVBsYWNpbmdTdGVwcyhpbWFnaW5hYmxlRmlndXJlKTtcbiAgICAgICAgICAgICAgICBpZiAob25BZnRlclNjb3JlQ2FsY3VsYXRlcykge1xuICAgICAgICAgICAgICAgICAgICBvbkFmdGVyU2NvcmVDYWxjdWxhdGVzKGltYWdpbmFibGVGaWd1cmUsIHNjb3JlLCBkaXJlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yaWdpbmFsTWF0cml4SG9sZXMuZmlsdGVyKGhvbGUgPT4gaG9sZS5pc09wZW5lZCAmJiBob2xlLmNlbGxzLmxlbmd0aCA+IDApLmZvckVhY2goaG9sZSA9PiB7XG4gICAgICAgICAgICBsZXQgdG9wWSA9IGdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnRYID0gZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aCxcbiAgICAgICAgICAgICAgICBib3R0b21ZID0gLTEsXG4gICAgICAgICAgICAgICAgcmlnaHRYID0gLTE7XG4gICAgICAgICAgICBob2xlLmNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgdG9wWSA9IE1hdGgubWluKHRvcFksIGNlbGwueSk7XG4gICAgICAgICAgICAgICAgbGVmdFggPSBNYXRoLm1pbihsZWZ0WCwgY2VsbC54KTtcbiAgICAgICAgICAgICAgICBib3R0b21ZID0gTWF0aC5tYXgoYm90dG9tWSwgY2VsbC55KTtcbiAgICAgICAgICAgICAgICByaWdodFggPSBNYXRoLm1heChyaWdodFgsIGNlbGwueCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0cmljZXMuZm9yRWFjaCgoZmlndXJlTWF0cml4LCB0dXJuU3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gTWF0aC5tYXgodG9wWSAtIGZpZ3VyZU1hdHJpeC5sZW5ndGggKyAxLCAwKTsgeSA8PSBib3R0b21ZOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IE1hdGgubWF4KGxlZnRYIC0gZmlndXJlTWF0cml4WzBdLmxlbmd0aCArIDEsIDApOyB4IDw9IHJpZ2h0WDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdpbmFibGVGaWd1cmUgPSBuZXcgRmFsbGluZ0ZpZ3VyZShvcmlnaW5hbEZpZ3VyZS5maWd1cmUsIGNvb3JkaW5hdGUsIHR1cm5TdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVTY29yZUNhbGN1bGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVNjb3JlQ2FsY3VsYXRlcyhpbWFnaW5hYmxlRmlndXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChmaWd1cmVNYXRyaXgsIGNvb3JkaW5hdGUsIGdhbWVEYXRhLm1hdHJpeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IHRoaXMubWFrZVB1c2hJblBsYWNpbmdTdGVwcyhnYW1lRGF0YSwgaW1hZ2luYWJsZUZpZ3VyZSwgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2luYWJsZU1hdHJpeCA9IHRoaXMuaW1hZ2luZUZpZ3VyZVBsYWNpbmcoZ2FtZURhdGEubWF0cml4LCBmaWd1cmVNYXRyaXgsIGNvb3JkaW5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXNoZWRMaW5lc0NvdW50ID0gdGhpcy5zcXVhc2hMaW5lcyhpbWFnaW5hYmxlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucyA9IEhvbGVzSGVscGVyLmNvbGxlY3RDb3ZlcmVkQ29sdW1ucyhpbWFnaW5hYmxlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0ZVNjb3JlUmVxdWVzdCA9IG5ldyBDYWxjdWxhdGVTY29yZVJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTWF0cml4SG9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENvdmVyZWRDb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZU1hdHJpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFzaGVkTGluZXNDb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLnNjb3JlQ2FsY3VsYXRvci5jYWxjdWxhdGVTY29yZShjYWxjdWxhdGVTY29yZVJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25BZnRlclNjb3JlQ2FsY3VsYXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlclNjb3JlQ2FsY3VsYXRlcyhpbWFnaW5hYmxlRmlndXJlLCBzY29yZSwgZGlyZWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcXVhc2hMaW5lcyhtYXRyaXg6IGJvb2xlYW5bXVtdKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGxpbmVzVG9TcXVhc2g6IG51bWJlcltdID0gW107XG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGxldCBjYW5CZVNxdWFzaGVkID0gcm93LmV2ZXJ5KGNlbGwgPT4gY2VsbCk7XG4gICAgICAgICAgICBpZiAoY2FuQmVTcXVhc2hlZCkge1xuICAgICAgICAgICAgICAgIGxpbmVzVG9TcXVhc2gucHVzaCh5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIGxpbmVzVG9TcXVhc2guZm9yRWFjaCh5ID0+IHtcbiAgICAgICAgICAgIG1hdHJpeC5zcGxpY2UoeSwgMSk7XG4gICAgICAgICAgICBtYXRyaXgudW5zaGlmdChuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbChmYWxzZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpbmVzVG9TcXVhc2gubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW1hZ2luZUZpZ3VyZURyb3AoZ2FtZU1hdHJpeDogYm9vbGVhbltdW10sIGZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10sIHRhcmdldFg6IG51bWJlcik6IFtudW1iZXIsIGJvb2xlYW5bXVtdXSB7XG4gICAgICAgIGxldCB0YXJnZXRZID0gLWZpZ3VyZU1hdHJpeC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChmaWd1cmVNYXRyaXgsIG5ldyBDb29yZGluYXRlKHRhcmdldFgsIHRhcmdldFkgKyAxKSwgZ2FtZU1hdHJpeCkpIHtcbiAgICAgICAgICAgIHRhcmdldFkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGFyZ2V0WSxcbiAgICAgICAgICAgIHRoaXMuaW1hZ2luZUZpZ3VyZVBsYWNpbmcoZ2FtZU1hdHJpeCwgZmlndXJlTWF0cml4LCBuZXcgQ29vcmRpbmF0ZSh0YXJnZXRYLCB0YXJnZXRZKSksXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbWFnaW5lRmlndXJlUGxhY2luZyhnYW1lTWF0cml4OiBib29sZWFuW11bXSwgZmlndXJlTWF0cml4OiBib29sZWFuW11bXSwgdGFyZ2V0Q29vcmRpbmF0ZTogQ29vcmRpbmF0ZSk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgbGV0IGltYWdpbmFibGVNYXRyaXg6IGJvb2xlYW5bXVtdID0gc3RydWN0dXJlZENsb25lKGdhbWVNYXRyaXgpO1xuICAgICAgICBmaWd1cmVNYXRyaXguZm9yRWFjaCgocm93LCBmaWd1cmVZKSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCBmaWd1cmVYKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFkgPSB0YXJnZXRDb29yZGluYXRlLnkgKyBmaWd1cmVZO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxYID0gdGFyZ2V0Q29vcmRpbmF0ZS54ICsgZmlndXJlWDtcbiAgICAgICAgICAgICAgICBpZiAocmVhbFkgaW4gaW1hZ2luYWJsZU1hdHJpeFxuICAgICAgICAgICAgICAgICAgICAmJiByZWFsWCBpbiBpbWFnaW5hYmxlTWF0cml4W3JlYWxZXVxuICAgICAgICAgICAgICAgICAgICAmJiB2YWxcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZU1hdHJpeFtyZWFsWV1bcmVhbFhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGltYWdpbmFibGVNYXRyaXg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUHVzaEluUGxhY2luZ1N0ZXBzKGdhbWVEYXRhOiBHYW1lRGF0YSwgaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSwgb3JpZ2luYWxDb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPik6IEZpZ3VyZVBsYWNpbmdTdGVwW10gfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgZmlndXJlTWF0cml4ID0gaW1hZ2luYWJsZUZpZ3VyZS5maWd1cmUuZ2V0VHVybihpbWFnaW5hYmxlRmlndXJlLnR1cm5TdGF0ZSk7XG4gICAgICAgIGxldCB0YXJnZXRYID0gSG9sZXNIZWxwZXIuZmluZFRoZVdheU91dEZyb21Ib2xlKGdhbWVEYXRhLm1hdHJpeCwgaW1hZ2luYWJsZUZpZ3VyZS5wb3NpdGlvbiwgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucywgZmlndXJlTWF0cml4KTtcbiAgICAgICAgaWYgKHRhcmdldFggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBuZXcgVHVyblBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUudHVyblN0YXRlLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBNb3ZlWFBsYWNpbmdTdGVwKHRhcmdldFgsIGZhbHNlKSxcbiAgICAgICAgICAgIG5ldyBNb3ZlWVBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUucG9zaXRpb24ueSksXG4gICAgICAgICAgICBuZXcgTW92ZVhQbGFjaW5nU3RlcChpbWFnaW5hYmxlRmlndXJlLnBvc2l0aW9uLngsIHRydWUpLFxuICAgICAgICAgICAgbmV3IERyb3BQbGFjaW5nU3RlcCgpLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZVNpbXBsZVBsYWNpbmdTdGVwcyhpbWFnaW5hYmxlRmlndXJlOiBGYWxsaW5nRmlndXJlKTogRmlndXJlUGxhY2luZ1N0ZXBbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBuZXcgVHVyblBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUudHVyblN0YXRlLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBNb3ZlWFBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUucG9zaXRpb24ueCwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgRHJvcFBsYWNpbmdTdGVwKCksXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4vU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxjdWxhdG9yQWdncmVnYXRlIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjYWxjdWxhdG9yczogU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlW11cbiAgICApIHt9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvcnMucmVkdWNlKChzY29yZSwgY2FsY3VsYXRvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNjb3JlICsgY2FsY3VsYXRvci5jYWxjdWxhdGVTY29yZShyZXF1ZXN0KTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7SG9sZX0gZnJvbSBcIi4uLy4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGZpZWxkSGVpZ2h0ID0gcmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodDtcbiAgICAgICAgY29uc3QgZmllbGRXaWR0aCA9IHJlcXVlc3QuZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aDtcbiAgICAgICAgY29uc3QgW2ZpbGxhYmxlQ2VsbHNDb3VudCwgZmlsbGFibGVIZWlnaHRdID0gdGhpcy5jYWxjdWxhdGVGaWxsYWJsZVNwYWNlKHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCwgZmllbGRXaWR0aCk7XG4gICAgICAgIGxldCBmaWxsYWJsZUNlbGxzU2NvcmUgPSAwO1xuICAgICAgICBpZiAoZmlsbGFibGVIZWlnaHQgPiA1KSB7XG4gICAgICAgICAgICBmaWxsYWJsZUNlbGxzU2NvcmUgPSAtZmlsbGFibGVDZWxsc0NvdW50ICogTWF0aC5wb3coZmlsbGFibGVDZWxsc0NvdW50LCBmaWxsYWJsZUNlbGxzQ291bnQgLyAoZmllbGRIZWlnaHQgKiBmaWVsZFdpZHRoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGxhYmxlQ2VsbHNTY29yZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUZpbGxhYmxlU3BhY2UobWF0cml4OiBib29sZWFuW11bXSwgZmllbGRXaWR0aDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1ucyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICBsZXQgZmlsbGFibGVDZWxsc0NvdW50ID0gMDtcbiAgICAgICAgbGV0IGZpbGxhYmxlSGVpZ2h0ID0gMDtcbiAgICAgICAgbWF0cml4LmV2ZXJ5KHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb3ZlcmVkQ29sdW1ucy5hZGQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWwgJiYgY292ZXJlZENvbHVtbnMuc2l6ZSA+IDAgJiYgIWNvdmVyZWRDb2x1bW5zLmhhcyh4KSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxsYWJsZUNlbGxzQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjb3ZlcmVkQ29sdW1ucy5zaXplIDwgZmllbGRXaWR0aCkge1xuICAgICAgICAgICAgICAgIGlmIChjb3ZlcmVkQ29sdW1ucy5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaWxsYWJsZUhlaWdodCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBbZmlsbGFibGVDZWxsc0NvdW50LCBmaWxsYWJsZUhlaWdodF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7SG9sZX0gZnJvbSBcIi4uLy4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvciBpbXBsZW1lbnRzIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZSB7XG4gICAgcHVibGljIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgIHJldHVybiAtaGVpZ2h0ICogTWF0aC5wb3coaGVpZ2h0LCBoZWlnaHQgLyByZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0KSAqIDM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIZWlnaHQobWF0cml4OiBib29sZWFuW11bXSk6IG51bWJlciB7XG4gICAgICAgIGxldCBsb3dlc3RFbXB0eVkgPSAtMTtcbiAgICAgICAgbWF0cml4LmV2ZXJ5KChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGlmIChyb3cuZXZlcnkodmFsID0+ICF2YWwpKSB7XG4gICAgICAgICAgICAgICAgbG93ZXN0RW1wdHlZID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hdHJpeC5sZW5ndGggLSBsb3dlc3RFbXB0eVkgLSAxO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEhvbGVzVjFDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBbaG9sZXNDb3VudCwgaG9sZXNDb3ZlcmVkSGVpZ2h0XSA9IHRoaXMuY2FsY3VsYXRlSG9sZXNBbmRDb3ZlcmVkSGVpZ2h0KHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCwgcmVxdWVzdC5nYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBjb25zdCBob2xlc0NvdW50RGVjcmVhc2UgPSByZXF1ZXN0Lm9yaWdpbmFsSG9sZXMubGVuZ3RoIC0gaG9sZXNDb3VudDtcbiAgICAgICAgbGV0IGhvbGVzU2NvcmU6IG51bWJlcjtcbiAgICAgICAgaWYgKGhvbGVzQ292ZXJlZEhlaWdodCA9PT0gMCB8fCBob2xlc0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBob2xlc1Njb3JlID0gKGhvbGVzQ291bnREZWNyZWFzZSA+IDAgPyBob2xlc0NvdW50RGVjcmVhc2UgKiAxNTAgOiBob2xlc0NvdW50RGVjcmVhc2UgKiA3MCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob2xlc1Njb3JlID0gKGhvbGVzQ291bnREZWNyZWFzZSA+IDAgPyBob2xlc0NvdW50RGVjcmVhc2UgKiAxNTAgOiBob2xlc0NvdW50RGVjcmVhc2UgKiA3MClcbiAgICAgICAgICAgICAgICAtIGhvbGVzQ292ZXJlZEhlaWdodCAqIE1hdGgucG93KGhvbGVzQ292ZXJlZEhlaWdodCwgaG9sZXNDb3ZlcmVkSGVpZ2h0IC8gKHJlcXVlc3QuZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRIZWlnaHQgKiBob2xlc0NvdW50KSkgKiA1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob2xlc1Njb3JlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSG9sZXNBbmRDb3ZlcmVkSGVpZ2h0KGltYWdpbmFibGVNYXRyaXg6IGJvb2xlYW5bXVtdLCByZWFsTWF0cml4OiBib29sZWFuW11bXSk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBjb25zdCBbb3JpZ2luYWxUaGVIaWdoZXN0SG9sZVksIG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWV0gPSB0aGlzLmNhbGN1bGF0ZVRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkocmVhbE1hdHJpeCk7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1uc1lzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj47XG4gICAgICAgIGxldCBob2xlc0NvdmVyZWRIZWlnaHRzU3VtID0gMDtcbiAgICAgICAgbGV0IGhvbGVzQ291bnQgPSAwO1xuICAgICAgICBpbWFnaW5hYmxlTWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgIWNvdmVyZWRDb2x1bW5zWXMuaGFzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdmVyZWRDb2x1bW5zWXMuc2V0KHgsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY292ZXJlZFkgPSBjb3ZlcmVkQ29sdW1uc1lzLmdldCh4KTtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZFkgIT09IHVuZGVmaW5lZCAmJiAhdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbGVzQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVZICE9PSB1bmRlZmluZWQgJiYgb3JpZ2luYWxUaGVIaWdoZXN0SG9sZUNvdmVyZWRZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5IDwgb3JpZ2luYWxUaGVIaWdoZXN0SG9sZVkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHRzU3VtICs9IHkgLSBjb3ZlcmVkWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY292ZXJlZFkgPCBvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHRzU3VtICs9IG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSAtIGNvdmVyZWRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW2hvbGVzQ291bnQsIGhvbGVzQ292ZXJlZEhlaWdodHNTdW1dO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWShtYXRyaXg6IGJvb2xlYW5bXVtdKTogW251bWJlcnx1bmRlZmluZWQsIG51bWJlcnx1bmRlZmluZWRdIHtcbiAgICAgICAgbGV0IHRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB0aGVIaWdoZXN0SG9sZVkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1uc1lzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj47XG4gICAgICAgIG1hdHJpeC5zb21lKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3cuc29tZSgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAhY292ZXJlZENvbHVtbnNZcy5oYXMoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnNZcy5zZXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjb3ZlcmVkWSA9IGNvdmVyZWRDb2x1bW5zWXMuZ2V0KHgpO1xuICAgICAgICAgICAgICAgIGlmIChjb3ZlcmVkWSAhPT0gdW5kZWZpbmVkICYmICF2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlSGlnaGVzdEhvbGVZID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSA9IGNvdmVyZWRZO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW3RoZUhpZ2hlc3RIb2xlWSwgdGhlSGlnaGVzdEhvbGVDb3ZlcmVkWV07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7SG9sZX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgcHVibGljIG9yaWdpbmFsSG9sZXM6IEhvbGVbXSxcbiAgICAgICAgcHVibGljIG9yaWdpbmFsQ292ZXJlZENvbHVtbnM6IE1hcDxudW1iZXIsIG51bWJlcj4sXG4gICAgICAgIHB1YmxpYyBpbWFnaW5hYmxlTWF0cml4OiBib29sZWFuW11bXSxcbiAgICAgICAgcHVibGljIGltYWdpbmFibGVDb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPixcbiAgICAgICAgcHVibGljIHNxdWFzaGVkTGluZXNDb3VudDogbnVtYmVyLFxuICAgICkge31cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlcjtcbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFNxdWFzaGVkUm93c0NhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0LnNxdWFzaGVkTGluZXNDb3VudCAqIDU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7SG9sZX0gZnJvbSBcIi4uLy4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgVHVubmVsc0NhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IFt0dW5uZWxzU3VtSGVpZ2h0LCB0dW5uZWxzQ291bnRdID0gdGhpcy5jYWxjdWxhdGVUdW5uZWxzRXhjZXB0VW5jb3ZlcmVkKHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCwgcmVxdWVzdC5nYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBsZXQgdHVubmVsc1Njb3JlOiBudW1iZXI7XG4gICAgICAgIGlmICh0dW5uZWxzQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHR1bm5lbHNTY29yZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0dW5uZWxzU2NvcmUgPSAtdHVubmVsc0NvdW50ICogNzBcbiAgICAgICAgICAgICAgICAtIHR1bm5lbHNTdW1IZWlnaHQgKiBNYXRoLnBvdyh0dW5uZWxzU3VtSGVpZ2h0LCB0dW5uZWxzU3VtSGVpZ2h0IC8gKHJlcXVlc3QuZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRIZWlnaHQgKiB0dW5uZWxzQ291bnQpKSAqIDc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR1bm5lbHNTY29yZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVR1bm5lbHNFeGNlcHRVbmNvdmVyZWQoaW1hZ2luYWJsZU1hdHJpeDogYm9vbGVhbltdW10sIHJlYWxNYXRyaXg6IGJvb2xlYW5bXVtdKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIGxldCByZWFsQ292ZXJlZENvbHVtbnMgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICAgICAgcmVhbE1hdHJpeC5ldmVyeSgocm93KSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZWFsQ292ZXJlZENvbHVtbnMuYWRkKHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgICAgIGxldCB0dW5uZWxzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj47XG4gICAgICAgIGNvbnN0IGZpZWxkV2lkdGggPSBpbWFnaW5hYmxlTWF0cml4WzBdLmxlbmd0aDtcbiAgICAgICAgaW1hZ2luYWJsZU1hdHJpeC5ldmVyeSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMuYWRkKHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdmFsXG4gICAgICAgICAgICAgICAgICAgICYmICFpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMuaGFzKHgpXG4gICAgICAgICAgICAgICAgICAgICYmICFyZWFsQ292ZXJlZENvbHVtbnMuaGFzKHgpXG4gICAgICAgICAgICAgICAgICAgICYmICh4ID09PSAwIHx8IGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5oYXMoeCAtIDEpKVxuICAgICAgICAgICAgICAgICAgICAmJiAoeCA9PT0gZmllbGRXaWR0aCAtIDEgfHwgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLmhhcyh4ICsgMSkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHR1bm5lbHMuc2V0KHgsICh0dW5uZWxzLmdldCh4KSB8fCAwKSArIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5zaXplIDwgZmllbGRXaWR0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB0dW5uZWxzU3VtSGVpZ2h0ID0gMDtcbiAgICAgICAgbGV0IHR1bm5lbHNDb3VudCA9IDA7XG4gICAgICAgIHR1bm5lbHMuZm9yRWFjaChoZWlnaHQgPT4ge1xuICAgICAgICAgICAgaWYgKGhlaWdodCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgdHVubmVsc1N1bUhlaWdodCArPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgdHVubmVsc0NvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW3R1bm5lbHNTdW1IZWlnaHQsIHR1bm5lbHNDb3VudF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudEJ1cywgRXZlbnRUeXBlLCBGaWd1cmVzU3Bhd25lZEV2ZW50fSBmcm9tIFwiLi4vVGV0cmlzL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9UZXRyaXMvQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5pbXBvcnQge0ZpZ3VyZVBsYWNpbmdSZXNvbHZlcn0gZnJvbSBcIi4vRmlndXJlUGxhY2luZ1Jlc29sdmVyL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlclwiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlfSBmcm9tIFwiLi9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0ZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFRldHJpc1NvbHZlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHByaXZhdGUgZmlndXJlUGxhY2luZ1Jlc29sdmVyOiBGaWd1cmVQbGFjaW5nUmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgZmlndXJlUGxhY2luZ1BlcmZvcm1lcjogRmlndXJlUGxhY2luZ1BlcmZvcm1lckludGVyZmFjZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GaWd1cmVzU3Bhd25lZCwgdGhpcy5vbkZpZ3VyZXNTcGF3bmVkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GaWd1cmVzU3Bhd25lZChldmVudDogRmlndXJlc1NwYXduZWRFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXRGYWxsaW5nRmlndXJlc1N0YXRlcyA9IHRoaXMuZmlndXJlUGxhY2luZ1Jlc29sdmVyLnJlc29sdmUoZXZlbnQuZ2FtZURhdGEpO1xuICAgICAgICB0aGlzLmZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIucGxhY2UoZXZlbnQuZ2FtZURhdGEsIHRhcmdldEZhbGxpbmdGaWd1cmVzU3RhdGVzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0hvbGV9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7Q29vcmRpbmF0ZX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi8uLi9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXJcIjtcblxuZXhwb3J0IGNsYXNzIEhvbGVzSGVscGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIGNvbGxlY3RIb2xlcyhtYXRyaXg6IGJvb2xlYW5bXVtdKTogSG9sZVtdIHtcbiAgICAgICAgbGV0IGhvbGVzOiBIb2xlW10gPSBbXTtcblxuICAgICAgICBjbGFzcyBIb2xlSW5Qcm9jZXNzIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjZWxsczogQ29vcmRpbmF0ZVtdID0gW10sXG4gICAgICAgICAgICAgICAgcHVibGljIHByZXZpb3VzUm93T3BlblhzOiBudW1iZXJbXSA9IFtdLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjdXJyZW50Um93T3BlblhzOiBudW1iZXJbXSA9IFtdLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjb250aW51ZXM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhvbGVzSW5Qcm9jZXNzOiBIb2xlSW5Qcm9jZXNzW10gPSBbXTtcbiAgICAgICAgbGV0IGNvdmVyZWRDb2x1bW5zOiBTZXQ8bnVtYmVyPiA9IG5ldyBTZXQoKTtcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgaG9sZXNJblByb2Nlc3MuZm9yRWFjaChob2xlID0+IGhvbGUuY29udGludWVzID0gZmFsc2UpO1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnMuYWRkKHgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY292ZXJlZENvbHVtbnMuaGFzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzaW5nSG9sZSA9IGhvbGVzSW5Qcm9jZXNzLmZpbmQoaG9sZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaG9sZS5wcmV2aW91c1Jvd09wZW5Ycy5zb21lKHByZXZYID0+IHByZXZYID09PSB4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChob2xlLmN1cnJlbnRSb3dPcGVuWHMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBob2xlLmN1cnJlbnRSb3dPcGVuWHNbaG9sZS5jdXJyZW50Um93T3BlblhzLmxlbmd0aCAtIDFdID09PSB4KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzaW5nSG9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZSA9IG5ldyBIb2xlSW5Qcm9jZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBob2xlc0luUHJvY2Vzcy5wdXNoKHByb2Nlc3NpbmdIb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5jdXJyZW50Um93T3BlblhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NpbmdIb2xlLmNlbGxzLnB1c2gobmV3IENvb3JkaW5hdGUoeCwgeSkpO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5jb250aW51ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5pc09wZW5lZCA9IHByb2Nlc3NpbmdIb2xlLmlzT3BlbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLmRvZXNUaGVXYXlPdXRGcm9tSG9sZUV4aXN0cyhtYXRyaXgsIG5ldyBDb29yZGluYXRlKHgsIHkpLCBjb3ZlcmVkQ29sdW1ucywgW1t0cnVlLCB0cnVlXV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGhvbGVzSW5Qcm9ncmVzc1RvUmVtb3ZlOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgaG9sZXNJblByb2Nlc3MuZm9yRWFjaCgoaG9sZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChob2xlLmNvbnRpbnVlcykge1xuICAgICAgICAgICAgICAgICAgICBob2xlLnByZXZpb3VzUm93T3BlblhzID0gaG9sZS5jdXJyZW50Um93T3BlblhzO1xuICAgICAgICAgICAgICAgICAgICBob2xlLmN1cnJlbnRSb3dPcGVuWHMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFob2xlLmNvbnRpbnVlcyB8fCB5ID09IG1hdHJpeC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbGVzLnB1c2gobmV3IEhvbGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBob2xlLmlzT3BlbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZS5jZWxscyxcbiAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgIGhvbGVzSW5Qcm9ncmVzc1RvUmVtb3ZlLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBob2xlc0luUHJvZ3Jlc3NUb1JlbW92ZS5yZXZlcnNlKCkuZm9yRWFjaChpID0+IGhvbGVzSW5Qcm9jZXNzLnNwbGljZShpLCAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaG9sZXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBkb2VzVGhlV2F5T3V0RnJvbUhvbGVFeGlzdHMobWF0cml4OiBib29sZWFuW11bXSwgaW5pdGlhbENvb3JkaW5hdGU6IENvb3JkaW5hdGUsIGNvdmVyZWRDb2x1bW5zOiBTZXQ8bnVtYmVyPiwgZmlndXJlTWF0cml4OiBib29sZWFuW11bXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kVGhlV2F5T3V0RnJvbUhvbGUobWF0cml4LCBpbml0aWFsQ29vcmRpbmF0ZSwgY292ZXJlZENvbHVtbnMsIGZpZ3VyZU1hdHJpeCkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbmRUaGVXYXlPdXRGcm9tSG9sZShtYXRyaXg6IGJvb2xlYW5bXVtdLCBpbml0aWFsQ29vcmRpbmF0ZTogQ29vcmRpbmF0ZSwgY292ZXJlZENvbHVtbnM6IFNldDxudW1iZXI+fE1hcDxudW1iZXIsIG51bWJlcj4sIGZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10pOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIGNvdmVyZWRDb2x1bW5zID0gSG9sZXNIZWxwZXIuY29udmVydENvdmVyZWRDb2x1bW5zVG9Ycyhjb3ZlcmVkQ29sdW1ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHJ5aW5nIHRvIGZpbmQgdGhlIHdheSBvdXQgZnJvbSB0aGUgbGVmdCBzaWRlXG4gICAgICAgIGxldCB0YXJnZXRYQ2FuZGlkYXRlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAobGV0IHggPSBpbml0aWFsQ29vcmRpbmF0ZS54IC0gMTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgICAgIGlmICghRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoZmlndXJlTWF0cml4LCBuZXcgQ29vcmRpbmF0ZSh4LCBpbml0aWFsQ29vcmRpbmF0ZS55KSwgbWF0cml4KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGFsbENvbHVtbnNGcmVlVG9GYWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGNoZWNrRmFsbFggPSB4ICsgZmlndXJlTWF0cml4WzBdLmxlbmd0aCAtIDE7IGNoZWNrRmFsbFggPj0geDsgY2hlY2tGYWxsWC0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyZWRDb2x1bW5zLmhhcyhjaGVja0ZhbGxYKSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxDb2x1bW5zRnJlZVRvRmFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsQ29sdW1uc0ZyZWVUb0ZhbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyeWluZyB0byBmaW5kIHRoZSB3YXkgb3V0IGZyb20gdGhlIHJpZ2h0IHNpZGVcbiAgICAgICAgZm9yIChsZXQgeCA9IGluaXRpYWxDb29yZGluYXRlLnggKyAxOyB4IDwgbWF0cml4WzBdLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICBpZiAoIUZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKGZpZ3VyZU1hdHJpeCwgbmV3IENvb3JkaW5hdGUoeCwgaW5pdGlhbENvb3JkaW5hdGUueSksIG1hdHJpeCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBhbGxDb2x1bW5zRnJlZVRvRmFsbCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGVja0ZhbGxYID0geDsgY2hlY2tGYWxsWCA8IHggKyBmaWd1cmVNYXRyaXhbMF0ubGVuZ3RoOyBjaGVja0ZhbGxYKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMuaGFzKGNoZWNrRmFsbFgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbENvbHVtbnNGcmVlVG9GYWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxDb2x1bW5zRnJlZVRvRmFsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbGxlY3RDb3ZlcmVkQ29sdW1uc1hzKG1hdHJpeDogYm9vbGVhbltdW10sIHRvWT86IG51bWJlcik6IFNldDxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIEhvbGVzSGVscGVyLmNvbnZlcnRDb3ZlcmVkQ29sdW1uc1RvWHMoXG4gICAgICAgICAgICBIb2xlc0hlbHBlci5jb2xsZWN0Q292ZXJlZENvbHVtbnMobWF0cml4LCB0b1kpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvdmVyZWRDb2x1bW5zVG9Ycyhjb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPik6IFNldDxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQoWy4uLmNvdmVyZWRDb2x1bW5zLmtleXMoKV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDQv9GDIHg6IHlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbGxlY3RDb3ZlcmVkQ29sdW1ucyhtYXRyaXg6IGJvb2xlYW5bXVtdLCB0b1k/OiBudW1iZXIpOiBNYXA8bnVtYmVyLCBudW1iZXI+IHtcbiAgICAgICAgbGV0IGNvdmVyZWRDb2x1bW5zOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xuICAgICAgICBtYXRyaXguc29tZSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb3ZlcmVkQ29sdW1ucy5zZXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKHRvWSAhPT0gdW5kZWZpbmVkICYmIHkgPj0gdG9ZKVxuICAgICAgICAgICAgICAgIHx8IGNvdmVyZWRDb2x1bW5zLnNpemUgPT0gbWF0cml4WzBdLmxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3ZlcmVkQ29sdW1ucztcbiAgICB9XG59XG4iLCJpbXBvcnQge0V2ZW50QnVzfSBmcm9tIFwiLi4vVGV0cmlzL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIEluaXRHYW1lQ29tbWFuZCwgUGF1c2VHYW1lQ29tbWFuZCwgUmVzdW1lR2FtZUNvbW1hbmR9IGZyb20gXCIuLi9UZXRyaXMvQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5pbXBvcnQge0dhbWVDb250cm9sbGVyfSBmcm9tIFwiLi4vVGV0cmlzL0dhbWVDb250cm9sbGVyXCI7XG5pbXBvcnQge01vdmluZ0hhbmRsZXJ9IGZyb20gXCIuLi9UZXRyaXMvTW92aW5nSGFuZGxlci9Nb3ZpbmdIYW5kbGVyXCI7XG5pbXBvcnQge0Fsd2F5c09uZUZpZ3VyZVNwYXduZXJ9IGZyb20gXCIuLi9UZXRyaXMvRmlndXJlc1NwYXduZXIvQWx3YXlzT25lRmlndXJlU3Bhd25lclwiO1xuaW1wb3J0IHtTcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXJ9IGZyb20gXCIuLi9UZXRyaXMvTGV2ZWxDb3VudGVyL1NxdWFzaGVkUm93c0NvdW50ZXJCYXNlZExldmVsQ291bnRlclwiO1xuaW1wb3J0IHtDb21ib0NvdW50ZXJ9IGZyb20gXCIuLi9UZXRyaXMvQ29tYm9Db3VudGVyL0NvbWJvQ291bnRlclwiO1xuaW1wb3J0IHtGYWxsVGlja1Njb3JlQ291bnRlcn0gZnJvbSBcIi4uL1RldHJpcy9TY29yZUNvdW50ZXIvRmFsbFRpY2tTY29yZUNvdW50ZXJcIjtcbmltcG9ydCB7U3RhdHNDb3VudGVyfSBmcm9tIFwiLi4vVGV0cmlzL1N0YXRzQ291bnRlci9TdGF0c0NvdW50ZXJcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0NvbnN0VGltaW5nc0hhbmRsZXJ9IGZyb20gXCIuLi9UZXRyaXMvVGltaW5nc0hhbmRsZXIvQ29uc3RUaW1pbmdzSGFuZGxlclwiO1xuaW1wb3J0IHtUZXRyaXNTb2x2ZXJ9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvVGV0cmlzU29sdmVyXCI7XG5pbXBvcnQge0ZpZ3VyZVBsYWNpbmdSZXNvbHZlcn0gZnJvbSBcIi4uL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUmVzb2x2ZXIvRmlndXJlUGxhY2luZ1Jlc29sdmVyXCI7XG5pbXBvcnQge0NhbGN1bGF0b3JBZ2dyZWdhdGV9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0NhbGN1bGF0b3JBZ2dyZWdhdGVcIjtcbmltcG9ydCB7RmlsbGFibGVDZWxsc0NhbGN1bGF0b3J9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxhYmxlQ2VsbHMvRmlsbGFibGVDZWxsc0NhbGN1bGF0b3JcIjtcbmltcG9ydCB7RmlsbGVkSGVpZ2h0Q2FsY3VsYXRvcn0gZnJvbSBcIi4uL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3JcIjtcbmltcG9ydCB7SG9sZXNWMUNhbGN1bGF0b3J9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0hvbGVzL0hvbGVzVjFDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1NxdWFzaGVkUm93c0NhbGN1bGF0b3J9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1NxdWFzaGVkUm93cy9TcXVhc2hlZFJvd3NDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1R1bm5lbHNDYWxjdWxhdG9yfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9UdW5uZWxzL1R1bm5lbHNDYWxjdWxhdG9yXCI7XG5pbXBvcnQge0luc3RhbnRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL0ZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIvSW5zdGFudEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJcIjtcbmltcG9ydCB7UmVndWxhckZhbGxpbmdGaWd1cmVzUHJvY2Vzc29yfSBmcm9tIFwiLi4vVGV0cmlzL0ZhbGxpbmdGaWd1cmVzUHJvY2Vzc29yL1JlZ3VsYXJGYWxsaW5nRmlndXJlc1Byb2Nlc3NvclwiO1xuXG5leHBvcnQgY2xhc3MgQmVuY2hTb2x2ZXJGYWNhZGUge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cygpLFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXMgPSBuZXcgQ29tbWFuZEJ1cygpLFxuICAgICAgICBwcml2YXRlIGdhbWVDb250cm9sbGVyID0gbmV3IEdhbWVDb250cm9sbGVyKFxuICAgICAgICAgICAgbmV3IENvbnN0VGltaW5nc0hhbmRsZXIoSW5maW5pdHkpLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICApLFxuICAgICAgICBwcml2YXRlIG1vdmluZ0hhbmRsZXIgPSBuZXcgTW92aW5nSGFuZGxlcihcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBmYWxsaW5nRmlndXJlc1Byb2Nlc3NvciA9IG5ldyBSZWd1bGFyRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3IoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXNcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBmaWd1cmVzU3Bhd25lciA9IG5ldyBBbHdheXNPbmVGaWd1cmVTcGF3bmVyKFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICApLFxuICAgICAgICBwcml2YXRlIGxldmVsQ291bnRlciA9IG5ldyBTcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXIoXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgMTUsXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgY29tYm9Db3VudGVyID0gbmV3IENvbWJvQ291bnRlcihcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBzY29yZUNvdW50ZXIgPSBuZXcgRmFsbFRpY2tTY29yZUNvdW50ZXIoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgc3RhdHNDb3VudGVyID0gbmV3IFN0YXRzQ291bnRlcihcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHVibGljIGdhbWVEYXRhID0gR2FtZURhdGEubWFrZVNpbXBsZSgpLFxuICAgICAgICBwdWJsaWMgdGV0cmlzU29sdmVyID0gbmV3IFRldHJpc1NvbHZlcihcbiAgICAgICAgICAgIGV2ZW50QnVzLFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgICAgIG5ldyBGaWd1cmVQbGFjaW5nUmVzb2x2ZXIoXG4gICAgICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgICAgICAgICBuZXcgQ2FsY3VsYXRvckFnZ3JlZ2F0ZShbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBGaWxsYWJsZUNlbGxzQ2FsY3VsYXRvcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvcigpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgSG9sZXNWMUNhbGN1bGF0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNxdWFzaGVkUm93c0NhbGN1bGF0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFR1bm5lbHNDYWxjdWxhdG9yKCksXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbmV3IEluc3RhbnRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyKGNvbW1hbmRCdXMpLFxuICAgICAgICApXG4gICAgKSB7fVxuXG4gICAgcHVibGljIHN0YXJ0KGdhbWVEYXRhPzogR2FtZURhdGEpIHtcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IGdhbWVEYXRhIHx8IEdhbWVEYXRhLm1ha2VTaW1wbGUoKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgSW5pdEdhbWVDb21tYW5kKHRoaXMuZ2FtZURhdGEpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgUmVzdW1lR2FtZUNvbW1hbmQodGhpcy5nYW1lRGF0YSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgUGF1c2VHYW1lQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiB3b3JrZXJwb29sLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vam9zZGVqb25nL3dvcmtlcnBvb2xcbiAqXG4gKiBPZmZsb2FkIHRhc2tzIHRvIGEgcG9vbCBvZiB3b3JrZXJzIG9uIG5vZGUuanMgYW5kIGluIHRoZSBicm93c2VyLlxuICpcbiAqIEB2ZXJzaW9uIDYuMy4xXG4gKiBAZGF0ZSAgICAyMDIyLTExLTA3XG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxNC0yMDIyIEpvcyBkZSBKb25nIDx3am9zZGVqb25nQGdtYWlsLmNvbT5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdFxuICogdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyXG4gKiB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndvcmtlcnBvb2xcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wid29ya2VycG9vbFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ3b3JrZXJwb29sXCJdID0gZmFjdG9yeSgpO1xufSkoKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKSwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gMzQ1OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBQcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMTkpO1xudmFyIFdvcmtlckhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc1MSk7XG52YXIgZW52aXJvbm1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgyOCk7XG52YXIgRGVidWdQb3J0QWxsb2NhdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MzMpO1xudmFyIERFQlVHX1BPUlRfQUxMT0NBVE9SID0gbmV3IERlYnVnUG9ydEFsbG9jYXRvcigpO1xuLyoqXG4gKiBBIHBvb2wgdG8gbWFuYWdlIHdvcmtlcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbc2NyaXB0XSAgIE9wdGlvbmFsIHdvcmtlciBzY3JpcHRcbiAqIEBwYXJhbSB7V29ya2VyUG9vbE9wdGlvbnN9IFtvcHRpb25zXSAgU2VlIGRvY3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQb29sKHNjcmlwdCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHNjcmlwdCA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLnNjcmlwdCA9IHNjcmlwdCB8fCBudWxsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgICBvcHRpb25zID0gc2NyaXB0O1xuICB9XG4gIHRoaXMud29ya2VycyA9IFtdOyAvLyBxdWV1ZSB3aXRoIGFsbCB3b3JrZXJzXG4gIHRoaXMudGFza3MgPSBbXTsgLy8gcXVldWUgd2l0aCB0YXNrcyBhd2FpdGluZyBleGVjdXRpb25cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5mb3JrQXJncyA9IE9iamVjdC5mcmVlemUob3B0aW9ucy5mb3JrQXJncyB8fCBbXSk7XG4gIHRoaXMuZm9ya09wdHMgPSBPYmplY3QuZnJlZXplKG9wdGlvbnMuZm9ya09wdHMgfHwge30pO1xuICB0aGlzLndvcmtlclRocmVhZE9wdHMgPSBPYmplY3QuZnJlZXplKG9wdGlvbnMud29ya2VyVGhyZWFkT3B0cyB8fCB7fSk7XG4gIHRoaXMuZGVidWdQb3J0U3RhcnQgPSBvcHRpb25zLmRlYnVnUG9ydFN0YXJ0IHx8IDQzMjEwO1xuICB0aGlzLm5vZGVXb3JrZXIgPSBvcHRpb25zLm5vZGVXb3JrZXI7XG4gIHRoaXMud29ya2VyVHlwZSA9IG9wdGlvbnMud29ya2VyVHlwZSB8fCBvcHRpb25zLm5vZGVXb3JrZXIgfHwgJ2F1dG8nO1xuICB0aGlzLm1heFF1ZXVlU2l6ZSA9IG9wdGlvbnMubWF4UXVldWVTaXplIHx8IEluZmluaXR5O1xuICB0aGlzLm9uQ3JlYXRlV29ya2VyID0gb3B0aW9ucy5vbkNyZWF0ZVdvcmtlciB8fCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG4gIHRoaXMub25UZXJtaW5hdGVXb3JrZXIgPSBvcHRpb25zLm9uVGVybWluYXRlV29ya2VyIHx8IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvLyBjb25maWd1cmF0aW9uXG4gIGlmIChvcHRpb25zICYmICdtYXhXb3JrZXJzJyBpbiBvcHRpb25zKSB7XG4gICAgdmFsaWRhdGVNYXhXb3JrZXJzKG9wdGlvbnMubWF4V29ya2Vycyk7XG4gICAgdGhpcy5tYXhXb3JrZXJzID0gb3B0aW9ucy5tYXhXb3JrZXJzO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWF4V29ya2VycyA9IE1hdGgubWF4KChlbnZpcm9ubWVudC5jcHVzIHx8IDQpIC0gMSwgMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgJ21pbldvcmtlcnMnIGluIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5taW5Xb3JrZXJzID09PSAnbWF4Jykge1xuICAgICAgdGhpcy5taW5Xb3JrZXJzID0gdGhpcy5tYXhXb3JrZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZGF0ZU1pbldvcmtlcnMob3B0aW9ucy5taW5Xb3JrZXJzKTtcbiAgICAgIHRoaXMubWluV29ya2VycyA9IG9wdGlvbnMubWluV29ya2VycztcbiAgICAgIHRoaXMubWF4V29ya2VycyA9IE1hdGgubWF4KHRoaXMubWluV29ya2VycywgdGhpcy5tYXhXb3JrZXJzKTsgLy8gaW4gY2FzZSBtaW5Xb3JrZXJzIGlzIGhpZ2hlciB0aGFuIG1heFdvcmtlcnNcbiAgICB9XG5cbiAgICB0aGlzLl9lbnN1cmVNaW5Xb3JrZXJzKCk7XG4gIH1cbiAgdGhpcy5fYm91bmROZXh0ID0gdGhpcy5fbmV4dC5iaW5kKHRoaXMpO1xuICBpZiAodGhpcy53b3JrZXJUeXBlID09PSAndGhyZWFkJykge1xuICAgIFdvcmtlckhhbmRsZXIuZW5zdXJlV29ya2VyVGhyZWFkcygpO1xuICB9XG59XG5cbi8qKlxuICogRXhlY3V0ZSBhIGZ1bmN0aW9uIG9uIGEgd29ya2VyLlxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICB2YXIgcG9vbCA9IG5ldyBQb29sKClcbiAqXG4gKiAgIC8vIGNhbGwgYSBmdW5jdGlvbiBhdmFpbGFibGUgb24gdGhlIHdvcmtlclxuICogICBwb29sLmV4ZWMoJ2ZpYm9uYWNjaScsIFs2XSlcbiAqXG4gKiAgIC8vIG9mZmxvYWQgYSBmdW5jdGlvblxuICogICBmdW5jdGlvbiBhZGQoYSwgYikge1xuICogICAgIHJldHVybiBhICsgYlxuICogICB9O1xuICogICBwb29sLmV4ZWMoYWRkLCBbMiwgNF0pXG4gKiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8vIG91dHB1dHMgNlxuICogICAgICAgfSlcbiAqICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICogICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gKiAgICAgICB9KTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZyB8IEZ1bmN0aW9ufSBtZXRob2QgIEZ1bmN0aW9uIG5hbWUgb3IgZnVuY3Rpb24uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGBtZXRob2RgIGlzIGEgc3RyaW5nLCB0aGUgY29ycmVzcG9uZGluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Qgb24gdGhlIHdvcmtlciB3aWxsIGJlIGV4ZWN1dGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGBtZXRob2RgIGlzIGEgRnVuY3Rpb24sIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGJlIHN0cmluZ2lmaWVkIGFuZCBleGVjdXRlZCB2aWEgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlcnMgYnVpbHQtaW4gZnVuY3Rpb24gYHJ1bihmbiwgYXJncylgLlxuICogQHBhcmFtIHtBcnJheX0gW3BhcmFtc10gIEZ1bmN0aW9uIGFyZ3VtZW50cyBhcHBsaWVkIHdoZW4gY2FsbGluZyB0aGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RXhlY09wdGlvbnN9IFtvcHRpb25zXSAgT3B0aW9ucyBvYmplY3RcbiAqIEByZXR1cm4ge1Byb21pc2UuPCosIEVycm9yPn0gcmVzdWx0XG4gKi9cblBvb2wucHJvdG90eXBlLmV4ZWMgPSBmdW5jdGlvbiAobWV0aG9kLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLy8gdmFsaWRhdGUgdHlwZSBvZiBhcmd1bWVudHNcbiAgaWYgKHBhcmFtcyAmJiAhQXJyYXkuaXNBcnJheShwYXJhbXMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkgZXhwZWN0ZWQgYXMgYXJndW1lbnQgXCJwYXJhbXNcIicpO1xuICB9XG4gIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgIHZhciByZXNvbHZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgICBpZiAodGhpcy50YXNrcy5sZW5ndGggPj0gdGhpcy5tYXhRdWV1ZVNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF4IHF1ZXVlIHNpemUgb2YgJyArIHRoaXMubWF4UXVldWVTaXplICsgJyByZWFjaGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgbmV3IHRhc2sgdG8gdGhlIHF1ZXVlXG4gICAgdmFyIHRhc2tzID0gdGhpcy50YXNrcztcbiAgICB2YXIgdGFzayA9IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICByZXNvbHZlcjogcmVzb2x2ZXIsXG4gICAgICB0aW1lb3V0OiBudWxsLFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH07XG4gICAgdGFza3MucHVzaCh0YXNrKTtcblxuICAgIC8vIHJlcGxhY2UgdGhlIHRpbWVvdXQgbWV0aG9kIG9mIHRoZSBQcm9taXNlIHdpdGggb3VyIG93bixcbiAgICAvLyB3aGljaCBzdGFydHMgdGhlIHRpbWVyIGFzIHNvb24gYXMgdGhlIHRhc2sgaXMgYWN0dWFsbHkgc3RhcnRlZFxuICAgIHZhciBvcmlnaW5hbFRpbWVvdXQgPSByZXNvbHZlci5wcm9taXNlLnRpbWVvdXQ7XG4gICAgcmVzb2x2ZXIucHJvbWlzZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChkZWxheSkge1xuICAgICAgaWYgKHRhc2tzLmluZGV4T2YodGFzaykgIT09IC0xKSB7XG4gICAgICAgIC8vIHRhc2sgaXMgc3RpbGwgcXVldWVkIC0+IHN0YXJ0IHRoZSB0aW1lciBsYXRlciBvblxuICAgICAgICB0YXNrLnRpbWVvdXQgPSBkZWxheTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVyLnByb21pc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0YXNrIGlzIGFscmVhZHkgYmVpbmcgZXhlY3V0ZWQgLT4gc3RhcnQgdGltZXIgaW1tZWRpYXRlbHlcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVGltZW91dC5jYWxsKHJlc29sdmVyLnByb21pc2UsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdHJpZ2dlciB0YXNrIGV4ZWN1dGlvblxuICAgIHRoaXMuX25leHQoKTtcbiAgICByZXR1cm4gcmVzb2x2ZXIucHJvbWlzZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gc2VuZCBzdHJpbmdpZmllZCBmdW5jdGlvbiBhbmQgZnVuY3Rpb24gYXJndW1lbnRzIHRvIHdvcmtlclxuICAgIHJldHVybiB0aGlzLmV4ZWMoJ3J1bicsIFtTdHJpbmcobWV0aG9kKSwgcGFyYW1zXSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24gb3Igc3RyaW5nIGV4cGVjdGVkIGFzIGFyZ3VtZW50IFwibWV0aG9kXCInKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBwcm94eSBmb3IgY3VycmVudCB3b3JrZXIuIFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsXG4gKiBtZXRob2RzIGF2YWlsYWJsZSBvbiB0aGUgd29ya2VyLiBUaGUgbWV0aG9kcyBhbHdheXMgcmV0dXJuIGEgcHJvbWlzZS5cbiAqXG4gKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3QsIEVycm9yPn0gcHJveHlcbiAqL1xuUG9vbC5wcm90b3R5cGUucHJveHkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gYXJndW1lbnRzIGV4cGVjdGVkJyk7XG4gIH1cbiAgdmFyIHBvb2wgPSB0aGlzO1xuICByZXR1cm4gdGhpcy5leGVjKCdtZXRob2RzJykudGhlbihmdW5jdGlvbiAobWV0aG9kcykge1xuICAgIHZhciBwcm94eSA9IHt9O1xuICAgIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBwcm94eVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcG9vbC5leGVjKG1ldGhvZCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBwcm94eTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGFycmF5IHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyBhIHByb3ZpZGVkIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBvbiBldmVyeSBlbGVtZW50IGluIHRoaXMgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgIEZ1bmN0aW9uIHRha2luZyB0d28gYXJndW1lbnRzOlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBjYWxsYmFjayhjdXJyZW50VmFsdWUsIGluZGV4KWBcbiAqIEByZXR1cm4ge1Byb21pc2UuPEFycmF5Pn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgIHdpdGggYW4gQXJyYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZWQgZm9yIGVhY2ggb2YgdGhlIGFycmF5IGVsZW1lbnRzLlxuICovXG4vKiBUT0RPOiBpbXBsZW1lbnQgbWFwXG5Qb29sLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrKSB7XG59O1xuKi9cblxuLyoqXG4gKiBHcmFiIHRoZSBmaXJzdCB0YXNrIGZyb20gdGhlIHF1ZXVlLCBmaW5kIGEgZnJlZSB3b3JrZXIsIGFuZCBhc3NpZ24gdGhlXG4gKiB3b3JrZXIgdG8gdGhlIHRhc2suXG4gKiBAcHJvdGVjdGVkXG4gKi9cblBvb2wucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy50YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgLy8gdGhlcmUgYXJlIHRhc2tzIGluIHRoZSBxdWV1ZVxuXG4gICAgLy8gZmluZCBhbiBhdmFpbGFibGUgd29ya2VyXG4gICAgdmFyIHdvcmtlciA9IHRoaXMuX2dldFdvcmtlcigpO1xuICAgIGlmICh3b3JrZXIpIHtcbiAgICAgIC8vIGdldCB0aGUgZmlyc3QgdGFzayBmcm9tIHRoZSBxdWV1ZVxuICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgIHZhciB0YXNrID0gdGhpcy50YXNrcy5zaGlmdCgpO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgdGFzayBpcyBzdGlsbCBwZW5kaW5nIChhbmQgbm90IGNhbmNlbGxlZCAtPiBwcm9taXNlIHJlamVjdGVkKVxuICAgICAgaWYgKHRhc2sucmVzb2x2ZXIucHJvbWlzZS5wZW5kaW5nKSB7XG4gICAgICAgIC8vIHNlbmQgdGhlIHJlcXVlc3QgdG8gdGhlIHdvcmtlclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHdvcmtlci5leGVjKHRhc2subWV0aG9kLCB0YXNrLnBhcmFtcywgdGFzay5yZXNvbHZlciwgdGFzay5vcHRpb25zKS50aGVuKG1lLl9ib3VuZE5leHQpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGlmIHRoZSB3b3JrZXIgY3Jhc2hlZCBhbmQgdGVybWluYXRlZCwgcmVtb3ZlIGl0IGZyb20gdGhlIHBvb2xcbiAgICAgICAgICBpZiAod29ya2VyLnRlcm1pbmF0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBtZS5fcmVtb3ZlV29ya2VyKHdvcmtlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBtZS5fbmV4dCgpOyAvLyB0cmlnZ2VyIG5leHQgdGFzayBpbiB0aGUgcXVldWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc3RhcnQgcXVldWVkIHRpbWVyIG5vd1xuICAgICAgICBpZiAodHlwZW9mIHRhc2sudGltZW91dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBwcm9taXNlLnRpbWVvdXQodGFzay50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHRhc2sgdGFrZW4gd2FzIGFscmVhZHkgY29tcGxldGUgKGVpdGhlciByZWplY3RlZCBvciByZXNvbHZlZCksIHNvIGp1c3QgdHJpZ2dlciBuZXh0IHRhc2sgaW4gdGhlIHF1ZXVlXG4gICAgICAgIG1lLl9uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEdldCBhbiBhdmFpbGFibGUgd29ya2VyLiBJZiBubyB3b3JrZXIgaXMgYXZhaWxhYmxlIGFuZCB0aGUgbWF4aW11bSBudW1iZXJcbiAqIG9mIHdvcmtlcnMgaXNuJ3QgeWV0IHJlYWNoZWQsIGEgbmV3IHdvcmtlciB3aWxsIGJlIGNyZWF0ZWQgYW5kIHJldHVybmVkLlxuICogSWYgbm8gd29ya2VyIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHdvcmtlcnMgaXMgcmVhY2hlZCxcbiAqIG51bGwgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBAcmV0dXJuIHtXb3JrZXJIYW5kbGVyIHwgbnVsbH0gd29ya2VyXG4gKiBAcHJpdmF0ZVxuICovXG5Qb29sLnByb3RvdHlwZS5fZ2V0V29ya2VyID0gZnVuY3Rpb24gKCkge1xuICAvLyBmaW5kIGEgbm9uLWJ1c3kgd29ya2VyXG4gIHZhciB3b3JrZXJzID0gdGhpcy53b3JrZXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgd29ya2VyID0gd29ya2Vyc1tpXTtcbiAgICBpZiAod29ya2VyLmJ1c3koKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfVxuICB9XG4gIGlmICh3b3JrZXJzLmxlbmd0aCA8IHRoaXMubWF4V29ya2Vycykge1xuICAgIC8vIGNyZWF0ZSBhIG5ldyB3b3JrZXJcbiAgICB3b3JrZXIgPSB0aGlzLl9jcmVhdGVXb3JrZXJIYW5kbGVyKCk7XG4gICAgd29ya2Vycy5wdXNoKHdvcmtlcik7XG4gICAgcmV0dXJuIHdvcmtlcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgd29ya2VyIGZyb20gdGhlIHBvb2wuXG4gKiBBdHRlbXB0cyB0byB0ZXJtaW5hdGUgd29ya2VyIGlmIG5vdCBhbHJlYWR5IHRlcm1pbmF0ZWQsIGFuZCBlbnN1cmVzIHRoZSBtaW5pbXVtXG4gKiBwb29sIHNpemUgaXMgbWV0LlxuICogQHBhcmFtIHtXb3JrZXJIYW5kbGVyfSB3b3JrZXJcbiAqIEByZXR1cm4ge1Byb21pc2U8V29ya2VySGFuZGxlcj59XG4gKiBAcHJvdGVjdGVkXG4gKi9cblBvb2wucHJvdG90eXBlLl9yZW1vdmVXb3JrZXIgPSBmdW5jdGlvbiAod29ya2VyKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIERFQlVHX1BPUlRfQUxMT0NBVE9SLnJlbGVhc2VQb3J0KHdvcmtlci5kZWJ1Z1BvcnQpO1xuICAvLyBfcmVtb3ZlV29ya2VyIHdpbGwgY2FsbCB0aGlzLCBidXQgd2UgbmVlZCBpdCB0byBiZSByZW1vdmVkIHN5bmNocm9ub3VzbHlcbiAgdGhpcy5fcmVtb3ZlV29ya2VyRnJvbUxpc3Qod29ya2VyKTtcbiAgLy8gSWYgbWluV29ya2VycyBzZXQsIHNwaW4gdXAgbmV3IHdvcmtlcnMgdG8gcmVwbGFjZSB0aGUgY3Jhc2hlZCBvbmVzXG4gIHRoaXMuX2Vuc3VyZU1pbldvcmtlcnMoKTtcbiAgLy8gdGVybWluYXRlIHRoZSB3b3JrZXIgKGlmIG5vdCBhbHJlYWR5IHRlcm1pbmF0ZWQpXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgd29ya2VyLnRlcm1pbmF0ZShmYWxzZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgbWUub25UZXJtaW5hdGVXb3JrZXIoe1xuICAgICAgICBmb3JrQXJnczogd29ya2VyLmZvcmtBcmdzLFxuICAgICAgICBmb3JrT3B0czogd29ya2VyLmZvcmtPcHRzLFxuICAgICAgICBzY3JpcHQ6IHdvcmtlci5zY3JpcHRcbiAgICAgIH0pO1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod29ya2VyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIHdvcmtlciBmcm9tIHRoZSBwb29sIGxpc3QuXG4gKiBAcGFyYW0ge1dvcmtlckhhbmRsZXJ9IHdvcmtlclxuICogQHByb3RlY3RlZFxuICovXG5Qb29sLnByb3RvdHlwZS5fcmVtb3ZlV29ya2VyRnJvbUxpc3QgPSBmdW5jdGlvbiAod29ya2VyKSB7XG4gIC8vIHJlbW92ZSBmcm9tIHRoZSBsaXN0IHdpdGggd29ya2Vyc1xuICB2YXIgaW5kZXggPSB0aGlzLndvcmtlcnMuaW5kZXhPZih3b3JrZXIpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdGhpcy53b3JrZXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xvc2UgYWxsIGFjdGl2ZSB3b3JrZXJzLiBUYXNrcyBjdXJyZW50bHkgYmVpbmcgZXhlY3V0ZWQgd2lsbCBiZSBmaW5pc2hlZCBmaXJzdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlPWZhbHNlXSAgIElmIGZhbHNlIChkZWZhdWx0KSwgdGhlIHdvcmtlcnMgYXJlIHRlcm1pbmF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGZpbmlzaGluZyBhbGwgdGFza3MgY3VycmVudGx5IGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy4gSWYgdHJ1ZSwgdGhlIHdvcmtlcnMgd2lsbCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlZCBpbW1lZGlhdGVseS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZW91dF0gICAgICAgIElmIHByb3ZpZGVkIGFuZCBub24temVybywgd29ya2VyIHRlcm1pbmF0aW9uIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGltZW91dCBpZiB3b3JrZXIgcHJvY2VzcyBoYXMgbm90IGJlZW4gdGVybWluYXRlZC5cbiAqIEByZXR1cm4ge1Byb21pc2UuPHZvaWQsIEVycm9yPn1cbiAqL1xuUG9vbC5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKGZvcmNlLCB0aW1lb3V0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy8gY2FuY2VsIGFueSBwZW5kaW5nIHRhc2tzXG4gIHRoaXMudGFza3MuZm9yRWFjaChmdW5jdGlvbiAodGFzaykge1xuICAgIHRhc2sucmVzb2x2ZXIucmVqZWN0KG5ldyBFcnJvcignUG9vbCB0ZXJtaW5hdGVkJykpO1xuICB9KTtcbiAgdGhpcy50YXNrcy5sZW5ndGggPSAwO1xuICB2YXIgZiA9IGZ1bmN0aW9uIGYod29ya2VyKSB7XG4gICAgREVCVUdfUE9SVF9BTExPQ0FUT1IucmVsZWFzZVBvcnQod29ya2VyLmRlYnVnUG9ydCk7XG4gICAgdGhpcy5fcmVtb3ZlV29ya2VyRnJvbUxpc3Qod29ya2VyKTtcbiAgfTtcbiAgdmFyIHJlbW92ZVdvcmtlciA9IGYuYmluZCh0aGlzKTtcbiAgdmFyIHByb21pc2VzID0gW107XG4gIHZhciB3b3JrZXJzID0gdGhpcy53b3JrZXJzLnNsaWNlKCk7XG4gIHdvcmtlcnMuZm9yRWFjaChmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgdmFyIHRlcm1Qcm9taXNlID0gd29ya2VyLnRlcm1pbmF0ZUFuZE5vdGlmeShmb3JjZSwgdGltZW91dCkudGhlbihyZW1vdmVXb3JrZXIpLmFsd2F5cyhmdW5jdGlvbiAoKSB7XG4gICAgICBtZS5vblRlcm1pbmF0ZVdvcmtlcih7XG4gICAgICAgIGZvcmtBcmdzOiB3b3JrZXIuZm9ya0FyZ3MsXG4gICAgICAgIGZvcmtPcHRzOiB3b3JrZXIuZm9ya09wdHMsXG4gICAgICAgIHNjcmlwdDogd29ya2VyLnNjcmlwdFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcHJvbWlzZXMucHVzaCh0ZXJtUHJvbWlzZSk7XG4gIH0pO1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBzdGF0aXN0aWNzIG9uIHRhc2tzIGFuZCB3b3JrZXJzLlxuICogQHJldHVybiB7e3RvdGFsV29ya2VyczogbnVtYmVyLCBidXN5V29ya2VyczogbnVtYmVyLCBpZGxlV29ya2VyczogbnVtYmVyLCBwZW5kaW5nVGFza3M6IG51bWJlciwgYWN0aXZlVGFza3M6IG51bWJlcn19IFJldHVybnMgYW4gb2JqZWN0IHdpdGggc3RhdGlzdGljc1xuICovXG5Qb29sLnByb3RvdHlwZS5zdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRvdGFsV29ya2VycyA9IHRoaXMud29ya2Vycy5sZW5ndGg7XG4gIHZhciBidXN5V29ya2VycyA9IHRoaXMud29ya2Vycy5maWx0ZXIoZnVuY3Rpb24gKHdvcmtlcikge1xuICAgIHJldHVybiB3b3JrZXIuYnVzeSgpO1xuICB9KS5sZW5ndGg7XG4gIHJldHVybiB7XG4gICAgdG90YWxXb3JrZXJzOiB0b3RhbFdvcmtlcnMsXG4gICAgYnVzeVdvcmtlcnM6IGJ1c3lXb3JrZXJzLFxuICAgIGlkbGVXb3JrZXJzOiB0b3RhbFdvcmtlcnMgLSBidXN5V29ya2VycyxcbiAgICBwZW5kaW5nVGFza3M6IHRoaXMudGFza3MubGVuZ3RoLFxuICAgIGFjdGl2ZVRhc2tzOiBidXN5V29ya2Vyc1xuICB9O1xufTtcblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgYSBtaW5pbXVtIG9mIG1pbldvcmtlcnMgaXMgdXAgYW5kIHJ1bm5pbmdcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUG9vbC5wcm90b3R5cGUuX2Vuc3VyZU1pbldvcmtlcnMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLm1pbldvcmtlcnMpIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy53b3JrZXJzLmxlbmd0aDsgaSA8IHRoaXMubWluV29ya2VyczsgaSsrKSB7XG4gICAgICB0aGlzLndvcmtlcnMucHVzaCh0aGlzLl9jcmVhdGVXb3JrZXJIYW5kbGVyKCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV3IFdvcmtlckhhbmRsZXIgYW5kIHBhc3MgYWxsIG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtXb3JrZXJIYW5kbGVyfVxuICogQHByaXZhdGVcbiAqL1xuUG9vbC5wcm90b3R5cGUuX2NyZWF0ZVdvcmtlckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdmVycmlkZW5QYXJhbXMgPSB0aGlzLm9uQ3JlYXRlV29ya2VyKHtcbiAgICBmb3JrQXJnczogdGhpcy5mb3JrQXJncyxcbiAgICBmb3JrT3B0czogdGhpcy5mb3JrT3B0cyxcbiAgICB3b3JrZXJUaHJlYWRPcHRzOiB0aGlzLndvcmtlclRocmVhZE9wdHMsXG4gICAgc2NyaXB0OiB0aGlzLnNjcmlwdFxuICB9KSB8fCB7fTtcbiAgcmV0dXJuIG5ldyBXb3JrZXJIYW5kbGVyKG92ZXJyaWRlblBhcmFtcy5zY3JpcHQgfHwgdGhpcy5zY3JpcHQsIHtcbiAgICBmb3JrQXJnczogb3ZlcnJpZGVuUGFyYW1zLmZvcmtBcmdzIHx8IHRoaXMuZm9ya0FyZ3MsXG4gICAgZm9ya09wdHM6IG92ZXJyaWRlblBhcmFtcy5mb3JrT3B0cyB8fCB0aGlzLmZvcmtPcHRzLFxuICAgIHdvcmtlclRocmVhZE9wdHM6IG92ZXJyaWRlblBhcmFtcy53b3JrZXJUaHJlYWRPcHRzIHx8IHRoaXMud29ya2VyVGhyZWFkT3B0cyxcbiAgICBkZWJ1Z1BvcnQ6IERFQlVHX1BPUlRfQUxMT0NBVE9SLm5leHRBdmFpbGFibGVTdGFydGluZ0F0KHRoaXMuZGVidWdQb3J0U3RhcnQpLFxuICAgIHdvcmtlclR5cGU6IHRoaXMud29ya2VyVHlwZVxuICB9KTtcbn07XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgdGhlIG1heFdvcmtlcnMgb3B0aW9uIGlzIGFuIGludGVnZXIgPj0gMVxuICogQHBhcmFtIHsqfSBtYXhXb3JrZXJzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJucyB0cnVlIG1heFdvcmtlcnMgaGFzIGEgdmFsaWQgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVNYXhXb3JrZXJzKG1heFdvcmtlcnMpIHtcbiAgaWYgKCFpc051bWJlcihtYXhXb3JrZXJzKSB8fCAhaXNJbnRlZ2VyKG1heFdvcmtlcnMpIHx8IG1heFdvcmtlcnMgPCAxKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIG1heFdvcmtlcnMgbXVzdCBiZSBhbiBpbnRlZ2VyIG51bWJlciA+PSAxJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCB0aGUgbWluV29ya2VycyBvcHRpb24gaXMgYW4gaW50ZWdlciA+PSAwXG4gKiBAcGFyYW0geyp9IG1pbldvcmtlcnNcbiAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm5zIHRydWUgd2hlbiBtaW5Xb3JrZXJzIGhhcyBhIHZhbGlkIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlTWluV29ya2VycyhtaW5Xb3JrZXJzKSB7XG4gIGlmICghaXNOdW1iZXIobWluV29ya2VycykgfHwgIWlzSW50ZWdlcihtaW5Xb3JrZXJzKSB8fCBtaW5Xb3JrZXJzIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09wdGlvbiBtaW5Xb3JrZXJzIG11c3QgYmUgYW4gaW50ZWdlciBudW1iZXIgPj0gMCcpO1xuICB9XG59XG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgdmFyaWFibGUgaXMgYSBudW1iZXJcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm5zIHRydWUgd2hlbiB2YWx1ZSBpcyBhIG51bWJlclxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBudW1iZXIgaXMgYW4gaW50ZWdlclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHZhbHVlIGlzIGFuIGludGVnZXJcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKSA9PSB2YWx1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gUG9vbDtcblxuLyoqKi8gfSksXG5cbi8qKiovIDIxOTpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLyoqXG4gKiBQcm9taXNlXG4gKlxuICogSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vUnViYVhhLzg1MDEzNTkgZnJvbSBSdWJhWGEgPHRyYXNoQHJ1YmF4YS5vcmc+XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciAgIENhbGxlZCBhcyBoYW5kbGVyKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKVxuICogQHBhcmFtIHtQcm9taXNlfSBbcGFyZW50XSAgIFBhcmVudCBwcm9taXNlIGZvciBwcm9wYWdhdGlvbiBvZiBjYW5jZWwgYW5kIHRpbWVvdXRcbiAqL1xuZnVuY3Rpb24gUHJvbWlzZShoYW5kbGVyLCBwYXJlbnQpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdDb25zdHJ1Y3RvciBtdXN0IGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgb3BlcmF0b3InKTtcbiAgfVxuICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0Z1bmN0aW9uIHBhcmFtZXRlciBoYW5kbGVyKHJlc29sdmUsIHJlamVjdCkgbWlzc2luZycpO1xuICB9XG4gIHZhciBfb25TdWNjZXNzID0gW107XG4gIHZhciBfb25GYWlsID0gW107XG5cbiAgLy8gc3RhdHVzXG4gIHRoaXMucmVzb2x2ZWQgPSBmYWxzZTtcbiAgdGhpcy5yZWplY3RlZCA9IGZhbHNlO1xuICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIG9uU3VjY2VzcyBhbmQgb25GYWlsIGNhbGxiYWNrczogYWRkIHRoZW0gdG8gdGhlIHF1ZXVlLlxuICAgKiBPbmNlIHRoZSBwcm9taXNlIGlzIHJlc29sdmUsIHRoZSBmdW5jdGlvbiBfcHJvbWlzZSBpcyByZXBsYWNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblN1Y2Nlc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25GYWlsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB2YXIgX3Byb2Nlc3MgPSBmdW5jdGlvbiBfcHJvY2VzcyhvblN1Y2Nlc3MsIG9uRmFpbCkge1xuICAgIF9vblN1Y2Nlc3MucHVzaChvblN1Y2Nlc3MpO1xuICAgIF9vbkZhaWwucHVzaChvbkZhaWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gb25TdWNjZXNzIGNhbGxiYWNrIGFuZCBvcHRpb25hbGx5IGFuIG9uRmFpbCBjYWxsYmFjayB0byB0aGUgUHJvbWlzZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblN1Y2Nlc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uRmFpbF1cbiAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2VcbiAgICovXG4gIHRoaXMudGhlbiA9IGZ1bmN0aW9uIChvblN1Y2Nlc3MsIG9uRmFpbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcyA9IG9uU3VjY2VzcyA/IF90aGVuKG9uU3VjY2VzcywgcmVzb2x2ZSwgcmVqZWN0KSA6IHJlc29sdmU7XG4gICAgICB2YXIgZiA9IG9uRmFpbCA/IF90aGVuKG9uRmFpbCwgcmVzb2x2ZSwgcmVqZWN0KSA6IHJlamVjdDtcbiAgICAgIF9wcm9jZXNzKHMsIGYpO1xuICAgIH0sIG1lKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgKiBAcGFyYW0geyp9IHJlc3VsdFxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICB2YXIgX3Jlc29sdmUyID0gZnVuY3Rpb24gX3Jlc29sdmUocmVzdWx0KSB7XG4gICAgLy8gdXBkYXRlIHN0YXR1c1xuICAgIG1lLnJlc29sdmVkID0gdHJ1ZTtcbiAgICBtZS5yZWplY3RlZCA9IGZhbHNlO1xuICAgIG1lLnBlbmRpbmcgPSBmYWxzZTtcbiAgICBfb25TdWNjZXNzLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICBmbihyZXN1bHQpO1xuICAgIH0pO1xuICAgIF9wcm9jZXNzID0gZnVuY3Rpb24gX3Byb2Nlc3Mob25TdWNjZXNzLCBvbkZhaWwpIHtcbiAgICAgIG9uU3VjY2VzcyhyZXN1bHQpO1xuICAgIH07XG4gICAgX3Jlc29sdmUyID0gX3JlamVjdDIgPSBmdW5jdGlvbiBfcmVqZWN0KCkge307XG4gICAgcmV0dXJuIG1lO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZWplY3QgdGhlIHByb21pc2VcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgdmFyIF9yZWplY3QyID0gZnVuY3Rpb24gX3JlamVjdChlcnJvcikge1xuICAgIC8vIHVwZGF0ZSBzdGF0dXNcbiAgICBtZS5yZXNvbHZlZCA9IGZhbHNlO1xuICAgIG1lLnJlamVjdGVkID0gdHJ1ZTtcbiAgICBtZS5wZW5kaW5nID0gZmFsc2U7XG4gICAgX29uRmFpbC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgZm4oZXJyb3IpO1xuICAgIH0pO1xuICAgIF9wcm9jZXNzID0gZnVuY3Rpb24gX3Byb2Nlc3Mob25TdWNjZXNzLCBvbkZhaWwpIHtcbiAgICAgIG9uRmFpbChlcnJvcik7XG4gICAgfTtcbiAgICBfcmVzb2x2ZTIgPSBfcmVqZWN0MiA9IGZ1bmN0aW9uIF9yZWplY3QoKSB7fTtcbiAgICByZXR1cm4gbWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbmNlbCB0ZSBwcm9taXNlLiBUaGlzIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIHdpdGggYSBDYW5jZWxsYXRpb25FcnJvclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gc2VsZlxuICAgKi9cbiAgdGhpcy5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LmNhbmNlbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcmVqZWN0MihuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoKSk7XG4gICAgfVxuICAgIHJldHVybiBtZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IGEgdGltZW91dCBmb3IgdGhlIHByb21pc2UuIElmIHRoZSBwcm9taXNlIGlzIG5vdCByZXNvbHZlZCB3aXRoaW5cbiAgICogdGhlIHRpbWUsIHRoZSBwcm9taXNlIHdpbGwgYmUgY2FuY2VsbGVkIGFuZCBhIFRpbWVvdXRFcnJvciBpcyB0aHJvd24uXG4gICAqIElmIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIGluIHRpbWUsIHRoZSB0aW1lb3V0IGlzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAgICAgRGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBzZWxmXG4gICAqL1xuICB0aGlzLnRpbWVvdXQgPSBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQudGltZW91dChkZWxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfcmVqZWN0MihuZXcgVGltZW91dEVycm9yKCdQcm9taXNlIHRpbWVkIG91dCBhZnRlciAnICsgZGVsYXkgKyAnIG1zJykpO1xuICAgICAgfSwgZGVsYXkpO1xuICAgICAgbWUuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbWU7XG4gIH07XG5cbiAgLy8gYXR0YWNoIGhhbmRsZXIgcGFzc2luZyB0aGUgcmVzb2x2ZSBhbmQgcmVqZWN0IGZ1bmN0aW9uc1xuICBoYW5kbGVyKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBfcmVzb2x2ZTIocmVzdWx0KTtcbiAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgX3JlamVjdDIoZXJyb3IpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBFeGVjdXRlIGdpdmVuIGNhbGxiYWNrLCB0aGVuIGNhbGwgcmVzb2x2ZS9yZWplY3QgYmFzZWQgb24gdGhlIHJldHVybmVkIHJlc3VsdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3RoZW4oY2FsbGJhY2ssIHJlc29sdmUsIHJlamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzID0gY2FsbGJhY2socmVzdWx0KTtcbiAgICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiByZXNbJ2NhdGNoJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbWV0aG9kIHJldHVybmVkIGEgcHJvbWlzZVxuICAgICAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBBZGQgYW4gb25GYWlsIGNhbGxiYWNrIHRvIHRoZSBQcm9taXNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZhaWxcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlXG4gKi9cblByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uRmFpbCkge1xuICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uRmFpbCk7XG59O1xuXG4vLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgUHJvbWlzZS5jYXRjaChFcnJvciwgY2FsbGJhY2spXG4vLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgUHJvbWlzZS5jYXRjaChFcnJvciwgRXJyb3IsIGNhbGxiYWNrKVxuXG4vKipcbiAqIEV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2sgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZVxuICovXG5Qcm9taXNlLnByb3RvdHlwZS5hbHdheXMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIHRoaXMudGhlbihmbiwgZm4pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gYWxsIHByb3ZpZGVkIHByb21pc2VzIGFyZSByZXNvbHZlZCxcbiAqIGFuZCBmYWlscyB3aGVuIGFueSBvZiB0aGUgcHJvbWlzZXMgcmVzb2x2ZXMuXG4gKiBAcGFyYW0ge1Byb21pc2VbXX0gcHJvbWlzZXNcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlXG4gKi9cblByb21pc2UuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlbWFpbmluZyA9IHByb21pc2VzLmxlbmd0aCxcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICBpZiAocmVtYWluaW5nKSB7XG4gICAgICBwcm9taXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XG4gICAgICAgIHAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0c1tpXSA9IHJlc3VsdDtcbiAgICAgICAgICByZW1haW5pbmctLTtcbiAgICAgICAgICBpZiAocmVtYWluaW5nID09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZW1haW5pbmcgPSAwO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcHJvbWlzZSByZXNvbHZlclxuICogQHJldHVybnMge3twcm9taXNlOiBQcm9taXNlLCByZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbn19IHJlc29sdmVyXG4gKi9cblByb21pc2UuZGVmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByZXNvbHZlciA9IHt9O1xuICByZXNvbHZlci5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlc29sdmVyLnJlc29sdmUgPSByZXNvbHZlO1xuICAgIHJlc29sdmVyLnJlamVjdCA9IHJlamVjdDtcbiAgfSk7XG4gIHJldHVybiByZXNvbHZlcjtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgY2FuY2VsbGF0aW9uIGVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ30gW21lc3NhZ2VdXG4gKiBAZXh0ZW5kcyBFcnJvclxuICovXG5mdW5jdGlvbiBDYW5jZWxsYXRpb25FcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ3Byb21pc2UgY2FuY2VsbGVkJztcbiAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xufVxuQ2FuY2VsbGF0aW9uRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5DYW5jZWxsYXRpb25FcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFcnJvcjtcbkNhbmNlbGxhdGlvbkVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0NhbmNlbGxhdGlvbkVycm9yJztcblByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3IgPSBDYW5jZWxsYXRpb25FcnJvcjtcblxuLyoqXG4gKiBDcmVhdGUgYSB0aW1lb3V0IGVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ30gW21lc3NhZ2VdXG4gKiBAZXh0ZW5kcyBFcnJvclxuICovXG5mdW5jdGlvbiBUaW1lb3V0RXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xufVxuVGltZW91dEVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuVGltZW91dEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVycm9yO1xuVGltZW91dEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG5Qcm9taXNlLlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDc1MTpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvW1wiQEBpdGVyYXRvclwiXTsgaWYgKCFpdCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBpdC5jYWxsKG8pOyB9LCBuOiBmdW5jdGlvbiBuKCkgeyB2YXIgc3RlcCA9IGl0Lm5leHQoKTsgbm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTsgcmV0dXJuIHN0ZXA7IH0sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7IGRpZEVyciA9IHRydWU7IGVyciA9IF9lMjsgfSwgZjogZnVuY3Rpb24gZigpIHsgdHJ5IHsgaWYgKCFub3JtYWxDb21wbGV0aW9uICYmIGl0W1wicmV0dXJuXCJdICE9IG51bGwpIGl0W1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChkaWRFcnIpIHRocm93IGVycjsgfSB9IH07IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgZW51bWVyYWJsZU9ubHkgJiYgKHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KSksIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IG51bGwgIT0gYXJndW1lbnRzW2ldID8gYXJndW1lbnRzW2ldIDoge307IGkgJSAyID8gb3duS2V5cyhPYmplY3Qoc291cmNlKSwgITApLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSkgOiBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG52YXIgUHJvbWlzZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjE5KTtcbnZhciBlbnZpcm9ubWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oODI4KTtcbnZhciByZXF1aXJlRm9vbFdlYnBhY2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5Nyk7XG5cbi8qKlxuICogU3BlY2lhbCBtZXNzYWdlIHNlbnQgYnkgcGFyZW50IHdoaWNoIGNhdXNlcyBhIGNoaWxkIHByb2Nlc3Mgd29ya2VyIHRvIHRlcm1pbmF0ZSBpdHNlbGYuXG4gKiBOb3QgYSBcIm1lc3NhZ2Ugb2JqZWN0XCI7IHRoaXMgc3RyaW5nIGlzIHRoZSBlbnRpcmUgbWVzc2FnZS5cbiAqL1xudmFyIFRFUk1JTkFURV9NRVRIT0RfSUQgPSAnX193b3JrZXJwb29sLXRlcm1pbmF0ZV9fJztcblxuLyoqXG4gKiBJZiBzZW5kaW5nIGBURVJNSU5BVEVfTUVUSE9EX0lEYCBkb2VzIG5vdCBjYXVzZSB0aGUgY2hpbGQgcHJvY2VzcyB0byBleGl0IGluIHRoaXMgbWFueSBtaWxsaXNlY29uZHMsXG4gKiBmb3JjZS1raWxsIHRoZSBjaGlsZCBwcm9jZXNzLlxuICovXG52YXIgQ0hJTERfUFJPQ0VTU19FWElUX1RJTUVPVVQgPSAxMDAwO1xuZnVuY3Rpb24gZW5zdXJlV29ya2VyVGhyZWFkcygpIHtcbiAgdmFyIFdvcmtlclRocmVhZHMgPSB0cnlSZXF1aXJlV29ya2VyVGhyZWFkcygpO1xuICBpZiAoIVdvcmtlclRocmVhZHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtlclBvb2w6IHdvcmtlclR5cGUgPSBcXCd0aHJlYWRcXCcgaXMgbm90IHN1cHBvcnRlZCwgTm9kZSA+PSAxMS43LjAgcmVxdWlyZWQnKTtcbiAgfVxuICByZXR1cm4gV29ya2VyVGhyZWFkcztcbn1cblxuLy8gY2hlY2sgd2hldGhlciBXb3JrZXIgaXMgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyXG5mdW5jdGlvbiBlbnN1cmVXZWJXb3JrZXIoKSB7XG4gIC8vIFdvcmthcm91bmQgZm9yIGEgYnVnIGluIFBoYW50b21KUyAoT3IgUXRXZWJraXQpOiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xNDUzNFxuICBpZiAodHlwZW9mIFdvcmtlciAhPT0gJ2Z1bmN0aW9uJyAmJiAoKHR5cGVvZiBXb3JrZXIgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihXb3JrZXIpKSAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIFdvcmtlci5wcm90b3R5cGUuY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXb3JrZXJQb29sOiBXZWIgV29ya2VycyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbn1cbmZ1bmN0aW9uIHRyeVJlcXVpcmVXb3JrZXJUaHJlYWRzKCkge1xuICB0cnkge1xuICAgIHJldHVybiByZXF1aXJlRm9vbFdlYnBhY2soJ3dvcmtlcl90aHJlYWRzJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKF90eXBlb2YoZXJyb3IpID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvci5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgIC8vIG5vIHdvcmtlcl90aHJlYWRzIGF2YWlsYWJsZSAob2xkIHZlcnNpb24gb2Ygbm9kZS5qcylcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cblxuLy8gZ2V0IHRoZSBkZWZhdWx0IHdvcmtlciBzY3JpcHRcbmZ1bmN0aW9uIGdldERlZmF1bHRXb3JrZXIoKSB7XG4gIGlmIChlbnZpcm9ubWVudC5wbGF0Zm9ybSA9PT0gJ2Jyb3dzZXInKSB7XG4gICAgLy8gdGVzdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIGFsbCBmZWF0dXJlcyB0aGF0IHdlIG5lZWRcbiAgICBpZiAodHlwZW9mIEJsb2IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jsb2Igbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlcicpO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5VUkwgfHwgdHlwZW9mIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTC5jcmVhdGVPYmplY3RVUkwgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlcicpO1xuICAgIH1cblxuICAgIC8vIHVzZSBlbWJlZGRlZCB3b3JrZXIuanNcbiAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtfX3dlYnBhY2tfcmVxdWlyZV9fKDY3MCldLCB7XG4gICAgICB0eXBlOiAndGV4dC9qYXZhc2NyaXB0J1xuICAgIH0pO1xuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgZXh0ZXJuYWwgd29ya2VyLmpzIGluIGN1cnJlbnQgZGlyZWN0b3J5XG4gICAgcmV0dXJuIF9fZGlybmFtZSArICcvd29ya2VyLmpzJztcbiAgfVxufVxuZnVuY3Rpb24gc2V0dXBXb3JrZXIoc2NyaXB0LCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLndvcmtlclR5cGUgPT09ICd3ZWInKSB7XG4gICAgLy8gYnJvd3NlciBvbmx5XG4gICAgZW5zdXJlV2ViV29ya2VyKCk7XG4gICAgcmV0dXJuIHNldHVwQnJvd3NlcldvcmtlcihzY3JpcHQsIFdvcmtlcik7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy53b3JrZXJUeXBlID09PSAndGhyZWFkJykge1xuICAgIC8vIG5vZGUuanMgb25seVxuICAgIFdvcmtlclRocmVhZHMgPSBlbnN1cmVXb3JrZXJUaHJlYWRzKCk7XG4gICAgcmV0dXJuIHNldHVwV29ya2VyVGhyZWFkV29ya2VyKHNjcmlwdCwgV29ya2VyVGhyZWFkcywgb3B0aW9ucy53b3JrZXJUaHJlYWRPcHRzKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLndvcmtlclR5cGUgPT09ICdwcm9jZXNzJyB8fCAhb3B0aW9ucy53b3JrZXJUeXBlKSB7XG4gICAgLy8gbm9kZS5qcyBvbmx5XG4gICAgcmV0dXJuIHNldHVwUHJvY2Vzc1dvcmtlcihzY3JpcHQsIHJlc29sdmVGb3JrT3B0aW9ucyhvcHRpb25zKSwgcmVxdWlyZUZvb2xXZWJwYWNrKCdjaGlsZF9wcm9jZXNzJykpO1xuICB9IGVsc2Uge1xuICAgIC8vIG9wdGlvbnMud29ya2VyVHlwZSA9PT0gJ2F1dG8nIG9yIHVuZGVmaW5lZFxuICAgIGlmIChlbnZpcm9ubWVudC5wbGF0Zm9ybSA9PT0gJ2Jyb3dzZXInKSB7XG4gICAgICBlbnN1cmVXZWJXb3JrZXIoKTtcbiAgICAgIHJldHVybiBzZXR1cEJyb3dzZXJXb3JrZXIoc2NyaXB0LCBXb3JrZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbnZpcm9ubWVudC5wbGF0Zm9ybSA9PT0gJ25vZGUnXG4gICAgICB2YXIgV29ya2VyVGhyZWFkcyA9IHRyeVJlcXVpcmVXb3JrZXJUaHJlYWRzKCk7XG4gICAgICBpZiAoV29ya2VyVGhyZWFkcykge1xuICAgICAgICByZXR1cm4gc2V0dXBXb3JrZXJUaHJlYWRXb3JrZXIoc2NyaXB0LCBXb3JrZXJUaHJlYWRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXR1cFByb2Nlc3NXb3JrZXIoc2NyaXB0LCByZXNvbHZlRm9ya09wdGlvbnMob3B0aW9ucyksIHJlcXVpcmVGb29sV2VicGFjaygnY2hpbGRfcHJvY2VzcycpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHNldHVwQnJvd3NlcldvcmtlcihzY3JpcHQsIFdvcmtlcikge1xuICAvLyBjcmVhdGUgdGhlIHdlYiB3b3JrZXJcbiAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoc2NyaXB0KTtcbiAgd29ya2VyLmlzQnJvd3NlcldvcmtlciA9IHRydWU7XG4gIC8vIGFkZCBub2RlLmpzIEFQSSB0byB0aGUgd2ViIHdvcmtlclxuICB3b3JrZXIub24gPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZS5kYXRhKTtcbiAgICB9KTtcbiAgfTtcbiAgd29ya2VyLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH07XG4gIHJldHVybiB3b3JrZXI7XG59XG5mdW5jdGlvbiBzZXR1cFdvcmtlclRocmVhZFdvcmtlcihzY3JpcHQsIFdvcmtlclRocmVhZHMsIHdvcmtlclRocmVhZE9wdGlvbnMpIHtcbiAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJUaHJlYWRzLldvcmtlcihzY3JpcHQsIF9vYmplY3RTcHJlYWQoe1xuICAgIHN0ZG91dDogZmFsc2UsXG4gICAgLy8gYXV0b21hdGljYWxseSBwaXBlIHdvcmtlci5TVERPVVQgdG8gcHJvY2Vzcy5TVERPVVRcbiAgICBzdGRlcnI6IGZhbHNlXG4gIH0sIHdvcmtlclRocmVhZE9wdGlvbnMpKTtcbiAgd29ya2VyLmlzV29ya2VyVGhyZWFkID0gdHJ1ZTtcbiAgLy8gbWFrZSB0aGUgd29ya2VyIG1pbWljIGEgY2hpbGRfcHJvY2Vzc1xuICB3b3JrZXIuc2VuZCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfTtcbiAgd29ya2VyLmtpbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50ZXJtaW5hdGUoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgd29ya2VyLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50ZXJtaW5hdGUoKTtcbiAgfTtcbiAgcmV0dXJuIHdvcmtlcjtcbn1cbmZ1bmN0aW9uIHNldHVwUHJvY2Vzc1dvcmtlcihzY3JpcHQsIG9wdGlvbnMsIGNoaWxkX3Byb2Nlc3MpIHtcbiAgLy8gbm8gV29ya2VyVGhyZWFkcywgZmFsbGJhY2sgdG8gc3ViLXByb2Nlc3MgYmFzZWQgd29ya2Vyc1xuICB2YXIgd29ya2VyID0gY2hpbGRfcHJvY2Vzcy5mb3JrKHNjcmlwdCwgb3B0aW9ucy5mb3JrQXJncywgb3B0aW9ucy5mb3JrT3B0cyk7XG4gIHdvcmtlci5pc0NoaWxkUHJvY2VzcyA9IHRydWU7XG4gIHJldHVybiB3b3JrZXI7XG59XG5cbi8vIGFkZCBkZWJ1ZyBmbGFncyB0byBjaGlsZCBwcm9jZXNzZXMgaWYgdGhlIG5vZGUgaW5zcGVjdG9yIGlzIGFjdGl2ZVxuZnVuY3Rpb24gcmVzb2x2ZUZvcmtPcHRpb25zKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHZhciBwcm9jZXNzRXhlY0FyZ3YgPSBwcm9jZXNzLmV4ZWNBcmd2LmpvaW4oJyAnKTtcbiAgdmFyIGluc3BlY3RvckFjdGl2ZSA9IHByb2Nlc3NFeGVjQXJndi5pbmRleE9mKCctLWluc3BlY3QnKSAhPT0gLTE7XG4gIHZhciBkZWJ1Z0JyayA9IHByb2Nlc3NFeGVjQXJndi5pbmRleE9mKCctLWRlYnVnLWJyaycpICE9PSAtMTtcbiAgdmFyIGV4ZWNBcmd2ID0gW107XG4gIGlmIChpbnNwZWN0b3JBY3RpdmUpIHtcbiAgICBleGVjQXJndi5wdXNoKCctLWluc3BlY3Q9JyArIG9wdHMuZGVidWdQb3J0KTtcbiAgICBpZiAoZGVidWdCcmspIHtcbiAgICAgIGV4ZWNBcmd2LnB1c2goJy0tZGVidWctYnJrJyk7XG4gICAgfVxuICB9XG4gIHByb2Nlc3MuZXhlY0FyZ3YuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgaWYgKGFyZy5pbmRleE9mKCctLW1heC1vbGQtc3BhY2Utc2l6ZScpID4gLTEpIHtcbiAgICAgIGV4ZWNBcmd2LnB1c2goYXJnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb3B0cywge1xuICAgIGZvcmtBcmdzOiBvcHRzLmZvcmtBcmdzLFxuICAgIGZvcmtPcHRzOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzLmZvcmtPcHRzLCB7XG4gICAgICBleGVjQXJndjogKG9wdHMuZm9ya09wdHMgJiYgb3B0cy5mb3JrT3B0cy5leGVjQXJndiB8fCBbXSkuY29uY2F0KGV4ZWNBcmd2KVxuICAgIH0pXG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc2VyaWFsaXplZCBlcnJvciB0byBFcnJvclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBFcnJvciB0aGF0IGhhcyBiZWVuIHNlcmlhbGl6ZWQgYW5kIHBhcnNlZCB0byBvYmplY3RcbiAqIEByZXR1cm4ge0Vycm9yfSBUaGUgZXF1aXZhbGVudCBFcnJvci5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9FcnJvcihvYmopIHtcbiAgdmFyIHRlbXAgPSBuZXcgRXJyb3IoJycpO1xuICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGVtcFtwcm9wc1tpXV0gPSBvYmpbcHJvcHNbaV1dO1xuICB9XG4gIHJldHVybiB0ZW1wO1xufVxuXG4vKipcbiAqIEEgV29ya2VySGFuZGxlciBjb250cm9scyBhIHNpbmdsZSB3b3JrZXIuIFRoaXMgd29ya2VyIGNhbiBiZSBhIGNoaWxkIHByb2Nlc3NcbiAqIG9uIG5vZGUuanMgb3IgYSBXZWJXb3JrZXIgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IFtzY3JpcHRdIElmIG5vIHNjcmlwdCBpcyBwcm92aWRlZCwgYSBkZWZhdWx0IHdvcmtlciB3aXRoIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBydW4gd2lsbCBiZSBjcmVhdGVkLlxuICogQHBhcmFtIHtXb3JrZXJQb29sT3B0aW9uc30gX29wdGlvbnMgU2VlIGRvY3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBXb3JrZXJIYW5kbGVyKHNjcmlwdCwgX29wdGlvbnMpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5zY3JpcHQgPSBzY3JpcHQgfHwgZ2V0RGVmYXVsdFdvcmtlcigpO1xuICB0aGlzLndvcmtlciA9IHNldHVwV29ya2VyKHRoaXMuc2NyaXB0LCBvcHRpb25zKTtcbiAgdGhpcy5kZWJ1Z1BvcnQgPSBvcHRpb25zLmRlYnVnUG9ydDtcbiAgdGhpcy5mb3JrT3B0cyA9IG9wdGlvbnMuZm9ya09wdHM7XG4gIHRoaXMuZm9ya0FyZ3MgPSBvcHRpb25zLmZvcmtBcmdzO1xuICB0aGlzLndvcmtlclRocmVhZE9wdHMgPSBvcHRpb25zLndvcmtlclRocmVhZE9wdHM7XG5cbiAgLy8gVGhlIHJlYWR5IG1lc3NhZ2UgaXMgb25seSBzZW50IGlmIHRoZSB3b3JrZXIuYWRkIG1ldGhvZCBpcyBjYWxsZWQgKEFuZCB0aGUgZGVmYXVsdCBzY3JpcHQgaXMgbm90IHVzZWQpXG4gIGlmICghc2NyaXB0KSB7XG4gICAgdGhpcy53b3JrZXIucmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgLy8gcXVldWUgZm9yIHJlcXVlc3RzIHRoYXQgYXJlIHJlY2VpdmVkIGJlZm9yZSB0aGUgd29ya2VyIGlzIHJlYWR5XG4gIHRoaXMucmVxdWVzdFF1ZXVlID0gW107XG4gIHRoaXMud29ya2VyLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKG1lLnRlcm1pbmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycgJiYgcmVzcG9uc2UgPT09ICdyZWFkeScpIHtcbiAgICAgIG1lLndvcmtlci5yZWFkeSA9IHRydWU7XG4gICAgICBkaXNwYXRjaFF1ZXVlZFJlcXVlc3RzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpbmQgdGhlIHRhc2sgZnJvbSB0aGUgcHJvY2Vzc2luZyBxdWV1ZSwgYW5kIHJ1biB0aGUgdGFza3MgY2FsbGJhY2tcbiAgICAgIHZhciBpZCA9IHJlc3BvbnNlLmlkO1xuICAgICAgdmFyIHRhc2sgPSBtZS5wcm9jZXNzaW5nW2lkXTtcbiAgICAgIGlmICh0YXNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXZlbnQpIHtcbiAgICAgICAgICBpZiAodGFzay5vcHRpb25zICYmIHR5cGVvZiB0YXNrLm9wdGlvbnMub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRhc2sub3B0aW9ucy5vbihyZXNwb25zZS5wYXlsb2FkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0YXNrIGZyb20gdGhlIHF1ZXVlXG4gICAgICAgICAgZGVsZXRlIG1lLnByb2Nlc3NpbmdbaWRdO1xuXG4gICAgICAgICAgLy8gdGVzdCBpZiB3ZSBuZWVkIHRvIHRlcm1pbmF0ZVxuICAgICAgICAgIGlmIChtZS50ZXJtaW5hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29tcGxldGUgd29ya2VyIHRlcm1pbmF0aW9uIGlmIGFsbCB0YXNrcyBhcmUgZmluaXNoZWRcbiAgICAgICAgICAgIG1lLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlc29sdmUgdGhlIHRhc2sncyBwcm9taXNlXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICB0YXNrLnJlc29sdmVyLnJlamVjdChvYmplY3RUb0Vycm9yKHJlc3BvbnNlLmVycm9yKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2sucmVzb2x2ZXIucmVzb2x2ZShyZXNwb25zZS5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gcmVqZWN0IGFsbCBydW5uaW5nIHRhc2tzIG9uIHdvcmtlciBlcnJvclxuICBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgbWUudGVybWluYXRlZCA9IHRydWU7XG4gICAgZm9yICh2YXIgaWQgaW4gbWUucHJvY2Vzc2luZykge1xuICAgICAgaWYgKG1lLnByb2Nlc3NpbmdbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWUucHJvY2Vzc2luZ1tpZF0ucmVzb2x2ZXIucmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbWUucHJvY2Vzc2luZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICAvLyBzZW5kIGFsbCBxdWV1ZWQgcmVxdWVzdHMgdG8gd29ya2VyXG4gIGZ1bmN0aW9uIGRpc3BhdGNoUXVldWVkUmVxdWVzdHMoKSB7XG4gICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG1lLnJlcXVlc3RRdWV1ZS5zcGxpY2UoMCkpLFxuICAgICAgX3N0ZXA7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gX3N0ZXAudmFsdWU7XG4gICAgICAgIG1lLndvcmtlci5zZW5kKHJlcXVlc3QpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICB9XG4gIH1cbiAgdmFyIHdvcmtlciA9IHRoaXMud29ya2VyO1xuICAvLyBsaXN0ZW4gZm9yIHdvcmtlciBtZXNzYWdlcyBlcnJvciBhbmQgZXhpdFxuICB0aGlzLndvcmtlci5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgdGhpcy53b3JrZXIub24oJ2V4aXQnLCBmdW5jdGlvbiAoZXhpdENvZGUsIHNpZ25hbENvZGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXb3JrZXJwb29sIFdvcmtlciB0ZXJtaW5hdGVkIFVuZXhwZWN0ZWRseVxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIGV4aXRDb2RlOiBgJyArIGV4aXRDb2RlICsgJ2BcXG4nO1xuICAgIG1lc3NhZ2UgKz0gJyAgICBzaWduYWxDb2RlOiBgJyArIHNpZ25hbENvZGUgKyAnYFxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIHdvcmtlcnBvb2wuc2NyaXB0OiBgJyArIG1lLnNjcmlwdCArICdgXFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgc3Bhd25BcmdzOiBgJyArIHdvcmtlci5zcGF3bmFyZ3MgKyAnYFxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIHNwYXduZmlsZTogYCcgKyB3b3JrZXIuc3Bhd25maWxlICsgJ2BcXG4nO1xuICAgIG1lc3NhZ2UgKz0gJyAgICBzdGRvdXQ6IGAnICsgd29ya2VyLnN0ZG91dCArICdgXFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgc3RkZXJyOiBgJyArIHdvcmtlci5zdGRlcnIgKyAnYFxcbic7XG4gICAgb25FcnJvcihuZXcgRXJyb3IobWVzc2FnZSkpO1xuICB9KTtcbiAgdGhpcy5wcm9jZXNzaW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gcXVldWUgd2l0aCB0YXNrcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3NcblxuICB0aGlzLnRlcm1pbmF0aW5nID0gZmFsc2U7XG4gIHRoaXMudGVybWluYXRlZCA9IGZhbHNlO1xuICB0aGlzLnRlcm1pbmF0aW9uSGFuZGxlciA9IG51bGw7XG4gIHRoaXMubGFzdElkID0gMDtcbn1cblxuLyoqXG4gKiBHZXQgYSBsaXN0IHdpdGggbWV0aG9kcyBhdmFpbGFibGUgb24gdGhlIHdvcmtlci5cbiAqIEByZXR1cm4ge1Byb21pc2UuPFN0cmluZ1tdLCBFcnJvcj59IG1ldGhvZHNcbiAqL1xuV29ya2VySGFuZGxlci5wcm90b3R5cGUubWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXhlYygnbWV0aG9kcycpO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlIGEgbWV0aG9kIHdpdGggZ2l2ZW4gcGFyYW1ldGVycyBvbiB0aGUgd29ya2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zXVxuICogQHBhcmFtIHt7cmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb259fSBbcmVzb2x2ZXJdXG4gKiBAcGFyYW0ge0V4ZWNPcHRpb25zfSAgW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtQcm9taXNlLjwqLCBFcnJvcj59IHJlc3VsdFxuICovXG5Xb3JrZXJIYW5kbGVyLnByb3RvdHlwZS5leGVjID0gZnVuY3Rpb24gKG1ldGhvZCwgcGFyYW1zLCByZXNvbHZlciwgb3B0aW9ucykge1xuICBpZiAoIXJlc29sdmVyKSB7XG4gICAgcmVzb2x2ZXIgPSBQcm9taXNlLmRlZmVyKCk7XG4gIH1cblxuICAvLyBnZW5lcmF0ZSBhIHVuaXF1ZSBpZCBmb3IgdGhlIHRhc2tcbiAgdmFyIGlkID0gKyt0aGlzLmxhc3RJZDtcblxuICAvLyByZWdpc3RlciBhIG5ldyB0YXNrIGFzIGJlaW5nIGluIHByb2dyZXNzXG4gIHRoaXMucHJvY2Vzc2luZ1tpZF0gPSB7XG4gICAgaWQ6IGlkLFxuICAgIHJlc29sdmVyOiByZXNvbHZlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgLy8gYnVpbGQgYSBKU09OLVJQQyByZXF1ZXN0XG4gIHZhciByZXF1ZXN0ID0ge1xuICAgIGlkOiBpZCxcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICBwYXJhbXM6IHBhcmFtc1xuICB9O1xuICBpZiAodGhpcy50ZXJtaW5hdGVkKSB7XG4gICAgcmVzb2x2ZXIucmVqZWN0KG5ldyBFcnJvcignV29ya2VyIGlzIHRlcm1pbmF0ZWQnKSk7XG4gIH0gZWxzZSBpZiAodGhpcy53b3JrZXIucmVhZHkpIHtcbiAgICAvLyBzZW5kIHRoZSByZXF1ZXN0IHRvIHRoZSB3b3JrZXJcbiAgICB0aGlzLndvcmtlci5zZW5kKHJlcXVlc3QpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVxdWVzdFF1ZXVlLnB1c2gocmVxdWVzdCk7XG4gIH1cblxuICAvLyBvbiBjYW5jZWxsYXRpb24sIGZvcmNlIHRoZSB3b3JrZXIgdG8gdGVybWluYXRlXG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiByZXNvbHZlci5wcm9taXNlW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIFByb21pc2UuVGltZW91dEVycm9yKSB7XG4gICAgICAvLyByZW1vdmUgdGhpcyB0YXNrIGZyb20gdGhlIHF1ZXVlLiBJdCBpcyBhbHJlYWR5IHJlamVjdGVkIChoZW5jZSB0aGlzXG4gICAgICAvLyBjYXRjaCBldmVudCksIGFuZCBlbHNlIGl0IHdpbGwgYmUgcmVqZWN0ZWQgYWdhaW4gd2hlbiB0ZXJtaW5hdGluZ1xuICAgICAgZGVsZXRlIG1lLnByb2Nlc3NpbmdbaWRdO1xuXG4gICAgICAvLyB0ZXJtaW5hdGUgd29ya2VyXG4gICAgICByZXR1cm4gbWUudGVybWluYXRlQW5kTm90aWZ5KHRydWUpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFRlc3Qgd2hldGhlciB0aGUgd29ya2VyIGlzIHdvcmtpbmcgb3Igbm90XG4gKiBAcmV0dXJuIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHdvcmtlciBpcyBidXN5XG4gKi9cbldvcmtlckhhbmRsZXIucHJvdG90eXBlLmJ1c3kgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnByb2Nlc3NpbmcpLmxlbmd0aCA+IDA7XG59O1xuXG4vKipcbiAqIFRlcm1pbmF0ZSB0aGUgd29ya2VyLlxuICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdICAgSWYgZmFsc2UgKGRlZmF1bHQpLCB0aGUgd29ya2VyIGlzIHRlcm1pbmF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGZpbmlzaGluZyBhbGwgdGFza3MgY3VycmVudGx5IGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy4gSWYgdHJ1ZSwgdGhlIHdvcmtlciB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkIGltbWVkaWF0ZWx5LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrPW51bGxdIElmIHByb3ZpZGVkLCB3aWxsIGJlIGNhbGxlZCB3aGVuIHByb2Nlc3MgdGVybWluYXRlcy5cbiAqL1xuV29ya2VySGFuZGxlci5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKGZvcmNlLCBjYWxsYmFjaykge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAoZm9yY2UpIHtcbiAgICAvLyBjYW5jZWwgYWxsIHRhc2tzIGluIHByb2dyZXNzXG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5wcm9jZXNzaW5nKSB7XG4gICAgICBpZiAodGhpcy5wcm9jZXNzaW5nW2lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZ1tpZF0ucmVzb2x2ZXIucmVqZWN0KG5ldyBFcnJvcignV29ya2VyIHRlcm1pbmF0ZWQnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHJvY2Vzc2luZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMudGVybWluYXRpb25IYW5kbGVyID0gY2FsbGJhY2s7XG4gIH1cbiAgaWYgKCF0aGlzLmJ1c3koKSkge1xuICAgIC8vIGFsbCB0YXNrcyBhcmUgZmluaXNoZWQuIGtpbGwgdGhlIHdvcmtlclxuICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cChlcnIpIHtcbiAgICAgIG1lLnRlcm1pbmF0ZWQgPSB0cnVlO1xuICAgICAgaWYgKG1lLndvcmtlciAhPSBudWxsICYmIG1lLndvcmtlci5yZW1vdmVBbGxMaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gcmVtb3ZlQWxsTGlzdGVuZXJzIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBjaGlsZF9wcm9jZXNzXG4gICAgICAgIG1lLndvcmtlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ21lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICAgIG1lLndvcmtlciA9IG51bGw7XG4gICAgICBtZS50ZXJtaW5hdGluZyA9IGZhbHNlO1xuICAgICAgaWYgKG1lLnRlcm1pbmF0aW9uSGFuZGxlcikge1xuICAgICAgICBtZS50ZXJtaW5hdGlvbkhhbmRsZXIoZXJyLCBtZSk7XG4gICAgICB9IGVsc2UgaWYgKGVycikge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodGhpcy53b3JrZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy53b3JrZXIua2lsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAodGhpcy53b3JrZXIua2lsbGVkKSB7XG4gICAgICAgICAgY2xlYW51cChuZXcgRXJyb3IoJ3dvcmtlciBhbHJlYWR5IGtpbGxlZCEnKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndvcmtlci5pc0NoaWxkUHJvY2Vzcykge1xuICAgICAgICAgIHZhciBjbGVhbkV4aXRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobWUud29ya2VyKSB7XG4gICAgICAgICAgICAgIG1lLndvcmtlci5raWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgQ0hJTERfUFJPQ0VTU19FWElUX1RJTUVPVVQpO1xuICAgICAgICAgIHRoaXMud29ya2VyLm9uY2UoJ2V4aXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xlYW5FeGl0VGltZW91dCk7XG4gICAgICAgICAgICBpZiAobWUud29ya2VyKSB7XG4gICAgICAgICAgICAgIG1lLndvcmtlci5raWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh0aGlzLndvcmtlci5yZWFkeSkge1xuICAgICAgICAgICAgdGhpcy53b3JrZXIuc2VuZChURVJNSU5BVEVfTUVUSE9EX0lEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UXVldWUucHVzaChURVJNSU5BVEVfTUVUSE9EX0lEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd29ya2VyX3RocmVhZFxuICAgICAgICAgIHRoaXMud29ya2VyLmtpbGwoKTtcbiAgICAgICAgICB0aGlzLndvcmtlci5raWxsZWQgPSB0cnVlO1xuICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLndvcmtlci50ZXJtaW5hdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy53b3JrZXIudGVybWluYXRlKCk7IC8vIHdlYiB3b3JrZXJcbiAgICAgICAgdGhpcy53b3JrZXIua2lsbGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHRlcm1pbmF0ZSB3b3JrZXInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2xlYW51cCgpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlIGNhbid0IHRlcm1pbmF0ZSBpbW1lZGlhdGVseSwgdGhlcmUgYXJlIHN0aWxsIHRhc2tzIGJlaW5nIGV4ZWN1dGVkXG4gICAgdGhpcy50ZXJtaW5hdGluZyA9IHRydWU7XG4gIH1cbn07XG5cbi8qKlxuICogVGVybWluYXRlIHRoZSB3b3JrZXIsIHJldHVybmluZyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB0ZXJtaW5hdGlvbiBoYXMgYmVlbiBkb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdICAgSWYgZmFsc2UgKGRlZmF1bHQpLCB0aGUgd29ya2VyIGlzIHRlcm1pbmF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGZpbmlzaGluZyBhbGwgdGFza3MgY3VycmVudGx5IGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy4gSWYgdHJ1ZSwgdGhlIHdvcmtlciB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkIGltbWVkaWF0ZWx5LlxuICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XSAgICAgICAgSWYgcHJvdmlkZWQgYW5kIG5vbi16ZXJvLCB3b3JrZXIgdGVybWluYXRpb24gcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlciB0aW1lb3V0IGlmIHdvcmtlciBwcm9jZXNzIGhhcyBub3QgYmVlbiB0ZXJtaW5hdGVkLlxuICogQHJldHVybiB7UHJvbWlzZS48V29ya2VySGFuZGxlciwgRXJyb3I+fVxuICovXG5Xb3JrZXJIYW5kbGVyLnByb3RvdHlwZS50ZXJtaW5hdGVBbmROb3RpZnkgPSBmdW5jdGlvbiAoZm9yY2UsIHRpbWVvdXQpIHtcbiAgdmFyIHJlc29sdmVyID0gUHJvbWlzZS5kZWZlcigpO1xuICBpZiAodGltZW91dCkge1xuICAgIHJlc29sdmVyLnByb21pc2UudGltZW91dCA9IHRpbWVvdXQ7XG4gIH1cbiAgdGhpcy50ZXJtaW5hdGUoZm9yY2UsIGZ1bmN0aW9uIChlcnIsIHdvcmtlcikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJlc29sdmVyLnJlamVjdChlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlci5yZXNvbHZlKHdvcmtlcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc29sdmVyLnByb21pc2U7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXb3JrZXJIYW5kbGVyO1xubW9kdWxlLmV4cG9ydHMuX3RyeVJlcXVpcmVXb3JrZXJUaHJlYWRzID0gdHJ5UmVxdWlyZVdvcmtlclRocmVhZHM7XG5tb2R1bGUuZXhwb3J0cy5fc2V0dXBQcm9jZXNzV29ya2VyID0gc2V0dXBQcm9jZXNzV29ya2VyO1xubW9kdWxlLmV4cG9ydHMuX3NldHVwQnJvd3NlcldvcmtlciA9IHNldHVwQnJvd3Nlcldvcmtlcjtcbm1vZHVsZS5leHBvcnRzLl9zZXR1cFdvcmtlclRocmVhZFdvcmtlciA9IHNldHVwV29ya2VyVGhyZWFkV29ya2VyO1xubW9kdWxlLmV4cG9ydHMuZW5zdXJlV29ya2VyVGhyZWFkcyA9IGVuc3VyZVdvcmtlclRocmVhZHM7XG5cbi8qKiovIH0pLFxuXG4vKioqLyA4MzM6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBNQVhfUE9SVFMgPSA2NTUzNTtcbm1vZHVsZS5leHBvcnRzID0gRGVidWdQb3J0QWxsb2NhdG9yO1xuZnVuY3Rpb24gRGVidWdQb3J0QWxsb2NhdG9yKCkge1xuICB0aGlzLnBvcnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5sZW5ndGggPSAwO1xufVxuRGVidWdQb3J0QWxsb2NhdG9yLnByb3RvdHlwZS5uZXh0QXZhaWxhYmxlU3RhcnRpbmdBdCA9IGZ1bmN0aW9uIChzdGFydGluZykge1xuICB3aGlsZSAodGhpcy5wb3J0c1tzdGFydGluZ10gPT09IHRydWUpIHtcbiAgICBzdGFydGluZysrO1xuICB9XG4gIGlmIChzdGFydGluZyA+PSBNQVhfUE9SVFMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtlclBvb2wgZGVidWcgcG9ydCBsaW1pdCByZWFjaGVkOiAnICsgc3RhcnRpbmcgKyAnPj0gJyArIE1BWF9QT1JUUyk7XG4gIH1cbiAgdGhpcy5wb3J0c1tzdGFydGluZ10gPSB0cnVlO1xuICB0aGlzLmxlbmd0aCsrO1xuICByZXR1cm4gc3RhcnRpbmc7XG59O1xuRGVidWdQb3J0QWxsb2NhdG9yLnByb3RvdHlwZS5yZWxlYXNlUG9ydCA9IGZ1bmN0aW9uIChwb3J0KSB7XG4gIGRlbGV0ZSB0aGlzLnBvcnRzW3BvcnRdO1xuICB0aGlzLmxlbmd0aC0tO1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDgyODpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcmVxdWlyZUZvb2xXZWJwYWNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOTcpO1xuXG4vLyBzb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGV4ZGluZXNoL2Jyb3dzZXItb3Itbm9kZVxudmFyIGlzTm9kZSA9IGZ1bmN0aW9uIGlzTm9kZShub2RlUHJvY2Vzcykge1xuICByZXR1cm4gdHlwZW9mIG5vZGVQcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBub2RlUHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmIG5vZGVQcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cy5pc05vZGUgPSBpc05vZGU7XG5cbi8vIGRldGVybWluZXMgdGhlIEphdmFTY3JpcHQgcGxhdGZvcm06IGJyb3dzZXIgb3Igbm9kZVxubW9kdWxlLmV4cG9ydHMucGxhdGZvcm0gPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOb2RlKHByb2Nlc3MpID8gJ25vZGUnIDogJ2Jyb3dzZXInO1xuXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgcnVubmluZyBpbiBtYWluIHRocmVhZCBvciBub3Rcbi8vIG5vdGUgdGhhdCBpbiBub2RlLmpzIHdlIGhhdmUgdG8gY2hlY2sgYm90aCB3b3JrZXJfdGhyZWFkIGFuZCBjaGlsZF9wcm9jZXNzXG52YXIgd29ya2VyX3RocmVhZHMgPSB0cnlSZXF1aXJlRm9vbFdlYnBhY2soJ3dvcmtlcl90aHJlYWRzJyk7XG5tb2R1bGUuZXhwb3J0cy5pc01haW5UaHJlYWQgPSBtb2R1bGUuZXhwb3J0cy5wbGF0Zm9ybSA9PT0gJ25vZGUnID8gKCF3b3JrZXJfdGhyZWFkcyB8fCB3b3JrZXJfdGhyZWFkcy5pc01haW5UaHJlYWQpICYmICFwcm9jZXNzLmNvbm5lY3RlZCA6IHR5cGVvZiBXaW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG4vLyBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgY3B1cyBhdmFpbGFibGVcbm1vZHVsZS5leHBvcnRzLmNwdXMgPSBtb2R1bGUuZXhwb3J0cy5wbGF0Zm9ybSA9PT0gJ2Jyb3dzZXInID8gc2VsZi5uYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA6IHJlcXVpcmVGb29sV2VicGFjaygnb3MnKS5jcHVzKCkubGVuZ3RoO1xuZnVuY3Rpb24gdHJ5UmVxdWlyZUZvb2xXZWJwYWNrKG1vZHVsZSkge1xuICB0cnkge1xuICAgIHJldHVybiByZXF1aXJlRm9vbFdlYnBhY2sobW9kdWxlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIDY3MDpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuLyoqXG4gKiBlbWJlZGRlZFdvcmtlci5qcyBjb250YWlucyBhbiBlbWJlZGRlZCB2ZXJzaW9uIG9mIHdvcmtlci5qcy5cbiAqIFRoaXMgZmlsZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCxcbiAqIGNoYW5nZXMgbWFkZSBpbiB0aGlzIGZpbGUgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBcIiFmdW5jdGlvbigpe3ZhciBfX3dlYnBhY2tfZXhwb3J0c19fPXt9OyFmdW5jdGlvbigpe3ZhciBleHBvcnRzPV9fd2VicGFja19leHBvcnRzX18sX193ZWJwYWNrX3VudXNlZF9leHBvcnRfXztmdW5jdGlvbiBfdHlwZW9mKHIpe3JldHVybihfdHlwZW9mPVxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBTeW1ib2wmJlxcXCJzeW1ib2xcXFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHIpe3JldHVybiB0eXBlb2Ygcn06ZnVuY3Rpb24ocil7cmV0dXJuIHImJlxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBTeW1ib2wmJnIuY29uc3RydWN0b3I9PT1TeW1ib2wmJnIhPT1TeW1ib2wucHJvdG90eXBlP1xcXCJzeW1ib2xcXFwiOnR5cGVvZiByfSkocil9dmFyIHJlcXVpcmVGb29sV2VicGFjaz1ldmFsKFxcXCJ0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlIDogZnVuY3Rpb24gKG1vZHVsZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSBcXFxcXFxcIiArIG1vZHVsZSArIFxcXFxcXFwiIG5vdCBmb3VuZC4nKSB9XFxcIiksVEVSTUlOQVRFX01FVEhPRF9JRD1cXFwiX193b3JrZXJwb29sLXRlcm1pbmF0ZV9fXFxcIix3b3JrZXI9e2V4aXQ6ZnVuY3Rpb24oKXt9fSxXb3JrZXJUaHJlYWRzLHBhcmVudFBvcnQ7aWYoXFxcInVuZGVmaW5lZFxcXCIhPXR5cGVvZiBzZWxmJiZcXFwiZnVuY3Rpb25cXFwiPT10eXBlb2YgcG9zdE1lc3NhZ2UmJlxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBhZGRFdmVudExpc3RlbmVyKXdvcmtlci5vbj1mdW5jdGlvbihyLGUpe2FkZEV2ZW50TGlzdGVuZXIocixmdW5jdGlvbihyKXtlKHIuZGF0YSl9KX0sd29ya2VyLnNlbmQ9ZnVuY3Rpb24ocil7cG9zdE1lc3NhZ2Uocil9O2Vsc2V7aWYoXFxcInVuZGVmaW5lZFxcXCI9PXR5cGVvZiBwcm9jZXNzKXRocm93IG5ldyBFcnJvcihcXFwiU2NyaXB0IG11c3QgYmUgZXhlY3V0ZWQgYXMgYSB3b3JrZXJcXFwiKTt0cnl7V29ya2VyVGhyZWFkcz1yZXF1aXJlRm9vbFdlYnBhY2soXFxcIndvcmtlcl90aHJlYWRzXFxcIil9Y2F0Y2goZXJyb3Ipe2lmKFxcXCJvYmplY3RcXFwiIT09X3R5cGVvZihlcnJvcil8fG51bGw9PT1lcnJvcnx8XFxcIk1PRFVMRV9OT1RfRk9VTkRcXFwiIT09ZXJyb3IuY29kZSl0aHJvdyBlcnJvcn1Xb3JrZXJUaHJlYWRzJiZudWxsIT09V29ya2VyVGhyZWFkcy5wYXJlbnRQb3J0PyhwYXJlbnRQb3J0PVdvcmtlclRocmVhZHMucGFyZW50UG9ydCx3b3JrZXIuc2VuZD1wYXJlbnRQb3J0LnBvc3RNZXNzYWdlLmJpbmQocGFyZW50UG9ydCksd29ya2VyLm9uPXBhcmVudFBvcnQub24uYmluZChwYXJlbnRQb3J0KSk6KHdvcmtlci5vbj1wcm9jZXNzLm9uLmJpbmQocHJvY2Vzcyksd29ya2VyLnNlbmQ9cHJvY2Vzcy5zZW5kLmJpbmQocHJvY2Vzcyksd29ya2VyLm9uKFxcXCJkaXNjb25uZWN0XFxcIixmdW5jdGlvbigpe3Byb2Nlc3MuZXhpdCgxKX0pLHdvcmtlci5leGl0PXByb2Nlc3MuZXhpdC5iaW5kKHByb2Nlc3MpKX1mdW5jdGlvbiBjb252ZXJ0RXJyb3Iobyl7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLnJlZHVjZShmdW5jdGlvbihyLGUpe3JldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocixlLHt2YWx1ZTpvW2VdLGVudW1lcmFibGU6ITB9KX0se30pfWZ1bmN0aW9uIGlzUHJvbWlzZShyKXtyZXR1cm4gciYmXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIHIudGhlbiYmXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIHIuY2F0Y2h9d29ya2VyLm1ldGhvZHM9e30sd29ya2VyLm1ldGhvZHMucnVuPWZ1bmN0aW9uKHIsZSl7cj1uZXcgRnVuY3Rpb24oXFxcInJldHVybiAoXFxcIityK1xcXCIpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XFxcIik7cmV0dXJuIHIuYXBwbHkocixlKX0sd29ya2VyLm1ldGhvZHMubWV0aG9kcz1mdW5jdGlvbigpe3JldHVybiBPYmplY3Qua2V5cyh3b3JrZXIubWV0aG9kcyl9O3ZhciBjdXJyZW50UmVxdWVzdElkPW51bGw7d29ya2VyLm9uKFxcXCJtZXNzYWdlXFxcIixmdW5jdGlvbihlKXtpZihlPT09VEVSTUlOQVRFX01FVEhPRF9JRClyZXR1cm4gd29ya2VyLmV4aXQoMCk7dHJ5e3ZhciByPXdvcmtlci5tZXRob2RzW2UubWV0aG9kXTtpZighcil0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWV0aG9kIFxcXCInK2UubWV0aG9kKydcXFwiJyk7Y3VycmVudFJlcXVlc3RJZD1lLmlkO3ZhciBvPXIuYXBwbHkocixlLnBhcmFtcyk7aXNQcm9taXNlKG8pP28udGhlbihmdW5jdGlvbihyKXt3b3JrZXIuc2VuZCh7aWQ6ZS5pZCxyZXN1bHQ6cixlcnJvcjpudWxsfSksY3VycmVudFJlcXVlc3RJZD1udWxsfSkuY2F0Y2goZnVuY3Rpb24ocil7d29ya2VyLnNlbmQoe2lkOmUuaWQscmVzdWx0Om51bGwsZXJyb3I6Y29udmVydEVycm9yKHIpfSksY3VycmVudFJlcXVlc3RJZD1udWxsfSk6KHdvcmtlci5zZW5kKHtpZDplLmlkLHJlc3VsdDpvLGVycm9yOm51bGx9KSxjdXJyZW50UmVxdWVzdElkPW51bGwpfWNhdGNoKHIpe3dvcmtlci5zZW5kKHtpZDplLmlkLHJlc3VsdDpudWxsLGVycm9yOmNvbnZlcnRFcnJvcihyKX0pfX0pLHdvcmtlci5yZWdpc3Rlcj1mdW5jdGlvbihyKXtpZihyKWZvcih2YXIgZSBpbiByKXIuaGFzT3duUHJvcGVydHkoZSkmJih3b3JrZXIubWV0aG9kc1tlXT1yW2VdKTt3b3JrZXIuc2VuZChcXFwicmVhZHlcXFwiKX0sd29ya2VyLmVtaXQ9ZnVuY3Rpb24ocil7Y3VycmVudFJlcXVlc3RJZCYmd29ya2VyLnNlbmQoe2lkOmN1cnJlbnRSZXF1ZXN0SWQsaXNFdmVudDohMCxwYXlsb2FkOnJ9KX0sX193ZWJwYWNrX3VudXNlZF9leHBvcnRfXz13b3JrZXIucmVnaXN0ZXIsd29ya2VyLmVtaXR9KCl9KCk7XCI7XG5cbi8qKiovIH0pLFxuXG4vKioqLyAzOTc6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbi8vIHNvdXJjZSBvZiBpbnNwaXJhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9yZXF1aXJlLWZvb2wtd2VicGFja1xudmFyIHJlcXVpcmVGb29sV2VicGFjayA9IGV2YWwoJ3R5cGVvZiByZXF1aXJlICE9PSBcXCd1bmRlZmluZWRcXCcgJyArICc/IHJlcXVpcmUgJyArICc6IGZ1bmN0aW9uIChtb2R1bGUpIHsgdGhyb3cgbmV3IEVycm9yKFxcJ01vZHVsZSBcIiArIG1vZHVsZSArIFwiIG5vdCBmb3VuZC5cXCcpIH0nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZUZvb2xXZWJwYWNrO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gNzQ0OlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSB7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cbi8qKlxuICogd29ya2VyIG11c3QgYmUgc3RhcnRlZCBhcyBhIGNoaWxkIHByb2Nlc3Mgb3IgYSB3ZWIgd29ya2VyLlxuICogSXQgbGlzdGVucyBmb3IgUlBDIG1lc3NhZ2VzIGZyb20gdGhlIHBhcmVudCBwcm9jZXNzLlxuICovXG5cbi8vIHNvdXJjZSBvZiBpbnNwaXJhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9yZXF1aXJlLWZvb2wtd2VicGFja1xudmFyIHJlcXVpcmVGb29sV2VicGFjayA9IGV2YWwoJ3R5cGVvZiByZXF1aXJlICE9PSBcXCd1bmRlZmluZWRcXCcnICsgJyA/IHJlcXVpcmUnICsgJyA6IGZ1bmN0aW9uIChtb2R1bGUpIHsgdGhyb3cgbmV3IEVycm9yKFxcJ01vZHVsZSBcIiArIG1vZHVsZSArIFwiIG5vdCBmb3VuZC5cXCcpIH0nKTtcblxuLyoqXG4gKiBTcGVjaWFsIG1lc3NhZ2Ugc2VudCBieSBwYXJlbnQgd2hpY2ggY2F1c2VzIHRoZSB3b3JrZXIgdG8gdGVybWluYXRlIGl0c2VsZi5cbiAqIE5vdCBhIFwibWVzc2FnZSBvYmplY3RcIjsgdGhpcyBzdHJpbmcgaXMgdGhlIGVudGlyZSBtZXNzYWdlLlxuICovXG52YXIgVEVSTUlOQVRFX01FVEhPRF9JRCA9ICdfX3dvcmtlcnBvb2wtdGVybWluYXRlX18nO1xuXG4vLyB2YXIgbm9kZU9TUGxhdGZvcm0gPSByZXF1aXJlKCcuL2Vudmlyb25tZW50Jykubm9kZU9TUGxhdGZvcm07XG5cbi8vIGNyZWF0ZSBhIHdvcmtlciBBUEkgZm9yIHNlbmRpbmcgYW5kIHJlY2VpdmluZyBtZXNzYWdlcyB3aGljaCB3b3JrcyBib3RoIG9uXG4vLyBub2RlLmpzIGFuZCBpbiB0aGUgYnJvd3NlclxudmFyIHdvcmtlciA9IHtcbiAgZXhpdDogZnVuY3Rpb24gZXhpdCgpIHt9XG59O1xuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gd29ya2VyIGluIHRoZSBicm93c2VyXG4gIHdvcmtlci5vbiA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZS5kYXRhKTtcbiAgICB9KTtcbiAgfTtcbiAgd29ya2VyLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9O1xufSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gbm9kZS5qc1xuXG4gIHZhciBXb3JrZXJUaHJlYWRzO1xuICB0cnkge1xuICAgIFdvcmtlclRocmVhZHMgPSByZXF1aXJlRm9vbFdlYnBhY2soJ3dvcmtlcl90aHJlYWRzJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKF90eXBlb2YoZXJyb3IpID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvci5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgIC8vIG5vIHdvcmtlcl90aHJlYWRzLCBmYWxsYmFjayB0byBzdWItcHJvY2VzcyBiYXNlZCB3b3JrZXJzXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuICBpZiAoV29ya2VyVGhyZWFkcyAmJiAvKiBpZiB0aGVyZSBpcyBhIHBhcmVudFBvcnQsIHdlIGFyZSBpbiBhIFdvcmtlclRocmVhZCAqL1xuICBXb3JrZXJUaHJlYWRzLnBhcmVudFBvcnQgIT09IG51bGwpIHtcbiAgICB2YXIgcGFyZW50UG9ydCA9IFdvcmtlclRocmVhZHMucGFyZW50UG9ydDtcbiAgICB3b3JrZXIuc2VuZCA9IHBhcmVudFBvcnQucG9zdE1lc3NhZ2UuYmluZChwYXJlbnRQb3J0KTtcbiAgICB3b3JrZXIub24gPSBwYXJlbnRQb3J0Lm9uLmJpbmQocGFyZW50UG9ydCk7XG4gIH0gZWxzZSB7XG4gICAgd29ya2VyLm9uID0gcHJvY2Vzcy5vbi5iaW5kKHByb2Nlc3MpO1xuICAgIHdvcmtlci5zZW5kID0gcHJvY2Vzcy5zZW5kLmJpbmQocHJvY2Vzcyk7XG4gICAgLy8gcmVnaXN0ZXIgZGlzY29ubmVjdCBoYW5kbGVyIG9ubHkgZm9yIHN1YnByb2Nlc3Mgd29ya2VyIHRvIGV4aXQgd2hlbiBwYXJlbnQgaXMga2lsbGVkIHVuZXhwZWN0ZWRseVxuICAgIHdvcmtlci5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcbiAgICB3b3JrZXIuZXhpdCA9IHByb2Nlc3MuZXhpdC5iaW5kKHByb2Nlc3MpO1xuICB9XG59IGVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1NjcmlwdCBtdXN0IGJlIGV4ZWN1dGVkIGFzIGEgd29ya2VyJyk7XG59XG5mdW5jdGlvbiBjb252ZXJ0RXJyb3IoZXJyb3IpIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycm9yKS5yZWR1Y2UoZnVuY3Rpb24gKHByb2R1Y3QsIG5hbWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb2R1Y3QsIG5hbWUsIHtcbiAgICAgIHZhbHVlOiBlcnJvcltuYW1lXSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSwge30pO1xufVxuXG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIHZhbHVlIGlzIGEgUHJvbWlzZSB2aWEgZHVjayB0eXBpbmcuXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIHdoZW4gZ2l2ZW4gdmFsdWUgaXMgYW4gb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgaGF2aW5nIGZ1bmN0aW9ucyBgdGhlbmAgYW5kIGBjYXRjaGAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlW1wiY2F0Y2hcIl0gPT09ICdmdW5jdGlvbic7XG59XG5cbi8vIGZ1bmN0aW9ucyBhdmFpbGFibGUgZXh0ZXJuYWxseVxud29ya2VyLm1ldGhvZHMgPSB7fTtcblxuLyoqXG4gKiBFeGVjdXRlIGEgZnVuY3Rpb24gd2l0aCBwcm92aWRlZCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmbiAgICAgU3RyaW5naWZpZWQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSAgRnVuY3Rpb24gYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xud29ya2VyLm1ldGhvZHMucnVuID0gZnVuY3Rpb24gcnVuKGZuLCBhcmdzKSB7XG4gIHZhciBmID0gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gKCcgKyBmbiArICcpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7Jyk7XG4gIHJldHVybiBmLmFwcGx5KGYsIGFyZ3MpO1xufTtcblxuLyoqXG4gKiBHZXQgYSBsaXN0IHdpdGggbWV0aG9kcyBhdmFpbGFibGUgb24gdGhpcyB3b3JrZXJcbiAqIEByZXR1cm4ge1N0cmluZ1tdfSBtZXRob2RzXG4gKi9cbndvcmtlci5tZXRob2RzLm1ldGhvZHMgPSBmdW5jdGlvbiBtZXRob2RzKCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMod29ya2VyLm1ldGhvZHMpO1xufTtcbnZhciBjdXJyZW50UmVxdWVzdElkID0gbnVsbDtcbndvcmtlci5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gIGlmIChyZXF1ZXN0ID09PSBURVJNSU5BVEVfTUVUSE9EX0lEKSB7XG4gICAgcmV0dXJuIHdvcmtlci5leGl0KDApO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIG1ldGhvZCA9IHdvcmtlci5tZXRob2RzW3JlcXVlc3QubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kKSB7XG4gICAgICBjdXJyZW50UmVxdWVzdElkID0gcmVxdWVzdC5pZDtcblxuICAgICAgLy8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgIHZhciByZXN1bHQgPSBtZXRob2QuYXBwbHkobWV0aG9kLCByZXF1ZXN0LnBhcmFtcyk7XG4gICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgLy8gcHJvbWlzZSByZXR1cm5lZCwgcmVzb2x2ZSB0aGlzIGFuZCB0aGVuIHJldHVyblxuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgd29ya2VyLnNlbmQoe1xuICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudFJlcXVlc3RJZCA9IG51bGw7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIHdvcmtlci5zZW5kKHtcbiAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgICAgICAgZXJyb3I6IGNvbnZlcnRFcnJvcihlcnIpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudFJlcXVlc3RJZCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW1tZWRpYXRlIHJlc3VsdFxuICAgICAgICB3b3JrZXIuc2VuZCh7XG4gICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRSZXF1ZXN0SWQgPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWV0aG9kIFwiJyArIHJlcXVlc3QubWV0aG9kICsgJ1wiJyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICB3b3JrZXIuc2VuZCh7XG4gICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIGVycm9yOiBjb252ZXJ0RXJyb3IoZXJyKVxuICAgIH0pO1xuICB9XG59KTtcblxuLyoqXG4gKiBSZWdpc3RlciBtZXRob2RzIHRvIHRoZSB3b3JrZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtZXRob2RzXG4gKi9cbndvcmtlci5yZWdpc3RlciA9IGZ1bmN0aW9uIChtZXRob2RzKSB7XG4gIGlmIChtZXRob2RzKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAobWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB3b3JrZXIubWV0aG9kc1tuYW1lXSA9IG1ldGhvZHNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHdvcmtlci5zZW5kKCdyZWFkeScpO1xufTtcbndvcmtlci5lbWl0ID0gZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgaWYgKGN1cnJlbnRSZXF1ZXN0SWQpIHtcbiAgICB3b3JrZXIuc2VuZCh7XG4gICAgICBpZDogY3VycmVudFJlcXVlc3RJZCxcbiAgICAgIGlzRXZlbnQ6IHRydWUsXG4gICAgICBwYXlsb2FkOiBwYXlsb2FkXG4gICAgfSk7XG4gIH1cbn07XG5pZiAodHJ1ZSkge1xuICBleHBvcnRzLmFkZCA9IHdvcmtlci5yZWdpc3RlcjtcbiAgZXhwb3J0cy5lbWl0ID0gd29ya2VyLmVtaXQ7XG59XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbnZhciBleHBvcnRzID0gX193ZWJwYWNrX2V4cG9ydHNfXztcbnZhciBlbnZpcm9ubWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oODI4KTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgd29ya2VyIHBvb2xcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2NyaXB0XVxuICogQHBhcmFtIHtXb3JrZXJQb29sT3B0aW9uc30gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7UG9vbH0gcG9vbFxuICovXG5leHBvcnRzLnBvb2wgPSBmdW5jdGlvbiBwb29sKHNjcmlwdCwgb3B0aW9ucykge1xuICB2YXIgUG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oMzQ1KTtcbiAgcmV0dXJuIG5ldyBQb29sKHNjcmlwdCwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHdvcmtlciBhbmQgb3B0aW9uYWxseSByZWdpc3RlciBhIHNldCBvZiBtZXRob2RzIHRvIHRoZSB3b3JrZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gW21ldGhvZHNdXG4gKi9cbmV4cG9ydHMud29ya2VyID0gZnVuY3Rpb24gd29ya2VyKG1ldGhvZHMpIHtcbiAgdmFyIHdvcmtlciA9IF9fd2VicGFja19yZXF1aXJlX18oNzQ0KTtcbiAgd29ya2VyLmFkZChtZXRob2RzKTtcbn07XG5cbi8qKlxuICogU2VuZHMgYW4gZXZlbnQgdG8gdGhlIHBhcmVudCB3b3JrZXIgcG9vbC5cbiAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIFxuICovXG5leHBvcnRzLndvcmtlckVtaXQgPSBmdW5jdGlvbiB3b3JrZXJFbWl0KHBheWxvYWQpIHtcbiAgdmFyIHdvcmtlciA9IF9fd2VicGFja19yZXF1aXJlX18oNzQ0KTtcbiAgd29ya2VyLmVtaXQocGF5bG9hZCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHByb21pc2UuXG4gKiBAdHlwZSB7UHJvbWlzZX0gcHJvbWlzZVxuICovXG5leHBvcnRzLlByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxOSk7XG5leHBvcnRzLnBsYXRmb3JtID0gZW52aXJvbm1lbnQucGxhdGZvcm07XG5leHBvcnRzLmlzTWFpblRocmVhZCA9IGVudmlyb25tZW50LmlzTWFpblRocmVhZDtcbmV4cG9ydHMuY3B1cyA9IGVudmlyb25tZW50LmNwdXM7XG59KCk7XG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13b3JrZXJwb29sLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtCZW5jaFNvbHZlckZhY2FkZX0gZnJvbSBcIi4vVGV0cmlzU29sdmluZ0JlbmNoL0JlbmNoU29sdmVyRmFjYWRlXCI7XG5pbXBvcnQge0V2ZW50QnVzLCBFdmVudFR5cGUsIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQsIEdhbWVPdmVyRXZlbnR9IGZyb20gXCIuL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzfSBmcm9tIFwiLi9UZXRyaXMvQ29tbWFuZEJ1cy9Db21tYW5kQnVzXCI7XG5cbmNvbnN0IHdvcmtlcnBvb2wgPSByZXF1aXJlKCd3b3JrZXJwb29sJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbHZlVGV0cmlzKCkge1xuICAgIGNvbnN0IGV2ZW50QnVzID0gbmV3IEV2ZW50QnVzKCk7XG4gICAgY29uc3QgY29tbWFuZEJ1cyA9IG5ldyBDb21tYW5kQnVzKCk7XG4gICAgbGV0IGJlbmNoID0gbmV3IEJlbmNoU29sdmVyRmFjYWRlKGV2ZW50QnVzLCBjb21tYW5kQnVzKTtcbiAgICBiZW5jaC5zdGFydCgpO1xuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgZXZlbnRCdXMub24oRXZlbnRUeXBlLkZhbGxpbmdUaWNrUHJvY2Vzc2VkLCAoZXZlbnQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5nYW1lRGF0YS5zdGF0cy5maWd1cmVzRmFsbGVuID49IDFfMDAwXzAwMCkge1xuICAgICAgICAgICAgICAgIGJlbmNoLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShldmVudC5nYW1lRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudEJ1cy5vbihFdmVudFR5cGUuR2FtZU92ZXIsIChldmVudDogR2FtZU92ZXJFdmVudCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShldmVudC5nYW1lRGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyBjcmVhdGUgYSB3b3JrZXIgYW5kIHJlZ2lzdGVyIHB1YmxpYyBmdW5jdGlvbnNcbndvcmtlcnBvb2wud29ya2VyKHtcbiAgICBzb2x2ZVRldHJpczogc29sdmVUZXRyaXMsXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==