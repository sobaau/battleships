import * as React from 'react';
import { IGameProp, IGameState, IMoveListItem, IPlayAreaProp } from '../interface/IGameProp';
import { EnemyCanvas } from './canvas/EnemyCanvas';
import { PlayerCanvas } from './canvas/PlayerCanvas';
import { StatusArea } from './StatusArea/StatusArea';
import { Chat } from './chat/Chat';

export enum GameStatus {
  Setup,
  Playing,
  GameOver,
}

export class PlayArea extends React.Component<IPlayAreaProp, IGameProp> {
  playSocket: SocketIOClient.Socket;
  loaded = true;
  test: any;
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
        EnemyShipsR: 5,
        PlayerShipsR: 5,
        SetupMessages: null,
      },
      PlayerName: this.props.player,
      getBoard: this.props.getBoard,
    };
  }
  public componentDidMount(): void {
    if (this.props.getBoard) {
      this.loaded = false;
      this.getState();
    }
    this.setUpdate();
    this.test = setInterval(() => this.setUpdate(), 5000);
  }

  public setUpdate(): void {
    if (this.props.getBoard === false && this.loaded == true) {
      this.saveState();
    }
  }
  public componentWillUnmount(): void {
    this.playSocket.emit('disconnect');
  }
  private saveState = async (): Promise<any> => {
    const obj = { roomID: this.state.roomID, PlayerName: this.props.player, state: this.state };
    const request = await fetch(`https://reactships.herokuapp.com/api/gamestate/${this.state.roomID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    const json = await request.json();
    console.log(json);
  };

  private getState = async (): Promise<any> => {
    const request = await fetch(`https://reactships.herokuapp.com/api/gamestate/${this.props.roomid}&${this.props.player}`);
    const json = await request.json();
    console.log(json.state);
    this.setState({
      GameState: json.state.GameState,
    });
    this.setState({ getBoard: false });
    this.loaded = true;
  };

  public render(): JSX.Element {
    return (
      <div className="play-area">
        <EnemyCanvas
          updateGameState={this.updateGameState}
          updateMoves={this.updateMoves}
          GameState={this.state.GameState}
          roomID={this.state.roomID}
          PlayerName={this.state.PlayerName}
          getBoard={this.state.getBoard}
        />
        <PlayerCanvas
          updateGameState={this.updateGameState}
          updateMoves={this.updateMoves}
          GameState={this.state.GameState}
          roomID={this.state.roomID}
          PlayerName={this.state.PlayerName}
          getBoard={this.state.getBoard}
        />
        <StatusArea GameState={this.state.GameState} roomID={this.props.roomid} />

        <Chat username={this.props.player} roomID={this.props.roomid} />
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
}
