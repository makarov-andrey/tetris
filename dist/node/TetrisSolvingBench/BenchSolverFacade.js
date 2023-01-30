"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchSolverFacade = void 0;
const EventBus_1 = require("../Tetris/EventBus/EventBus");
const CommandBus_1 = require("../Tetris/CommandBus/CommandBus");
const GameController_1 = require("../Tetris/GameController");
const MovingHandler_1 = require("../Tetris/MovingHandler/MovingHandler");
const AlwaysOneFigureSpawner_1 = require("../Tetris/FiguresSpawner/AlwaysOneFigureSpawner");
const StatsCounter_1 = require("../Tetris/StatsCounter/StatsCounter");
const Common_1 = require("../Tetris/Common");
const ConstTimingsHandler_1 = require("../Tetris/TimingsHandler/ConstTimingsHandler");
const TetrisSolver_1 = require("../TetrisSolver/TetrisSolver");
const FigurePlacingResolver_1 = require("../TetrisSolver/FigurePlacingResolver/FigurePlacingResolver");
const CalculatorAggregate_1 = require("../TetrisSolver/ScoreCalculator/CalculatorAggregate");
const FillableCellsCalculator_1 = require("../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator");
const FilledHeightCalculator_1 = require("../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator");
const HolesV1Calculator_1 = require("../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator");
const SquashedRowsCalculator_1 = require("../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator");
const TunnelsCalculator_1 = require("../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator");
const InstantFigurePlacingPerformer_1 = require("../TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer");
const RegularFallingFiguresProcessor_1 = require("../Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor");
class BenchSolverFacade {
    benchRunParameters;
    eventBus;
    commandBus;
    gameController;
    movingHandler;
    fallingFiguresProcessor;
    figuresSpawner;
    statsCounter;
    gameData;
    tetrisSolver;
    constructor(benchRunParameters, eventBus = new EventBus_1.EventBus(), commandBus = new CommandBus_1.CommandBus(), gameController = new GameController_1.GameController(new ConstTimingsHandler_1.ConstTimingsHandler(Infinity), eventBus, commandBus), movingHandler = new MovingHandler_1.MovingHandler(commandBus, eventBus), fallingFiguresProcessor = new RegularFallingFiguresProcessor_1.RegularFallingFiguresProcessor(commandBus, eventBus), figuresSpawner = new AlwaysOneFigureSpawner_1.AlwaysOneFigureSpawner(eventBus, commandBus), statsCounter = new StatsCounter_1.StatsCounter(commandBus, eventBus), gameData = Common_1.GameData.makeSimple(), tetrisSolver = new TetrisSolver_1.TetrisSolver(eventBus, commandBus, new FigurePlacingResolver_1.FigurePlacingResolver(commandBus, new CalculatorAggregate_1.CalculatorAggregate([
        new FillableCellsCalculator_1.FillableCellsCalculator(benchRunParameters.fillableCellsCalculatorParams),
        new FilledHeightCalculator_1.FilledHeightCalculator(benchRunParameters.filledHeightCalculatorParams),
        new HolesV1Calculator_1.HolesV1Calculator(benchRunParameters.holesV1CalculatorParams),
        new SquashedRowsCalculator_1.SquashedRowsCalculator(benchRunParameters.squashedRowsCalculatorParams),
        new TunnelsCalculator_1.TunnelsCalculator(benchRunParameters.tunnelsCalculatorParams),
    ])), new InstantFigurePlacingPerformer_1.InstantFigurePlacingPerformer(commandBus))) {
        this.benchRunParameters = benchRunParameters;
        this.eventBus = eventBus;
        this.commandBus = commandBus;
        this.gameController = gameController;
        this.movingHandler = movingHandler;
        this.fallingFiguresProcessor = fallingFiguresProcessor;
        this.figuresSpawner = figuresSpawner;
        this.statsCounter = statsCounter;
        this.gameData = gameData;
        this.tetrisSolver = tetrisSolver;
    }
    start(gameData) {
        this.gameData = gameData || Common_1.GameData.makeSimple();
        this.commandBus.run(new CommandBus_1.InitGameCommand(this.gameData));
        this.commandBus.run(new CommandBus_1.ResumeGameCommand(this.gameData));
    }
    pause() {
        this.commandBus.run(new CommandBus_1.PauseGameCommand(this.gameData));
    }
}
exports.BenchSolverFacade = BenchSolverFacade;
//# sourceMappingURL=BenchSolverFacade.js.map