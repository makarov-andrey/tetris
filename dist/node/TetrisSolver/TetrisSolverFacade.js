"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisSolverFacade = void 0;
const FigurePlacingResolver_1 = require("./FigurePlacingResolver/FigurePlacingResolver");
const CalculatorAggregate_1 = require("./ScoreCalculator/CalculatorAggregate");
const SquashedRowsCalculator_1 = require("./ScoreCalculator/SquashedRows/SquashedRowsCalculator");
const FillableCellsCalculator_1 = require("./ScoreCalculator/FillableCells/FillableCellsCalculator");
const HolesV1Calculator_1 = require("./ScoreCalculator/Holes/HolesV1Calculator");
const FilledHeightCalculator_1 = require("./ScoreCalculator/FilledHeight/FilledHeightCalculator");
const TunnelsCalculator_1 = require("./ScoreCalculator/Tunnels/TunnelsCalculator");
const TetrisSolver_1 = require("./TetrisSolver");
const InstantFigurePlacingPerformer_1 = require("./FigurePlacingPerformer/InstantFigurePlacingPerformer");
class TetrisSolverFacade {
    static initSolver(eventBus, commandBus) {
        return new TetrisSolver_1.TetrisSolver(eventBus, commandBus, new FigurePlacingResolver_1.FigurePlacingResolver(commandBus, new CalculatorAggregate_1.CalculatorAggregate([
            new FillableCellsCalculator_1.FillableCellsCalculator(),
            new FilledHeightCalculator_1.FilledHeightCalculator(),
            new HolesV1Calculator_1.HolesV1Calculator(),
            new SquashedRowsCalculator_1.SquashedRowsCalculator(),
            new TunnelsCalculator_1.TunnelsCalculator(),
        ])), 
        // new AnimatedFigurePlacingPerformer(
        //     commandBus,
        //     new LevelBasedTimingsHandler(100, 0.9),
        // ),
        new InstantFigurePlacingPerformer_1.InstantFigurePlacingPerformer(commandBus));
    }
}
exports.TetrisSolverFacade = TetrisSolverFacade;
