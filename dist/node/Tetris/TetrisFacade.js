"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisFacade = void 0;
const GameController_1 = require("./GameController");
const TableRenderer_1 = require("./Renderer/TableRenderer");
const RegularFallingFiguresProcessor_1 = require("./FallingFiguresProcessor/RegularFallingFiguresProcessor");
const AlwaysOneFigureSpawner_1 = require("./FiguresSpawner/AlwaysOneFigureSpawner");
const EventBus_1 = require("./EventBus/EventBus");
const CommandBus_1 = require("./CommandBus/CommandBus");
const MovingHandler_1 = require("./MovingHandler/MovingHandler");
const FallTickScoreCounter_1 = require("./ScoreCounter/FallTickScoreCounter");
const SquashedRowsCounterBasedLevelCounter_1 = require("./LevelCounter/SquashedRowsCounterBasedLevelCounter");
const Common_1 = require("./Common");
const ComboCounter_1 = require("./ComboCounter/ComboCounter");
const ConstTimingsHandler_1 = require("./TimingsHandler/ConstTimingsHandler");
const StatsCounter_1 = require("./StatsCounter/StatsCounter");
const KeyboardController_1 = require("./KeyboardController/KeyboardController");
class TetrisFacade {
    eventBus;
    commandBus;
    gameController;
    movingHandler;
    keyboardController;
    fallingFiguresProcessor;
    figuresSpawner;
    levelCounter;
    comboCounter;
    scoreCounter;
    statsCounter;
    tableRenderer;
    gameData;
    constructor(eventBus = new EventBus_1.EventBus(), commandBus = new CommandBus_1.CommandBus(), gameController = new GameController_1.GameController(
    // new LevelBasedTimingsHandler(2000),
    new ConstTimingsHandler_1.ConstTimingsHandler(2000), eventBus, commandBus), movingHandler = new MovingHandler_1.MovingHandler(commandBus, eventBus), keyboardController = new KeyboardController_1.KeyboardController(commandBus), fallingFiguresProcessor = new RegularFallingFiguresProcessor_1.RegularFallingFiguresProcessor(commandBus, eventBus), figuresSpawner = new AlwaysOneFigureSpawner_1.AlwaysOneFigureSpawner(eventBus, commandBus), levelCounter = new SquashedRowsCounterBasedLevelCounter_1.SquashedRowsCounterBasedLevelCounter(eventBus, commandBus, 8, 15), comboCounter = new ComboCounter_1.ComboCounter(commandBus, eventBus), scoreCounter = new FallTickScoreCounter_1.FallTickScoreCounter(commandBus, eventBus), statsCounter = new StatsCounter_1.StatsCounter(commandBus, eventBus), tableRenderer = new TableRenderer_1.TableRenderer(new TableRenderer_1.TableRendererSettings(document.body), commandBus, eventBus), gameData = Common_1.GameData.makeSimple()) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.gameController = gameController;
        this.movingHandler = movingHandler;
        this.keyboardController = keyboardController;
        this.fallingFiguresProcessor = fallingFiguresProcessor;
        this.figuresSpawner = figuresSpawner;
        this.levelCounter = levelCounter;
        this.comboCounter = comboCounter;
        this.scoreCounter = scoreCounter;
        this.statsCounter = statsCounter;
        this.tableRenderer = tableRenderer;
        this.gameData = gameData;
    }
    start(gameData) {
        gameData = gameData || Common_1.GameData.makeSimple();
        this.commandBus.run(new CommandBus_1.InitGameCommand(gameData));
        this.commandBus.run(new CommandBus_1.ResumeGameCommand(gameData));
    }
    resume() {
        this.commandBus.run(new CommandBus_1.ResumeGameCommand(this.gameData));
    }
    pause() {
        this.commandBus.run(new CommandBus_1.PauseGameCommand(this.gameData));
    }
}
exports.TetrisFacade = TetrisFacade;
