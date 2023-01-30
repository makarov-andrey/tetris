"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumHelper = void 0;
class EnumHelper {
    static ToArray(val) {
        return Object.keys(val)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n));
    }
    static GetRandom(val) {
        const values = EnumHelper.ToArray(val);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex];
    }
}
exports.EnumHelper = EnumHelper;
//# sourceMappingURL=EnumHelper.js.map