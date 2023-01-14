import {CommandBus, CommandType, InitGameCommand, RenderCommand} from "../CommandBus/CommandBus";
import {EventBus, EventType, FallTickProcessedEvent, GameOverEvent} from "../EventBus/EventBus";
import {FigurePlacingChecker} from "../Utils/FigurePlacingChecker";
import {Coordinate, GameData} from "../Common";

export class TableRendererCellColorSettings {
    constructor(
        public filled: string|null,
        public filledGameOver: string|null,
        public empty: string|null,
    ) {}
}

export class TableRendererSettings {
    constructor(
        public containerElement: HTMLElement,
        public renderProjectionFigures: boolean = true,
        public matrixCellColors: TableRendererCellColorSettings = new TableRendererCellColorSettings(
            '#007400',
            '#780000',
            '#fff',
        ),
        public fallingFigureCellColors: TableRendererCellColorSettings = new TableRendererCellColorSettings(
            '#007400',
            '#780000',
            null,
        ),
        public projectionFigureCellColors: TableRendererCellColorSettings = new TableRendererCellColorSettings(
            '#b8e5e3',
            null,
            null,
        ),
    ) {}
}

class CellColors {
    constructor(
        public filled: string|null,
        public empty: string|null,
    ) {}
}

export class TableRenderer {
    private cellsHtmlElementsMap: HTMLElement[][] = [];
    private table: HTMLElement|undefined;
    private scoreDisplay: HTMLElement|undefined;

    constructor (
        private renderSettings: TableRendererSettings,
        private commandBus: CommandBus,
        private eventBus: EventBus,
    ) {
        commandBus.addHandler(CommandType.InitGame, this.initHandler.bind(this));
        commandBus.addHandler(CommandType.Render, this.renderCommandHandler.bind(this));
    }

    private initHandler(command: InitGameCommand): void {
        this.table = TableRenderer.createHtmlElement('<div style="float: left; display: table; border-collapse: collapse"></div>');
        this.cellsHtmlElementsMap = [];
        for (let y = 0; y < command.gameData.settings.fieldHeight; y++) {
            let row = TableRenderer.createHtmlElement('<div style="display: table-row"></div>');
            this.cellsHtmlElementsMap[y] = [];
            for (let x = 0; x < command.gameData.settings.fieldWidth; x++) {
                let cell = TableRenderer.createHtmlElement('<div style="display: table-cell; border: 1px solid #ccc; width: 20px; height: 20px"></div>');
                this.cellsHtmlElementsMap[y][x] = cell;
                row.appendChild(cell);
            }
            this.table.appendChild(row);
        }
        this.renderSettings.containerElement.innerHTML = '';
        this.renderSettings.containerElement.appendChild(this.table);

        this.scoreDisplay = TableRenderer.createHtmlElement(
            `<div style="float: left; font-family: 'Helvetica Neue', sans-serif; font-size: 20px; margin-left: 15px;">
                Level: <span id="level"></span><br>
                Score: <span id="score"></span><br>
                Combo: <span id="combo"></span><br>
            </div>`);
        this.renderSettings.containerElement.appendChild(this.scoreDisplay);

        this.renderSettings.containerElement.appendChild(TableRenderer.createHtmlElement('<div style="clear: both"></div>'));

        this.eventBus.on(EventType.FallingTickProcessed, this.onFallTickProcessed.bind(this));
        this.eventBus.on(EventType.GameOver, this.onGameOver.bind(this));
        this.eventBus.on(EventType.FiguresMoved, this.onFiguresMoved.bind(this));
    }

    private onFiguresMoved(command: FallTickProcessedEvent): void {
        this.renderState(command.gameData);
    }

    private onFallTickProcessed(command: FallTickProcessedEvent): void {
        this.renderState(command.gameData);
    }

    private onGameOver(command: GameOverEvent): void {
        this.renderState(command.gameData);
    }

    private renderCommandHandler(command: RenderCommand): void {
        this.renderState(command.gameData);
    }

