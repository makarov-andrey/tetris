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
/* harmony export */   "FillableCellsCalculator": () => (/* binding */ FillableCellsCalculator),
/* harmony export */   "FillableCellsCalculatorParams": () => (/* binding */ FillableCellsCalculatorParams)
/* harmony export */ });
class FillableCellsCalculatorParams {
    minimumValuableHeight;
    powMultiplier;
    multiplier;
    constructor(minimumValuableHeight, powMultiplier, multiplier) {
        this.minimumValuableHeight = minimumValuableHeight;
        this.powMultiplier = powMultiplier;
        this.multiplier = multiplier;
    }
}
class FillableCellsCalculator {
    params;
    constructor(params = new FillableCellsCalculatorParams(5, 1, 1)) {
        this.params = params;
    }
    calculateScore(request) {
        const fieldHeight = request.gameData.settings.fieldHeight;
        const fieldWidth = request.gameData.settings.fieldWidth;
        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(request.imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > this.params.minimumValuableHeight) {
            fillableCellsScore = -fillableCellsCount
                * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth)
                    * this.params.powMultiplier)
                * this.params.multiplier;
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
/* harmony export */   "FilledHeightCalculator": () => (/* binding */ FilledHeightCalculator),
/* harmony export */   "FilledHeightCalculatorParams": () => (/* binding */ FilledHeightCalculatorParams)
/* harmony export */ });
class FilledHeightCalculatorParams {
    powMultiplier;
    multiplier;
    constructor(powMultiplier, multiplier) {
        this.powMultiplier = powMultiplier;
        this.multiplier = multiplier;
    }
}
class FilledHeightCalculator {
    params;
    constructor(params = new FilledHeightCalculatorParams(1, 3)) {
        this.params = params;
    }
    calculateScore(request) {
        const height = this.calculateHeight(request.imaginableMatrix);
        return -height
            * Math.pow(height, height / request.gameData.settings.fieldHeight
                * this.params.powMultiplier)
            * this.params.multiplier;
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
/* harmony export */   "HolesV1Calculator": () => (/* binding */ HolesV1Calculator),
/* harmony export */   "HolesV1CalculatorParams": () => (/* binding */ HolesV1CalculatorParams)
/* harmony export */ });
class HolesV1CalculatorParams {
    countDecreaseMultiplier;
    countIncreaseMultiplier;
    coveredHeightPowMultiplier;
    coveredHeightMultiplier;
    constructor(countDecreaseMultiplier, countIncreaseMultiplier, coveredHeightPowMultiplier, coveredHeightMultiplier) {
        this.countDecreaseMultiplier = countDecreaseMultiplier;
        this.countIncreaseMultiplier = countIncreaseMultiplier;
        this.coveredHeightPowMultiplier = coveredHeightPowMultiplier;
        this.coveredHeightMultiplier = coveredHeightMultiplier;
    }
}
class HolesV1Calculator {
    params;
    constructor(params = new HolesV1CalculatorParams(150, 70, 1, 5)) {
        this.params = params;
    }
    calculateScore(request) {
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(request.imaginableMatrix, request.gameData.matrix);
        const holesCountDecrease = request.originalHoles.length - holesCount;
        let holesScore = holesCountDecrease > 0
            ? holesCountDecrease * this.params.countDecreaseMultiplier
            : holesCountDecrease * this.params.countIncreaseMultiplier;
        if (holesCoveredHeight !== 0 && holesCount !== 0) {
            holesScore -=
                holesCoveredHeight
                    * Math.pow(holesCoveredHeight, holesCoveredHeight / (request.gameData.settings.fieldHeight * holesCount)
                        * this.params.coveredHeightPowMultiplier) * this.params.coveredHeightMultiplier;
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
/* harmony export */   "SquashedRowsCalculator": () => (/* binding */ SquashedRowsCalculator),
/* harmony export */   "SquashedRowsCalculatorParams": () => (/* binding */ SquashedRowsCalculatorParams)
/* harmony export */ });
class SquashedRowsCalculatorParams {
    multiplier;
    constructor(multiplier) {
        this.multiplier = multiplier;
    }
}
class SquashedRowsCalculator {
    params;
    constructor(params = new SquashedRowsCalculatorParams(5)) {
        this.params = params;
    }
    calculateScore(request) {
        return request.squashedLinesCount * this.params.multiplier;
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
/* harmony export */   "TunnelsCalculator": () => (/* binding */ TunnelsCalculator),
/* harmony export */   "TunnelsCalculatorParams": () => (/* binding */ TunnelsCalculatorParams)
/* harmony export */ });
class TunnelsCalculatorParams {
    minimumValuableHeight;
    countMultiplier;
    heightPowMultiplier;
    heightMultiplier;
    constructor(minimumValuableHeight, countMultiplier, heightPowMultiplier, heightMultiplier) {
        this.minimumValuableHeight = minimumValuableHeight;
        this.countMultiplier = countMultiplier;
        this.heightPowMultiplier = heightPowMultiplier;
        this.heightMultiplier = heightMultiplier;
    }
}
class TunnelsCalculator {
    params;
    constructor(params = new TunnelsCalculatorParams(3, 70, 1, 7)) {
        this.params = params;
    }
    calculateScore(request) {
        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(request.imaginableMatrix, request.gameData.matrix);
        if (tunnelsCount === 0) {
            return 0;
        }
        return (-tunnelsCount * this.params.countMultiplier)
            - (tunnelsSumHeight
                * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (request.gameData.settings.fieldHeight * tunnelsCount)
                    * this.params.heightPowMultiplier)
                * this.params.heightMultiplier);
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
            if (height >= this.params.minimumValuableHeight) {
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
    benchRunParameters;
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
    constructor(benchRunParameters, eventBus = new _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_0__.EventBus(), commandBus = new _Tetris_CommandBus_CommandBus__WEBPACK_IMPORTED_MODULE_1__.CommandBus(), gameController = new _Tetris_GameController__WEBPACK_IMPORTED_MODULE_2__.GameController(new _Tetris_TimingsHandler_ConstTimingsHandler__WEBPACK_IMPORTED_MODULE_10__.ConstTimingsHandler(Infinity), eventBus, commandBus), movingHandler = new _Tetris_MovingHandler_MovingHandler__WEBPACK_IMPORTED_MODULE_3__.MovingHandler(commandBus, eventBus), fallingFiguresProcessor = new _Tetris_FallingFiguresProcessor_RegularFallingFiguresProcessor__WEBPACK_IMPORTED_MODULE_20__.RegularFallingFiguresProcessor(commandBus, eventBus), figuresSpawner = new _Tetris_FiguresSpawner_AlwaysOneFigureSpawner__WEBPACK_IMPORTED_MODULE_4__.AlwaysOneFigureSpawner(eventBus, commandBus), levelCounter = new _Tetris_LevelCounter_SquashedRowsCounterBasedLevelCounter__WEBPACK_IMPORTED_MODULE_5__.SquashedRowsCounterBasedLevelCounter(eventBus, commandBus, 8, 15), comboCounter = new _Tetris_ComboCounter_ComboCounter__WEBPACK_IMPORTED_MODULE_6__.ComboCounter(commandBus, eventBus), scoreCounter = new _Tetris_ScoreCounter_FallTickScoreCounter__WEBPACK_IMPORTED_MODULE_7__.FallTickScoreCounter(commandBus, eventBus), statsCounter = new _Tetris_StatsCounter_StatsCounter__WEBPACK_IMPORTED_MODULE_8__.StatsCounter(commandBus, eventBus), gameData = _Tetris_Common__WEBPACK_IMPORTED_MODULE_9__.GameData.makeSimple(), tetrisSolver = new _TetrisSolver_TetrisSolver__WEBPACK_IMPORTED_MODULE_11__.TetrisSolver(eventBus, commandBus, new _TetrisSolver_FigurePlacingResolver_FigurePlacingResolver__WEBPACK_IMPORTED_MODULE_12__.FigurePlacingResolver(commandBus, new _TetrisSolver_ScoreCalculator_CalculatorAggregate__WEBPACK_IMPORTED_MODULE_13__.CalculatorAggregate([
        new _TetrisSolver_ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_14__.FillableCellsCalculator(benchRunParameters.fillableCellsCalculatorParams),
        new _TetrisSolver_ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_15__.FilledHeightCalculator(benchRunParameters.filledHeightCalculatorParams),
        new _TetrisSolver_ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_16__.HolesV1Calculator(benchRunParameters.holesV1CalculatorParams),
        new _TetrisSolver_ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_17__.SquashedRowsCalculator(benchRunParameters.squashedRowsCalculatorParams),
        new _TetrisSolver_ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_18__.TunnelsCalculator(benchRunParameters.tunnelsCalculatorParams),
    ])), new _TetrisSolver_FigurePlacingPerformer_InstantFigurePlacingPerformer__WEBPACK_IMPORTED_MODULE_19__.InstantFigurePlacingPerformer(commandBus))) {
        this.benchRunParameters = benchRunParameters;
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


const workerpool = __webpack_require__(/*! workerpool */ "./node_modules/workerpool/dist/workerpool.js");
async function solveTetris(params) {
    const eventBus = new _Tetris_EventBus_EventBus__WEBPACK_IMPORTED_MODULE_1__.EventBus();
    let bench = new _TetrisSolvingBench_BenchSolverFacade__WEBPACK_IMPORTED_MODULE_0__.BenchSolverFacade(params, eventBus);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyx5RUFBa0IsRUFBRSxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsZ0RBQWdEO0FBQ2hELFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDZCxXQUFXLEVBQUUsV0FBVztDQUMzQixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0NvbWJvQ291bnRlci9Db21ib0NvdW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9Db21tYW5kQnVzL0NvbW1hbmRCdXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0ZhbGxpbmdGaWd1cmVzUHJvY2Vzc29yL1JlZ3VsYXJGYWxsaW5nRmlndXJlc1Byb2Nlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL0ZpZ3VyZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9GaWd1cmVzU3Bhd25lci9BbHdheXNPbmVGaWd1cmVTcGF3bmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvR2FtZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9MZXZlbENvdW50ZXIvU3F1YXNoZWRSb3dzQ291bnRlckJhc2VkTGV2ZWxDb3VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvTW92aW5nSGFuZGxlci9Nb3ZpbmdIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvU2NvcmVDb3VudGVyL0ZhbGxUaWNrU2NvcmVDb3VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvU3RhdHNDb3VudGVyL1N0YXRzQ291bnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzL1RpbWluZ3NIYW5kbGVyL0NvbnN0VGltaW5nc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpcy9VdGlscy9FbnVtSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0ZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0luc3RhbnRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvRmlndXJlUGxhY2luZ1Jlc29sdmVyL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9DYWxjdWxhdG9yQWdncmVnYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxhYmxlQ2VsbHMvRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvSG9sZXMvSG9sZXNWMUNhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1NxdWFzaGVkUm93cy9TcXVhc2hlZFJvd3NDYWxjdWxhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1R1bm5lbHMvVHVubmVsc0NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9UZXRyaXNTb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9VdGlscy9Ib2xlc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmluZ0JlbmNoL0JlbmNoU29sdmVyRmFjYWRlLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93b3JrZXJwb29sL2Rpc3Qvd29ya2VycG9vbC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvdGV0cmlzX3NvbHZpbmdfd29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIENvbWJvQ291bnRlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwdWJsaWMgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICkge1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GYWxsVGlja1Byb2Nlc3NlZChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudHJhbnNmZXJyZWRUb01hdHJpeEZpZ3VyZXMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuc3F1YXNoZWRMaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBldmVudC5nYW1lRGF0YS5jb21ibyArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuZ2FtZURhdGEuY29tYm8gPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtGaWd1cmVUdXJuU3RhdGV9IGZyb20gXCIuLi9GaWd1cmVzXCI7XG5cbmV4cG9ydCBlbnVtIENvbW1hbmRUeXBlIHtcbiAgICBJbml0R2FtZSxcbiAgICBSZXN1bWVHYW1lLFxuICAgIFBhdXNlR2FtZSxcbiAgICBGaWd1cmVzRmFsbFRpY2ssXG4gICAgR2FtZU92ZXIsXG4gICAgUmVuZGVyLFxuICAgIE1vdmVMZWZ0LFxuICAgIE1vdmVSaWdodCxcbiAgICBUdXJuQ2xvY2t3aXNlLFxuICAgIE1vdmVEb3duLFxuICAgIEZpZ3VyZXNGYWxsRG93bixcbiAgICBNb3ZlVG9YLFxuICAgIE1vdmVUb1ksXG4gICAgVHVyblRvU3RhdGUsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZCB7XG4gICAgZ2FtZURhdGE6IEdhbWVEYXRhO1xuXG4gICAgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBJbml0R2FtZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuSW5pdEdhbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVzdW1lR2FtZUNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuUmVzdW1lR2FtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXVzZUdhbWVDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLlBhdXNlR2FtZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWd1cmVzRmFsbFRpY2tDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsVGljaztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lT3ZlckNvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuR2FtZU92ZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5SZW5kZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZUxlZnRDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLk1vdmVMZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVSaWdodENvbW1hbmQgaW1wbGVtZW50cyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuTW92ZVJpZ2h0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFR1cm5DbG9ja3dpc2VDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLlR1cm5DbG9ja3dpc2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZURvd25Db21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLk1vdmVEb3duO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVUb1hDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyB4OiBudW1iZXJcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuTW92ZVRvWDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb3ZlVG9ZQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICAgICBwdWJsaWMgeTogbnVtYmVyLFxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXRDb21tYW5kVHlwZSgpOiBDb21tYW5kVHlwZSB7XG4gICAgICAgIHJldHVybiBDb21tYW5kVHlwZS5Nb3ZlVG9ZO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFR1cm5Ub1N0YXRlQ29tbWFuZCBpbXBsZW1lbnRzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICAgICBwdWJsaWMgdHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGVcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0Q29tbWFuZFR5cGUoKTogQ29tbWFuZFR5cGUge1xuICAgICAgICByZXR1cm4gQ29tbWFuZFR5cGUuVHVyblRvU3RhdGU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHJvcEZpZ3VyZXNDb21tYW5kIGltcGxlbWVudHMgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldENvbW1hbmRUeXBlKCk6IENvbW1hbmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsRG93bjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kQnVzIHtcbiAgICBwcml2YXRlIGhhbmRsZXJzOiBNYXA8Q29tbWFuZFR5cGUsICgocGF5bG9hZDogQ29tbWFuZCkgPT4gdm9pZClbXT4gPSBuZXcgTWFwKCk7XG5cbiAgICBwdWJsaWMgYWRkSGFuZGxlcihldmVudDogQ29tbWFuZFR5cGUsIGhhbmRsZXI6ICguLi5fOiBhbnkpID0+IHZvaWQsIHVuaXF1ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgICAgICBpZiAodW5pcXVlICYmIGhhbmRsZXJzLnNvbWUoYm91bmRIYW5kbGVyID0+IGJvdW5kSGFuZGxlciA9PT0gaGFuZGxlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLmhhbmRsZXJzLnNldChldmVudCwgaGFuZGxlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVIYW5kbGVyKGV2ZW50OiBDb21tYW5kVHlwZSwgaGFuZGxlcjogKC4uLl86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmdldChldmVudCkgfHwgW107XG4gICAgICAgIGxldCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZXJzLnNldChldmVudCwgaGFuZGxlcnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBydW4ocGF5bG9hZDogQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBsZXQgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzLmdldChwYXlsb2FkLmdldENvbW1hbmRUeXBlKCkpIHx8IFtdO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGhhbmRsZXIgPT4ge2hhbmRsZXIocGF5bG9hZCl9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0ZpZ3VyZSwgRmlndXJlVHVyblN0YXRlLCBMZWZ0TEZpZ3VyZSwgTFpGaWd1cmUsIFJpZ2h0TEZpZ3VyZSwgUlpGaWd1cmUsIFNxdWFyZUZpZ3VyZSwgU3RpY2tGaWd1cmUsIFRGaWd1cmV9IGZyb20gXCIuL0ZpZ3VyZXNcIjtcblxuLyoqXG4gKiB4IGZvciBob3Jpem9udGFsIHBvc2l0aW9uaW5nXG4gKiB5IGZvciB2ZXJ0aWNhbCBwb3NpdGlvbmluZ1xuICovXG5leHBvcnQgY2xhc3MgQ29vcmRpbmF0ZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB4OiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyB5OiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmFsbGluZ0ZpZ3VyZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBmaWd1cmU6IEZpZ3VyZSxcbiAgICAgICAgcHVibGljIHBvc2l0aW9uOiBDb29yZGluYXRlLFxuICAgICAgICBwdWJsaWMgdHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGUsXG4gICAgICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nfHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lU2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZmllbGRXaWR0aDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZmllbGRIZWlnaHQ6IG51bWJlcixcbiAgICAgICAgcHVibGljIGZpZ3VyZXM6IEZpZ3VyZVtdLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFN0YXRzIHtcbiAgICBwdWJsaWMgZmlndXJlc0ZhbGxlbiA9IDA7XG4gICAgcHVibGljIGxpbmVzU3F1YXNoZWQgPSAwO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZURhdGEge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgaXNHYW1lT3ZlcjogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgZmFsbGluZ0ZpZ3VyZXM6IEZhbGxpbmdGaWd1cmVbXSA9IFtdLFxuICAgICAgICBwdWJsaWMgbWF0cml4OiBib29sZWFuW11bXSA9IFtdLFxuICAgICAgICBwdWJsaWMgbmV4dFRpY2tUaW1lb3V0SWQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaWMgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgICAgICAgcHVibGljIGxldmVsOiBudW1iZXIgPSAxLFxuICAgICAgICBwdWJsaWMgc2NvcmU6IG51bWJlciA9IDAsXG4gICAgICAgIHB1YmxpYyBjb21ibzogbnVtYmVyID0gMCxcbiAgICAgICAgcHVibGljIHN0YXRzOiBTdGF0cyA9IG5ldyBTdGF0cygpLFxuICAgICkge31cblxuICAgIHN0YXRpYyBtYWtlU2ltcGxlKHdpZHRoOiBudW1iZXIgPSAxMCwgaGVpZ2h0OiBudW1iZXIgPSAyMCk6IEdhbWVEYXRhIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lRGF0YShcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIG5ldyBBcnJheShoZWlnaHQpLmZpbGwoW10pXG4gICAgICAgICAgICAgICAgLm1hcChfID0+IG5ldyBBcnJheSh3aWR0aCkuZmlsbChmYWxzZSkpLFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBHYW1lU2V0dGluZ3MoXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJpZ2h0TEZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgTGVmdExGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNxdWFyZUZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgU3RpY2tGaWd1cmUoKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IExaRmlndXJlKCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBSWkZpZ3VyZSgpLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RmFsbGluZ0ZpZ3VyZSwgR2FtZURhdGF9IGZyb20gXCIuLi9Db21tb25cIjtcblxuZXhwb3J0IGVudW0gRXZlbnRUeXBlIHtcbiAgICBGYWxsaW5nVGlja1Byb2Nlc3NlZCxcbiAgICBHYW1lT3ZlcixcbiAgICBGaWd1cmVzTW92ZWQsXG4gICAgTGV2ZWxVcCxcbiAgICBGaWd1cmVzU3Bhd25lZCxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFdmVudCB7XG4gICAgZ2FtZURhdGE6IEdhbWVEYXRhO1xuXG4gICAgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQgaW1wbGVtZW50cyBFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgICAgIHB1YmxpYyB0cmFuc2ZlcnJlZFRvTWF0cml4RmlndXJlczogRmFsbGluZ0ZpZ3VyZVtdLFxuICAgICAgICBwdWJsaWMgc3F1YXNoZWRMaW5lczogbnVtYmVyW10sXG4gICAgICAgIHB1YmxpYyBkcm9wcGVkTGluZXM6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2FtZU92ZXJFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuR2FtZU92ZXI7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlndXJlc01vdmVkRXZlbnQgaW1wbGVtZW50cyBFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldEV2ZW50VHlwZSgpOiBFdmVudFR5cGUge1xuICAgICAgICByZXR1cm4gRXZlbnRUeXBlLkZpZ3VyZXNNb3ZlZDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXZlbFVwRXZlbnQgaW1wbGVtZW50cyBFdmVudCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YTogR2FtZURhdGEsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldEV2ZW50VHlwZSgpOiBFdmVudFR5cGUge1xuICAgICAgICByZXR1cm4gRXZlbnRUeXBlLkxldmVsVXA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlndXJlc1NwYXduZWRFdmVudCBpbXBsZW1lbnRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgcHVibGljIG5ld0ZpZ3VyZXM6IEZhbGxpbmdGaWd1cmVbXSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRUeXBlKCk6IEV2ZW50VHlwZSB7XG4gICAgICAgIHJldHVybiBFdmVudFR5cGUuRmlndXJlc1NwYXduZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRCdXMge1xuICAgIHByaXZhdGUgaGFuZGxlcnM6IE1hcDxFdmVudFR5cGUsICgoLi4uXzogYW55KSA9PiB2b2lkKVtdPiA9IG5ldyBNYXAoKTtcblxuICAgIHB1YmxpYyBvbihldmVudDogRXZlbnRUeXBlLCBoYW5kbGVyOiAoLi4uXzogYW55KSA9PiB2b2lkLCB1bmlxdWU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICAgICAgaWYgKHVuaXF1ZSAmJiBoYW5kbGVycy5zb21lKGJvdW5kSGFuZGxlciA9PiBib3VuZEhhbmRsZXIgPT09IGhhbmRsZXIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5oYW5kbGVycy5zZXQoZXZlbnQsIGhhbmRsZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb2ZmKGV2ZW50OiBFdmVudFR5cGUsIGhhbmRsZXI6ICguLi5fOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgICAgICBsZXQgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVycy5zZXQoZXZlbnQsIGhhbmRsZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmlyZShldmVudFBheWxvYWQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnMuZ2V0KGV2ZW50UGF5bG9hZC5nZXRFdmVudFR5cGUoKSkgfHwgW107XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goaGFuZGxlciA9PiB7aGFuZGxlcihldmVudFBheWxvYWQpfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDb29yZGluYXRlLCBGYWxsaW5nRmlndXJlLCBHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtEcm9wRmlndXJlc0NvbW1hbmQsIENvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBHYW1lT3ZlckNvbW1hbmQsIEZpZ3VyZXNGYWxsVGlja0NvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnR9IGZyb20gXCIuLi9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nQ2hlY2tlcn0gZnJvbSBcIi4uL1V0aWxzL0ZpZ3VyZVBsYWNpbmdDaGVja2VyXCI7XG5cbmNsYXNzIEZhbGxpbmdSZXN1bHQge1xuICAgIHB1YmxpYyB0cmFuc2ZlcnJlZEZpZ3VyZXM6IEZhbGxpbmdGaWd1cmVbXSA9IFtdO1xuICAgIHB1YmxpYyBpc0dhbWVPdmVyOiBib29sZWFuID0gZmFsc2U7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWd1bGFyRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5GaWd1cmVzRmFsbFRpY2ssIHRoaXMucHJvY2Vzc0ZpZ3VyZXNGYWxsVGlja0NvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkZpZ3VyZXNGYWxsRG93biwgdGhpcy5wcm9jZXNzRHJvcEZpZ3VyZXNDb21tYW5kLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc0ZpZ3VyZXNGYWxsVGlja0NvbW1hbmQoY29tbWFuZDogRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCkge1xuICAgICAgICBjb25zdCBmYWxsaW5nUmVzdWx0ID0gdGhpcy5mYWxsRmlndXJlc0Zvck9uZUNlbGwoY29tbWFuZC5nYW1lRGF0YSk7XG4gICAgICAgIGxldCBzcXVhc2hlZExpbmVzID0gdGhpcy5zcXVhc2hMaW5lcyhjb21tYW5kLmdhbWVEYXRhLm1hdHJpeCk7XG4gICAgICAgIGlmIChmYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IEdhbWVPdmVyQ29tbWFuZChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KFxuICAgICAgICAgICAgY29tbWFuZC5nYW1lRGF0YSxcbiAgICAgICAgICAgIGZhbGxpbmdSZXN1bHQudHJhbnNmZXJyZWRGaWd1cmVzLFxuICAgICAgICAgICAgc3F1YXNoZWRMaW5lcyxcbiAgICAgICAgICAgIDBcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRHJvcEZpZ3VyZXNDb21tYW5kKGNvbW1hbmQ6IERyb3BGaWd1cmVzQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBsZXQgZmFsbGluZ1Jlc3VsdCA9IG5ldyBGYWxsaW5nUmVzdWx0KCk7XG4gICAgICAgIGxldCBkcm9wcGVkTGluZXMgPSAwO1xuICAgICAgICB3aGlsZSAoY29tbWFuZC5nYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBvbmVDZWxsRmFsbGluZ1Jlc3VsdCA9IHRoaXMuZmFsbEZpZ3VyZXNGb3JPbmVDZWxsKGNvbW1hbmQuZ2FtZURhdGEpO1xuICAgICAgICAgICAgZmFsbGluZ1Jlc3VsdC50cmFuc2ZlcnJlZEZpZ3VyZXMucHVzaCguLi5vbmVDZWxsRmFsbGluZ1Jlc3VsdC50cmFuc2ZlcnJlZEZpZ3VyZXMpO1xuICAgICAgICAgICAgZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyID0gZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyIHx8IG9uZUNlbGxGYWxsaW5nUmVzdWx0LmlzR2FtZU92ZXI7XG4gICAgICAgICAgICBkcm9wcGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3F1YXNoZWRMaW5lcyA9IHRoaXMuc3F1YXNoTGluZXMoY29tbWFuZC5nYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBpZiAoZmFsbGluZ1Jlc3VsdC5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBHYW1lT3ZlckNvbW1hbmQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmFsbFRpY2tQcm9jZXNzZWRFdmVudChcbiAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEsXG4gICAgICAgICAgICBmYWxsaW5nUmVzdWx0LnRyYW5zZmVycmVkRmlndXJlcyxcbiAgICAgICAgICAgIHNxdWFzaGVkTGluZXMsXG4gICAgICAgICAgICBkcm9wcGVkTGluZXMgLSAxLFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhbGxGaWd1cmVzRm9yT25lQ2VsbChnYW1lRGF0YTogR2FtZURhdGEpOiBGYWxsaW5nUmVzdWx0IHtcbiAgICAgICAgbGV0IGZhbGxpbmdSZXN1bHQgPSBuZXcgRmFsbGluZ1Jlc3VsdCgpO1xuICAgICAgICBnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5mb3JFYWNoKChmYWxsaW5nRmlndXJlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlndXJlQ2FuRmFsbChnYW1lRGF0YS5tYXRyaXgsIGZhbGxpbmdGaWd1cmUpKSB7XG4gICAgICAgICAgICAgICAgZmFsbGluZ0ZpZ3VyZS5wb3NpdGlvbi55Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBmaWd1cmVHYW1lT3ZlclJlc3VsdCA9IHRoaXMudHJhbnNmZXJGaWd1cmVUb01hdHJpeChcbiAgICAgICAgICAgICAgICAgICAgZ2FtZURhdGEubWF0cml4LFxuICAgICAgICAgICAgICAgICAgICBmYWxsaW5nRmlndXJlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBmYWxsaW5nUmVzdWx0LnRyYW5zZmVycmVkRmlndXJlcy5wdXNoKC4uLmdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLnNwbGljZShpbmRleCwgMSkpO1xuICAgICAgICAgICAgICAgIGZhbGxpbmdSZXN1bHQuaXNHYW1lT3ZlciA9IGZhbGxpbmdSZXN1bHQuaXNHYW1lT3ZlciB8fCBmaWd1cmVHYW1lT3ZlclJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxsaW5nUmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlndXJlQ2FuRmFsbChtYXRyaXg6IGJvb2xlYW5bXVtdLCBmYWxsaW5nRmlndXJlOiBGYWxsaW5nRmlndXJlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgIGZhbGxpbmdGaWd1cmUuZmlndXJlLmdldFR1cm4oZmFsbGluZ0ZpZ3VyZS50dXJuU3RhdGUpLFxuICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmFsbGluZ0ZpZ3VyZS5wb3NpdGlvbi54LCBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnkgKyAxKSxcbiAgICAgICAgICAgIG1hdHJpeFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNmZXJGaWd1cmVUb01hdHJpeChtYXRyaXg6IGJvb2xlYW5bXVtdLCBmYWxsaW5nRmlndXJlOiBGYWxsaW5nRmlndXJlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIGZhbGxpbmdGaWd1cmUuZmlndXJlLmdldFR1cm4oZmFsbGluZ0ZpZ3VyZS50dXJuU3RhdGUpXG4gICAgICAgICAgICAuZm9yRWFjaCgocm93LCBmaWd1cmVDZWxsWSkgPT4ge1xuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsVmFsdWUsIGZpZ3VyZUNlbGxYKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2VsbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdHJpeFggPSBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnggKyBmaWd1cmVDZWxsWDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdHJpeFkgPSBmYWxsaW5nRmlndXJlLnBvc2l0aW9uLnkgKyBmaWd1cmVDZWxsWTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdHJpeFkgaW4gbWF0cml4XG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBtYXRyaXhYIGluIG1hdHJpeFttYXRyaXhZXVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgIW1hdHJpeFttYXRyaXhZXVttYXRyaXhYXVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdHJpeFttYXRyaXhZXVttYXRyaXhYXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpc0dhbWVPdmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3F1YXNoTGluZXMobWF0cml4OiBib29sZWFuW11bXSk6IG51bWJlcltdIHtcbiAgICAgICAgbGV0IGxpbmVzVG9TcXVhc2g6IG51bWJlcltdID0gW107XG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGxldCBjYW5CZVNxdWFzaGVkID0gcm93LmV2ZXJ5KGNlbGwgPT4gY2VsbCk7XG4gICAgICAgICAgICBpZiAoY2FuQmVTcXVhc2hlZCkge1xuICAgICAgICAgICAgICAgIGxpbmVzVG9TcXVhc2gucHVzaCh5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIGxpbmVzVG9TcXVhc2guZm9yRWFjaCh5ID0+IHtcbiAgICAgICAgICAgIG1hdHJpeC5zcGxpY2UoeSwgMSk7XG4gICAgICAgICAgICBtYXRyaXgudW5zaGlmdChuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbChmYWxzZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpbmVzVG9TcXVhc2g7XG4gICAgfVxufVxuIiwiZXhwb3J0IGVudW0gRmlndXJlVHVyblN0YXRlIHtcbiAgICBPbmUsXG4gICAgVHdvLFxuICAgIFRocmVlLFxuICAgIEZvdXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlndXJlIHtcbiAgICAvKipcbiAgICAgKiBBbnkgZmlndXJlIG11c3QgYmUgYWJsZSB0byB0dXJuIDQgdGltZXMgaW4gMiBkaW1lbnNpb25zLlxuICAgICAqIEFsbCB0dXJucyBhcmUgY2xvY2t3aXNlLlxuICAgICAqL1xuICAgIGdldFR1cm4oZmlndXJlVHVyblN0YXRlOiBGaWd1cmVUdXJuU3RhdGUpOiBib29sZWFuW11bXTtcbiAgICBnZXRGaXJzdFR1cm4oKTogYm9vbGVhbltdW107XG4gICAgZ2V0U2Vjb25kVHVybigpOiBib29sZWFuW11bXTtcbiAgICBnZXRUaGlyZFR1cm4oKTogYm9vbGVhbltdW107XG4gICAgZ2V0Rm9ydGhUdXJuKCk6IGJvb2xlYW5bXVtdO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGaWd1cmUgaW1wbGVtZW50cyBGaWd1cmV7XG4gICAgcHVibGljIGFic3RyYWN0IGdldEZpcnN0VHVybigpOiBib29sZWFuW11bXTtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0U2Vjb25kVHVybigpOiBib29sZWFuW11bXTtcbiAgICBwdWJsaWMgYWJzdHJhY3QgZ2V0VGhpcmRUdXJuKCk6IGJvb2xlYW5bXVtdO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRGb3J0aFR1cm4oKTogYm9vbGVhbltdW107XG5cbiAgICBnZXRUdXJuKGZpZ3VyZVR1cm5TdGF0ZTogRmlndXJlVHVyblN0YXRlKTogYm9vbGVhbltdW10ge1xuICAgICAgICBzd2l0Y2ggKGZpZ3VyZVR1cm5TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuT25lOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpcnN0VHVybigpO1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuVHdvOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlY29uZFR1cm4oKTtcbiAgICAgICAgICAgIGNhc2UgRmlndXJlVHVyblN0YXRlLlRocmVlOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRoaXJkVHVybigpO1xuICAgICAgICAgICAgY2FzZSBGaWd1cmVUdXJuU3RhdGUuRm91cjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3J0aFR1cm4oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBUaGlzIGNsYXNzIGdpdmVzIGFuIGVhc3kgd2F5IHRvIGRlZmluZSBmaWd1cmVzIGZvciB0ZXRyaXMuXG4gKiBKdXN0IGltcGxlbWVudCB0aGUgZ2V0RmlndXJlIG1ldGhvZCBhbmQgcmV0dXJuIGZpZ3VyZSBsaWtlIHRoaXM6XG4gKiBgYGAodHMpXG4gKiBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAqICAgICByZXR1cm4gW1xuICogICAgICAgICBbdHJ1ZSwgIHRydWUsIHRydWVdLFxuICogICAgICAgICBbZmFsc2UsIHRydWUsIGZhbHNlXSxcbiAqICAgICAgICAgW3RydWUsICB0cnVlLCB0cnVlXSxcbiAqICAgICBdO1xuICogfVxuICogYGBgXG4gKlxuICogT3IgZGVmaW5lIGl0IGxpa2UgdGhpcyBmb3IgbW9yZSB2aXN1YWwgcHJlc2VudGF0aW9uOlxuICogYGBgKHRzKVxuICogcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gKiAgICAgcmV0dXJuIFtcbiAqICAgICAgICAgXCIjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gKiAgICAgICAgIFwiLSMtXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICogICAgICAgICBcIiMjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAqICAgICBdO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUgZXh0ZW5kcyBBYnN0cmFjdEZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEZpZ3VyZSgpOiBib29sZWFuW11bXTtcblxuICAgIHByaXZhdGUgZ2V0Tm9ybWFsaXplZEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIGxldCBmaWd1cmUgPSB0aGlzLmdldEZpZ3VyZSgpO1xuICAgICAgICBsZXQgdGhlTG9uZ2VzdFJvd1NpemUgPSBmaWd1cmUucmVkdWNlKFxuICAgICAgICAgICAgKHByZXZpb3VzLCBjdXJyZW50KSA9PiBNYXRoLm1heChwcmV2aW91cywgY3VycmVudC5sZW5ndGgpLFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmlndXJlLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsTGVuZ3RoID0gcm93Lmxlbmd0aDtcbiAgICAgICAgICAgIHJvdy5sZW5ndGggPSB0aGVMb25nZXN0Um93U2l6ZTtcbiAgICAgICAgICAgIHJldHVybiByb3cuZmlsbChmYWxzZSwgb3JpZ2luYWxMZW5ndGggLSAxLCB0aGVMb25nZXN0Um93U2l6ZSAtIDEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Rmlyc3RUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9ybWFsaXplZEZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWNvbmRUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsRmlndXJlID0gdGhpcy5nZXROb3JtYWxpemVkRmlndXJlKCk7XG4gICAgICAgIGxldCB0dXJuZWRGaWd1cmU6IGJvb2xlYW5bXVtdID0gW107XG4gICAgICAgIGxldCBvcmlnaW5hbEZpZ3VyZUhlaWdodCA9IG9yaWdpbmFsRmlndXJlLmxlbmd0aDtcbiAgICAgICAgbGV0IG9yaWdpbmFsRmlndXJlV2lkdGggPSBvcmlnaW5hbEZpZ3VyZVswXS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgb3JpZ2luYWxGaWd1cmVXaWR0aDsgeCsrKSB7XG4gICAgICAgICAgICB0dXJuZWRGaWd1cmVbeF0gPSBuZXcgQXJyYXkob3JpZ2luYWxGaWd1cmVIZWlnaHQpLmZpbGwoZmFsc2UpO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBvcmlnaW5hbEZpZ3VyZUhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdHVybmVkRmlndXJlW3hdW29yaWdpbmFsRmlndXJlSGVpZ2h0IC0geSAtIDFdID0gb3JpZ2luYWxGaWd1cmVbeV1beF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR1cm5lZEZpZ3VyZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGhpcmRUdXJuKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmlyc3RUdXJuKCkucmV2ZXJzZSgpLm1hcChyb3cgPT4gcm93LnJldmVyc2UoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZvcnRoVHVybigpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNlY29uZFR1cm4oKS5yZXZlcnNlKCkubWFwKHJvdyA9PiByb3cucmV2ZXJzZSgpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBURmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCItIy1cIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmlnaHRMRmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCItLSNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVmdExGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgICAgICBcIiMtLVwiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTcXVhcmVGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgICAgIFwiIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RpY2tGaWd1cmUgZXh0ZW5kcyBTaW1wbHlSb3RhdGFibGVGaWd1cmUge1xuICAgIHByb3RlY3RlZCBnZXRGaWd1cmUoKTogYm9vbGVhbltdW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCIjIyMjXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExaRmlndXJlIGV4dGVuZHMgU2ltcGx5Um90YXRhYmxlRmlndXJlIHtcbiAgICBwcm90ZWN0ZWQgZ2V0RmlndXJlKCk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiIyMtXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICAgICAgXCItIyNcIi5zcGxpdChcIlwiKS5tYXAoaXRlbSA9PiBpdGVtID09PSBcIiNcIiksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSWkZpZ3VyZSBleHRlbmRzIFNpbXBseVJvdGF0YWJsZUZpZ3VyZSB7XG4gICAgcHJvdGVjdGVkIGdldEZpZ3VyZSgpOiBib29sZWFuW11bXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcIi0jI1wiLnNwbGl0KFwiXCIpLm1hcChpdGVtID0+IGl0ZW0gPT09IFwiI1wiKSxcbiAgICAgICAgICAgIFwiIyMtXCIuc3BsaXQoXCJcIikubWFwKGl0ZW0gPT4gaXRlbSA9PT0gXCIjXCIpLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudCwgRmlndXJlc1NwYXduZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0ZpZ3VyZVR1cm5TdGF0ZX0gZnJvbSBcIi4uL0ZpZ3VyZXNcIjtcbmltcG9ydCB7Q29vcmRpbmF0ZSwgRmFsbGluZ0ZpZ3VyZSwgR2FtZURhdGF9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7Q29tbWFuZEJ1cywgQ29tbWFuZFR5cGUsIEluaXRHYW1lQ29tbWFuZH0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vVXRpbHMvRW51bUhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQWx3YXlzT25lRmlndXJlU3Bhd25lciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEhhbmRsZXIoZXZlbnQ6IEluaXRHYW1lQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKFxuICAgICAgICAgICAgRXZlbnRUeXBlLkZhbGxpbmdUaWNrUHJvY2Vzc2VkLFxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT25GYWxsVGljay5iaW5kKHRoaXMpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJvY2Vzc09uRmFsbFRpY2soZXZlbnQ6IEZhbGxUaWNrUHJvY2Vzc2VkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRGaWd1cmUoZXZlbnQuZ2FtZURhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRmlndXJlKGdhbWVEYXRhOiBHYW1lRGF0YSk6IHZvaWQge1xuICAgICAgICBpZiAoZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMubGVuZ3RoID4gMCB8fCBnYW1lRGF0YS5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWd1cmVJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdhbWVEYXRhLnNldHRpbmdzLmZpZ3VyZXMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZmlndXJlID0gZ2FtZURhdGEuc2V0dGluZ3MuZmlndXJlc1tmaWd1cmVJbmRleF07XG4gICAgICAgIGNvbnN0IHR1cm5TdGF0ZSA9IEVudW1IZWxwZXIuR2V0UmFuZG9tKEZpZ3VyZVR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbnN0IGZpZ3VyZU1hdHJpeCA9IGZpZ3VyZS5nZXRUdXJuKHR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbnN0IGZpZ3VyZVdpZHRoID0gTWF0aC5tYXgoLi4uZmlndXJlTWF0cml4Lm1hcChyb3cgPT4gcm93Lmxlbmd0aCkpO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gbmV3IENvb3JkaW5hdGUoXG4gICAgICAgICAgICBNYXRoLmNlaWwoZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aCAvIDIgLSBmaWd1cmVXaWR0aCAvIDIpIC0gMSxcbiAgICAgICAgICAgIC1maWd1cmVNYXRyaXgubGVuZ3RoLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmYWxsaW5nRmlndXJlID0gbmV3IEZhbGxpbmdGaWd1cmUoXG4gICAgICAgICAgICBmaWd1cmUsXG4gICAgICAgICAgICBjb29yZGluYXRlLFxuICAgICAgICAgICAgdHVyblN0YXRlXG4gICAgICAgICk7XG4gICAgICAgIGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLnB1c2goZmFsbGluZ0ZpZ3VyZSk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmlndXJlc1NwYXduZWRFdmVudChnYW1lRGF0YSwgW2ZhbGxpbmdGaWd1cmVdKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtUaW1pbmdzSGFuZGxlcn0gZnJvbSBcIi4vVGltaW5nc0hhbmRsZXIvVGltaW5nc0hhbmRsZXJcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudCwgRmlndXJlc01vdmVkRXZlbnQsIEdhbWVPdmVyRXZlbnR9IGZyb20gXCIuL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBGaWd1cmVzRmFsbFRpY2tDb21tYW5kLCBJbml0R2FtZUNvbW1hbmQsIFBhdXNlR2FtZUNvbW1hbmQsIFJlbmRlckNvbW1hbmQsIFJlc3VtZUdhbWVDb21tYW5kfSBmcm9tIFwiLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICAgIHByaXZhdGUgZ2FtZURhdGE6IEdhbWVEYXRhID0gR2FtZURhdGEubWFrZVNpbXBsZSgpO1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwcml2YXRlIHRpbWluZ3NIYW5kbGVyOiBUaW1pbmdzSGFuZGxlcixcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5SZXN1bWVHYW1lLCB0aGlzLnJlc3VtZUdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5QYXVzZUdhbWUsIHRoaXMucGF1c2VHYW1lSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuR2FtZU92ZXIsIHRoaXMuZ2FtZU92ZXJIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdhbWVEYXRhID0gY29tbWFuZC5nYW1lRGF0YTtcbiAgICAgICAgdGhpcy5nYW1lRGF0YS5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQsIHRoaXMub25GYWxsVGlja1Byb2Nlc3NlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3VtZUdhbWVIYW5kbGVyKGNvbW1hbmQ6IFJlc3VtZUdhbWVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZ2FtZURhdGEuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgSW5pdEdhbWVDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZhbGxUaWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXVzZUdhbWVIYW5kbGVyKGNvbW1hbmQ6IFBhdXNlR2FtZUNvbW1hbmQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IGNvbW1hbmQuZ2FtZURhdGE7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmdhbWVEYXRhLm5leHRUaWNrVGltZW91dElkKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgUmVuZGVyQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnYW1lT3ZlckhhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2FtZURhdGEuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVEYXRhLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5nYW1lRGF0YS5uZXh0VGlja1RpbWVvdXRJZCk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgR2FtZU92ZXJFdmVudCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWxsVGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGV2ZW50OiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmdhbWVEYXRhLm5leHRUaWNrVGltZW91dElkKTtcbiAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLnRpbWluZ3NIYW5kbGVyLmdldERlbGF5Rm9yTmV4dFRpY2tNcyh0aGlzLmdhbWVEYXRhKTtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVEYXRhLmlzR2FtZU92ZXIgJiYgZGVsYXkgIT0gSW5maW5pdHkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZURhdGEubmV4dFRpY2tUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgIHRoaXMuZmFsbFRpY2suYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWluZ3NIYW5kbGVyLmdldERlbGF5Rm9yTmV4dFRpY2tNcyh0aGlzLmdhbWVEYXRhKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIFNxdWFzaGVkUm93c0NvdW50ZXJCYXNlZExldmVsQ291bnRlciB7XG4gICAgcHJpdmF0ZSBzcXVhc2hlZFJvd3NDb3VudGVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGxldmVsSW5jcmVhc2VPblNxdWFzaGVkUm93c051bWJlcjogbnVtYmVyLFxuICAgICAgICBwcml2YXRlIG1heExldmVsczogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Jbml0R2FtZSwgdGhpcy5wcm9jZXNzSW5pdEdhbWVDb21tYW5kLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzSW5pdEdhbWVDb21tYW5kKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZhbGxUaWNrUHJvY2Vzc2VkKGV2ZW50OiBGYWxsVGlja1Byb2Nlc3NlZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3F1YXNoZWRSb3dzQ291bnRlcisrO1xuICAgICAgICBpZiAodGhpcy5zcXVhc2hlZFJvd3NDb3VudGVyID49IHRoaXMubGV2ZWxJbmNyZWFzZU9uU3F1YXNoZWRSb3dzTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLnNxdWFzaGVkUm93c0NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgZXZlbnQuZ2FtZURhdGEubGV2ZWwgPSBNYXRoLm1pbih0aGlzLm1heExldmVscywgZXZlbnQuZ2FtZURhdGEubGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgQ29tbWFuZEJ1cyxcbiAgICBDb21tYW5kVHlwZSxcbiAgICBNb3ZlTGVmdENvbW1hbmQsXG4gICAgTW92ZVJpZ2h0Q29tbWFuZCxcbiAgICBUdXJuQ2xvY2t3aXNlQ29tbWFuZCxcbiAgICBNb3ZlRG93bkNvbW1hbmQsXG4gICAgRmlndXJlc0ZhbGxUaWNrQ29tbWFuZCxcbiAgICBNb3ZlVG9YQ29tbWFuZCxcbiAgICBNb3ZlVG9ZQ29tbWFuZCxcbiAgICBUdXJuVG9TdGF0ZUNvbW1hbmRcbn0gZnJvbSBcIi4uL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVUdXJuU3RhdGV9IGZyb20gXCIuLi9GaWd1cmVzXCI7XG5pbXBvcnQge0V2ZW50QnVzLCBGaWd1cmVzTW92ZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmV9IGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi9VdGlscy9GaWd1cmVQbGFjaW5nQ2hlY2tlclwiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vVXRpbHMvRW51bUhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgTW92aW5nSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBldmVudEJ1czogRXZlbnRCdXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVMZWZ0LCB0aGlzLnByb2Nlc3NNb3ZlTGVmdENvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVSaWdodCwgdGhpcy5wcm9jZXNzTW92ZVJpZ2h0Q29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuTW92ZURvd24sIHRoaXMucHJvY2Vzc01vdmVEb3duQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuVHVybkNsb2Nrd2lzZSwgdGhpcy5wcm9jZXNzVHVybkNsb2Nrd2lzZUNvbW1hbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLk1vdmVUb1gsIHRoaXMucHJvY2Vzc01vdmVUb1hDb21tYW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMuYWRkSGFuZGxlcihDb21tYW5kVHlwZS5Nb3ZlVG9ZLCB0aGlzLnByb2Nlc3NNb3ZlVG9ZQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuVHVyblRvU3RhdGUsIHRoaXMucHJvY2Vzc1R1cm5Ub1N0YXRlQ29tbWFuZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlTGVmdENvbW1hbmQoY29tbWFuZDogTW92ZUxlZnRDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVNb3ZlZExlZnQgPSBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oZmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmlndXJlLnBvc2l0aW9uLnggLSAxLCBmaWd1cmUucG9zaXRpb24ueSksXG4gICAgICAgICAgICAgICAgY29tbWFuZC5nYW1lRGF0YS5tYXRyaXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoY2FuQmVNb3ZlZExlZnQpIHtcbiAgICAgICAgICAgICAgICBmaWd1cmUucG9zaXRpb24ueC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzTW92ZWRFdmVudChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzTW92ZVJpZ2h0Q29tbWFuZChjb21tYW5kOiBNb3ZlUmlnaHRDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVNb3ZlZFJpZ2h0ID0gRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoXG4gICAgICAgICAgICAgICAgZmlndXJlLmZpZ3VyZS5nZXRUdXJuKGZpZ3VyZS50dXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIG5ldyBDb29yZGluYXRlKGZpZ3VyZS5wb3NpdGlvbi54ICsgMSwgZmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEubWF0cml4XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGNhbkJlTW92ZWRSaWdodCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbi54Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NUdXJuQ2xvY2t3aXNlQ29tbWFuZChjb21tYW5kOiBUdXJuQ2xvY2t3aXNlQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhbGxUdXJuU3RhdGVzID0gRW51bUhlbHBlci5Ub0FycmF5KEZpZ3VyZVR1cm5TdGF0ZSk7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgbGV0IG5leHRUdXJuU3RhdGUgPSBmaWd1cmUudHVyblN0YXRlICsgMTtcbiAgICAgICAgICAgIGlmICghKG5leHRUdXJuU3RhdGUgaW4gYWxsVHVyblN0YXRlcykpIHtcbiAgICAgICAgICAgICAgICBuZXh0VHVyblN0YXRlID0gYWxsVHVyblN0YXRlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhbkJlVHVybmVkID0gRmlndXJlUGxhY2luZ0NoZWNrZXIuY2FuRmlndXJlQmVQbGFjZWQoXG4gICAgICAgICAgICAgICAgZmlndXJlLmZpZ3VyZS5nZXRUdXJuKG5leHRUdXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVR1cm5lZCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS50dXJuU3RhdGUgPSBuZXh0VHVyblN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5maXJlKG5ldyBGaWd1cmVzTW92ZWRFdmVudChjb21tYW5kLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzTW92ZURvd25Db21tYW5kKGNvbW1hbmQ6IE1vdmVEb3duQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBGaWd1cmVzRmFsbFRpY2tDb21tYW5kKGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlVG9YQ29tbWFuZChjb21tYW5kOiBNb3ZlVG9YQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBpZiAoY29tbWFuZC54IDwgMCB8fCBjb21tYW5kLnggPiAoY29tbWFuZC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZFdpZHRoIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb21tYW5kLmdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmZvckVhY2goZmlndXJlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vdmluZ01vZGlmaWVyID0gY29tbWFuZC54ID4gZmlndXJlLnBvc2l0aW9uLnggPyAxIDogLTE7XG4gICAgICAgICAgICB3aGlsZSAoZmlndXJlLnBvc2l0aW9uLnggIT09IGNvbW1hbmQueCAmJiBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oZmlndXJlLnR1cm5TdGF0ZSksXG4gICAgICAgICAgICAgICAgbmV3IENvb3JkaW5hdGUoZmlndXJlLnBvc2l0aW9uLnggKyBtb3ZpbmdNb2RpZmllciwgZmlndXJlLnBvc2l0aW9uLnkpLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQuZ2FtZURhdGEubWF0cml4XG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgZmlndXJlLnBvc2l0aW9uLnggKz0gbW92aW5nTW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NNb3ZlVG9ZQ29tbWFuZChjb21tYW5kOiBNb3ZlVG9ZQ29tbWFuZCk6IHZvaWQge1xuICAgICAgICBpZiAoY29tbWFuZC55IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGZpZ3VyZS5wb3NpdGlvbi55IDwgY29tbWFuZC55ICYmIEZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5maWd1cmUuZ2V0VHVybihmaWd1cmUudHVyblN0YXRlKSxcbiAgICAgICAgICAgICAgICBuZXcgQ29vcmRpbmF0ZShmaWd1cmUucG9zaXRpb24ueCwgZmlndXJlLnBvc2l0aW9uLnkgKyAxKSxcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbi55Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmV2ZW50QnVzLmZpcmUobmV3IEZpZ3VyZXNNb3ZlZEV2ZW50KGNvbW1hbmQuZ2FtZURhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NUdXJuVG9TdGF0ZUNvbW1hbmQoY29tbWFuZDogVHVyblRvU3RhdGVDb21tYW5kKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmQuZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FuQmVUdXJuZWQgPSBGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChcbiAgICAgICAgICAgICAgICBmaWd1cmUuZmlndXJlLmdldFR1cm4oY29tbWFuZC50dXJuU3RhdGUpLFxuICAgICAgICAgICAgICAgIGZpZ3VyZS5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kLmdhbWVEYXRhLm1hdHJpeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChjYW5CZVR1cm5lZCkge1xuICAgICAgICAgICAgICAgIGZpZ3VyZS50dXJuU3RhdGUgPSBjb21tYW5kLnR1cm5TdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMuZmlyZShuZXcgRmlndXJlc01vdmVkRXZlbnQoY29tbWFuZC5nYW1lRGF0YSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcblxuZXhwb3J0IGNsYXNzIEZhbGxUaWNrU2NvcmVDb3VudGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBzcXVhc2hlZFJvd3NSZXdhcmRUaHJlc2hvbGRzTWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcChbXG4gICAgICAgICAgICBbMSwgMTAwXSxcbiAgICAgICAgICAgIFsyLCAzMDBdLFxuICAgICAgICAgICAgWzMsIDUwMF0sXG4gICAgICAgICAgICBbNCwgODAwXSxcbiAgICAgICAgXSksXG4gICAgICAgIHByaXZhdGUgcmV3YXJkT25Db21ibyA9IDUwLFxuICAgICkge1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxpbmdUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GYWxsaW5nVGlja1Byb2Nlc3NlZChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuc3F1YXNoZWRMaW5lcy5sZW5ndGggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJldmlvdXNUaHJlc2hvbGRSZXdhcmQgPSAwO1xuICAgICAgICB0aGlzLnNxdWFzaGVkUm93c1Jld2FyZFRocmVzaG9sZHNNYXAuZm9yRWFjaCgocmV3YXJkLCByb3dzU3F1YXNoZWRUaHJlc2hvbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChyb3dzU3F1YXNoZWRUaHJlc2hvbGQgPiBldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzVGhyZXNob2xkUmV3YXJkID0gcmV3YXJkO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuZ2FtZURhdGEuc2NvcmUgKz1cbiAgICAgICAgICAgIHByZXZpb3VzVGhyZXNob2xkUmV3YXJkICogZXZlbnQuZ2FtZURhdGEubGV2ZWxcbiAgICAgICAgICAgICsgdGhpcy5yZXdhcmRPbkNvbWJvICogTWF0aC5tYXgoMCwgZXZlbnQuZ2FtZURhdGEuY29tYm8gLSAxKSAqIGV2ZW50LmdhbWVEYXRhLmxldmVsXG4gICAgICAgICAgICArIGV2ZW50LmRyb3BwZWRMaW5lcyAqIDIgKiBldmVudC5nYW1lRGF0YS5sZXZlbDtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NvbW1hbmRCdXMsIENvbW1hbmRUeXBlLCBJbml0R2FtZUNvbW1hbmR9IGZyb20gXCIuLi9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudH0gZnJvbSBcIi4uL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdGF0c0NvdW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXM6IEV2ZW50QnVzLFxuICAgICkge1xuICAgICAgICBjb21tYW5kQnVzLmFkZEhhbmRsZXIoQ29tbWFuZFR5cGUuSW5pdEdhbWUsIHRoaXMuaW5pdEdhbWVIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdhbWVIYW5kbGVyKGNvbW1hbmQ6IEluaXRHYW1lQ29tbWFuZCkge1xuICAgICAgICB0aGlzLmV2ZW50QnVzLm9uKEV2ZW50VHlwZS5GYWxsaW5nVGlja1Byb2Nlc3NlZCwgdGhpcy5vbkZhbGxpbmdUaWNrUHJvY2Vzc2VkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GYWxsaW5nVGlja1Byb2Nlc3NlZChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkge1xuICAgICAgICBldmVudC5nYW1lRGF0YS5zdGF0cy5maWd1cmVzRmFsbGVuICs9IGV2ZW50LnRyYW5zZmVycmVkVG9NYXRyaXhGaWd1cmVzLmxlbmd0aDtcbiAgICAgICAgZXZlbnQuZ2FtZURhdGEuc3RhdHMubGluZXNTcXVhc2hlZCArPSBldmVudC5zcXVhc2hlZExpbmVzLmxlbmd0aDtcbiAgICB9XG59XG4iLCJpbXBvcnQge1RpbWluZ3NIYW5kbGVyfSBmcm9tIFwiLi9UaW1pbmdzSGFuZGxlclwiO1xuaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgQ29uc3RUaW1pbmdzSGFuZGxlciBpbXBsZW1lbnRzIFRpbWluZ3NIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRlbGF5TXM6IG51bWJlcixcbiAgICApIHt9XG5cbiAgICBnZXREZWxheUZvck5leHRUaWNrTXMoZ2FtZURhdGE6IEdhbWVEYXRhKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsYXlNcztcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRW51bUhlbHBlciB7XG4gICAgcHVibGljIHN0YXRpYyBUb0FycmF5KHZhbDogYW55KTogdHlwZW9mIHZhbFtdIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbClcbiAgICAgICAgICAgIC5tYXAobiA9PiBOdW1iZXIucGFyc2VJbnQobikpXG4gICAgICAgICAgICAuZmlsdGVyKG4gPT4gIU51bWJlci5pc05hTihuKSkgYXMgdW5rbm93biBhcyB0eXBlb2YgdmFsW107XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBHZXRSYW5kb20odmFsOiBhbnkpOiB0eXBlb2YgdmFsIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gRW51bUhlbHBlci5Ub0FycmF5KHZhbCk7XG4gICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsdWVzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNbcmFuZG9tSW5kZXhdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29vcmRpbmF0ZX0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgRmlndXJlUGxhY2luZ0NoZWNrZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgY2FuRmlndXJlQmVQbGFjZWQodGFyZ2V0RmlndXJlTWF0cml4OiBib29sZWFuW11bXSwgdGFyZ2V0UG9zaXRpb246IENvb3JkaW5hdGUsIG1hdHJpeDogYm9vbGVhbltdW10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldEZpZ3VyZU1hdHJpeC5ldmVyeSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcm93LmV2ZXJ5KCh2YWx1ZSwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxZID0gdGFyZ2V0UG9zaXRpb24ueSArIHk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFggPSB0YXJnZXRQb3NpdGlvbi54ICsgeDtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHx8IChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxZIDwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmVhbFggPj0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmVhbFggPD0gbWF0cml4WzBdLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICAgICAgKSB8fCAoXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsWSBpbiBtYXRyaXhcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHJlYWxYIGluIG1hdHJpeFtyZWFsWV1cbiAgICAgICAgICAgICAgICAgICAgICAgICYmICFtYXRyaXhbcmVhbFldW3JlYWxYXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q29vcmRpbmF0ZSwgRmFsbGluZ0ZpZ3VyZX0gZnJvbSBcIi4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlVHVyblN0YXRlfSBmcm9tIFwiLi4vVGV0cmlzL0ZpZ3VyZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGaWd1cmVQbGFjaW5nU3RlcCB7XG4gICAgZ2V0IHBlcnNpc3RlZCgpOiBib29sZWFuLFxufVxuXG5leHBvcnQgY2xhc3MgVHVyblBsYWNpbmdTdGVwIGltcGxlbWVudHMgRmlndXJlUGxhY2luZ1N0ZXB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0YXJnZXQ6IEZpZ3VyZVR1cm5TdGF0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcGVyc2lzdGVkOiBib29sZWFuLFxuICAgICkge31cblxuICAgIGdldCBwZXJzaXN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJzaXN0ZWQ7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW92ZVhQbGFjaW5nU3RlcCBpbXBsZW1lbnRzIEZpZ3VyZVBsYWNpbmdTdGVwe1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdGFyZ2V0OiBudW1iZXIsXG4gICAgICAgIHByaXZhdGUgX3BlcnNpc3RlZDogYm9vbGVhbixcbiAgICApIHt9XG5cbiAgICBnZXQgcGVyc2lzdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVyc2lzdGVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vdmVZUGxhY2luZ1N0ZXAgaW1wbGVtZW50cyBGaWd1cmVQbGFjaW5nU3RlcHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHRhcmdldDogbnVtYmVyLFxuICAgICkge31cblxuICAgIGdldCBwZXJzaXN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEcm9wUGxhY2luZ1N0ZXAgaW1wbGVtZW50cyBGaWd1cmVQbGFjaW5nU3RlcHtcbiAgICBnZXQgcGVyc2lzdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlndXJlUGxhY2luZ1Jlc3VsdCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBmaWd1cmVzVGFyZ2V0U3RhdGVzOiBNYXA8RmFsbGluZ0ZpZ3VyZSwgRmFsbGluZ0ZpZ3VyZT4sXG4gICAgICAgIHB1YmxpYyBwbGFjaW5nU3RlcHM6IEZpZ3VyZVBsYWNpbmdTdGVwW10sXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgSG9sZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBpc09wZW5lZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIGNlbGxzOiBDb29yZGluYXRlW10sXG4gICAgKSB7fVxufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ1Jlc3VsdH0gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5leHBvcnQgY2xhc3MgUGxhY2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvciBleHRlbmRzIFBsYWNpbmdFcnJvciB7fVxuZXhwb3J0IGNsYXNzIEluY29uc2lzdGVudFRhcmdldFN0YXRlRXJyb3IgZXh0ZW5kcyBQbGFjaW5nRXJyb3Ige31cbmV4cG9ydCBjbGFzcyBOb3RTdXBwb3J0ZWREaXJlY3Rpb25TdGVwRXJyb3IgZXh0ZW5kcyBQbGFjaW5nRXJyb3Ige31cblxuZXhwb3J0IGludGVyZmFjZSBGaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlIHtcbiAgICAvKipcbiAgICAgKiBAdGhyb3dzIFBsYWNpbmdFcnJvclxuICAgICAqL1xuICAgIHBsYWNlKGdhbWVEYXRhOiBHYW1lRGF0YSwgcGxhY2luZ1Jlc3VsdD86IEZpZ3VyZVBsYWNpbmdSZXN1bHQpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHtHYW1lRGF0YX0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tb25cIjtcbmltcG9ydCB7XG4gICAgQ29tbWFuZEJ1cyxcbiAgICBEcm9wRmlndXJlc0NvbW1hbmQsXG4gICAgTW92ZURvd25Db21tYW5kLFxuICAgIE1vdmVMZWZ0Q29tbWFuZCxcbiAgICBNb3ZlUmlnaHRDb21tYW5kLFxuICAgIE1vdmVUb1hDb21tYW5kLFxuICAgIE1vdmVUb1lDb21tYW5kLFxuICAgIFR1cm5DbG9ja3dpc2VDb21tYW5kLFxuICAgIFR1cm5Ub1N0YXRlQ29tbWFuZFxufSBmcm9tIFwiLi4vLi4vVGV0cmlzL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtEcm9wUGxhY2luZ1N0ZXAsIEZpZ3VyZVBsYWNpbmdSZXN1bHQsIE1vdmVYUGxhY2luZ1N0ZXAsIE1vdmVZUGxhY2luZ1N0ZXAsIFR1cm5QbGFjaW5nU3RlcH0gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlLCBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvciwgSW5jb25zaXN0ZW50VGFyZ2V0U3RhdGVFcnJvciwgTm90U3VwcG9ydGVkRGlyZWN0aW9uU3RlcEVycm9yfSBmcm9tIFwiLi9GaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnN0YW50RmlndXJlUGxhY2luZ1BlcmZvcm1lciBpbXBsZW1lbnRzIEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbW1hbmRCdXM6IENvbW1hbmRCdXMsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIHBsYWNlKGdhbWVEYXRhOiBHYW1lRGF0YSwgcGxhY2luZ1Jlc3VsdD86IEZpZ3VyZVBsYWNpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4gdGhpcy5wbGFjZUltcGwoZ2FtZURhdGEsIHBsYWNpbmdSZXN1bHQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGFjZUltcGwoZ2FtZURhdGEsIHBsYWNpbmdSZXN1bHQpLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGxhY2VJbXBsKGdhbWVEYXRhOiBHYW1lRGF0YSwgcGxhY2luZ1Jlc3VsdD86IEZpZ3VyZVBsYWNpbmdSZXN1bHQpIHtcbiAgICAgICAgaWYgKGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lRGF0YS5mYWxsaW5nRmlndXJlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHYW1lU3RhdGVOb3RTdXBwb3J0ZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjaW5nUmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbEZpZ3VyZSA9IGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzWzBdO1xuICAgICAgICBjb25zdCB0YXJnZXRGaWd1cmUgPSBwbGFjaW5nUmVzdWx0LmZpZ3VyZXNUYXJnZXRTdGF0ZXMuZ2V0KG9yaWdpbmFsRmlndXJlKTtcbiAgICAgICAgaWYgKCF0YXJnZXRGaWd1cmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcmlnaW5hbEZpZ3VyZS5maWd1cmUgIT09IHRhcmdldEZpZ3VyZS5maWd1cmUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbmNvbnNpc3RlbnRUYXJnZXRTdGF0ZUVycm9yKFwiQm90aCBvZiB0aGUgb3JpZ2luYWwgYW5kIHRoZSB0YXJnZXQgZmFsbGluZyBmaWd1cmVzIG11c3QgaGF2ZSB0aGUgc2FtZSBmaWd1cmUgaW4gaXQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhY2luZ1Jlc3VsdC5wbGFjaW5nU3RlcHMuZm9yRWFjaChzdGVwID0+IHtcbiAgICAgICAgICAgIGlmIChzdGVwIGluc3RhbmNlb2YgVHVyblBsYWNpbmdTdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgVHVyblRvU3RhdGVDb21tYW5kKGdhbWVEYXRhLCBzdGVwLnRhcmdldCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwIGluc3RhbmNlb2YgTW92ZVhQbGFjaW5nU3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IE1vdmVUb1hDb21tYW5kKGdhbWVEYXRhLCBzdGVwLnRhcmdldCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwIGluc3RhbmNlb2YgTW92ZVlQbGFjaW5nU3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IE1vdmVUb1lDb21tYW5kKGdhbWVEYXRhLCBzdGVwLnRhcmdldCkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwIGluc3RhbmNlb2YgRHJvcFBsYWNpbmdTdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQnVzLnJ1bihuZXcgRHJvcEZpZ3VyZXNDb21tYW5kKGdhbWVEYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RTdXBwb3J0ZWREaXJlY3Rpb25TdGVwRXJyb3IoXCJVbmtub3duIHN0ZXAgXCIgKyBzdGVwLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0Nvb3JkaW5hdGUsIEZhbGxpbmdGaWd1cmUsIEdhbWVEYXRhfSBmcm9tIFwiLi4vLi4vVGV0cmlzL0NvbW1vblwiO1xuaW1wb3J0IHtFbnVtSGVscGVyfSBmcm9tIFwiLi4vLi4vVGV0cmlzL1V0aWxzL0VudW1IZWxwZXJcIjtcbmltcG9ydCB7RmlndXJlVHVyblN0YXRlfSBmcm9tIFwiLi4vLi4vVGV0cmlzL0ZpZ3VyZXNcIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ0NoZWNrZXJ9IGZyb20gXCIuLi8uLi9UZXRyaXMvVXRpbHMvRmlndXJlUGxhY2luZ0NoZWNrZXJcIjtcbmltcG9ydCB7Q29tbWFuZEJ1cywgUmVuZGVyQ29tbWFuZH0gZnJvbSBcIi4uLy4uL1RldHJpcy9Db21tYW5kQnVzL0NvbW1hbmRCdXNcIjtcbmltcG9ydCB7RHJvcFBsYWNpbmdTdGVwLCBGaWd1cmVQbGFjaW5nUmVzdWx0LCBGaWd1cmVQbGFjaW5nU3RlcCwgTW92ZVhQbGFjaW5nU3RlcCwgTW92ZVlQbGFjaW5nU3RlcCwgVHVyblBsYWNpbmdTdGVwfSBmcm9tIFwiLi4vQ29tbW9uXCI7XG5pbXBvcnQge0NhbGN1bGF0b3JBZ2dyZWdhdGV9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3IvQ2FsY3VsYXRvckFnZ3JlZ2F0ZVwiO1xuaW1wb3J0IHtIb2xlc0hlbHBlcn0gZnJvbSBcIi4uL1V0aWxzL0hvbGVzSGVscGVyXCI7XG5pbXBvcnQge0NhbGN1bGF0ZVNjb3JlUmVxdWVzdH0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvci9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuY2xhc3MgUGxhY2VSZXNvbHZpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cblxuY2xhc3MgR2FtZVN0YXRlTm90U3VwcG9ydGVkRXJyb3IgZXh0ZW5kcyBQbGFjZVJlc29sdmluZ0Vycm9yIHtcbn1cblxuZXhwb3J0IGNsYXNzIEZpZ3VyZVBsYWNpbmdSZXNvbHZlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tbWFuZEJ1czogQ29tbWFuZEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBzY29yZUNhbGN1bGF0b3I6IENhbGN1bGF0b3JBZ2dyZWdhdGUsXG4gICAgKSB7fVxuXG4gICAgcHVibGljIHJlc29sdmUoZ2FtZURhdGE6IEdhbWVEYXRhKTogRmlndXJlUGxhY2luZ1Jlc3VsdHx1bmRlZmluZWQge1xuICAgICAgICBpZiAoZ2FtZURhdGEuZmFsbGluZ0ZpZ3VyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdhbWVTdGF0ZU5vdFN1cHBvcnRlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWd1cmUgPSBnYW1lRGF0YS5mYWxsaW5nRmlndXJlc1swXTtcblxuICAgICAgICBsZXQgbWF4U2NvcmUgPSAtSW5maW5pdHk7XG4gICAgICAgIGxldCB0aGVCZXN0UmVzdWx0ID0gbmV3IEZpZ3VyZVBsYWNpbmdSZXN1bHQobmV3IE1hcCgpLCBbXSk7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzU3RhdGVzKGdhbWVEYXRhLCAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSwgc2NvcmU6IG51bWJlciwgcGxhY2luZ0RpcmVjdGlvbnM6IEZpZ3VyZVBsYWNpbmdTdGVwW10pID0+IHtcbiAgICAgICAgICAgIGlmIChzY29yZSA+IG1heFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgbWF4U2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgICAgICB0aGVCZXN0UmVzdWx0ID0gbmV3IEZpZ3VyZVBsYWNpbmdSZXN1bHQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNYXAoW1tvcmlnaW5hbEZpZ3VyZSwgaW1hZ2luYWJsZUZpZ3VyZV1dKSxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2luZ0RpcmVjdGlvbnNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGxldCBkZWJ1Z01vZGUgPSB0cnVlO1xuICAgICAgICAvKmxldCBkZWJ1Z01vZGUgPSAnZGVidWdNb2RlJyBpbiB3aW5kb3cgJiYgd2luZG93LmRlYnVnTW9kZTtcbiAgICAgICAgbGV0IGltYWdpbmFibGVGaWd1cmUgPSB0aGVCZXN0UmVzdWx0LmZpZ3VyZXNUYXJnZXRTdGF0ZXMuZ2V0KG9yaWdpbmFsRmlndXJlKTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSAmJiBpbWFnaW5hYmxlRmlndXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBmYWtlR2FtZURhdGEgPSBzdHJ1Y3R1cmVkQ2xvbmUoZ2FtZURhdGEpO1xuICAgICAgICAgICAgaW1hZ2luYWJsZUZpZ3VyZS5jb2xvciA9ICcjZjAwJztcbiAgICAgICAgICAgIGZha2VHYW1lRGF0YS5mYWxsaW5nRmlndXJlcyA9IFtpbWFnaW5hYmxlRmlndXJlXTtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFJlbmRlckNvbW1hbmQoZmFrZUdhbWVEYXRhKSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1N0YXRlcyhnYW1lRGF0YSwgdW5kZWZpbmVkLCAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSkgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdpbmFibGVGaWd1cmUuY29sb3IgPSAnIzAwZic7XG4gICAgICAgICAgICAgICAgZmFrZUdhbWVEYXRhLmZhbGxpbmdGaWd1cmVzID0gW2ltYWdpbmFibGVGaWd1cmVdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZEJ1cy5ydW4obmV3IFJlbmRlckNvbW1hbmQoZmFrZUdhbWVEYXRhKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9Ki9cblxuICAgICAgICByZXR1cm4gdGhlQmVzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByb2Nlc3NTdGF0ZXMoXG4gICAgICAgIGdhbWVEYXRhOiBHYW1lRGF0YSxcbiAgICAgICAgb25BZnRlclNjb3JlQ2FsY3VsYXRlcz86IChpbWFnaW5hYmxlRmlndXJlOiBGYWxsaW5nRmlndXJlLCBzY29yZTogbnVtYmVyLCBwbGFjaW5nRGlyZWN0aW9uczogRmlndXJlUGxhY2luZ1N0ZXBbXSkgPT4gdm9pZCxcbiAgICAgICAgb25CZWZvcmVTY29yZUNhbGN1bGF0ZXM/OiAoaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSkgPT4gdm9pZCxcbiAgICApIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWd1cmUgPSBnYW1lRGF0YS5mYWxsaW5nRmlndXJlc1swXTtcblxuICAgICAgICBsZXQgZW51bXMgPSBFbnVtSGVscGVyLlRvQXJyYXkoRmlndXJlVHVyblN0YXRlKTtcbiAgICAgICAgd2hpbGUgKGVudW1zWzBdICE9PSBvcmlnaW5hbEZpZ3VyZS50dXJuU3RhdGUpIHtcbiAgICAgICAgICAgIGVudW1zLnVuc2hpZnQoZW51bXMucG9wKCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXRyaWNlczogTWFwPEZpZ3VyZVR1cm5TdGF0ZSwgYm9vbGVhbltdW10+ID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgc3RyaW5neU1hdHJpY2VzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgICAgICAgZW51bXMuZm9yRWFjaCh0dXJuU3RhdGUgPT4ge1xuICAgICAgICAgICAgbGV0IGZpZ3VyZU1hdHJpeCA9IG9yaWdpbmFsRmlndXJlLmZpZ3VyZS5nZXRUdXJuKHR1cm5TdGF0ZSk7XG4gICAgICAgICAgICBsZXQgc3RyaW5neUZpZ3VyZU1hdHJpeCA9IGZpZ3VyZU1hdHJpeC5tYXAocm93ID0+IHJvdy5tYXAodmFsID0+IHZhbCA/IFwiMVwiIDogXCIwXCIpLmpvaW4oKSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIGlmICghc3RyaW5neU1hdHJpY2VzLmhhcyhzdHJpbmd5RmlndXJlTWF0cml4KSkge1xuICAgICAgICAgICAgICAgIHN0cmluZ3lNYXRyaWNlcy5hZGQoc3RyaW5neUZpZ3VyZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbWF0cmljZXMuc2V0KHR1cm5TdGF0ZSwgZmlndXJlTWF0cml4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxNYXRyaXhIb2xlcyA9IEhvbGVzSGVscGVyLmNvbGxlY3RIb2xlcyhnYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbENvdmVyZWRDb2x1bW5zID0gSG9sZXNIZWxwZXIuY29sbGVjdENvdmVyZWRDb2x1bW5zKGdhbWVEYXRhLm1hdHJpeCk7XG5cbiAgICAgICAgbWF0cmljZXMuZm9yRWFjaCgoZmlndXJlTWF0cml4LCB0dXJuU3RhdGUpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aCAtIGZpZ3VyZU1hdHJpeFswXS5sZW5ndGggKyAxOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgW3ksIGltYWdpbmFibGVNYXRyaXhdID0gdGhpcy5pbWFnaW5lRmlndXJlRHJvcChnYW1lRGF0YS5tYXRyaXgsIGZpZ3VyZU1hdHJpeCwgeCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBuZXcgQ29vcmRpbmF0ZSh4LCB5KTtcbiAgICAgICAgICAgICAgICBsZXQgc3F1YXNoZWRMaW5lc0NvdW50ID0gdGhpcy5zcXVhc2hMaW5lcyhpbWFnaW5hYmxlTWF0cml4KTtcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2luYWJsZUZpZ3VyZSA9IG5ldyBGYWxsaW5nRmlndXJlKG9yaWdpbmFsRmlndXJlLmZpZ3VyZSwgY29vcmRpbmF0ZSwgdHVyblN0YXRlKTtcbiAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVTY29yZUNhbGN1bGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVTY29yZUNhbGN1bGF0ZXMoaW1hZ2luYWJsZUZpZ3VyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMgPSBIb2xlc0hlbHBlci5jb2xsZWN0Q292ZXJlZENvbHVtbnMoaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0ZVNjb3JlUmVxdWVzdCA9IG5ldyBDYWxjdWxhdGVTY29yZVJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAgIGdhbWVEYXRhLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbE1hdHJpeEhvbGVzLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENvdmVyZWRDb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICBpbWFnaW5hYmxlTWF0cml4LFxuICAgICAgICAgICAgICAgICAgICBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgIHNxdWFzaGVkTGluZXNDb3VudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5zY29yZUNhbGN1bGF0b3IuY2FsY3VsYXRlU2NvcmUoY2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IHRoaXMubWFrZVNpbXBsZVBsYWNpbmdTdGVwcyhpbWFnaW5hYmxlRmlndXJlKTtcbiAgICAgICAgICAgICAgICBpZiAob25BZnRlclNjb3JlQ2FsY3VsYXRlcykge1xuICAgICAgICAgICAgICAgICAgICBvbkFmdGVyU2NvcmVDYWxjdWxhdGVzKGltYWdpbmFibGVGaWd1cmUsIHNjb3JlLCBkaXJlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yaWdpbmFsTWF0cml4SG9sZXMuZmlsdGVyKGhvbGUgPT4gaG9sZS5pc09wZW5lZCAmJiBob2xlLmNlbGxzLmxlbmd0aCA+IDApLmZvckVhY2goaG9sZSA9PiB7XG4gICAgICAgICAgICBsZXQgdG9wWSA9IGdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnRYID0gZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aCxcbiAgICAgICAgICAgICAgICBib3R0b21ZID0gLTEsXG4gICAgICAgICAgICAgICAgcmlnaHRYID0gLTE7XG4gICAgICAgICAgICBob2xlLmNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgdG9wWSA9IE1hdGgubWluKHRvcFksIGNlbGwueSk7XG4gICAgICAgICAgICAgICAgbGVmdFggPSBNYXRoLm1pbihsZWZ0WCwgY2VsbC54KTtcbiAgICAgICAgICAgICAgICBib3R0b21ZID0gTWF0aC5tYXgoYm90dG9tWSwgY2VsbC55KTtcbiAgICAgICAgICAgICAgICByaWdodFggPSBNYXRoLm1heChyaWdodFgsIGNlbGwueCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWF0cmljZXMuZm9yRWFjaCgoZmlndXJlTWF0cml4LCB0dXJuU3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gTWF0aC5tYXgodG9wWSAtIGZpZ3VyZU1hdHJpeC5sZW5ndGggKyAxLCAwKTsgeSA8PSBib3R0b21ZOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IE1hdGgubWF4KGxlZnRYIC0gZmlndXJlTWF0cml4WzBdLmxlbmd0aCArIDEsIDApOyB4IDw9IHJpZ2h0WDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IG5ldyBDb29yZGluYXRlKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdpbmFibGVGaWd1cmUgPSBuZXcgRmFsbGluZ0ZpZ3VyZShvcmlnaW5hbEZpZ3VyZS5maWd1cmUsIGNvb3JkaW5hdGUsIHR1cm5TdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVTY29yZUNhbGN1bGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVNjb3JlQ2FsY3VsYXRlcyhpbWFnaW5hYmxlRmlndXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChmaWd1cmVNYXRyaXgsIGNvb3JkaW5hdGUsIGdhbWVEYXRhLm1hdHJpeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IHRoaXMubWFrZVB1c2hJblBsYWNpbmdTdGVwcyhnYW1lRGF0YSwgaW1hZ2luYWJsZUZpZ3VyZSwgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2luYWJsZU1hdHJpeCA9IHRoaXMuaW1hZ2luZUZpZ3VyZVBsYWNpbmcoZ2FtZURhdGEubWF0cml4LCBmaWd1cmVNYXRyaXgsIGNvb3JkaW5hdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3F1YXNoZWRMaW5lc0NvdW50ID0gdGhpcy5zcXVhc2hMaW5lcyhpbWFnaW5hYmxlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucyA9IEhvbGVzSGVscGVyLmNvbGxlY3RDb3ZlcmVkQ29sdW1ucyhpbWFnaW5hYmxlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbGN1bGF0ZVNjb3JlUmVxdWVzdCA9IG5ldyBDYWxjdWxhdGVTY29yZVJlcXVlc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsTWF0cml4SG9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENvdmVyZWRDb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZU1hdHJpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFzaGVkTGluZXNDb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLnNjb3JlQ2FsY3VsYXRvci5jYWxjdWxhdGVTY29yZShjYWxjdWxhdGVTY29yZVJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25BZnRlclNjb3JlQ2FsY3VsYXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZnRlclNjb3JlQ2FsY3VsYXRlcyhpbWFnaW5hYmxlRmlndXJlLCBzY29yZSwgZGlyZWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcXVhc2hMaW5lcyhtYXRyaXg6IGJvb2xlYW5bXVtdKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGxpbmVzVG9TcXVhc2g6IG51bWJlcltdID0gW107XG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGxldCBjYW5CZVNxdWFzaGVkID0gcm93LmV2ZXJ5KGNlbGwgPT4gY2VsbCk7XG4gICAgICAgICAgICBpZiAoY2FuQmVTcXVhc2hlZCkge1xuICAgICAgICAgICAgICAgIGxpbmVzVG9TcXVhc2gucHVzaCh5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICAgIGxpbmVzVG9TcXVhc2guZm9yRWFjaCh5ID0+IHtcbiAgICAgICAgICAgIG1hdHJpeC5zcGxpY2UoeSwgMSk7XG4gICAgICAgICAgICBtYXRyaXgudW5zaGlmdChuZXcgQXJyYXkobWF0cml4WzBdLmxlbmd0aCkuZmlsbChmYWxzZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpbmVzVG9TcXVhc2gubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW1hZ2luZUZpZ3VyZURyb3AoZ2FtZU1hdHJpeDogYm9vbGVhbltdW10sIGZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10sIHRhcmdldFg6IG51bWJlcik6IFtudW1iZXIsIGJvb2xlYW5bXVtdXSB7XG4gICAgICAgIGxldCB0YXJnZXRZID0gLWZpZ3VyZU1hdHJpeC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChmaWd1cmVNYXRyaXgsIG5ldyBDb29yZGluYXRlKHRhcmdldFgsIHRhcmdldFkgKyAxKSwgZ2FtZU1hdHJpeCkpIHtcbiAgICAgICAgICAgIHRhcmdldFkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGFyZ2V0WSxcbiAgICAgICAgICAgIHRoaXMuaW1hZ2luZUZpZ3VyZVBsYWNpbmcoZ2FtZU1hdHJpeCwgZmlndXJlTWF0cml4LCBuZXcgQ29vcmRpbmF0ZSh0YXJnZXRYLCB0YXJnZXRZKSksXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbWFnaW5lRmlndXJlUGxhY2luZyhnYW1lTWF0cml4OiBib29sZWFuW11bXSwgZmlndXJlTWF0cml4OiBib29sZWFuW11bXSwgdGFyZ2V0Q29vcmRpbmF0ZTogQ29vcmRpbmF0ZSk6IGJvb2xlYW5bXVtdIHtcbiAgICAgICAgbGV0IGltYWdpbmFibGVNYXRyaXg6IGJvb2xlYW5bXVtdID0gc3RydWN0dXJlZENsb25lKGdhbWVNYXRyaXgpO1xuICAgICAgICBmaWd1cmVNYXRyaXguZm9yRWFjaCgocm93LCBmaWd1cmVZKSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCBmaWd1cmVYKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFkgPSB0YXJnZXRDb29yZGluYXRlLnkgKyBmaWd1cmVZO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxYID0gdGFyZ2V0Q29vcmRpbmF0ZS54ICsgZmlndXJlWDtcbiAgICAgICAgICAgICAgICBpZiAocmVhbFkgaW4gaW1hZ2luYWJsZU1hdHJpeFxuICAgICAgICAgICAgICAgICAgICAmJiByZWFsWCBpbiBpbWFnaW5hYmxlTWF0cml4W3JlYWxZXVxuICAgICAgICAgICAgICAgICAgICAmJiB2YWxcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2luYWJsZU1hdHJpeFtyZWFsWV1bcmVhbFhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGltYWdpbmFibGVNYXRyaXg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUHVzaEluUGxhY2luZ1N0ZXBzKGdhbWVEYXRhOiBHYW1lRGF0YSwgaW1hZ2luYWJsZUZpZ3VyZTogRmFsbGluZ0ZpZ3VyZSwgb3JpZ2luYWxDb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPik6IEZpZ3VyZVBsYWNpbmdTdGVwW10gfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgZmlndXJlTWF0cml4ID0gaW1hZ2luYWJsZUZpZ3VyZS5maWd1cmUuZ2V0VHVybihpbWFnaW5hYmxlRmlndXJlLnR1cm5TdGF0ZSk7XG4gICAgICAgIGxldCB0YXJnZXRYID0gSG9sZXNIZWxwZXIuZmluZFRoZVdheU91dEZyb21Ib2xlKGdhbWVEYXRhLm1hdHJpeCwgaW1hZ2luYWJsZUZpZ3VyZS5wb3NpdGlvbiwgb3JpZ2luYWxDb3ZlcmVkQ29sdW1ucywgZmlndXJlTWF0cml4KTtcbiAgICAgICAgaWYgKHRhcmdldFggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBuZXcgVHVyblBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUudHVyblN0YXRlLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBNb3ZlWFBsYWNpbmdTdGVwKHRhcmdldFgsIGZhbHNlKSxcbiAgICAgICAgICAgIG5ldyBNb3ZlWVBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUucG9zaXRpb24ueSksXG4gICAgICAgICAgICBuZXcgTW92ZVhQbGFjaW5nU3RlcChpbWFnaW5hYmxlRmlndXJlLnBvc2l0aW9uLngsIHRydWUpLFxuICAgICAgICAgICAgbmV3IERyb3BQbGFjaW5nU3RlcCgpLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZVNpbXBsZVBsYWNpbmdTdGVwcyhpbWFnaW5hYmxlRmlndXJlOiBGYWxsaW5nRmlndXJlKTogRmlndXJlUGxhY2luZ1N0ZXBbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBuZXcgVHVyblBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUudHVyblN0YXRlLCB0cnVlKSxcbiAgICAgICAgICAgIG5ldyBNb3ZlWFBsYWNpbmdTdGVwKGltYWdpbmFibGVGaWd1cmUucG9zaXRpb24ueCwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgRHJvcFBsYWNpbmdTdGVwKCksXG4gICAgICAgIF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4vU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxjdWxhdG9yQWdncmVnYXRlIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjYWxjdWxhdG9yczogU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlW11cbiAgICApIHt9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRvcnMucmVkdWNlKChzY29yZSwgY2FsY3VsYXRvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNjb3JlICsgY2FsY3VsYXRvci5jYWxjdWxhdGVTY29yZShyZXF1ZXN0KTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgRmlsbGFibGVDZWxsc0NhbGN1bGF0b3JQYXJhbXMge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbWluaW11bVZhbHVhYmxlSGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBwb3dNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBtdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHBhcmFtcyA9IG5ldyBGaWxsYWJsZUNlbGxzQ2FsY3VsYXRvclBhcmFtcyg1LCAxLCAxKSxcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgZmllbGRIZWlnaHQgPSByZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0O1xuICAgICAgICBjb25zdCBmaWVsZFdpZHRoID0gcmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZFdpZHRoO1xuICAgICAgICBjb25zdCBbZmlsbGFibGVDZWxsc0NvdW50LCBmaWxsYWJsZUhlaWdodF0gPSB0aGlzLmNhbGN1bGF0ZUZpbGxhYmxlU3BhY2UocmVxdWVzdC5pbWFnaW5hYmxlTWF0cml4LCBmaWVsZFdpZHRoKTtcbiAgICAgICAgbGV0IGZpbGxhYmxlQ2VsbHNTY29yZSA9IDA7XG4gICAgICAgIGlmIChmaWxsYWJsZUhlaWdodCA+IHRoaXMucGFyYW1zLm1pbmltdW1WYWx1YWJsZUhlaWdodCkge1xuICAgICAgICAgICAgZmlsbGFibGVDZWxsc1Njb3JlID0gLWZpbGxhYmxlQ2VsbHNDb3VudFxuICAgICAgICAgICAgICAgICogTWF0aC5wb3coXG4gICAgICAgICAgICAgICAgICAgIGZpbGxhYmxlQ2VsbHNDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbGFibGVDZWxsc0NvdW50IC8gKGZpZWxkSGVpZ2h0ICogZmllbGRXaWR0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wYXJhbXMucG93TXVsdGlwbGllclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAqIHRoaXMucGFyYW1zLm11bHRpcGxpZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGxhYmxlQ2VsbHNTY29yZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZUZpbGxhYmxlU3BhY2UobWF0cml4OiBib29sZWFuW11bXSwgZmllbGRXaWR0aDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1ucyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICBsZXQgZmlsbGFibGVDZWxsc0NvdW50ID0gMDtcbiAgICAgICAgbGV0IGZpbGxhYmxlSGVpZ2h0ID0gMDtcbiAgICAgICAgbWF0cml4LmV2ZXJ5KHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb3ZlcmVkQ29sdW1ucy5hZGQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWwgJiYgY292ZXJlZENvbHVtbnMuc2l6ZSA+IDAgJiYgIWNvdmVyZWRDb2x1bW5zLmhhcyh4KSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxsYWJsZUNlbGxzQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjb3ZlcmVkQ29sdW1ucy5zaXplIDwgZmllbGRXaWR0aCkge1xuICAgICAgICAgICAgICAgIGlmIChjb3ZlcmVkQ29sdW1ucy5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaWxsYWJsZUhlaWdodCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBbZmlsbGFibGVDZWxsc0NvdW50LCBmaWxsYWJsZUhlaWdodF07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvclBhcmFtcyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBwb3dNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBtdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvciBpbXBsZW1lbnRzIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcGFyYW1zID0gbmV3IEZpbGxlZEhlaWdodENhbGN1bGF0b3JQYXJhbXMoMSwgMyksXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FsY3VsYXRlSGVpZ2h0KHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCk7XG4gICAgICAgIHJldHVybiAtaGVpZ2h0XG4gICAgICAgICAgICAqIE1hdGgucG93KFxuICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICBoZWlnaHQgLyByZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0XG4gICAgICAgICAgICAgICAgKiB0aGlzLnBhcmFtcy5wb3dNdWx0aXBsaWVyXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAqIHRoaXMucGFyYW1zLm11bHRpcGxpZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIZWlnaHQobWF0cml4OiBib29sZWFuW11bXSk6IG51bWJlciB7XG4gICAgICAgIGxldCBsb3dlc3RFbXB0eVkgPSAtMTtcbiAgICAgICAgbWF0cml4LmV2ZXJ5KChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGlmIChyb3cuZXZlcnkodmFsID0+ICF2YWwpKSB7XG4gICAgICAgICAgICAgICAgbG93ZXN0RW1wdHlZID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hdHJpeC5sZW5ndGggLSBsb3dlc3RFbXB0eVkgLSAxO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEhvbGVzVjFDYWxjdWxhdG9yUGFyYW1zIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNvdW50RGVjcmVhc2VNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBjb3VudEluY3JlYXNlTXVsdGlwbGllcjogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY292ZXJlZEhlaWdodFBvd011bHRpcGxpZXI6IG51bWJlcixcbiAgICAgICAgcHVibGljIGNvdmVyZWRIZWlnaHRNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgSG9sZXNWMUNhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHBhcmFtcyA9IG5ldyBIb2xlc1YxQ2FsY3VsYXRvclBhcmFtcygxNTAsIDcwLCAxLCA1KSxcbiAgICApIHt9XG5cbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBbaG9sZXNDb3VudCwgaG9sZXNDb3ZlcmVkSGVpZ2h0XSA9IHRoaXMuY2FsY3VsYXRlSG9sZXNBbmRDb3ZlcmVkSGVpZ2h0KHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCwgcmVxdWVzdC5nYW1lRGF0YS5tYXRyaXgpO1xuICAgICAgICBjb25zdCBob2xlc0NvdW50RGVjcmVhc2UgPSByZXF1ZXN0Lm9yaWdpbmFsSG9sZXMubGVuZ3RoIC0gaG9sZXNDb3VudDtcbiAgICAgICAgbGV0IGhvbGVzU2NvcmUgPSBob2xlc0NvdW50RGVjcmVhc2UgPiAwXG4gICAgICAgICAgICA/IGhvbGVzQ291bnREZWNyZWFzZSAqIHRoaXMucGFyYW1zLmNvdW50RGVjcmVhc2VNdWx0aXBsaWVyXG4gICAgICAgICAgICA6IGhvbGVzQ291bnREZWNyZWFzZSAqIHRoaXMucGFyYW1zLmNvdW50SW5jcmVhc2VNdWx0aXBsaWVyO1xuICAgICAgICBpZiAoaG9sZXNDb3ZlcmVkSGVpZ2h0ICE9PSAwICYmIGhvbGVzQ291bnQgIT09IDApIHtcbiAgICAgICAgICAgIGhvbGVzU2NvcmUgLT1cbiAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHRcbiAgICAgICAgICAgICAgICAqIE1hdGgucG93KFxuICAgICAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGhvbGVzQ292ZXJlZEhlaWdodCAvIChyZXF1ZXN0LmdhbWVEYXRhLnNldHRpbmdzLmZpZWxkSGVpZ2h0ICogaG9sZXNDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wYXJhbXMuY292ZXJlZEhlaWdodFBvd011bHRpcGxpZXJcbiAgICAgICAgICAgICAgICApICogdGhpcy5wYXJhbXMuY292ZXJlZEhlaWdodE11bHRpcGxpZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhvbGVzU2NvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVIb2xlc0FuZENvdmVyZWRIZWlnaHQoaW1hZ2luYWJsZU1hdHJpeDogYm9vbGVhbltdW10sIHJlYWxNYXRyaXg6IGJvb2xlYW5bXVtdKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIGNvbnN0IFtvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlWSwgb3JpZ2luYWxUaGVIaWdoZXN0SG9sZUNvdmVyZWRZXSA9IHRoaXMuY2FsY3VsYXRlVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWShyZWFsTWF0cml4KTtcbiAgICAgICAgbGV0IGNvdmVyZWRDb2x1bW5zWXMgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPjtcbiAgICAgICAgbGV0IGhvbGVzQ292ZXJlZEhlaWdodHNTdW0gPSAwO1xuICAgICAgICBsZXQgaG9sZXNDb3VudCA9IDA7XG4gICAgICAgIGltYWdpbmFibGVNYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAhY292ZXJlZENvbHVtbnNZcy5oYXMoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnNZcy5zZXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjb3ZlcmVkWSA9IGNvdmVyZWRDb2x1bW5zWXMuZ2V0KHgpO1xuICAgICAgICAgICAgICAgIGlmIChjb3ZlcmVkWSAhPT0gdW5kZWZpbmVkICYmICF2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9sZXNDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxUaGVIaWdoZXN0SG9sZVkgIT09IHVuZGVmaW5lZCAmJiBvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPCBvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzQ292ZXJlZEhlaWdodHNTdW0gKz0geSAtIGNvdmVyZWRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3ZlcmVkWSA8IG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzQ292ZXJlZEhlaWdodHNTdW0gKz0gb3JpZ2luYWxUaGVIaWdoZXN0SG9sZUNvdmVyZWRZIC0gY292ZXJlZFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBbaG9sZXNDb3VudCwgaG9sZXNDb3ZlcmVkSGVpZ2h0c1N1bV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVUaGVIaWdoZXN0SG9sZUNvdmVyZWRZKG1hdHJpeDogYm9vbGVhbltdW10pOiBbbnVtYmVyfHVuZGVmaW5lZCwgbnVtYmVyfHVuZGVmaW5lZF0ge1xuICAgICAgICBsZXQgdGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHRoZUhpZ2hlc3RIb2xlWSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGNvdmVyZWRDb2x1bW5zWXMgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPjtcbiAgICAgICAgbWF0cml4LnNvbWUoKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5zb21lKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICFjb3ZlcmVkQ29sdW1uc1lzLmhhcyh4KSkge1xuICAgICAgICAgICAgICAgICAgICBjb3ZlcmVkQ29sdW1uc1lzLnNldCh4LCB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNvdmVyZWRZID0gY292ZXJlZENvbHVtbnNZcy5nZXQoeCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyZWRZICE9PSB1bmRlZmluZWQgJiYgIXZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGVIaWdoZXN0SG9sZVkgPSB5O1xuICAgICAgICAgICAgICAgICAgICB0aGVIaWdoZXN0SG9sZUNvdmVyZWRZID0gY292ZXJlZFk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBbdGhlSGlnaGVzdEhvbGVZLCB0aGVIaWdoZXN0SG9sZUNvdmVyZWRZXTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0dhbWVEYXRhfSBmcm9tIFwiLi4vLi4vVGV0cmlzL0NvbW1vblwiO1xuaW1wb3J0IHtIb2xlfSBmcm9tIFwiLi4vQ29tbW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGVTY29yZVJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZ2FtZURhdGE6IEdhbWVEYXRhLFxuICAgICAgICBwdWJsaWMgb3JpZ2luYWxIb2xlczogSG9sZVtdLFxuICAgICAgICBwdWJsaWMgb3JpZ2luYWxDb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPixcbiAgICAgICAgcHVibGljIGltYWdpbmFibGVNYXRyaXg6IGJvb2xlYW5bXVtdLFxuICAgICAgICBwdWJsaWMgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zOiBNYXA8bnVtYmVyLCBudW1iZXI+LFxuICAgICAgICBwdWJsaWMgc3F1YXNoZWRMaW5lc0NvdW50OiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZSB7XG4gICAgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyO1xufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgU3F1YXNoZWRSb3dzQ2FsY3VsYXRvclBhcmFtcyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBtdWx0aXBsaWVyOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTcXVhc2hlZFJvd3NDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBwYXJhbXMgPSBuZXcgU3F1YXNoZWRSb3dzQ2FsY3VsYXRvclBhcmFtcyg1KSxcbiAgICApIHt9XG5cbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcmVxdWVzdC5zcXVhc2hlZExpbmVzQ291bnQgKiB0aGlzLnBhcmFtcy5tdWx0aXBsaWVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFR1bm5lbHNDYWxjdWxhdG9yUGFyYW1zIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG1pbmltdW1WYWx1YWJsZUhlaWdodDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY291bnRNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBoZWlnaHRQb3dNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBoZWlnaHRNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgVHVubmVsc0NhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHBhcmFtcyA9IG5ldyBUdW5uZWxzQ2FsY3VsYXRvclBhcmFtcygzLCA3MCwgMSwgNyksXG4gICAgKSB7fVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgW3R1bm5lbHNTdW1IZWlnaHQsIHR1bm5lbHNDb3VudF0gPSB0aGlzLmNhbGN1bGF0ZVR1bm5lbHNFeGNlcHRVbmNvdmVyZWQocmVxdWVzdC5pbWFnaW5hYmxlTWF0cml4LCByZXF1ZXN0LmdhbWVEYXRhLm1hdHJpeCk7XG4gICAgICAgIGlmICh0dW5uZWxzQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICgtdHVubmVsc0NvdW50ICogdGhpcy5wYXJhbXMuY291bnRNdWx0aXBsaWVyKVxuICAgICAgICAgICAgLSAodHVubmVsc1N1bUhlaWdodFxuICAgICAgICAgICAgICAgICogTWF0aC5wb3coXG4gICAgICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQgLyAocmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodCAqIHR1bm5lbHNDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wYXJhbXMuaGVpZ2h0UG93TXVsdGlwbGllclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAqIHRoaXMucGFyYW1zLmhlaWdodE11bHRpcGxpZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlVHVubmVsc0V4Y2VwdFVuY292ZXJlZChpbWFnaW5hYmxlTWF0cml4OiBib29sZWFuW11bXSwgcmVhbE1hdHJpeDogYm9vbGVhbltdW10pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgbGV0IHJlYWxDb3ZlcmVkQ29sdW1ucyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICByZWFsTWF0cml4LmV2ZXJ5KChyb3cpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxDb3ZlcmVkQ29sdW1ucy5hZGQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICAgICAgbGV0IHR1bm5lbHMgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPjtcbiAgICAgICAgY29uc3QgZmllbGRXaWR0aCA9IGltYWdpbmFibGVNYXRyaXhbMF0ubGVuZ3RoO1xuICAgICAgICBpbWFnaW5hYmxlTWF0cml4LmV2ZXJ5KChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5hZGQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxcbiAgICAgICAgICAgICAgICAgICAgJiYgIWltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5oYXMoeClcbiAgICAgICAgICAgICAgICAgICAgJiYgIXJlYWxDb3ZlcmVkQ29sdW1ucy5oYXMoeClcbiAgICAgICAgICAgICAgICAgICAgJiYgKHggPT09IDAgfHwgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLmhhcyh4IC0gMSkpXG4gICAgICAgICAgICAgICAgICAgICYmICh4ID09PSBmaWVsZFdpZHRoIC0gMSB8fCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMuaGFzKHggKyAxKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdHVubmVscy5zZXQoeCwgKHR1bm5lbHMuZ2V0KHgpIHx8IDApICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLnNpemUgPCBmaWVsZFdpZHRoO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHR1bm5lbHNTdW1IZWlnaHQgPSAwO1xuICAgICAgICBsZXQgdHVubmVsc0NvdW50ID0gMDtcbiAgICAgICAgdHVubmVscy5mb3JFYWNoKGhlaWdodCA9PiB7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0ID49IHRoaXMucGFyYW1zLm1pbmltdW1WYWx1YWJsZUhlaWdodCkge1xuICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHR1bm5lbHNDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFt0dW5uZWxzU3VtSGVpZ2h0LCB0dW5uZWxzQ291bnRdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmlndXJlc1NwYXduZWRFdmVudH0gZnJvbSBcIi4uL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzLCBDb21tYW5kVHlwZSwgSW5pdEdhbWVDb21tYW5kfSBmcm9tIFwiLi4vVGV0cmlzL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUmVzb2x2ZXJ9IGZyb20gXCIuL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlci9GaWd1cmVQbGFjaW5nUmVzb2x2ZXJcIjtcbmltcG9ydCB7RmlndXJlUGxhY2luZ1BlcmZvcm1lckludGVyZmFjZX0gZnJvbSBcIi4vRmlndXJlUGxhY2luZ1BlcmZvcm1lci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBUZXRyaXNTb2x2ZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGV2ZW50QnVzOiBFdmVudEJ1cyxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzOiBDb21tYW5kQnVzLFxuICAgICAgICBwcml2YXRlIGZpZ3VyZVBsYWNpbmdSZXNvbHZlcjogRmlndXJlUGxhY2luZ1Jlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGZpZ3VyZVBsYWNpbmdQZXJmb3JtZXI6IEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXJJbnRlcmZhY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29tbWFuZEJ1cy5hZGRIYW5kbGVyKENvbW1hbmRUeXBlLkluaXRHYW1lLCB0aGlzLmluaXRHYW1lSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRHYW1lSGFuZGxlcihjb21tYW5kOiBJbml0R2FtZUNvbW1hbmQpIHtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy5vbihFdmVudFR5cGUuRmlndXJlc1NwYXduZWQsIHRoaXMub25GaWd1cmVzU3Bhd25lZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmlndXJlc1NwYXduZWQoZXZlbnQ6IEZpZ3VyZXNTcGF3bmVkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RmFsbGluZ0ZpZ3VyZXNTdGF0ZXMgPSB0aGlzLmZpZ3VyZVBsYWNpbmdSZXNvbHZlci5yZXNvbHZlKGV2ZW50LmdhbWVEYXRhKTtcbiAgICAgICAgdGhpcy5maWd1cmVQbGFjaW5nUGVyZm9ybWVyLnBsYWNlKGV2ZW50LmdhbWVEYXRhLCB0YXJnZXRGYWxsaW5nRmlndXJlc1N0YXRlcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtIb2xlfSBmcm9tIFwiLi4vQ29tbW9uXCI7XG5pbXBvcnQge0Nvb3JkaW5hdGV9IGZyb20gXCIuLi8uLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0ZpZ3VyZVBsYWNpbmdDaGVja2VyfSBmcm9tIFwiLi4vLi4vVGV0cmlzL1V0aWxzL0ZpZ3VyZVBsYWNpbmdDaGVja2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBIb2xlc0hlbHBlciB7XG4gICAgcHVibGljIHN0YXRpYyBjb2xsZWN0SG9sZXMobWF0cml4OiBib29sZWFuW11bXSk6IEhvbGVbXSB7XG4gICAgICAgIGxldCBob2xlczogSG9sZVtdID0gW107XG5cbiAgICAgICAgY2xhc3MgSG9sZUluUHJvY2VzcyB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgICAgICBwdWJsaWMgY2VsbHM6IENvb3JkaW5hdGVbXSA9IFtdLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBwcmV2aW91c1Jvd09wZW5YczogbnVtYmVyW10gPSBbXSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgY3VycmVudFJvd09wZW5YczogbnVtYmVyW10gPSBbXSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgaXNPcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgY29udGludWVzOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBob2xlc0luUHJvY2VzczogSG9sZUluUHJvY2Vzc1tdID0gW107XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1uczogU2V0PG51bWJlcj4gPSBuZXcgU2V0KCk7XG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIGhvbGVzSW5Qcm9jZXNzLmZvckVhY2goaG9sZSA9PiBob2xlLmNvbnRpbnVlcyA9IGZhbHNlKTtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdmVyZWRDb2x1bW5zLmFkZCh4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdmVyZWRDb2x1bW5zLmhhcyh4KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvY2Vzc2luZ0hvbGUgPSBob2xlc0luUHJvY2Vzcy5maW5kKGhvbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhvbGUucHJldmlvdXNSb3dPcGVuWHMuc29tZShwcmV2WCA9PiBwcmV2WCA9PT0geClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoaG9sZS5jdXJyZW50Um93T3BlblhzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgaG9sZS5jdXJyZW50Um93T3BlblhzW2hvbGUuY3VycmVudFJvd09wZW5Ycy5sZW5ndGggLSAxXSA9PT0geCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2luZ0hvbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0hvbGUgPSBuZXcgSG9sZUluUHJvY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZXNJblByb2Nlc3MucHVzaChwcm9jZXNzaW5nSG9sZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0hvbGUuY3VycmVudFJvd09wZW5Ycy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzaW5nSG9sZS5jZWxscy5wdXNoKG5ldyBDb29yZGluYXRlKHgsIHkpKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0hvbGUuY29udGludWVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZ0hvbGUuaXNPcGVuZWQgPSBwcm9jZXNzaW5nSG9sZS5pc09wZW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5kb2VzVGhlV2F5T3V0RnJvbUhvbGVFeGlzdHMobWF0cml4LCBuZXcgQ29vcmRpbmF0ZSh4LCB5KSwgY292ZXJlZENvbHVtbnMsIFtbdHJ1ZSwgdHJ1ZV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBob2xlc0luUHJvZ3Jlc3NUb1JlbW92ZTogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGhvbGVzSW5Qcm9jZXNzLmZvckVhY2goKGhvbGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaG9sZS5jb250aW51ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaG9sZS5wcmV2aW91c1Jvd09wZW5YcyA9IGhvbGUuY3VycmVudFJvd09wZW5YcztcbiAgICAgICAgICAgICAgICAgICAgaG9sZS5jdXJyZW50Um93T3BlblhzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaG9sZS5jb250aW51ZXMgfHwgeSA9PSBtYXRyaXgubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBob2xlcy5wdXNoKG5ldyBIb2xlKFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZS5pc09wZW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvbGUuY2VsbHMsXG4gICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICBob2xlc0luUHJvZ3Jlc3NUb1JlbW92ZS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaG9sZXNJblByb2dyZXNzVG9SZW1vdmUucmV2ZXJzZSgpLmZvckVhY2goaSA9PiBob2xlc0luUHJvY2Vzcy5zcGxpY2UoaSwgMSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhvbGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZG9lc1RoZVdheU91dEZyb21Ib2xlRXhpc3RzKG1hdHJpeDogYm9vbGVhbltdW10sIGluaXRpYWxDb29yZGluYXRlOiBDb29yZGluYXRlLCBjb3ZlcmVkQ29sdW1uczogU2V0PG51bWJlcj4sIGZpZ3VyZU1hdHJpeDogYm9vbGVhbltdW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFRoZVdheU91dEZyb21Ib2xlKG1hdHJpeCwgaW5pdGlhbENvb3JkaW5hdGUsIGNvdmVyZWRDb2x1bW5zLCBmaWd1cmVNYXRyaXgpICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kVGhlV2F5T3V0RnJvbUhvbGUobWF0cml4OiBib29sZWFuW11bXSwgaW5pdGlhbENvb3JkaW5hdGU6IENvb3JkaW5hdGUsIGNvdmVyZWRDb2x1bW5zOiBTZXQ8bnVtYmVyPnxNYXA8bnVtYmVyLCBudW1iZXI+LCBmaWd1cmVNYXRyaXg6IGJvb2xlYW5bXVtdKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGNvdmVyZWRDb2x1bW5zIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICBjb3ZlcmVkQ29sdW1ucyA9IEhvbGVzSGVscGVyLmNvbnZlcnRDb3ZlcmVkQ29sdW1uc1RvWHMoY292ZXJlZENvbHVtbnMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRyeWluZyB0byBmaW5kIHRoZSB3YXkgb3V0IGZyb20gdGhlIGxlZnQgc2lkZVxuICAgICAgICBsZXQgdGFyZ2V0WENhbmRpZGF0ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGxldCB4ID0gaW5pdGlhbENvb3JkaW5hdGUueCAtIDE7IHggPj0gMDsgeC0tKSB7XG4gICAgICAgICAgICBpZiAoIUZpZ3VyZVBsYWNpbmdDaGVja2VyLmNhbkZpZ3VyZUJlUGxhY2VkKGZpZ3VyZU1hdHJpeCwgbmV3IENvb3JkaW5hdGUoeCwgaW5pdGlhbENvb3JkaW5hdGUueSksIG1hdHJpeCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBhbGxDb2x1bW5zRnJlZVRvRmFsbCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGVja0ZhbGxYID0geCArIGZpZ3VyZU1hdHJpeFswXS5sZW5ndGggLSAxOyBjaGVja0ZhbGxYID49IHg7IGNoZWNrRmFsbFgtLSkge1xuICAgICAgICAgICAgICAgIGlmIChjb3ZlcmVkQ29sdW1ucy5oYXMoY2hlY2tGYWxsWCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsQ29sdW1uc0ZyZWVUb0ZhbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbENvbHVtbnNGcmVlVG9GYWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cnlpbmcgdG8gZmluZCB0aGUgd2F5IG91dCBmcm9tIHRoZSByaWdodCBzaWRlXG4gICAgICAgIGZvciAobGV0IHggPSBpbml0aWFsQ29vcmRpbmF0ZS54ICsgMTsgeCA8IG1hdHJpeFswXS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgaWYgKCFGaWd1cmVQbGFjaW5nQ2hlY2tlci5jYW5GaWd1cmVCZVBsYWNlZChmaWd1cmVNYXRyaXgsIG5ldyBDb29yZGluYXRlKHgsIGluaXRpYWxDb29yZGluYXRlLnkpLCBtYXRyaXgpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgYWxsQ29sdW1uc0ZyZWVUb0ZhbGwgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgY2hlY2tGYWxsWCA9IHg7IGNoZWNrRmFsbFggPCB4ICsgZmlndXJlTWF0cml4WzBdLmxlbmd0aDsgY2hlY2tGYWxsWCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdmVyZWRDb2x1bW5zLmhhcyhjaGVja0ZhbGxYKSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxDb2x1bW5zRnJlZVRvRmFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsQ29sdW1uc0ZyZWVUb0ZhbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjb2xsZWN0Q292ZXJlZENvbHVtbnNYcyhtYXRyaXg6IGJvb2xlYW5bXVtdLCB0b1k/OiBudW1iZXIpOiBTZXQ8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiBIb2xlc0hlbHBlci5jb252ZXJ0Q292ZXJlZENvbHVtbnNUb1hzKFxuICAgICAgICAgICAgSG9sZXNIZWxwZXIuY29sbGVjdENvdmVyZWRDb2x1bW5zKG1hdHJpeCwgdG9ZKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnRDb3ZlcmVkQ29sdW1uc1RvWHMoY292ZXJlZENvbHVtbnM6IE1hcDxudW1iZXIsIG51bWJlcj4pOiBTZXQ8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KFsuLi5jb3ZlcmVkQ29sdW1ucy5rZXlzKCldKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDQvNCw0L/RgyB4OiB5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb2xsZWN0Q292ZXJlZENvbHVtbnMobWF0cml4OiBib29sZWFuW11bXSwgdG9ZPzogbnVtYmVyKTogTWFwPG51bWJlciwgbnVtYmVyPiB7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1uczogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICAgICAgbWF0cml4LnNvbWUoKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnMuc2V0KHgsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuICh0b1kgIT09IHVuZGVmaW5lZCAmJiB5ID49IHRvWSlcbiAgICAgICAgICAgICAgICB8fCBjb3ZlcmVkQ29sdW1ucy5zaXplID09IG1hdHJpeFswXS5sZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY292ZXJlZENvbHVtbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtFdmVudEJ1c30gZnJvbSBcIi4uL1RldHJpcy9FdmVudEJ1cy9FdmVudEJ1c1wiO1xuaW1wb3J0IHtDb21tYW5kQnVzLCBJbml0R2FtZUNvbW1hbmQsIFBhdXNlR2FtZUNvbW1hbmQsIFJlc3VtZUdhbWVDb21tYW5kfSBmcm9tIFwiLi4vVGV0cmlzL0NvbW1hbmRCdXMvQ29tbWFuZEJ1c1wiO1xuaW1wb3J0IHtHYW1lQ29udHJvbGxlcn0gZnJvbSBcIi4uL1RldHJpcy9HYW1lQ29udHJvbGxlclwiO1xuaW1wb3J0IHtNb3ZpbmdIYW5kbGVyfSBmcm9tIFwiLi4vVGV0cmlzL01vdmluZ0hhbmRsZXIvTW92aW5nSGFuZGxlclwiO1xuaW1wb3J0IHtBbHdheXNPbmVGaWd1cmVTcGF3bmVyfSBmcm9tIFwiLi4vVGV0cmlzL0ZpZ3VyZXNTcGF3bmVyL0Fsd2F5c09uZUZpZ3VyZVNwYXduZXJcIjtcbmltcG9ydCB7U3F1YXNoZWRSb3dzQ291bnRlckJhc2VkTGV2ZWxDb3VudGVyfSBmcm9tIFwiLi4vVGV0cmlzL0xldmVsQ291bnRlci9TcXVhc2hlZFJvd3NDb3VudGVyQmFzZWRMZXZlbENvdW50ZXJcIjtcbmltcG9ydCB7Q29tYm9Db3VudGVyfSBmcm9tIFwiLi4vVGV0cmlzL0NvbWJvQ291bnRlci9Db21ib0NvdW50ZXJcIjtcbmltcG9ydCB7RmFsbFRpY2tTY29yZUNvdW50ZXJ9IGZyb20gXCIuLi9UZXRyaXMvU2NvcmVDb3VudGVyL0ZhbGxUaWNrU2NvcmVDb3VudGVyXCI7XG5pbXBvcnQge1N0YXRzQ291bnRlcn0gZnJvbSBcIi4uL1RldHJpcy9TdGF0c0NvdW50ZXIvU3RhdHNDb3VudGVyXCI7XG5pbXBvcnQge0dhbWVEYXRhfSBmcm9tIFwiLi4vVGV0cmlzL0NvbW1vblwiO1xuaW1wb3J0IHtDb25zdFRpbWluZ3NIYW5kbGVyfSBmcm9tIFwiLi4vVGV0cmlzL1RpbWluZ3NIYW5kbGVyL0NvbnN0VGltaW5nc0hhbmRsZXJcIjtcbmltcG9ydCB7VGV0cmlzU29sdmVyfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1RldHJpc1NvbHZlclwiO1xuaW1wb3J0IHtGaWd1cmVQbGFjaW5nUmVzb2x2ZXJ9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvRmlndXJlUGxhY2luZ1Jlc29sdmVyL0ZpZ3VyZVBsYWNpbmdSZXNvbHZlclwiO1xuaW1wb3J0IHtDYWxjdWxhdG9yQWdncmVnYXRlfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9DYWxjdWxhdG9yQWdncmVnYXRlXCI7XG5pbXBvcnQge0ZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9GaWxsYWJsZUNlbGxzL0ZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yXCI7XG5pbXBvcnQge0ZpbGxlZEhlaWdodENhbGN1bGF0b3J9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxlZEhlaWdodC9GaWxsZWRIZWlnaHRDYWxjdWxhdG9yXCI7XG5pbXBvcnQge0hvbGVzVjFDYWxjdWxhdG9yfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9Ib2xlcy9Ib2xlc1YxQ2FsY3VsYXRvclwiO1xuaW1wb3J0IHtTcXVhc2hlZFJvd3NDYWxjdWxhdG9yfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9TcXVhc2hlZFJvd3MvU3F1YXNoZWRSb3dzQ2FsY3VsYXRvclwiO1xuaW1wb3J0IHtUdW5uZWxzQ2FsY3VsYXRvcn0gZnJvbSBcIi4uL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvVHVubmVscy9UdW5uZWxzQ2FsY3VsYXRvclwiO1xuaW1wb3J0IHtJbnN0YW50RmlndXJlUGxhY2luZ1BlcmZvcm1lcn0gZnJvbSBcIi4uL1RldHJpc1NvbHZlci9GaWd1cmVQbGFjaW5nUGVyZm9ybWVyL0luc3RhbnRGaWd1cmVQbGFjaW5nUGVyZm9ybWVyXCI7XG5pbXBvcnQge1JlZ3VsYXJGYWxsaW5nRmlndXJlc1Byb2Nlc3Nvcn0gZnJvbSBcIi4uL1RldHJpcy9GYWxsaW5nRmlndXJlc1Byb2Nlc3Nvci9SZWd1bGFyRmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3JcIjtcbmltcG9ydCB7QmVuY2hSdW5QYXJhbWV0ZXJzfSBmcm9tIFwiLi9Db21tb25cIjtcblxuZXhwb3J0IGNsYXNzIEJlbmNoU29sdmVyRmFjYWRlIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYmVuY2hSdW5QYXJhbWV0ZXJzOiBCZW5jaFJ1blBhcmFtZXRlcnMsXG4gICAgICAgIHByaXZhdGUgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoKSxcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kQnVzID0gbmV3IENvbW1hbmRCdXMoKSxcbiAgICAgICAgcHJpdmF0ZSBnYW1lQ29udHJvbGxlciA9IG5ldyBHYW1lQ29udHJvbGxlcihcbiAgICAgICAgICAgIG5ldyBDb25zdFRpbWluZ3NIYW5kbGVyKEluZmluaXR5KSxcbiAgICAgICAgICAgIGV2ZW50QnVzLFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBtb3ZpbmdIYW5kbGVyID0gbmV3IE1vdmluZ0hhbmRsZXIoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgZmFsbGluZ0ZpZ3VyZXNQcm9jZXNzb3IgPSBuZXcgUmVndWxhckZhbGxpbmdGaWd1cmVzUHJvY2Vzc29yKFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgICAgIGV2ZW50QnVzXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgZmlndXJlc1NwYXduZXIgPSBuZXcgQWx3YXlzT25lRmlndXJlU3Bhd25lcihcbiAgICAgICAgICAgIGV2ZW50QnVzLFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgKSxcbiAgICAgICAgcHJpdmF0ZSBsZXZlbENvdW50ZXIgPSBuZXcgU3F1YXNoZWRSb3dzQ291bnRlckJhc2VkTGV2ZWxDb3VudGVyKFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDE1LFxuICAgICAgICApLFxuICAgICAgICBwcml2YXRlIGNvbWJvQ291bnRlciA9IG5ldyBDb21ib0NvdW50ZXIoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICksXG4gICAgICAgIHByaXZhdGUgc2NvcmVDb3VudGVyID0gbmV3IEZhbGxUaWNrU2NvcmVDb3VudGVyKFxuICAgICAgICAgICAgY29tbWFuZEJ1cyxcbiAgICAgICAgICAgIGV2ZW50QnVzLFxuICAgICAgICApLFxuICAgICAgICBwcml2YXRlIHN0YXRzQ291bnRlciA9IG5ldyBTdGF0c0NvdW50ZXIoXG4gICAgICAgICAgICBjb21tYW5kQnVzLFxuICAgICAgICAgICAgZXZlbnRCdXMsXG4gICAgICAgICksXG4gICAgICAgIHB1YmxpYyBnYW1lRGF0YSA9IEdhbWVEYXRhLm1ha2VTaW1wbGUoKSxcbiAgICAgICAgcHVibGljIHRldHJpc1NvbHZlciA9IG5ldyBUZXRyaXNTb2x2ZXIoXG4gICAgICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICBuZXcgRmlndXJlUGxhY2luZ1Jlc29sdmVyKFxuICAgICAgICAgICAgICAgIGNvbW1hbmRCdXMsXG4gICAgICAgICAgICAgICAgbmV3IENhbGN1bGF0b3JBZ2dyZWdhdGUoW1xuICAgICAgICAgICAgICAgICAgICBuZXcgRmlsbGFibGVDZWxsc0NhbGN1bGF0b3IoYmVuY2hSdW5QYXJhbWV0ZXJzLmZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yUGFyYW1zKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IEZpbGxlZEhlaWdodENhbGN1bGF0b3IoYmVuY2hSdW5QYXJhbWV0ZXJzLmZpbGxlZEhlaWdodENhbGN1bGF0b3JQYXJhbXMpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgSG9sZXNWMUNhbGN1bGF0b3IoYmVuY2hSdW5QYXJhbWV0ZXJzLmhvbGVzVjFDYWxjdWxhdG9yUGFyYW1zKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFNxdWFzaGVkUm93c0NhbGN1bGF0b3IoYmVuY2hSdW5QYXJhbWV0ZXJzLnNxdWFzaGVkUm93c0NhbGN1bGF0b3JQYXJhbXMpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVHVubmVsc0NhbGN1bGF0b3IoYmVuY2hSdW5QYXJhbWV0ZXJzLnR1bm5lbHNDYWxjdWxhdG9yUGFyYW1zKSxcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBuZXcgSW5zdGFudEZpZ3VyZVBsYWNpbmdQZXJmb3JtZXIoY29tbWFuZEJ1cyksXG4gICAgICAgIClcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgc3RhcnQoZ2FtZURhdGE/OiBHYW1lRGF0YSkge1xuICAgICAgICB0aGlzLmdhbWVEYXRhID0gZ2FtZURhdGEgfHwgR2FtZURhdGEubWFrZVNpbXBsZSgpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBJbml0R2FtZUNvbW1hbmQodGhpcy5nYW1lRGF0YSkpO1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBSZXN1bWVHYW1lQ29tbWFuZCh0aGlzLmdhbWVEYXRhKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmNvbW1hbmRCdXMucnVuKG5ldyBQYXVzZUdhbWVDb21tYW5kKHRoaXMuZ2FtZURhdGEpKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIHdvcmtlcnBvb2wuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3NkZWpvbmcvd29ya2VycG9vbFxuICpcbiAqIE9mZmxvYWQgdGFza3MgdG8gYSBwb29sIG9mIHdvcmtlcnMgb24gbm9kZS5qcyBhbmQgaW4gdGhlIGJyb3dzZXIuXG4gKlxuICogQHZlcnNpb24gNi4zLjFcbiAqIEBkYXRlICAgIDIwMjItMTEtMDdcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE0LTIwMjIgSm9zIGRlIEpvbmcgPHdqb3NkZWpvbmdAZ21haWwuY29tPlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90XG4gKiB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXJcbiAqIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwid29ya2VycG9vbFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3b3JrZXJwb29sXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIndvcmtlcnBvb2xcIl0gPSBmYWN0b3J5KCk7XG59KSgodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24oKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyAzNDU6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIFByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxOSk7XG52YXIgV29ya2VySGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNzUxKTtcbnZhciBlbnZpcm9ubWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oODI4KTtcbnZhciBEZWJ1Z1BvcnRBbGxvY2F0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgzMyk7XG52YXIgREVCVUdfUE9SVF9BTExPQ0FUT1IgPSBuZXcgRGVidWdQb3J0QWxsb2NhdG9yKCk7XG4vKipcbiAqIEEgcG9vbCB0byBtYW5hZ2Ugd29ya2Vyc1xuICogQHBhcmFtIHtTdHJpbmd9IFtzY3JpcHRdICAgT3B0aW9uYWwgd29ya2VyIHNjcmlwdFxuICogQHBhcmFtIHtXb3JrZXJQb29sT3B0aW9uc30gW29wdGlvbnNdICBTZWUgZG9jc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFBvb2woc2NyaXB0LCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygc2NyaXB0ID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0IHx8IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICAgIG9wdGlvbnMgPSBzY3JpcHQ7XG4gIH1cbiAgdGhpcy53b3JrZXJzID0gW107IC8vIHF1ZXVlIHdpdGggYWxsIHdvcmtlcnNcbiAgdGhpcy50YXNrcyA9IFtdOyAvLyBxdWV1ZSB3aXRoIHRhc2tzIGF3YWl0aW5nIGV4ZWN1dGlvblxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLmZvcmtBcmdzID0gT2JqZWN0LmZyZWV6ZShvcHRpb25zLmZvcmtBcmdzIHx8IFtdKTtcbiAgdGhpcy5mb3JrT3B0cyA9IE9iamVjdC5mcmVlemUob3B0aW9ucy5mb3JrT3B0cyB8fCB7fSk7XG4gIHRoaXMud29ya2VyVGhyZWFkT3B0cyA9IE9iamVjdC5mcmVlemUob3B0aW9ucy53b3JrZXJUaHJlYWRPcHRzIHx8IHt9KTtcbiAgdGhpcy5kZWJ1Z1BvcnRTdGFydCA9IG9wdGlvbnMuZGVidWdQb3J0U3RhcnQgfHwgNDMyMTA7XG4gIHRoaXMubm9kZVdvcmtlciA9IG9wdGlvbnMubm9kZVdvcmtlcjtcbiAgdGhpcy53b3JrZXJUeXBlID0gb3B0aW9ucy53b3JrZXJUeXBlIHx8IG9wdGlvbnMubm9kZVdvcmtlciB8fCAnYXV0byc7XG4gIHRoaXMubWF4UXVldWVTaXplID0gb3B0aW9ucy5tYXhRdWV1ZVNpemUgfHwgSW5maW5pdHk7XG4gIHRoaXMub25DcmVhdGVXb3JrZXIgPSBvcHRpb25zLm9uQ3JlYXRlV29ya2VyIHx8IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbiAgdGhpcy5vblRlcm1pbmF0ZVdvcmtlciA9IG9wdGlvbnMub25UZXJtaW5hdGVXb3JrZXIgfHwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIC8vIGNvbmZpZ3VyYXRpb25cbiAgaWYgKG9wdGlvbnMgJiYgJ21heFdvcmtlcnMnIGluIG9wdGlvbnMpIHtcbiAgICB2YWxpZGF0ZU1heFdvcmtlcnMob3B0aW9ucy5tYXhXb3JrZXJzKTtcbiAgICB0aGlzLm1heFdvcmtlcnMgPSBvcHRpb25zLm1heFdvcmtlcnM7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tYXhXb3JrZXJzID0gTWF0aC5tYXgoKGVudmlyb25tZW50LmNwdXMgfHwgNCkgLSAxLCAxKTtcbiAgfVxuICBpZiAob3B0aW9ucyAmJiAnbWluV29ya2VycycgaW4gb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLm1pbldvcmtlcnMgPT09ICdtYXgnKSB7XG4gICAgICB0aGlzLm1pbldvcmtlcnMgPSB0aGlzLm1heFdvcmtlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbGlkYXRlTWluV29ya2VycyhvcHRpb25zLm1pbldvcmtlcnMpO1xuICAgICAgdGhpcy5taW5Xb3JrZXJzID0gb3B0aW9ucy5taW5Xb3JrZXJzO1xuICAgICAgdGhpcy5tYXhXb3JrZXJzID0gTWF0aC5tYXgodGhpcy5taW5Xb3JrZXJzLCB0aGlzLm1heFdvcmtlcnMpOyAvLyBpbiBjYXNlIG1pbldvcmtlcnMgaXMgaGlnaGVyIHRoYW4gbWF4V29ya2Vyc1xuICAgIH1cblxuICAgIHRoaXMuX2Vuc3VyZU1pbldvcmtlcnMoKTtcbiAgfVxuICB0aGlzLl9ib3VuZE5leHQgPSB0aGlzLl9uZXh0LmJpbmQodGhpcyk7XG4gIGlmICh0aGlzLndvcmtlclR5cGUgPT09ICd0aHJlYWQnKSB7XG4gICAgV29ya2VySGFuZGxlci5lbnN1cmVXb3JrZXJUaHJlYWRzKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBFeGVjdXRlIGEgZnVuY3Rpb24gb24gYSB3b3JrZXIuXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgIHZhciBwb29sID0gbmV3IFBvb2woKVxuICpcbiAqICAgLy8gY2FsbCBhIGZ1bmN0aW9uIGF2YWlsYWJsZSBvbiB0aGUgd29ya2VyXG4gKiAgIHBvb2wuZXhlYygnZmlib25hY2NpJywgWzZdKVxuICpcbiAqICAgLy8gb2ZmbG9hZCBhIGZ1bmN0aW9uXG4gKiAgIGZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gKiAgICAgcmV0dXJuIGEgKyBiXG4gKiAgIH07XG4gKiAgIHBvb2wuZXhlYyhhZGQsIFsyLCA0XSlcbiAqICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTsgLy8gb3V0cHV0cyA2XG4gKiAgICAgICB9KVxuICogICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAqICAgICAgIH0pO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nIHwgRnVuY3Rpb259IG1ldGhvZCAgRnVuY3Rpb24gbmFtZSBvciBmdW5jdGlvbi5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgYG1ldGhvZGAgaXMgYSBzdHJpbmcsIHRoZSBjb3JyZXNwb25kaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCBvbiB0aGUgd29ya2VyIHdpbGwgYmUgZXhlY3V0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgYG1ldGhvZGAgaXMgYSBGdW5jdGlvbiwgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGwgYmUgc3RyaW5naWZpZWQgYW5kIGV4ZWN1dGVkIHZpYSB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VycyBidWlsdC1pbiBmdW5jdGlvbiBgcnVuKGZuLCBhcmdzKWAuXG4gKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zXSAgRnVuY3Rpb24gYXJndW1lbnRzIGFwcGxpZWQgd2hlbiBjYWxsaW5nIHRoZSBmdW5jdGlvblxuICogQHBhcmFtIHtFeGVjT3B0aW9uc30gW29wdGlvbnNdICBPcHRpb25zIG9iamVjdFxuICogQHJldHVybiB7UHJvbWlzZS48KiwgRXJyb3I+fSByZXN1bHRcbiAqL1xuUG9vbC5wcm90b3R5cGUuZXhlYyA9IGZ1bmN0aW9uIChtZXRob2QsIHBhcmFtcywgb3B0aW9ucykge1xuICAvLyB2YWxpZGF0ZSB0eXBlIG9mIGFyZ3VtZW50c1xuICBpZiAocGFyYW1zICYmICFBcnJheS5pc0FycmF5KHBhcmFtcykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheSBleHBlY3RlZCBhcyBhcmd1bWVudCBcInBhcmFtc1wiJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIHJlc29sdmVyID0gUHJvbWlzZS5kZWZlcigpO1xuICAgIGlmICh0aGlzLnRhc2tzLmxlbmd0aCA+PSB0aGlzLm1heFF1ZXVlU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXggcXVldWUgc2l6ZSBvZiAnICsgdGhpcy5tYXhRdWV1ZVNpemUgKyAnIHJlYWNoZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYSBuZXcgdGFzayB0byB0aGUgcXVldWVcbiAgICB2YXIgdGFza3MgPSB0aGlzLnRhc2tzO1xuICAgIHZhciB0YXNrID0ge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIHJlc29sdmVyOiByZXNvbHZlcixcbiAgICAgIHRpbWVvdXQ6IG51bGwsXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfTtcbiAgICB0YXNrcy5wdXNoKHRhc2spO1xuXG4gICAgLy8gcmVwbGFjZSB0aGUgdGltZW91dCBtZXRob2Qgb2YgdGhlIFByb21pc2Ugd2l0aCBvdXIgb3duLFxuICAgIC8vIHdoaWNoIHN0YXJ0cyB0aGUgdGltZXIgYXMgc29vbiBhcyB0aGUgdGFzayBpcyBhY3R1YWxseSBzdGFydGVkXG4gICAgdmFyIG9yaWdpbmFsVGltZW91dCA9IHJlc29sdmVyLnByb21pc2UudGltZW91dDtcbiAgICByZXNvbHZlci5wcm9taXNlLnRpbWVvdXQgPSBmdW5jdGlvbiB0aW1lb3V0KGRlbGF5KSB7XG4gICAgICBpZiAodGFza3MuaW5kZXhPZih0YXNrKSAhPT0gLTEpIHtcbiAgICAgICAgLy8gdGFzayBpcyBzdGlsbCBxdWV1ZWQgLT4gc3RhcnQgdGhlIHRpbWVyIGxhdGVyIG9uXG4gICAgICAgIHRhc2sudGltZW91dCA9IGRlbGF5O1xuICAgICAgICByZXR1cm4gcmVzb2x2ZXIucHJvbWlzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRhc2sgaXMgYWxyZWFkeSBiZWluZyBleGVjdXRlZCAtPiBzdGFydCB0aW1lciBpbW1lZGlhdGVseVxuICAgICAgICByZXR1cm4gb3JpZ2luYWxUaW1lb3V0LmNhbGwocmVzb2x2ZXIucHJvbWlzZSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyB0cmlnZ2VyIHRhc2sgZXhlY3V0aW9uXG4gICAgdGhpcy5fbmV4dCgpO1xuICAgIHJldHVybiByZXNvbHZlci5wcm9taXNlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBzZW5kIHN0cmluZ2lmaWVkIGZ1bmN0aW9uIGFuZCBmdW5jdGlvbiBhcmd1bWVudHMgdG8gd29ya2VyXG4gICAgcmV0dXJuIHRoaXMuZXhlYygncnVuJywgW1N0cmluZyhtZXRob2QpLCBwYXJhbXNdKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbiBvciBzdHJpbmcgZXhwZWN0ZWQgYXMgYXJndW1lbnQgXCJtZXRob2RcIicpO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHByb3h5IGZvciBjdXJyZW50IHdvcmtlci4gUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBhbGxcbiAqIG1ldGhvZHMgYXZhaWxhYmxlIG9uIHRoZSB3b3JrZXIuIFRoZSBtZXRob2RzIGFsd2F5cyByZXR1cm4gYSBwcm9taXNlLlxuICpcbiAqIEByZXR1cm4ge1Byb21pc2UuPE9iamVjdCwgRXJyb3I+fSBwcm94eVxuICovXG5Qb29sLnByb3RvdHlwZS5wcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBhcmd1bWVudHMgZXhwZWN0ZWQnKTtcbiAgfVxuICB2YXIgcG9vbCA9IHRoaXM7XG4gIHJldHVybiB0aGlzLmV4ZWMoJ21ldGhvZHMnKS50aGVuKGZ1bmN0aW9uIChtZXRob2RzKSB7XG4gICAgdmFyIHByb3h5ID0ge307XG4gICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIHByb3h5W21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwb29sLmV4ZWMobWV0aG9kLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgYXJyYXkgd2l0aCB0aGUgcmVzdWx0cyBvZiBjYWxsaW5nIGEgcHJvdmlkZWQgY2FsbGJhY2sgZnVuY3Rpb25cbiAqIG9uIGV2ZXJ5IGVsZW1lbnQgaW4gdGhpcyBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAgRnVuY3Rpb24gdGFraW5nIHR3byBhcmd1bWVudHM6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGNhbGxiYWNrKGN1cnJlbnRWYWx1ZSwgaW5kZXgpYFxuICogQHJldHVybiB7UHJvbWlzZS48QXJyYXk+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyAgd2l0aCBhbiBBcnJheVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluaW5nIHRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRlZCBmb3IgZWFjaCBvZiB0aGUgYXJyYXkgZWxlbWVudHMuXG4gKi9cbi8qIFRPRE86IGltcGxlbWVudCBtYXBcblBvb2wucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2spIHtcbn07XG4qL1xuXG4vKipcbiAqIEdyYWIgdGhlIGZpcnN0IHRhc2sgZnJvbSB0aGUgcXVldWUsIGZpbmQgYSBmcmVlIHdvcmtlciwgYW5kIGFzc2lnbiB0aGVcbiAqIHdvcmtlciB0byB0aGUgdGFzay5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUG9vbC5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAvLyB0aGVyZSBhcmUgdGFza3MgaW4gdGhlIHF1ZXVlXG5cbiAgICAvLyBmaW5kIGFuIGF2YWlsYWJsZSB3b3JrZXJcbiAgICB2YXIgd29ya2VyID0gdGhpcy5fZ2V0V29ya2VyKCk7XG4gICAgaWYgKHdvcmtlcikge1xuICAgICAgLy8gZ2V0IHRoZSBmaXJzdCB0YXNrIGZyb20gdGhlIHF1ZXVlXG4gICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgdmFyIHRhc2sgPSB0aGlzLnRhc2tzLnNoaWZ0KCk7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSB0YXNrIGlzIHN0aWxsIHBlbmRpbmcgKGFuZCBub3QgY2FuY2VsbGVkIC0+IHByb21pc2UgcmVqZWN0ZWQpXG4gICAgICBpZiAodGFzay5yZXNvbHZlci5wcm9taXNlLnBlbmRpbmcpIHtcbiAgICAgICAgLy8gc2VuZCB0aGUgcmVxdWVzdCB0byB0aGUgd29ya2VyXG4gICAgICAgIHZhciBwcm9taXNlID0gd29ya2VyLmV4ZWModGFzay5tZXRob2QsIHRhc2sucGFyYW1zLCB0YXNrLnJlc29sdmVyLCB0YXNrLm9wdGlvbnMpLnRoZW4obWUuX2JvdW5kTmV4dClbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHdvcmtlciBjcmFzaGVkIGFuZCB0ZXJtaW5hdGVkLCByZW1vdmUgaXQgZnJvbSB0aGUgcG9vbFxuICAgICAgICAgIGlmICh3b3JrZXIudGVybWluYXRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG1lLl9yZW1vdmVXb3JrZXIod29ya2VyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1lLl9uZXh0KCk7IC8vIHRyaWdnZXIgbmV4dCB0YXNrIGluIHRoZSBxdWV1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzdGFydCBxdWV1ZWQgdGltZXIgbm93XG4gICAgICAgIGlmICh0eXBlb2YgdGFzay50aW1lb3V0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHByb21pc2UudGltZW91dCh0YXNrLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGUgdGFzayB0YWtlbiB3YXMgYWxyZWFkeSBjb21wbGV0ZSAoZWl0aGVyIHJlamVjdGVkIG9yIHJlc29sdmVkKSwgc28ganVzdCB0cmlnZ2VyIG5leHQgdGFzayBpbiB0aGUgcXVldWVcbiAgICAgICAgbWUuX25leHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogR2V0IGFuIGF2YWlsYWJsZSB3b3JrZXIuIElmIG5vIHdvcmtlciBpcyBhdmFpbGFibGUgYW5kIHRoZSBtYXhpbXVtIG51bWJlclxuICogb2Ygd29ya2VycyBpc24ndCB5ZXQgcmVhY2hlZCwgYSBuZXcgd29ya2VyIHdpbGwgYmUgY3JlYXRlZCBhbmQgcmV0dXJuZWQuXG4gKiBJZiBubyB3b3JrZXIgaXMgYXZhaWxhYmxlIGFuZCB0aGUgbWF4aW11bSBudW1iZXIgb2Ygd29ya2VycyBpcyByZWFjaGVkLFxuICogbnVsbCB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEByZXR1cm4ge1dvcmtlckhhbmRsZXIgfCBudWxsfSB3b3JrZXJcbiAqIEBwcml2YXRlXG4gKi9cblBvb2wucHJvdG90eXBlLl9nZXRXb3JrZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGZpbmQgYSBub24tYnVzeSB3b3JrZXJcbiAgdmFyIHdvcmtlcnMgPSB0aGlzLndvcmtlcnM7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgd29ya2Vycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB3b3JrZXIgPSB3b3JrZXJzW2ldO1xuICAgIGlmICh3b3JrZXIuYnVzeSgpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9XG4gIH1cbiAgaWYgKHdvcmtlcnMubGVuZ3RoIDwgdGhpcy5tYXhXb3JrZXJzKSB7XG4gICAgLy8gY3JlYXRlIGEgbmV3IHdvcmtlclxuICAgIHdvcmtlciA9IHRoaXMuX2NyZWF0ZVdvcmtlckhhbmRsZXIoKTtcbiAgICB3b3JrZXJzLnB1c2god29ya2VyKTtcbiAgICByZXR1cm4gd29ya2VyO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSB3b3JrZXIgZnJvbSB0aGUgcG9vbC5cbiAqIEF0dGVtcHRzIHRvIHRlcm1pbmF0ZSB3b3JrZXIgaWYgbm90IGFscmVhZHkgdGVybWluYXRlZCwgYW5kIGVuc3VyZXMgdGhlIG1pbmltdW1cbiAqIHBvb2wgc2l6ZSBpcyBtZXQuXG4gKiBAcGFyYW0ge1dvcmtlckhhbmRsZXJ9IHdvcmtlclxuICogQHJldHVybiB7UHJvbWlzZTxXb3JrZXJIYW5kbGVyPn1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUG9vbC5wcm90b3R5cGUuX3JlbW92ZVdvcmtlciA9IGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgREVCVUdfUE9SVF9BTExPQ0FUT1IucmVsZWFzZVBvcnQod29ya2VyLmRlYnVnUG9ydCk7XG4gIC8vIF9yZW1vdmVXb3JrZXIgd2lsbCBjYWxsIHRoaXMsIGJ1dCB3ZSBuZWVkIGl0IHRvIGJlIHJlbW92ZWQgc3luY2hyb25vdXNseVxuICB0aGlzLl9yZW1vdmVXb3JrZXJGcm9tTGlzdCh3b3JrZXIpO1xuICAvLyBJZiBtaW5Xb3JrZXJzIHNldCwgc3BpbiB1cCBuZXcgd29ya2VycyB0byByZXBsYWNlIHRoZSBjcmFzaGVkIG9uZXNcbiAgdGhpcy5fZW5zdXJlTWluV29ya2VycygpO1xuICAvLyB0ZXJtaW5hdGUgdGhlIHdvcmtlciAoaWYgbm90IGFscmVhZHkgdGVybWluYXRlZClcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB3b3JrZXIudGVybWluYXRlKGZhbHNlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBtZS5vblRlcm1pbmF0ZVdvcmtlcih7XG4gICAgICAgIGZvcmtBcmdzOiB3b3JrZXIuZm9ya0FyZ3MsXG4gICAgICAgIGZvcmtPcHRzOiB3b3JrZXIuZm9ya09wdHMsXG4gICAgICAgIHNjcmlwdDogd29ya2VyLnNjcmlwdFxuICAgICAgfSk7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh3b3JrZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgd29ya2VyIGZyb20gdGhlIHBvb2wgbGlzdC5cbiAqIEBwYXJhbSB7V29ya2VySGFuZGxlcn0gd29ya2VyXG4gKiBAcHJvdGVjdGVkXG4gKi9cblBvb2wucHJvdG90eXBlLl9yZW1vdmVXb3JrZXJGcm9tTGlzdCA9IGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgLy8gcmVtb3ZlIGZyb20gdGhlIGxpc3Qgd2l0aCB3b3JrZXJzXG4gIHZhciBpbmRleCA9IHRoaXMud29ya2Vycy5pbmRleE9mKHdvcmtlcik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB0aGlzLndvcmtlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDbG9zZSBhbGwgYWN0aXZlIHdvcmtlcnMuIFRhc2tzIGN1cnJlbnRseSBiZWluZyBleGVjdXRlZCB3aWxsIGJlIGZpbmlzaGVkIGZpcnN0LlxuICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdICAgSWYgZmFsc2UgKGRlZmF1bHQpLCB0aGUgd29ya2VycyBhcmUgdGVybWluYXRlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgZmluaXNoaW5nIGFsbCB0YXNrcyBjdXJyZW50bHkgaW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLiBJZiB0cnVlLCB0aGUgd29ya2VycyB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkIGltbWVkaWF0ZWx5LlxuICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XSAgICAgICAgSWYgcHJvdmlkZWQgYW5kIG5vbi16ZXJvLCB3b3JrZXIgdGVybWluYXRpb24gcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlciB0aW1lb3V0IGlmIHdvcmtlciBwcm9jZXNzIGhhcyBub3QgYmVlbiB0ZXJtaW5hdGVkLlxuICogQHJldHVybiB7UHJvbWlzZS48dm9pZCwgRXJyb3I+fVxuICovXG5Qb29sLnByb3RvdHlwZS50ZXJtaW5hdGUgPSBmdW5jdGlvbiAoZm9yY2UsIHRpbWVvdXQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBjYW5jZWwgYW55IHBlbmRpbmcgdGFza3NcbiAgdGhpcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgdGFzay5yZXNvbHZlci5yZWplY3QobmV3IEVycm9yKCdQb29sIHRlcm1pbmF0ZWQnKSk7XG4gIH0pO1xuICB0aGlzLnRhc2tzLmxlbmd0aCA9IDA7XG4gIHZhciBmID0gZnVuY3Rpb24gZih3b3JrZXIpIHtcbiAgICBERUJVR19QT1JUX0FMTE9DQVRPUi5yZWxlYXNlUG9ydCh3b3JrZXIuZGVidWdQb3J0KTtcbiAgICB0aGlzLl9yZW1vdmVXb3JrZXJGcm9tTGlzdCh3b3JrZXIpO1xuICB9O1xuICB2YXIgcmVtb3ZlV29ya2VyID0gZi5iaW5kKHRoaXMpO1xuICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgdmFyIHdvcmtlcnMgPSB0aGlzLndvcmtlcnMuc2xpY2UoKTtcbiAgd29ya2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh3b3JrZXIpIHtcbiAgICB2YXIgdGVybVByb21pc2UgPSB3b3JrZXIudGVybWluYXRlQW5kTm90aWZ5KGZvcmNlLCB0aW1lb3V0KS50aGVuKHJlbW92ZVdvcmtlcikuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lLm9uVGVybWluYXRlV29ya2VyKHtcbiAgICAgICAgZm9ya0FyZ3M6IHdvcmtlci5mb3JrQXJncyxcbiAgICAgICAgZm9ya09wdHM6IHdvcmtlci5mb3JrT3B0cyxcbiAgICAgICAgc2NyaXB0OiB3b3JrZXIuc2NyaXB0XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBwcm9taXNlcy5wdXNoKHRlcm1Qcm9taXNlKTtcbiAgfSk7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIHN0YXRpc3RpY3Mgb24gdGFza3MgYW5kIHdvcmtlcnMuXG4gKiBAcmV0dXJuIHt7dG90YWxXb3JrZXJzOiBudW1iZXIsIGJ1c3lXb3JrZXJzOiBudW1iZXIsIGlkbGVXb3JrZXJzOiBudW1iZXIsIHBlbmRpbmdUYXNrczogbnVtYmVyLCBhY3RpdmVUYXNrczogbnVtYmVyfX0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBzdGF0aXN0aWNzXG4gKi9cblBvb2wucHJvdG90eXBlLnN0YXRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdG90YWxXb3JrZXJzID0gdGhpcy53b3JrZXJzLmxlbmd0aDtcbiAgdmFyIGJ1c3lXb3JrZXJzID0gdGhpcy53b3JrZXJzLmZpbHRlcihmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgcmV0dXJuIHdvcmtlci5idXN5KCk7XG4gIH0pLmxlbmd0aDtcbiAgcmV0dXJuIHtcbiAgICB0b3RhbFdvcmtlcnM6IHRvdGFsV29ya2VycyxcbiAgICBidXN5V29ya2VyczogYnVzeVdvcmtlcnMsXG4gICAgaWRsZVdvcmtlcnM6IHRvdGFsV29ya2VycyAtIGJ1c3lXb3JrZXJzLFxuICAgIHBlbmRpbmdUYXNrczogdGhpcy50YXNrcy5sZW5ndGgsXG4gICAgYWN0aXZlVGFza3M6IGJ1c3lXb3JrZXJzXG4gIH07XG59O1xuXG4vKipcbiAqIEVuc3VyZXMgdGhhdCBhIG1pbmltdW0gb2YgbWluV29ya2VycyBpcyB1cCBhbmQgcnVubmluZ1xuICogQHByb3RlY3RlZFxuICovXG5Qb29sLnByb3RvdHlwZS5fZW5zdXJlTWluV29ya2VycyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMubWluV29ya2Vycykge1xuICAgIGZvciAodmFyIGkgPSB0aGlzLndvcmtlcnMubGVuZ3RoOyBpIDwgdGhpcy5taW5Xb3JrZXJzOyBpKyspIHtcbiAgICAgIHRoaXMud29ya2Vycy5wdXNoKHRoaXMuX2NyZWF0ZVdvcmtlckhhbmRsZXIoKSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgYSBuZXcgV29ya2VySGFuZGxlciBhbmQgcGFzcyBhbGwgb3B0aW9ucy5cbiAqIEByZXR1cm4ge1dvcmtlckhhbmRsZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5Qb29sLnByb3RvdHlwZS5fY3JlYXRlV29ya2VySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG92ZXJyaWRlblBhcmFtcyA9IHRoaXMub25DcmVhdGVXb3JrZXIoe1xuICAgIGZvcmtBcmdzOiB0aGlzLmZvcmtBcmdzLFxuICAgIGZvcmtPcHRzOiB0aGlzLmZvcmtPcHRzLFxuICAgIHdvcmtlclRocmVhZE9wdHM6IHRoaXMud29ya2VyVGhyZWFkT3B0cyxcbiAgICBzY3JpcHQ6IHRoaXMuc2NyaXB0XG4gIH0pIHx8IHt9O1xuICByZXR1cm4gbmV3IFdvcmtlckhhbmRsZXIob3ZlcnJpZGVuUGFyYW1zLnNjcmlwdCB8fCB0aGlzLnNjcmlwdCwge1xuICAgIGZvcmtBcmdzOiBvdmVycmlkZW5QYXJhbXMuZm9ya0FyZ3MgfHwgdGhpcy5mb3JrQXJncyxcbiAgICBmb3JrT3B0czogb3ZlcnJpZGVuUGFyYW1zLmZvcmtPcHRzIHx8IHRoaXMuZm9ya09wdHMsXG4gICAgd29ya2VyVGhyZWFkT3B0czogb3ZlcnJpZGVuUGFyYW1zLndvcmtlclRocmVhZE9wdHMgfHwgdGhpcy53b3JrZXJUaHJlYWRPcHRzLFxuICAgIGRlYnVnUG9ydDogREVCVUdfUE9SVF9BTExPQ0FUT1IubmV4dEF2YWlsYWJsZVN0YXJ0aW5nQXQodGhpcy5kZWJ1Z1BvcnRTdGFydCksXG4gICAgd29ya2VyVHlwZTogdGhpcy53b3JrZXJUeXBlXG4gIH0pO1xufTtcblxuLyoqXG4gKiBFbnN1cmUgdGhhdCB0aGUgbWF4V29ya2VycyBvcHRpb24gaXMgYW4gaW50ZWdlciA+PSAxXG4gKiBAcGFyYW0geyp9IG1heFdvcmtlcnNcbiAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm5zIHRydWUgbWF4V29ya2VycyBoYXMgYSB2YWxpZCB2YWx1ZVxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZU1heFdvcmtlcnMobWF4V29ya2Vycykge1xuICBpZiAoIWlzTnVtYmVyKG1heFdvcmtlcnMpIHx8ICFpc0ludGVnZXIobWF4V29ya2VycykgfHwgbWF4V29ya2VycyA8IDEpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPcHRpb24gbWF4V29ya2VycyBtdXN0IGJlIGFuIGludGVnZXIgbnVtYmVyID49IDEnKTtcbiAgfVxufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IHRoZSBtaW5Xb3JrZXJzIG9wdGlvbiBpcyBhbiBpbnRlZ2VyID49IDBcbiAqIEBwYXJhbSB7Kn0gbWluV29ya2Vyc1xuICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybnMgdHJ1ZSB3aGVuIG1pbldvcmtlcnMgaGFzIGEgdmFsaWQgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVNaW5Xb3JrZXJzKG1pbldvcmtlcnMpIHtcbiAgaWYgKCFpc051bWJlcihtaW5Xb3JrZXJzKSB8fCAhaXNJbnRlZ2VyKG1pbldvcmtlcnMpIHx8IG1pbldvcmtlcnMgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIG1pbldvcmtlcnMgbXVzdCBiZSBhbiBpbnRlZ2VyIG51bWJlciA+PSAwJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSB2YXJpYWJsZSBpcyBhIG51bWJlclxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybnMgdHJ1ZSB3aGVuIHZhbHVlIGlzIGEgbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIG51bWJlciBpcyBhbiBpbnRlZ2VyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdmFsdWUgaXMgYW4gaW50ZWdlclxuICovXG5mdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUpID09IHZhbHVlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBQb29sO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gMjE5OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG4vKipcbiAqIFByb21pc2VcbiAqXG4gKiBJbnNwaXJlZCBieSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9SdWJhWGEvODUwMTM1OSBmcm9tIFJ1YmFYYSA8dHJhc2hAcnViYXhhLm9yZz5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyICAgQ2FsbGVkIGFzIGhhbmRsZXIocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pXG4gKiBAcGFyYW0ge1Byb21pc2V9IFtwYXJlbnRdICAgUGFyZW50IHByb21pc2UgZm9yIHByb3BhZ2F0aW9uIG9mIGNhbmNlbCBhbmQgdGltZW91dFxuICovXG5mdW5jdGlvbiBQcm9taXNlKGhhbmRsZXIsIHBhcmVudCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0NvbnN0cnVjdG9yIG11c3QgYmUgY2FsbGVkIHdpdGggdGhlIG5ldyBvcGVyYXRvcicpO1xuICB9XG4gIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignRnVuY3Rpb24gcGFyYW1ldGVyIGhhbmRsZXIocmVzb2x2ZSwgcmVqZWN0KSBtaXNzaW5nJyk7XG4gIH1cbiAgdmFyIF9vblN1Y2Nlc3MgPSBbXTtcbiAgdmFyIF9vbkZhaWwgPSBbXTtcblxuICAvLyBzdGF0dXNcbiAgdGhpcy5yZXNvbHZlZCA9IGZhbHNlO1xuICB0aGlzLnJlamVjdGVkID0gZmFsc2U7XG4gIHRoaXMucGVuZGluZyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgb25TdWNjZXNzIGFuZCBvbkZhaWwgY2FsbGJhY2tzOiBhZGQgdGhlbSB0byB0aGUgcXVldWUuXG4gICAqIE9uY2UgdGhlIHByb21pc2UgaXMgcmVzb2x2ZSwgdGhlIGZ1bmN0aW9uIF9wcm9taXNlIGlzIHJlcGxhY2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZhaWxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciBfcHJvY2VzcyA9IGZ1bmN0aW9uIF9wcm9jZXNzKG9uU3VjY2Vzcywgb25GYWlsKSB7XG4gICAgX29uU3VjY2Vzcy5wdXNoKG9uU3VjY2Vzcyk7XG4gICAgX29uRmFpbC5wdXNoKG9uRmFpbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBvblN1Y2Nlc3MgY2FsbGJhY2sgYW5kIG9wdGlvbmFsbHkgYW4gb25GYWlsIGNhbGxiYWNrIHRvIHRoZSBQcm9taXNlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uU3VjY2Vzc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25GYWlsXVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZVxuICAgKi9cbiAgdGhpcy50aGVuID0gZnVuY3Rpb24gKG9uU3VjY2Vzcywgb25GYWlsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBzID0gb25TdWNjZXNzID8gX3RoZW4ob25TdWNjZXNzLCByZXNvbHZlLCByZWplY3QpIDogcmVzb2x2ZTtcbiAgICAgIHZhciBmID0gb25GYWlsID8gX3RoZW4ob25GYWlsLCByZXNvbHZlLCByZWplY3QpIDogcmVqZWN0O1xuICAgICAgX3Byb2Nlc3MocywgZik7XG4gICAgfSwgbWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXNvbHZlIHRoZSBwcm9taXNlXG4gICAqIEBwYXJhbSB7Kn0gcmVzdWx0XG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIHZhciBfcmVzb2x2ZTIgPSBmdW5jdGlvbiBfcmVzb2x2ZShyZXN1bHQpIHtcbiAgICAvLyB1cGRhdGUgc3RhdHVzXG4gICAgbWUucmVzb2x2ZWQgPSB0cnVlO1xuICAgIG1lLnJlamVjdGVkID0gZmFsc2U7XG4gICAgbWUucGVuZGluZyA9IGZhbHNlO1xuICAgIF9vblN1Y2Nlc3MuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGZuKHJlc3VsdCk7XG4gICAgfSk7XG4gICAgX3Byb2Nlc3MgPSBmdW5jdGlvbiBfcHJvY2VzcyhvblN1Y2Nlc3MsIG9uRmFpbCkge1xuICAgICAgb25TdWNjZXNzKHJlc3VsdCk7XG4gICAgfTtcbiAgICBfcmVzb2x2ZTIgPSBfcmVqZWN0MiA9IGZ1bmN0aW9uIF9yZWplY3QoKSB7fTtcbiAgICByZXR1cm4gbWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlamVjdCB0aGUgcHJvbWlzZVxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICB2YXIgX3JlamVjdDIgPSBmdW5jdGlvbiBfcmVqZWN0KGVycm9yKSB7XG4gICAgLy8gdXBkYXRlIHN0YXR1c1xuICAgIG1lLnJlc29sdmVkID0gZmFsc2U7XG4gICAgbWUucmVqZWN0ZWQgPSB0cnVlO1xuICAgIG1lLnBlbmRpbmcgPSBmYWxzZTtcbiAgICBfb25GYWlsLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICBmbihlcnJvcik7XG4gICAgfSk7XG4gICAgX3Byb2Nlc3MgPSBmdW5jdGlvbiBfcHJvY2VzcyhvblN1Y2Nlc3MsIG9uRmFpbCkge1xuICAgICAgb25GYWlsKGVycm9yKTtcbiAgICB9O1xuICAgIF9yZXNvbHZlMiA9IF9yZWplY3QyID0gZnVuY3Rpb24gX3JlamVjdCgpIHt9O1xuICAgIHJldHVybiBtZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FuY2VsIHRlIHByb21pc2UuIFRoaXMgd2lsbCByZWplY3QgdGhlIHByb21pc2Ugd2l0aCBhIENhbmNlbGxhdGlvbkVycm9yXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBzZWxmXG4gICAqL1xuICB0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuY2FuY2VsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9yZWplY3QyKG5ldyBDYW5jZWxsYXRpb25FcnJvcigpKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgYSB0aW1lb3V0IGZvciB0aGUgcHJvbWlzZS4gSWYgdGhlIHByb21pc2UgaXMgbm90IHJlc29sdmVkIHdpdGhpblxuICAgKiB0aGUgdGltZSwgdGhlIHByb21pc2Ugd2lsbCBiZSBjYW5jZWxsZWQgYW5kIGEgVGltZW91dEVycm9yIGlzIHRocm93bi5cbiAgICogSWYgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgaW4gdGltZSwgdGhlIHRpbWVvdXQgaXMgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5ICAgICBEZWxheSBpbiBtaWxsaXNlY29uZHNcbiAgICogQHJldHVybnMge1Byb21pc2V9IHNlbGZcbiAgICovXG4gIHRoaXMudGltZW91dCA9IGZ1bmN0aW9uIChkZWxheSkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC50aW1lb3V0KGRlbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9yZWplY3QyKG5ldyBUaW1lb3V0RXJyb3IoJ1Byb21pc2UgdGltZWQgb3V0IGFmdGVyICcgKyBkZWxheSArICcgbXMnKSk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgICBtZS5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtZTtcbiAgfTtcblxuICAvLyBhdHRhY2ggaGFuZGxlciBwYXNzaW5nIHRoZSByZXNvbHZlIGFuZCByZWplY3QgZnVuY3Rpb25zXG4gIGhhbmRsZXIoZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIF9yZXNvbHZlMihyZXN1bHQpO1xuICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBfcmVqZWN0MihlcnJvcik7XG4gIH0pO1xufVxuXG4vKipcbiAqIEV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2ssIHRoZW4gY2FsbCByZXNvbHZlL3JlamVjdCBiYXNlZCBvbiB0aGUgcmV0dXJuZWQgcmVzdWx0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfdGhlbihjYWxsYmFjaywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXMgPSBjYWxsYmFjayhyZXN1bHQpO1xuICAgICAgaWYgKHJlcyAmJiB0eXBlb2YgcmVzLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHJlc1snY2F0Y2gnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBtZXRob2QgcmV0dXJuZWQgYSBwcm9taXNlXG4gICAgICAgIHJlcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEFkZCBhbiBvbkZhaWwgY2FsbGJhY2sgdG8gdGhlIFByb21pc2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRmFpbFxuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2VcbiAqL1xuUHJvbWlzZS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbiAob25GYWlsKSB7XG4gIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25GYWlsKTtcbn07XG5cbi8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBQcm9taXNlLmNhdGNoKEVycm9yLCBjYWxsYmFjaylcbi8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBQcm9taXNlLmNhdGNoKEVycm9yLCBFcnJvciwgY2FsbGJhY2spXG5cbi8qKlxuICogRXhlY3V0ZSBnaXZlbiBjYWxsYmFjayB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlXG4gKi9cblByb21pc2UucHJvdG90eXBlLmFsd2F5cyA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gdGhpcy50aGVuKGZuLCBmbik7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiBhbGwgcHJvdmlkZWQgcHJvbWlzZXMgYXJlIHJlc29sdmVkLFxuICogYW5kIGZhaWxzIHdoZW4gYW55IG9mIHRoZSBwcm9taXNlcyByZXNvbHZlcy5cbiAqIEBwYXJhbSB7UHJvbWlzZVtdfSBwcm9taXNlc1xuICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2VcbiAqL1xuUHJvbWlzZS5hbGwgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVtYWluaW5nID0gcHJvbWlzZXMubGVuZ3RoLFxuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgIGlmIChyZW1haW5pbmcpIHtcbiAgICAgIHByb21pc2VzLmZvckVhY2goZnVuY3Rpb24gKHAsIGkpIHtcbiAgICAgICAgcC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHRzW2ldID0gcmVzdWx0O1xuICAgICAgICAgIHJlbWFpbmluZy0tO1xuICAgICAgICAgIGlmIChyZW1haW5pbmcgPT0gMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJlbWFpbmluZyA9IDA7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBwcm9taXNlIHJlc29sdmVyXG4gKiBAcmV0dXJucyB7e3Byb21pc2U6IFByb21pc2UsIHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9ufX0gcmVzb2x2ZXJcbiAqL1xuUHJvbWlzZS5kZWZlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlc29sdmVyID0ge307XG4gIHJlc29sdmVyLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVzb2x2ZXIucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgcmVzb2x2ZXIucmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcbiAgcmV0dXJuIHJlc29sdmVyO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBjYW5jZWxsYXRpb24gZXJyb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWVzc2FnZV1cbiAqIEBleHRlbmRzIEVycm9yXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGxhdGlvbkVycm9yKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCAncHJvbWlzZSBjYW5jZWxsZWQnO1xuICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG59XG5DYW5jZWxsYXRpb25FcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbkNhbmNlbGxhdGlvbkVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVycm9yO1xuQ2FuY2VsbGF0aW9uRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnQ2FuY2VsbGF0aW9uRXJyb3InO1xuUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvciA9IENhbmNlbGxhdGlvbkVycm9yO1xuXG4vKipcbiAqIENyZWF0ZSBhIHRpbWVvdXQgZXJyb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWVzc2FnZV1cbiAqIEBleHRlbmRzIEVycm9yXG4gKi9cbmZ1bmN0aW9uIFRpbWVvdXRFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG59XG5UaW1lb3V0RXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5UaW1lb3V0RXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXJyb3I7XG5UaW1lb3V0RXJyb3IucHJvdG90eXBlLm5hbWUgPSAnVGltZW91dEVycm9yJztcblByb21pc2UuVGltZW91dEVycm9yID0gVGltZW91dEVycm9yO1xubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gNzUxOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdOyBpZiAoIWl0KSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307IHJldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH0sIGU6IGZ1bmN0aW9uIGUoX2UpIHsgdGhyb3cgX2U7IH0sIGY6IEYgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gdmFyIG5vcm1hbENvbXBsZXRpb24gPSB0cnVlLCBkaWRFcnIgPSBmYWxzZSwgZXJyOyByZXR1cm4geyBzOiBmdW5jdGlvbiBzKCkgeyBpdCA9IGl0LmNhbGwobyk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbXCJyZXR1cm5cIl0gIT0gbnVsbCkgaXRbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKGRpZEVycikgdGhyb3cgZXJyOyB9IH0gfTsgfVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgeyB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOyBlbnVtZXJhYmxlT25seSAmJiAoc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7IH0pKSwga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOyB9IHJldHVybiBrZXlzOyB9XG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gbnVsbCAhPSBhcmd1bWVudHNbaV0gPyBhcmd1bWVudHNbaV0gOiB7fTsgaSAlIDIgPyBvd25LZXlzKE9iamVjdChzb3VyY2UpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKSA6IG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cbnZhciBQcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMTkpO1xudmFyIGVudmlyb25tZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MjgpO1xudmFyIHJlcXVpcmVGb29sV2VicGFjayA9IF9fd2VicGFja19yZXF1aXJlX18oMzk3KTtcblxuLyoqXG4gKiBTcGVjaWFsIG1lc3NhZ2Ugc2VudCBieSBwYXJlbnQgd2hpY2ggY2F1c2VzIGEgY2hpbGQgcHJvY2VzcyB3b3JrZXIgdG8gdGVybWluYXRlIGl0c2VsZi5cbiAqIE5vdCBhIFwibWVzc2FnZSBvYmplY3RcIjsgdGhpcyBzdHJpbmcgaXMgdGhlIGVudGlyZSBtZXNzYWdlLlxuICovXG52YXIgVEVSTUlOQVRFX01FVEhPRF9JRCA9ICdfX3dvcmtlcnBvb2wtdGVybWluYXRlX18nO1xuXG4vKipcbiAqIElmIHNlbmRpbmcgYFRFUk1JTkFURV9NRVRIT0RfSURgIGRvZXMgbm90IGNhdXNlIHRoZSBjaGlsZCBwcm9jZXNzIHRvIGV4aXQgaW4gdGhpcyBtYW55IG1pbGxpc2Vjb25kcyxcbiAqIGZvcmNlLWtpbGwgdGhlIGNoaWxkIHByb2Nlc3MuXG4gKi9cbnZhciBDSElMRF9QUk9DRVNTX0VYSVRfVElNRU9VVCA9IDEwMDA7XG5mdW5jdGlvbiBlbnN1cmVXb3JrZXJUaHJlYWRzKCkge1xuICB2YXIgV29ya2VyVGhyZWFkcyA9IHRyeVJlcXVpcmVXb3JrZXJUaHJlYWRzKCk7XG4gIGlmICghV29ya2VyVGhyZWFkcykge1xuICAgIHRocm93IG5ldyBFcnJvcignV29ya2VyUG9vbDogd29ya2VyVHlwZSA9IFxcJ3RocmVhZFxcJyBpcyBub3Qgc3VwcG9ydGVkLCBOb2RlID49IDExLjcuMCByZXF1aXJlZCcpO1xuICB9XG4gIHJldHVybiBXb3JrZXJUaHJlYWRzO1xufVxuXG4vLyBjaGVjayB3aGV0aGVyIFdvcmtlciBpcyBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXJcbmZ1bmN0aW9uIGVuc3VyZVdlYldvcmtlcigpIHtcbiAgLy8gV29ya2Fyb3VuZCBmb3IgYSBidWcgaW4gUGhhbnRvbUpTIChPciBRdFdlYmtpdCk6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzE0NTM0XG4gIGlmICh0eXBlb2YgV29ya2VyICE9PSAnZnVuY3Rpb24nICYmICgodHlwZW9mIFdvcmtlciA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKFdvcmtlcikpICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgV29ya2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtlclBvb2w6IFdlYiBXb3JrZXJzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfVxufVxuZnVuY3Rpb24gdHJ5UmVxdWlyZVdvcmtlclRocmVhZHMoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlcXVpcmVGb29sV2VicGFjaygnd29ya2VyX3RocmVhZHMnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoX3R5cGVvZihlcnJvcikgPT09ICdvYmplY3QnICYmIGVycm9yICE9PSBudWxsICYmIGVycm9yLmNvZGUgPT09ICdNT0RVTEVfTk9UX0ZPVU5EJykge1xuICAgICAgLy8gbm8gd29ya2VyX3RocmVhZHMgYXZhaWxhYmxlIChvbGQgdmVyc2lvbiBvZiBub2RlLmpzKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuXG4vLyBnZXQgdGhlIGRlZmF1bHQgd29ya2VyIHNjcmlwdFxuZnVuY3Rpb24gZ2V0RGVmYXVsdFdvcmtlcigpIHtcbiAgaWYgKGVudmlyb25tZW50LnBsYXRmb3JtID09PSAnYnJvd3NlcicpIHtcbiAgICAvLyB0ZXN0IHdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYWxsIGZlYXR1cmVzIHRoYXQgd2UgbmVlZFxuICAgIGlmICh0eXBlb2YgQmxvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmxvYiBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyJyk7XG4gICAgfVxuICAgIGlmICghd2luZG93LlVSTCB8fCB0eXBlb2Ygd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVVJMLmNyZWF0ZU9iamVjdFVSTCBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyJyk7XG4gICAgfVxuXG4gICAgLy8gdXNlIGVtYmVkZGVkIHdvcmtlci5qc1xuICAgIHZhciBibG9iID0gbmV3IEJsb2IoW19fd2VicGFja19yZXF1aXJlX18oNjcwKV0sIHtcbiAgICAgIHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgfSk7XG4gICAgcmV0dXJuIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBleHRlcm5hbCB3b3JrZXIuanMgaW4gY3VycmVudCBkaXJlY3RvcnlcbiAgICByZXR1cm4gX19kaXJuYW1lICsgJy93b3JrZXIuanMnO1xuICB9XG59XG5mdW5jdGlvbiBzZXR1cFdvcmtlcihzY3JpcHQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMud29ya2VyVHlwZSA9PT0gJ3dlYicpIHtcbiAgICAvLyBicm93c2VyIG9ubHlcbiAgICBlbnN1cmVXZWJXb3JrZXIoKTtcbiAgICByZXR1cm4gc2V0dXBCcm93c2VyV29ya2VyKHNjcmlwdCwgV29ya2VyKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLndvcmtlclR5cGUgPT09ICd0aHJlYWQnKSB7XG4gICAgLy8gbm9kZS5qcyBvbmx5XG4gICAgV29ya2VyVGhyZWFkcyA9IGVuc3VyZVdvcmtlclRocmVhZHMoKTtcbiAgICByZXR1cm4gc2V0dXBXb3JrZXJUaHJlYWRXb3JrZXIoc2NyaXB0LCBXb3JrZXJUaHJlYWRzLCBvcHRpb25zLndvcmtlclRocmVhZE9wdHMpO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMud29ya2VyVHlwZSA9PT0gJ3Byb2Nlc3MnIHx8ICFvcHRpb25zLndvcmtlclR5cGUpIHtcbiAgICAvLyBub2RlLmpzIG9ubHlcbiAgICByZXR1cm4gc2V0dXBQcm9jZXNzV29ya2VyKHNjcmlwdCwgcmVzb2x2ZUZvcmtPcHRpb25zKG9wdGlvbnMpLCByZXF1aXJlRm9vbFdlYnBhY2soJ2NoaWxkX3Byb2Nlc3MnKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gb3B0aW9ucy53b3JrZXJUeXBlID09PSAnYXV0bycgb3IgdW5kZWZpbmVkXG4gICAgaWYgKGVudmlyb25tZW50LnBsYXRmb3JtID09PSAnYnJvd3NlcicpIHtcbiAgICAgIGVuc3VyZVdlYldvcmtlcigpO1xuICAgICAgcmV0dXJuIHNldHVwQnJvd3NlcldvcmtlcihzY3JpcHQsIFdvcmtlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVudmlyb25tZW50LnBsYXRmb3JtID09PSAnbm9kZSdcbiAgICAgIHZhciBXb3JrZXJUaHJlYWRzID0gdHJ5UmVxdWlyZVdvcmtlclRocmVhZHMoKTtcbiAgICAgIGlmIChXb3JrZXJUaHJlYWRzKSB7XG4gICAgICAgIHJldHVybiBzZXR1cFdvcmtlclRocmVhZFdvcmtlcihzY3JpcHQsIFdvcmtlclRocmVhZHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldHVwUHJvY2Vzc1dvcmtlcihzY3JpcHQsIHJlc29sdmVGb3JrT3B0aW9ucyhvcHRpb25zKSwgcmVxdWlyZUZvb2xXZWJwYWNrKCdjaGlsZF9wcm9jZXNzJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gc2V0dXBCcm93c2VyV29ya2VyKHNjcmlwdCwgV29ya2VyKSB7XG4gIC8vIGNyZWF0ZSB0aGUgd2ViIHdvcmtlclxuICB2YXIgd29ya2VyID0gbmV3IFdvcmtlcihzY3JpcHQpO1xuICB3b3JrZXIuaXNCcm93c2VyV29ya2VyID0gdHJ1ZTtcbiAgLy8gYWRkIG5vZGUuanMgQVBJIHRvIHRoZSB3ZWIgd29ya2VyXG4gIHdvcmtlci5vbiA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBjYWxsYmFjayhtZXNzYWdlLmRhdGEpO1xuICAgIH0pO1xuICB9O1xuICB3b3JrZXIuc2VuZCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfTtcbiAgcmV0dXJuIHdvcmtlcjtcbn1cbmZ1bmN0aW9uIHNldHVwV29ya2VyVGhyZWFkV29ya2VyKHNjcmlwdCwgV29ya2VyVGhyZWFkcywgd29ya2VyVGhyZWFkT3B0aW9ucykge1xuICB2YXIgd29ya2VyID0gbmV3IFdvcmtlclRocmVhZHMuV29ya2VyKHNjcmlwdCwgX29iamVjdFNwcmVhZCh7XG4gICAgc3Rkb3V0OiBmYWxzZSxcbiAgICAvLyBhdXRvbWF0aWNhbGx5IHBpcGUgd29ya2VyLlNURE9VVCB0byBwcm9jZXNzLlNURE9VVFxuICAgIHN0ZGVycjogZmFsc2VcbiAgfSwgd29ya2VyVGhyZWFkT3B0aW9ucykpO1xuICB3b3JrZXIuaXNXb3JrZXJUaHJlYWQgPSB0cnVlO1xuICAvLyBtYWtlIHRoZSB3b3JrZXIgbWltaWMgYSBjaGlsZF9wcm9jZXNzXG4gIHdvcmtlci5zZW5kID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICB0aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9O1xuICB3b3JrZXIua2lsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRlcm1pbmF0ZSgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICB3b3JrZXIuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRlcm1pbmF0ZSgpO1xuICB9O1xuICByZXR1cm4gd29ya2VyO1xufVxuZnVuY3Rpb24gc2V0dXBQcm9jZXNzV29ya2VyKHNjcmlwdCwgb3B0aW9ucywgY2hpbGRfcHJvY2Vzcykge1xuICAvLyBubyBXb3JrZXJUaHJlYWRzLCBmYWxsYmFjayB0byBzdWItcHJvY2VzcyBiYXNlZCB3b3JrZXJzXG4gIHZhciB3b3JrZXIgPSBjaGlsZF9wcm9jZXNzLmZvcmsoc2NyaXB0LCBvcHRpb25zLmZvcmtBcmdzLCBvcHRpb25zLmZvcmtPcHRzKTtcbiAgd29ya2VyLmlzQ2hpbGRQcm9jZXNzID0gdHJ1ZTtcbiAgcmV0dXJuIHdvcmtlcjtcbn1cblxuLy8gYWRkIGRlYnVnIGZsYWdzIHRvIGNoaWxkIHByb2Nlc3NlcyBpZiB0aGUgbm9kZSBpbnNwZWN0b3IgaXMgYWN0aXZlXG5mdW5jdGlvbiByZXNvbHZlRm9ya09wdGlvbnMob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdmFyIHByb2Nlc3NFeGVjQXJndiA9IHByb2Nlc3MuZXhlY0FyZ3Yuam9pbignICcpO1xuICB2YXIgaW5zcGVjdG9yQWN0aXZlID0gcHJvY2Vzc0V4ZWNBcmd2LmluZGV4T2YoJy0taW5zcGVjdCcpICE9PSAtMTtcbiAgdmFyIGRlYnVnQnJrID0gcHJvY2Vzc0V4ZWNBcmd2LmluZGV4T2YoJy0tZGVidWctYnJrJykgIT09IC0xO1xuICB2YXIgZXhlY0FyZ3YgPSBbXTtcbiAgaWYgKGluc3BlY3RvckFjdGl2ZSkge1xuICAgIGV4ZWNBcmd2LnB1c2goJy0taW5zcGVjdD0nICsgb3B0cy5kZWJ1Z1BvcnQpO1xuICAgIGlmIChkZWJ1Z0Jyaykge1xuICAgICAgZXhlY0FyZ3YucHVzaCgnLS1kZWJ1Zy1icmsnKTtcbiAgICB9XG4gIH1cbiAgcHJvY2Vzcy5leGVjQXJndi5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAoYXJnLmluZGV4T2YoJy0tbWF4LW9sZC1zcGFjZS1zaXplJykgPiAtMSkge1xuICAgICAgZXhlY0FyZ3YucHVzaChhcmcpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvcHRzLCB7XG4gICAgZm9ya0FyZ3M6IG9wdHMuZm9ya0FyZ3MsXG4gICAgZm9ya09wdHM6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMuZm9ya09wdHMsIHtcbiAgICAgIGV4ZWNBcmd2OiAob3B0cy5mb3JrT3B0cyAmJiBvcHRzLmZvcmtPcHRzLmV4ZWNBcmd2IHx8IFtdKS5jb25jYXQoZXhlY0FyZ3YpXG4gICAgfSlcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBzZXJpYWxpemVkIGVycm9yIHRvIEVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEVycm9yIHRoYXQgaGFzIGJlZW4gc2VyaWFsaXplZCBhbmQgcGFyc2VkIHRvIG9iamVjdFxuICogQHJldHVybiB7RXJyb3J9IFRoZSBlcXVpdmFsZW50IEVycm9yLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb0Vycm9yKG9iaikge1xuICB2YXIgdGVtcCA9IG5ldyBFcnJvcignJyk7XG4gIHZhciBwcm9wcyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB0ZW1wW3Byb3BzW2ldXSA9IG9ialtwcm9wc1tpXV07XG4gIH1cbiAgcmV0dXJuIHRlbXA7XG59XG5cbi8qKlxuICogQSBXb3JrZXJIYW5kbGVyIGNvbnRyb2xzIGEgc2luZ2xlIHdvcmtlci4gVGhpcyB3b3JrZXIgY2FuIGJlIGEgY2hpbGQgcHJvY2Vzc1xuICogb24gbm9kZS5qcyBvciBhIFdlYldvcmtlciBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gW3NjcmlwdF0gSWYgbm8gc2NyaXB0IGlzIHByb3ZpZGVkLCBhIGRlZmF1bHQgd29ya2VyIHdpdGggYVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJ1biB3aWxsIGJlIGNyZWF0ZWQuXG4gKiBAcGFyYW0ge1dvcmtlclBvb2xPcHRpb25zfSBfb3B0aW9ucyBTZWUgZG9jc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFdvcmtlckhhbmRsZXIoc2NyaXB0LCBfb3B0aW9ucykge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9O1xuICB0aGlzLnNjcmlwdCA9IHNjcmlwdCB8fCBnZXREZWZhdWx0V29ya2VyKCk7XG4gIHRoaXMud29ya2VyID0gc2V0dXBXb3JrZXIodGhpcy5zY3JpcHQsIG9wdGlvbnMpO1xuICB0aGlzLmRlYnVnUG9ydCA9IG9wdGlvbnMuZGVidWdQb3J0O1xuICB0aGlzLmZvcmtPcHRzID0gb3B0aW9ucy5mb3JrT3B0cztcbiAgdGhpcy5mb3JrQXJncyA9IG9wdGlvbnMuZm9ya0FyZ3M7XG4gIHRoaXMud29ya2VyVGhyZWFkT3B0cyA9IG9wdGlvbnMud29ya2VyVGhyZWFkT3B0cztcblxuICAvLyBUaGUgcmVhZHkgbWVzc2FnZSBpcyBvbmx5IHNlbnQgaWYgdGhlIHdvcmtlci5hZGQgbWV0aG9kIGlzIGNhbGxlZCAoQW5kIHRoZSBkZWZhdWx0IHNjcmlwdCBpcyBub3QgdXNlZClcbiAgaWYgKCFzY3JpcHQpIHtcbiAgICB0aGlzLndvcmtlci5yZWFkeSA9IHRydWU7XG4gIH1cblxuICAvLyBxdWV1ZSBmb3IgcmVxdWVzdHMgdGhhdCBhcmUgcmVjZWl2ZWQgYmVmb3JlIHRoZSB3b3JrZXIgaXMgcmVhZHlcbiAgdGhpcy5yZXF1ZXN0UXVldWUgPSBbXTtcbiAgdGhpcy53b3JrZXIub24oJ21lc3NhZ2UnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBpZiAobWUudGVybWluYXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJyAmJiByZXNwb25zZSA9PT0gJ3JlYWR5Jykge1xuICAgICAgbWUud29ya2VyLnJlYWR5ID0gdHJ1ZTtcbiAgICAgIGRpc3BhdGNoUXVldWVkUmVxdWVzdHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmluZCB0aGUgdGFzayBmcm9tIHRoZSBwcm9jZXNzaW5nIHF1ZXVlLCBhbmQgcnVuIHRoZSB0YXNrcyBjYWxsYmFja1xuICAgICAgdmFyIGlkID0gcmVzcG9uc2UuaWQ7XG4gICAgICB2YXIgdGFzayA9IG1lLnByb2Nlc3NpbmdbaWRdO1xuICAgICAgaWYgKHRhc2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocmVzcG9uc2UuaXNFdmVudCkge1xuICAgICAgICAgIGlmICh0YXNrLm9wdGlvbnMgJiYgdHlwZW9mIHRhc2sub3B0aW9ucy5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGFzay5vcHRpb25zLm9uKHJlc3BvbnNlLnBheWxvYWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIHRhc2sgZnJvbSB0aGUgcXVldWVcbiAgICAgICAgICBkZWxldGUgbWUucHJvY2Vzc2luZ1tpZF07XG5cbiAgICAgICAgICAvLyB0ZXN0IGlmIHdlIG5lZWQgdG8gdGVybWluYXRlXG4gICAgICAgICAgaWYgKG1lLnRlcm1pbmF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBjb21wbGV0ZSB3b3JrZXIgdGVybWluYXRpb24gaWYgYWxsIHRhc2tzIGFyZSBmaW5pc2hlZFxuICAgICAgICAgICAgbWUudGVybWluYXRlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVzb2x2ZSB0aGUgdGFzaydzIHByb21pc2VcbiAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIHRhc2sucmVzb2x2ZXIucmVqZWN0KG9iamVjdFRvRXJyb3IocmVzcG9uc2UuZXJyb3IpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFzay5yZXNvbHZlci5yZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyByZWplY3QgYWxsIHJ1bm5pbmcgdGFza3Mgb24gd29ya2VyIGVycm9yXG4gIGZ1bmN0aW9uIG9uRXJyb3IoZXJyb3IpIHtcbiAgICBtZS50ZXJtaW5hdGVkID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBpZCBpbiBtZS5wcm9jZXNzaW5nKSB7XG4gICAgICBpZiAobWUucHJvY2Vzc2luZ1tpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBtZS5wcm9jZXNzaW5nW2lkXS5yZXNvbHZlci5yZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICBtZS5wcm9jZXNzaW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIC8vIHNlbmQgYWxsIHF1ZXVlZCByZXF1ZXN0cyB0byB3b3JrZXJcbiAgZnVuY3Rpb24gZGlzcGF0Y2hRdWV1ZWRSZXF1ZXN0cygpIHtcbiAgICB2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobWUucmVxdWVzdFF1ZXVlLnNwbGljZSgwKSksXG4gICAgICBfc3RlcDtcbiAgICB0cnkge1xuICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgbWUud29ya2VyLnNlbmQocmVxdWVzdCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfaXRlcmF0b3IuZShlcnIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBfaXRlcmF0b3IuZigpO1xuICAgIH1cbiAgfVxuICB2YXIgd29ya2VyID0gdGhpcy53b3JrZXI7XG4gIC8vIGxpc3RlbiBmb3Igd29ya2VyIG1lc3NhZ2VzIGVycm9yIGFuZCBleGl0XG4gIHRoaXMud29ya2VyLm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICB0aGlzLndvcmtlci5vbignZXhpdCcsIGZ1bmN0aW9uIChleGl0Q29kZSwgc2lnbmFsQ29kZSkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dvcmtlcnBvb2wgV29ya2VyIHRlcm1pbmF0ZWQgVW5leHBlY3RlZGx5XFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgZXhpdENvZGU6IGAnICsgZXhpdENvZGUgKyAnYFxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIHNpZ25hbENvZGU6IGAnICsgc2lnbmFsQ29kZSArICdgXFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgd29ya2VycG9vbC5zY3JpcHQ6IGAnICsgbWUuc2NyaXB0ICsgJ2BcXG4nO1xuICAgIG1lc3NhZ2UgKz0gJyAgICBzcGF3bkFyZ3M6IGAnICsgd29ya2VyLnNwYXduYXJncyArICdgXFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgc3Bhd25maWxlOiBgJyArIHdvcmtlci5zcGF3bmZpbGUgKyAnYFxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIHN0ZG91dDogYCcgKyB3b3JrZXIuc3Rkb3V0ICsgJ2BcXG4nO1xuICAgIG1lc3NhZ2UgKz0gJyAgICBzdGRlcnI6IGAnICsgd29ya2VyLnN0ZGVyciArICdgXFxuJztcbiAgICBvbkVycm9yKG5ldyBFcnJvcihtZXNzYWdlKSk7XG4gIH0pO1xuICB0aGlzLnByb2Nlc3NpbmcgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBxdWV1ZSB3aXRoIHRhc2tzIGN1cnJlbnRseSBpbiBwcm9ncmVzc1xuXG4gIHRoaXMudGVybWluYXRpbmcgPSBmYWxzZTtcbiAgdGhpcy50ZXJtaW5hdGVkID0gZmFsc2U7XG4gIHRoaXMudGVybWluYXRpb25IYW5kbGVyID0gbnVsbDtcbiAgdGhpcy5sYXN0SWQgPSAwO1xufVxuXG4vKipcbiAqIEdldCBhIGxpc3Qgd2l0aCBtZXRob2RzIGF2YWlsYWJsZSBvbiB0aGUgd29ya2VyLlxuICogQHJldHVybiB7UHJvbWlzZS48U3RyaW5nW10sIEVycm9yPn0gbWV0aG9kc1xuICovXG5Xb3JrZXJIYW5kbGVyLnByb3RvdHlwZS5tZXRob2RzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5leGVjKCdtZXRob2RzJyk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGUgYSBtZXRob2Qgd2l0aCBnaXZlbiBwYXJhbWV0ZXJzIG9uIHRoZSB3b3JrZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7QXJyYXl9IFtwYXJhbXNdXG4gKiBAcGFyYW0ge3tyZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbn19IFtyZXNvbHZlcl1cbiAqIEBwYXJhbSB7RXhlY09wdGlvbnN9ICBbb3B0aW9uc11cbiAqIEByZXR1cm4ge1Byb21pc2UuPCosIEVycm9yPn0gcmVzdWx0XG4gKi9cbldvcmtlckhhbmRsZXIucHJvdG90eXBlLmV4ZWMgPSBmdW5jdGlvbiAobWV0aG9kLCBwYXJhbXMsIHJlc29sdmVyLCBvcHRpb25zKSB7XG4gIGlmICghcmVzb2x2ZXIpIHtcbiAgICByZXNvbHZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgfVxuXG4gIC8vIGdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciB0aGUgdGFza1xuICB2YXIgaWQgPSArK3RoaXMubGFzdElkO1xuXG4gIC8vIHJlZ2lzdGVyIGEgbmV3IHRhc2sgYXMgYmVpbmcgaW4gcHJvZ3Jlc3NcbiAgdGhpcy5wcm9jZXNzaW5nW2lkXSA9IHtcbiAgICBpZDogaWQsXG4gICAgcmVzb2x2ZXI6IHJlc29sdmVyLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcblxuICAvLyBidWlsZCBhIEpTT04tUlBDIHJlcXVlc3RcbiAgdmFyIHJlcXVlc3QgPSB7XG4gICAgaWQ6IGlkLFxuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIHBhcmFtczogcGFyYW1zXG4gIH07XG4gIGlmICh0aGlzLnRlcm1pbmF0ZWQpIHtcbiAgICByZXNvbHZlci5yZWplY3QobmV3IEVycm9yKCdXb3JrZXIgaXMgdGVybWluYXRlZCcpKTtcbiAgfSBlbHNlIGlmICh0aGlzLndvcmtlci5yZWFkeSkge1xuICAgIC8vIHNlbmQgdGhlIHJlcXVlc3QgdG8gdGhlIHdvcmtlclxuICAgIHRoaXMud29ya2VyLnNlbmQocmVxdWVzdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yZXF1ZXN0UXVldWUucHVzaChyZXF1ZXN0KTtcbiAgfVxuXG4gIC8vIG9uIGNhbmNlbGxhdGlvbiwgZm9yY2UgdGhlIHdvcmtlciB0byB0ZXJtaW5hdGVcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIHJlc29sdmVyLnByb21pc2VbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBQcm9taXNlLkNhbmNlbGxhdGlvbkVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgUHJvbWlzZS5UaW1lb3V0RXJyb3IpIHtcbiAgICAgIC8vIHJlbW92ZSB0aGlzIHRhc2sgZnJvbSB0aGUgcXVldWUuIEl0IGlzIGFscmVhZHkgcmVqZWN0ZWQgKGhlbmNlIHRoaXNcbiAgICAgIC8vIGNhdGNoIGV2ZW50KSwgYW5kIGVsc2UgaXQgd2lsbCBiZSByZWplY3RlZCBhZ2FpbiB3aGVuIHRlcm1pbmF0aW5nXG4gICAgICBkZWxldGUgbWUucHJvY2Vzc2luZ1tpZF07XG5cbiAgICAgIC8vIHRlcm1pbmF0ZSB3b3JrZXJcbiAgICAgIHJldHVybiBtZS50ZXJtaW5hdGVBbmROb3RpZnkodHJ1ZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIHRoZSB3b3JrZXIgaXMgd29ya2luZyBvciBub3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgd29ya2VyIGlzIGJ1c3lcbiAqL1xuV29ya2VySGFuZGxlci5wcm90b3R5cGUuYnVzeSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucHJvY2Vzc2luZykubGVuZ3RoID4gMDtcbn07XG5cbi8qKlxuICogVGVybWluYXRlIHRoZSB3b3JrZXIuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gICBJZiBmYWxzZSAoZGVmYXVsdCksIHRoZSB3b3JrZXIgaXMgdGVybWluYXRlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgZmluaXNoaW5nIGFsbCB0YXNrcyBjdXJyZW50bHkgaW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLiBJZiB0cnVlLCB0aGUgd29ya2VyIHdpbGwgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWQgaW1tZWRpYXRlbHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2s9bnVsbF0gSWYgcHJvdmlkZWQsIHdpbGwgYmUgY2FsbGVkIHdoZW4gcHJvY2VzcyB0ZXJtaW5hdGVzLlxuICovXG5Xb3JrZXJIYW5kbGVyLnByb3RvdHlwZS50ZXJtaW5hdGUgPSBmdW5jdGlvbiAoZm9yY2UsIGNhbGxiYWNrKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChmb3JjZSkge1xuICAgIC8vIGNhbmNlbCBhbGwgdGFza3MgaW4gcHJvZ3Jlc3NcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLnByb2Nlc3NpbmcpIHtcbiAgICAgIGlmICh0aGlzLnByb2Nlc3NpbmdbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzaW5nW2lkXS5yZXNvbHZlci5yZWplY3QobmV3IEVycm9yKCdXb3JrZXIgdGVybWluYXRlZCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5wcm9jZXNzaW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy50ZXJtaW5hdGlvbkhhbmRsZXIgPSBjYWxsYmFjaztcbiAgfVxuICBpZiAoIXRoaXMuYnVzeSgpKSB7XG4gICAgLy8gYWxsIHRhc2tzIGFyZSBmaW5pc2hlZC4ga2lsbCB0aGUgd29ya2VyXG4gICAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbiBjbGVhbnVwKGVycikge1xuICAgICAgbWUudGVybWluYXRlZCA9IHRydWU7XG4gICAgICBpZiAobWUud29ya2VyICE9IG51bGwgJiYgbWUud29ya2VyLnJlbW92ZUFsbExpc3RlbmVycykge1xuICAgICAgICAvLyByZW1vdmVBbGxMaXN0ZW5lcnMgaXMgb25seSBhdmFpbGFibGUgZm9yIGNoaWxkX3Byb2Nlc3NcbiAgICAgICAgbWUud29ya2VyLnJlbW92ZUFsbExpc3RlbmVycygnbWVzc2FnZScpO1xuICAgICAgfVxuICAgICAgbWUud29ya2VyID0gbnVsbDtcbiAgICAgIG1lLnRlcm1pbmF0aW5nID0gZmFsc2U7XG4gICAgICBpZiAobWUudGVybWluYXRpb25IYW5kbGVyKSB7XG4gICAgICAgIG1lLnRlcm1pbmF0aW9uSGFuZGxlcihlcnIsIG1lKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmICh0aGlzLndvcmtlcikge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLndvcmtlci5raWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh0aGlzLndvcmtlci5raWxsZWQpIHtcbiAgICAgICAgICBjbGVhbnVwKG5ldyBFcnJvcignd29ya2VyIGFscmVhZHkga2lsbGVkIScpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud29ya2VyLmlzQ2hpbGRQcm9jZXNzKSB7XG4gICAgICAgICAgdmFyIGNsZWFuRXhpdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChtZS53b3JrZXIpIHtcbiAgICAgICAgICAgICAgbWUud29ya2VyLmtpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBDSElMRF9QUk9DRVNTX0VYSVRfVElNRU9VVCk7XG4gICAgICAgICAgdGhpcy53b3JrZXIub25jZSgnZXhpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbGVhbkV4aXRUaW1lb3V0KTtcbiAgICAgICAgICAgIGlmIChtZS53b3JrZXIpIHtcbiAgICAgICAgICAgICAgbWUud29ya2VyLmtpbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHRoaXMud29ya2VyLnJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLndvcmtlci5zZW5kKFRFUk1JTkFURV9NRVRIT0RfSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RRdWV1ZS5wdXNoKFRFUk1JTkFURV9NRVRIT0RfSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3b3JrZXJfdGhyZWFkXG4gICAgICAgICAgdGhpcy53b3JrZXIua2lsbCgpO1xuICAgICAgICAgIHRoaXMud29ya2VyLmtpbGxlZCA9IHRydWU7XG4gICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMud29ya2VyLnRlcm1pbmF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLndvcmtlci50ZXJtaW5hdGUoKTsgLy8gd2ViIHdvcmtlclxuICAgICAgICB0aGlzLndvcmtlci5raWxsZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gdGVybWluYXRlIHdvcmtlcicpO1xuICAgICAgfVxuICAgIH1cbiAgICBjbGVhbnVwKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UgY2FuJ3QgdGVybWluYXRlIGltbWVkaWF0ZWx5LCB0aGVyZSBhcmUgc3RpbGwgdGFza3MgYmVpbmcgZXhlY3V0ZWRcbiAgICB0aGlzLnRlcm1pbmF0aW5nID0gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBUZXJtaW5hdGUgdGhlIHdvcmtlciwgcmV0dXJuaW5nIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRlcm1pbmF0aW9uIGhhcyBiZWVuIGRvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gICBJZiBmYWxzZSAoZGVmYXVsdCksIHRoZSB3b3JrZXIgaXMgdGVybWluYXRlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgZmluaXNoaW5nIGFsbCB0YXNrcyBjdXJyZW50bHkgaW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLiBJZiB0cnVlLCB0aGUgd29ya2VyIHdpbGwgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWQgaW1tZWRpYXRlbHkuXG4gKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdICAgICAgICBJZiBwcm92aWRlZCBhbmQgbm9uLXplcm8sIHdvcmtlciB0ZXJtaW5hdGlvbiBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIHRpbWVvdXQgaWYgd29ya2VyIHByb2Nlc3MgaGFzIG5vdCBiZWVuIHRlcm1pbmF0ZWQuXG4gKiBAcmV0dXJuIHtQcm9taXNlLjxXb3JrZXJIYW5kbGVyLCBFcnJvcj59XG4gKi9cbldvcmtlckhhbmRsZXIucHJvdG90eXBlLnRlcm1pbmF0ZUFuZE5vdGlmeSA9IGZ1bmN0aW9uIChmb3JjZSwgdGltZW91dCkge1xuICB2YXIgcmVzb2x2ZXIgPSBQcm9taXNlLmRlZmVyKCk7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgcmVzb2x2ZXIucHJvbWlzZS50aW1lb3V0ID0gdGltZW91dDtcbiAgfVxuICB0aGlzLnRlcm1pbmF0ZShmb3JjZSwgZnVuY3Rpb24gKGVyciwgd29ya2VyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmVzb2x2ZXIucmVqZWN0KGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmVyLnJlc29sdmUod29ya2VyKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzb2x2ZXIucHJvbWlzZTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtlckhhbmRsZXI7XG5tb2R1bGUuZXhwb3J0cy5fdHJ5UmVxdWlyZVdvcmtlclRocmVhZHMgPSB0cnlSZXF1aXJlV29ya2VyVGhyZWFkcztcbm1vZHVsZS5leHBvcnRzLl9zZXR1cFByb2Nlc3NXb3JrZXIgPSBzZXR1cFByb2Nlc3NXb3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5fc2V0dXBCcm93c2VyV29ya2VyID0gc2V0dXBCcm93c2VyV29ya2VyO1xubW9kdWxlLmV4cG9ydHMuX3NldHVwV29ya2VyVGhyZWFkV29ya2VyID0gc2V0dXBXb3JrZXJUaHJlYWRXb3JrZXI7XG5tb2R1bGUuZXhwb3J0cy5lbnN1cmVXb3JrZXJUaHJlYWRzID0gZW5zdXJlV29ya2VyVGhyZWFkcztcblxuLyoqKi8gfSksXG5cbi8qKiovIDgzMzpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIE1BWF9QT1JUUyA9IDY1NTM1O1xubW9kdWxlLmV4cG9ydHMgPSBEZWJ1Z1BvcnRBbGxvY2F0b3I7XG5mdW5jdGlvbiBEZWJ1Z1BvcnRBbGxvY2F0b3IoKSB7XG4gIHRoaXMucG9ydHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLmxlbmd0aCA9IDA7XG59XG5EZWJ1Z1BvcnRBbGxvY2F0b3IucHJvdG90eXBlLm5leHRBdmFpbGFibGVTdGFydGluZ0F0ID0gZnVuY3Rpb24gKHN0YXJ0aW5nKSB7XG4gIHdoaWxlICh0aGlzLnBvcnRzW3N0YXJ0aW5nXSA9PT0gdHJ1ZSkge1xuICAgIHN0YXJ0aW5nKys7XG4gIH1cbiAgaWYgKHN0YXJ0aW5nID49IE1BWF9QT1JUUykge1xuICAgIHRocm93IG5ldyBFcnJvcignV29ya2VyUG9vbCBkZWJ1ZyBwb3J0IGxpbWl0IHJlYWNoZWQ6ICcgKyBzdGFydGluZyArICc+PSAnICsgTUFYX1BPUlRTKTtcbiAgfVxuICB0aGlzLnBvcnRzW3N0YXJ0aW5nXSA9IHRydWU7XG4gIHRoaXMubGVuZ3RoKys7XG4gIHJldHVybiBzdGFydGluZztcbn07XG5EZWJ1Z1BvcnRBbGxvY2F0b3IucHJvdG90eXBlLnJlbGVhc2VQb3J0ID0gZnVuY3Rpb24gKHBvcnQpIHtcbiAgZGVsZXRlIHRoaXMucG9ydHNbcG9ydF07XG4gIHRoaXMubGVuZ3RoLS07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gODI4OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciByZXF1aXJlRm9vbFdlYnBhY2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5Nyk7XG5cbi8vIHNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL2ZsZXhkaW5lc2gvYnJvd3Nlci1vci1ub2RlXG52YXIgaXNOb2RlID0gZnVuY3Rpb24gaXNOb2RlKG5vZGVQcm9jZXNzKSB7XG4gIHJldHVybiB0eXBlb2Ygbm9kZVByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIG5vZGVQcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiYgbm9kZVByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsO1xufTtcbm1vZHVsZS5leHBvcnRzLmlzTm9kZSA9IGlzTm9kZTtcblxuLy8gZGV0ZXJtaW5lcyB0aGUgSmF2YVNjcmlwdCBwbGF0Zm9ybTogYnJvd3NlciBvciBub2RlXG5tb2R1bGUuZXhwb3J0cy5wbGF0Zm9ybSA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBpc05vZGUocHJvY2VzcykgPyAnbm9kZScgOiAnYnJvd3Nlcic7XG5cbi8vIGRldGVybWluZXMgd2hldGhlciB0aGUgY29kZSBpcyBydW5uaW5nIGluIG1haW4gdGhyZWFkIG9yIG5vdFxuLy8gbm90ZSB0aGF0IGluIG5vZGUuanMgd2UgaGF2ZSB0byBjaGVjayBib3RoIHdvcmtlcl90aHJlYWQgYW5kIGNoaWxkX3Byb2Nlc3NcbnZhciB3b3JrZXJfdGhyZWFkcyA9IHRyeVJlcXVpcmVGb29sV2VicGFjaygnd29ya2VyX3RocmVhZHMnKTtcbm1vZHVsZS5leHBvcnRzLmlzTWFpblRocmVhZCA9IG1vZHVsZS5leHBvcnRzLnBsYXRmb3JtID09PSAnbm9kZScgPyAoIXdvcmtlcl90aHJlYWRzIHx8IHdvcmtlcl90aHJlYWRzLmlzTWFpblRocmVhZCkgJiYgIXByb2Nlc3MuY29ubmVjdGVkIDogdHlwZW9mIFdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIGRldGVybWluZXMgdGhlIG51bWJlciBvZiBjcHVzIGF2YWlsYWJsZVxubW9kdWxlLmV4cG9ydHMuY3B1cyA9IG1vZHVsZS5leHBvcnRzLnBsYXRmb3JtID09PSAnYnJvd3NlcicgPyBzZWxmLm5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IDogcmVxdWlyZUZvb2xXZWJwYWNrKCdvcycpLmNwdXMoKS5sZW5ndGg7XG5mdW5jdGlvbiB0cnlSZXF1aXJlRm9vbFdlYnBhY2sobW9kdWxlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlcXVpcmVGb29sV2VicGFjayhtb2R1bGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKioqLyB9KSxcblxuLyoqKi8gNjcwOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG4vKipcbiAqIGVtYmVkZGVkV29ya2VyLmpzIGNvbnRhaW5zIGFuIGVtYmVkZGVkIHZlcnNpb24gb2Ygd29ya2VyLmpzLlxuICogVGhpcyBmaWxlIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkLFxuICogY2hhbmdlcyBtYWRlIGluIHRoaXMgZmlsZSB3aWxsIGJlIG92ZXJ3cml0dGVuLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IFwiIWZ1bmN0aW9uKCl7dmFyIF9fd2VicGFja19leHBvcnRzX189e307IWZ1bmN0aW9uKCl7dmFyIGV4cG9ydHM9X193ZWJwYWNrX2V4cG9ydHNfXyxfX3dlYnBhY2tfdW51c2VkX2V4cG9ydF9fO2Z1bmN0aW9uIF90eXBlb2Yocil7cmV0dXJuKF90eXBlb2Y9XFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIFN5bWJvbCYmXFxcInN5bWJvbFxcXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24ocil7cmV0dXJuIHR5cGVvZiByfTpmdW5jdGlvbihyKXtyZXR1cm4gciYmXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIFN5bWJvbCYmci5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmciE9PVN5bWJvbC5wcm90b3R5cGU/XFxcInN5bWJvbFxcXCI6dHlwZW9mIHJ9KShyKX12YXIgcmVxdWlyZUZvb2xXZWJwYWNrPWV2YWwoXFxcInR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUgOiBmdW5jdGlvbiAobW9kdWxlKSB7IHRocm93IG5ldyBFcnJvcignTW9kdWxlIFxcXFxcXFwiICsgbW9kdWxlICsgXFxcXFxcXCIgbm90IGZvdW5kLicpIH1cXFwiKSxURVJNSU5BVEVfTUVUSE9EX0lEPVxcXCJfX3dvcmtlcnBvb2wtdGVybWluYXRlX19cXFwiLHdvcmtlcj17ZXhpdDpmdW5jdGlvbigpe319LFdvcmtlclRocmVhZHMscGFyZW50UG9ydDtpZihcXFwidW5kZWZpbmVkXFxcIiE9dHlwZW9mIHNlbGYmJlxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBwb3N0TWVzc2FnZSYmXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIpd29ya2VyLm9uPWZ1bmN0aW9uKHIsZSl7YWRkRXZlbnRMaXN0ZW5lcihyLGZ1bmN0aW9uKHIpe2Uoci5kYXRhKX0pfSx3b3JrZXIuc2VuZD1mdW5jdGlvbihyKXtwb3N0TWVzc2FnZShyKX07ZWxzZXtpZihcXFwidW5kZWZpbmVkXFxcIj09dHlwZW9mIHByb2Nlc3MpdGhyb3cgbmV3IEVycm9yKFxcXCJTY3JpcHQgbXVzdCBiZSBleGVjdXRlZCBhcyBhIHdvcmtlclxcXCIpO3RyeXtXb3JrZXJUaHJlYWRzPXJlcXVpcmVGb29sV2VicGFjayhcXFwid29ya2VyX3RocmVhZHNcXFwiKX1jYXRjaChlcnJvcil7aWYoXFxcIm9iamVjdFxcXCIhPT1fdHlwZW9mKGVycm9yKXx8bnVsbD09PWVycm9yfHxcXFwiTU9EVUxFX05PVF9GT1VORFxcXCIhPT1lcnJvci5jb2RlKXRocm93IGVycm9yfVdvcmtlclRocmVhZHMmJm51bGwhPT1Xb3JrZXJUaHJlYWRzLnBhcmVudFBvcnQ/KHBhcmVudFBvcnQ9V29ya2VyVGhyZWFkcy5wYXJlbnRQb3J0LHdvcmtlci5zZW5kPXBhcmVudFBvcnQucG9zdE1lc3NhZ2UuYmluZChwYXJlbnRQb3J0KSx3b3JrZXIub249cGFyZW50UG9ydC5vbi5iaW5kKHBhcmVudFBvcnQpKTood29ya2VyLm9uPXByb2Nlc3Mub24uYmluZChwcm9jZXNzKSx3b3JrZXIuc2VuZD1wcm9jZXNzLnNlbmQuYmluZChwcm9jZXNzKSx3b3JrZXIub24oXFxcImRpc2Nvbm5lY3RcXFwiLGZ1bmN0aW9uKCl7cHJvY2Vzcy5leGl0KDEpfSksd29ya2VyLmV4aXQ9cHJvY2Vzcy5leGl0LmJpbmQocHJvY2VzcykpfWZ1bmN0aW9uIGNvbnZlcnRFcnJvcihvKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykucmVkdWNlKGZ1bmN0aW9uKHIsZSl7cmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLGUse3ZhbHVlOm9bZV0sZW51bWVyYWJsZTohMH0pfSx7fSl9ZnVuY3Rpb24gaXNQcm9taXNlKHIpe3JldHVybiByJiZcXFwiZnVuY3Rpb25cXFwiPT10eXBlb2Ygci50aGVuJiZcXFwiZnVuY3Rpb25cXFwiPT10eXBlb2Ygci5jYXRjaH13b3JrZXIubWV0aG9kcz17fSx3b3JrZXIubWV0aG9kcy5ydW49ZnVuY3Rpb24ocixlKXtyPW5ldyBGdW5jdGlvbihcXFwicmV0dXJuIChcXFwiK3IrXFxcIikuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcXFwiKTtyZXR1cm4gci5hcHBseShyLGUpfSx3b3JrZXIubWV0aG9kcy5tZXRob2RzPWZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5rZXlzKHdvcmtlci5tZXRob2RzKX07dmFyIGN1cnJlbnRSZXF1ZXN0SWQ9bnVsbDt3b3JrZXIub24oXFxcIm1lc3NhZ2VcXFwiLGZ1bmN0aW9uKGUpe2lmKGU9PT1URVJNSU5BVEVfTUVUSE9EX0lEKXJldHVybiB3b3JrZXIuZXhpdCgwKTt0cnl7dmFyIHI9d29ya2VyLm1ldGhvZHNbZS5tZXRob2RdO2lmKCFyKXRocm93IG5ldyBFcnJvcignVW5rbm93biBtZXRob2QgXFxcIicrZS5tZXRob2QrJ1xcXCInKTtjdXJyZW50UmVxdWVzdElkPWUuaWQ7dmFyIG89ci5hcHBseShyLGUucGFyYW1zKTtpc1Byb21pc2Uobyk/by50aGVuKGZ1bmN0aW9uKHIpe3dvcmtlci5zZW5kKHtpZDplLmlkLHJlc3VsdDpyLGVycm9yOm51bGx9KSxjdXJyZW50UmVxdWVzdElkPW51bGx9KS5jYXRjaChmdW5jdGlvbihyKXt3b3JrZXIuc2VuZCh7aWQ6ZS5pZCxyZXN1bHQ6bnVsbCxlcnJvcjpjb252ZXJ0RXJyb3Iocil9KSxjdXJyZW50UmVxdWVzdElkPW51bGx9KTood29ya2VyLnNlbmQoe2lkOmUuaWQscmVzdWx0Om8sZXJyb3I6bnVsbH0pLGN1cnJlbnRSZXF1ZXN0SWQ9bnVsbCl9Y2F0Y2gocil7d29ya2VyLnNlbmQoe2lkOmUuaWQscmVzdWx0Om51bGwsZXJyb3I6Y29udmVydEVycm9yKHIpfSl9fSksd29ya2VyLnJlZ2lzdGVyPWZ1bmN0aW9uKHIpe2lmKHIpZm9yKHZhciBlIGluIHIpci5oYXNPd25Qcm9wZXJ0eShlKSYmKHdvcmtlci5tZXRob2RzW2VdPXJbZV0pO3dvcmtlci5zZW5kKFxcXCJyZWFkeVxcXCIpfSx3b3JrZXIuZW1pdD1mdW5jdGlvbihyKXtjdXJyZW50UmVxdWVzdElkJiZ3b3JrZXIuc2VuZCh7aWQ6Y3VycmVudFJlcXVlc3RJZCxpc0V2ZW50OiEwLHBheWxvYWQ6cn0pfSxfX3dlYnBhY2tfdW51c2VkX2V4cG9ydF9fPXdvcmtlci5yZWdpc3Rlcix3b3JrZXIuZW1pdH0oKX0oKTtcIjtcblxuLyoqKi8gfSksXG5cbi8qKiovIDM5Nzpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuLy8gc291cmNlIG9mIGluc3BpcmF0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3JlcXVpcmUtZm9vbC13ZWJwYWNrXG52YXIgcmVxdWlyZUZvb2xXZWJwYWNrID0gZXZhbCgndHlwZW9mIHJlcXVpcmUgIT09IFxcJ3VuZGVmaW5lZFxcJyAnICsgJz8gcmVxdWlyZSAnICsgJzogZnVuY3Rpb24gKG1vZHVsZSkgeyB0aHJvdyBuZXcgRXJyb3IoXFwnTW9kdWxlIFwiICsgbW9kdWxlICsgXCIgbm90IGZvdW5kLlxcJykgfScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlRm9vbFdlYnBhY2s7XG5cbi8qKiovIH0pLFxuXG4vKioqLyA3NDQ6XG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpIHtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH0sIF90eXBlb2Yob2JqKTsgfVxuLyoqXG4gKiB3b3JrZXIgbXVzdCBiZSBzdGFydGVkIGFzIGEgY2hpbGQgcHJvY2VzcyBvciBhIHdlYiB3b3JrZXIuXG4gKiBJdCBsaXN0ZW5zIGZvciBSUEMgbWVzc2FnZXMgZnJvbSB0aGUgcGFyZW50IHByb2Nlc3MuXG4gKi9cblxuLy8gc291cmNlIG9mIGluc3BpcmF0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3JlcXVpcmUtZm9vbC13ZWJwYWNrXG52YXIgcmVxdWlyZUZvb2xXZWJwYWNrID0gZXZhbCgndHlwZW9mIHJlcXVpcmUgIT09IFxcJ3VuZGVmaW5lZFxcJycgKyAnID8gcmVxdWlyZScgKyAnIDogZnVuY3Rpb24gKG1vZHVsZSkgeyB0aHJvdyBuZXcgRXJyb3IoXFwnTW9kdWxlIFwiICsgbW9kdWxlICsgXCIgbm90IGZvdW5kLlxcJykgfScpO1xuXG4vKipcbiAqIFNwZWNpYWwgbWVzc2FnZSBzZW50IGJ5IHBhcmVudCB3aGljaCBjYXVzZXMgdGhlIHdvcmtlciB0byB0ZXJtaW5hdGUgaXRzZWxmLlxuICogTm90IGEgXCJtZXNzYWdlIG9iamVjdFwiOyB0aGlzIHN0cmluZyBpcyB0aGUgZW50aXJlIG1lc3NhZ2UuXG4gKi9cbnZhciBURVJNSU5BVEVfTUVUSE9EX0lEID0gJ19fd29ya2VycG9vbC10ZXJtaW5hdGVfXyc7XG5cbi8vIHZhciBub2RlT1NQbGF0Zm9ybSA9IHJlcXVpcmUoJy4vZW52aXJvbm1lbnQnKS5ub2RlT1NQbGF0Zm9ybTtcblxuLy8gY3JlYXRlIGEgd29ya2VyIEFQSSBmb3Igc2VuZGluZyBhbmQgcmVjZWl2aW5nIG1lc3NhZ2VzIHdoaWNoIHdvcmtzIGJvdGggb25cbi8vIG5vZGUuanMgYW5kIGluIHRoZSBicm93c2VyXG52YXIgd29ya2VyID0ge1xuICBleGl0OiBmdW5jdGlvbiBleGl0KCkge31cbn07XG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyB3b3JrZXIgaW4gdGhlIGJyb3dzZXJcbiAgd29ya2VyLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBjYWxsYmFjayhtZXNzYWdlLmRhdGEpO1xuICAgIH0pO1xuICB9O1xuICB3b3JrZXIuc2VuZCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH07XG59IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAvLyBub2RlLmpzXG5cbiAgdmFyIFdvcmtlclRocmVhZHM7XG4gIHRyeSB7XG4gICAgV29ya2VyVGhyZWFkcyA9IHJlcXVpcmVGb29sV2VicGFjaygnd29ya2VyX3RocmVhZHMnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoX3R5cGVvZihlcnJvcikgPT09ICdvYmplY3QnICYmIGVycm9yICE9PSBudWxsICYmIGVycm9yLmNvZGUgPT09ICdNT0RVTEVfTk9UX0ZPVU5EJykge1xuICAgICAgLy8gbm8gd29ya2VyX3RocmVhZHMsIGZhbGxiYWNrIHRvIHN1Yi1wcm9jZXNzIGJhc2VkIHdvcmtlcnNcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG4gIGlmIChXb3JrZXJUaHJlYWRzICYmIC8qIGlmIHRoZXJlIGlzIGEgcGFyZW50UG9ydCwgd2UgYXJlIGluIGEgV29ya2VyVGhyZWFkICovXG4gIFdvcmtlclRocmVhZHMucGFyZW50UG9ydCAhPT0gbnVsbCkge1xuICAgIHZhciBwYXJlbnRQb3J0ID0gV29ya2VyVGhyZWFkcy5wYXJlbnRQb3J0O1xuICAgIHdvcmtlci5zZW5kID0gcGFyZW50UG9ydC5wb3N0TWVzc2FnZS5iaW5kKHBhcmVudFBvcnQpO1xuICAgIHdvcmtlci5vbiA9IHBhcmVudFBvcnQub24uYmluZChwYXJlbnRQb3J0KTtcbiAgfSBlbHNlIHtcbiAgICB3b3JrZXIub24gPSBwcm9jZXNzLm9uLmJpbmQocHJvY2Vzcyk7XG4gICAgd29ya2VyLnNlbmQgPSBwcm9jZXNzLnNlbmQuYmluZChwcm9jZXNzKTtcbiAgICAvLyByZWdpc3RlciBkaXNjb25uZWN0IGhhbmRsZXIgb25seSBmb3Igc3VicHJvY2VzcyB3b3JrZXIgdG8gZXhpdCB3aGVuIHBhcmVudCBpcyBraWxsZWQgdW5leHBlY3RlZGx5XG4gICAgd29ya2VyLm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuICAgIHdvcmtlci5leGl0ID0gcHJvY2Vzcy5leGl0LmJpbmQocHJvY2Vzcyk7XG4gIH1cbn0gZWxzZSB7XG4gIHRocm93IG5ldyBFcnJvcignU2NyaXB0IG11c3QgYmUgZXhlY3V0ZWQgYXMgYSB3b3JrZXInKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRFcnJvcihlcnJvcikge1xuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyb3IpLnJlZHVjZShmdW5jdGlvbiAocHJvZHVjdCwgbmFtZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvZHVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IGVycm9yW25hbWVdLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9LCB7fSk7XG59XG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgdmFsdWUgaXMgYSBQcm9taXNlIHZpYSBkdWNrIHR5cGluZy5cbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgd2hlbiBnaXZlbiB2YWx1ZSBpcyBhbiBvYmplY3RcbiAqICAgICAgICAgICAgICAgICAgICBoYXZpbmcgZnVuY3Rpb25zIGB0aGVuYCBhbmQgYGNhdGNoYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWVbXCJjYXRjaFwiXSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLy8gZnVuY3Rpb25zIGF2YWlsYWJsZSBleHRlcm5hbGx5XG53b3JrZXIubWV0aG9kcyA9IHt9O1xuXG4vKipcbiAqIEV4ZWN1dGUgYSBmdW5jdGlvbiB3aXRoIHByb3ZpZGVkIGFyZ3VtZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IGZuICAgICBTdHJpbmdpZmllZCBmdW5jdGlvblxuICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdICBGdW5jdGlvbiBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHsqfVxuICovXG53b3JrZXIubWV0aG9kcy5ydW4gPSBmdW5jdGlvbiBydW4oZm4sIGFyZ3MpIHtcbiAgdmFyIGYgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAoJyArIGZuICsgJykuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsnKTtcbiAgcmV0dXJuIGYuYXBwbHkoZiwgYXJncyk7XG59O1xuXG4vKipcbiAqIEdldCBhIGxpc3Qgd2l0aCBtZXRob2RzIGF2YWlsYWJsZSBvbiB0aGlzIHdvcmtlclxuICogQHJldHVybiB7U3RyaW5nW119IG1ldGhvZHNcbiAqL1xud29ya2VyLm1ldGhvZHMubWV0aG9kcyA9IGZ1bmN0aW9uIG1ldGhvZHMoKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh3b3JrZXIubWV0aG9kcyk7XG59O1xudmFyIGN1cnJlbnRSZXF1ZXN0SWQgPSBudWxsO1xud29ya2VyLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgaWYgKHJlcXVlc3QgPT09IFRFUk1JTkFURV9NRVRIT0RfSUQpIHtcbiAgICByZXR1cm4gd29ya2VyLmV4aXQoMCk7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIgbWV0aG9kID0gd29ya2VyLm1ldGhvZHNbcmVxdWVzdC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QpIHtcbiAgICAgIGN1cnJlbnRSZXF1ZXN0SWQgPSByZXF1ZXN0LmlkO1xuXG4gICAgICAvLyBleGVjdXRlIHRoZSBmdW5jdGlvblxuICAgICAgdmFyIHJlc3VsdCA9IG1ldGhvZC5hcHBseShtZXRob2QsIHJlcXVlc3QucGFyYW1zKTtcbiAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICAvLyBwcm9taXNlIHJldHVybmVkLCByZXNvbHZlIHRoaXMgYW5kIHRoZW4gcmV0dXJuXG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICB3b3JrZXIuc2VuZCh7XG4gICAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjdXJyZW50UmVxdWVzdElkID0gbnVsbDtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgd29ya2VyLnNlbmQoe1xuICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICByZXN1bHQ6IG51bGwsXG4gICAgICAgICAgICBlcnJvcjogY29udmVydEVycm9yKGVycilcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjdXJyZW50UmVxdWVzdElkID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbW1lZGlhdGUgcmVzdWx0XG4gICAgICAgIHdvcmtlci5zZW5kKHtcbiAgICAgICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICBlcnJvcjogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFJlcXVlc3RJZCA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBtZXRob2QgXCInICsgcmVxdWVzdC5tZXRob2QgKyAnXCInKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHdvcmtlci5zZW5kKHtcbiAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgZXJyb3I6IGNvbnZlcnRFcnJvcihlcnIpXG4gICAgfSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJlZ2lzdGVyIG1ldGhvZHMgdG8gdGhlIHdvcmtlclxuICogQHBhcmFtIHtPYmplY3R9IG1ldGhvZHNcbiAqL1xud29ya2VyLnJlZ2lzdGVyID0gZnVuY3Rpb24gKG1ldGhvZHMpIHtcbiAgaWYgKG1ldGhvZHMpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChtZXRob2RzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHdvcmtlci5tZXRob2RzW25hbWVdID0gbWV0aG9kc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgd29ya2VyLnNlbmQoJ3JlYWR5Jyk7XG59O1xud29ya2VyLmVtaXQgPSBmdW5jdGlvbiAocGF5bG9hZCkge1xuICBpZiAoY3VycmVudFJlcXVlc3RJZCkge1xuICAgIHdvcmtlci5zZW5kKHtcbiAgICAgIGlkOiBjdXJyZW50UmVxdWVzdElkLFxuICAgICAgaXNFdmVudDogdHJ1ZSxcbiAgICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgICB9KTtcbiAgfVxufTtcbmlmICh0cnVlKSB7XG4gIGV4cG9ydHMuYWRkID0gd29ya2VyLnJlZ2lzdGVyO1xuICBleHBvcnRzLmVtaXQgPSB3b3JrZXIuZW1pdDtcbn1cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuIWZ1bmN0aW9uKCkge1xudmFyIGV4cG9ydHMgPSBfX3dlYnBhY2tfZXhwb3J0c19fO1xudmFyIGVudmlyb25tZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MjgpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyB3b3JrZXIgcG9vbFxuICogQHBhcmFtIHtzdHJpbmd9IFtzY3JpcHRdXG4gKiBAcGFyYW0ge1dvcmtlclBvb2xPcHRpb25zfSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtQb29sfSBwb29sXG4gKi9cbmV4cG9ydHMucG9vbCA9IGZ1bmN0aW9uIHBvb2woc2NyaXB0LCBvcHRpb25zKSB7XG4gIHZhciBQb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNDUpO1xuICByZXR1cm4gbmV3IFBvb2woc2NyaXB0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgd29ya2VyIGFuZCBvcHRpb25hbGx5IHJlZ2lzdGVyIGEgc2V0IG9mIG1ldGhvZHMgdG8gdGhlIHdvcmtlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbbWV0aG9kc11cbiAqL1xuZXhwb3J0cy53b3JrZXIgPSBmdW5jdGlvbiB3b3JrZXIobWV0aG9kcykge1xuICB2YXIgd29ya2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NDQpO1xuICB3b3JrZXIuYWRkKG1ldGhvZHMpO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhbiBldmVudCB0byB0aGUgcGFyZW50IHdvcmtlciBwb29sLlxuICogQHBhcmFtIHthbnl9IHBheWxvYWQgXG4gKi9cbmV4cG9ydHMud29ya2VyRW1pdCA9IGZ1bmN0aW9uIHdvcmtlckVtaXQocGF5bG9hZCkge1xuICB2YXIgd29ya2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NDQpO1xuICB3b3JrZXIuZW1pdChwYXlsb2FkKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcHJvbWlzZS5cbiAqIEB0eXBlIHtQcm9taXNlfSBwcm9taXNlXG4gKi9cbmV4cG9ydHMuUHJvbWlzZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjE5KTtcbmV4cG9ydHMucGxhdGZvcm0gPSBlbnZpcm9ubWVudC5wbGF0Zm9ybTtcbmV4cG9ydHMuaXNNYWluVGhyZWFkID0gZW52aXJvbm1lbnQuaXNNYWluVGhyZWFkO1xuZXhwb3J0cy5jcHVzID0gZW52aXJvbm1lbnQuY3B1cztcbn0oKTtcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdvcmtlcnBvb2wuanMubWFwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0JlbmNoU29sdmVyRmFjYWRlfSBmcm9tIFwiLi9UZXRyaXNTb2x2aW5nQmVuY2gvQmVuY2hTb2x2ZXJGYWNhZGVcIjtcbmltcG9ydCB7RXZlbnRCdXMsIEV2ZW50VHlwZSwgRmFsbFRpY2tQcm9jZXNzZWRFdmVudCwgR2FtZU92ZXJFdmVudH0gZnJvbSBcIi4vVGV0cmlzL0V2ZW50QnVzL0V2ZW50QnVzXCI7XG5pbXBvcnQge0JlbmNoUnVuUGFyYW1ldGVyc30gZnJvbSBcIi4vVGV0cmlzU29sdmluZ0JlbmNoL0NvbW1vblwiO1xuXG5jb25zdCB3b3JrZXJwb29sID0gcmVxdWlyZSgnd29ya2VycG9vbCcpO1xuXG5hc3luYyBmdW5jdGlvbiBzb2x2ZVRldHJpcyhwYXJhbXM6IEJlbmNoUnVuUGFyYW1ldGVycykge1xuICAgIGNvbnN0IGV2ZW50QnVzID0gbmV3IEV2ZW50QnVzKCk7XG4gICAgbGV0IGJlbmNoID0gbmV3IEJlbmNoU29sdmVyRmFjYWRlKHBhcmFtcywgZXZlbnRCdXMpO1xuICAgIGJlbmNoLnN0YXJ0KCk7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBldmVudEJ1cy5vbihFdmVudFR5cGUuRmFsbGluZ1RpY2tQcm9jZXNzZWQsIChldmVudDogRmFsbFRpY2tQcm9jZXNzZWRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmdhbWVEYXRhLnN0YXRzLmZpZ3VyZXNGYWxsZW4gPj0gMV8wMDBfMDAwKSB7XG4gICAgICAgICAgICAgICAgYmVuY2gucGF1c2UoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGV2ZW50LmdhbWVEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50QnVzLm9uKEV2ZW50VHlwZS5HYW1lT3ZlciwgKGV2ZW50OiBHYW1lT3ZlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGV2ZW50LmdhbWVEYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vIGNyZWF0ZSBhIHdvcmtlciBhbmQgcmVnaXN0ZXIgcHVibGljIGZ1bmN0aW9uc1xud29ya2VycG9vbC53b3JrZXIoe1xuICAgIHNvbHZlVGV0cmlzOiBzb2x2ZVRldHJpcyxcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9