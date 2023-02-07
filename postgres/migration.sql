create schema if not exists tetris_solve_load;

create table if not exists tetris_solve_load.runs (
    run_parameters text primary key,
    fallen_figures_per_runs integer[],
    first_run_at timestamptz,
    last_run_at timestamptz
);
