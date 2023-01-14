import {Coordinate} from "../Common";

export class FigurePlacingChecker {
    public static canFigureBePlaced(targetFigureMatrix: boolean[][], targetPosition: Coordinate, matrix: boolean[][]): boolean {
        return targetFigureMatrix.every((row, y) => {
            return row.every((value, x) => {
                const realY = targetPosition.y + y;
                const realX = targetPosition.x + x;
                return !value
                    || (
                        realY < 0
                        && realX >= 0
                        && realX <= matrix[0].length - 1
                    ) || (
                        realY in matrix
                        && realX in matrix[realY]
                        && !matrix[realY][realX]
                    );
            });
        });
    }
}
