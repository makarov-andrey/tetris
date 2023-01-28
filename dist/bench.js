/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts":
/*!***********************************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillableCellsCalculator": () => (/* binding */ FillableCellsCalculator),
/* harmony export */   "FillableCellsCalculatorParams": () => (/* binding */ FillableCellsCalculatorParams)
/* harmony export */ });
class FillableCellsCalculatorParams {
    minimumValuableHeight;
    powMultiplier;
    multiplier;
    constructor(minimumValuableHeight, powMultiplier, multiplier) {
        this.minimumValuableHeight = minimumValuableHeight;
        this.powMultiplier = powMultiplier;
        this.multiplier = multiplier;
    }
}
class FillableCellsCalculator {
    params;
    constructor(params = new FillableCellsCalculatorParams(5, 1, 1)) {
        this.params = params;
    }
    calculateScore(request) {
        const fieldHeight = request.gameData.settings.fieldHeight;
        const fieldWidth = request.gameData.settings.fieldWidth;
        const [fillableCellsCount, fillableHeight] = this.calculateFillableSpace(request.imaginableMatrix, fieldWidth);
        let fillableCellsScore = 0;
        if (fillableHeight > this.params.minimumValuableHeight) {
            fillableCellsScore = -fillableCellsCount
                * Math.pow(fillableCellsCount, fillableCellsCount / (fieldHeight * fieldWidth)
                    * this.params.powMultiplier)
                * this.params.multiplier;
        }
        return fillableCellsScore;
    }
    calculateFillableSpace(matrix, fieldWidth) {
        let coveredColumns = new Set();
        let fillableCellsCount = 0;
        let fillableHeight = 0;
        matrix.every(row => {
            row.forEach((val, x) => {
                if (val) {
                    coveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val && coveredColumns.size > 0 && !coveredColumns.has(x)) {
                    fillableCellsCount++;
                }
            });
            if (coveredColumns.size < fieldWidth) {
                if (coveredColumns.size > 0) {
                    fillableHeight++;
                }
                return true;
            }
            return false;
        });
        return [fillableCellsCount, fillableHeight];
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts":
/*!*********************************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilledHeightCalculator": () => (/* binding */ FilledHeightCalculator),
/* harmony export */   "FilledHeightCalculatorParams": () => (/* binding */ FilledHeightCalculatorParams)
/* harmony export */ });
class FilledHeightCalculatorParams {
    powMultiplier;
    multiplier;
    constructor(powMultiplier, multiplier) {
        this.powMultiplier = powMultiplier;
        this.multiplier = multiplier;
    }
}
class FilledHeightCalculator {
    params;
    constructor(params = new FilledHeightCalculatorParams(1, 3)) {
        this.params = params;
    }
    calculateScore(request) {
        const height = this.calculateHeight(request.imaginableMatrix);
        return -height
            * Math.pow(height, height / request.gameData.settings.fieldHeight
                * this.params.powMultiplier)
            * this.params.multiplier;
    }
    calculateHeight(matrix) {
        let lowestEmptyY = -1;
        matrix.every((row, y) => {
            if (row.every(val => !val)) {
                lowestEmptyY = y;
                return true;
            }
            else {
                return false;
            }
        });
        return matrix.length - lowestEmptyY - 1;
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts":
/*!*********************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HolesV1Calculator": () => (/* binding */ HolesV1Calculator),
/* harmony export */   "HolesV1CalculatorParams": () => (/* binding */ HolesV1CalculatorParams)
/* harmony export */ });
class HolesV1CalculatorParams {
    countDecreaseMultiplier;
    countIncreaseMultiplier;
    coveredHeightPowMultiplier;
    coveredHeightMultiplier;
    constructor(countDecreaseMultiplier, countIncreaseMultiplier, coveredHeightPowMultiplier, coveredHeightMultiplier) {
        this.countDecreaseMultiplier = countDecreaseMultiplier;
        this.countIncreaseMultiplier = countIncreaseMultiplier;
        this.coveredHeightPowMultiplier = coveredHeightPowMultiplier;
        this.coveredHeightMultiplier = coveredHeightMultiplier;
    }
}
class HolesV1Calculator {
    params;
    constructor(params = new HolesV1CalculatorParams(150, 70, 1, 5)) {
        this.params = params;
    }
    calculateScore(request) {
        const [holesCount, holesCoveredHeight] = this.calculateHolesAndCoveredHeight(request.imaginableMatrix, request.gameData.matrix);
        const holesCountDecrease = request.originalHoles.length - holesCount;
        let holesScore = holesCountDecrease > 0
            ? holesCountDecrease * this.params.countDecreaseMultiplier
            : holesCountDecrease * this.params.countIncreaseMultiplier;
        if (holesCoveredHeight !== 0 && holesCount !== 0) {
            holesScore -=
                holesCoveredHeight
                    * Math.pow(holesCoveredHeight, holesCoveredHeight / (request.gameData.settings.fieldHeight * holesCount)
                        * this.params.coveredHeightPowMultiplier) * this.params.coveredHeightMultiplier;
        }
        return holesScore;
    }
    calculateHolesAndCoveredHeight(imaginableMatrix, realMatrix) {
        const [originalTheHighestHoleY, originalTheHighestHoleCoveredY] = this.calculateTheHighestHoleCoveredY(realMatrix);
        let coveredColumnsYs = new Map;
        let holesCoveredHeightsSum = 0;
        let holesCount = 0;
        imaginableMatrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val && !coveredColumnsYs.has(x)) {
                    coveredColumnsYs.set(x, y);
                }
                let coveredY = coveredColumnsYs.get(x);
                if (coveredY !== undefined && !val) {
                    holesCount++;
                    if (originalTheHighestHoleY !== undefined && originalTheHighestHoleCoveredY !== undefined) {
                        if (y < originalTheHighestHoleY) {
                            holesCoveredHeightsSum += y - coveredY;
                        }
                        else if (coveredY < originalTheHighestHoleCoveredY) {
                            holesCoveredHeightsSum += originalTheHighestHoleCoveredY - coveredY;
                        }
                    }
                }
            });
        });
        return [holesCount, holesCoveredHeightsSum];
    }
    calculateTheHighestHoleCoveredY(matrix) {
        let theHighestHoleCoveredY = undefined;
        let theHighestHoleY = undefined;
        let coveredColumnsYs = new Map;
        matrix.some((row, y) => {
            return row.some((val, x) => {
                if (val && !coveredColumnsYs.has(x)) {
                    coveredColumnsYs.set(x, y);
                }
                let coveredY = coveredColumnsYs.get(x);
                if (coveredY !== undefined && !val) {
                    theHighestHoleY = y;
                    theHighestHoleCoveredY = coveredY;
                    return true;
                }
                return false;
            });
        });
        return [theHighestHoleY, theHighestHoleCoveredY];
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts":
/*!*********************************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SquashedRowsCalculator": () => (/* binding */ SquashedRowsCalculator),
/* harmony export */   "SquashedRowsCalculatorParams": () => (/* binding */ SquashedRowsCalculatorParams)
/* harmony export */ });
class SquashedRowsCalculatorParams {
    multiplier;
    constructor(multiplier) {
        this.multiplier = multiplier;
    }
}
class SquashedRowsCalculator {
    params;
    constructor(params = new SquashedRowsCalculatorParams(5)) {
        this.params = params;
    }
    calculateScore(request) {
        return request.squashedLinesCount * this.params.multiplier;
    }
}


/***/ }),

/***/ "./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts":
/*!***********************************************************************!*\
  !*** ./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TunnelsCalculator": () => (/* binding */ TunnelsCalculator),
/* harmony export */   "TunnelsCalculatorParams": () => (/* binding */ TunnelsCalculatorParams)
/* harmony export */ });
class TunnelsCalculatorParams {
    minimumValuableHeight;
    countMultiplier;
    heightPowMultiplier;
    heightMultiplier;
    constructor(minimumValuableHeight, countMultiplier, heightPowMultiplier, heightMultiplier) {
        this.minimumValuableHeight = minimumValuableHeight;
        this.countMultiplier = countMultiplier;
        this.heightPowMultiplier = heightPowMultiplier;
        this.heightMultiplier = heightMultiplier;
    }
}
class TunnelsCalculator {
    params;
    constructor(params = new TunnelsCalculatorParams(3, 70, 1, 7)) {
        this.params = params;
    }
    calculateScore(request) {
        const [tunnelsSumHeight, tunnelsCount] = this.calculateTunnelsExceptUncovered(request.imaginableMatrix, request.gameData.matrix);
        if (tunnelsCount === 0) {
            return 0;
        }
        return (-tunnelsCount * this.params.countMultiplier)
            - (tunnelsSumHeight
                * Math.pow(tunnelsSumHeight, tunnelsSumHeight / (request.gameData.settings.fieldHeight * tunnelsCount)
                    * this.params.heightPowMultiplier)
                * this.params.heightMultiplier);
    }
    calculateTunnelsExceptUncovered(imaginableMatrix, realMatrix) {
        let realCoveredColumns = new Set();
        realMatrix.every((row) => {
            row.forEach((val, x) => {
                if (val) {
                    realCoveredColumns.add(x);
                }
            });
        });
        let imaginableCoveredColumns = new Set();
        let tunnels = new Map;
        const fieldWidth = imaginableMatrix[0].length;
        imaginableMatrix.every((row, y) => {
            row.forEach((val, x) => {
                if (val) {
                    imaginableCoveredColumns.add(x);
                }
            });
            row.forEach((val, x) => {
                if (!val
                    && !imaginableCoveredColumns.has(x)
                    && !realCoveredColumns.has(x)
                    && (x === 0 || imaginableCoveredColumns.has(x - 1))
                    && (x === fieldWidth - 1 || imaginableCoveredColumns.has(x + 1))) {
                    tunnels.set(x, (tunnels.get(x) || 0) + 1);
                }
            });
            return imaginableCoveredColumns.size < fieldWidth;
        });
        let tunnelsSumHeight = 0;
        let tunnelsCount = 0;
        tunnels.forEach(height => {
            if (height >= this.params.minimumValuableHeight) {
                tunnelsSumHeight += height;
                tunnelsCount++;
            }
        });
        return [tunnelsSumHeight, tunnelsCount];
    }
}


/***/ }),

/***/ "./src/TetrisSolvingBench/BenchManager.ts":
/*!************************************************!*\
  !*** ./src/TetrisSolvingBench/BenchManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BenchManager": () => (/* binding */ BenchManager)
/* harmony export */ });
class RunResult {
    percentiles;
    average;
    constructor(percentiles, average) {
        this.percentiles = percentiles;
        this.average = average;
    }
}
class BenchManager {
    pool;
    benchParamsGenerator;
    iterations = 1000;
    valuablePercentiles = [0, 50, 95, 99, 99.9];
    resolveWorkersPoolFreed = () => { };
    constructor(pool, benchParamsGenerator) {
        this.pool = pool;
        this.benchParamsGenerator = benchParamsGenerator;
    }
    async startBench() {
        console.log(this.benchParamsGenerator.count());
        for (let params of this.benchParamsGenerator.generate()) {
            // console.log('new value yielded', params);
            this.run(params).then(result => {
                // todo save the result to file instead
                console.log(`[${this.paramsToLogData(params).join(',')}]; {[${result.percentiles.join(',')}], ${result.average}}`);
            });
            // todo render cli progress bar
            await this.promiseWorkersPoolToFree();
        }
        // console.log('last pack of workers have been run');
        // console.log(this.pool.stats());
    }
    async run(params) {
        let promises = [];
        for (let i = 0; i < this.iterations; i++) {
            promises.push(new Promise(resolve => {
                this.pool.exec('solveTetris', [params])
                    .then((result) => {
                    this.checkWorkersPoolIfFree();
                    resolve(result.stats.figuresFallen);
                });
            }));
        }
        const results = await Promise.all(promises);
        results.sort((a, b) => b - a);
        let percentileValues = [];
        this.valuablePercentiles.forEach(percentile => {
            percentileValues.push(results[Math.floor(this.iterations / 100 * percentile)]);
        });
        const average = results.reduce((a, b) => a + b, 0) / results.length;
        return new RunResult(percentileValues, average);
    }
    async promiseWorkersPoolToFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
            return;
        }
        await new Promise(resolve => {
            this.resolveWorkersPoolFreed = resolve;
        });
    }
    checkWorkersPoolIfFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
            this.resolveWorkersPoolFreed(true);
        }
    }
    paramsToLogData(params) {
        return [
            params.fillableCellsCalculatorParams.minimumValuableHeight,
            params.fillableCellsCalculatorParams.powMultiplier,
            params.fillableCellsCalculatorParams.multiplier,
            params.filledHeightCalculatorParams.powMultiplier,
            params.filledHeightCalculatorParams.multiplier,
            params.holesV1CalculatorParams.countDecreaseMultiplier,
            params.holesV1CalculatorParams.countIncreaseMultiplier,
            params.holesV1CalculatorParams.coveredHeightPowMultiplier,
            params.holesV1CalculatorParams.coveredHeightMultiplier,
            params.squashedRowsCalculatorParams.multiplier,
            params.tunnelsCalculatorParams.minimumValuableHeight,
            params.tunnelsCalculatorParams.countMultiplier,
            params.tunnelsCalculatorParams.heightPowMultiplier,
            params.tunnelsCalculatorParams.heightMultiplier,
        ];
    }
}


/***/ }),

/***/ "./src/TetrisSolvingBench/BenchParamsGenerator.ts":
/*!********************************************************!*\
  !*** ./src/TetrisSolvingBench/BenchParamsGenerator.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BenchParamsGenerator": () => (/* binding */ BenchParamsGenerator)
/* harmony export */ });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ "./src/TetrisSolvingBench/Common.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator */ "./src/TetrisSolver/ScoreCalculator/FillableCells/FillableCellsCalculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator */ "./src/TetrisSolver/ScoreCalculator/FilledHeight/FilledHeightCalculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator */ "./src/TetrisSolver/ScoreCalculator/Holes/HolesV1Calculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator */ "./src/TetrisSolver/ScoreCalculator/SquashedRows/SquashedRowsCalculator.ts");
/* harmony import */ var _TetrisSolver_ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator */ "./src/TetrisSolver/ScoreCalculator/Tunnels/TunnelsCalculator.ts");






