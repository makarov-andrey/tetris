"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedFigurePlacingPerformer = void 0;
const Common_1 = require("../../Tetris/Common");
const CommandBus_1 = require("../../Tetris/CommandBus/CommandBus");
const Common_2 = require("../Common");
const FigurePlacingPerformerInterface_1 = require("./FigurePlacingPerformerInterface");
class StepDecorator {
    step;
    isPerformed = false;
    constructor(step) {
        this.step = step;
    }
}
class TargetState {
    figures;
    steps;
    constructor(figures, steps) {
        this.figures = figures;
        this.steps = steps;
    }
    static fromFigurePlacingResult(result) {
        if (result === undefined) {
            return;
        }
        return new TargetState(result.figuresTargetStates, result.placingSteps.map(step => new StepDecorator(step)));
    }
}
class AnimatedFigurePlacingPerformer {
    commandBus;
    timingsHandler;
    nextMoveTimeoutId = setTimeout(() => { });
    targetState;
    gameData = Common_1.GameData.makeSimple();
    constructor(commandBus, timingsHandler) {
        this.commandBus = commandBus;
        this.timingsHandler = timingsHandler;
    }
    place(gameData, placingResult) {
        this.gameData = gameData;
        this.targetState = TargetState.fromFigurePlacingResult(placingResult);
        clearTimeout(this.nextMoveTimeoutId);
        this.nextMoveTimeoutId = setTimeout(this.processTick.bind(this), this.timingsHandler.getDelayForNextTickMs(this.gameData));
    }
    processTick() {
        if (this.gameData.fallingFigures.length === 0) {
            return;
        }
        if (this.gameData.fallingFigures.length !== 1) {
            throw new FigurePlacingPerformerInterface_1.GameStateNotSupportedError();
        }
        if (this.targetState === undefined) {
            return;
        }
        const originalFigure = this.gameData.fallingFigures[0];
        const targetFigure = this.targetState.figures.get(originalFigure);
        if (!targetFigure) {
            return;
        }
        if (originalFigure.figure !== targetFigure.figure) {
            throw new FigurePlacingPerformerInterface_1.InconsistentTargetStateError("Both of the original and the target falling figures must have the same figure in it.");
        }
        let allStepsPassed = this.targetState.steps.every(stepDecorator => {
            if (stepDecorator.isPerformed && !stepDecorator.step.persisted) {
                return true;
            }
            let step = stepDecorator.step;
            if (step instanceof Common_2.TurnPlacingStep) {
                if (originalFigure.turnState !== step.target) {
                    this.commandBus.run(new CommandBus_1.TurnClockwiseCommand(this.gameData));
                    return false;
                }
                stepDecorator.isPerformed = true;
            }
            else if (step instanceof Common_2.MoveXPlacingStep) {
                if (originalFigure.position.x !== step.target) {
                    if (originalFigure.position.x > step.target) {
                        this.commandBus.run(new CommandBus_1.MoveLeftCommand(this.gameData));
                    }
                    else {
                        this.commandBus.run(new CommandBus_1.MoveRightCommand(this.gameData));
                    }
                    return false;
                }
                stepDecorator.isPerformed = true;
            }
            else if (step instanceof Common_2.MoveYPlacingStep) {
                if (originalFigure.position.y < step.target) {
                    this.commandBus.run(new CommandBus_1.MoveDownCommand(this.gameData));
                    return false;
                }
                stepDecorator.isPerformed = true;
            }
            else if (step instanceof Common_2.DropPlacingStep) {
                this.commandBus.run(new CommandBus_1.DropFiguresCommand(this.gameData));
                stepDecorator.isPerformed = true;
            }
            else {
                throw new FigurePlacingPerformerInterface_1.NotSupportedDirectionStepError("Unknown step " + step.constructor.name);
            }
            return stepDecorator.isPerformed;
        });
        if (!allStepsPassed) {
            this.nextMoveTimeoutId = setTimeout(this.processTick.bind(this));
        }
    }
}
exports.AnimatedFigurePlacingPerformer = AnimatedFigurePlacingPerformer;
