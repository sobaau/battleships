
export interface IGameProp {
    GameState: {
        CurrentShip: string,
        CurrentTurn: string,
        LastMove: string,
        GameStatus: number,
        ResP: boolean,
        ResE: boolean,
    };
}
export interface ICanvas extends IGameProp {
    update?: any;
}
