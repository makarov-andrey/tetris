import {TimingsHandler} from "./TimingsHandler/TimingsHandler";
import {EventBus, GameOverEvent} from "./EventBus/EventBus";
import {GameData} from "./GameData";
import {CommandBus, CommandType, FiguresFallTickCommand, InitGameCommand, PauseGameCommand, RenderCommand, ResumeGameCommand} from "./CommandBus/CommandBus";

export class GameController {
    private gameData: GameData = GameData.makeSimple();

    constructor (
        private timingsHandler: TimingsHandler,
        private eventBus: EventBus,
        private commandBus: CommandBus,
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
        this.commandBus.addHandler(CommandType.ResumeGame, this.resumeGameHandler.bind(this));
        this.commandBus.addHandler(CommandType.PauseGame, this.pauseGameHandler.bind(this));
        this.commandBus.addHandler(CommandType.GameOver, this.gameOverHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand): void {
        this.gameData = command.gameData;
        this.gameData.isInitialized = true;
    }

    private resumeGameHandler(command: ResumeGameCommand): void {
        if (this.gameData.isGameOver) {
            return;
        }
        if (!this.gameData.isInitialized) {
            this.commandBus.run(new InitGameCommand(command.gameData));
        }
        this.fallTick();
    }

    private pauseGameHandler(command: ResumeGameCommand): void {
        this.gameData = command.gameData;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.commandBus.run(new RenderCommand(this.gameData));
    }

    private gameOverHandler(): void {
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.gameData.isInitialized = false;
        this.gameData.isGameOver = true;
        this.eventBus.fire(new GameOverEvent(this.gameData));
    }

    private fallTick(): void {
        this.commandBus.run(new FiguresFallTickCommand(this.gameData));
        if (!this.gameData.isGameOver) {
            this.gameData.nextTickTimeoutId = setTimeout(
                this.fallTick.bind(this),
                this.timingsHandler.getDelayForNextTickMs(this.gameData)
            );
        }
    }
}
