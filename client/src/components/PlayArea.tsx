import * as React from 'react';
import { IGameProp, IGameState, IMoveListItem, IPlayAreaProp } from '../interface/IGameProp';
import { EnemyCanvas } from './canvas/EnemyCanvas';
import { PlayerCanvas } from './canvas/PlayerCanvas';
import { StatusArea } from './StatusArea/StatusArea';
import { Chat } from './chat/Chat';
import io from 'socket.io-client';

export enum GameStatus {
  Setup,
  Playing,
  GameOver,
}

export class PlayArea extends React.Component<IPlayAreaProp, IGameProp> {
  playSocket: SocketIOClient.Socket;
  constructor(props: any) {
    super(props);
    this.state = {
      roomID: this.props.roomid,
      GameState: {
        CurrentShip: null,
        CurrentTurn: null,
        Moves: [],
        GameStatus: GameStatus.Setup,
        Winner: null,
        PlayerName: this.props.player,
        EnemyName: this.props.enemy,
        EnemyShipsR: 5,
        PlayerShipsR: 5,
        SetupMessages: null,
      },
    };
  }

  public componentDidMount(): any {
    console.log('Mount');
    this.playSocket = io('localhost:5005/play');
    this.playSocket.emit('join', this.state.roomID);
    this.playSocket.on('gameMessage', (statea: any) => {
      console.log('Socket stuff');
      console.log(statea);
    });
  }

  public componentWillUnmount(): void {
    this.playSocket.emit('disconnect');
  }

  public render(): JSX.Element {
    let button;
    if (this.state.GameState.GameStatus === 1) {
      button = (
        <button className="btn btn-primary" id="Reset" disabled={false} onClick={this.readyAction}>
          Ready
        </button>
      );
    } else {
      button = (
        <button className="btn btn-primary" id="Reset" disabled={false} onClick={this.readyAction}>
          Ready
        </button>
      );
    }
    return (
      <div className="play-area">
        <EnemyCanvas
          updateGameState={this.updateGameState}
          updateMoves={this.updateMoves}
          GameState={this.state.GameState}
          roomID={this.state.roomID}
          socket={this.playSocket}
        />
        <PlayerCanvas
          updateGameState={this.updateGameState}
          updateMoves={this.updateMoves}
          GameState={this.state.GameState}
          roomID={this.state.roomID}
          socket={this.playSocket}
        />
        <StatusArea GameState={this.state.GameState} roomID={this.props.roomid} />

        <div className="reset">{button}</div>

        <Chat
          username={this.state.GameState.PlayerName}
          roomID={this.props.roomid}
          enemyName={this.state.GameState.EnemyName}
        />
      </div>
    );
  }

  /**
   * Updates the Game State with the provided data.
   *
   * @private
   * @memberof PlayArea
   */
  private updateGameState = (dataFromChild: IGameState): void => {
    this.setState((prevState: any) => {
      let GameState: IGameState = { ...prevState.GameState };
      GameState = dataFromChild;
      return { GameState };
    });
  };

  /**
   * Updates the move list for the players
   *
   * @private
   * @memberof PlayArea
   */
  private updateMoves = (moveUpdate: IMoveListItem): void => {
    this.setState((prevState: any) => {
      const GameState: IGameState = { ...prevState.GameState };
      GameState.Moves.push(moveUpdate);
      return { GameState };
    });
  };

  /**
   * Flags the game to restart for the two player canvas's and then resets the
   * state of the game.
   *
   * @private
   * @memberof PlayArea
   */
  private restartGame = (): void => {
    this.setState((prevState: any) => {
      const GameState: IGameState = { ...prevState.GameState };
      GameState.CurrentShip = null;
      GameState.CurrentTurn = null;
      GameState.Moves = [];
      GameState.GameStatus = GameStatus.Setup;
      GameState.Winner = null;
      GameState.EnemyShipsR = 5;
      GameState.PlayerShipsR = 5;
      return { GameState };
    });
  };
  private readyAction = (): void => {
    //console.log(JSON.stringify(this.state));
    this.playSocket.emit('gameStep', this.state);
  };

  /**
   * Load the game state from the server if this is a brand new game.
   * #TODO:
   *
   * @private
   * @memberof PlayArea
   */
  private loadGame = (): void => {};
}
