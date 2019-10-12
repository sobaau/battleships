export interface IMoveListItem {
  Player: string;
  Move: string;
}
export interface IGameState {
  CurrentShip: string;
  CurrentTurn: string;
  Moves: IMoveListItem[];
  GameStatus: number;
  Winner: string;
  EnemyShipsR: number;
  PlayerShipsR: number;
  SetupMessages: string;
}
export interface IGameProp {
  roomID: string;
  GameState: IGameState;
  PlayerName: string;
  getBoard: boolean;
}
export interface ICanvas extends IGameProp {
  updateGameState?: any;
  updateMoves?: any;
  PlayerName: string;
  getBoard: boolean;
}

export interface IPlayAreaProp {
  player: string;
  enemy: string;
  roomid: string;
  getBoard: boolean;
}

export interface IPlayers {
  PlayerName: string;
  EnemyName: string;
}
