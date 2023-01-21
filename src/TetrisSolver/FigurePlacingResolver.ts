import {Coordinate, FallingFigure, GameData} from "../Tetris/Common";
import {EnumHelper} from "../Tetris/Utils/EnumHelper";
import {FigureTurnState} from "../Tetris/Figures";
import {FigurePlacingChecker} from "../Tetris/Utils/FigurePlacingChecker";
import {CommandBus, RenderCommand} from "../Tetris/CommandBus/CommandBus";
import {ScoreCalculator} from "./ScoreCalculator";
import {DropPlacingStep, FigurePlacingResult, FigurePlacingStep, MoveXPlacingStep, TurnPlacingStep} from "./Common";

class PlaceResolvingError extends Error {
}

class GameStateNotSupportedError extends PlaceResolvingError {
}

export class FigurePlacingResolver {
    constructor(
        private commandBus: CommandBus,
        private scoreCalculator: ScoreCalculator,
    ) {}

    public resolve(gameData: GameData): FigurePlacingResult|undefined {
        if (gameData.fallingFigures.length === 0) {
            return;
        }
        if (gameData.fallingFigures.length !== 1) {
            throw new GameStateNotSupportedError();
        }
        const originalFigure = gameData.fallingFigures[0];

        let maxScore = -Infinity;
        let theBestResult = new FigurePlacingResult(new Map(), []);

        this.processStates(gameData, (imaginableFigure: FallingFigure, score: number, placingDirections: FigurePlacingStep[]) => {
            if (score > maxScore) {
                maxScore = score;
                theBestResult = new FigurePlacingResult(
                    new Map([[originalFigure, imaginableFigure]]),
                    placingDirections
                );
            }
        })

        let debugMode = 'debugMode' in window && window.debugMode;
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
        }

        return theBestResult;
    }

    private processStates(
        gameData: GameData,
        onAfterScoreCalculates?: (imaginableFigure: FallingFigure, score: number, placingDirections: FigurePlacingStep[]) => void,
        onBeforeScoreCalculates?: (imaginableFigure: FallingFigure) => void,
    ) {
        const originalFigure = gameData.fallingFigures[0];

        let enums = EnumHelper.ToArray(FigureTurnState);
        while (enums[0] !== originalFigure.turnState) {
            enums.unshift(enums.pop());
        }
        let matrices: Map<FigureTurnState, boolean[][]> = new Map();
        let stringyMatrices: Set<string> = new Set();
        enums.forEach(turnState => {
            let figureMatrix = originalFigure.figure.getTurn(turnState);
            let stringyFigureMatrix = figureMatrix.map(row => row.map(val => val ? "1" : "0").join()).join("\n");
            if (!stringyMatrices.has(stringyFigureMatrix)) {
                stringyMatrices.add(stringyFigureMatrix);
                matrices.set(turnState, figureMatrix);
            }
        });

        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                let coordinate = new Coordinate(x, y);
                let squashedLinesCount = this.squashLines(imaginableMatrix);
                let imaginableFigure = new FallingFigure(originalFigure.figure, coordinate, turnState);
                if (onBeforeScoreCalculates) {
                    onBeforeScoreCalculates(imaginableFigure);
                }
                let score = this.scoreCalculator.calculateScore(gameData, imaginableMatrix, squashedLinesCount);
                let directions = this.makeSimplePlacingSteps(originalFigure, imaginableFigure);
                if (onAfterScoreCalculates) {
                    onAfterScoreCalculates(imaginableFigure, score, directions);
                }
            }
        });

        const openHoles = this.collectOpenHoles(gameData.matrix);
        openHoles.forEach(([topLeftCoordinate, bottomRightCoordinate]: [Coordinate, Coordinate]) => {
            matrices.forEach((figureMatrix, turnState) => {
                for (let y = Math.min(topLeftCoordinate.y - figureMatrix.length, 0); y++; y <= bottomRightCoordinate.y) {
                    for (let x = Math.min(topLeftCoordinate.x - figureMatrix[0].length, 0); x++; x <= bottomRightCoordinate.x) {
                        let coordinate = new Coordinate(x, y);
                        if (FigurePlacingChecker.canFigureBePlaced(figureMatrix, coordinate, gameData.matrix)) {
                            let imaginableFigure = new FallingFigure(originalFigure.figure, coordinate, turnState);
                            let directions = this.makePushInPlacingSteps(gameData, originalFigure, imaginableFigure);
                            if (directions !== undefined) {
                                let imaginableMatrix = this.imagineFigurePlacing(gameData.matrix, figureMatrix, coordinate);
                                let squashedLinesCount = this.squashLines(imaginableMatrix);
                                if (onBeforeScoreCalculates) {
                                    onBeforeScoreCalculates(imaginableFigure);
                                }
                                let score = this.scoreCalculator.calculateScore(gameData, imaginableMatrix, squashedLinesCount);
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

    private squashLines(matrix: boolean[][]): number {
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
        return linesToSquash.length;
    }

    private imagineFigureDrop(gameMatrix: boolean[][], figureMatrix: boolean[][], targetX: number): [number, boolean[][]] {
        let targetY = -figureMatrix.length;
        while (FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Coordinate(targetX, targetY + 1), gameMatrix)) {
            targetY++;
        }
        return [
            targetY,
            this.imagineFigurePlacing(gameMatrix, figureMatrix, new Coordinate(targetX, targetY)),
        ];
    }

    private imagineFigurePlacing(gameMatrix: boolean[][], figureMatrix: boolean[][], targetCoordinate: Coordinate): boolean[][] {
        let imaginableMatrix: boolean[][] = structuredClone(gameMatrix);
        figureMatrix.forEach((row, figureY) => {
            row.forEach((val, figureX) => {
                const realY = targetCoordinate.y + figureY;
                const realX = targetCoordinate.x + figureX;
                if (realY in imaginableMatrix
                    && realX in imaginableMatrix[realY]
                    && val
                ) {
                    imaginableMatrix[realY][realX] = true;
                }
            })
        });
        return imaginableMatrix;
    }

    private collectOpenHoles(matrix: boolean[][]): [Coordinate, Coordinate][] {
        return [];
    }

    private makePushInPlacingSteps(gameData: GameData, originalFigure: FallingFigure, imaginableFigure: FallingFigure): FigurePlacingStep[]|undefined {
        return undefined;
    }

    private makeSimplePlacingSteps(originalFigure: FallingFigure, imaginableFigure: FallingFigure): FigurePlacingStep[] {
        return [
            new TurnPlacingStep(imaginableFigure.turnState),
            new MoveXPlacingStep(imaginableFigure.position.x),
            new DropPlacingStep(),
        ];
    }
}
