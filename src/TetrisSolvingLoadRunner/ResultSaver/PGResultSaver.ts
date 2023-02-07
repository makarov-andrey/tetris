import {ResultSaverInterface} from "./ResultSaverInterface";
import {RunInfo} from "../Common";
import {Client} from 'pg';
import fs from "fs";
import path from "path";

export class PGResultSaver implements ResultSaverInterface {
    constructor(
        private connectAttempts = 10,
        private queryAttempts = 10,
        private closeConnectionAttempts = 10,
        private retryDelayMs = 100,
    ) {}

    async save(run: RunInfo): Promise<void> {
        const connection = new Client({
            ssl: {
                ca: fs.readFileSync(path.resolve(process.env.PG_SSL_CA_PATH || ".postgresql/root.crt")).toString(),
            }
        });
        await this.attempt(this.connectAttempts, this.retryDelayMs, () => connection.connect());
        await this.attempt(this.queryAttempts, this.retryDelayMs, () => connection.query(
            `
                insert into tetris_solve_load.runs as r 
                    (run_parameters, fallen_figures_per_runs, first_run_at, last_run_at)
                values ($1, $2, $3, $3)
                on conflict (run_parameters) do update
                    set fallen_figures_per_runs = r.fallen_figures_per_runs || excluded.fallen_figures_per_runs,
                        last_run_at = $3;
                `,
            [
                run.parameters.toTuple().join(','),
                run.result.figuresFallenPerRuns,
                run.date,
            ],
        ));
        await this.attempt(this.connectAttempts, this.retryDelayMs, () => connection.end())
    }

    async attempt<T>(attempts: number, delay: number, callback: () => Promise<T>): Promise<T> {
        let last_error: any;
        for (let i = 0; i < attempts; i++) {
            try {
                return await callback();
            } catch (e) {
                last_error = e;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        throw last_error;
    }
}
