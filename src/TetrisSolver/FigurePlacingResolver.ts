import {Coordinate, FallingFigure, GameData} from "../Tetris/Common";
import {EnumHelper} from "../Tetris/Utils/EnumHelper";
import {Figure, FigureTurnState} from "../Tetris/Figures";
import {FigurePlacingChecker} from "../Tetris/Utils/FigurePlacingChecker";
import {CommandBus, RenderCommand} from "../Tetris/CommandBus/CommandBus";

class PlaceResolvingError extends Error {
}

class GameStateNotSupportedError extends PlaceResolvingError {
}

export class FigurePlacingResolver {
    constructor(
        private commandBus: CommandBus
    ) {}

    public resolveTargetPosition(gameData: GameData): Map<FallingFigure, FallingFigure> {
        if (gameData.fallingFigures.length === 0) {
            return new Map();
        }
        if (gameData.fallingFigures.length !== 1) {
            throw new GameStateNotSupportedError();
        }
        const originalFigure = gameData.fallingFigures[0];

        let enums = EnumHelper.ToArray(FigureTurnState);
        while (enums[0] !== originalFigure.turnState) {
            enums.unshift(enums.pop());
        }
        let matrices: Map<FigureTurnState, boolean[][]> = new Map();
        enums.forEach(turnState => {
            matrices.set(turnState, originalFigure.figure.getTurn(turnState));
        });
        let maxScore = -Infinity;
        let theBestTargetFigureState = new FallingFigure(
            originalFigure.figure,
            new Coordinate(originalFigure.position.x, originalFigure.position.y),
            originalFigure.turnState
        );

        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                let score = this.calculateScore(gameData, imaginableMatrix);
                if (score > maxScore) {
                    maxScore = score;
                    theBestTargetFigureState.turnState = turnState;
                    theBestTargetFigureState.position.x = x;
                    theBestTargetFigureState.position.y = y;
                }
            }
        });

        if ('debugMode' in window && window.debugMode) {
        // if (true) {
            let fakeGameData = structuredClone(gameData);
            theBestTargetFigureState.color = '#f00';
            fakeGameData.fallingFigures = [theBestTargetFigureState];
            this.commandBus.run(new RenderCommand(fakeGameData));

            matrices.forEach((figureMatrix, turnState) => {
                for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                    let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                    this.calculateScore(gameData, imaginableMatrix, true, new FallingFigure(
                        originalFigure.figure,
                        new Coordinate(x, y),
                        turnState,
                        '#00f'
                    ));
                }
            });

            matrices.forEach((figureMatrix, turnState) => {
                for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                    let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                    this.calculateScore(gameData, imaginableMatrix, true, new FallingFigure(
                        originalFigure.figure,
                        new Coordinate(x, y),
                        turnState,
                        '#00f'
                    ));
                }
            });
        }

        return new Map([
            [originalFigure, theBestTargetFigureState],
        ]);
    }

    private calculateScore(gameData: GameData, imaginableMatrix: boolean[][], debugMode: boolean = false, fakeFigure: FallingFigure|undefined = undefined): number {
        if (debugMode && fakeFigure) {
            let fakeGameData = structuredClone(gameData);
            fakeGameData.fallingFigures = [fakeFigure];
            this.commandBus.run(new RenderCommand(fakeGameData));
        }
        const fieldHeight = gameData.settings.fieldHeight;
        const fieldWidth = gameData.settings.fieldWidth;
        const squashedLinesCount = this.squashLines(imaginableMatrix);
        const squashedLinesScore = squashedLinesCount * 5;

        const originalHolesCount = this.calculateHoles(gameData.matrix);
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(imaginableMatrix, gameData.matrix);
        const holesCountDecrease = originalHolesCount - holesCount;
        let holesScore: number;
        if (holesCoveredHeight === 0 || holesCount === 0) {
            holesScore = (holesCountDecrease > 0 ? holesCountDecrease * 150 : holesCountDecrease * 70);
        } else {
            holesScore = (holesCountDecrease > 0 ? holesCountDecrease * 150 : holesCountDecrease * 70)
                - holesCoveredHeight * Math.pow(holesCoveredHeight, holesCoveredHeight / (fieldHeight * holesCount)) * 5;
        }

        const height = this.calculateHeight(imaginableMatrix);
        const heightScore = -height * Math.pow(height, height / fieldHeight) * 3;

        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > 5) {
            fillableCellsScore = -fillableCellsCount * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth));
        }

        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(imaginableMatrix, gameData.matrix);
        let tunnelsScore: number;
        if (tunnelsCount === 0) {
            tunnelsScore = 0;
        } else {
            tunnelsScore = -tunnelsCount * 70
                - tunnelsSumHeight * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (fieldHeight * tunnelsCount)) * 7;
        }

        const score = holesScore + squashedLinesScore + heightScore + tunnelsScore + fillableCellsScore;
        if (isNaN(score)) {
            console.log(imaginableMatrix, holesScore, squashedLinesScore, heightScore, tunnelsScore, fillableCellsScore);
        }
        return score;
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
        let imaginableMatrix: boolean[][] = gameMatrix.map(row => row.slice());
        let targetY = -figureMatrix.length;
        while (FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Coordinate(targetX, targetY + 1), gameMatrix)) {
            targetY++;
        }
        figureMatrix.forEach((row, figureY) => {
            row.forEach((val, figureX) => {
                const realY = targetY + figureY;
                const realX = targetX + figureX;
                if (realY in imaginableMatrix
                    && realX in imaginableMatrix[realY]
                    && val
                ) {
                    imaginableMatrix[realY][realX] = true;
                }
            })
        });
        return [targetY, imaginableMatrix];
    }

    private calculateHoles(imaginableMatrix: boolean[][]): number {
        let coveredColumns = new Set<number>;
        let holesCount = 0;
        imaginableMatrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                } else if (coveredColumns.has(x)) {
                    holesCount++;
                }
            });
        });
        return holesCount;
    }

    private calculateHolesAndCoveredHeight(imaginableMatrix: boolean[][], realMatrix: boolean[][]): [number, number] {
        const [originalTheHighestHoleY, originalTheHighestHoleCoveredY] = this.calculateTheHighestHoleCoveredY(realMatrix);
        let coveredColumnsYs = new Map<number, number>;
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
                        } else if (coveredY < originalTheHighestHoleCoveredY) {
                            holesCoveredHeightsSum += originalTheHighestHoleCoveredY - coveredY;
                        }
                    }
                }
            });
        });
        return [holesCount, holesCoveredHeightsSum];
    }

    private calculateTheHighestHoleCoveredY(matrix: boolean[][]): [number|undefined, number|undefined] {
        let theHighestHoleCoveredY = undefined;
        let theHighestHoleY = undefined;
        let coveredColumnsYs = new Map<number, number>;
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

    private calculateHeight(matrix: boolean[][]): number {
        let lowestEmptyY = -1;
        matrix.every((row, y) => {
            if (row.every(val => !val)) {
                lowestEmptyY = y;
                return true;
            } else {
                return false;
            }
        });
        return matrix.length - lowestEmptyY - 1;
    }

    private calculateTunnelsExceptUncovered(imaginableMatrix: boolean[][], realMatrix: boolean[][]): [number, number] {
        let realCoveredColumns = new Set<number>();
        realMatrix.every((row) => {
            row.forEach((val, x) => {
                if (val) {
                    realCoveredColumns.add(x);
                }
            });
        });

        let imaginableCoveredColumns = new Set<number>();
        let tunnels = new Map<number, number>;
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
                    && (x === fieldWidth - 1 || imaginableCoveredColumns.has(x + 1))
                ) {
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

    private calculateFillableSpace(matrix: boolean[][], fieldWidth: number): [number, number] {
        let coveredColumns = new Set<number>();
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
