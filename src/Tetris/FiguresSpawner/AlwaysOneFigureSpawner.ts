import {EventBus, EventType, FallTickProcessedEvent} from "../EventBus/EventBus";
import {FigureTurnState} from "../Figures";
import {Coordinate, FallingFigure} from "../Structures";
import {CommandBus, CommandType, InitGameCommand} from "../CommandBus/CommandBus";
import {GameData} from "../GameData";

export class AlwaysOneFigureSpawner {
    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initHandler.bind(this));
    }

    private initHandler(event: InitGameCommand): void {
        this.addFigure(event.gameData);
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
        const turnState = this.getRandTurnState();
        const figureMatrix = figure.getTurn(turnState);
        const figureWidth = Math.max(...figureMatrix.map(row => row.length));
        const coordinate = new Coordinate(
            Math.ceil(gameData.settings.fieldWidth / 2 - figureWidth / 2) - 1,
            -figureMatrix.length,
        );
        gameData.fallingFigures.push(new FallingFigure(
            figure,
            coordinate,
            turnState
        ));
    }

    private getRandTurnState(): FigureTurnState {
        const keys = Object.keys(FigureTurnState);
        const enumValues = keys
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n)) as unknown as FigureTurnState[]
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return enumValues[randomIndex];
    }
}
