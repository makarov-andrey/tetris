"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisSolver = void 0;
const EventBus_1 = require("../Tetris/EventBus/EventBus");
const CommandBus_1 = require("../Tetris/CommandBus/CommandBus");
class TetrisSolver {
    eventBus;
    commandBus;
    figurePlacingResolver;
    figurePlacingPerformer;
    constructor(eventBus, commandBus, figurePlacingResolver, figurePlacingPerformer) {
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.figurePlacingResolver = figurePlacingResolver;
        this.figurePlacingPerformer = figurePlacingPerformer;
        this.commandBus.addHandler(CommandBus_1.CommandType.InitGame, this.initGameHandler.bind(this));
    }
    initGameHandler(command) {
        this.eventBus.on(EventBus_1.EventType.FiguresSpawned, this.onFiguresSpawned.bind(this));
    }
    onFiguresSpawned(event) {
        const targetFallingFiguresStates = this.figurePlacingResolver.resolve(event.gameData);
        this.figurePlacingPerformer.place(event.gameData, targetFallingFiguresStates);
    }
}
exports.TetrisSolver = TetrisSolver;
//# sourceMappingURL=TetrisSolver.js.map