class BenchParamsGenerator {
    fillableCellsMinimumValuableHeight = [3, 5, 7];
    fillableCellsPowMultiplier = [0];
    fillableCellsMultiplier = [1, 2, 3];
    filledHeightPowMultiplier = [0];
    filledHeightMultiplier = [1, 3, 5];
    holesV1CountDecreaseMultiplier = [130, 150, 170];
    holesV1CountIncreaseMultiplier = [60, 70, 80];
    holesV1CoveredHeightPowMultiplier = [0];
    holesV1CoveredHeightMultiplier = [3, 5, 7];
    squashedRowsMultiplier = [5, 10, 15];
    tunnelsMinimumValuableHeight = [2, 3, 4];
    tunnelsCountMultiplier = [40, 70, 90];
    tunnelsHeightPowMultiplier = [0];
    tunnelsHeightMultiplier = [5, 7, 10];
    *generate() {
        for (let fillableCellsMinimumValuableHeight of this.fillableCellsMinimumValuableHeight) {
            for (let fillableCellsPowMultiplier of this.fillableCellsPowMultiplier) {
                for (let fillableCellsMultiplier of this.fillableCellsMultiplier) {
                    for (let filledHeightPowMultipliers of this.filledHeightPowMultiplier) {
                        for (let filledHeightMultipliers of this.filledHeightMultiplier) {
                            for (let holesV1CountDecreaseMultiplier of this.holesV1CountDecreaseMultiplier) {
                                for (let holesV1CountIncreaseMultiplier of this.holesV1CountIncreaseMultiplier) {
                                    for (let holesV1CoveredHeightPowMultiplier of this.holesV1CoveredHeightPowMultiplier) {
                                        for (let holesV1CoveredHeightMultiplier of this.holesV1CoveredHeightMultiplier) {
                                            for (let squashedRowsMultiplier of this.squashedRowsMultiplier) {
                                                for (let tunnelsMinimumValuableHeight of this.tunnelsMinimumValuableHeight) {
                                                    for (let tunnelsCountMultiplier of this.tunnelsCountMultiplier) {
                                                        for (let tunnelsHeightPowMultiplier of this.tunnelsHeightPowMultiplier) {
                                                            for (let tunnelsHeightMultiplier of this.tunnelsHeightMultiplier) {
                                                                yield new _Common__WEBPACK_IMPORTED_MODULE_0__.BenchRunParameters(new _TetrisSolver_ScoreCalculator_FillableCells_FillableCellsCalculator__WEBPACK_IMPORTED_MODULE_1__.FillableCellsCalculatorParams(fillableCellsMinimumValuableHeight, fillableCellsPowMultiplier, fillableCellsMultiplier), new _TetrisSolver_ScoreCalculator_FilledHeight_FilledHeightCalculator__WEBPACK_IMPORTED_MODULE_2__.FilledHeightCalculatorParams(filledHeightPowMultipliers, filledHeightMultipliers), new _TetrisSolver_ScoreCalculator_Holes_HolesV1Calculator__WEBPACK_IMPORTED_MODULE_3__.HolesV1CalculatorParams(holesV1CountDecreaseMultiplier, holesV1CountIncreaseMultiplier, holesV1CoveredHeightPowMultiplier, holesV1CoveredHeightMultiplier), new _TetrisSolver_ScoreCalculator_SquashedRows_SquashedRowsCalculator__WEBPACK_IMPORTED_MODULE_4__.SquashedRowsCalculatorParams(squashedRowsMultiplier), new _TetrisSolver_ScoreCalculator_Tunnels_TunnelsCalculator__WEBPACK_IMPORTED_MODULE_5__.TunnelsCalculatorParams(tunnelsMinimumValuableHeight, tunnelsCountMultiplier, tunnelsHeightPowMultiplier, tunnelsHeightMultiplier));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    count() {
        return this.fillableCellsMinimumValuableHeight.length
            * this.fillableCellsPowMultiplier.length
            * this.fillableCellsMultiplier.length
            * this.filledHeightPowMultiplier.length
            * this.filledHeightMultiplier.length
            * this.holesV1CountDecreaseMultiplier.length
            * this.holesV1CountIncreaseMultiplier.length
            * this.holesV1CoveredHeightPowMultiplier.length
            * this.holesV1CoveredHeightMultiplier.length
            * this.squashedRowsMultiplier.length
            * this.tunnelsMinimumValuableHeight.length
            * this.tunnelsCountMultiplier.length
            * this.tunnelsHeightPowMultiplier.length
            * this.tunnelsHeightMultiplier.length;
    }
}


/***/ }),

/***/ "./src/TetrisSolvingBench/Common.ts":
/*!******************************************!*\
  !*** ./src/TetrisSolvingBench/Common.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BenchRunParameters": () => (/* binding */ BenchRunParameters)
/* harmony export */ });
class BenchRunParameters {
    fillableCellsCalculatorParams;
    filledHeightCalculatorParams;
    holesV1CalculatorParams;
    squashedRowsCalculatorParams;
    tunnelsCalculatorParams;
    constructor(fillableCellsCalculatorParams, filledHeightCalculatorParams, holesV1CalculatorParams, squashedRowsCalculatorParams, tunnelsCalculatorParams) {
        this.fillableCellsCalculatorParams = fillableCellsCalculatorParams;
        this.filledHeightCalculatorParams = filledHeightCalculatorParams;
        this.holesV1CalculatorParams = holesV1CalculatorParams;
        this.squashedRowsCalculatorParams = squashedRowsCalculatorParams;
        this.tunnelsCalculatorParams = tunnelsCalculatorParams;
    }
}


/***/ }),

/***/ "./src/bench.ts":
/*!**********************!*\
  !*** ./src/bench.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var workerpool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workerpool */ "./node_modules/workerpool/dist/workerpool.js");
/* harmony import */ var workerpool__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(workerpool__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TetrisSolvingBench_BenchManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TetrisSolvingBench/BenchManager */ "./src/TetrisSolvingBench/BenchManager.ts");
/* harmony import */ var _TetrisSolvingBench_BenchParamsGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TetrisSolvingBench/BenchParamsGenerator */ "./src/TetrisSolvingBench/BenchParamsGenerator.ts");



const workerPool = (0,workerpool__WEBPACK_IMPORTED_MODULE_0__.pool)('/Users/makarov-and/Projects/fun/tetris/dist/tetris_solving_worker.js', { maxWorkers: 10 });
const benchManager = new _TetrisSolvingBench_BenchManager__WEBPACK_IMPORTED_MODULE_1__.BenchManager(workerPool, new _TetrisSolvingBench_BenchParamsGenerator__WEBPACK_IMPORTED_MODULE_2__.BenchParamsGenerator());
await benchManager.startBench();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./node_modules/workerpool/dist/workerpool.js":
/*!****************************************************!*\
  !*** ./node_modules/workerpool/dist/workerpool.js ***!
  \****************************************************/
/***/ (function(module) {

var __dirname = "/";
/**
 * workerpool.js
 * https://github.com/josdejong/workerpool
 *
 * Offload tasks to a pool of workers on node.js and in the browser.
 *
 * @version 6.3.1
 * @date    2022-11-07
 *
 * @license
 * Copyright (C) 2014-2022 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 345:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_1386__) {

var Promise = __nested_webpack_require_1386__(219);
var WorkerHandler = __nested_webpack_require_1386__(751);
var environment = __nested_webpack_require_1386__(828);
var DebugPortAllocator = __nested_webpack_require_1386__(833);
var DEBUG_PORT_ALLOCATOR = new DebugPortAllocator();
/**
 * A pool to manage workers
 * @param {String} [script]   Optional worker script
 * @param {WorkerPoolOptions} [options]  See docs
 * @constructor
 */
function Pool(script, options) {
  if (typeof script === 'string') {
    this.script = script || null;
  } else {
    this.script = null;
    options = script;
  }
  this.workers = []; // queue with all workers
  this.tasks = []; // queue with tasks awaiting execution

  options = options || {};
  this.forkArgs = Object.freeze(options.forkArgs || []);
  this.forkOpts = Object.freeze(options.forkOpts || {});
  this.workerThreadOpts = Object.freeze(options.workerThreadOpts || {});
  this.debugPortStart = options.debugPortStart || 43210;
  this.nodeWorker = options.nodeWorker;
  this.workerType = options.workerType || options.nodeWorker || 'auto';
  this.maxQueueSize = options.maxQueueSize || Infinity;
  this.onCreateWorker = options.onCreateWorker || function () {
    return null;
  };
  this.onTerminateWorker = options.onTerminateWorker || function () {
    return null;
  };

  // configuration
  if (options && 'maxWorkers' in options) {
    validateMaxWorkers(options.maxWorkers);
    this.maxWorkers = options.maxWorkers;
  } else {
    this.maxWorkers = Math.max((environment.cpus || 4) - 1, 1);
  }
  if (options && 'minWorkers' in options) {
    if (options.minWorkers === 'max') {
      this.minWorkers = this.maxWorkers;
    } else {
      validateMinWorkers(options.minWorkers);
      this.minWorkers = options.minWorkers;
      this.maxWorkers = Math.max(this.minWorkers, this.maxWorkers); // in case minWorkers is higher than maxWorkers
    }

    this._ensureMinWorkers();
  }
  this._boundNext = this._next.bind(this);
  if (this.workerType === 'thread') {
    WorkerHandler.ensureWorkerThreads();
  }
}

/**
 * Execute a function on a worker.
 *
 * Example usage:
 *
 *   var pool = new Pool()
 *
 *   // call a function available on the worker
 *   pool.exec('fibonacci', [6])
 *
 *   // offload a function
 *   function add(a, b) {
 *     return a + b
 *   };
 *   pool.exec(add, [2, 4])
 *       .then(function (result) {
 *         console.log(result); // outputs 6
 *       })
 *       .catch(function(error) {
 *         console.log(error);
 *       });
 *
 * @param {String | Function} method  Function name or function.
 *                                    If `method` is a string, the corresponding
 *                                    method on the worker will be executed
 *                                    If `method` is a Function, the function
 *                                    will be stringified and executed via the
 *                                    workers built-in function `run(fn, args)`.
 * @param {Array} [params]  Function arguments applied when calling the function
 * @param {ExecOptions} [options]  Options object
 * @return {Promise.<*, Error>} result
 */
Pool.prototype.exec = function (method, params, options) {
  // validate type of arguments
  if (params && !Array.isArray(params)) {
    throw new TypeError('Array expected as argument "params"');
  }
  if (typeof method === 'string') {
    var resolver = Promise.defer();
    if (this.tasks.length >= this.maxQueueSize) {
      throw new Error('Max queue size of ' + this.maxQueueSize + ' reached');
    }

    // add a new task to the queue
    var tasks = this.tasks;
    var task = {
      method: method,
      params: params,
      resolver: resolver,
      timeout: null,
      options: options
    };
    tasks.push(task);

    // replace the timeout method of the Promise with our own,
    // which starts the timer as soon as the task is actually started
    var originalTimeout = resolver.promise.timeout;
    resolver.promise.timeout = function timeout(delay) {
      if (tasks.indexOf(task) !== -1) {
        // task is still queued -> start the timer later on
        task.timeout = delay;
        return resolver.promise;
      } else {
        // task is already being executed -> start timer immediately
        return originalTimeout.call(resolver.promise, delay);
      }
    };

    // trigger task execution
    this._next();
    return resolver.promise;
  } else if (typeof method === 'function') {
    // send stringified function and function arguments to worker
    return this.exec('run', [String(method), params]);
  } else {
    throw new TypeError('Function or string expected as argument "method"');
  }
};

/**
 * Create a proxy for current worker. Returns an object containing all
 * methods available on the worker. The methods always return a promise.
 *
 * @return {Promise.<Object, Error>} proxy
 */
Pool.prototype.proxy = function () {
  if (arguments.length > 0) {
    throw new Error('No arguments expected');
  }
  var pool = this;
  return this.exec('methods').then(function (methods) {
    var proxy = {};
    methods.forEach(function (method) {
      proxy[method] = function () {
        return pool.exec(method, Array.prototype.slice.call(arguments));
      };
    });
    return proxy;
  });
};

/**
 * Creates new array with the results of calling a provided callback function
 * on every element in this array.
 * @param {Array} array
 * @param {function} callback  Function taking two arguments:
 *                             `callback(currentValue, index)`
 * @return {Promise.<Array>} Returns a promise which resolves  with an Array
 *                           containing the results of the callback function
 *                           executed for each of the array elements.
 */
/* TODO: implement map
Pool.prototype.map = function (array, callback) {
};
*/

/**
 * Grab the first task from the queue, find a free worker, and assign the
 * worker to the task.
 * @protected
 */
Pool.prototype._next = function () {
  if (this.tasks.length > 0) {
    // there are tasks in the queue

    // find an available worker
    var worker = this._getWorker();
    if (worker) {
      // get the first task from the queue
      var me = this;
      var task = this.tasks.shift();

      // check if the task is still pending (and not cancelled -> promise rejected)
      if (task.resolver.promise.pending) {
        // send the request to the worker
        var promise = worker.exec(task.method, task.params, task.resolver, task.options).then(me._boundNext)["catch"](function () {
          // if the worker crashed and terminated, remove it from the pool
          if (worker.terminated) {
            return me._removeWorker(worker);
          }
        }).then(function () {
          me._next(); // trigger next task in the queue
        });

        // start queued timer now
        if (typeof task.timeout === 'number') {
          promise.timeout(task.timeout);
        }
      } else {
        // The task taken was already complete (either rejected or resolved), so just trigger next task in the queue
        me._next();
      }
    }
  }
};

/**
 * Get an available worker. If no worker is available and the maximum number
 * of workers isn't yet reached, a new worker will be created and returned.
 * If no worker is available and the maximum number of workers is reached,
 * null will be returned.
 *
 * @return {WorkerHandler | null} worker
 * @private
 */
Pool.prototype._getWorker = function () {
  // find a non-busy worker
  var workers = this.workers;
  for (var i = 0; i < workers.length; i++) {
    var worker = workers[i];
    if (worker.busy() === false) {
      return worker;
    }
  }
  if (workers.length < this.maxWorkers) {
    // create a new worker
    worker = this._createWorkerHandler();
    workers.push(worker);
    return worker;
  }
  return null;
};

/**
 * Remove a worker from the pool.
 * Attempts to terminate worker if not already terminated, and ensures the minimum
 * pool size is met.
 * @param {WorkerHandler} worker
 * @return {Promise<WorkerHandler>}
 * @protected
 */
Pool.prototype._removeWorker = function (worker) {
  var me = this;
  DEBUG_PORT_ALLOCATOR.releasePort(worker.debugPort);
  // _removeWorker will call this, but we need it to be removed synchronously
  this._removeWorkerFromList(worker);
  // If minWorkers set, spin up new workers to replace the crashed ones
  this._ensureMinWorkers();
  // terminate the worker (if not already terminated)
  return new Promise(function (resolve, reject) {
    worker.terminate(false, function (err) {
      me.onTerminateWorker({
        forkArgs: worker.forkArgs,
        forkOpts: worker.forkOpts,
        script: worker.script
      });
      if (err) {
        reject(err);
      } else {
        resolve(worker);
      }
    });
  });
};

/**
 * Remove a worker from the pool list.
 * @param {WorkerHandler} worker
 * @protected
 */
Pool.prototype._removeWorkerFromList = function (worker) {
  // remove from the list with workers
  var index = this.workers.indexOf(worker);
  if (index !== -1) {
    this.workers.splice(index, 1);
  }
};

/**
 * Close all active workers. Tasks currently being executed will be finished first.
 * @param {boolean} [force=false]   If false (default), the workers are terminated
 *                                  after finishing all tasks currently in
 *                                  progress. If true, the workers will be
 *                                  terminated immediately.
 * @param {number} [timeout]        If provided and non-zero, worker termination promise will be rejected
 *                                  after timeout if worker process has not been terminated.
 * @return {Promise.<void, Error>}
 */
Pool.prototype.terminate = function (force, timeout) {
  var me = this;

  // cancel any pending tasks
  this.tasks.forEach(function (task) {
    task.resolver.reject(new Error('Pool terminated'));
  });
  this.tasks.length = 0;
  var f = function f(worker) {
    DEBUG_PORT_ALLOCATOR.releasePort(worker.debugPort);
    this._removeWorkerFromList(worker);
  };
  var removeWorker = f.bind(this);
  var promises = [];
  var workers = this.workers.slice();
  workers.forEach(function (worker) {
    var termPromise = worker.terminateAndNotify(force, timeout).then(removeWorker).always(function () {
      me.onTerminateWorker({
        forkArgs: worker.forkArgs,
        forkOpts: worker.forkOpts,
        script: worker.script
      });
    });
    promises.push(termPromise);
  });
  return Promise.all(promises);
};

/**
 * Retrieve statistics on tasks and workers.
 * @return {{totalWorkers: number, busyWorkers: number, idleWorkers: number, pendingTasks: number, activeTasks: number}} Returns an object with statistics
 */
Pool.prototype.stats = function () {
  var totalWorkers = this.workers.length;
  var busyWorkers = this.workers.filter(function (worker) {
    return worker.busy();
  }).length;
  return {
    totalWorkers: totalWorkers,
    busyWorkers: busyWorkers,
    idleWorkers: totalWorkers - busyWorkers,
    pendingTasks: this.tasks.length,
    activeTasks: busyWorkers
  };
};

/**
 * Ensures that a minimum of minWorkers is up and running
 * @protected
 */
Pool.prototype._ensureMinWorkers = function () {
  if (this.minWorkers) {
    for (var i = this.workers.length; i < this.minWorkers; i++) {
      this.workers.push(this._createWorkerHandler());
    }
  }
};

/**
 * Helper function to create a new WorkerHandler and pass all options.
 * @return {WorkerHandler}
 * @private
 */
Pool.prototype._createWorkerHandler = function () {
  var overridenParams = this.onCreateWorker({
    forkArgs: this.forkArgs,
    forkOpts: this.forkOpts,
    workerThreadOpts: this.workerThreadOpts,
    script: this.script
  }) || {};
  return new WorkerHandler(overridenParams.script || this.script, {
    forkArgs: overridenParams.forkArgs || this.forkArgs,
    forkOpts: overridenParams.forkOpts || this.forkOpts,
    workerThreadOpts: overridenParams.workerThreadOpts || this.workerThreadOpts,
    debugPort: DEBUG_PORT_ALLOCATOR.nextAvailableStartingAt(this.debugPortStart),
    workerType: this.workerType
  });
};

/**
 * Ensure that the maxWorkers option is an integer >= 1
 * @param {*} maxWorkers
 * @returns {boolean} returns true maxWorkers has a valid value
 */
function validateMaxWorkers(maxWorkers) {
  if (!isNumber(maxWorkers) || !isInteger(maxWorkers) || maxWorkers < 1) {
    throw new TypeError('Option maxWorkers must be an integer number >= 1');
  }
}

/**
 * Ensure that the minWorkers option is an integer >= 0
 * @param {*} minWorkers
 * @returns {boolean} returns true when minWorkers has a valid value
 */
function validateMinWorkers(minWorkers) {
  if (!isNumber(minWorkers) || !isInteger(minWorkers) || minWorkers < 0) {
    throw new TypeError('Option minWorkers must be an integer number >= 0');
  }
}

/**
 * Test whether a variable is a number
 * @param {*} value
 * @returns {boolean} returns true when value is a number
 */
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Test whether a number is an integer
 * @param {number} value
 * @returns {boolean} Returns true if value is an integer
 */
function isInteger(value) {
  return Math.round(value) == value;
}
module.exports = Pool;

/***/ }),

/***/ 219:
/***/ (function(module) {

"use strict";


/**
 * Promise
 *
 * Inspired by https://gist.github.com/RubaXa/8501359 from RubaXa <trash@rubaxa.org>
 *
 * @param {Function} handler   Called as handler(resolve: Function, reject: Function)
 * @param {Promise} [parent]   Parent promise for propagation of cancel and timeout
 */
function Promise(handler, parent) {
  var me = this;
  if (!(this instanceof Promise)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }
  if (typeof handler !== 'function') {
    throw new SyntaxError('Function parameter handler(resolve, reject) missing');
  }
  var _onSuccess = [];
  var _onFail = [];

  // status
  this.resolved = false;
  this.rejected = false;
  this.pending = true;

  /**
   * Process onSuccess and onFail callbacks: add them to the queue.
   * Once the promise is resolve, the function _promise is replace.
   * @param {Function} onSuccess
   * @param {Function} onFail
   * @private
   */
  var _process = function _process(onSuccess, onFail) {
    _onSuccess.push(onSuccess);
    _onFail.push(onFail);
  };

  /**
   * Add an onSuccess callback and optionally an onFail callback to the Promise
   * @param {Function} onSuccess
   * @param {Function} [onFail]
   * @returns {Promise} promise
   */
  this.then = function (onSuccess, onFail) {
    return new Promise(function (resolve, reject) {
      var s = onSuccess ? _then(onSuccess, resolve, reject) : resolve;
      var f = onFail ? _then(onFail, resolve, reject) : reject;
      _process(s, f);
    }, me);
  };

  /**
   * Resolve the promise
   * @param {*} result
   * @type {Function}
   */
  var _resolve2 = function _resolve(result) {
    // update status
    me.resolved = true;
    me.rejected = false;
    me.pending = false;
    _onSuccess.forEach(function (fn) {
      fn(result);
    });
    _process = function _process(onSuccess, onFail) {
      onSuccess(result);
    };
    _resolve2 = _reject2 = function _reject() {};
    return me;
  };

  /**
   * Reject the promise
   * @param {Error} error
   * @type {Function}
   */
  var _reject2 = function _reject(error) {
    // update status
    me.resolved = false;
    me.rejected = true;
    me.pending = false;
    _onFail.forEach(function (fn) {
      fn(error);
    });
    _process = function _process(onSuccess, onFail) {
      onFail(error);
    };
    _resolve2 = _reject2 = function _reject() {};
    return me;
  };

  /**
   * Cancel te promise. This will reject the promise with a CancellationError
   * @returns {Promise} self
   */
  this.cancel = function () {
    if (parent) {
      parent.cancel();
    } else {
      _reject2(new CancellationError());
    }
    return me;
  };

  /**
   * Set a timeout for the promise. If the promise is not resolved within
   * the time, the promise will be cancelled and a TimeoutError is thrown.
   * If the promise is resolved in time, the timeout is removed.
   * @param {number} delay     Delay in milliseconds
   * @returns {Promise} self
   */
  this.timeout = function (delay) {
    if (parent) {
      parent.timeout(delay);
    } else {
      var timer = setTimeout(function () {
        _reject2(new TimeoutError('Promise timed out after ' + delay + ' ms'));
      }, delay);
      me.always(function () {
        clearTimeout(timer);
      });
    }
    return me;
  };

  // attach handler passing the resolve and reject functions
  handler(function (result) {
    _resolve2(result);
  }, function (error) {
    _reject2(error);
  });
}

/**
 * Execute given callback, then call resolve/reject based on the returned result
 * @param {Function} callback
 * @param {Function} resolve
 * @param {Function} reject
 * @returns {Function}
 * @private
 */
function _then(callback, resolve, reject) {
  return function (result) {
    try {
      var res = callback(result);
      if (res && typeof res.then === 'function' && typeof res['catch'] === 'function') {
        // method returned a promise
        res.then(resolve, reject);
      } else {
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  };
}

/**
 * Add an onFail callback to the Promise
 * @param {Function} onFail
 * @returns {Promise} promise
 */
Promise.prototype['catch'] = function (onFail) {
  return this.then(null, onFail);
};

// TODO: add support for Promise.catch(Error, callback)
// TODO: add support for Promise.catch(Error, Error, callback)

/**
 * Execute given callback when the promise either resolves or rejects.
 * @param {Function} fn
 * @returns {Promise} promise
 */
Promise.prototype.always = function (fn) {
  return this.then(fn, fn);
};

/**
 * Create a promise which resolves when all provided promises are resolved,
 * and fails when any of the promises resolves.
 * @param {Promise[]} promises
 * @returns {Promise} promise
 */
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var remaining = promises.length,
      results = [];
    if (remaining) {
      promises.forEach(function (p, i) {
        p.then(function (result) {
          results[i] = result;
          remaining--;
          if (remaining == 0) {
            resolve(results);
          }
        }, function (error) {
          remaining = 0;
          reject(error);
        });
      });
    } else {
      resolve(results);
    }
  });
};

/**
 * Create a promise resolver
 * @returns {{promise: Promise, resolve: Function, reject: Function}} resolver
 */
Promise.defer = function () {
  var resolver = {};
  resolver.promise = new Promise(function (resolve, reject) {
    resolver.resolve = resolve;
    resolver.reject = reject;
  });
  return resolver;
};

/**
 * Create a cancellation error
 * @param {String} [message]
 * @extends Error
 */
function CancellationError(message) {
  this.message = message || 'promise cancelled';
  this.stack = new Error().stack;
}
CancellationError.prototype = new Error();
CancellationError.prototype.constructor = Error;
CancellationError.prototype.name = 'CancellationError';
Promise.CancellationError = CancellationError;

/**
 * Create a timeout error
 * @param {String} [message]
 * @extends Error
 */
function TimeoutError(message) {
  this.message = message || 'timeout exceeded';
  this.stack = new Error().stack;
}
TimeoutError.prototype = new Error();
TimeoutError.prototype.constructor = Error;
TimeoutError.prototype.name = 'TimeoutError';
Promise.TimeoutError = TimeoutError;
module.exports = Promise;

/***/ }),

/***/ 751:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_21244__) {

"use strict";


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var Promise = __nested_webpack_require_21244__(219);
var environment = __nested_webpack_require_21244__(828);
var requireFoolWebpack = __nested_webpack_require_21244__(397);

/**
 * Special message sent by parent which causes a child process worker to terminate itself.
 * Not a "message object"; this string is the entire message.
 */
var TERMINATE_METHOD_ID = '__workerpool-terminate__';

/**
 * If sending `TERMINATE_METHOD_ID` does not cause the child process to exit in this many milliseconds,
 * force-kill the child process.
 */
var CHILD_PROCESS_EXIT_TIMEOUT = 1000;
function ensureWorkerThreads() {
  var WorkerThreads = tryRequireWorkerThreads();
  if (!WorkerThreads) {
    throw new Error('WorkerPool: workerType = \'thread\' is not supported, Node >= 11.7.0 required');
  }
  return WorkerThreads;
}

// check whether Worker is supported by the browser
function ensureWebWorker() {
  // Workaround for a bug in PhantomJS (Or QtWebkit): https://github.com/ariya/phantomjs/issues/14534
  if (typeof Worker !== 'function' && ((typeof Worker === "undefined" ? "undefined" : _typeof(Worker)) !== 'object' || typeof Worker.prototype.constructor !== 'function')) {
    throw new Error('WorkerPool: Web Workers not supported');
  }
}
function tryRequireWorkerThreads() {
  try {
    return requireFoolWebpack('worker_threads');
  } catch (error) {
    if (_typeof(error) === 'object' && error !== null && error.code === 'MODULE_NOT_FOUND') {
      // no worker_threads available (old version of node.js)
      return null;
    } else {
      throw error;
    }
  }
}

// get the default worker script
function getDefaultWorker() {
  if (environment.platform === 'browser') {
    // test whether the browser supports all features that we need
    if (typeof Blob === 'undefined') {
      throw new Error('Blob not supported by the browser');
    }
    if (!window.URL || typeof window.URL.createObjectURL !== 'function') {
      throw new Error('URL.createObjectURL not supported by the browser');
    }

    // use embedded worker.js
    var blob = new Blob([__nested_webpack_require_21244__(670)], {
      type: 'text/javascript'
    });
    return window.URL.createObjectURL(blob);
  } else {
    // use external worker.js in current directory
    return __dirname + '/worker.js';
  }
}
function setupWorker(script, options) {
  if (options.workerType === 'web') {
    // browser only
    ensureWebWorker();
    return setupBrowserWorker(script, Worker);
  } else if (options.workerType === 'thread') {
    // node.js only
    WorkerThreads = ensureWorkerThreads();
    return setupWorkerThreadWorker(script, WorkerThreads, options.workerThreadOpts);
  } else if (options.workerType === 'process' || !options.workerType) {
    // node.js only
    return setupProcessWorker(script, resolveForkOptions(options), requireFoolWebpack('child_process'));
  } else {
    // options.workerType === 'auto' or undefined
    if (environment.platform === 'browser') {
      ensureWebWorker();
      return setupBrowserWorker(script, Worker);
    } else {
      // environment.platform === 'node'
      var WorkerThreads = tryRequireWorkerThreads();
      if (WorkerThreads) {
        return setupWorkerThreadWorker(script, WorkerThreads);
      } else {
        return setupProcessWorker(script, resolveForkOptions(options), requireFoolWebpack('child_process'));
      }
    }
  }
}
function setupBrowserWorker(script, Worker) {
  // create the web worker
  var worker = new Worker(script);
  worker.isBrowserWorker = true;
  // add node.js API to the web worker
  worker.on = function (event, callback) {
    this.addEventListener(event, function (message) {
      callback(message.data);
    });
  };
  worker.send = function (message) {
    this.postMessage(message);
  };
  return worker;
}
function setupWorkerThreadWorker(script, WorkerThreads, workerThreadOptions) {
  var worker = new WorkerThreads.Worker(script, _objectSpread({
    stdout: false,
    // automatically pipe worker.STDOUT to process.STDOUT
    stderr: false
  }, workerThreadOptions));
  worker.isWorkerThread = true;
  // make the worker mimic a child_process
  worker.send = function (message) {
    this.postMessage(message);
  };
  worker.kill = function () {
    this.terminate();
    return true;
  };
  worker.disconnect = function () {
    this.terminate();
  };
  return worker;
}
function setupProcessWorker(script, options, child_process) {
  // no WorkerThreads, fallback to sub-process based workers
  var worker = child_process.fork(script, options.forkArgs, options.forkOpts);
  worker.isChildProcess = true;
  return worker;
}

// add debug flags to child processes if the node inspector is active
function resolveForkOptions(opts) {
  opts = opts || {};
  var processExecArgv = process.execArgv.join(' ');
  var inspectorActive = processExecArgv.indexOf('--inspect') !== -1;
  var debugBrk = processExecArgv.indexOf('--debug-brk') !== -1;
  var execArgv = [];
  if (inspectorActive) {
    execArgv.push('--inspect=' + opts.debugPort);
    if (debugBrk) {
      execArgv.push('--debug-brk');
    }
  }
  process.execArgv.forEach(function (arg) {
    if (arg.indexOf('--max-old-space-size') > -1) {
      execArgv.push(arg);
    }
  });
  return Object.assign({}, opts, {
    forkArgs: opts.forkArgs,
    forkOpts: Object.assign({}, opts.forkOpts, {
      execArgv: (opts.forkOpts && opts.forkOpts.execArgv || []).concat(execArgv)
    })
  });
}

/**
 * Converts a serialized error to Error
 * @param {Object} obj Error that has been serialized and parsed to object
 * @return {Error} The equivalent Error.
 */
function objectToError(obj) {
  var temp = new Error('');
  var props = Object.keys(obj);
  for (var i = 0; i < props.length; i++) {
    temp[props[i]] = obj[props[i]];
  }
  return temp;
}

/**
 * A WorkerHandler controls a single worker. This worker can be a child process
 * on node.js or a WebWorker in a browser environment.
 * @param {String} [script] If no script is provided, a default worker with a
 *                          function run will be created.
 * @param {WorkerPoolOptions} _options See docs
 * @constructor
 */
function WorkerHandler(script, _options) {
  var me = this;
  var options = _options || {};
  this.script = script || getDefaultWorker();
  this.worker = setupWorker(this.script, options);
  this.debugPort = options.debugPort;
  this.forkOpts = options.forkOpts;
  this.forkArgs = options.forkArgs;
  this.workerThreadOpts = options.workerThreadOpts;

  // The ready message is only sent if the worker.add method is called (And the default script is not used)
  if (!script) {
    this.worker.ready = true;
  }

  // queue for requests that are received before the worker is ready
  this.requestQueue = [];
  this.worker.on('message', function (response) {
    if (me.terminated) {
      return;
    }
    if (typeof response === 'string' && response === 'ready') {
      me.worker.ready = true;
      dispatchQueuedRequests();
    } else {
      // find the task from the processing queue, and run the tasks callback
      var id = response.id;
      var task = me.processing[id];
      if (task !== undefined) {
        if (response.isEvent) {
          if (task.options && typeof task.options.on === 'function') {
            task.options.on(response.payload);
          }
        } else {
          // remove the task from the queue
          delete me.processing[id];

          // test if we need to terminate
          if (me.terminating === true) {
            // complete worker termination if all tasks are finished
            me.terminate();
          }

          // resolve the task's promise
          if (response.error) {
            task.resolver.reject(objectToError(response.error));
          } else {
            task.resolver.resolve(response.result);
          }
        }
      }
    }
  });

  // reject all running tasks on worker error
  function onError(error) {
    me.terminated = true;
    for (var id in me.processing) {
      if (me.processing[id] !== undefined) {
        me.processing[id].resolver.reject(error);
      }
    }
    me.processing = Object.create(null);
  }

  // send all queued requests to worker
  function dispatchQueuedRequests() {
    var _iterator = _createForOfIteratorHelper(me.requestQueue.splice(0)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var request = _step.value;
        me.worker.send(request);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var worker = this.worker;
  // listen for worker messages error and exit
  this.worker.on('error', onError);
  this.worker.on('exit', function (exitCode, signalCode) {
    var message = 'Workerpool Worker terminated Unexpectedly\n';
    message += '    exitCode: `' + exitCode + '`\n';
    message += '    signalCode: `' + signalCode + '`\n';
    message += '    workerpool.script: `' + me.script + '`\n';
    message += '    spawnArgs: `' + worker.spawnargs + '`\n';
    message += '    spawnfile: `' + worker.spawnfile + '`\n';
    message += '    stdout: `' + worker.stdout + '`\n';
    message += '    stderr: `' + worker.stderr + '`\n';
    onError(new Error(message));
  });
  this.processing = Object.create(null); // queue with tasks currently in progress

  this.terminating = false;
  this.terminated = false;
  this.terminationHandler = null;
  this.lastId = 0;
}

/**
 * Get a list with methods available on the worker.
 * @return {Promise.<String[], Error>} methods
 */
WorkerHandler.prototype.methods = function () {
  return this.exec('methods');
};

/**
 * Execute a method with given parameters on the worker
 * @param {String} method
 * @param {Array} [params]
 * @param {{resolve: Function, reject: Function}} [resolver]
 * @param {ExecOptions}  [options]
 * @return {Promise.<*, Error>} result
 */
WorkerHandler.prototype.exec = function (method, params, resolver, options) {
  if (!resolver) {
    resolver = Promise.defer();
  }

  // generate a unique id for the task
  var id = ++this.lastId;

  // register a new task as being in progress
  this.processing[id] = {
    id: id,
    resolver: resolver,
    options: options
  };

  // build a JSON-RPC request
  var request = {
    id: id,
    method: method,
    params: params
  };
  if (this.terminated) {
    resolver.reject(new Error('Worker is terminated'));
  } else if (this.worker.ready) {
    // send the request to the worker
    this.worker.send(request);
  } else {
    this.requestQueue.push(request);
  }

  // on cancellation, force the worker to terminate
  var me = this;
  return resolver.promise["catch"](function (error) {
    if (error instanceof Promise.CancellationError || error instanceof Promise.TimeoutError) {
      // remove this task from the queue. It is already rejected (hence this
      // catch event), and else it will be rejected again when terminating
      delete me.processing[id];

      // terminate worker
      return me.terminateAndNotify(true).then(function () {
        throw error;
      }, function (err) {
        throw err;
      });
    } else {
      throw error;
    }
  });
};

/**
 * Test whether the worker is working or not
 * @return {boolean} Returns true if the worker is busy
 */
WorkerHandler.prototype.busy = function () {
  return Object.keys(this.processing).length > 0;
};

/**
 * Terminate the worker.
 * @param {boolean} [force=false]   If false (default), the worker is terminated
 *                                  after finishing all tasks currently in
 *                                  progress. If true, the worker will be
 *                                  terminated immediately.
 * @param {function} [callback=null] If provided, will be called when process terminates.
 */
WorkerHandler.prototype.terminate = function (force, callback) {
  var me = this;
  if (force) {
    // cancel all tasks in progress
    for (var id in this.processing) {
      if (this.processing[id] !== undefined) {
        this.processing[id].resolver.reject(new Error('Worker terminated'));
      }
    }
    this.processing = Object.create(null);
  }
  if (typeof callback === 'function') {
    this.terminationHandler = callback;
  }
  if (!this.busy()) {
    // all tasks are finished. kill the worker
    var cleanup = function cleanup(err) {
      me.terminated = true;
      if (me.worker != null && me.worker.removeAllListeners) {
        // removeAllListeners is only available for child_process
        me.worker.removeAllListeners('message');
      }
      me.worker = null;
      me.terminating = false;
      if (me.terminationHandler) {
        me.terminationHandler(err, me);
      } else if (err) {
        throw err;
      }
    };
    if (this.worker) {
      if (typeof this.worker.kill === 'function') {
        if (this.worker.killed) {
          cleanup(new Error('worker already killed!'));
          return;
        }
        if (this.worker.isChildProcess) {
          var cleanExitTimeout = setTimeout(function () {
            if (me.worker) {
              me.worker.kill();
            }
          }, CHILD_PROCESS_EXIT_TIMEOUT);
          this.worker.once('exit', function () {
            clearTimeout(cleanExitTimeout);
            if (me.worker) {
              me.worker.killed = true;
            }
            cleanup();
          });
          if (this.worker.ready) {
            this.worker.send(TERMINATE_METHOD_ID);
          } else {
            this.requestQueue.push(TERMINATE_METHOD_ID);
          }
        } else {
          // worker_thread
          this.worker.kill();
          this.worker.killed = true;
          cleanup();
        }
        return;
      } else if (typeof this.worker.terminate === 'function') {
        this.worker.terminate(); // web worker
        this.worker.killed = true;
      } else {
        throw new Error('Failed to terminate worker');
      }
    }
    cleanup();
  } else {
    // we can't terminate immediately, there are still tasks being executed
    this.terminating = true;
  }
};

/**
 * Terminate the worker, returning a Promise that resolves when the termination has been done.
 * @param {boolean} [force=false]   If false (default), the worker is terminated
 *                                  after finishing all tasks currently in
 *                                  progress. If true, the worker will be
 *                                  terminated immediately.
 * @param {number} [timeout]        If provided and non-zero, worker termination promise will be rejected
 *                                  after timeout if worker process has not been terminated.
 * @return {Promise.<WorkerHandler, Error>}
 */
WorkerHandler.prototype.terminateAndNotify = function (force, timeout) {
  var resolver = Promise.defer();
  if (timeout) {
    resolver.promise.timeout = timeout;
  }
  this.terminate(force, function (err, worker) {
    if (err) {
      resolver.reject(err);
    } else {
      resolver.resolve(worker);
    }
  });
  return resolver.promise;
};
module.exports = WorkerHandler;
module.exports._tryRequireWorkerThreads = tryRequireWorkerThreads;
module.exports._setupProcessWorker = setupProcessWorker;
module.exports._setupBrowserWorker = setupBrowserWorker;
module.exports._setupWorkerThreadWorker = setupWorkerThreadWorker;
module.exports.ensureWorkerThreads = ensureWorkerThreads;

/***/ }),

/***/ 833:
/***/ (function(module) {

"use strict";


var MAX_PORTS = 65535;
module.exports = DebugPortAllocator;
function DebugPortAllocator() {
  this.ports = Object.create(null);
  this.length = 0;
}
DebugPortAllocator.prototype.nextAvailableStartingAt = function (starting) {
  while (this.ports[starting] === true) {
    starting++;
  }
  if (starting >= MAX_PORTS) {
    throw new Error('WorkerPool debug port limit reached: ' + starting + '>= ' + MAX_PORTS);
  }
  this.ports[starting] = true;
  this.length++;
  return starting;
};
DebugPortAllocator.prototype.releasePort = function (port) {
  delete this.ports[port];
  this.length--;
};

/***/ }),

/***/ 828:
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_40334__) {

var requireFoolWebpack = __nested_webpack_require_40334__(397);

// source: https://github.com/flexdinesh/browser-or-node
var isNode = function isNode(nodeProcess) {
  return typeof nodeProcess !== 'undefined' && nodeProcess.versions != null && nodeProcess.versions.node != null;
};
module.exports.isNode = isNode;

// determines the JavaScript platform: browser or node
module.exports.platform = typeof process !== 'undefined' && isNode(process) ? 'node' : 'browser';

// determines whether the code is running in main thread or not
// note that in node.js we have to check both worker_thread and child_process
var worker_threads = tryRequireFoolWebpack('worker_threads');
module.exports.isMainThread = module.exports.platform === 'node' ? (!worker_threads || worker_threads.isMainThread) && !process.connected : typeof Window !== 'undefined';

// determines the number of cpus available
module.exports.cpus = module.exports.platform === 'browser' ? self.navigator.hardwareConcurrency : requireFoolWebpack('os').cpus().length;
function tryRequireFoolWebpack(module) {
  try {
    return requireFoolWebpack(module);
  } catch (err) {
    return null;
  }
}

/***/ }),

/***/ 670:
/***/ (function(module) {

/**
 * embeddedWorker.js contains an embedded version of worker.js.
 * This file is automatically generated,
 * changes made in this file will be overwritten.
 */
module.exports = "!function(){var __webpack_exports__={};!function(){var exports=__webpack_exports__,__webpack_unused_export__;function _typeof(r){return(_typeof=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&\"function\"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?\"symbol\":typeof r})(r)}var requireFoolWebpack=eval(\"typeof require !== 'undefined' ? require : function (module) { throw new Error('Module \\\" + module + \\\" not found.') }\"),TERMINATE_METHOD_ID=\"__workerpool-terminate__\",worker={exit:function(){}},WorkerThreads,parentPort;if(\"undefined\"!=typeof self&&\"function\"==typeof postMessage&&\"function\"==typeof addEventListener)worker.on=function(r,e){addEventListener(r,function(r){e(r.data)})},worker.send=function(r){postMessage(r)};else{if(\"undefined\"==typeof process)throw new Error(\"Script must be executed as a worker\");try{WorkerThreads=requireFoolWebpack(\"worker_threads\")}catch(error){if(\"object\"!==_typeof(error)||null===error||\"MODULE_NOT_FOUND\"!==error.code)throw error}WorkerThreads&&null!==WorkerThreads.parentPort?(parentPort=WorkerThreads.parentPort,worker.send=parentPort.postMessage.bind(parentPort),worker.on=parentPort.on.bind(parentPort)):(worker.on=process.on.bind(process),worker.send=process.send.bind(process),worker.on(\"disconnect\",function(){process.exit(1)}),worker.exit=process.exit.bind(process))}function convertError(o){return Object.getOwnPropertyNames(o).reduce(function(r,e){return Object.defineProperty(r,e,{value:o[e],enumerable:!0})},{})}function isPromise(r){return r&&\"function\"==typeof r.then&&\"function\"==typeof r.catch}worker.methods={},worker.methods.run=function(r,e){r=new Function(\"return (\"+r+\").apply(null, arguments);\");return r.apply(r,e)},worker.methods.methods=function(){return Object.keys(worker.methods)};var currentRequestId=null;worker.on(\"message\",function(e){if(e===TERMINATE_METHOD_ID)return worker.exit(0);try{var r=worker.methods[e.method];if(!r)throw new Error('Unknown method \"'+e.method+'\"');currentRequestId=e.id;var o=r.apply(r,e.params);isPromise(o)?o.then(function(r){worker.send({id:e.id,result:r,error:null}),currentRequestId=null}).catch(function(r){worker.send({id:e.id,result:null,error:convertError(r)}),currentRequestId=null}):(worker.send({id:e.id,result:o,error:null}),currentRequestId=null)}catch(r){worker.send({id:e.id,result:null,error:convertError(r)})}}),worker.register=function(r){if(r)for(var e in r)r.hasOwnProperty(e)&&(worker.methods[e]=r[e]);worker.send(\"ready\")},worker.emit=function(r){currentRequestId&&worker.send({id:currentRequestId,isEvent:!0,payload:r})},__webpack_unused_export__=worker.register,worker.emit}()}();";

/***/ }),

/***/ 397:
/***/ (function(module) {

// source of inspiration: https://github.com/sindresorhus/require-fool-webpack
var requireFoolWebpack = eval('typeof require !== \'undefined\' ' + '? require ' + ': function (module) { throw new Error(\'Module " + module + " not found.\') }');
module.exports = requireFoolWebpack;

/***/ }),

/***/ 744:
/***/ (function(__unused_webpack_module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * worker must be started as a child process or a web worker.
 * It listens for RPC messages from the parent process.
 */

// source of inspiration: https://github.com/sindresorhus/require-fool-webpack
var requireFoolWebpack = eval('typeof require !== \'undefined\'' + ' ? require' + ' : function (module) { throw new Error(\'Module " + module + " not found.\') }');

/**
 * Special message sent by parent which causes the worker to terminate itself.
 * Not a "message object"; this string is the entire message.
 */
var TERMINATE_METHOD_ID = '__workerpool-terminate__';

// var nodeOSPlatform = require('./environment').nodeOSPlatform;

// create a worker API for sending and receiving messages which works both on
// node.js and in the browser
var worker = {
  exit: function exit() {}
};
if (typeof self !== 'undefined' && typeof postMessage === 'function' && typeof addEventListener === 'function') {
  // worker in the browser
  worker.on = function (event, callback) {
    addEventListener(event, function (message) {
      callback(message.data);
    });
  };
  worker.send = function (message) {
    postMessage(message);
  };
} else if (typeof process !== 'undefined') {
  // node.js

  var WorkerThreads;
  try {
    WorkerThreads = requireFoolWebpack('worker_threads');
  } catch (error) {
    if (_typeof(error) === 'object' && error !== null && error.code === 'MODULE_NOT_FOUND') {
      // no worker_threads, fallback to sub-process based workers
    } else {
      throw error;
    }
  }
  if (WorkerThreads && /* if there is a parentPort, we are in a WorkerThread */
  WorkerThreads.parentPort !== null) {
    var parentPort = WorkerThreads.parentPort;
    worker.send = parentPort.postMessage.bind(parentPort);
    worker.on = parentPort.on.bind(parentPort);
  } else {
    worker.on = process.on.bind(process);
    worker.send = process.send.bind(process);
    // register disconnect handler only for subprocess worker to exit when parent is killed unexpectedly
    worker.on('disconnect', function () {
      process.exit(1);
    });
    worker.exit = process.exit.bind(process);
  }
} else {
  throw new Error('Script must be executed as a worker');
}
function convertError(error) {
  return Object.getOwnPropertyNames(error).reduce(function (product, name) {
    return Object.defineProperty(product, name, {
      value: error[name],
      enumerable: true
    });
  }, {});
}

/**
 * Test whether a value is a Promise via duck typing.
 * @param {*} value
 * @returns {boolean} Returns true when given value is an object
 *                    having functions `then` and `catch`.
 */
function isPromise(value) {
  return value && typeof value.then === 'function' && typeof value["catch"] === 'function';
}

// functions available externally
worker.methods = {};

/**
 * Execute a function with provided arguments
 * @param {String} fn     Stringified function
 * @param {Array} [args]  Function arguments
 * @returns {*}
 */
worker.methods.run = function run(fn, args) {
  var f = new Function('return (' + fn + ').apply(null, arguments);');
  return f.apply(f, args);
};

/**
 * Get a list with methods available on this worker
 * @return {String[]} methods
 */
worker.methods.methods = function methods() {
  return Object.keys(worker.methods);
};
var currentRequestId = null;
worker.on('message', function (request) {
  if (request === TERMINATE_METHOD_ID) {
    return worker.exit(0);
  }
  try {
    var method = worker.methods[request.method];
    if (method) {
      currentRequestId = request.id;

      // execute the function
      var result = method.apply(method, request.params);
      if (isPromise(result)) {
        // promise returned, resolve this and then return
        result.then(function (result) {
          worker.send({
            id: request.id,
            result: result,
            error: null
          });
          currentRequestId = null;
        })["catch"](function (err) {
          worker.send({
            id: request.id,
            result: null,
            error: convertError(err)
          });
          currentRequestId = null;
        });
      } else {
        // immediate result
        worker.send({
          id: request.id,
          result: result,
          error: null
        });
        currentRequestId = null;
      }
    } else {
      throw new Error('Unknown method "' + request.method + '"');
    }
  } catch (err) {
    worker.send({
      id: request.id,
      result: null,
      error: convertError(err)
    });
  }
});

/**
 * Register methods to the worker
 * @param {Object} methods
 */
worker.register = function (methods) {
  if (methods) {
    for (var name in methods) {
      if (methods.hasOwnProperty(name)) {
        worker.methods[name] = methods[name];
      }
    }
  }
  worker.send('ready');
};
worker.emit = function (payload) {
  if (currentRequestId) {
    worker.send({
      id: currentRequestId,
      isEvent: true,
      payload: payload
    });
  }
};
if (true) {
  exports.add = worker.register;
  exports.emit = worker.emit;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_50492__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_50492__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;
var environment = __nested_webpack_require_50492__(828);

/**
 * Create a new worker pool
 * @param {string} [script]
 * @param {WorkerPoolOptions} [options]
 * @returns {Pool} pool
 */
exports.pool = function pool(script, options) {
  var Pool = __nested_webpack_require_50492__(345);
  return new Pool(script, options);
};

/**
 * Create a worker and optionally register a set of methods to the worker.
 * @param {Object} [methods]
 */
exports.worker = function worker(methods) {
  var worker = __nested_webpack_require_50492__(744);
  worker.add(methods);
};

/**
 * Sends an event to the parent worker pool.
 * @param {any} payload 
 */
exports.workerEmit = function workerEmit(payload) {
  var worker = __nested_webpack_require_50492__(744);
  worker.emit(payload);
};

/**
 * Create a promise.
 * @type {Promise} promise
 */
exports.Promise = __nested_webpack_require_50492__(219);
exports.platform = environment.platform;
exports.isMainThread = environment.isMainThread;
exports.cpus = environment.cpus;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=workerpool.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/bench.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7Ozs7O1dDaEVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGFibGVDZWxscy9GaWxsYWJsZUNlbGxzQ2FsY3VsYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9GaWxsZWRIZWlnaHQvRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9Ib2xlcy9Ib2xlc1YxQ2FsY3VsYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9TcXVhc2hlZFJvd3MvU3F1YXNoZWRSb3dzQ2FsY3VsYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9UdW5uZWxzL1R1bm5lbHNDYWxjdWxhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2aW5nQmVuY2gvQmVuY2hNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9UZXRyaXNTb2x2aW5nQmVuY2gvQmVuY2hQYXJhbXNHZW5lcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RldHJpc1NvbHZpbmdCZW5jaC9Db21tb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JlbmNoLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93b3JrZXJwb29sL2Rpc3Qvd29ya2VycG9vbC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yUGFyYW1zIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG1pbmltdW1WYWx1YWJsZUhlaWdodDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcG93TXVsdGlwbGllcjogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbXVsdGlwbGllcjogbnVtYmVyLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBwYXJhbXMgPSBuZXcgRmlsbGFibGVDZWxsc0NhbGN1bGF0b3JQYXJhbXMoNSwgMSwgMSksXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGNhbGN1bGF0ZVNjb3JlKHJlcXVlc3Q6IENhbGN1bGF0ZVNjb3JlUmVxdWVzdCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGZpZWxkSGVpZ2h0ID0gcmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodDtcbiAgICAgICAgY29uc3QgZmllbGRXaWR0aCA9IHJlcXVlc3QuZ2FtZURhdGEuc2V0dGluZ3MuZmllbGRXaWR0aDtcbiAgICAgICAgY29uc3QgW2ZpbGxhYmxlQ2VsbHNDb3VudCwgZmlsbGFibGVIZWlnaHRdID0gdGhpcy5jYWxjdWxhdGVGaWxsYWJsZVNwYWNlKHJlcXVlc3QuaW1hZ2luYWJsZU1hdHJpeCwgZmllbGRXaWR0aCk7XG4gICAgICAgIGxldCBmaWxsYWJsZUNlbGxzU2NvcmUgPSAwO1xuICAgICAgICBpZiAoZmlsbGFibGVIZWlnaHQgPiB0aGlzLnBhcmFtcy5taW5pbXVtVmFsdWFibGVIZWlnaHQpIHtcbiAgICAgICAgICAgIGZpbGxhYmxlQ2VsbHNTY29yZSA9IC1maWxsYWJsZUNlbGxzQ291bnRcbiAgICAgICAgICAgICAgICAqIE1hdGgucG93KFxuICAgICAgICAgICAgICAgICAgICBmaWxsYWJsZUNlbGxzQ291bnQsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxhYmxlQ2VsbHNDb3VudCAvIChmaWVsZEhlaWdodCAqIGZpZWxkV2lkdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAqIHRoaXMucGFyYW1zLnBvd011bHRpcGxpZXJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKiB0aGlzLnBhcmFtcy5tdWx0aXBsaWVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxsYWJsZUNlbGxzU2NvcmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVGaWxsYWJsZVNwYWNlKG1hdHJpeDogYm9vbGVhbltdW10sIGZpZWxkV2lkdGg6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBsZXQgY292ZXJlZENvbHVtbnMgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICAgICAgbGV0IGZpbGxhYmxlQ2VsbHNDb3VudCA9IDA7XG4gICAgICAgIGxldCBmaWxsYWJsZUhlaWdodCA9IDA7XG4gICAgICAgIG1hdHJpeC5ldmVyeShyb3cgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnMuYWRkKHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdmFsICYmIGNvdmVyZWRDb2x1bW5zLnNpemUgPiAwICYmICFjb3ZlcmVkQ29sdW1ucy5oYXMoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbGFibGVDZWxsc0NvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMuc2l6ZSA8IGZpZWxkV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZENvbHVtbnMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbGFibGVIZWlnaHQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW2ZpbGxhYmxlQ2VsbHNDb3VudCwgZmlsbGFibGVIZWlnaHRdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEZpbGxlZEhlaWdodENhbGN1bGF0b3JQYXJhbXMge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcG93TXVsdGlwbGllcjogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbXVsdGlwbGllcjogbnVtYmVyLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGxlZEhlaWdodENhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHBhcmFtcyA9IG5ldyBGaWxsZWRIZWlnaHRDYWxjdWxhdG9yUGFyYW1zKDEsIDMpLFxuICAgICkge31cblxuICAgIHB1YmxpYyBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbGN1bGF0ZUhlaWdodChyZXF1ZXN0LmltYWdpbmFibGVNYXRyaXgpO1xuICAgICAgICByZXR1cm4gLWhlaWdodFxuICAgICAgICAgICAgKiBNYXRoLnBvdyhcbiAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0IC8gcmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodFxuICAgICAgICAgICAgICAgICogdGhpcy5wYXJhbXMucG93TXVsdGlwbGllclxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgKiB0aGlzLnBhcmFtcy5tdWx0aXBsaWVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSGVpZ2h0KG1hdHJpeDogYm9vbGVhbltdW10pOiBudW1iZXIge1xuICAgICAgICBsZXQgbG93ZXN0RW1wdHlZID0gLTE7XG4gICAgICAgIG1hdHJpeC5ldmVyeSgocm93LCB5KSA9PiB7XG4gICAgICAgICAgICBpZiAocm93LmV2ZXJ5KHZhbCA9PiAhdmFsKSkge1xuICAgICAgICAgICAgICAgIGxvd2VzdEVtcHR5WSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXRyaXgubGVuZ3RoIC0gbG93ZXN0RW1wdHlZIC0gMTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0NhbGN1bGF0ZVNjb3JlUmVxdWVzdCwgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlfSBmcm9tIFwiLi4vU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBIb2xlc1YxQ2FsY3VsYXRvclBhcmFtcyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBjb3VudERlY3JlYXNlTXVsdGlwbGllcjogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY291bnRJbmNyZWFzZU11bHRpcGxpZXI6IG51bWJlcixcbiAgICAgICAgcHVibGljIGNvdmVyZWRIZWlnaHRQb3dNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBjb3ZlcmVkSGVpZ2h0TXVsdGlwbGllcjogbnVtYmVyLFxuICAgICkge31cbn1cblxuZXhwb3J0IGNsYXNzIEhvbGVzVjFDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBwYXJhbXMgPSBuZXcgSG9sZXNWMUNhbGN1bGF0b3JQYXJhbXMoMTUwLCA3MCwgMSwgNSksXG4gICAgKSB7fVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgW2hvbGVzQ291bnQsIGhvbGVzQ292ZXJlZEhlaWdodF0gPSB0aGlzLmNhbGN1bGF0ZUhvbGVzQW5kQ292ZXJlZEhlaWdodChyZXF1ZXN0LmltYWdpbmFibGVNYXRyaXgsIHJlcXVlc3QuZ2FtZURhdGEubWF0cml4KTtcbiAgICAgICAgY29uc3QgaG9sZXNDb3VudERlY3JlYXNlID0gcmVxdWVzdC5vcmlnaW5hbEhvbGVzLmxlbmd0aCAtIGhvbGVzQ291bnQ7XG4gICAgICAgIGxldCBob2xlc1Njb3JlID0gaG9sZXNDb3VudERlY3JlYXNlID4gMFxuICAgICAgICAgICAgPyBob2xlc0NvdW50RGVjcmVhc2UgKiB0aGlzLnBhcmFtcy5jb3VudERlY3JlYXNlTXVsdGlwbGllclxuICAgICAgICAgICAgOiBob2xlc0NvdW50RGVjcmVhc2UgKiB0aGlzLnBhcmFtcy5jb3VudEluY3JlYXNlTXVsdGlwbGllcjtcbiAgICAgICAgaWYgKGhvbGVzQ292ZXJlZEhlaWdodCAhPT0gMCAmJiBob2xlc0NvdW50ICE9PSAwKSB7XG4gICAgICAgICAgICBob2xlc1Njb3JlIC09XG4gICAgICAgICAgICAgICAgaG9sZXNDb3ZlcmVkSGVpZ2h0XG4gICAgICAgICAgICAgICAgKiBNYXRoLnBvdyhcbiAgICAgICAgICAgICAgICAgICAgaG9sZXNDb3ZlcmVkSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHQgLyAocmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodCAqIGhvbGVzQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAqIHRoaXMucGFyYW1zLmNvdmVyZWRIZWlnaHRQb3dNdWx0aXBsaWVyXG4gICAgICAgICAgICAgICAgKSAqIHRoaXMucGFyYW1zLmNvdmVyZWRIZWlnaHRNdWx0aXBsaWVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBob2xlc1Njb3JlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlSG9sZXNBbmRDb3ZlcmVkSGVpZ2h0KGltYWdpbmFibGVNYXRyaXg6IGJvb2xlYW5bXVtdLCByZWFsTWF0cml4OiBib29sZWFuW11bXSk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBjb25zdCBbb3JpZ2luYWxUaGVIaWdoZXN0SG9sZVksIG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWV0gPSB0aGlzLmNhbGN1bGF0ZVRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkocmVhbE1hdHJpeCk7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1uc1lzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj47XG4gICAgICAgIGxldCBob2xlc0NvdmVyZWRIZWlnaHRzU3VtID0gMDtcbiAgICAgICAgbGV0IGhvbGVzQ291bnQgPSAwO1xuICAgICAgICBpbWFnaW5hYmxlTWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xuICAgICAgICAgICAgcm93LmZvckVhY2goKHZhbCwgeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgIWNvdmVyZWRDb2x1bW5zWXMuaGFzKHgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdmVyZWRDb2x1bW5zWXMuc2V0KHgsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY292ZXJlZFkgPSBjb3ZlcmVkQ29sdW1uc1lzLmdldCh4KTtcbiAgICAgICAgICAgICAgICBpZiAoY292ZXJlZFkgIT09IHVuZGVmaW5lZCAmJiAhdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbGVzQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVZICE9PSB1bmRlZmluZWQgJiYgb3JpZ2luYWxUaGVIaWdoZXN0SG9sZUNvdmVyZWRZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5IDwgb3JpZ2luYWxUaGVIaWdoZXN0SG9sZVkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHRzU3VtICs9IHkgLSBjb3ZlcmVkWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY292ZXJlZFkgPCBvcmlnaW5hbFRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xlc0NvdmVyZWRIZWlnaHRzU3VtICs9IG9yaWdpbmFsVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSAtIGNvdmVyZWRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW2hvbGVzQ291bnQsIGhvbGVzQ292ZXJlZEhlaWdodHNTdW1dO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlVGhlSGlnaGVzdEhvbGVDb3ZlcmVkWShtYXRyaXg6IGJvb2xlYW5bXVtdKTogW251bWJlcnx1bmRlZmluZWQsIG51bWJlcnx1bmRlZmluZWRdIHtcbiAgICAgICAgbGV0IHRoZUhpZ2hlc3RIb2xlQ292ZXJlZFkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB0aGVIaWdoZXN0SG9sZVkgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBjb3ZlcmVkQ29sdW1uc1lzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj47XG4gICAgICAgIG1hdHJpeC5zb21lKChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3cuc29tZSgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAhY292ZXJlZENvbHVtbnNZcy5oYXMoeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXJlZENvbHVtbnNZcy5zZXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjb3ZlcmVkWSA9IGNvdmVyZWRDb2x1bW5zWXMuZ2V0KHgpO1xuICAgICAgICAgICAgICAgIGlmIChjb3ZlcmVkWSAhPT0gdW5kZWZpbmVkICYmICF2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlSGlnaGVzdEhvbGVZID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhlSGlnaGVzdEhvbGVDb3ZlcmVkWSA9IGNvdmVyZWRZO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW3RoZUhpZ2hlc3RIb2xlWSwgdGhlSGlnaGVzdEhvbGVDb3ZlcmVkWV07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtDYWxjdWxhdGVTY29yZVJlcXVlc3QsIFNjb3JlQ2FsY3VsYXRvckludGVyZmFjZX0gZnJvbSBcIi4uL1Njb3JlQ2FsY3VsYXRvckludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgU3F1YXNoZWRSb3dzQ2FsY3VsYXRvclBhcmFtcyB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBtdWx0aXBsaWVyOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTcXVhc2hlZFJvd3NDYWxjdWxhdG9yIGltcGxlbWVudHMgU2NvcmVDYWxjdWxhdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBwYXJhbXMgPSBuZXcgU3F1YXNoZWRSb3dzQ2FsY3VsYXRvclBhcmFtcyg1KSxcbiAgICApIHt9XG5cbiAgICBjYWxjdWxhdGVTY29yZShyZXF1ZXN0OiBDYWxjdWxhdGVTY29yZVJlcXVlc3QpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcmVxdWVzdC5zcXVhc2hlZExpbmVzQ291bnQgKiB0aGlzLnBhcmFtcy5tdWx0aXBsaWVyO1xuICAgIH1cbn1cbiIsImltcG9ydCB7Q2FsY3VsYXRlU2NvcmVSZXF1ZXN0LCBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2V9IGZyb20gXCIuLi9TY29yZUNhbGN1bGF0b3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFR1bm5lbHNDYWxjdWxhdG9yUGFyYW1zIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIG1pbmltdW1WYWx1YWJsZUhlaWdodDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgY291bnRNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBoZWlnaHRQb3dNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBoZWlnaHRNdWx0aXBsaWVyOiBudW1iZXIsXG4gICAgKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgVHVubmVsc0NhbGN1bGF0b3IgaW1wbGVtZW50cyBTY29yZUNhbGN1bGF0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHBhcmFtcyA9IG5ldyBUdW5uZWxzQ2FsY3VsYXRvclBhcmFtcygzLCA3MCwgMSwgNyksXG4gICAgKSB7fVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocmVxdWVzdDogQ2FsY3VsYXRlU2NvcmVSZXF1ZXN0KTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgW3R1bm5lbHNTdW1IZWlnaHQsIHR1bm5lbHNDb3VudF0gPSB0aGlzLmNhbGN1bGF0ZVR1bm5lbHNFeGNlcHRVbmNvdmVyZWQocmVxdWVzdC5pbWFnaW5hYmxlTWF0cml4LCByZXF1ZXN0LmdhbWVEYXRhLm1hdHJpeCk7XG4gICAgICAgIGlmICh0dW5uZWxzQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICgtdHVubmVsc0NvdW50ICogdGhpcy5wYXJhbXMuY291bnRNdWx0aXBsaWVyKVxuICAgICAgICAgICAgLSAodHVubmVsc1N1bUhlaWdodFxuICAgICAgICAgICAgICAgICogTWF0aC5wb3coXG4gICAgICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQgLyAocmVxdWVzdC5nYW1lRGF0YS5zZXR0aW5ncy5maWVsZEhlaWdodCAqIHR1bm5lbHNDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICogdGhpcy5wYXJhbXMuaGVpZ2h0UG93TXVsdGlwbGllclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAqIHRoaXMucGFyYW1zLmhlaWdodE11bHRpcGxpZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlVHVubmVsc0V4Y2VwdFVuY292ZXJlZChpbWFnaW5hYmxlTWF0cml4OiBib29sZWFuW11bXSwgcmVhbE1hdHJpeDogYm9vbGVhbltdW10pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgbGV0IHJlYWxDb3ZlcmVkQ29sdW1ucyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICByZWFsTWF0cml4LmV2ZXJ5KChyb3cpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxDb3ZlcmVkQ29sdW1ucy5hZGQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICAgICAgbGV0IHR1bm5lbHMgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPjtcbiAgICAgICAgY29uc3QgZmllbGRXaWR0aCA9IGltYWdpbmFibGVNYXRyaXhbMF0ubGVuZ3RoO1xuICAgICAgICBpbWFnaW5hYmxlTWF0cml4LmV2ZXJ5KChyb3csIHkpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh2YWwsIHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5hZGQoeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodmFsLCB4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxcbiAgICAgICAgICAgICAgICAgICAgJiYgIWltYWdpbmFibGVDb3ZlcmVkQ29sdW1ucy5oYXMoeClcbiAgICAgICAgICAgICAgICAgICAgJiYgIXJlYWxDb3ZlcmVkQ29sdW1ucy5oYXMoeClcbiAgICAgICAgICAgICAgICAgICAgJiYgKHggPT09IDAgfHwgaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLmhhcyh4IC0gMSkpXG4gICAgICAgICAgICAgICAgICAgICYmICh4ID09PSBmaWVsZFdpZHRoIC0gMSB8fCBpbWFnaW5hYmxlQ292ZXJlZENvbHVtbnMuaGFzKHggKyAxKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdHVubmVscy5zZXQoeCwgKHR1bm5lbHMuZ2V0KHgpIHx8IDApICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2luYWJsZUNvdmVyZWRDb2x1bW5zLnNpemUgPCBmaWVsZFdpZHRoO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHR1bm5lbHNTdW1IZWlnaHQgPSAwO1xuICAgICAgICBsZXQgdHVubmVsc0NvdW50ID0gMDtcbiAgICAgICAgdHVubmVscy5mb3JFYWNoKGhlaWdodCA9PiB7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0ID49IHRoaXMucGFyYW1zLm1pbmltdW1WYWx1YWJsZUhlaWdodCkge1xuICAgICAgICAgICAgICAgIHR1bm5lbHNTdW1IZWlnaHQgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHR1bm5lbHNDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFt0dW5uZWxzU3VtSGVpZ2h0LCB0dW5uZWxzQ291bnRdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7V29ya2VyUG9vbH0gZnJvbSBcIndvcmtlcnBvb2xcIjtcbmltcG9ydCB7R2FtZURhdGF9IGZyb20gXCIuLi9UZXRyaXMvQ29tbW9uXCI7XG5pbXBvcnQge0JlbmNoUnVuUGFyYW1ldGVyc30gZnJvbSBcIi4vQ29tbW9uXCI7XG5pbXBvcnQge0JlbmNoUGFyYW1zR2VuZXJhdG9yfSBmcm9tIFwiLi9CZW5jaFBhcmFtc0dlbmVyYXRvclwiO1xuXG5jbGFzcyBSdW5SZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcGVyY2VudGlsZXM6IEFycmF5PG51bWJlcj4sXG4gICAgICAgIHB1YmxpYyBhdmVyYWdlOiBudW1iZXJcbiAgICApIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBCZW5jaE1hbmFnZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaXRlcmF0aW9ucyA9IDEwMDA7XG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWx1YWJsZVBlcmNlbnRpbGVzID0gWzAsIDUwLCA5NSwgOTksIDk5LjldO1xuICAgIHByaXZhdGUgcmVzb2x2ZVdvcmtlcnNQb29sRnJlZWQ6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcG9vbDogV29ya2VyUG9vbCxcbiAgICAgICAgcHJpdmF0ZSBiZW5jaFBhcmFtc0dlbmVyYXRvcjogQmVuY2hQYXJhbXNHZW5lcmF0b3JcbiAgICApIHt9XG5cbiAgICBwdWJsaWMgYXN5bmMgc3RhcnRCZW5jaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5iZW5jaFBhcmFtc0dlbmVyYXRvci5jb3VudCgpKTtcbiAgICAgICAgZm9yIChsZXQgcGFyYW1zIG9mIHRoaXMuYmVuY2hQYXJhbXNHZW5lcmF0b3IuZ2VuZXJhdGUoKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ25ldyB2YWx1ZSB5aWVsZGVkJywgcGFyYW1zKTtcbiAgICAgICAgICAgIHRoaXMucnVuKHBhcmFtcykudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHRvZG8gc2F2ZSB0aGUgcmVzdWx0IHRvIGZpbGUgaW5zdGVhZFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbJHt0aGlzLnBhcmFtc1RvTG9nRGF0YShwYXJhbXMpLmpvaW4oJywnKX1dOyB7WyR7cmVzdWx0LnBlcmNlbnRpbGVzLmpvaW4oJywnKX1dLCAke3Jlc3VsdC5hdmVyYWdlfX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gdG9kbyByZW5kZXIgY2xpIHByb2dyZXNzIGJhclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9taXNlV29ya2Vyc1Bvb2xUb0ZyZWUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbGFzdCBwYWNrIG9mIHdvcmtlcnMgaGF2ZSBiZWVuIHJ1bicpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnBvb2wuc3RhdHMoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBydW4ocGFyYW1zOiBCZW5jaFJ1blBhcmFtZXRlcnMpOiBQcm9taXNlPFJ1blJlc3VsdD4ge1xuICAgICAgICBsZXQgcHJvbWlzZXM6IFByb21pc2U8bnVtYmVyPltdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVyYXRpb25zOyBpKyspIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb29sLmV4ZWMoJ3NvbHZlVGV0cmlzJywgW3BhcmFtc10pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IEdhbWVEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrV29ya2Vyc1Bvb2xJZkZyZWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnN0YXRzLmZpZ3VyZXNGYWxsZW4pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgICByZXN1bHRzLnNvcnQoKGEsYikgPT4gYiAtIGEpO1xuICAgICAgICBsZXQgcGVyY2VudGlsZVZhbHVlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgICAgICB0aGlzLnZhbHVhYmxlUGVyY2VudGlsZXMuZm9yRWFjaChwZXJjZW50aWxlID0+IHtcbiAgICAgICAgICAgIHBlcmNlbnRpbGVWYWx1ZXMucHVzaChyZXN1bHRzW01hdGguZmxvb3IodGhpcy5pdGVyYXRpb25zIC8gMTAwICogcGVyY2VudGlsZSldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGF2ZXJhZ2UgPSByZXN1bHRzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApIC8gcmVzdWx0cy5sZW5ndGg7XG4gICAgICAgIHJldHVybiBuZXcgUnVuUmVzdWx0KHBlcmNlbnRpbGVWYWx1ZXMsIGF2ZXJhZ2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgcHJvbWlzZVdvcmtlcnNQb29sVG9GcmVlKCkge1xuICAgICAgICBpZiAodGhpcy5wb29sLnN0YXRzKCkucGVuZGluZ1Rhc2tzIDwgdGhpcy5pdGVyYXRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXb3JrZXJzUG9vbEZyZWVkID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja1dvcmtlcnNQb29sSWZGcmVlKCkge1xuICAgICAgICBpZiAodGhpcy5wb29sLnN0YXRzKCkucGVuZGluZ1Rhc2tzIDwgdGhpcy5pdGVyYXRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVXb3JrZXJzUG9vbEZyZWVkKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJhbXNUb0xvZ0RhdGEocGFyYW1zOiBCZW5jaFJ1blBhcmFtZXRlcnMpOiBBcnJheTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHBhcmFtcy5maWxsYWJsZUNlbGxzQ2FsY3VsYXRvclBhcmFtcy5taW5pbXVtVmFsdWFibGVIZWlnaHQsXG4gICAgICAgICAgICBwYXJhbXMuZmlsbGFibGVDZWxsc0NhbGN1bGF0b3JQYXJhbXMucG93TXVsdGlwbGllcixcbiAgICAgICAgICAgIHBhcmFtcy5maWxsYWJsZUNlbGxzQ2FsY3VsYXRvclBhcmFtcy5tdWx0aXBsaWVyLFxuICAgICAgICAgICAgcGFyYW1zLmZpbGxlZEhlaWdodENhbGN1bGF0b3JQYXJhbXMucG93TXVsdGlwbGllcixcbiAgICAgICAgICAgIHBhcmFtcy5maWxsZWRIZWlnaHRDYWxjdWxhdG9yUGFyYW1zLm11bHRpcGxpZXIsXG4gICAgICAgICAgICBwYXJhbXMuaG9sZXNWMUNhbGN1bGF0b3JQYXJhbXMuY291bnREZWNyZWFzZU11bHRpcGxpZXIsXG4gICAgICAgICAgICBwYXJhbXMuaG9sZXNWMUNhbGN1bGF0b3JQYXJhbXMuY291bnRJbmNyZWFzZU11bHRpcGxpZXIsXG4gICAgICAgICAgICBwYXJhbXMuaG9sZXNWMUNhbGN1bGF0b3JQYXJhbXMuY292ZXJlZEhlaWdodFBvd011bHRpcGxpZXIsXG4gICAgICAgICAgICBwYXJhbXMuaG9sZXNWMUNhbGN1bGF0b3JQYXJhbXMuY292ZXJlZEhlaWdodE11bHRpcGxpZXIsXG4gICAgICAgICAgICBwYXJhbXMuc3F1YXNoZWRSb3dzQ2FsY3VsYXRvclBhcmFtcy5tdWx0aXBsaWVyLFxuICAgICAgICAgICAgcGFyYW1zLnR1bm5lbHNDYWxjdWxhdG9yUGFyYW1zLm1pbmltdW1WYWx1YWJsZUhlaWdodCxcbiAgICAgICAgICAgIHBhcmFtcy50dW5uZWxzQ2FsY3VsYXRvclBhcmFtcy5jb3VudE11bHRpcGxpZXIsXG4gICAgICAgICAgICBwYXJhbXMudHVubmVsc0NhbGN1bGF0b3JQYXJhbXMuaGVpZ2h0UG93TXVsdGlwbGllcixcbiAgICAgICAgICAgIHBhcmFtcy50dW5uZWxzQ2FsY3VsYXRvclBhcmFtcy5oZWlnaHRNdWx0aXBsaWVyLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7QmVuY2hSdW5QYXJhbWV0ZXJzfSBmcm9tIFwiLi9Db21tb25cIjtcbmltcG9ydCB7RmlsbGFibGVDZWxsc0NhbGN1bGF0b3JQYXJhbXN9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxhYmxlQ2VsbHMvRmlsbGFibGVDZWxsc0NhbGN1bGF0b3JcIjtcbmltcG9ydCB7RmlsbGVkSGVpZ2h0Q2FsY3VsYXRvclBhcmFtc30gZnJvbSBcIi4uL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3JcIjtcbmltcG9ydCB7SG9sZXNWMUNhbGN1bGF0b3JQYXJhbXN9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0hvbGVzL0hvbGVzVjFDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1NxdWFzaGVkUm93c0NhbGN1bGF0b3JQYXJhbXN9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1NxdWFzaGVkUm93cy9TcXVhc2hlZFJvd3NDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1R1bm5lbHNDYWxjdWxhdG9yUGFyYW1zfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9UdW5uZWxzL1R1bm5lbHNDYWxjdWxhdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCZW5jaFBhcmFtc0dlbmVyYXRvciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWxsYWJsZUNlbGxzTWluaW11bVZhbHVhYmxlSGVpZ2h0ID0gWzMsNSw3XTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpbGxhYmxlQ2VsbHNQb3dNdWx0aXBsaWVyID0gWzBdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlsbGFibGVDZWxsc011bHRpcGxpZXIgPSBbMSwyLDNdO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWxsZWRIZWlnaHRQb3dNdWx0aXBsaWVyID0gWzBdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlsbGVkSGVpZ2h0TXVsdGlwbGllciA9IFsxLDMsNV07XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGhvbGVzVjFDb3VudERlY3JlYXNlTXVsdGlwbGllciA9IFsxMzAsMTUwLDE3MF07XG4gICAgcHJpdmF0ZSByZWFkb25seSBob2xlc1YxQ291bnRJbmNyZWFzZU11bHRpcGxpZXIgPSBbNjAsNzAsODBdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaG9sZXNWMUNvdmVyZWRIZWlnaHRQb3dNdWx0aXBsaWVyID0gWzBdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaG9sZXNWMUNvdmVyZWRIZWlnaHRNdWx0aXBsaWVyID0gWzMsNSw3XTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc3F1YXNoZWRSb3dzTXVsdGlwbGllciA9IFs1LDEwLDE1XTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHVubmVsc01pbmltdW1WYWx1YWJsZUhlaWdodCA9IFsyLDMsNF07XG4gICAgcHJpdmF0ZSByZWFkb25seSB0dW5uZWxzQ291bnRNdWx0aXBsaWVyID0gWzQwLDcwLDkwXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHR1bm5lbHNIZWlnaHRQb3dNdWx0aXBsaWVyID0gWzBdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdHVubmVsc0hlaWdodE11bHRpcGxpZXIgPSBbNSw3LDEwXTtcblxuICAgIHB1YmxpYyAqZ2VuZXJhdGUoKTogR2VuZXJhdG9yPEJlbmNoUnVuUGFyYW1ldGVycz4ge1xuICAgICAgICBmb3IgKGxldCBmaWxsYWJsZUNlbGxzTWluaW11bVZhbHVhYmxlSGVpZ2h0IG9mIHRoaXMuZmlsbGFibGVDZWxsc01pbmltdW1WYWx1YWJsZUhlaWdodCkge1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsbGFibGVDZWxsc1Bvd011bHRpcGxpZXIgb2YgdGhpcy5maWxsYWJsZUNlbGxzUG93TXVsdGlwbGllcikge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpbGxhYmxlQ2VsbHNNdWx0aXBsaWVyIG9mIHRoaXMuZmlsbGFibGVDZWxsc011bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmlsbGVkSGVpZ2h0UG93TXVsdGlwbGllcnMgb2YgdGhpcy5maWxsZWRIZWlnaHRQb3dNdWx0aXBsaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWxsZWRIZWlnaHRNdWx0aXBsaWVycyBvZiB0aGlzLmZpbGxlZEhlaWdodE11bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBob2xlc1YxQ291bnREZWNyZWFzZU11bHRpcGxpZXIgb2YgdGhpcy5ob2xlc1YxQ291bnREZWNyZWFzZU11bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaG9sZXNWMUNvdW50SW5jcmVhc2VNdWx0aXBsaWVyIG9mIHRoaXMuaG9sZXNWMUNvdW50SW5jcmVhc2VNdWx0aXBsaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBob2xlc1YxQ292ZXJlZEhlaWdodFBvd011bHRpcGxpZXIgb2YgdGhpcy5ob2xlc1YxQ292ZXJlZEhlaWdodFBvd011bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBob2xlc1YxQ292ZXJlZEhlaWdodE11bHRpcGxpZXIgb2YgdGhpcy5ob2xlc1YxQ292ZXJlZEhlaWdodE11bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3F1YXNoZWRSb3dzTXVsdGlwbGllciBvZiB0aGlzLnNxdWFzaGVkUm93c011bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHR1bm5lbHNNaW5pbXVtVmFsdWFibGVIZWlnaHQgb2YgdGhpcy50dW5uZWxzTWluaW11bVZhbHVhYmxlSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdHVubmVsc0NvdW50TXVsdGlwbGllciBvZiB0aGlzLnR1bm5lbHNDb3VudE11bHRpcGxpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdHVubmVsc0hlaWdodFBvd011bHRpcGxpZXIgb2YgdGhpcy50dW5uZWxzSGVpZ2h0UG93TXVsdGlwbGllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdHVubmVsc0hlaWdodE11bHRpcGxpZXIgb2YgdGhpcy50dW5uZWxzSGVpZ2h0TXVsdGlwbGllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIG5ldyBCZW5jaFJ1blBhcmFtZXRlcnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaWxsYWJsZUNlbGxzQ2FsY3VsYXRvclBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxhYmxlQ2VsbHNNaW5pbXVtVmFsdWFibGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsYWJsZUNlbGxzUG93TXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxhYmxlQ2VsbHNNdWx0aXBsaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvclBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxlZEhlaWdodFBvd011bHRpcGxpZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbGVkSGVpZ2h0TXVsdGlwbGllcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBIb2xlc1YxQ2FsY3VsYXRvclBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzVjFDb3VudERlY3JlYXNlTXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzVjFDb3VudEluY3JlYXNlTXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzVjFDb3ZlcmVkSGVpZ2h0UG93TXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGVzVjFDb3ZlcmVkSGVpZ2h0TXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFNxdWFzaGVkUm93c0NhbGN1bGF0b3JQYXJhbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcXVhc2hlZFJvd3NNdWx0aXBsaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVHVubmVsc0NhbGN1bGF0b3JQYXJhbXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dW5uZWxzTWluaW11bVZhbHVhYmxlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVubmVsc0NvdW50TXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1bm5lbHNIZWlnaHRQb3dNdWx0aXBsaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVubmVsc0hlaWdodE11bHRpcGxpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxsYWJsZUNlbGxzTWluaW11bVZhbHVhYmxlSGVpZ2h0Lmxlbmd0aFxuICAgICAgICAgICAgKiB0aGlzLmZpbGxhYmxlQ2VsbHNQb3dNdWx0aXBsaWVyLmxlbmd0aFxuICAgICAgICAgICAgKiB0aGlzLmZpbGxhYmxlQ2VsbHNNdWx0aXBsaWVyLmxlbmd0aFxuICAgICAgICAgICAgKiB0aGlzLmZpbGxlZEhlaWdodFBvd011bHRpcGxpZXIubGVuZ3RoXG4gICAgICAgICAgICAqIHRoaXMuZmlsbGVkSGVpZ2h0TXVsdGlwbGllci5sZW5ndGhcbiAgICAgICAgICAgICogdGhpcy5ob2xlc1YxQ291bnREZWNyZWFzZU11bHRpcGxpZXIubGVuZ3RoXG4gICAgICAgICAgICAqIHRoaXMuaG9sZXNWMUNvdW50SW5jcmVhc2VNdWx0aXBsaWVyLmxlbmd0aFxuICAgICAgICAgICAgKiB0aGlzLmhvbGVzVjFDb3ZlcmVkSGVpZ2h0UG93TXVsdGlwbGllci5sZW5ndGhcbiAgICAgICAgICAgICogdGhpcy5ob2xlc1YxQ292ZXJlZEhlaWdodE11bHRpcGxpZXIubGVuZ3RoXG4gICAgICAgICAgICAqIHRoaXMuc3F1YXNoZWRSb3dzTXVsdGlwbGllci5sZW5ndGhcbiAgICAgICAgICAgICogdGhpcy50dW5uZWxzTWluaW11bVZhbHVhYmxlSGVpZ2h0Lmxlbmd0aFxuICAgICAgICAgICAgKiB0aGlzLnR1bm5lbHNDb3VudE11bHRpcGxpZXIubGVuZ3RoXG4gICAgICAgICAgICAqIHRoaXMudHVubmVsc0hlaWdodFBvd011bHRpcGxpZXIubGVuZ3RoXG4gICAgICAgICAgICAqIHRoaXMudHVubmVsc0hlaWdodE11bHRpcGxpZXIubGVuZ3RoO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RmlsbGFibGVDZWxsc0NhbGN1bGF0b3JQYXJhbXN9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0ZpbGxhYmxlQ2VsbHMvRmlsbGFibGVDZWxsc0NhbGN1bGF0b3JcIjtcbmltcG9ydCB7RmlsbGVkSGVpZ2h0Q2FsY3VsYXRvclBhcmFtc30gZnJvbSBcIi4uL1RldHJpc1NvbHZlci9TY29yZUNhbGN1bGF0b3IvRmlsbGVkSGVpZ2h0L0ZpbGxlZEhlaWdodENhbGN1bGF0b3JcIjtcbmltcG9ydCB7SG9sZXNWMUNhbGN1bGF0b3JQYXJhbXN9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL0hvbGVzL0hvbGVzVjFDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1NxdWFzaGVkUm93c0NhbGN1bGF0b3JQYXJhbXN9IGZyb20gXCIuLi9UZXRyaXNTb2x2ZXIvU2NvcmVDYWxjdWxhdG9yL1NxdWFzaGVkUm93cy9TcXVhc2hlZFJvd3NDYWxjdWxhdG9yXCI7XG5pbXBvcnQge1R1bm5lbHNDYWxjdWxhdG9yUGFyYW1zfSBmcm9tIFwiLi4vVGV0cmlzU29sdmVyL1Njb3JlQ2FsY3VsYXRvci9UdW5uZWxzL1R1bm5lbHNDYWxjdWxhdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBCZW5jaFJ1blBhcmFtZXRlcnMge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmlsbGFibGVDZWxsc0NhbGN1bGF0b3JQYXJhbXM6IEZpbGxhYmxlQ2VsbHNDYWxjdWxhdG9yUGFyYW1zLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZmlsbGVkSGVpZ2h0Q2FsY3VsYXRvclBhcmFtczogRmlsbGVkSGVpZ2h0Q2FsY3VsYXRvclBhcmFtcyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhvbGVzVjFDYWxjdWxhdG9yUGFyYW1zOiBIb2xlc1YxQ2FsY3VsYXRvclBhcmFtcyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHNxdWFzaGVkUm93c0NhbGN1bGF0b3JQYXJhbXM6IFNxdWFzaGVkUm93c0NhbGN1bGF0b3JQYXJhbXMsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0dW5uZWxzQ2FsY3VsYXRvclBhcmFtczogVHVubmVsc0NhbGN1bGF0b3JQYXJhbXMsXG4gICAgKSB7fVxufVxuIiwiaW1wb3J0IHtwb29sfSBmcm9tICd3b3JrZXJwb29sJ1xuaW1wb3J0IHtCZW5jaE1hbmFnZXJ9IGZyb20gXCIuL1RldHJpc1NvbHZpbmdCZW5jaC9CZW5jaE1hbmFnZXJcIjtcbmltcG9ydCB7QmVuY2hQYXJhbXNHZW5lcmF0b3J9IGZyb20gXCIuL1RldHJpc1NvbHZpbmdCZW5jaC9CZW5jaFBhcmFtc0dlbmVyYXRvclwiO1xuXG5jb25zdCB3b3JrZXJQb29sID0gcG9vbChcbiAgICAnL1VzZXJzL21ha2Fyb3YtYW5kL1Byb2plY3RzL2Z1bi90ZXRyaXMvZGlzdC90ZXRyaXNfc29sdmluZ193b3JrZXIuanMnLFxuICAgIHttYXhXb3JrZXJzOiAxMH1cbik7XG5cbmNvbnN0IGJlbmNoTWFuYWdlciA9IG5ldyBCZW5jaE1hbmFnZXIoXG4gICAgd29ya2VyUG9vbCxcbiAgICBuZXcgQmVuY2hQYXJhbXNHZW5lcmF0b3IoKSxcbik7XG5hd2FpdCBiZW5jaE1hbmFnZXIuc3RhcnRCZW5jaCgpO1xuIiwiLyoqXG4gKiB3b3JrZXJwb29sLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vam9zZGVqb25nL3dvcmtlcnBvb2xcbiAqXG4gKiBPZmZsb2FkIHRhc2tzIHRvIGEgcG9vbCBvZiB3b3JrZXJzIG9uIG5vZGUuanMgYW5kIGluIHRoZSBicm93c2VyLlxuICpcbiAqIEB2ZXJzaW9uIDYuMy4xXG4gKiBAZGF0ZSAgICAyMDIyLTExLTA3XG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxNC0yMDIyIEpvcyBkZSBKb25nIDx3am9zZGVqb25nQGdtYWlsLmNvbT5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdFxuICogdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyXG4gKiB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndvcmtlcnBvb2xcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wid29ya2VycG9vbFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ3b3JrZXJwb29sXCJdID0gZmFjdG9yeSgpO1xufSkoKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKSwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gMzQ1OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBQcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMTkpO1xudmFyIFdvcmtlckhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc1MSk7XG52YXIgZW52aXJvbm1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgyOCk7XG52YXIgRGVidWdQb3J0QWxsb2NhdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MzMpO1xudmFyIERFQlVHX1BPUlRfQUxMT0NBVE9SID0gbmV3IERlYnVnUG9ydEFsbG9jYXRvcigpO1xuLyoqXG4gKiBBIHBvb2wgdG8gbWFuYWdlIHdvcmtlcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbc2NyaXB0XSAgIE9wdGlvbmFsIHdvcmtlciBzY3JpcHRcbiAqIEBwYXJhbSB7V29ya2VyUG9vbE9wdGlvbnN9IFtvcHRpb25zXSAgU2VlIGRvY3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQb29sKHNjcmlwdCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHNjcmlwdCA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLnNjcmlwdCA9IHNjcmlwdCB8fCBudWxsO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgICBvcHRpb25zID0gc2NyaXB0O1xuICB9XG4gIHRoaXMud29ya2VycyA9IFtdOyAvLyBxdWV1ZSB3aXRoIGFsbCB3b3JrZXJzXG4gIHRoaXMudGFza3MgPSBbXTsgLy8gcXVldWUgd2l0aCB0YXNrcyBhd2FpdGluZyBleGVjdXRpb25cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5mb3JrQXJncyA9IE9iamVjdC5mcmVlemUob3B0aW9ucy5mb3JrQXJncyB8fCBbXSk7XG4gIHRoaXMuZm9ya09wdHMgPSBPYmplY3QuZnJlZXplKG9wdGlvbnMuZm9ya09wdHMgfHwge30pO1xuICB0aGlzLndvcmtlclRocmVhZE9wdHMgPSBPYmplY3QuZnJlZXplKG9wdGlvbnMud29ya2VyVGhyZWFkT3B0cyB8fCB7fSk7XG4gIHRoaXMuZGVidWdQb3J0U3RhcnQgPSBvcHRpb25zLmRlYnVnUG9ydFN0YXJ0IHx8IDQzMjEwO1xuICB0aGlzLm5vZGVXb3JrZXIgPSBvcHRpb25zLm5vZGVXb3JrZXI7XG4gIHRoaXMud29ya2VyVHlwZSA9IG9wdGlvbnMud29ya2VyVHlwZSB8fCBvcHRpb25zLm5vZGVXb3JrZXIgfHwgJ2F1dG8nO1xuICB0aGlzLm1heFF1ZXVlU2l6ZSA9IG9wdGlvbnMubWF4UXVldWVTaXplIHx8IEluZmluaXR5O1xuICB0aGlzLm9uQ3JlYXRlV29ya2VyID0gb3B0aW9ucy5vbkNyZWF0ZVdvcmtlciB8fCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG4gIHRoaXMub25UZXJtaW5hdGVXb3JrZXIgPSBvcHRpb25zLm9uVGVybWluYXRlV29ya2VyIHx8IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvLyBjb25maWd1cmF0aW9uXG4gIGlmIChvcHRpb25zICYmICdtYXhXb3JrZXJzJyBpbiBvcHRpb25zKSB7XG4gICAgdmFsaWRhdGVNYXhXb3JrZXJzKG9wdGlvbnMubWF4V29ya2Vycyk7XG4gICAgdGhpcy5tYXhXb3JrZXJzID0gb3B0aW9ucy5tYXhXb3JrZXJzO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWF4V29ya2VycyA9IE1hdGgubWF4KChlbnZpcm9ubWVudC5jcHVzIHx8IDQpIC0gMSwgMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgJ21pbldvcmtlcnMnIGluIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5taW5Xb3JrZXJzID09PSAnbWF4Jykge1xuICAgICAgdGhpcy5taW5Xb3JrZXJzID0gdGhpcy5tYXhXb3JrZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZGF0ZU1pbldvcmtlcnMob3B0aW9ucy5taW5Xb3JrZXJzKTtcbiAgICAgIHRoaXMubWluV29ya2VycyA9IG9wdGlvbnMubWluV29ya2VycztcbiAgICAgIHRoaXMubWF4V29ya2VycyA9IE1hdGgubWF4KHRoaXMubWluV29ya2VycywgdGhpcy5tYXhXb3JrZXJzKTsgLy8gaW4gY2FzZSBtaW5Xb3JrZXJzIGlzIGhpZ2hlciB0aGFuIG1heFdvcmtlcnNcbiAgICB9XG5cbiAgICB0aGlzLl9lbnN1cmVNaW5Xb3JrZXJzKCk7XG4gIH1cbiAgdGhpcy5fYm91bmROZXh0ID0gdGhpcy5fbmV4dC5iaW5kKHRoaXMpO1xuICBpZiAodGhpcy53b3JrZXJUeXBlID09PSAndGhyZWFkJykge1xuICAgIFdvcmtlckhhbmRsZXIuZW5zdXJlV29ya2VyVGhyZWFkcygpO1xuICB9XG59XG5cbi8qKlxuICogRXhlY3V0ZSBhIGZ1bmN0aW9uIG9uIGEgd29ya2VyLlxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICB2YXIgcG9vbCA9IG5ldyBQb29sKClcbiAqXG4gKiAgIC8vIGNhbGwgYSBmdW5jdGlvbiBhdmFpbGFibGUgb24gdGhlIHdvcmtlclxuICogICBwb29sLmV4ZWMoJ2ZpYm9uYWNjaScsIFs2XSlcbiAqXG4gKiAgIC8vIG9mZmxvYWQgYSBmdW5jdGlvblxuICogICBmdW5jdGlvbiBhZGQoYSwgYikge1xuICogICAgIHJldHVybiBhICsgYlxuICogICB9O1xuICogICBwb29sLmV4ZWMoYWRkLCBbMiwgNF0pXG4gKiAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8vIG91dHB1dHMgNlxuICogICAgICAgfSlcbiAqICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICogICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gKiAgICAgICB9KTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZyB8IEZ1bmN0aW9ufSBtZXRob2QgIEZ1bmN0aW9uIG5hbWUgb3IgZnVuY3Rpb24uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGBtZXRob2RgIGlzIGEgc3RyaW5nLCB0aGUgY29ycmVzcG9uZGluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Qgb24gdGhlIHdvcmtlciB3aWxsIGJlIGV4ZWN1dGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIGBtZXRob2RgIGlzIGEgRnVuY3Rpb24sIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWxsIGJlIHN0cmluZ2lmaWVkIGFuZCBleGVjdXRlZCB2aWEgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlcnMgYnVpbHQtaW4gZnVuY3Rpb24gYHJ1bihmbiwgYXJncylgLlxuICogQHBhcmFtIHtBcnJheX0gW3BhcmFtc10gIEZ1bmN0aW9uIGFyZ3VtZW50cyBhcHBsaWVkIHdoZW4gY2FsbGluZyB0aGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RXhlY09wdGlvbnN9IFtvcHRpb25zXSAgT3B0aW9ucyBvYmplY3RcbiAqIEByZXR1cm4ge1Byb21pc2UuPCosIEVycm9yPn0gcmVzdWx0XG4gKi9cblBvb2wucHJvdG90eXBlLmV4ZWMgPSBmdW5jdGlvbiAobWV0aG9kLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLy8gdmFsaWRhdGUgdHlwZSBvZiBhcmd1bWVudHNcbiAgaWYgKHBhcmFtcyAmJiAhQXJyYXkuaXNBcnJheShwYXJhbXMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkgZXhwZWN0ZWQgYXMgYXJndW1lbnQgXCJwYXJhbXNcIicpO1xuICB9XG4gIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgIHZhciByZXNvbHZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgICBpZiAodGhpcy50YXNrcy5sZW5ndGggPj0gdGhpcy5tYXhRdWV1ZVNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWF4IHF1ZXVlIHNpemUgb2YgJyArIHRoaXMubWF4UXVldWVTaXplICsgJyByZWFjaGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGEgbmV3IHRhc2sgdG8gdGhlIHF1ZXVlXG4gICAgdmFyIHRhc2tzID0gdGhpcy50YXNrcztcbiAgICB2YXIgdGFzayA9IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICByZXNvbHZlcjogcmVzb2x2ZXIsXG4gICAgICB0aW1lb3V0OiBudWxsLFxuICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH07XG4gICAgdGFza3MucHVzaCh0YXNrKTtcblxuICAgIC8vIHJlcGxhY2UgdGhlIHRpbWVvdXQgbWV0aG9kIG9mIHRoZSBQcm9taXNlIHdpdGggb3VyIG93bixcbiAgICAvLyB3aGljaCBzdGFydHMgdGhlIHRpbWVyIGFzIHNvb24gYXMgdGhlIHRhc2sgaXMgYWN0dWFsbHkgc3RhcnRlZFxuICAgIHZhciBvcmlnaW5hbFRpbWVvdXQgPSByZXNvbHZlci5wcm9taXNlLnRpbWVvdXQ7XG4gICAgcmVzb2x2ZXIucHJvbWlzZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChkZWxheSkge1xuICAgICAgaWYgKHRhc2tzLmluZGV4T2YodGFzaykgIT09IC0xKSB7XG4gICAgICAgIC8vIHRhc2sgaXMgc3RpbGwgcXVldWVkIC0+IHN0YXJ0IHRoZSB0aW1lciBsYXRlciBvblxuICAgICAgICB0YXNrLnRpbWVvdXQgPSBkZWxheTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVyLnByb21pc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0YXNrIGlzIGFscmVhZHkgYmVpbmcgZXhlY3V0ZWQgLT4gc3RhcnQgdGltZXIgaW1tZWRpYXRlbHlcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsVGltZW91dC5jYWxsKHJlc29sdmVyLnByb21pc2UsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gdHJpZ2dlciB0YXNrIGV4ZWN1dGlvblxuICAgIHRoaXMuX25leHQoKTtcbiAgICByZXR1cm4gcmVzb2x2ZXIucHJvbWlzZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gc2VuZCBzdHJpbmdpZmllZCBmdW5jdGlvbiBhbmQgZnVuY3Rpb24gYXJndW1lbnRzIHRvIHdvcmtlclxuICAgIHJldHVybiB0aGlzLmV4ZWMoJ3J1bicsIFtTdHJpbmcobWV0aG9kKSwgcGFyYW1zXSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24gb3Igc3RyaW5nIGV4cGVjdGVkIGFzIGFyZ3VtZW50IFwibWV0aG9kXCInKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBwcm94eSBmb3IgY3VycmVudCB3b3JrZXIuIFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYWxsXG4gKiBtZXRob2RzIGF2YWlsYWJsZSBvbiB0aGUgd29ya2VyLiBUaGUgbWV0aG9kcyBhbHdheXMgcmV0dXJuIGEgcHJvbWlzZS5cbiAqXG4gKiBAcmV0dXJuIHtQcm9taXNlLjxPYmplY3QsIEVycm9yPn0gcHJveHlcbiAqL1xuUG9vbC5wcm90b3R5cGUucHJveHkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gYXJndW1lbnRzIGV4cGVjdGVkJyk7XG4gIH1cbiAgdmFyIHBvb2wgPSB0aGlzO1xuICByZXR1cm4gdGhpcy5leGVjKCdtZXRob2RzJykudGhlbihmdW5jdGlvbiAobWV0aG9kcykge1xuICAgIHZhciBwcm94eSA9IHt9O1xuICAgIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBwcm94eVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcG9vbC5leGVjKG1ldGhvZCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBwcm94eTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGFycmF5IHdpdGggdGhlIHJlc3VsdHMgb2YgY2FsbGluZyBhIHByb3ZpZGVkIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBvbiBldmVyeSBlbGVtZW50IGluIHRoaXMgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgIEZ1bmN0aW9uIHRha2luZyB0d28gYXJndW1lbnRzOlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBjYWxsYmFjayhjdXJyZW50VmFsdWUsIGluZGV4KWBcbiAqIEByZXR1cm4ge1Byb21pc2UuPEFycmF5Pn0gUmV0dXJucyBhIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgIHdpdGggYW4gQXJyYXlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmluZyB0aGUgcmVzdWx0cyBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZWQgZm9yIGVhY2ggb2YgdGhlIGFycmF5IGVsZW1lbnRzLlxuICovXG4vKiBUT0RPOiBpbXBsZW1lbnQgbWFwXG5Qb29sLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrKSB7XG59O1xuKi9cblxuLyoqXG4gKiBHcmFiIHRoZSBmaXJzdCB0YXNrIGZyb20gdGhlIHF1ZXVlLCBmaW5kIGEgZnJlZSB3b3JrZXIsIGFuZCBhc3NpZ24gdGhlXG4gKiB3b3JrZXIgdG8gdGhlIHRhc2suXG4gKiBAcHJvdGVjdGVkXG4gKi9cblBvb2wucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy50YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgLy8gdGhlcmUgYXJlIHRhc2tzIGluIHRoZSBxdWV1ZVxuXG4gICAgLy8gZmluZCBhbiBhdmFpbGFibGUgd29ya2VyXG4gICAgdmFyIHdvcmtlciA9IHRoaXMuX2dldFdvcmtlcigpO1xuICAgIGlmICh3b3JrZXIpIHtcbiAgICAgIC8vIGdldCB0aGUgZmlyc3QgdGFzayBmcm9tIHRoZSBxdWV1ZVxuICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgIHZhciB0YXNrID0gdGhpcy50YXNrcy5zaGlmdCgpO1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgdGFzayBpcyBzdGlsbCBwZW5kaW5nIChhbmQgbm90IGNhbmNlbGxlZCAtPiBwcm9taXNlIHJlamVjdGVkKVxuICAgICAgaWYgKHRhc2sucmVzb2x2ZXIucHJvbWlzZS5wZW5kaW5nKSB7XG4gICAgICAgIC8vIHNlbmQgdGhlIHJlcXVlc3QgdG8gdGhlIHdvcmtlclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHdvcmtlci5leGVjKHRhc2subWV0aG9kLCB0YXNrLnBhcmFtcywgdGFzay5yZXNvbHZlciwgdGFzay5vcHRpb25zKS50aGVuKG1lLl9ib3VuZE5leHQpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGlmIHRoZSB3b3JrZXIgY3Jhc2hlZCBhbmQgdGVybWluYXRlZCwgcmVtb3ZlIGl0IGZyb20gdGhlIHBvb2xcbiAgICAgICAgICBpZiAod29ya2VyLnRlcm1pbmF0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBtZS5fcmVtb3ZlV29ya2VyKHdvcmtlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBtZS5fbmV4dCgpOyAvLyB0cmlnZ2VyIG5leHQgdGFzayBpbiB0aGUgcXVldWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc3RhcnQgcXVldWVkIHRpbWVyIG5vd1xuICAgICAgICBpZiAodHlwZW9mIHRhc2sudGltZW91dCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBwcm9taXNlLnRpbWVvdXQodGFzay50aW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHRhc2sgdGFrZW4gd2FzIGFscmVhZHkgY29tcGxldGUgKGVpdGhlciByZWplY3RlZCBvciByZXNvbHZlZCksIHNvIGp1c3QgdHJpZ2dlciBuZXh0IHRhc2sgaW4gdGhlIHF1ZXVlXG4gICAgICAgIG1lLl9uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEdldCBhbiBhdmFpbGFibGUgd29ya2VyLiBJZiBubyB3b3JrZXIgaXMgYXZhaWxhYmxlIGFuZCB0aGUgbWF4aW11bSBudW1iZXJcbiAqIG9mIHdvcmtlcnMgaXNuJ3QgeWV0IHJlYWNoZWQsIGEgbmV3IHdvcmtlciB3aWxsIGJlIGNyZWF0ZWQgYW5kIHJldHVybmVkLlxuICogSWYgbm8gd29ya2VyIGlzIGF2YWlsYWJsZSBhbmQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHdvcmtlcnMgaXMgcmVhY2hlZCxcbiAqIG51bGwgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBAcmV0dXJuIHtXb3JrZXJIYW5kbGVyIHwgbnVsbH0gd29ya2VyXG4gKiBAcHJpdmF0ZVxuICovXG5Qb29sLnByb3RvdHlwZS5fZ2V0V29ya2VyID0gZnVuY3Rpb24gKCkge1xuICAvLyBmaW5kIGEgbm9uLWJ1c3kgd29ya2VyXG4gIHZhciB3b3JrZXJzID0gdGhpcy53b3JrZXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgd29ya2VyID0gd29ya2Vyc1tpXTtcbiAgICBpZiAod29ya2VyLmJ1c3koKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfVxuICB9XG4gIGlmICh3b3JrZXJzLmxlbmd0aCA8IHRoaXMubWF4V29ya2Vycykge1xuICAgIC8vIGNyZWF0ZSBhIG5ldyB3b3JrZXJcbiAgICB3b3JrZXIgPSB0aGlzLl9jcmVhdGVXb3JrZXJIYW5kbGVyKCk7XG4gICAgd29ya2Vycy5wdXNoKHdvcmtlcik7XG4gICAgcmV0dXJuIHdvcmtlcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgd29ya2VyIGZyb20gdGhlIHBvb2wuXG4gKiBBdHRlbXB0cyB0byB0ZXJtaW5hdGUgd29ya2VyIGlmIG5vdCBhbHJlYWR5IHRlcm1pbmF0ZWQsIGFuZCBlbnN1cmVzIHRoZSBtaW5pbXVtXG4gKiBwb29sIHNpemUgaXMgbWV0LlxuICogQHBhcmFtIHtXb3JrZXJIYW5kbGVyfSB3b3JrZXJcbiAqIEByZXR1cm4ge1Byb21pc2U8V29ya2VySGFuZGxlcj59XG4gKiBAcHJvdGVjdGVkXG4gKi9cblBvb2wucHJvdG90eXBlLl9yZW1vdmVXb3JrZXIgPSBmdW5jdGlvbiAod29ya2VyKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIERFQlVHX1BPUlRfQUxMT0NBVE9SLnJlbGVhc2VQb3J0KHdvcmtlci5kZWJ1Z1BvcnQpO1xuICAvLyBfcmVtb3ZlV29ya2VyIHdpbGwgY2FsbCB0aGlzLCBidXQgd2UgbmVlZCBpdCB0byBiZSByZW1vdmVkIHN5bmNocm9ub3VzbHlcbiAgdGhpcy5fcmVtb3ZlV29ya2VyRnJvbUxpc3Qod29ya2VyKTtcbiAgLy8gSWYgbWluV29ya2VycyBzZXQsIHNwaW4gdXAgbmV3IHdvcmtlcnMgdG8gcmVwbGFjZSB0aGUgY3Jhc2hlZCBvbmVzXG4gIHRoaXMuX2Vuc3VyZU1pbldvcmtlcnMoKTtcbiAgLy8gdGVybWluYXRlIHRoZSB3b3JrZXIgKGlmIG5vdCBhbHJlYWR5IHRlcm1pbmF0ZWQpXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgd29ya2VyLnRlcm1pbmF0ZShmYWxzZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgbWUub25UZXJtaW5hdGVXb3JrZXIoe1xuICAgICAgICBmb3JrQXJnczogd29ya2VyLmZvcmtBcmdzLFxuICAgICAgICBmb3JrT3B0czogd29ya2VyLmZvcmtPcHRzLFxuICAgICAgICBzY3JpcHQ6IHdvcmtlci5zY3JpcHRcbiAgICAgIH0pO1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUod29ya2VyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIHdvcmtlciBmcm9tIHRoZSBwb29sIGxpc3QuXG4gKiBAcGFyYW0ge1dvcmtlckhhbmRsZXJ9IHdvcmtlclxuICogQHByb3RlY3RlZFxuICovXG5Qb29sLnByb3RvdHlwZS5fcmVtb3ZlV29ya2VyRnJvbUxpc3QgPSBmdW5jdGlvbiAod29ya2VyKSB7XG4gIC8vIHJlbW92ZSBmcm9tIHRoZSBsaXN0IHdpdGggd29ya2Vyc1xuICB2YXIgaW5kZXggPSB0aGlzLndvcmtlcnMuaW5kZXhPZih3b3JrZXIpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdGhpcy53b3JrZXJzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xvc2UgYWxsIGFjdGl2ZSB3b3JrZXJzLiBUYXNrcyBjdXJyZW50bHkgYmVpbmcgZXhlY3V0ZWQgd2lsbCBiZSBmaW5pc2hlZCBmaXJzdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlPWZhbHNlXSAgIElmIGZhbHNlIChkZWZhdWx0KSwgdGhlIHdvcmtlcnMgYXJlIHRlcm1pbmF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGZpbmlzaGluZyBhbGwgdGFza3MgY3VycmVudGx5IGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy4gSWYgdHJ1ZSwgdGhlIHdvcmtlcnMgd2lsbCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlZCBpbW1lZGlhdGVseS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZW91dF0gICAgICAgIElmIHByb3ZpZGVkIGFuZCBub24temVybywgd29ya2VyIHRlcm1pbmF0aW9uIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGltZW91dCBpZiB3b3JrZXIgcHJvY2VzcyBoYXMgbm90IGJlZW4gdGVybWluYXRlZC5cbiAqIEByZXR1cm4ge1Byb21pc2UuPHZvaWQsIEVycm9yPn1cbiAqL1xuUG9vbC5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKGZvcmNlLCB0aW1lb3V0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy8gY2FuY2VsIGFueSBwZW5kaW5nIHRhc2tzXG4gIHRoaXMudGFza3MuZm9yRWFjaChmdW5jdGlvbiAodGFzaykge1xuICAgIHRhc2sucmVzb2x2ZXIucmVqZWN0KG5ldyBFcnJvcignUG9vbCB0ZXJtaW5hdGVkJykpO1xuICB9KTtcbiAgdGhpcy50YXNrcy5sZW5ndGggPSAwO1xuICB2YXIgZiA9IGZ1bmN0aW9uIGYod29ya2VyKSB7XG4gICAgREVCVUdfUE9SVF9BTExPQ0FUT1IucmVsZWFzZVBvcnQod29ya2VyLmRlYnVnUG9ydCk7XG4gICAgdGhpcy5fcmVtb3ZlV29ya2VyRnJvbUxpc3Qod29ya2VyKTtcbiAgfTtcbiAgdmFyIHJlbW92ZVdvcmtlciA9IGYuYmluZCh0aGlzKTtcbiAgdmFyIHByb21pc2VzID0gW107XG4gIHZhciB3b3JrZXJzID0gdGhpcy53b3JrZXJzLnNsaWNlKCk7XG4gIHdvcmtlcnMuZm9yRWFjaChmdW5jdGlvbiAod29ya2VyKSB7XG4gICAgdmFyIHRlcm1Qcm9taXNlID0gd29ya2VyLnRlcm1pbmF0ZUFuZE5vdGlmeShmb3JjZSwgdGltZW91dCkudGhlbihyZW1vdmVXb3JrZXIpLmFsd2F5cyhmdW5jdGlvbiAoKSB7XG4gICAgICBtZS5vblRlcm1pbmF0ZVdvcmtlcih7XG4gICAgICAgIGZvcmtBcmdzOiB3b3JrZXIuZm9ya0FyZ3MsXG4gICAgICAgIGZvcmtPcHRzOiB3b3JrZXIuZm9ya09wdHMsXG4gICAgICAgIHNjcmlwdDogd29ya2VyLnNjcmlwdFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcHJvbWlzZXMucHVzaCh0ZXJtUHJvbWlzZSk7XG4gIH0pO1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBzdGF0aXN0aWNzIG9uIHRhc2tzIGFuZCB3b3JrZXJzLlxuICogQHJldHVybiB7e3RvdGFsV29ya2VyczogbnVtYmVyLCBidXN5V29ya2VyczogbnVtYmVyLCBpZGxlV29ya2VyczogbnVtYmVyLCBwZW5kaW5nVGFza3M6IG51bWJlciwgYWN0aXZlVGFza3M6IG51bWJlcn19IFJldHVybnMgYW4gb2JqZWN0IHdpdGggc3RhdGlzdGljc1xuICovXG5Qb29sLnByb3RvdHlwZS5zdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRvdGFsV29ya2VycyA9IHRoaXMud29ya2Vycy5sZW5ndGg7XG4gIHZhciBidXN5V29ya2VycyA9IHRoaXMud29ya2Vycy5maWx0ZXIoZnVuY3Rpb24gKHdvcmtlcikge1xuICAgIHJldHVybiB3b3JrZXIuYnVzeSgpO1xuICB9KS5sZW5ndGg7XG4gIHJldHVybiB7XG4gICAgdG90YWxXb3JrZXJzOiB0b3RhbFdvcmtlcnMsXG4gICAgYnVzeVdvcmtlcnM6IGJ1c3lXb3JrZXJzLFxuICAgIGlkbGVXb3JrZXJzOiB0b3RhbFdvcmtlcnMgLSBidXN5V29ya2VycyxcbiAgICBwZW5kaW5nVGFza3M6IHRoaXMudGFza3MubGVuZ3RoLFxuICAgIGFjdGl2ZVRhc2tzOiBidXN5V29ya2Vyc1xuICB9O1xufTtcblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgYSBtaW5pbXVtIG9mIG1pbldvcmtlcnMgaXMgdXAgYW5kIHJ1bm5pbmdcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUG9vbC5wcm90b3R5cGUuX2Vuc3VyZU1pbldvcmtlcnMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLm1pbldvcmtlcnMpIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy53b3JrZXJzLmxlbmd0aDsgaSA8IHRoaXMubWluV29ya2VyczsgaSsrKSB7XG4gICAgICB0aGlzLndvcmtlcnMucHVzaCh0aGlzLl9jcmVhdGVXb3JrZXJIYW5kbGVyKCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGEgbmV3IFdvcmtlckhhbmRsZXIgYW5kIHBhc3MgYWxsIG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtXb3JrZXJIYW5kbGVyfVxuICogQHByaXZhdGVcbiAqL1xuUG9vbC5wcm90b3R5cGUuX2NyZWF0ZVdvcmtlckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdmVycmlkZW5QYXJhbXMgPSB0aGlzLm9uQ3JlYXRlV29ya2VyKHtcbiAgICBmb3JrQXJnczogdGhpcy5mb3JrQXJncyxcbiAgICBmb3JrT3B0czogdGhpcy5mb3JrT3B0cyxcbiAgICB3b3JrZXJUaHJlYWRPcHRzOiB0aGlzLndvcmtlclRocmVhZE9wdHMsXG4gICAgc2NyaXB0OiB0aGlzLnNjcmlwdFxuICB9KSB8fCB7fTtcbiAgcmV0dXJuIG5ldyBXb3JrZXJIYW5kbGVyKG92ZXJyaWRlblBhcmFtcy5zY3JpcHQgfHwgdGhpcy5zY3JpcHQsIHtcbiAgICBmb3JrQXJnczogb3ZlcnJpZGVuUGFyYW1zLmZvcmtBcmdzIHx8IHRoaXMuZm9ya0FyZ3MsXG4gICAgZm9ya09wdHM6IG92ZXJyaWRlblBhcmFtcy5mb3JrT3B0cyB8fCB0aGlzLmZvcmtPcHRzLFxuICAgIHdvcmtlclRocmVhZE9wdHM6IG92ZXJyaWRlblBhcmFtcy53b3JrZXJUaHJlYWRPcHRzIHx8IHRoaXMud29ya2VyVGhyZWFkT3B0cyxcbiAgICBkZWJ1Z1BvcnQ6IERFQlVHX1BPUlRfQUxMT0NBVE9SLm5leHRBdmFpbGFibGVTdGFydGluZ0F0KHRoaXMuZGVidWdQb3J0U3RhcnQpLFxuICAgIHdvcmtlclR5cGU6IHRoaXMud29ya2VyVHlwZVxuICB9KTtcbn07XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgdGhlIG1heFdvcmtlcnMgb3B0aW9uIGlzIGFuIGludGVnZXIgPj0gMVxuICogQHBhcmFtIHsqfSBtYXhXb3JrZXJzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJucyB0cnVlIG1heFdvcmtlcnMgaGFzIGEgdmFsaWQgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVNYXhXb3JrZXJzKG1heFdvcmtlcnMpIHtcbiAgaWYgKCFpc051bWJlcihtYXhXb3JrZXJzKSB8fCAhaXNJbnRlZ2VyKG1heFdvcmtlcnMpIHx8IG1heFdvcmtlcnMgPCAxKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT3B0aW9uIG1heFdvcmtlcnMgbXVzdCBiZSBhbiBpbnRlZ2VyIG51bWJlciA+PSAxJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCB0aGUgbWluV29ya2VycyBvcHRpb24gaXMgYW4gaW50ZWdlciA+PSAwXG4gKiBAcGFyYW0geyp9IG1pbldvcmtlcnNcbiAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm5zIHRydWUgd2hlbiBtaW5Xb3JrZXJzIGhhcyBhIHZhbGlkIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlTWluV29ya2VycyhtaW5Xb3JrZXJzKSB7XG4gIGlmICghaXNOdW1iZXIobWluV29ya2VycykgfHwgIWlzSW50ZWdlcihtaW5Xb3JrZXJzKSB8fCBtaW5Xb3JrZXJzIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09wdGlvbiBtaW5Xb3JrZXJzIG11c3QgYmUgYW4gaW50ZWdlciBudW1iZXIgPj0gMCcpO1xuICB9XG59XG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgdmFyaWFibGUgaXMgYSBudW1iZXJcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm5zIHRydWUgd2hlbiB2YWx1ZSBpcyBhIG51bWJlclxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBUZXN0IHdoZXRoZXIgYSBudW1iZXIgaXMgYW4gaW50ZWdlclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHZhbHVlIGlzIGFuIGludGVnZXJcbiAqL1xuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKSA9PSB2YWx1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gUG9vbDtcblxuLyoqKi8gfSksXG5cbi8qKiovIDIxOTpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLyoqXG4gKiBQcm9taXNlXG4gKlxuICogSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vUnViYVhhLzg1MDEzNTkgZnJvbSBSdWJhWGEgPHRyYXNoQHJ1YmF4YS5vcmc+XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciAgIENhbGxlZCBhcyBoYW5kbGVyKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKVxuICogQHBhcmFtIHtQcm9taXNlfSBbcGFyZW50XSAgIFBhcmVudCBwcm9taXNlIGZvciBwcm9wYWdhdGlvbiBvZiBjYW5jZWwgYW5kIHRpbWVvdXRcbiAqL1xuZnVuY3Rpb24gUHJvbWlzZShoYW5kbGVyLCBwYXJlbnQpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdDb25zdHJ1Y3RvciBtdXN0IGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgb3BlcmF0b3InKTtcbiAgfVxuICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0Z1bmN0aW9uIHBhcmFtZXRlciBoYW5kbGVyKHJlc29sdmUsIHJlamVjdCkgbWlzc2luZycpO1xuICB9XG4gIHZhciBfb25TdWNjZXNzID0gW107XG4gIHZhciBfb25GYWlsID0gW107XG5cbiAgLy8gc3RhdHVzXG4gIHRoaXMucmVzb2x2ZWQgPSBmYWxzZTtcbiAgdGhpcy5yZWplY3RlZCA9IGZhbHNlO1xuICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBQcm9jZXNzIG9uU3VjY2VzcyBhbmQgb25GYWlsIGNhbGxiYWNrczogYWRkIHRoZW0gdG8gdGhlIHF1ZXVlLlxuICAgKiBPbmNlIHRoZSBwcm9taXNlIGlzIHJlc29sdmUsIHRoZSBmdW5jdGlvbiBfcHJvbWlzZSBpcyByZXBsYWNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblN1Y2Nlc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25GYWlsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB2YXIgX3Byb2Nlc3MgPSBmdW5jdGlvbiBfcHJvY2VzcyhvblN1Y2Nlc3MsIG9uRmFpbCkge1xuICAgIF9vblN1Y2Nlc3MucHVzaChvblN1Y2Nlc3MpO1xuICAgIF9vbkZhaWwucHVzaChvbkZhaWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gb25TdWNjZXNzIGNhbGxiYWNrIGFuZCBvcHRpb25hbGx5IGFuIG9uRmFpbCBjYWxsYmFjayB0byB0aGUgUHJvbWlzZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblN1Y2Nlc3NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uRmFpbF1cbiAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2VcbiAgICovXG4gIHRoaXMudGhlbiA9IGZ1bmN0aW9uIChvblN1Y2Nlc3MsIG9uRmFpbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcyA9IG9uU3VjY2VzcyA/IF90aGVuKG9uU3VjY2VzcywgcmVzb2x2ZSwgcmVqZWN0KSA6IHJlc29sdmU7XG4gICAgICB2YXIgZiA9IG9uRmFpbCA/IF90aGVuKG9uRmFpbCwgcmVzb2x2ZSwgcmVqZWN0KSA6IHJlamVjdDtcbiAgICAgIF9wcm9jZXNzKHMsIGYpO1xuICAgIH0sIG1lKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgKiBAcGFyYW0geyp9IHJlc3VsdFxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICB2YXIgX3Jlc29sdmUyID0gZnVuY3Rpb24gX3Jlc29sdmUocmVzdWx0KSB7XG4gICAgLy8gdXBkYXRlIHN0YXR1c1xuICAgIG1lLnJlc29sdmVkID0gdHJ1ZTtcbiAgICBtZS5yZWplY3RlZCA9IGZhbHNlO1xuICAgIG1lLnBlbmRpbmcgPSBmYWxzZTtcbiAgICBfb25TdWNjZXNzLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICBmbihyZXN1bHQpO1xuICAgIH0pO1xuICAgIF9wcm9jZXNzID0gZnVuY3Rpb24gX3Byb2Nlc3Mob25TdWNjZXNzLCBvbkZhaWwpIHtcbiAgICAgIG9uU3VjY2VzcyhyZXN1bHQpO1xuICAgIH07XG4gICAgX3Jlc29sdmUyID0gX3JlamVjdDIgPSBmdW5jdGlvbiBfcmVqZWN0KCkge307XG4gICAgcmV0dXJuIG1lO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZWplY3QgdGhlIHByb21pc2VcbiAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgdmFyIF9yZWplY3QyID0gZnVuY3Rpb24gX3JlamVjdChlcnJvcikge1xuICAgIC8vIHVwZGF0ZSBzdGF0dXNcbiAgICBtZS5yZXNvbHZlZCA9IGZhbHNlO1xuICAgIG1lLnJlamVjdGVkID0gdHJ1ZTtcbiAgICBtZS5wZW5kaW5nID0gZmFsc2U7XG4gICAgX29uRmFpbC5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgZm4oZXJyb3IpO1xuICAgIH0pO1xuICAgIF9wcm9jZXNzID0gZnVuY3Rpb24gX3Byb2Nlc3Mob25TdWNjZXNzLCBvbkZhaWwpIHtcbiAgICAgIG9uRmFpbChlcnJvcik7XG4gICAgfTtcbiAgICBfcmVzb2x2ZTIgPSBfcmVqZWN0MiA9IGZ1bmN0aW9uIF9yZWplY3QoKSB7fTtcbiAgICByZXR1cm4gbWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbmNlbCB0ZSBwcm9taXNlLiBUaGlzIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIHdpdGggYSBDYW5jZWxsYXRpb25FcnJvclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gc2VsZlxuICAgKi9cbiAgdGhpcy5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LmNhbmNlbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcmVqZWN0MihuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoKSk7XG4gICAgfVxuICAgIHJldHVybiBtZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IGEgdGltZW91dCBmb3IgdGhlIHByb21pc2UuIElmIHRoZSBwcm9taXNlIGlzIG5vdCByZXNvbHZlZCB3aXRoaW5cbiAgICogdGhlIHRpbWUsIHRoZSBwcm9taXNlIHdpbGwgYmUgY2FuY2VsbGVkIGFuZCBhIFRpbWVvdXRFcnJvciBpcyB0aHJvd24uXG4gICAqIElmIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIGluIHRpbWUsIHRoZSB0aW1lb3V0IGlzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAgICAgRGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBzZWxmXG4gICAqL1xuICB0aGlzLnRpbWVvdXQgPSBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQudGltZW91dChkZWxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfcmVqZWN0MihuZXcgVGltZW91dEVycm9yKCdQcm9taXNlIHRpbWVkIG91dCBhZnRlciAnICsgZGVsYXkgKyAnIG1zJykpO1xuICAgICAgfSwgZGVsYXkpO1xuICAgICAgbWUuYWx3YXlzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbWU7XG4gIH07XG5cbiAgLy8gYXR0YWNoIGhhbmRsZXIgcGFzc2luZyB0aGUgcmVzb2x2ZSBhbmQgcmVqZWN0IGZ1bmN0aW9uc1xuICBoYW5kbGVyKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBfcmVzb2x2ZTIocmVzdWx0KTtcbiAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgX3JlamVjdDIoZXJyb3IpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBFeGVjdXRlIGdpdmVuIGNhbGxiYWNrLCB0aGVuIGNhbGwgcmVzb2x2ZS9yZWplY3QgYmFzZWQgb24gdGhlIHJldHVybmVkIHJlc3VsdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gX3RoZW4oY2FsbGJhY2ssIHJlc29sdmUsIHJlamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzID0gY2FsbGJhY2socmVzdWx0KTtcbiAgICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiByZXNbJ2NhdGNoJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbWV0aG9kIHJldHVybmVkIGEgcHJvbWlzZVxuICAgICAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBBZGQgYW4gb25GYWlsIGNhbGxiYWNrIHRvIHRoZSBQcm9taXNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZhaWxcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlXG4gKi9cblByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uRmFpbCkge1xuICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uRmFpbCk7XG59O1xuXG4vLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgUHJvbWlzZS5jYXRjaChFcnJvciwgY2FsbGJhY2spXG4vLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgUHJvbWlzZS5jYXRjaChFcnJvciwgRXJyb3IsIGNhbGxiYWNrKVxuXG4vKipcbiAqIEV4ZWN1dGUgZ2l2ZW4gY2FsbGJhY2sgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZVxuICovXG5Qcm9taXNlLnByb3RvdHlwZS5hbHdheXMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIHRoaXMudGhlbihmbiwgZm4pO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gYWxsIHByb3ZpZGVkIHByb21pc2VzIGFyZSByZXNvbHZlZCxcbiAqIGFuZCBmYWlscyB3aGVuIGFueSBvZiB0aGUgcHJvbWlzZXMgcmVzb2x2ZXMuXG4gKiBAcGFyYW0ge1Byb21pc2VbXX0gcHJvbWlzZXNcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlXG4gKi9cblByb21pc2UuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlbWFpbmluZyA9IHByb21pc2VzLmxlbmd0aCxcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICBpZiAocmVtYWluaW5nKSB7XG4gICAgICBwcm9taXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7XG4gICAgICAgIHAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0c1tpXSA9IHJlc3VsdDtcbiAgICAgICAgICByZW1haW5pbmctLTtcbiAgICAgICAgICBpZiAocmVtYWluaW5nID09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZW1haW5pbmcgPSAwO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcHJvbWlzZSByZXNvbHZlclxuICogQHJldHVybnMge3twcm9taXNlOiBQcm9taXNlLCByZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbn19IHJlc29sdmVyXG4gKi9cblByb21pc2UuZGVmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciByZXNvbHZlciA9IHt9O1xuICByZXNvbHZlci5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlc29sdmVyLnJlc29sdmUgPSByZXNvbHZlO1xuICAgIHJlc29sdmVyLnJlamVjdCA9IHJlamVjdDtcbiAgfSk7XG4gIHJldHVybiByZXNvbHZlcjtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgY2FuY2VsbGF0aW9uIGVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ30gW21lc3NhZ2VdXG4gKiBAZXh0ZW5kcyBFcnJvclxuICovXG5mdW5jdGlvbiBDYW5jZWxsYXRpb25FcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ3Byb21pc2UgY2FuY2VsbGVkJztcbiAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xufVxuQ2FuY2VsbGF0aW9uRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5DYW5jZWxsYXRpb25FcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFcnJvcjtcbkNhbmNlbGxhdGlvbkVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0NhbmNlbGxhdGlvbkVycm9yJztcblByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3IgPSBDYW5jZWxsYXRpb25FcnJvcjtcblxuLyoqXG4gKiBDcmVhdGUgYSB0aW1lb3V0IGVycm9yXG4gKiBAcGFyYW0ge1N0cmluZ30gW21lc3NhZ2VdXG4gKiBAZXh0ZW5kcyBFcnJvclxuICovXG5mdW5jdGlvbiBUaW1lb3V0RXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xufVxuVGltZW91dEVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuVGltZW91dEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVycm9yO1xuVGltZW91dEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG5Qcm9taXNlLlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDc1MTpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvW1wiQEBpdGVyYXRvclwiXTsgaWYgKCFpdCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBpdC5jYWxsKG8pOyB9LCBuOiBmdW5jdGlvbiBuKCkgeyB2YXIgc3RlcCA9IGl0Lm5leHQoKTsgbm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTsgcmV0dXJuIHN0ZXA7IH0sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7IGRpZEVyciA9IHRydWU7IGVyciA9IF9lMjsgfSwgZjogZnVuY3Rpb24gZigpIHsgdHJ5IHsgaWYgKCFub3JtYWxDb21wbGV0aW9uICYmIGl0W1wicmV0dXJuXCJdICE9IG51bGwpIGl0W1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChkaWRFcnIpIHRocm93IGVycjsgfSB9IH07IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHsgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTsgZW51bWVyYWJsZU9ubHkgJiYgKHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlOyB9KSksIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTsgfSByZXR1cm4ga2V5czsgfVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IG51bGwgIT0gYXJndW1lbnRzW2ldID8gYXJndW1lbnRzW2ldIDoge307IGkgJSAyID8gb3duS2V5cyhPYmplY3Qoc291cmNlKSwgITApLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSkgOiBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG52YXIgUHJvbWlzZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjE5KTtcbnZhciBlbnZpcm9ubWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oODI4KTtcbnZhciByZXF1aXJlRm9vbFdlYnBhY2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5Nyk7XG5cbi8qKlxuICogU3BlY2lhbCBtZXNzYWdlIHNlbnQgYnkgcGFyZW50IHdoaWNoIGNhdXNlcyBhIGNoaWxkIHByb2Nlc3Mgd29ya2VyIHRvIHRlcm1pbmF0ZSBpdHNlbGYuXG4gKiBOb3QgYSBcIm1lc3NhZ2Ugb2JqZWN0XCI7IHRoaXMgc3RyaW5nIGlzIHRoZSBlbnRpcmUgbWVzc2FnZS5cbiAqL1xudmFyIFRFUk1JTkFURV9NRVRIT0RfSUQgPSAnX193b3JrZXJwb29sLXRlcm1pbmF0ZV9fJztcblxuLyoqXG4gKiBJZiBzZW5kaW5nIGBURVJNSU5BVEVfTUVUSE9EX0lEYCBkb2VzIG5vdCBjYXVzZSB0aGUgY2hpbGQgcHJvY2VzcyB0byBleGl0IGluIHRoaXMgbWFueSBtaWxsaXNlY29uZHMsXG4gKiBmb3JjZS1raWxsIHRoZSBjaGlsZCBwcm9jZXNzLlxuICovXG52YXIgQ0hJTERfUFJPQ0VTU19FWElUX1RJTUVPVVQgPSAxMDAwO1xuZnVuY3Rpb24gZW5zdXJlV29ya2VyVGhyZWFkcygpIHtcbiAgdmFyIFdvcmtlclRocmVhZHMgPSB0cnlSZXF1aXJlV29ya2VyVGhyZWFkcygpO1xuICBpZiAoIVdvcmtlclRocmVhZHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtlclBvb2w6IHdvcmtlclR5cGUgPSBcXCd0aHJlYWRcXCcgaXMgbm90IHN1cHBvcnRlZCwgTm9kZSA+PSAxMS43LjAgcmVxdWlyZWQnKTtcbiAgfVxuICByZXR1cm4gV29ya2VyVGhyZWFkcztcbn1cblxuLy8gY2hlY2sgd2hldGhlciBXb3JrZXIgaXMgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyXG5mdW5jdGlvbiBlbnN1cmVXZWJXb3JrZXIoKSB7XG4gIC8vIFdvcmthcm91bmQgZm9yIGEgYnVnIGluIFBoYW50b21KUyAoT3IgUXRXZWJraXQpOiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xNDUzNFxuICBpZiAodHlwZW9mIFdvcmtlciAhPT0gJ2Z1bmN0aW9uJyAmJiAoKHR5cGVvZiBXb3JrZXIgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihXb3JrZXIpKSAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIFdvcmtlci5wcm90b3R5cGUuY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXb3JrZXJQb29sOiBXZWIgV29ya2VycyBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbn1cbmZ1bmN0aW9uIHRyeVJlcXVpcmVXb3JrZXJUaHJlYWRzKCkge1xuICB0cnkge1xuICAgIHJldHVybiByZXF1aXJlRm9vbFdlYnBhY2soJ3dvcmtlcl90aHJlYWRzJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKF90eXBlb2YoZXJyb3IpID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvci5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgIC8vIG5vIHdvcmtlcl90aHJlYWRzIGF2YWlsYWJsZSAob2xkIHZlcnNpb24gb2Ygbm9kZS5qcylcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cblxuLy8gZ2V0IHRoZSBkZWZhdWx0IHdvcmtlciBzY3JpcHRcbmZ1bmN0aW9uIGdldERlZmF1bHRXb3JrZXIoKSB7XG4gIGlmIChlbnZpcm9ubWVudC5wbGF0Zm9ybSA9PT0gJ2Jyb3dzZXInKSB7XG4gICAgLy8gdGVzdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIGFsbCBmZWF0dXJlcyB0aGF0IHdlIG5lZWRcbiAgICBpZiAodHlwZW9mIEJsb2IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jsb2Igbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlcicpO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5VUkwgfHwgdHlwZW9mIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTC5jcmVhdGVPYmplY3RVUkwgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlcicpO1xuICAgIH1cblxuICAgIC8vIHVzZSBlbWJlZGRlZCB3b3JrZXIuanNcbiAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtfX3dlYnBhY2tfcmVxdWlyZV9fKDY3MCldLCB7XG4gICAgICB0eXBlOiAndGV4dC9qYXZhc2NyaXB0J1xuICAgIH0pO1xuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgZXh0ZXJuYWwgd29ya2VyLmpzIGluIGN1cnJlbnQgZGlyZWN0b3J5XG4gICAgcmV0dXJuIF9fZGlybmFtZSArICcvd29ya2VyLmpzJztcbiAgfVxufVxuZnVuY3Rpb24gc2V0dXBXb3JrZXIoc2NyaXB0LCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLndvcmtlclR5cGUgPT09ICd3ZWInKSB7XG4gICAgLy8gYnJvd3NlciBvbmx5XG4gICAgZW5zdXJlV2ViV29ya2VyKCk7XG4gICAgcmV0dXJuIHNldHVwQnJvd3NlcldvcmtlcihzY3JpcHQsIFdvcmtlcik7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy53b3JrZXJUeXBlID09PSAndGhyZWFkJykge1xuICAgIC8vIG5vZGUuanMgb25seVxuICAgIFdvcmtlclRocmVhZHMgPSBlbnN1cmVXb3JrZXJUaHJlYWRzKCk7XG4gICAgcmV0dXJuIHNldHVwV29ya2VyVGhyZWFkV29ya2VyKHNjcmlwdCwgV29ya2VyVGhyZWFkcywgb3B0aW9ucy53b3JrZXJUaHJlYWRPcHRzKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLndvcmtlclR5cGUgPT09ICdwcm9jZXNzJyB8fCAhb3B0aW9ucy53b3JrZXJUeXBlKSB7XG4gICAgLy8gbm9kZS5qcyBvbmx5XG4gICAgcmV0dXJuIHNldHVwUHJvY2Vzc1dvcmtlcihzY3JpcHQsIHJlc29sdmVGb3JrT3B0aW9ucyhvcHRpb25zKSwgcmVxdWlyZUZvb2xXZWJwYWNrKCdjaGlsZF9wcm9jZXNzJykpO1xuICB9IGVsc2Uge1xuICAgIC8vIG9wdGlvbnMud29ya2VyVHlwZSA9PT0gJ2F1dG8nIG9yIHVuZGVmaW5lZFxuICAgIGlmIChlbnZpcm9ubWVudC5wbGF0Zm9ybSA9PT0gJ2Jyb3dzZXInKSB7XG4gICAgICBlbnN1cmVXZWJXb3JrZXIoKTtcbiAgICAgIHJldHVybiBzZXR1cEJyb3dzZXJXb3JrZXIoc2NyaXB0LCBXb3JrZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbnZpcm9ubWVudC5wbGF0Zm9ybSA9PT0gJ25vZGUnXG4gICAgICB2YXIgV29ya2VyVGhyZWFkcyA9IHRyeVJlcXVpcmVXb3JrZXJUaHJlYWRzKCk7XG4gICAgICBpZiAoV29ya2VyVGhyZWFkcykge1xuICAgICAgICByZXR1cm4gc2V0dXBXb3JrZXJUaHJlYWRXb3JrZXIoc2NyaXB0LCBXb3JrZXJUaHJlYWRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXR1cFByb2Nlc3NXb3JrZXIoc2NyaXB0LCByZXNvbHZlRm9ya09wdGlvbnMob3B0aW9ucyksIHJlcXVpcmVGb29sV2VicGFjaygnY2hpbGRfcHJvY2VzcycpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHNldHVwQnJvd3NlcldvcmtlcihzY3JpcHQsIFdvcmtlcikge1xuICAvLyBjcmVhdGUgdGhlIHdlYiB3b3JrZXJcbiAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoc2NyaXB0KTtcbiAgd29ya2VyLmlzQnJvd3NlcldvcmtlciA9IHRydWU7XG4gIC8vIGFkZCBub2RlLmpzIEFQSSB0byB0aGUgd2ViIHdvcmtlclxuICB3b3JrZXIub24gPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZS5kYXRhKTtcbiAgICB9KTtcbiAgfTtcbiAgd29ya2VyLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gIH07XG4gIHJldHVybiB3b3JrZXI7XG59XG5mdW5jdGlvbiBzZXR1cFdvcmtlclRocmVhZFdvcmtlcihzY3JpcHQsIFdvcmtlclRocmVhZHMsIHdvcmtlclRocmVhZE9wdGlvbnMpIHtcbiAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJUaHJlYWRzLldvcmtlcihzY3JpcHQsIF9vYmplY3RTcHJlYWQoe1xuICAgIHN0ZG91dDogZmFsc2UsXG4gICAgLy8gYXV0b21hdGljYWxseSBwaXBlIHdvcmtlci5TVERPVVQgdG8gcHJvY2Vzcy5TVERPVVRcbiAgICBzdGRlcnI6IGZhbHNlXG4gIH0sIHdvcmtlclRocmVhZE9wdGlvbnMpKTtcbiAgd29ya2VyLmlzV29ya2VyVGhyZWFkID0gdHJ1ZTtcbiAgLy8gbWFrZSB0aGUgd29ya2VyIG1pbWljIGEgY2hpbGRfcHJvY2Vzc1xuICB3b3JrZXIuc2VuZCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfTtcbiAgd29ya2VyLmtpbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50ZXJtaW5hdGUoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgd29ya2VyLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50ZXJtaW5hdGUoKTtcbiAgfTtcbiAgcmV0dXJuIHdvcmtlcjtcbn1cbmZ1bmN0aW9uIHNldHVwUHJvY2Vzc1dvcmtlcihzY3JpcHQsIG9wdGlvbnMsIGNoaWxkX3Byb2Nlc3MpIHtcbiAgLy8gbm8gV29ya2VyVGhyZWFkcywgZmFsbGJhY2sgdG8gc3ViLXByb2Nlc3MgYmFzZWQgd29ya2Vyc1xuICB2YXIgd29ya2VyID0gY2hpbGRfcHJvY2Vzcy5mb3JrKHNjcmlwdCwgb3B0aW9ucy5mb3JrQXJncywgb3B0aW9ucy5mb3JrT3B0cyk7XG4gIHdvcmtlci5pc0NoaWxkUHJvY2VzcyA9IHRydWU7XG4gIHJldHVybiB3b3JrZXI7XG59XG5cbi8vIGFkZCBkZWJ1ZyBmbGFncyB0byBjaGlsZCBwcm9jZXNzZXMgaWYgdGhlIG5vZGUgaW5zcGVjdG9yIGlzIGFjdGl2ZVxuZnVuY3Rpb24gcmVzb2x2ZUZvcmtPcHRpb25zKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHZhciBwcm9jZXNzRXhlY0FyZ3YgPSBwcm9jZXNzLmV4ZWNBcmd2LmpvaW4oJyAnKTtcbiAgdmFyIGluc3BlY3RvckFjdGl2ZSA9IHByb2Nlc3NFeGVjQXJndi5pbmRleE9mKCctLWluc3BlY3QnKSAhPT0gLTE7XG4gIHZhciBkZWJ1Z0JyayA9IHByb2Nlc3NFeGVjQXJndi5pbmRleE9mKCctLWRlYnVnLWJyaycpICE9PSAtMTtcbiAgdmFyIGV4ZWNBcmd2ID0gW107XG4gIGlmIChpbnNwZWN0b3JBY3RpdmUpIHtcbiAgICBleGVjQXJndi5wdXNoKCctLWluc3BlY3Q9JyArIG9wdHMuZGVidWdQb3J0KTtcbiAgICBpZiAoZGVidWdCcmspIHtcbiAgICAgIGV4ZWNBcmd2LnB1c2goJy0tZGVidWctYnJrJyk7XG4gICAgfVxuICB9XG4gIHByb2Nlc3MuZXhlY0FyZ3YuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgaWYgKGFyZy5pbmRleE9mKCctLW1heC1vbGQtc3BhY2Utc2l6ZScpID4gLTEpIHtcbiAgICAgIGV4ZWNBcmd2LnB1c2goYXJnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb3B0cywge1xuICAgIGZvcmtBcmdzOiBvcHRzLmZvcmtBcmdzLFxuICAgIGZvcmtPcHRzOiBPYmplY3QuYXNzaWduKHt9LCBvcHRzLmZvcmtPcHRzLCB7XG4gICAgICBleGVjQXJndjogKG9wdHMuZm9ya09wdHMgJiYgb3B0cy5mb3JrT3B0cy5leGVjQXJndiB8fCBbXSkuY29uY2F0KGV4ZWNBcmd2KVxuICAgIH0pXG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc2VyaWFsaXplZCBlcnJvciB0byBFcnJvclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBFcnJvciB0aGF0IGhhcyBiZWVuIHNlcmlhbGl6ZWQgYW5kIHBhcnNlZCB0byBvYmplY3RcbiAqIEByZXR1cm4ge0Vycm9yfSBUaGUgZXF1aXZhbGVudCBFcnJvci5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9FcnJvcihvYmopIHtcbiAgdmFyIHRlbXAgPSBuZXcgRXJyb3IoJycpO1xuICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGVtcFtwcm9wc1tpXV0gPSBvYmpbcHJvcHNbaV1dO1xuICB9XG4gIHJldHVybiB0ZW1wO1xufVxuXG4vKipcbiAqIEEgV29ya2VySGFuZGxlciBjb250cm9scyBhIHNpbmdsZSB3b3JrZXIuIFRoaXMgd29ya2VyIGNhbiBiZSBhIGNoaWxkIHByb2Nlc3NcbiAqIG9uIG5vZGUuanMgb3IgYSBXZWJXb3JrZXIgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IFtzY3JpcHRdIElmIG5vIHNjcmlwdCBpcyBwcm92aWRlZCwgYSBkZWZhdWx0IHdvcmtlciB3aXRoIGFcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBydW4gd2lsbCBiZSBjcmVhdGVkLlxuICogQHBhcmFtIHtXb3JrZXJQb29sT3B0aW9uc30gX29wdGlvbnMgU2VlIGRvY3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBXb3JrZXJIYW5kbGVyKHNjcmlwdCwgX29wdGlvbnMpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5zY3JpcHQgPSBzY3JpcHQgfHwgZ2V0RGVmYXVsdFdvcmtlcigpO1xuICB0aGlzLndvcmtlciA9IHNldHVwV29ya2VyKHRoaXMuc2NyaXB0LCBvcHRpb25zKTtcbiAgdGhpcy5kZWJ1Z1BvcnQgPSBvcHRpb25zLmRlYnVnUG9ydDtcbiAgdGhpcy5mb3JrT3B0cyA9IG9wdGlvbnMuZm9ya09wdHM7XG4gIHRoaXMuZm9ya0FyZ3MgPSBvcHRpb25zLmZvcmtBcmdzO1xuICB0aGlzLndvcmtlclRocmVhZE9wdHMgPSBvcHRpb25zLndvcmtlclRocmVhZE9wdHM7XG5cbiAgLy8gVGhlIHJlYWR5IG1lc3NhZ2UgaXMgb25seSBzZW50IGlmIHRoZSB3b3JrZXIuYWRkIG1ldGhvZCBpcyBjYWxsZWQgKEFuZCB0aGUgZGVmYXVsdCBzY3JpcHQgaXMgbm90IHVzZWQpXG4gIGlmICghc2NyaXB0KSB7XG4gICAgdGhpcy53b3JrZXIucmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgLy8gcXVldWUgZm9yIHJlcXVlc3RzIHRoYXQgYXJlIHJlY2VpdmVkIGJlZm9yZSB0aGUgd29ya2VyIGlzIHJlYWR5XG4gIHRoaXMucmVxdWVzdFF1ZXVlID0gW107XG4gIHRoaXMud29ya2VyLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKG1lLnRlcm1pbmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycgJiYgcmVzcG9uc2UgPT09ICdyZWFkeScpIHtcbiAgICAgIG1lLndvcmtlci5yZWFkeSA9IHRydWU7XG4gICAgICBkaXNwYXRjaFF1ZXVlZFJlcXVlc3RzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZpbmQgdGhlIHRhc2sgZnJvbSB0aGUgcHJvY2Vzc2luZyBxdWV1ZSwgYW5kIHJ1biB0aGUgdGFza3MgY2FsbGJhY2tcbiAgICAgIHZhciBpZCA9IHJlc3BvbnNlLmlkO1xuICAgICAgdmFyIHRhc2sgPSBtZS5wcm9jZXNzaW5nW2lkXTtcbiAgICAgIGlmICh0YXNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXZlbnQpIHtcbiAgICAgICAgICBpZiAodGFzay5vcHRpb25zICYmIHR5cGVvZiB0YXNrLm9wdGlvbnMub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRhc2sub3B0aW9ucy5vbihyZXNwb25zZS5wYXlsb2FkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0YXNrIGZyb20gdGhlIHF1ZXVlXG4gICAgICAgICAgZGVsZXRlIG1lLnByb2Nlc3NpbmdbaWRdO1xuXG4gICAgICAgICAgLy8gdGVzdCBpZiB3ZSBuZWVkIHRvIHRlcm1pbmF0ZVxuICAgICAgICAgIGlmIChtZS50ZXJtaW5hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gY29tcGxldGUgd29ya2VyIHRlcm1pbmF0aW9uIGlmIGFsbCB0YXNrcyBhcmUgZmluaXNoZWRcbiAgICAgICAgICAgIG1lLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlc29sdmUgdGhlIHRhc2sncyBwcm9taXNlXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICB0YXNrLnJlc29sdmVyLnJlamVjdChvYmplY3RUb0Vycm9yKHJlc3BvbnNlLmVycm9yKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2sucmVzb2x2ZXIucmVzb2x2ZShyZXNwb25zZS5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gcmVqZWN0IGFsbCBydW5uaW5nIHRhc2tzIG9uIHdvcmtlciBlcnJvclxuICBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgbWUudGVybWluYXRlZCA9IHRydWU7XG4gICAgZm9yICh2YXIgaWQgaW4gbWUucHJvY2Vzc2luZykge1xuICAgICAgaWYgKG1lLnByb2Nlc3NpbmdbaWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWUucHJvY2Vzc2luZ1tpZF0ucmVzb2x2ZXIucmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbWUucHJvY2Vzc2luZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICAvLyBzZW5kIGFsbCBxdWV1ZWQgcmVxdWVzdHMgdG8gd29ya2VyXG4gIGZ1bmN0aW9uIGRpc3BhdGNoUXVldWVkUmVxdWVzdHMoKSB7XG4gICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG1lLnJlcXVlc3RRdWV1ZS5zcGxpY2UoMCkpLFxuICAgICAgX3N0ZXA7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gX3N0ZXAudmFsdWU7XG4gICAgICAgIG1lLndvcmtlci5zZW5kKHJlcXVlc3QpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICB9XG4gIH1cbiAgdmFyIHdvcmtlciA9IHRoaXMud29ya2VyO1xuICAvLyBsaXN0ZW4gZm9yIHdvcmtlciBtZXNzYWdlcyBlcnJvciBhbmQgZXhpdFxuICB0aGlzLndvcmtlci5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgdGhpcy53b3JrZXIub24oJ2V4aXQnLCBmdW5jdGlvbiAoZXhpdENvZGUsIHNpZ25hbENvZGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXb3JrZXJwb29sIFdvcmtlciB0ZXJtaW5hdGVkIFVuZXhwZWN0ZWRseVxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIGV4aXRDb2RlOiBgJyArIGV4aXRDb2RlICsgJ2BcXG4nO1xuICAgIG1lc3NhZ2UgKz0gJyAgICBzaWduYWxDb2RlOiBgJyArIHNpZ25hbENvZGUgKyAnYFxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIHdvcmtlcnBvb2wuc2NyaXB0OiBgJyArIG1lLnNjcmlwdCArICdgXFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgc3Bhd25BcmdzOiBgJyArIHdvcmtlci5zcGF3bmFyZ3MgKyAnYFxcbic7XG4gICAgbWVzc2FnZSArPSAnICAgIHNwYXduZmlsZTogYCcgKyB3b3JrZXIuc3Bhd25maWxlICsgJ2BcXG4nO1xuICAgIG1lc3NhZ2UgKz0gJyAgICBzdGRvdXQ6IGAnICsgd29ya2VyLnN0ZG91dCArICdgXFxuJztcbiAgICBtZXNzYWdlICs9ICcgICAgc3RkZXJyOiBgJyArIHdvcmtlci5zdGRlcnIgKyAnYFxcbic7XG4gICAgb25FcnJvcihuZXcgRXJyb3IobWVzc2FnZSkpO1xuICB9KTtcbiAgdGhpcy5wcm9jZXNzaW5nID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gcXVldWUgd2l0aCB0YXNrcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3NcblxuICB0aGlzLnRlcm1pbmF0aW5nID0gZmFsc2U7XG4gIHRoaXMudGVybWluYXRlZCA9IGZhbHNlO1xuICB0aGlzLnRlcm1pbmF0aW9uSGFuZGxlciA9IG51bGw7XG4gIHRoaXMubGFzdElkID0gMDtcbn1cblxuLyoqXG4gKiBHZXQgYSBsaXN0IHdpdGggbWV0aG9kcyBhdmFpbGFibGUgb24gdGhlIHdvcmtlci5cbiAqIEByZXR1cm4ge1Byb21pc2UuPFN0cmluZ1tdLCBFcnJvcj59IG1ldGhvZHNcbiAqL1xuV29ya2VySGFuZGxlci5wcm90b3R5cGUubWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXhlYygnbWV0aG9kcycpO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlIGEgbWV0aG9kIHdpdGggZ2l2ZW4gcGFyYW1ldGVycyBvbiB0aGUgd29ya2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge0FycmF5fSBbcGFyYW1zXVxuICogQHBhcmFtIHt7cmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb259fSBbcmVzb2x2ZXJdXG4gKiBAcGFyYW0ge0V4ZWNPcHRpb25zfSAgW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtQcm9taXNlLjwqLCBFcnJvcj59IHJlc3VsdFxuICovXG5Xb3JrZXJIYW5kbGVyLnByb3RvdHlwZS5leGVjID0gZnVuY3Rpb24gKG1ldGhvZCwgcGFyYW1zLCByZXNvbHZlciwgb3B0aW9ucykge1xuICBpZiAoIXJlc29sdmVyKSB7XG4gICAgcmVzb2x2ZXIgPSBQcm9taXNlLmRlZmVyKCk7XG4gIH1cblxuICAvLyBnZW5lcmF0ZSBhIHVuaXF1ZSBpZCBmb3IgdGhlIHRhc2tcbiAgdmFyIGlkID0gKyt0aGlzLmxhc3RJZDtcblxuICAvLyByZWdpc3RlciBhIG5ldyB0YXNrIGFzIGJlaW5nIGluIHByb2dyZXNzXG4gIHRoaXMucHJvY2Vzc2luZ1tpZF0gPSB7XG4gICAgaWQ6IGlkLFxuICAgIHJlc29sdmVyOiByZXNvbHZlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgLy8gYnVpbGQgYSBKU09OLVJQQyByZXF1ZXN0XG4gIHZhciByZXF1ZXN0ID0ge1xuICAgIGlkOiBpZCxcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICBwYXJhbXM6IHBhcmFtc1xuICB9O1xuICBpZiAodGhpcy50ZXJtaW5hdGVkKSB7XG4gICAgcmVzb2x2ZXIucmVqZWN0KG5ldyBFcnJvcignV29ya2VyIGlzIHRlcm1pbmF0ZWQnKSk7XG4gIH0gZWxzZSBpZiAodGhpcy53b3JrZXIucmVhZHkpIHtcbiAgICAvLyBzZW5kIHRoZSByZXF1ZXN0IHRvIHRoZSB3b3JrZXJcbiAgICB0aGlzLndvcmtlci5zZW5kKHJlcXVlc3QpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVxdWVzdFF1ZXVlLnB1c2gocmVxdWVzdCk7XG4gIH1cblxuICAvLyBvbiBjYW5jZWxsYXRpb24sIGZvcmNlIHRoZSB3b3JrZXIgdG8gdGVybWluYXRlXG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiByZXNvbHZlci5wcm9taXNlW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUHJvbWlzZS5DYW5jZWxsYXRpb25FcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIFByb21pc2UuVGltZW91dEVycm9yKSB7XG4gICAgICAvLyByZW1vdmUgdGhpcyB0YXNrIGZyb20gdGhlIHF1ZXVlLiBJdCBpcyBhbHJlYWR5IHJlamVjdGVkIChoZW5jZSB0aGlzXG4gICAgICAvLyBjYXRjaCBldmVudCksIGFuZCBlbHNlIGl0IHdpbGwgYmUgcmVqZWN0ZWQgYWdhaW4gd2hlbiB0ZXJtaW5hdGluZ1xuICAgICAgZGVsZXRlIG1lLnByb2Nlc3NpbmdbaWRdO1xuXG4gICAgICAvLyB0ZXJtaW5hdGUgd29ya2VyXG4gICAgICByZXR1cm4gbWUudGVybWluYXRlQW5kTm90aWZ5KHRydWUpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIFRlc3Qgd2hldGhlciB0aGUgd29ya2VyIGlzIHdvcmtpbmcgb3Igbm90XG4gKiBAcmV0dXJuIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHdvcmtlciBpcyBidXN5XG4gKi9cbldvcmtlckhhbmRsZXIucHJvdG90eXBlLmJ1c3kgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnByb2Nlc3NpbmcpLmxlbmd0aCA+IDA7XG59O1xuXG4vKipcbiAqIFRlcm1pbmF0ZSB0aGUgd29ya2VyLlxuICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdICAgSWYgZmFsc2UgKGRlZmF1bHQpLCB0aGUgd29ya2VyIGlzIHRlcm1pbmF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGZpbmlzaGluZyBhbGwgdGFza3MgY3VycmVudGx5IGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy4gSWYgdHJ1ZSwgdGhlIHdvcmtlciB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkIGltbWVkaWF0ZWx5LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2NhbGxiYWNrPW51bGxdIElmIHByb3ZpZGVkLCB3aWxsIGJlIGNhbGxlZCB3aGVuIHByb2Nlc3MgdGVybWluYXRlcy5cbiAqL1xuV29ya2VySGFuZGxlci5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKGZvcmNlLCBjYWxsYmFjaykge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAoZm9yY2UpIHtcbiAgICAvLyBjYW5jZWwgYWxsIHRhc2tzIGluIHByb2dyZXNzXG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5wcm9jZXNzaW5nKSB7XG4gICAgICBpZiAodGhpcy5wcm9jZXNzaW5nW2lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc2luZ1tpZF0ucmVzb2x2ZXIucmVqZWN0KG5ldyBFcnJvcignV29ya2VyIHRlcm1pbmF0ZWQnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucHJvY2Vzc2luZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMudGVybWluYXRpb25IYW5kbGVyID0gY2FsbGJhY2s7XG4gIH1cbiAgaWYgKCF0aGlzLmJ1c3koKSkge1xuICAgIC8vIGFsbCB0YXNrcyBhcmUgZmluaXNoZWQuIGtpbGwgdGhlIHdvcmtlclxuICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cChlcnIpIHtcbiAgICAgIG1lLnRlcm1pbmF0ZWQgPSB0cnVlO1xuICAgICAgaWYgKG1lLndvcmtlciAhPSBudWxsICYmIG1lLndvcmtlci5yZW1vdmVBbGxMaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gcmVtb3ZlQWxsTGlzdGVuZXJzIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBjaGlsZF9wcm9jZXNzXG4gICAgICAgIG1lLndvcmtlci5yZW1vdmVBbGxMaXN0ZW5lcnMoJ21lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICAgIG1lLndvcmtlciA9IG51bGw7XG4gICAgICBtZS50ZXJtaW5hdGluZyA9IGZhbHNlO1xuICAgICAgaWYgKG1lLnRlcm1pbmF0aW9uSGFuZGxlcikge1xuICAgICAgICBtZS50ZXJtaW5hdGlvbkhhbmRsZXIoZXJyLCBtZSk7XG4gICAgICB9IGVsc2UgaWYgKGVycikge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAodGhpcy53b3JrZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy53b3JrZXIua2lsbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAodGhpcy53b3JrZXIua2lsbGVkKSB7XG4gICAgICAgICAgY2xlYW51cChuZXcgRXJyb3IoJ3dvcmtlciBhbHJlYWR5IGtpbGxlZCEnKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndvcmtlci5pc0NoaWxkUHJvY2Vzcykge1xuICAgICAgICAgIHZhciBjbGVhbkV4aXRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobWUud29ya2VyKSB7XG4gICAgICAgICAgICAgIG1lLndvcmtlci5raWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgQ0hJTERfUFJPQ0VTU19FWElUX1RJTUVPVVQpO1xuICAgICAgICAgIHRoaXMud29ya2VyLm9uY2UoJ2V4aXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xlYW5FeGl0VGltZW91dCk7XG4gICAgICAgICAgICBpZiAobWUud29ya2VyKSB7XG4gICAgICAgICAgICAgIG1lLndvcmtlci5raWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh0aGlzLndvcmtlci5yZWFkeSkge1xuICAgICAgICAgICAgdGhpcy53b3JrZXIuc2VuZChURVJNSU5BVEVfTUVUSE9EX0lEKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UXVldWUucHVzaChURVJNSU5BVEVfTUVUSE9EX0lEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd29ya2VyX3RocmVhZFxuICAgICAgICAgIHRoaXMud29ya2VyLmtpbGwoKTtcbiAgICAgICAgICB0aGlzLndvcmtlci5raWxsZWQgPSB0cnVlO1xuICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLndvcmtlci50ZXJtaW5hdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy53b3JrZXIudGVybWluYXRlKCk7IC8vIHdlYiB3b3JrZXJcbiAgICAgICAgdGhpcy53b3JrZXIua2lsbGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHRlcm1pbmF0ZSB3b3JrZXInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2xlYW51cCgpO1xuICB9IGVsc2Uge1xuICAgIC8vIHdlIGNhbid0IHRlcm1pbmF0ZSBpbW1lZGlhdGVseSwgdGhlcmUgYXJlIHN0aWxsIHRhc2tzIGJlaW5nIGV4ZWN1dGVkXG4gICAgdGhpcy50ZXJtaW5hdGluZyA9IHRydWU7XG4gIH1cbn07XG5cbi8qKlxuICogVGVybWluYXRlIHRoZSB3b3JrZXIsIHJldHVybmluZyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB0ZXJtaW5hdGlvbiBoYXMgYmVlbiBkb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbZm9yY2U9ZmFsc2VdICAgSWYgZmFsc2UgKGRlZmF1bHQpLCB0aGUgd29ya2VyIGlzIHRlcm1pbmF0ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGZpbmlzaGluZyBhbGwgdGFza3MgY3VycmVudGx5IGluXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy4gSWYgdHJ1ZSwgdGhlIHdvcmtlciB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkIGltbWVkaWF0ZWx5LlxuICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XSAgICAgICAgSWYgcHJvdmlkZWQgYW5kIG5vbi16ZXJvLCB3b3JrZXIgdGVybWluYXRpb24gcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlciB0aW1lb3V0IGlmIHdvcmtlciBwcm9jZXNzIGhhcyBub3QgYmVlbiB0ZXJtaW5hdGVkLlxuICogQHJldHVybiB7UHJvbWlzZS48V29ya2VySGFuZGxlciwgRXJyb3I+fVxuICovXG5Xb3JrZXJIYW5kbGVyLnByb3RvdHlwZS50ZXJtaW5hdGVBbmROb3RpZnkgPSBmdW5jdGlvbiAoZm9yY2UsIHRpbWVvdXQpIHtcbiAgdmFyIHJlc29sdmVyID0gUHJvbWlzZS5kZWZlcigpO1xuICBpZiAodGltZW91dCkge1xuICAgIHJlc29sdmVyLnByb21pc2UudGltZW91dCA9IHRpbWVvdXQ7XG4gIH1cbiAgdGhpcy50ZXJtaW5hdGUoZm9yY2UsIGZ1bmN0aW9uIChlcnIsIHdvcmtlcikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIHJlc29sdmVyLnJlamVjdChlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlci5yZXNvbHZlKHdvcmtlcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc29sdmVyLnByb21pc2U7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXb3JrZXJIYW5kbGVyO1xubW9kdWxlLmV4cG9ydHMuX3RyeVJlcXVpcmVXb3JrZXJUaHJlYWRzID0gdHJ5UmVxdWlyZVdvcmtlclRocmVhZHM7XG5tb2R1bGUuZXhwb3J0cy5fc2V0dXBQcm9jZXNzV29ya2VyID0gc2V0dXBQcm9jZXNzV29ya2VyO1xubW9kdWxlLmV4cG9ydHMuX3NldHVwQnJvd3NlcldvcmtlciA9IHNldHVwQnJvd3Nlcldvcmtlcjtcbm1vZHVsZS5leHBvcnRzLl9zZXR1cFdvcmtlclRocmVhZFdvcmtlciA9IHNldHVwV29ya2VyVGhyZWFkV29ya2VyO1xubW9kdWxlLmV4cG9ydHMuZW5zdXJlV29ya2VyVGhyZWFkcyA9IGVuc3VyZVdvcmtlclRocmVhZHM7XG5cbi8qKiovIH0pLFxuXG4vKioqLyA4MzM6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBNQVhfUE9SVFMgPSA2NTUzNTtcbm1vZHVsZS5leHBvcnRzID0gRGVidWdQb3J0QWxsb2NhdG9yO1xuZnVuY3Rpb24gRGVidWdQb3J0QWxsb2NhdG9yKCkge1xuICB0aGlzLnBvcnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5sZW5ndGggPSAwO1xufVxuRGVidWdQb3J0QWxsb2NhdG9yLnByb3RvdHlwZS5uZXh0QXZhaWxhYmxlU3RhcnRpbmdBdCA9IGZ1bmN0aW9uIChzdGFydGluZykge1xuICB3aGlsZSAodGhpcy5wb3J0c1tzdGFydGluZ10gPT09IHRydWUpIHtcbiAgICBzdGFydGluZysrO1xuICB9XG4gIGlmIChzdGFydGluZyA+PSBNQVhfUE9SVFMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dvcmtlclBvb2wgZGVidWcgcG9ydCBsaW1pdCByZWFjaGVkOiAnICsgc3RhcnRpbmcgKyAnPj0gJyArIE1BWF9QT1JUUyk7XG4gIH1cbiAgdGhpcy5wb3J0c1tzdGFydGluZ10gPSB0cnVlO1xuICB0aGlzLmxlbmd0aCsrO1xuICByZXR1cm4gc3RhcnRpbmc7XG59O1xuRGVidWdQb3J0QWxsb2NhdG9yLnByb3RvdHlwZS5yZWxlYXNlUG9ydCA9IGZ1bmN0aW9uIChwb3J0KSB7XG4gIGRlbGV0ZSB0aGlzLnBvcnRzW3BvcnRdO1xuICB0aGlzLmxlbmd0aC0tO1xufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDgyODpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcmVxdWlyZUZvb2xXZWJwYWNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOTcpO1xuXG4vLyBzb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9mbGV4ZGluZXNoL2Jyb3dzZXItb3Itbm9kZVxudmFyIGlzTm9kZSA9IGZ1bmN0aW9uIGlzTm9kZShub2RlUHJvY2Vzcykge1xuICByZXR1cm4gdHlwZW9mIG5vZGVQcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBub2RlUHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmIG5vZGVQcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbDtcbn07XG5tb2R1bGUuZXhwb3J0cy5pc05vZGUgPSBpc05vZGU7XG5cbi8vIGRldGVybWluZXMgdGhlIEphdmFTY3JpcHQgcGxhdGZvcm06IGJyb3dzZXIgb3Igbm9kZVxubW9kdWxlLmV4cG9ydHMucGxhdGZvcm0gPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOb2RlKHByb2Nlc3MpID8gJ25vZGUnIDogJ2Jyb3dzZXInO1xuXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGNvZGUgaXMgcnVubmluZyBpbiBtYWluIHRocmVhZCBvciBub3Rcbi8vIG5vdGUgdGhhdCBpbiBub2RlLmpzIHdlIGhhdmUgdG8gY2hlY2sgYm90aCB3b3JrZXJfdGhyZWFkIGFuZCBjaGlsZF9wcm9jZXNzXG52YXIgd29ya2VyX3RocmVhZHMgPSB0cnlSZXF1aXJlRm9vbFdlYnBhY2soJ3dvcmtlcl90aHJlYWRzJyk7XG5tb2R1bGUuZXhwb3J0cy5pc01haW5UaHJlYWQgPSBtb2R1bGUuZXhwb3J0cy5wbGF0Zm9ybSA9PT0gJ25vZGUnID8gKCF3b3JrZXJfdGhyZWFkcyB8fCB3b3JrZXJfdGhyZWFkcy5pc01haW5UaHJlYWQpICYmICFwcm9jZXNzLmNvbm5lY3RlZCA6IHR5cGVvZiBXaW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG4vLyBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgY3B1cyBhdmFpbGFibGVcbm1vZHVsZS5leHBvcnRzLmNwdXMgPSBtb2R1bGUuZXhwb3J0cy5wbGF0Zm9ybSA9PT0gJ2Jyb3dzZXInID8gc2VsZi5uYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA6IHJlcXVpcmVGb29sV2VicGFjaygnb3MnKS5jcHVzKCkubGVuZ3RoO1xuZnVuY3Rpb24gdHJ5UmVxdWlyZUZvb2xXZWJwYWNrKG1vZHVsZSkge1xuICB0cnkge1xuICAgIHJldHVybiByZXF1aXJlRm9vbFdlYnBhY2sobW9kdWxlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIDY3MDpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuLyoqXG4gKiBlbWJlZGRlZFdvcmtlci5qcyBjb250YWlucyBhbiBlbWJlZGRlZCB2ZXJzaW9uIG9mIHdvcmtlci5qcy5cbiAqIFRoaXMgZmlsZSBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCxcbiAqIGNoYW5nZXMgbWFkZSBpbiB0aGlzIGZpbGUgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBcIiFmdW5jdGlvbigpe3ZhciBfX3dlYnBhY2tfZXhwb3J0c19fPXt9OyFmdW5jdGlvbigpe3ZhciBleHBvcnRzPV9fd2VicGFja19leHBvcnRzX18sX193ZWJwYWNrX3VudXNlZF9leHBvcnRfXztmdW5jdGlvbiBfdHlwZW9mKHIpe3JldHVybihfdHlwZW9mPVxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBTeW1ib2wmJlxcXCJzeW1ib2xcXFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHIpe3JldHVybiB0eXBlb2Ygcn06ZnVuY3Rpb24ocil7cmV0dXJuIHImJlxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBTeW1ib2wmJnIuY29uc3RydWN0b3I9PT1TeW1ib2wmJnIhPT1TeW1ib2wucHJvdG90eXBlP1xcXCJzeW1ib2xcXFwiOnR5cGVvZiByfSkocil9dmFyIHJlcXVpcmVGb29sV2VicGFjaz1ldmFsKFxcXCJ0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlIDogZnVuY3Rpb24gKG1vZHVsZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSBcXFxcXFxcIiArIG1vZHVsZSArIFxcXFxcXFwiIG5vdCBmb3VuZC4nKSB9XFxcIiksVEVSTUlOQVRFX01FVEhPRF9JRD1cXFwiX193b3JrZXJwb29sLXRlcm1pbmF0ZV9fXFxcIix3b3JrZXI9e2V4aXQ6ZnVuY3Rpb24oKXt9fSxXb3JrZXJUaHJlYWRzLHBhcmVudFBvcnQ7aWYoXFxcInVuZGVmaW5lZFxcXCIhPXR5cGVvZiBzZWxmJiZcXFwiZnVuY3Rpb25cXFwiPT10eXBlb2YgcG9zdE1lc3NhZ2UmJlxcXCJmdW5jdGlvblxcXCI9PXR5cGVvZiBhZGRFdmVudExpc3RlbmVyKXdvcmtlci5vbj1mdW5jdGlvbihyLGUpe2FkZEV2ZW50TGlzdGVuZXIocixmdW5jdGlvbihyKXtlKHIuZGF0YSl9KX0sd29ya2VyLnNlbmQ9ZnVuY3Rpb24ocil7cG9zdE1lc3NhZ2Uocil9O2Vsc2V7aWYoXFxcInVuZGVmaW5lZFxcXCI9PXR5cGVvZiBwcm9jZXNzKXRocm93IG5ldyBFcnJvcihcXFwiU2NyaXB0IG11c3QgYmUgZXhlY3V0ZWQgYXMgYSB3b3JrZXJcXFwiKTt0cnl7V29ya2VyVGhyZWFkcz1yZXF1aXJlRm9vbFdlYnBhY2soXFxcIndvcmtlcl90aHJlYWRzXFxcIil9Y2F0Y2goZXJyb3Ipe2lmKFxcXCJvYmplY3RcXFwiIT09X3R5cGVvZihlcnJvcil8fG51bGw9PT1lcnJvcnx8XFxcIk1PRFVMRV9OT1RfRk9VTkRcXFwiIT09ZXJyb3IuY29kZSl0aHJvdyBlcnJvcn1Xb3JrZXJUaHJlYWRzJiZudWxsIT09V29ya2VyVGhyZWFkcy5wYXJlbnRQb3J0PyhwYXJlbnRQb3J0PVdvcmtlclRocmVhZHMucGFyZW50UG9ydCx3b3JrZXIuc2VuZD1wYXJlbnRQb3J0LnBvc3RNZXNzYWdlLmJpbmQocGFyZW50UG9ydCksd29ya2VyLm9uPXBhcmVudFBvcnQub24uYmluZChwYXJlbnRQb3J0KSk6KHdvcmtlci5vbj1wcm9jZXNzLm9uLmJpbmQocHJvY2Vzcyksd29ya2VyLnNlbmQ9cHJvY2Vzcy5zZW5kLmJpbmQocHJvY2Vzcyksd29ya2VyLm9uKFxcXCJkaXNjb25uZWN0XFxcIixmdW5jdGlvbigpe3Byb2Nlc3MuZXhpdCgxKX0pLHdvcmtlci5leGl0PXByb2Nlc3MuZXhpdC5iaW5kKHByb2Nlc3MpKX1mdW5jdGlvbiBjb252ZXJ0RXJyb3Iobyl7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLnJlZHVjZShmdW5jdGlvbihyLGUpe3JldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocixlLHt2YWx1ZTpvW2VdLGVudW1lcmFibGU6ITB9KX0se30pfWZ1bmN0aW9uIGlzUHJvbWlzZShyKXtyZXR1cm4gciYmXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIHIudGhlbiYmXFxcImZ1bmN0aW9uXFxcIj09dHlwZW9mIHIuY2F0Y2h9d29ya2VyLm1ldGhvZHM9e30sd29ya2VyLm1ldGhvZHMucnVuPWZ1bmN0aW9uKHIsZSl7cj1uZXcgRnVuY3Rpb24oXFxcInJldHVybiAoXFxcIityK1xcXCIpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XFxcIik7cmV0dXJuIHIuYXBwbHkocixlKX0sd29ya2VyLm1ldGhvZHMubWV0aG9kcz1mdW5jdGlvbigpe3JldHVybiBPYmplY3Qua2V5cyh3b3JrZXIubWV0aG9kcyl9O3ZhciBjdXJyZW50UmVxdWVzdElkPW51bGw7d29ya2VyLm9uKFxcXCJtZXNzYWdlXFxcIixmdW5jdGlvbihlKXtpZihlPT09VEVSTUlOQVRFX01FVEhPRF9JRClyZXR1cm4gd29ya2VyLmV4aXQoMCk7dHJ5e3ZhciByPXdvcmtlci5tZXRob2RzW2UubWV0aG9kXTtpZighcil0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWV0aG9kIFxcXCInK2UubWV0aG9kKydcXFwiJyk7Y3VycmVudFJlcXVlc3RJZD1lLmlkO3ZhciBvPXIuYXBwbHkocixlLnBhcmFtcyk7aXNQcm9taXNlKG8pP28udGhlbihmdW5jdGlvbihyKXt3b3JrZXIuc2VuZCh7aWQ6ZS5pZCxyZXN1bHQ6cixlcnJvcjpudWxsfSksY3VycmVudFJlcXVlc3RJZD1udWxsfSkuY2F0Y2goZnVuY3Rpb24ocil7d29ya2VyLnNlbmQoe2lkOmUuaWQscmVzdWx0Om51bGwsZXJyb3I6Y29udmVydEVycm9yKHIpfSksY3VycmVudFJlcXVlc3RJZD1udWxsfSk6KHdvcmtlci5zZW5kKHtpZDplLmlkLHJlc3VsdDpvLGVycm9yOm51bGx9KSxjdXJyZW50UmVxdWVzdElkPW51bGwpfWNhdGNoKHIpe3dvcmtlci5zZW5kKHtpZDplLmlkLHJlc3VsdDpudWxsLGVycm9yOmNvbnZlcnRFcnJvcihyKX0pfX0pLHdvcmtlci5yZWdpc3Rlcj1mdW5jdGlvbihyKXtpZihyKWZvcih2YXIgZSBpbiByKXIuaGFzT3duUHJvcGVydHkoZSkmJih3b3JrZXIubWV0aG9kc1tlXT1yW2VdKTt3b3JrZXIuc2VuZChcXFwicmVhZHlcXFwiKX0sd29ya2VyLmVtaXQ9ZnVuY3Rpb24ocil7Y3VycmVudFJlcXVlc3RJZCYmd29ya2VyLnNlbmQoe2lkOmN1cnJlbnRSZXF1ZXN0SWQsaXNFdmVudDohMCxwYXlsb2FkOnJ9KX0sX193ZWJwYWNrX3VudXNlZF9leHBvcnRfXz13b3JrZXIucmVnaXN0ZXIsd29ya2VyLmVtaXR9KCl9KCk7XCI7XG5cbi8qKiovIH0pLFxuXG4vKioqLyAzOTc6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbi8vIHNvdXJjZSBvZiBpbnNwaXJhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9yZXF1aXJlLWZvb2wtd2VicGFja1xudmFyIHJlcXVpcmVGb29sV2VicGFjayA9IGV2YWwoJ3R5cGVvZiByZXF1aXJlICE9PSBcXCd1bmRlZmluZWRcXCcgJyArICc/IHJlcXVpcmUgJyArICc6IGZ1bmN0aW9uIChtb2R1bGUpIHsgdGhyb3cgbmV3IEVycm9yKFxcJ01vZHVsZSBcIiArIG1vZHVsZSArIFwiIG5vdCBmb3VuZC5cXCcpIH0nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZUZvb2xXZWJwYWNrO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gNzQ0OlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSB7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cbi8qKlxuICogd29ya2VyIG11c3QgYmUgc3RhcnRlZCBhcyBhIGNoaWxkIHByb2Nlc3Mgb3IgYSB3ZWIgd29ya2VyLlxuICogSXQgbGlzdGVucyBmb3IgUlBDIG1lc3NhZ2VzIGZyb20gdGhlIHBhcmVudCBwcm9jZXNzLlxuICovXG5cbi8vIHNvdXJjZSBvZiBpbnNwaXJhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9yZXF1aXJlLWZvb2wtd2VicGFja1xudmFyIHJlcXVpcmVGb29sV2VicGFjayA9IGV2YWwoJ3R5cGVvZiByZXF1aXJlICE9PSBcXCd1bmRlZmluZWRcXCcnICsgJyA/IHJlcXVpcmUnICsgJyA6IGZ1bmN0aW9uIChtb2R1bGUpIHsgdGhyb3cgbmV3IEVycm9yKFxcJ01vZHVsZSBcIiArIG1vZHVsZSArIFwiIG5vdCBmb3VuZC5cXCcpIH0nKTtcblxuLyoqXG4gKiBTcGVjaWFsIG1lc3NhZ2Ugc2VudCBieSBwYXJlbnQgd2hpY2ggY2F1c2VzIHRoZSB3b3JrZXIgdG8gdGVybWluYXRlIGl0c2VsZi5cbiAqIE5vdCBhIFwibWVzc2FnZSBvYmplY3RcIjsgdGhpcyBzdHJpbmcgaXMgdGhlIGVudGlyZSBtZXNzYWdlLlxuICovXG52YXIgVEVSTUlOQVRFX01FVEhPRF9JRCA9ICdfX3dvcmtlcnBvb2wtdGVybWluYXRlX18nO1xuXG4vLyB2YXIgbm9kZU9TUGxhdGZvcm0gPSByZXF1aXJlKCcuL2Vudmlyb25tZW50Jykubm9kZU9TUGxhdGZvcm07XG5cbi8vIGNyZWF0ZSBhIHdvcmtlciBBUEkgZm9yIHNlbmRpbmcgYW5kIHJlY2VpdmluZyBtZXNzYWdlcyB3aGljaCB3b3JrcyBib3RoIG9uXG4vLyBub2RlLmpzIGFuZCBpbiB0aGUgYnJvd3NlclxudmFyIHdvcmtlciA9IHtcbiAgZXhpdDogZnVuY3Rpb24gZXhpdCgpIHt9XG59O1xuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gd29ya2VyIGluIHRoZSBicm93c2VyXG4gIHdvcmtlci5vbiA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZS5kYXRhKTtcbiAgICB9KTtcbiAgfTtcbiAgd29ya2VyLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICB9O1xufSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gbm9kZS5qc1xuXG4gIHZhciBXb3JrZXJUaHJlYWRzO1xuICB0cnkge1xuICAgIFdvcmtlclRocmVhZHMgPSByZXF1aXJlRm9vbFdlYnBhY2soJ3dvcmtlcl90aHJlYWRzJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKF90eXBlb2YoZXJyb3IpID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiBlcnJvci5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgIC8vIG5vIHdvcmtlcl90aHJlYWRzLCBmYWxsYmFjayB0byBzdWItcHJvY2VzcyBiYXNlZCB3b3JrZXJzXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuICBpZiAoV29ya2VyVGhyZWFkcyAmJiAvKiBpZiB0aGVyZSBpcyBhIHBhcmVudFBvcnQsIHdlIGFyZSBpbiBhIFdvcmtlclRocmVhZCAqL1xuICBXb3JrZXJUaHJlYWRzLnBhcmVudFBvcnQgIT09IG51bGwpIHtcbiAgICB2YXIgcGFyZW50UG9ydCA9IFdvcmtlclRocmVhZHMucGFyZW50UG9ydDtcbiAgICB3b3JrZXIuc2VuZCA9IHBhcmVudFBvcnQucG9zdE1lc3NhZ2UuYmluZChwYXJlbnRQb3J0KTtcbiAgICB3b3JrZXIub24gPSBwYXJlbnRQb3J0Lm9uLmJpbmQocGFyZW50UG9ydCk7XG4gIH0gZWxzZSB7XG4gICAgd29ya2VyLm9uID0gcHJvY2Vzcy5vbi5iaW5kKHByb2Nlc3MpO1xuICAgIHdvcmtlci5zZW5kID0gcHJvY2Vzcy5zZW5kLmJpbmQocHJvY2Vzcyk7XG4gICAgLy8gcmVnaXN0ZXIgZGlzY29ubmVjdCBoYW5kbGVyIG9ubHkgZm9yIHN1YnByb2Nlc3Mgd29ya2VyIHRvIGV4aXQgd2hlbiBwYXJlbnQgaXMga2lsbGVkIHVuZXhwZWN0ZWRseVxuICAgIHdvcmtlci5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcbiAgICB3b3JrZXIuZXhpdCA9IHByb2Nlc3MuZXhpdC5iaW5kKHByb2Nlc3MpO1xuICB9XG59IGVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1NjcmlwdCBtdXN0IGJlIGV4ZWN1dGVkIGFzIGEgd29ya2VyJyk7XG59XG5mdW5jdGlvbiBjb252ZXJ0RXJyb3IoZXJyb3IpIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycm9yKS5yZWR1Y2UoZnVuY3Rpb24gKHByb2R1Y3QsIG5hbWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb2R1Y3QsIG5hbWUsIHtcbiAgICAgIHZhbHVlOiBlcnJvcltuYW1lXSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSwge30pO1xufVxuXG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIHZhbHVlIGlzIGEgUHJvbWlzZSB2aWEgZHVjayB0eXBpbmcuXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIHdoZW4gZ2l2ZW4gdmFsdWUgaXMgYW4gb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgaGF2aW5nIGZ1bmN0aW9ucyBgdGhlbmAgYW5kIGBjYXRjaGAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlW1wiY2F0Y2hcIl0gPT09ICdmdW5jdGlvbic7XG59XG5cbi8vIGZ1bmN0aW9ucyBhdmFpbGFibGUgZXh0ZXJuYWxseVxud29ya2VyLm1ldGhvZHMgPSB7fTtcblxuLyoqXG4gKiBFeGVjdXRlIGEgZnVuY3Rpb24gd2l0aCBwcm92aWRlZCBhcmd1bWVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmbiAgICAgU3RyaW5naWZpZWQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSAgRnVuY3Rpb24gYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xud29ya2VyLm1ldGhvZHMucnVuID0gZnVuY3Rpb24gcnVuKGZuLCBhcmdzKSB7XG4gIHZhciBmID0gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gKCcgKyBmbiArICcpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7Jyk7XG4gIHJldHVybiBmLmFwcGx5KGYsIGFyZ3MpO1xufTtcblxuLyoqXG4gKiBHZXQgYSBsaXN0IHdpdGggbWV0aG9kcyBhdmFpbGFibGUgb24gdGhpcyB3b3JrZXJcbiAqIEByZXR1cm4ge1N0cmluZ1tdfSBtZXRob2RzXG4gKi9cbndvcmtlci5tZXRob2RzLm1ldGhvZHMgPSBmdW5jdGlvbiBtZXRob2RzKCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMod29ya2VyLm1ldGhvZHMpO1xufTtcbnZhciBjdXJyZW50UmVxdWVzdElkID0gbnVsbDtcbndvcmtlci5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gIGlmIChyZXF1ZXN0ID09PSBURVJNSU5BVEVfTUVUSE9EX0lEKSB7XG4gICAgcmV0dXJuIHdvcmtlci5leGl0KDApO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIG1ldGhvZCA9IHdvcmtlci5tZXRob2RzW3JlcXVlc3QubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kKSB7XG4gICAgICBjdXJyZW50UmVxdWVzdElkID0gcmVxdWVzdC5pZDtcblxuICAgICAgLy8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25cbiAgICAgIHZhciByZXN1bHQgPSBtZXRob2QuYXBwbHkobWV0aG9kLCByZXF1ZXN0LnBhcmFtcyk7XG4gICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgLy8gcHJvbWlzZSByZXR1cm5lZCwgcmVzb2x2ZSB0aGlzIGFuZCB0aGVuIHJldHVyblxuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgd29ya2VyLnNlbmQoe1xuICAgICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudFJlcXVlc3RJZCA9IG51bGw7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIHdvcmtlci5zZW5kKHtcbiAgICAgICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICAgICAgcmVzdWx0OiBudWxsLFxuICAgICAgICAgICAgZXJyb3I6IGNvbnZlcnRFcnJvcihlcnIpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudFJlcXVlc3RJZCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW1tZWRpYXRlIHJlc3VsdFxuICAgICAgICB3b3JrZXIuc2VuZCh7XG4gICAgICAgICAgaWQ6IHJlcXVlc3QuaWQsXG4gICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgZXJyb3I6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRSZXF1ZXN0SWQgPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWV0aG9kIFwiJyArIHJlcXVlc3QubWV0aG9kICsgJ1wiJyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICB3b3JrZXIuc2VuZCh7XG4gICAgICBpZDogcmVxdWVzdC5pZCxcbiAgICAgIHJlc3VsdDogbnVsbCxcbiAgICAgIGVycm9yOiBjb252ZXJ0RXJyb3IoZXJyKVxuICAgIH0pO1xuICB9XG59KTtcblxuLyoqXG4gKiBSZWdpc3RlciBtZXRob2RzIHRvIHRoZSB3b3JrZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBtZXRob2RzXG4gKi9cbndvcmtlci5yZWdpc3RlciA9IGZ1bmN0aW9uIChtZXRob2RzKSB7XG4gIGlmIChtZXRob2RzKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAobWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB3b3JrZXIubWV0aG9kc1tuYW1lXSA9IG1ldGhvZHNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHdvcmtlci5zZW5kKCdyZWFkeScpO1xufTtcbndvcmtlci5lbWl0ID0gZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgaWYgKGN1cnJlbnRSZXF1ZXN0SWQpIHtcbiAgICB3b3JrZXIuc2VuZCh7XG4gICAgICBpZDogY3VycmVudFJlcXVlc3RJZCxcbiAgICAgIGlzRXZlbnQ6IHRydWUsXG4gICAgICBwYXlsb2FkOiBwYXlsb2FkXG4gICAgfSk7XG4gIH1cbn07XG5pZiAodHJ1ZSkge1xuICBleHBvcnRzLmFkZCA9IHdvcmtlci5yZWdpc3RlcjtcbiAgZXhwb3J0cy5lbWl0ID0gd29ya2VyLmVtaXQ7XG59XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbnZhciBleHBvcnRzID0gX193ZWJwYWNrX2V4cG9ydHNfXztcbnZhciBlbnZpcm9ubWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oODI4KTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgd29ya2VyIHBvb2xcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2NyaXB0XVxuICogQHBhcmFtIHtXb3JrZXJQb29sT3B0aW9uc30gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7UG9vbH0gcG9vbFxuICovXG5leHBvcnRzLnBvb2wgPSBmdW5jdGlvbiBwb29sKHNjcmlwdCwgb3B0aW9ucykge1xuICB2YXIgUG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oMzQ1KTtcbiAgcmV0dXJuIG5ldyBQb29sKHNjcmlwdCwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHdvcmtlciBhbmQgb3B0aW9uYWxseSByZWdpc3RlciBhIHNldCBvZiBtZXRob2RzIHRvIHRoZSB3b3JrZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gW21ldGhvZHNdXG4gKi9cbmV4cG9ydHMud29ya2VyID0gZnVuY3Rpb24gd29ya2VyKG1ldGhvZHMpIHtcbiAgdmFyIHdvcmtlciA9IF9fd2VicGFja19yZXF1aXJlX18oNzQ0KTtcbiAgd29ya2VyLmFkZChtZXRob2RzKTtcbn07XG5cbi8qKlxuICogU2VuZHMgYW4gZXZlbnQgdG8gdGhlIHBhcmVudCB3b3JrZXIgcG9vbC5cbiAqIEBwYXJhbSB7YW55fSBwYXlsb2FkIFxuICovXG5leHBvcnRzLndvcmtlckVtaXQgPSBmdW5jdGlvbiB3b3JrZXJFbWl0KHBheWxvYWQpIHtcbiAgdmFyIHdvcmtlciA9IF9fd2VicGFja19yZXF1aXJlX18oNzQ0KTtcbiAgd29ya2VyLmVtaXQocGF5bG9hZCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHByb21pc2UuXG4gKiBAdHlwZSB7UHJvbWlzZX0gcHJvbWlzZVxuICovXG5leHBvcnRzLlByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxOSk7XG5leHBvcnRzLnBsYXRmb3JtID0gZW52aXJvbm1lbnQucGxhdGZvcm07XG5leHBvcnRzLmlzTWFpblRocmVhZCA9IGVudmlyb25tZW50LmlzTWFpblRocmVhZDtcbmV4cG9ydHMuY3B1cyA9IGVudmlyb25tZW50LmNwdXM7XG59KCk7XG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13b3JrZXJwb29sLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmICFxdWV1ZS5kKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IDEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JlbmNoLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9