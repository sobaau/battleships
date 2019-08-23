import * as React from 'react';
import { IGameProp } from '../../interface/IGameProp';
import '../../styles/status.scss';
import StatusBox from './StatusBox';
import { StatusTurn } from './StatusTurn';

export class StatusArea extends React.Component<IGameProp, IGameProp> {
  public render(): JSX.Element {
    if (this.props.GameState.GameStatus === 0) {
      return (
        <div className="status-area">
          <div>Currently Placing: {this.props.GameState.CurrentShip}</div>
          <div>{this.props.GameState.SetupMessages}</div>
        </div>
      );
    } else {
      return (
        <div className="status-area playing">
          <StatusTurn currentTurn={this.props.GameState.CurrentTurn} />
          <StatusBox messages={this.props.GameState.Moves} />
        </div>
      );
    }
  }
}
