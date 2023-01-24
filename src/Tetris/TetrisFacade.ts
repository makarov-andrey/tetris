import {GameController} from './GameController'
import {TableRenderer, TableRendererSettings} from './Renderer/TableRenderer'
import {RegularFallingFiguresProcessor} from "./FallingFiguresProcessor/RegularFallingFiguresProcessor";
import {AlwaysOneFigureSpawner} from "./FiguresSpawner/AlwaysOneFigureSpawner";
import {EventBus} from "./EventBus/EventBus";
import {CommandBus, InitGameCommand, PauseGameCommand, ResumeGameCommand} from "./CommandBus/CommandBus";
import {MovingHandler} from "./MovingHandler/MovingHandler";
import {LevelBasedTimingsHandler} from "./TimingsHandler/LevelBasedTimingsHandler";
import {FallTickScoreCounter} from "./ScoreCounter/FallTickScoreCounter";
import {SquashedRowsCounterBasedLevelCounter} from "./LevelCounter/SquashedRowsCounterBasedLevelCounter";
import {GameData} from "./Common";
import {ComboCounter} from "./ComboCounter/ComboCounter";
import {ConstTimingsHandler} from "./TimingsHandler/ConstTimingsHandler";
import {StatsCounter} from "./StatsCounter/StatsCounter";
import {KeyboardController} from "./KeyboardController/KeyboardController";

export class TetrisFacade {
    public constructor(
        private eventBus = new EventBus(),
        private commandBus = new CommandBus(),
        private gameController = new GameController(
            // new LevelBasedTimingsHandler(2000),
            new ConstTimingsHandler(2000),
            eventBus,
            commandBus,
        ),
        private movingHandler = new MovingHandler(
            commandBus,
            eventBus,
        ),
        private keyboardController = new KeyboardController(
            commandBus,
        ),
        private fallingFiguresProcessor = new RegularFallingFiguresProcessor(
            commandBus,
            eventBus
        ),
        private figuresSpawner = new AlwaysOneFigureSpawner(
            eventBus,
            commandBus,
        ),
        private levelCounter = new SquashedRowsCounterBasedLevelCounter(
            eventBus,
            commandBus,
            8,
            15,
        ),
        private comboCounter = new ComboCounter(
            commandBus,
            eventBus,
        ),
        private scoreCounter = new FallTickScoreCounter(
            commandBus,
            eventBus,
        ),
        private statsCounter = new StatsCounter(
            commandBus,
            eventBus,
        ),
        private tableRenderer = new TableRenderer(
            new TableRendererSettings(
                document.body,
            ),
            commandBus,
            eventBus
        ),
        public gameData = GameData.makeSimple(),
    ) {}

    public start(gameData?: GameData) {
        gameData = gameData || GameData.makeSimple();
        this.commandBus.run(new InitGameCommand(gameData));
        this.commandBus.run(new ResumeGameCommand(gameData));
    }

    public resume() {
        this.commandBus.run(new ResumeGameCommand(this.gameData));
    }

    public pause() {
        this.commandBus.run(new PauseGameCommand(this.gameData));
    }
}
