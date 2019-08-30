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
  constructor(props: any) {
    super(props);
    this.state = {
      GameState: {
        CurrentShip: null,
        CurrentTurn: null,
        Moves: [],
        GameStatus: GameStatus.Setup,
        ResE: false,
        ResP: false,
        Winner: null,
        PlayerName: this.props.player,
        EnemyName: this.props.enemy,
        EnemyShipsR: 5,
        PlayerShipsR: 5,
        SetupMessages: null,
      },
    };
  }

  public render(): JSX.Element {
    return (
      <div className="play-area">
        <EnemyCanvas
          updateGameState={this.updateGameState}
          updateMoves={this.updateMoves}
          GameState={this.state.GameState}
        />
        <PlayerCanvas
          updateGameState={this.updateGameState}
          updateMoves={this.updateMoves}
          GameState={this.state.GameState}
        />

        <StatusArea GameState={this.state.GameState} />
        <div className="reset">
          <button className="btn btn-primary" id="Reset" onClick={this.restartGame}>
            Reset
          </button>
        </div>

        <Chat username={this.state.GameState.PlayerName} />
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
      GameState.ResE = false;
      GameState.ResP = false;
      GameState.Winner = null;
      GameState.EnemyShipsR = 5;
      GameState.PlayerShipsR = 5;
      GameState.ResE = true;
      GameState.ResP = true;
      return { GameState };
    });
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
