import {TimingsHandler} from "./TimingsHandler/TimingsHandler";
import {EventBus, EventType, FallTickProcessedEvent, FiguresMovedEvent, GameOverEvent} from "./EventBus/EventBus";
import {CommandBus, CommandType, FiguresFallTickCommand, InitGameCommand, PauseGameCommand, RenderCommand, ResumeGameCommand} from "./CommandBus/CommandBus";
import {GameData} from "./Common";

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
        this.eventBus.on(EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
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

    private pauseGameHandler(command: PauseGameCommand): void {
        this.gameData = command.gameData;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.commandBus.run(new RenderCommand(this.gameData));
    }

    private gameOverHandler(): void {
        this.gameData.isInitialized = false;
        this.gameData.isGameOver = true;
        clearTimeout(this.gameData.nextTickTimeoutId);
        this.eventBus.fire(new GameOverEvent(this.gameData));
    }

    private fallTick(): void {
        this.commandBus.run(new FiguresFallTickCommand(this.gameData));
    }

    private onFallTickProcessed(event: FallTickProcessedEvent): void {
        clearTimeout(this.gameData.nextTickTimeoutId);
        const delay = this.timingsHandler.getDelayForNextTickMs(this.gameData);
        if (!this.gameData.isGameOver && delay != Infinity) {
            this.gameData.nextTickTimeoutId = setTimeout(
                this.fallTick.bind(this),
                this.timingsHandler.getDelayForNextTickMs(this.gameData)
            );
        }
    }
}
