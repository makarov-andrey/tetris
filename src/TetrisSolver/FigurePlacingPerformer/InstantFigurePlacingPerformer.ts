import {GameData} from "../../Tetris/Common";
import {
    CommandBus,
    DropFiguresCommand,
    MoveDownCommand,
    MoveLeftCommand,
    MoveRightCommand,
    MoveToXCommand,
    MoveToYCommand,
    TurnClockwiseCommand,
    TurnToStateCommand
} from "../../Tetris/CommandBus/CommandBus";
import {DropPlacingStep, FigurePlacingResult, MoveXPlacingStep, MoveYPlacingStep, TurnPlacingStep} from "../Common";
import {FigurePlacingPerformerInterface, GameStateNotSupportedError, InconsistentTargetStateError, NotSupportedDirectionStepError} from "./FigurePlacingPerformerInterface";

export class InstantFigurePlacingPerformer implements FigurePlacingPerformerInterface {
    constructor(
        private commandBus: CommandBus,
    ) {}

    public place(gameData: GameData, placingResult?: FigurePlacingResult) {
        if (typeof setImmediate !== 'undefined') {
            setImmediate(() => this.placeImpl(gameData, placingResult));
        } else {
            setTimeout(() => this.placeImpl(gameData, placingResult), 0);
        }
    }

    private placeImpl(gameData: GameData, placingResult?: FigurePlacingResult) {
        if (gameData.fallingFigures.length === 0) {
            return;
        }
        if (gameData.fallingFigures.length !== 1) {
            throw new GameStateNotSupportedError();
        }
        if (placingResult === undefined) {
            return;
        }
        const originalFigure = gameData.fallingFigures[0];
        const targetFigure = placingResult.figuresTargetStates.get(originalFigure);
        if (!targetFigure) {
            return;
        }

        if (originalFigure.figure !== targetFigure.figure) {
            throw new InconsistentTargetStateError("Both of the original and the target falling figures must have the same figure in it.");
        }

        placingResult.placingSteps.forEach(step => {
            if (step instanceof TurnPlacingStep) {
                this.commandBus.run(new TurnToStateCommand(gameData, step.target));
            } else if (step instanceof MoveXPlacingStep) {
                this.commandBus.run(new MoveToXCommand(gameData, step.target));
            } else if (step instanceof MoveYPlacingStep) {
                this.commandBus.run(new MoveToYCommand(gameData, step.target));
            } else if (step instanceof DropPlacingStep) {
                this.commandBus.run(new DropFiguresCommand(gameData));
            } else {
                throw new NotSupportedDirectionStepError("Unknown step " + step.constructor.name);
            }
        });
    }
}
