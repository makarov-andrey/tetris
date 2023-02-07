"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticArrayGenerator = void 0;
const Common_1 = require("../../TetrisSolver/Common");
class StaticArrayGenerator {
    list;
    constructor(list = []) {
        this.list = list;
    }
    generate() {
        return this.list.map(params => Common_1.SolverRunParameters.fromTuple(params));
    }
    async init() {
        return;
    }
}
exports.StaticArrayGenerator = StaticArrayGenerator;
