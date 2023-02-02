"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegularFallingFiguresProcessor = void 0;
const Common_1 = require("../Common");
const CommandBus_1 = require("../CommandBus/CommandBus");
const EventBus_1 = require("../EventBus/EventBus");
const FigurePlacingChecker_1 = require("../Utils/FigurePlacingChecker");
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
        this.commandBus.addHandler(CommandBus_1.CommandType.FiguresFallTick, this.processFiguresFallTickCommand.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.FiguresFallDown, this.processDropFiguresCommand.bind(this));
    }
    processFiguresFallTickCommand(command) {
        const fallingResult = this.fallFiguresForOneCell(command.gameData);
        let squashedLines = this.squashLines(command.gameData.matrix);
        if (fallingResult.isGameOver) {
            this.commandBus.run(new CommandBus_1.GameOverCommand(command.gameData));
        }
        this.eventBus.fire(new EventBus_1.FallTickProcessedEvent(command.gameData, fallingResult.transferredFigures, squashedLines, 0));
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
            this.commandBus.run(new CommandBus_1.GameOverCommand(command.gameData));
        }
        this.eventBus.fire(new EventBus_1.FallTickProcessedEvent(command.gameData, fallingResult.transferredFigures, squashedLines, droppedLines - 1));
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
        return FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(fallingFigure.figure.getTurn(fallingFigure.turnState), new Common_1.Coordinate(fallingFigure.position.x, fallingFigure.position.y + 1), matrix);
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
exports.RegularFallingFiguresProcessor = RegularFallingFiguresProcessor;
