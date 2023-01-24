import {CalculateScoreRequest, ScoreCalculatorInterface} from "../ScoreCalculatorInterface";
import {Hole} from "../../Common";
import {HolesHelper} from "../../Utils/HolesHelper";

class HolesStats {
    constructor(
        public openedHoles: Hole[],
        public closedHoles: Hole[],
        public closedHolesCellsCount: number,
        public openedHolesCellsCount: number,
        public allCellsCount: number,
    ) {}
}

export class HolesV2Calculator implements ScoreCalculatorInterface {
    calculateScore(request: CalculateScoreRequest): number {
        const originalHolesStats = this.calculateHolesStats(request.originalHoles);

        const imaginableHoles = HolesHelper.collectHoles(request.imaginableMatrix);
        const imaginableHolesStats = this.calculateHolesStats(imaginableHoles);

        let holesScore = 0;
        if (imaginableHolesStats.allCellsCount === originalHolesStats.allCellsCount) {
            let closedToOpened = originalHolesStats.closedHolesCellsCount - imaginableHolesStats.closedHolesCellsCount;
            holesScore += closedToOpened * 10;
        } else if (imaginableHolesStats.allCellsCount < originalHolesStats.allCellsCount) {
            holesScore += (imaginableHolesStats.allCellsCount - originalHolesStats.allCellsCount) * 150;
        } else {
            const closedHolesIncrease = imaginableHolesStats.closedHolesCellsCount - originalHolesStats.closedHolesCellsCount;
            const openedHolesIncrease = imaginableHolesStats.openedHolesCellsCount - originalHolesStats.openedHolesCellsCount;
            holesScore -= Math.max(closedHolesIncrease * 70, 0)
                + Math.max(openedHolesIncrease * 60, 0);
        }

        const [imaginableOldHoles, imaginableNewHoles] = this.separateHolesToOldAndNew(
            request.originalHoles,
            imaginableHoles
        );
        const imaginableOldHolesStats = this.calculateHolesStats(imaginableOldHoles);
        const imaginableNewHolesStats = this.calculateHolesStats(imaginableNewHoles);

        const closedHolesSumCoveredHeightIncrease = this.calculateHolesSumCoveredHeightIncrease(
            request.originalCoveredColumns,
            originalHolesStats.closedHoles,
            request.imaginableCoveredColumns,
            imaginableOldHolesStats.closedHoles
        );

        if (closedHolesSumCoveredHeightIncrease !== 0 && imaginableOldHolesStats.allCellsCount !== 0) {
            holesScore -= closedHolesSumCoveredHeightIncrease
                * Math.pow(
                    closedHolesSumCoveredHeightIncrease,
                    closedHolesSumCoveredHeightIncrease / (request.gameData.settings.fieldHeight * imaginableOldHolesStats.allCellsCount)
                )
                * 5;
        }

        const newClosedHolesHeight = this.calculateHolesSumCoveredHeight(request.imaginableCoveredColumns, imaginableNewHolesStats.closedHoles);
        if (newClosedHolesHeight !== 0 && imaginableNewHolesStats.allCellsCount !== 0) {
            holesScore -= closedHolesSumCoveredHeightIncrease
                * Math.pow(
                    closedHolesSumCoveredHeightIncrease,
                    closedHolesSumCoveredHeightIncrease / (request.gameData.settings.fieldHeight * imaginableNewHolesStats.allCellsCount)
                )
                * 5;
        }

        return holesScore;
    }

    private calculateHolesStats(holes: Hole[]): HolesStats {
        const openedHoles = holes.filter(hole => hole.isOpened);
        const closedHoles = holes.filter(hole => !hole.isOpened);
        const openedHolesCellsCount = openedHoles.reduce((val, hole) => val + hole.cells.length, 0);
        const closedHolesCellsCount = closedHoles.reduce((val, hole) => val + hole.cells.length, 0);
        const holesCellsCount = openedHolesCellsCount + closedHolesCellsCount;
        return new HolesStats(openedHoles, closedHoles, openedHolesCellsCount, closedHolesCellsCount, holesCellsCount);
    }

    private calculateHolesSumCoveredHeightIncrease(originalCoveredColumns: Map<number, number>, originalHoles: Hole[], imaginableCoveredColumns: Map<number, number>, imaginableHoles: Hole[]): number {
        if (originalHoles.length === 0) {
            return 0;
        }
        let originalHighestHole: Hole = originalHoles[0];
        let originalHighestHoleY: number = originalHighestHole.cells[0].y;
        originalHoles.forEach(hole => {
            let holeHighestY = Math.min(...hole.cells.map(cell => cell.y));
            if (holeHighestY < originalHighestHoleY) {
                originalHighestHoleY = holeHighestY;
                originalHighestHole = hole;
            }
        });
        const originalHighestHoleCoveredY: number = Math.min(...originalHighestHole.cells.map(cell => originalCoveredColumns.get(cell.x) || Infinity));
        return imaginableHoles.reduce((val, hole) => {
            return hole.cells.reduce((val, cell) => {
                return val + Math.max(originalHighestHoleCoveredY - (imaginableCoveredColumns.get(cell.x) || Infinity), 0);
            }, val);
        }, 0);
    }

    private calculateHolesSumCoveredHeight(coveredColumns: Map<number, number>, holes: Hole[]): number {
        return holes.reduce((val, hole) => {
            return hole.cells.reduce((val, cell) => {
                return val + Math.max(cell.y - (coveredColumns.get(cell.x) || Infinity), 0);
            }, val);
        }, 0);
    }

    private separateHolesToOldAndNew(originalHoles: Hole[], imaginableHoles: Hole[]): [Hole[], Hole[]] {
        let stringyCellsToHoles: Map<string, string> = new Map();
        originalHoles.forEach(hole => {
            const stringyCells = hole.cells.map(cell => `${cell.x}:${cell.y}`).sort().join(';');
            hole.cells.forEach(cell => {
                stringyCellsToHoles.set(`${cell.x}:${cell.y}`, stringyCells);
            });
        });
        let oldHoles: Hole[] = [];
        let newHoles: Hole[] = [];
        imaginableHoles.forEach(hole => {
            const stringyCells = hole.cells.map(cell => `${cell.x}:${cell.y}`).sort().join(';');
            const isOld = hole.cells.every(cell => {
                return stringyCellsToHoles.get(`${cell.x}:${cell.y}`) === stringyCells;
            });
            if (isOld) {
                oldHoles.push(hole);
            } else {
                newHoles.push(hole);
            }
        });
        return [oldHoles, newHoles];
    }
}
