export interface IMoveListItem {
    Player: string;
    Move: string;
}
export interface IGameState {
    CurrentShip: string;
    CurrentTurn: string;
    Moves: IMoveListItem[];
    GameStatus: number;
    ResP: boolean;
    ResE: boolean;
    PlayerName: string;
    EnemyName: string;
    Winner: string;
    EnemyShipsR: number;
    PlayerShipsR: number;
    SetupMessages: string;
}
export interface IGameProp {
    GameState: IGameState;
}
export interface ICanvas extends IGameProp {
    updateGameState?: any;
    updateMoves?: any;
}

export interface IPlayAreaProp {
    Players: IPlayers;
}

export interface IPlayers {
    PlayerName: string;
    EnemyName: string;
}
