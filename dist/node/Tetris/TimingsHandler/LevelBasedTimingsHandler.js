"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelBasedTimingsHandler = void 0;
class LevelBasedTimingsHandler {
    initialDelayMs;
    base;
    constructor(initialDelayMs, base = 0.8) {
        this.initialDelayMs = initialDelayMs;
        this.base = base;
    }
    getDelayForNextTickMs(gameData) {
        return Math.pow(this.base - (gameData.level - 1) * 0.007, gameData.level - 1) * this.initialDelayMs;
    }
}
exports.LevelBasedTimingsHandler = LevelBasedTimingsHandler;
