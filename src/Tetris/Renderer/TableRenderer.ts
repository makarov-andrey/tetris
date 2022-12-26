import {CommandBus, CommandType, InitGameCommand, RenderCommand} from "../CommandBus/CommandBus";
import {EventBus, EventType, FallTickProcessedEvent, GameOverEvent} from "../EventBus/EventBus";
import {GameData} from "../GameData";

export class TableRendererSettings {
    constructor(
        public containerElement: HTMLElement
    ) {}
}

export class TableRenderer {
    private cellsHtmlElementsMap: HTMLElement[][] = [];

    constructor (
        private tableRendererSettings: TableRendererSettings,
        private commandBus: CommandBus,
        private eventBus: EventBus,
    ) {
        commandBus.addHandler(CommandType.InitGame, this.initHandler.bind(this));
        commandBus.addHandler(CommandType.Render, this.renderCommandHandler.bind(this));
    }

    private initHandler(command: InitGameCommand): void {
        let table = TableRenderer.createHtmlElement('<div style="display: table; border-collapse: collapse"></div>');
        this.cellsHtmlElementsMap = [];
        for (let y = 0; y < command.gameData.settings.fieldHeight; y++) {
            let row = TableRenderer.createHtmlElement('<div style="display: table-row"></div>');
            this.cellsHtmlElementsMap[y] = [];
            for (let x = 0; x < command.gameData.settings.fieldWidth; x++) {
                let cell = TableRenderer.createHtmlElement('<div style="display: table-cell; border: 1px solid #ccc; width: 20px; height: 20px"></div>');
                this.cellsHtmlElementsMap[y][x] = cell;
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        this.tableRendererSettings.containerElement.replaceChildren(table);

        this.eventBus.on(EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
        this.eventBus.on(EventType.GameOver, this.onFallTickProcessed.bind(this));
        this.eventBus.on(EventType.FiguresMoved, this.onFiguresMoved.bind(this));
    }

    private onFiguresMoved(command: FallTickProcessedEvent): void {
        this.renderTable(command.gameData);
    }

    private onFallTickProcessed(command: FallTickProcessedEvent): void {
        this.renderTable(command.gameData);
    }

    private onGameOver(command: GameOverEvent): void {
        this.renderTable(command.gameData);
    }

    private renderCommandHandler(command: RenderCommand): void {
        this.renderTable(command.gameData);
    }

    private renderTable(gameData: GameData): void {
        gameData.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    if (gameData.isGameOver) {
                        this.cellsHtmlElementsMap[y][x].style.background = "#780000";
                    } else {
                        this.cellsHtmlElementsMap[y][x].style.background = "#007400";
                    }
                } else {
                    this.cellsHtmlElementsMap[y][x].style.background = "#fff";
                }
            });
        });
        gameData.fallingFigures.forEach(fallingFigure => {
            const matrix = fallingFigure.figure.getTurn(fallingFigure.turnState);
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    const realY = y + fallingFigure.position.y;
                    const realX = x + fallingFigure.position.x;
                    if (realY in this.cellsHtmlElementsMap
                        && realX in this.cellsHtmlElementsMap[realY]
                        && value
                    ) {
                        if (gameData.isGameOver) {
                            this.cellsHtmlElementsMap[realY][realX].style.background = "#780000";
                        } else {
                            this.cellsHtmlElementsMap[realY][realX].style.background = "#007400";
                        }
                    }
                });
            });
        });
    }

    private static createHtmlElement(html: string): HTMLElement {
        let container = document.createElement('div');
        container.innerHTML = html;
        if (container.children.length > 1 || container.firstElementChild === null) {
            throw 'The HTML must contain only one child';
        }
        if (!(container.firstElementChild instanceof HTMLElement)) {
            throw 'Something went wrong while trying to get HTMLElement child from div';
        }
        return container.firstElementChild;
    }
}
