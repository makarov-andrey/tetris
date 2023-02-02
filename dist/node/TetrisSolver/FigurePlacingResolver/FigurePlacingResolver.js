"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigurePlacingResolver = void 0;
const Common_1 = require("../../Tetris/Common");
const EnumHelper_1 = require("../../Tetris/Utils/EnumHelper");
const Figures_1 = require("../../Tetris/Figures");
const FigurePlacingChecker_1 = require("../../Tetris/Utils/FigurePlacingChecker");
const Common_2 = require("../Common");
const HolesHelper_1 = require("../Utils/HolesHelper");
const ScoreCalculatorInterface_1 = require("../ScoreCalculator/ScoreCalculatorInterface");
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
        let theBestResult = new Common_2.FigurePlacingResult(new Map(), []);
        this.processStates(gameData, (imaginableFigure, score, placingDirections) => {
            if (score > maxScore) {
                maxScore = score;
                theBestResult = new Common_2.FigurePlacingResult(new Map([[originalFigure, imaginableFigure]]), placingDirections);
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
        let enums = EnumHelper_1.EnumHelper.ToArray(Figures_1.FigureTurnState);
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
        const originalMatrixHoles = HolesHelper_1.HolesHelper.collectHoles(gameData.matrix);
        const originalCoveredColumns = HolesHelper_1.HolesHelper.collectCoveredColumns(gameData.matrix);
        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                let coordinate = new Common_1.Coordinate(x, y);
                let squashedLinesCount = this.squashLines(imaginableMatrix);
                let imaginableFigure = new Common_1.FallingFigure(originalFigure.figure, coordinate, turnState);
                if (onBeforeScoreCalculates) {
                    onBeforeScoreCalculates(imaginableFigure);
                }
                let imaginableCoveredColumns = HolesHelper_1.HolesHelper.collectCoveredColumns(imaginableMatrix);
                let calculateScoreRequest = new ScoreCalculatorInterface_1.CalculateScoreRequest(gameData, originalMatrixHoles, originalCoveredColumns, imaginableMatrix, imaginableCoveredColumns, squashedLinesCount);
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
                        let coordinate = new Common_1.Coordinate(x, y);
                        let imaginableFigure = new Common_1.FallingFigure(originalFigure.figure, coordinate, turnState);
                        if (onBeforeScoreCalculates) {
                            onBeforeScoreCalculates(imaginableFigure);
                        }
                        if (FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figureMatrix, coordinate, gameData.matrix)) {
                            let directions = this.makePushInPlacingSteps(gameData, imaginableFigure, originalCoveredColumns);
                            if (directions !== undefined) {
                                let imaginableMatrix = this.imagineFigurePlacing(gameData.matrix, figureMatrix, coordinate);
                                let squashedLinesCount = this.squashLines(imaginableMatrix);
                                let imaginableCoveredColumns = HolesHelper_1.HolesHelper.collectCoveredColumns(imaginableMatrix);
                                let calculateScoreRequest = new ScoreCalculatorInterface_1.CalculateScoreRequest(gameData, originalMatrixHoles, originalCoveredColumns, imaginableMatrix, imaginableCoveredColumns, squashedLinesCount);
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
        while (FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Common_1.Coordinate(targetX, targetY + 1), gameMatrix)) {
            targetY++;
        }
        return [
            targetY,
            this.imagineFigurePlacing(gameMatrix, figureMatrix, new Common_1.Coordinate(targetX, targetY)),
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
        let targetX = HolesHelper_1.HolesHelper.findTheWayOutFromHole(gameData.matrix, imaginableFigure.position, originalCoveredColumns, figureMatrix);
        if (targetX === undefined) {
            return undefined;
        }
        return [
            new Common_2.TurnPlacingStep(imaginableFigure.turnState, true),
            new Common_2.MoveXPlacingStep(targetX, false),
            new Common_2.MoveYPlacingStep(imaginableFigure.position.y),
            new Common_2.MoveXPlacingStep(imaginableFigure.position.x, true),
            new Common_2.DropPlacingStep(),
        ];
    }
    makeSimplePlacingSteps(imaginableFigure) {
        return [
            new Common_2.TurnPlacingStep(imaginableFigure.turnState, true),
            new Common_2.MoveXPlacingStep(imaginableFigure.position.x, true),
            new Common_2.DropPlacingStep(),
        ];
    }
}
exports.FigurePlacingResolver = FigurePlacingResolver;
