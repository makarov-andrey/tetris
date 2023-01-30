"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportedDirectionStepError = exports.InconsistentTargetStateError = exports.GameStateNotSupportedError = exports.PlacingError = void 0;
class PlacingError extends Error {
}
exports.PlacingError = PlacingError;
class GameStateNotSupportedError extends PlacingError {
}
exports.GameStateNotSupportedError = GameStateNotSupportedError;
class InconsistentTargetStateError extends PlacingError {
}
exports.InconsistentTargetStateError = InconsistentTargetStateError;
class NotSupportedDirectionStepError extends PlacingError {
}
exports.NotSupportedDirectionStepError = NotSupportedDirectionStepError;
//# sourceMappingURL=FigurePlacingPerformerInterface.js.map