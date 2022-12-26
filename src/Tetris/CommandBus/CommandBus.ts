import {GameData} from "../GameData";

export enum CommandType {
    InitGame,
    ResumeGame,
    PauseGame,
    FiguresFallTick,
    GameOver,
    Render,
    MoveLeft,
    MoveRight,
    TurnClockwise,
    MoveDown,
    FiguresFallDown,
}

export interface Command {
    gameData: GameData;

    getCommandType(): CommandType;
}

export class InitGameCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.InitGame;
    }
}

export class ResumeGameCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.ResumeGame;
    }
}

export class PauseGameCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.PauseGame;
    }
}

export class FiguresFallTickCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.FiguresFallTick;
    }
}

export class GameOverCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.GameOver;
    }
}

export class RenderCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.Render;
    }
}

export class MoveLeftCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.MoveLeft;
    }
}

export class MoveRightCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.MoveRight;
    }
}

export class TurnClockwiseCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.TurnClockwise;
    }
}

export class MoveDownCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.MoveDown;
    }
}

export class FiguresFallDownCommand implements Command {
    constructor(
        public gameData: GameData,
    ) {}

    public getCommandType(): CommandType {
        return CommandType.FiguresFallDown;
    }
}

export class CommandBus {
    private handlers: Map<CommandType, ((payload: Command) => void)[]> = new Map();

    public addHandler(event: CommandType, handler: (..._: any) => void, unique: boolean = true): void {
        let handlers = this.handlers.get(event) || [];
        if (unique && handlers.some(boundHandler => boundHandler === handler)) {
            return;
        }
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }

    public removeHandler(event: CommandType, handler: (..._: any) => void): void {
        let handlers = this.handlers.get(event) || [];
        let index = handlers.indexOf(handler);
        if (index > 0) {
            handlers.splice(index, 1)
        }
        this.handlers.set(event, handlers);
    }

    public run(payload: Command): void {
        let handlers = this.handlers.get(payload.getCommandType()) || [];
        handlers.forEach(handler => {handler(payload)});
    }
}
