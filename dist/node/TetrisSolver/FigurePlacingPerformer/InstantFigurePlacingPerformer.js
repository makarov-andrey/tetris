"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstantFigurePlacingPerformer = void 0;
const CommandBus_1 = require("../../Tetris/CommandBus/CommandBus");
const Common_1 = require("../Common");
const FigurePlacingPerformerInterface_1 = require("./FigurePlacingPerformerInterface");
class InstantFigurePlacingPerformer {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    place(gameData, placingResult) {
        if (typeof setImmediate !== 'undefined') {
            setImmediate(() => this.placeImpl(gameData, placingResult));
        }
        else {
            setTimeout(() => this.placeImpl(gameData, placingResult), 0);
        }
    }
    placeImpl(gameData, placingResult) {
        if (gameData.fallingFigures.length === 0) {
            return;
        }
        if (gameData.fallingFigures.length !== 1) {
            throw new FigurePlacingPerformerInterface_1.GameStateNotSupportedError();
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
            throw new FigurePlacingPerformerInterface_1.InconsistentTargetStateError("Both of the original and the target falling figures must have the same figure in it.");
        }
        placingResult.placingSteps.forEach(step => {
            if (step instanceof Common_1.TurnPlacingStep) {
                this.commandBus.run(new CommandBus_1.TurnToStateCommand(gameData, step.target));
            }
            else if (step instanceof Common_1.MoveXPlacingStep) {
                this.commandBus.run(new CommandBus_1.MoveToXCommand(gameData, step.target));
            }
            else if (step instanceof Common_1.MoveYPlacingStep) {
                this.commandBus.run(new CommandBus_1.MoveToYCommand(gameData, step.target));
            }
            else if (step instanceof Common_1.DropPlacingStep) {
                this.commandBus.run(new CommandBus_1.DropFiguresCommand(gameData));
            }
            else {
                throw new FigurePlacingPerformerInterface_1.NotSupportedDirectionStepError("Unknown step " + step.constructor.name);
            }
        });
    }
}
exports.InstantFigurePlacingPerformer = InstantFigurePlacingPerformer;
//# sourceMappingURL=InstantFigurePlacingPerformer.js.map