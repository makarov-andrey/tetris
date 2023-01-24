import {EventBus, EventType, FiguresSpawnedEvent} from "../Tetris/EventBus/EventBus";
import {CommandBus, CommandType, InitGameCommand} from "../Tetris/CommandBus/CommandBus";
import {FigurePlacingResolver} from "./FigurePlacingResolver";
import {FigurePlacingPerformer} from "./FigurePlacingPerformer";
import {CalculatorAggregate} from "./ScoreCalculator/CalculatorAggregate";
import {SquashedRowsCalculator} from "./ScoreCalculator/SquashedRows/SquashedRowsCalculator";
import {FillableCellsCalculator} from "./ScoreCalculator/FillableCells/FillableCellsCalculator";
import {HolesV1Calculator} from "./ScoreCalculator/Holes/HolesV1Calculator";
import {HolesV2Calculator} from "./ScoreCalculator/Holes/HolesV2Calculator";
import {FilledHeightCalculator} from "./ScoreCalculator/FilledHeight/FilledHeightCalculator";
import {TunnelsCalculator} from "./ScoreCalculator/Tunnels/TunnelsCalculator";

export class TetrisSolver {
    constructor(
        private eventBus: EventBus,
        private commandBus: CommandBus,
        private fallingFigurePlacingResolver = new FigurePlacingResolver(
            commandBus,
            new CalculatorAggregate([
                new FillableCellsCalculator(),
                new FilledHeightCalculator(),
                new HolesV1Calculator(),
                new SquashedRowsCalculator(),
                new TunnelsCalculator(),
            ]),
        ),
        private fallingFiguresPlacer = new FigurePlacingPerformer(commandBus),
    ) {
        this.commandBus.addHandler(CommandType.InitGame, this.initGameHandler.bind(this));
    }

    private initGameHandler(command: InitGameCommand) {
        this.eventBus.on(EventType.FiguresSpawned, this.onFiguresSpawned.bind(this));
    }

    private onFiguresSpawned(event: FiguresSpawnedEvent) {
        const targetFallingFiguresStates = this.fallingFigurePlacingResolver.resolve(event.gameData);
        this.fallingFiguresPlacer.place(event.gameData, targetFallingFiguresStates);
    }
}
