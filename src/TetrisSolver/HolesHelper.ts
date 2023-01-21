import {Coordinate, GameData} from "../Tetris/Common";
import {FigurePlacingChecker} from "../Tetris/Utils/FigurePlacingChecker";

export class Hole {
    constructor(
        public isOpened: boolean,
        public cells: Coordinate[],
    ) {}
}

export class HolesHelper {
    public collectHoles(matrix: boolean[][]): Hole[] {
        let holes: Hole[] = [];
        class HoleInProcess {
            constructor(
                public cells: Coordinate[] = [],
                public previousRowOpenXs: number[] = [],
                public currentRowOpenXs: number[] = [],
                public isOpened: boolean = false,
                public continues: boolean = false,
            ) {}
        }
        let holesInProcess: HoleInProcess[] = [];
        let coveredColumns: Set<number> = new Set();
        matrix.forEach((row, y) => {
            holesInProcess.forEach(hole => hole.continues = false);
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                } else if (coveredColumns.has(x)) {
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
                    processingHole.cells.push(new Coordinate(x, y));
                    processingHole.continues = true;
                    processingHole.isOpened = processingHole.isOpened
                        || this.doesTheWayOutFromHoleExists(matrix, new Coordinate(x, y), coveredColumns);
                }
            });
            let holesInProgressToRemove: number[] = [];
            holesInProcess.forEach((hole, i) => {
                if (hole.continues) {
                    hole.previousRowOpenXs = hole.currentRowOpenXs;
                    hole.currentRowOpenXs = [];
                }
                if (!hole.continues || y == matrix.length - 1) {
                    holes.push(new Hole(
                        hole.isOpened,
                        hole.cells,
                    ));
                    holesInProgressToRemove.push(i);
                }
            });
            holesInProgressToRemove.reverse().forEach(i => holesInProcess.splice(i, 1));
        });
        return holes;
    }

    public doesTheWayOutFromHoleExists(matrix: boolean[][], initialCoordinate: Coordinate, coveredColumns: Set<number>, figureMatrix: boolean[][] = [[true]]) {
        return this.findTheWayOutFromHole(matrix, initialCoordinate, coveredColumns, figureMatrix) !== undefined;
    }

    public findTheWayOutFromHole(matrix: boolean[][], initialCoordinate: Coordinate, coveredColumns: Set<number>, figureMatrix: boolean[][] = [[true]]): number|undefined {
        // trying to find the way out from the left side
        for (let x = initialCoordinate.x - 1; x >= 0; x--) {
            if (!FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Coordinate(x, initialCoordinate.y), matrix)) {
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
            if (!FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Coordinate(x, initialCoordinate.y), matrix)) {
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

    public collectCoveredColumns(matrix: boolean[][], toY?: number): Set<number> {
        let coveredColumns: Set<number> = new Set();
        matrix.some((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                }
            });
            return (toY !== undefined && y >= toY)
                || coveredColumns.size == matrix[0].length;
        });
        return coveredColumns;
    }
}
