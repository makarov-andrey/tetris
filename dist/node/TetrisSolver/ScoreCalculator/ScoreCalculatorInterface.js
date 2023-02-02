"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateScoreRequest = void 0;
class CalculateScoreRequest {
    gameData;
    originalHoles;
    originalCoveredColumns;
    imaginableMatrix;
    imaginableCoveredColumns;
    squashedLinesCount;
    constructor(gameData, originalHoles, originalCoveredColumns, imaginableMatrix, imaginableCoveredColumns, squashedLinesCount) {
        this.gameData = gameData;
        this.originalHoles = originalHoles;
        this.originalCoveredColumns = originalCoveredColumns;
        this.imaginableMatrix = imaginableMatrix;
        this.imaginableCoveredColumns = imaginableCoveredColumns;
        this.squashedLinesCount = squashedLinesCount;
    }
}
exports.CalculateScoreRequest = CalculateScoreRequest;
