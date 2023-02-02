"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolesHelper = void 0;
const Common_1 = require("../Common");
const Common_2 = require("../../Tetris/Common");
const FigurePlacingChecker_1 = require("../../Tetris/Utils/FigurePlacingChecker");
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
                    processingHole.cells.push(new Common_2.Coordinate(x, y));
                    processingHole.continues = true;
                    processingHole.isOpened = processingHole.isOpened
                        || this.doesTheWayOutFromHoleExists(matrix, new Common_2.Coordinate(x, y), coveredColumns, [[true, true]]);
                }
            });
            let holesInProgressToRemove = [];
            holesInProcess.forEach((hole, i) => {
                if (hole.continues) {
                    hole.previousRowOpenXs = hole.currentRowOpenXs;
                    hole.currentRowOpenXs = [];
                }
                if (!hole.continues || y == matrix.length - 1) {
                    holes.push(new Common_1.Hole(hole.isOpened, hole.cells));
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
            if (!FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Common_2.Coordinate(x, initialCoordinate.y), matrix)) {
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
            if (!FigurePlacingChecker_1.FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Common_2.Coordinate(x, initialCoordinate.y), matrix)) {
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
exports.HolesHelper = HolesHelper;
