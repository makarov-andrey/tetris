"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolesV2Calculator = void 0;
const HolesHelper_1 = require("../../Utils/HolesHelper");
class HolesStats {
    openedHoles;
    closedHoles;
    closedHolesCellsCount;
    openedHolesCellsCount;
    allCellsCount;
    constructor(openedHoles, closedHoles, closedHolesCellsCount, openedHolesCellsCount, allCellsCount) {
        this.openedHoles = openedHoles;
        this.closedHoles = closedHoles;
        this.closedHolesCellsCount = closedHolesCellsCount;
        this.openedHolesCellsCount = openedHolesCellsCount;
        this.allCellsCount = allCellsCount;
    }
}
class HolesV2Calculator {
    calculateScore(request) {
        const originalHolesStats = this.calculateHolesStats(request.originalHoles);
        const imaginableHoles = HolesHelper_1.HolesHelper.collectHoles(request.imaginableMatrix);
        const imaginableHolesStats = this.calculateHolesStats(imaginableHoles);
        let holesScore = 0;
        if (imaginableHolesStats.allCellsCount === originalHolesStats.allCellsCount) {
            let closedToOpened = originalHolesStats.closedHolesCellsCount - imaginableHolesStats.closedHolesCellsCount;
            holesScore += closedToOpened * 10;
        }
        else if (imaginableHolesStats.allCellsCount < originalHolesStats.allCellsCount) {
            holesScore += (imaginableHolesStats.allCellsCount - originalHolesStats.allCellsCount) * 150;
        }
        else {
            const closedHolesIncrease = imaginableHolesStats.closedHolesCellsCount - originalHolesStats.closedHolesCellsCount;
            const openedHolesIncrease = imaginableHolesStats.openedHolesCellsCount - originalHolesStats.openedHolesCellsCount;
            holesScore -= Math.max(closedHolesIncrease * 70, 0)
                + Math.max(openedHolesIncrease * 60, 0);
        }
        const [imaginableOldHoles, imaginableNewHoles] = this.separateHolesToOldAndNew(request.originalHoles, imaginableHoles);
        const imaginableOldHolesStats = this.calculateHolesStats(imaginableOldHoles);
        const imaginableNewHolesStats = this.calculateHolesStats(imaginableNewHoles);
        const closedHolesSumCoveredHeightIncrease = this.calculateHolesSumCoveredHeightIncrease(request.originalCoveredColumns, originalHolesStats.closedHoles, request.imaginableCoveredColumns, imaginableOldHolesStats.closedHoles);
        if (closedHolesSumCoveredHeightIncrease !== 0 && imaginableOldHolesStats.allCellsCount !== 0) {
            holesScore -= closedHolesSumCoveredHeightIncrease
                * Math.pow(closedHolesSumCoveredHeightIncrease, closedHolesSumCoveredHeightIncrease / (request.gameData.settings.fieldHeight * imaginableOldHolesStats.allCellsCount))
                * 5;
        }
        const newClosedHolesHeight = this.calculateHolesSumCoveredHeight(request.imaginableCoveredColumns, imaginableNewHolesStats.closedHoles);
        if (newClosedHolesHeight !== 0 && imaginableNewHolesStats.allCellsCount !== 0) {
            holesScore -= closedHolesSumCoveredHeightIncrease
                * Math.pow(closedHolesSumCoveredHeightIncrease, closedHolesSumCoveredHeightIncrease / (request.gameData.settings.fieldHeight * imaginableNewHolesStats.allCellsCount))
                * 5;
        }
        return holesScore;
    }
    calculateHolesStats(holes) {
        const openedHoles = holes.filter(hole => hole.isOpened);
        const closedHoles = holes.filter(hole => !hole.isOpened);
        const openedHolesCellsCount = openedHoles.reduce((val, hole) => val + hole.cells.length, 0);
        const closedHolesCellsCount = closedHoles.reduce((val, hole) => val + hole.cells.length, 0);
        const holesCellsCount = openedHolesCellsCount + closedHolesCellsCount;
        return new HolesStats(openedHoles, closedHoles, openedHolesCellsCount, closedHolesCellsCount, holesCellsCount);
    }
    calculateHolesSumCoveredHeightIncrease(originalCoveredColumns, originalHoles, imaginableCoveredColumns, imaginableHoles) {
        if (originalHoles.length === 0) {
            return 0;
        }
        let originalHighestHole = originalHoles[0];
        let originalHighestHoleY = originalHighestHole.cells[0].y;
        originalHoles.forEach(hole => {
            let holeHighestY = Math.min(...hole.cells.map(cell => cell.y));
            if (holeHighestY < originalHighestHoleY) {
                originalHighestHoleY = holeHighestY;
                originalHighestHole = hole;
            }
        });
        const originalHighestHoleCoveredY = Math.min(...originalHighestHole.cells.map(cell => originalCoveredColumns.get(cell.x) || Infinity));
        return imaginableHoles.reduce((val, hole) => {
            return hole.cells.reduce((val, cell) => {
                return val + Math.max(originalHighestHoleCoveredY - (imaginableCoveredColumns.get(cell.x) || Infinity), 0);
            }, val);
        }, 0);
    }
    calculateHolesSumCoveredHeight(coveredColumns, holes) {
        return holes.reduce((val, hole) => {
            return hole.cells.reduce((val, cell) => {
                return val + Math.max(cell.y - (coveredColumns.get(cell.x) || Infinity), 0);
            }, val);
        }, 0);
    }
    separateHolesToOldAndNew(originalHoles, imaginableHoles) {
        let stringyCellsToHoles = new Map();
        originalHoles.forEach(hole => {
            const stringyCells = hole.cells.map(cell => `${cell.x}:${cell.y}`).sort().join(';');
            hole.cells.forEach(cell => {
                stringyCellsToHoles.set(`${cell.x}:${cell.y}`, stringyCells);
            });
        });
        let oldHoles = [];
        let newHoles = [];
        imaginableHoles.forEach(hole => {
            const stringyCells = hole.cells.map(cell => `${cell.x}:${cell.y}`).sort().join(';');
            const isOld = hole.cells.every(cell => {
                return stringyCellsToHoles.get(`${cell.x}:${cell.y}`) === stringyCells;
            });
            if (isOld) {
                oldHoles.push(hole);
            }
            else {
                newHoles.push(hole);
            }
        });
        return [oldHoles, newHoles];
    }
}
exports.HolesV2Calculator = HolesV2Calculator;
