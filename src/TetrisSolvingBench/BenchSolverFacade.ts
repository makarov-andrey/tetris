import {EventBus} from "../Tetris/EventBus/EventBus";
import {CommandBus, InitGameCommand, PauseGameCommand, ResumeGameCommand} from "../Tetris/CommandBus/CommandBus";
import {GameController} from "../Tetris/GameController";
import {MovingHandler} from "../Tetris/MovingHandler/MovingHandler";
import {AlwaysOneFigureSpawner} from "../Tetris/FiguresSpawner/AlwaysOneFigureSpawner";
import {StatsCounter} from "../Tetris/StatsCounter/StatsCounter";
import {GameData} from "../Tetris/Common";
import {ConstTimingsHandler} from "../Tetris/TimingsHandler/ConstTimingsHandler";
import {TetrisSolver} from "../TetrisSolver/TetrisSolver";
import {FigurePlacingResolver} from "../TetrisSolver/FigurePlacingResolver/FigurePlacingResolver";
import {CalculatorAggregate} from "../TetrisSolver/ScoreCalculator/CalculatorAggregate";
import {FillableCellsCalculator} from "../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator";
import {FilledHeightCalculator} from "../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {HolesV1Calculator} from "../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator";
import {SquashedRowsCalculator} from "../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {TunnelsCalculator} from "../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator";
import {InstantFigurePlacingPerformer} from "../TetrisSolver/FigurePlacingPerformer/InstantFigurePlacingPerformer";
import {RegularFallingFiguresProcessor} from "../Tetris/FallingFiguresProcessor/RegularFallingFiguresProcessor";
import {SolverRunParameters} from "../TetrisSolver/Common";
import {SolverCommandBus} from "../TetrisSolver/CommandBus/CommandBus";

export class BenchSolverFacade {
    public constructor(
        private solverRunParameters: SolverRunParameters,
        private eventBus = new EventBus(),
        private commandBus = new CommandBus(),
        private gameController = new GameController(
            new ConstTimingsHandler(Infinity),
            eventBus,
            commandBus,
        ),
        private movingHandler = new MovingHandler(
            commandBus,
            eventBus,
        ),
        private fallingFiguresProcessor = new RegularFallingFiguresProcessor(
            commandBus,
            eventBus
        ),
        private figuresSpawner = new AlwaysOneFigureSpawner(
            eventBus,
            commandBus,
        ),
        private statsCounter = new StatsCounter(
            commandBus,
            eventBus,
        ),
        public gameData = GameData.makeSimple(),
        public tetrisSolver = new TetrisSolver(
            eventBus,
            commandBus,
            new SolverCommandBus(),
            new FigurePlacingResolver(
                commandBus,
                new CalculatorAggregate([
                    new FillableCellsCalculator(solverRunParameters.fillableCellsCalculatorParams),
                    new FilledHeightCalculator(solverRunParameters.filledHeightCalculatorParams),
                    new HolesV1Calculator(solverRunParameters.holesV1CalculatorParams),
                    new SquashedRowsCalculator(solverRunParameters.squashedRowsCalculatorParams),
                    new TunnelsCalculator(solverRunParameters.tunnelsCalculatorParams),
                ]),
            ),
            new InstantFigurePlacingPerformer(commandBus),
        )
    ) {}

    public start(gameData?: GameData) {
        this.gameData = gameData || GameData.makeSimple();
        this.commandBus.run(new InitGameCommand(this.gameData));
        this.commandBus.run(new ResumeGameCommand(this.gameData));
    }

    public pause() {
        this.commandBus.run(new PauseGameCommand(this.gameData));
    }
}
