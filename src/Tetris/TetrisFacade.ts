import {GameController} from './GameController'
import {TableRenderer, TableRendererSettings} from './Renderer/TableRenderer'
import {ConstTimingsHandler} from "./TimingsHandler/ConstTimingsHandler";
import {RegularFallingFiguresProcessor} from "./FallingFiguresProcessor/RegularFallingFiguresProcessor";
import {AlwaysOneFigureSpawner} from "./FiguresSpawner/AlwaysOneFigureSpawner";
import {EventBus} from "./EventBus/EventBus";
import {CommandBus, InitGameCommand, PauseGameCommand, ResumeGameCommand} from "./CommandBus/CommandBus";
import {GameData} from "./GameData";
import {MovingHandler} from "./MovingHandler/MovingHandler";
import {MovingController} from "./MovingController/MovingController";
import {ReducingTimingsHandler} from "./TimingsHandler/ReducingTimingsHandler";

export class TetrisFacade {
    private eventBus = new EventBus();
    private commandBus = new CommandBus();
    private gameController = new GameController(
        new ReducingTimingsHandler(this.eventBus, this.commandBus, 500, 10, 0.7),
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
    private tableRenderer = new TableRenderer(
        new TableRendererSettings(
            document.body,
        ),
        this.commandBus,
        this.eventBus
    );
    private fallingFiguresProcessor = new RegularFallingFiguresProcessor(
        this.commandBus,
        this.eventBus
    );
    private figuresSpawner = new AlwaysOneFigureSpawner(
        this.eventBus,
        this.commandBus,
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
