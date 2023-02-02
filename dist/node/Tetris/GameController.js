"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const EventBus_1 = require("./EventBus/EventBus");
const CommandBus_1 = require("./CommandBus/CommandBus");
const Common_1 = require("./Common");
class GameController {
    timingsHandler;
    eventBus;
    commandBus;
    gameData = Common_1.GameData.makeSimple();
    constructor(timingsHandler, eventBus, commandBus) {
        this.timingsHandler = timingsHandler;
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initGameHandler.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.ResumeGame, this.resumeGameHandler.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.PauseGame, this.pauseGameHandler.bind(this));
        this.commandBus.addHandler(CommandBus_1.CommandType.GameOver, this.gameOverHandler.bind(this));
    }
    initGameHandler(command) {
        this.gameData = command.gameData;
        this.gameData.isInitialized = true;
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
    }
    resumeGameHandler(command) {
        if (this.gameData.isGameOver) {
            return;
        }
        if (!this.gameData.isInitialized) {
            this.commandBus.run(new CommandBus_1.InitGameCommand(command.gameData));
        }
        this.fallTick();
    }
    pauseGameHandler(command) {
        this.gameData = command.gameData;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.commandBus.run(new CommandBus_1.RenderCommand(this.gameData));
    }
    gameOverHandler() {
        this.gameData.isInitialized = false;
        this.gameData.isGameOver = true;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.eventBus.fire(new EventBus_1.GameOverEvent(this.gameData));
    }
    fallTick() {
        this.commandBus.run(new CommandBus_1.FiguresFallTickCommand(this.gameData));
    }
    onFallTickProcessed(event) {
        clearTimeout(this.gameData.nextTickTimeoutId);
        const delay = this.timingsHandler.getDelayForNextTickMs(this.gameData);
        if (!this.gameData.isGameOver && delay != Infinity) {
            this.gameData.nextTickTimeoutId = setTimeout(this.fallTick.bind(this), this.timingsHandler.getDelayForNextTickMs(this.gameData));
        }
    }
}
exports.GameController = GameController;
