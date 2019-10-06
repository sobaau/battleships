export interface IMoveListItem {
  Player: string;
  Move: string;
}
export interface IGameState {
  CurrentShip: string;
  CurrentTurn: string;
  Moves: IMoveListItem[];
  GameStatus: number;
  PlayerName: string;
  EnemyName: string;
  Winner: string;
  EnemyShipsR: number;
  PlayerShipsR: number;
  SetupMessages: string;
}
export interface IGameProp {
  roomID: string;
  GameState: IGameState;
}
export interface ICanvas extends IGameProp {
  updateGameState?: any;
  updateMoves?: any;
  socket: SocketIOClient.Socket;
}

export interface IPlayAreaProp {
  player: string;
  enemy: string;
  roomid: string;
}

export interface IPlayers {
  PlayerName: string;
  EnemyName: string;
}
