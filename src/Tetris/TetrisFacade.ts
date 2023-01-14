import {GameController} from './GameController'
import {TableRenderer, TableRendererSettings} from './Renderer/TableRenderer'
import {RegularFallingFiguresProcessor} from "./FallingFiguresProcessor/RegularFallingFiguresProcessor";
import {AlwaysOneFigureSpawner} from "./FiguresSpawner/AlwaysOneFigureSpawner";
import {EventBus} from "./EventBus/EventBus";
import {CommandBus, InitGameCommand, PauseGameCommand, ResumeGameCommand} from "./CommandBus/CommandBus";
import {MovingHandler} from "./MovingHandler/MovingHandler";
import {MovingController} from "./MovingController/MovingController";
import {LevelBasedTimingsHandler} from "./TimingsHandler/LevelBasedTimingsHandler";
import {FallTickScoreCounter} from "./ScoreCounter/FallTickScoreCounter";
import {SquashedRowsCounterBasedLevelCounter} from "./LevelCounter/SquashedRowsCounterBasedLevelCounter";
import {GameData} from "./Common";
import {ComboCounter} from "./ComboCounter/ComboCounter";

export class TetrisFacade {
    private eventBus = new EventBus();
    private commandBus = new CommandBus();
    private gameController = new GameController(
        new LevelBasedTimingsHandler(2000),
        this.eventBus,
        this.commandBus,
    );
    private movingHandler = new MovingHandler(
        this.commandBus,
        this.eventBus,
    );
    private movingController = new MovingController(
        this.commandBus,
    );
    private fallingFiguresProcessor = new RegularFallingFiguresProcessor(
        this.commandBus,
        this.eventBus
    );
    private figuresSpawner = new AlwaysOneFigureSpawner(
        this.eventBus,
        this.commandBus,
    );
    private levelCounter = new SquashedRowsCounterBasedLevelCounter(
        this.eventBus,
        this.commandBus,
        8,
        15,
    );
    private comboCounter = new ComboCounter(
        this.commandBus,
        this.eventBus,
    );
    private scoreCounter = new FallTickScoreCounter(
        this.commandBus,
        this.eventBus,
    );
    private tableRenderer = new TableRenderer(
        new TableRendererSettings(
            document.body,
        ),
        this.commandBus,
        this.eventBus
    );
    public gameData = GameData.makeSimple();

    public start(gameData?: GameData) {
        this.gameData = gameData || GameData.makeSimple();
        this.commandBus.run(new InitGameCommand(this.gameData));
        this.commandBus.run(new ResumeGameCommand(this.gameData));
    }

    public resume() {
        this.commandBus.run(new ResumeGameCommand(this.gameData));
    }

    public pause() {
        this.commandBus.run(new PauseGameCommand(this.gameData));
    }
}
