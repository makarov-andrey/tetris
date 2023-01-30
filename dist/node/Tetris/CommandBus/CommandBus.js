"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBus = exports.DropFiguresCommand = exports.TurnToStateCommand = exports.MoveToYCommand = exports.MoveToXCommand = exports.MoveDownCommand = exports.TurnClockwiseCommand = exports.MoveRightCommand = exports.MoveLeftCommand = exports.RenderCommand = exports.GameOverCommand = exports.FiguresFallTickCommand = exports.PauseGameCommand = exports.ResumeGameCommand = exports.InitGameCommand = exports.CommandType = void 0;
var CommandType;
(function (CommandType) {
    CommandType[CommandType["InitGame"] = 0] = "InitGame";
    CommandType[CommandType["ResumeGame"] = 1] = "ResumeGame";
    CommandType[CommandType["PauseGame"] = 2] = "PauseGame";
    CommandType[CommandType["FiguresFallTick"] = 3] = "FiguresFallTick";
    CommandType[CommandType["GameOver"] = 4] = "GameOver";
    CommandType[CommandType["Render"] = 5] = "Render";
    CommandType[CommandType["MoveLeft"] = 6] = "MoveLeft";
    CommandType[CommandType["MoveRight"] = 7] = "MoveRight";
    CommandType[CommandType["TurnClockwise"] = 8] = "TurnClockwise";
    CommandType[CommandType["MoveDown"] = 9] = "MoveDown";
    CommandType[CommandType["FiguresFallDown"] = 10] = "FiguresFallDown";
    CommandType[CommandType["MoveToX"] = 11] = "MoveToX";
    CommandType[CommandType["MoveToY"] = 12] = "MoveToY";
    CommandType[CommandType["TurnToState"] = 13] = "TurnToState";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
class InitGameCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.InitGame;
    }
}
exports.InitGameCommand = InitGameCommand;
class ResumeGameCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.ResumeGame;
    }
}
exports.ResumeGameCommand = ResumeGameCommand;
class PauseGameCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.PauseGame;
    }
}
exports.PauseGameCommand = PauseGameCommand;
class FiguresFallTickCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.FiguresFallTick;
    }
}
exports.FiguresFallTickCommand = FiguresFallTickCommand;
class GameOverCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.GameOver;
    }
}
exports.GameOverCommand = GameOverCommand;
class RenderCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.Render;
    }
}
exports.RenderCommand = RenderCommand;
class MoveLeftCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.MoveLeft;
    }
}
exports.MoveLeftCommand = MoveLeftCommand;
class MoveRightCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.MoveRight;
    }
}
exports.MoveRightCommand = MoveRightCommand;
class TurnClockwiseCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.TurnClockwise;
    }
}
exports.TurnClockwiseCommand = TurnClockwiseCommand;
class MoveDownCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.MoveDown;
    }
}
exports.MoveDownCommand = MoveDownCommand;
class MoveToXCommand {
    gameData;
    x;
    constructor(gameData, x) {
        this.gameData = gameData;
        this.x = x;
    }
    getCommandType() {
        return CommandType.MoveToX;
    }
}
exports.MoveToXCommand = MoveToXCommand;
class MoveToYCommand {
    gameData;
    y;
    constructor(gameData, y) {
        this.gameData = gameData;
        this.y = y;
    }
    getCommandType() {
        return CommandType.MoveToY;
    }
}
exports.MoveToYCommand = MoveToYCommand;
class TurnToStateCommand {
    gameData;
    turnState;
    constructor(gameData, turnState) {
        this.gameData = gameData;
        this.turnState = turnState;
    }
    getCommandType() {
        return CommandType.TurnToState;
    }
}
exports.TurnToStateCommand = TurnToStateCommand;
class DropFiguresCommand {
    gameData;
    constructor(gameData) {
        this.gameData = gameData;
    }
    getCommandType() {
        return CommandType.FiguresFallDown;
    }
}
exports.DropFiguresCommand = DropFiguresCommand;
class CommandBus {
    handlers = new Map();
    addHandler(event, handler, unique = true) {
        let handlers = this.handlers.get(event) || [];
        if (unique && handlers.some(boundHandler => boundHandler === handler)) {
            return;
        }
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }
    removeHandler(event, handler) {
        let handlers = this.handlers.get(event) || [];
        let index = handlers.indexOf(handler);
        if (index > 0) {
            handlers.splice(index, 1);
        }
        this.handlers.set(event, handlers);
    }
    run(payload) {
        let handlers = this.handlers.get(payload.getCommandType()) || [];
        handlers.forEach(handler => { handler(payload); });
    }
}
exports.CommandBus = CommandBus;
//# sourceMappingURL=CommandBus.js.map