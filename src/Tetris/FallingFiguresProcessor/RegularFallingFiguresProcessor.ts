import {Coordinate, FallingFigure} from "../Structures";
import {FiguresFallDownCommand, CommandBus, CommandType, GameOverCommand, FiguresFallTickCommand} from "../CommandBus/CommandBus";
import {EventBus, FallTickProcessedEvent} from "../EventBus/EventBus";
import {GameData} from "../GameData";
import {FigurePlacingChecker} from "../Utils/FigurePlacingChecker";

class FallingResult {
    public transferredFigures: FallingFigure[] = [];
    public isGameOver: boolean = false;
}

export class RegularFallingFiguresProcessor {
    constructor(
        private commandBus: CommandBus,
        private eventBus: EventBus,
    ) {
        this.commandBus.addHandler(CommandType.FiguresFallTick, this.processFiguresFallTickCommand.bind(this));
        this.commandBus.addHandler(CommandType.FiguresFallDown, this.processFiguresFallDownCommand.bind(this));
    }

    private processFiguresFallTickCommand(command: FiguresFallTickCommand) {
        const fallingResult = this.fallFiguresForOneCell(command.gameData);
        let squashedLines = this.squashLines(command.gameData.matrix);
        if (fallingResult.isGameOver) {
            this.commandBus.run(new GameOverCommand(command.gameData));
        }
        this.eventBus.fire(new FallTickProcessedEvent(
            command.gameData,
            fallingResult.transferredFigures,
            squashedLines,
        ));
    }

    private processFiguresFallDownCommand(command: FiguresFallDownCommand): void {
        let fallingResult = new FallingResult();
        while (command.gameData.fallingFigures.length > 0) {
            const oneCellFallingResult = this.fallFiguresForOneCell(command.gameData);
            fallingResult.transferredFigures.push(...oneCellFallingResult.transferredFigures);
            fallingResult.isGameOver = fallingResult.isGameOver || oneCellFallingResult.isGameOver;
        }
        let squashedLines = this.squashLines(command.gameData.matrix);
        if (fallingResult.isGameOver) {
            this.commandBus.run(new GameOverCommand(command.gameData));
        }
        this.eventBus.fire(new FallTickProcessedEvent(
            command.gameData,
            fallingResult.transferredFigures,
            squashedLines,
        ));
    }

    private fallFiguresForOneCell(gameData: GameData): FallingResult {
        let fallingResult = new FallingResult();
        gameData.fallingFigures.forEach((fallingFigure, index) => {
            if (this.figureCanFall(gameData.matrix, fallingFigure)) {
                fallingFigure.position.y++;
            } else {
                let figureGameOverResult = this.transferFigureToMatrix(
                    gameData.matrix,
                    fallingFigure
                );
                fallingResult.transferredFigures.push(...gameData.fallingFigures.splice(index, 1));
                fallingResult.isGameOver = fallingResult.isGameOver || figureGameOverResult;
            }
        });
        return fallingResult;
    }

    private figureCanFall(matrix: boolean[][], fallingFigure: FallingFigure): boolean {
        return FigurePlacingChecker.canFigureBePlaced(
            fallingFigure.figure.getTurn(fallingFigure.turnState),
            new Coordinate(fallingFigure.position.x, fallingFigure.position.y + 1),
            matrix
        );
    }

    private transferFigureToMatrix(matrix: boolean[][], fallingFigure: FallingFigure): boolean {
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
                        && !matrix[matrixY][matrixX]
                    ) {
                        matrix[matrixY][matrixX] = true;
                    } else {
                        isGameOver = true;
                    }
                });
            });
        return isGameOver;
    }

    private squashLines(matrix: boolean[][]): number[] {
        let linesToSquash: number[] = [];
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
