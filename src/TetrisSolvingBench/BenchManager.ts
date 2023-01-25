import {WorkerPool} from "workerpool";
import {GameData} from "../Tetris/Common";

export class BenchManager {
    private readonly iterations = 1000;
    private readonly valuablePercentiles = [0, 50, 95, 99, 99.9];
    private resolveWorkersPoolFreed: (value: unknown) => void = () => {};

    constructor(
        private pool: WorkerPool,
    ) {}

    public async startBench() {
        // todo iterate all variations instead
        for (let i = 0; i < 3; i++) {
            this.iterate().then(result => {
                // todo save the result to file instead
                console.log(i, result);
            });
            // todo render cli progress bar
            await this.waitWorkersPoolToFree();
        }
    }

    private async iterate(): Promise<Map<number, number>> {
        let promises: Promise<number>[] = [];
        for (let i = 0; i < this.iterations; i++) {
            promises.push(new Promise(resolve => {
                this.pool.exec('solveTetris', [])
                    .then((result: GameData) => {
                        this.checkWorkersPoolIfFree();
                        resolve(result.stats.figuresFallen);
                    });
            }));
        }
        const results = await Promise.all(promises);
        results.sort((a,b) => b - a);
        let percentileValues: Map<number, number> = new Map();
        this.valuablePercentiles.forEach(percentile => {
            percentileValues.set(percentile, results[Math.floor(this.iterations / 100 * percentile)]);
        });
        return percentileValues;
    }

    private async waitWorkersPoolToFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
            return;
        }
        await new Promise(resolve => {
            this.resolveWorkersPoolFreed = resolve;
        });
    }

    private checkWorkersPoolIfFree() {
        if (this.pool.stats().pendingTasks < this.iterations) {
            this.resolveWorkersPoolFreed(true);
        }
    }
}
