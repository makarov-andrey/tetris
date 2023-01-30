"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlwaysOneFigureSpawner = void 0;
const EventBus_1 = require("../EventBus/EventBus");
const Figures_1 = require("../Figures");
const Common_1 = require("../Common");
const CommandBus_1 = require("../CommandBus/CommandBus");
const EnumHelper_1 = require("../Utils/EnumHelper");
class AlwaysOneFigureSpawner {
    eventBus;
    commandBus;
    constructor(eventBus, commandBus) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initHandler.bind(this));
    }
    initHandler(event) {
        this.eventBus.on(EventBus_1.EventType.FallingTickProcessed, this.processOnFallTick.bind(this));
    }
    processOnFallTick(event) {
        this.addFigure(event.gameData);
    }
    addFigure(gameData) {
        if (gameData.fallingFigures.length > 0 || gameData.isGameOver) {
            return;
        }
        const figureIndex = Math.floor(Math.random() * gameData.settings.figures.length);
        const figure = gameData.settings.figures[figureIndex];
        const turnState = EnumHelper_1.EnumHelper.GetRandom(Figures_1.FigureTurnState);
        const figureMatrix = figure.getTurn(turnState);
        const figureWidth = Math.max(...figureMatrix.map(row => row.length));
        const coordinate = new Common_1.Coordinate(Math.ceil(gameData.settings.fieldWidth / 2 - figureWidth / 2) - 1, -figureMatrix.length);
        const fallingFigure = new Common_1.FallingFigure(figure, coordinate, turnState);
        gameData.fallingFigures.push(fallingFigure);
        this.eventBus.fire(new EventBus_1.FiguresSpawnedEvent(gameData, [fallingFigure]));
    }
}
exports.AlwaysOneFigureSpawner = AlwaysOneFigureSpawner;
//# sourceMappingURL=AlwaysOneFigureSpawner.js.map