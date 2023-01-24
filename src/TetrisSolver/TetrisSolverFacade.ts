import {EventBus} from "../Tetris/EventBus/EventBus";
import {CommandBus} from "../Tetris/CommandBus/CommandBus";
import {FigurePlacingResolver} from "./FigurePlacingResolver/FigurePlacingResolver";
import {AnimatedFigurePlacingPerformer} from "./FigurePlacingPerformer/AnimatedFigurePlacingPerformer";
import {CalculatorAggregate} from "./ScoreCalculator/CalculatorAggregate";
import {SquashedRowsCalculator} from "./ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {FillableCellsCalculator} from "./ScoreCalculator/FillableCells/FillableCellsCalculator";
import {HolesV1Calculator} from "./ScoreCalculator/Holes/HolesV1Calculator";
import {HolesV2Calculator} from "./ScoreCalculator/Holes/HolesV2Calculator";
import {FilledHeightCalculator} from "./ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {TunnelsCalculator} from "./ScoreCalculator/Tunnels/TunnelsCalculator";
import {TetrisSolver} from "./TetrisSolver";
import {LevelBasedTimingsHandler} from "../Tetris/TimingsHandler/LevelBasedTimingsHandler";
import {InstantFigurePlacingPerformer} from "./FigurePlacingPerformer/InstantFigurePlacingPerformer";

export class TetrisSolverFacade {
    static initSolver(
        eventBus: EventBus,
        commandBus: CommandBus,
    ) {
        return new TetrisSolver(
            eventBus,
            commandBus,
            new FigurePlacingResolver(
                commandBus,
                new CalculatorAggregate([
                    new FillableCellsCalculator(),
                    new FilledHeightCalculator(),
                    new HolesV1Calculator(),
                    new SquashedRowsCalculator(),
                    new TunnelsCalculator(),
                ]),
            ),
            // new AnimatedFigurePlacingPerformer(
            //     commandBus,
            //     new LevelBasedTimingsHandler(100, 0.9),
            // ),
            new InstantFigurePlacingPerformer(commandBus),
        )
    }
}
