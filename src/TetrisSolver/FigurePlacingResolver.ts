import {Coordinate, FallingFigure, GameData} from "../Tetris/Common";
import {EnumHelper} from "../Tetris/Utils/EnumHelper";
import {FigureTurnState} from "../Tetris/Figures";
import {FigurePlacingChecker} from "../Tetris/Utils/FigurePlacingChecker";
import {CommandBus, RenderCommand} from "../Tetris/CommandBus/CommandBus";
import {ScoreCalculator} from "./ScoreCalculator";
import {FigurePlacingResult, PushInDirection} from "./Common";

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
        let theBestResult = new FigurePlacingResult(new Map(), undefined);

        this.processStates(gameData, (fakeFigure: FallingFigure, score: number, pushInDirection: PushInDirection|undefined) => {
            if (score > maxScore) {
                maxScore = score;
                theBestResult = new FigurePlacingResult(
                    new Map([[originalFigure, fakeFigure]]),
                    pushInDirection
                );
            }
        })

        let debugMode = 'debugMode' in window && window.debugMode;
        let fakeFigure = theBestResult.figuresTargetStates.get(originalFigure);
        if (debugMode && fakeFigure !== undefined) {
            let fakeGameData = structuredClone(gameData);
            fakeFigure.color = '#f00';
            fakeGameData.fallingFigures = [fakeFigure];
            this.commandBus.run(new RenderCommand(fakeGameData));

            this.processStates(gameData, (fakeFigure: FallingFigure, score: number, pushInDirection: PushInDirection|undefined) => {
                fakeFigure.color = '#00f';
                fakeGameData.fallingFigures = [fakeFigure];
                this.commandBus.run(new RenderCommand(fakeGameData));
            })
        }

        return theBestResult;
    }

    private processStates(gameData: GameData, callback: (fakeFigure: FallingFigure, score: number, pushInDirection: PushInDirection|undefined) => void) {
        const originalFigure = gameData.fallingFigures[0];

        let enums = EnumHelper.ToArray(FigureTurnState);
        while (enums[0] !== originalFigure.turnState) {
            enums.unshift(enums.pop());
        }
        let matrices: Map<FigureTurnState, boolean[][]> = new Map();
        enums.forEach(turnState => {
            matrices.set(turnState, originalFigure.figure.getTurn(turnState));
        });

        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let [y, imaginableMatrix] = this.imagineFigureDrop(gameData.matrix, figureMatrix, x);
                let squashedLinesCount = this.squashLines(imaginableMatrix);
                let score = this.scoreCalculator.calculateScore(gameData, imaginableMatrix, squashedLinesCount);
                let fakeFigure = new FallingFigure(originalFigure.figure, new Coordinate(x, y), turnState);
                callback(fakeFigure, score, undefined);
            }
        });

        matrices.forEach((figureMatrix, turnState) => {
            for (let x = 0; x < gameData.settings.fieldWidth - figureMatrix[0].length + 1; x++) {
                let imaginableResult = this.imagineFigurePushIn(gameData.matrix, figureMatrix, x);
                if (imaginableResult === undefined) {
                    continue;
                }
                let [y, imaginableMatrix, pushInDirection] = imaginableResult;
                let squashedLinesCount = this.squashLines(imaginableMatrix);
                let score = this.scoreCalculator.calculateScore(gameData, imaginableMatrix, squashedLinesCount);
                let fakeFigure = new FallingFigure(originalFigure.figure, new Coordinate(x, y), turnState);
                callback(fakeFigure, score, pushInDirection);
            }
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
        let imaginableMatrix: boolean[][] = structuredClone(gameMatrix);
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

    private imagineFigurePushIn(matrix: boolean[][], figureMatrix: boolean[][], x: number): [number, boolean[][], PushInDirection]|undefined {
        return undefined;
    }
}