    private renderState(gameData: GameData): void {
        this.repaintMatrixCells(gameData.matrix, new Coordinate(0, 0), gameData);
        if (this.renderSettings.renderProjectionFigures) {
            this.renderFallingFiguresProjection(gameData);
        }
        this.renderFallingFigures(gameData);
        this.renderStats(gameData);
    }

    private renderFallingFigures(gameData: GameData): void {
        gameData.fallingFigures.forEach(fallingFigure => {
            this.repaintFallingFiguresCells(
                fallingFigure.figure.getTurn(fallingFigure.turnState),
                fallingFigure.position,
                gameData
            );
        });
    }

    private renderFallingFiguresProjection(gameData: GameData): void {
        gameData.fallingFigures.forEach(fallingFigure => {
            const figureMatrix = fallingFigure.figure.getTurn(fallingFigure.turnState);
            const projectionFigureX = fallingFigure.position.x;
            let projectionFigureY = fallingFigure.position.y;
            while(FigurePlacingChecker.canFigureBePlaced(figureMatrix, new Coordinate(projectionFigureX, projectionFigureY + 1), gameData.matrix)) {
                projectionFigureY++;
            }
            this.repaintProjectionFiguresCells(
                figureMatrix,
                new Coordinate(projectionFigureX, projectionFigureY),
                gameData
            );
        });
    }

    private repaintMatrixCells(matrix: boolean[][], indent: Coordinate, gameData: GameData): void {
        let colors: CellColors;
        if (gameData.isGameOver) {
            colors = new CellColors(
                this.renderSettings.matrixCellColors.filledGameOver,
                this.renderSettings.matrixCellColors.empty,
            );
        } else {
            colors = new CellColors(
                this.renderSettings.matrixCellColors.filled,
                this.renderSettings.matrixCellColors.empty,
            );
        }
        this.repaintCells(matrix, indent, colors);
    }

    private repaintFallingFiguresCells(matrix: boolean[][], indent: Coordinate, gameData: GameData): void {
        let colors: CellColors;
        if (gameData.isGameOver) {
            colors = new CellColors(
                this.renderSettings.fallingFigureCellColors.filledGameOver,
                this.renderSettings.fallingFigureCellColors.empty,
            );
        } else {
            colors = new CellColors(
                this.renderSettings.fallingFigureCellColors.filled,
                this.renderSettings.fallingFigureCellColors.empty,
            );
        }
        this.repaintCells(matrix, indent, colors);
    }

    private repaintProjectionFiguresCells(matrix: boolean[][], indent: Coordinate, gameData: GameData): void {
        let colors: CellColors;
        if (gameData.isGameOver) {
            colors = new CellColors(
                this.renderSettings.projectionFigureCellColors.filledGameOver,
                this.renderSettings.projectionFigureCellColors.empty,
            );
        } else {
            colors = new CellColors(
                this.renderSettings.projectionFigureCellColors.filled,
                this.renderSettings.projectionFigureCellColors.empty,
            );
        }
        this.repaintCells(matrix, indent, colors);
    }

    private repaintCells(matrix: boolean[][], indent: Coordinate, cellColors: CellColors): void {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                const realY = y + indent.y;
                const realX = x + indent.x;
                if (realY in this.cellsHtmlElementsMap
                    && realX in this.cellsHtmlElementsMap[realY]
                ) {
                    const color = value ? cellColors.filled : cellColors.empty;
                    if (color !== null) {
                        this.cellsHtmlElementsMap[realY][realX].style.background = color;
                    }
                }
            });
        });
    }

    private renderStats(gameData: GameData): void {
        const levelSpan = document.getElementById('level');
        const scoreSpan = document.getElementById('score');
        const comboSpan = document.getElementById('combo');
        if (levelSpan !== null) {
            levelSpan.innerHTML = gameData.level.toString();
        }
        if (scoreSpan !== null) {
            scoreSpan.innerHTML = gameData.score.toString();
        }
        if (comboSpan !== null) {
            comboSpan.innerHTML = gameData.combo.toString();
        }
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
