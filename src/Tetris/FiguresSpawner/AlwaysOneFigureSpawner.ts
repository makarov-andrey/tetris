import {EventBus, EventType, FallTickProcessedEvent, FiguresSpawnedEvent} from "../EventBus/EventBus";
import {FigureTurnState} from "../Figures";
import {Coordinate, FallingFigure, GameData} from "../Common";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";
import {EnumHelper} from "../Utils/EnumHelper";

export class AlwaysOneFigureSpawner {
    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initHandler.bind(this));
    }

    private initHandler(event: InitGameCommand): void {
        this.eventBus.on(
            EventType.FallingTickProcessed,
            this.processOnFallTick.bind(this),
        );
    }

    private processOnFallTick(event: FallTickProcessedEvent): void {
        this.addFigure(event.gameData);
    }

    private addFigure(gameData: GameData): void {
        if (gameData.fallingFigures.length > 0 || gameData.isGameOver) {
            return;
        }

        const figureIndex = Math.floor(Math.random() * gameData.settings.figures.length);
        const figure = gameData.settings.figures[figureIndex];
        const turnState = EnumHelper.GetRandom(FigureTurnState);
        const figureMatrix = figure.getTurn(turnState);
        const figureWidth = Math.max(...figureMatrix.map(row => row.length));
        const coordinate = new Coordinate(
            Math.ceil(gameData.settings.fieldWidth / 2 - figureWidth / 2) - 1,
            -figureMatrix.length,
        );
        const fallingFigure = new FallingFigure(
            figure,
            coordinate,
            turnState
        );
        gameData.fallingFigures.push(fallingFigure);
        this.eventBus.fire(new FiguresSpawnedEvent(gameData, [fallingFigure]));
    }
}
