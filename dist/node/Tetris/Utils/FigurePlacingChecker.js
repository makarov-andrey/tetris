"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigurePlacingChecker = void 0;
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
exports.FigurePlacingChecker = FigurePlacingChecker;
//# sourceMappingURL=FigurePlacingChecker.js.map