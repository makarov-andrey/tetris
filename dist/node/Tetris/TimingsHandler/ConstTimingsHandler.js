"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstTimingsHandler = void 0;
class ConstTimingsHandler {
    delayMs;
    constructor(delayMs) {
        this.delayMs = delayMs;
    }
    getDelayForNextTickMs(gameData) {
        return this.delayMs;
    }
}
exports.ConstTimingsHandler = ConstTimingsHandler;
