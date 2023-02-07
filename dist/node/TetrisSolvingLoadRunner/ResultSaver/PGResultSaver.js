"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGResultSaver = void 0;
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PGResultSaver {
    connectAttempts;
    queryAttempts;
    closeConnectionAttempts;
    retryDelayMs;
    constructor(connectAttempts = 10, queryAttempts = 10, closeConnectionAttempts = 10, retryDelayMs = 100) {
        this.connectAttempts = connectAttempts;
        this.queryAttempts = queryAttempts;
        this.closeConnectionAttempts = closeConnectionAttempts;
        this.retryDelayMs = retryDelayMs;
    }
    async save(run) {
        const connection = new pg_1.Client({
            ssl: {
                ca: fs_1.default.readFileSync(path_1.default.resolve(process.env.PG_SSL_CA_PATH || ".postgresql/root.crt")).toString(),
            }
        });
        await this.attempt(this.connectAttempts, this.retryDelayMs, () => connection.connect());
        await this.attempt(this.queryAttempts, this.retryDelayMs, () => connection.query(`
                insert into tetris_solve_load.runs as r 
                    (run_parameters, fallen_figures_per_runs, first_run_at, last_run_at)
                values ($1, $2, $3, $3)
                on conflict (run_parameters) do update
                    set fallen_figures_per_runs = r.fallen_figures_per_runs || excluded.fallen_figures_per_runs,
                        last_run_at = $3;
                `, [
            run.parameters.toTuple().join(','),
            run.result.figuresFallenPerRuns,
            run.date,
        ]));
        await this.attempt(this.connectAttempts, this.retryDelayMs, () => connection.end());
    }
    async attempt(attempts, delay, callback) {
        let last_error;
        for (let i = 0; i < attempts; i++) {
            try {
                return await callback();
            }
            catch (e) {
                last_error = e;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        throw last_error;
    }
}
exports.PGResultSaver = PGResultSaver;
