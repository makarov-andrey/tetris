import {Coordinate, FallingFigure, GameData} from "../../Tetris/Common";
import {EnumHelper} from "../../Tetris/Utils/EnumHelper";
import {FigureTurnState} from "../../Tetris/Figures";
import {FigurePlacingChecker} from "../../Tetris/Utils/FigurePlacingChecker";
import {CommandBus, RenderCommand} from "../../Tetris/CommandBus/CommandBus";
import {DropPlacingStep, FigurePlacingResult, FigurePlacingStep, MoveXPlacingStep, MoveYPlacingStep, TurnPlacingStep} from "../Common";
import {CalculatorAggregate} from "../ScoreCalculator/CalculatorAggregate";
import {HolesHelper} from "../Utils/HolesHelper";
import {CalculateScoreRequest} from "../ScoreCalculator/ScoreCalculatorInterface";

class PlaceResolvingError extends Error {
}

class GameStateNotSupportedError extends PlaceResolvingError {
}

export class FigurePlacingResolver {
    constructor(
        private commandBus: CommandBus,
        private scoreCalculator: CalculatorAggregate,
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

        const originalMatrixHoles = HolesHelper.collectHoles(gameData.matrix);
        const originalCoveredColumns = HolesHelper.collectCoveredColumns(gameData.matrix);

        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                let coordinate = new Coordinate(x, y);
                let squashedLinesCount = this.squashLines(imaginableMatrix);
                let imaginableFigure = new FallingFigure(originalFigure.figure, coordinate, turnState);
                if (onBeforeScoreCalculates) {
                    onBeforeScoreCalculates(imaginableFigure);
                }
                let imaginableCoveredColumns = HolesHelper.collectCoveredColumns(imaginableMatrix);
                let calculateScoreRequest = new CalculateScoreRequest(
                    gameData,
                    originalMatrixHoles,
                    originalCoveredColumns,
                    imaginableMatrix,
                    imaginableCoveredColumns,
                    squashedLinesCount
                );
                let score = this.scoreCalculator.calculateScore(calculateScoreRequest);
                let directions = this.makeSimplePlacingSteps(imaginableFigure);
                if (onAfterScoreCalculates) {
                    onAfterScoreCalculates(imaginableFigure, score, directions);
                }
            }
        });

        originalMatrixHoles.filter(hole => hole.isOpened && hole.cells.length > 0).forEach(hole => {
            let topY = gameData.settings.fieldHeight,
                leftX = gameData.settings.fieldWidth,
                bottomY = -1,
                rightX = -1;
            hole.cells.forEach(cell => {
                topY = Math.min(topY, cell.y);
                leftX = Math.min(leftX, cell.x);
                bottomY = Math.max(bottomY, cell.y);
                rightX = Math.max(rightX, cell.x);
            });

            matrices.forEach((figureMatrix, turnState) => {
                for (let y = Math.max(topY - figureMatrix.length + 1, 0); y <= bottomY; y++) {
                    for (let x = Math.max(leftX - figureMatrix[0].length + 1, 0); x <= rightX; x++) {
                        let coordinate = new Coordinate(x, y);
                        let imaginableFigure = new FallingFigure(originalFigure.figure, coordinate, turnState);
                        if (onBeforeScoreCalculates) {
                            onBeforeScoreCalculates(imaginableFigure);
                        }
                        if (FigurePlacingChecker.canFigureBePlaced(figureMatrix, coordinate, gameData.matrix)) {
                            let directions = this.makePushInPlacingSteps(gameData, imaginableFigure, originalCoveredColumns);
                            if (directions !== undefined) {
                                let imaginableMatrix = this.imagineFigurePlacing(gameData.matrix, figureMatrix, coordinate);
                                let squashedLinesCount = this.squashLines(imaginableMatrix);
                                let imaginableCoveredColumns = HolesHelper.collectCoveredColumns(imaginableMatrix);
                                let calculateScoreRequest = new CalculateScoreRequest(
                                    gameData,
                                    originalMatrixHoles,
                                    originalCoveredColumns,
                                    imaginableMatrix,
                                    imaginableCoveredColumns,
                                    squashedLinesCount
                                );
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

    private makePushInPlacingSteps(gameData: GameData, imaginableFigure: FallingFigure, originalCoveredColumns: Map<number, number>): FigurePlacingStep[] | undefined {
        let figureMatrix = imaginableFigure.figure.getTurn(imaginableFigure.turnState);
        let targetX = HolesHelper.findTheWayOutFromHole(gameData.matrix, imaginableFigure.position, originalCoveredColumns, figureMatrix);
        if (targetX === undefined) {
            return undefined;
        }

        return [
            new TurnPlacingStep(imaginableFigure.turnState, true),
            new MoveXPlacingStep(targetX, false),
            new MoveYPlacingStep(imaginableFigure.position.y),
            new MoveXPlacingStep(imaginableFigure.position.x, true),
            new DropPlacingStep(),
        ];
    }

    private makeSimplePlacingSteps(imaginableFigure: FallingFigure): FigurePlacingStep[] {
        return [
            new TurnPlacingStep(imaginableFigure.turnState, true),
            new MoveXPlacingStep(imaginableFigure.position.x, true),
            new DropPlacingStep(),
        ];
    }
}
