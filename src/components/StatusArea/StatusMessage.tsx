import * as React from 'react';

export interface IAppProps {}

export interface IAppState {}

export default class StatusMessage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <div className="status-name">{this.props.player}</div>
        <div className="status-msg">{this.props.move}</div>
      </div>
    );
  }
}
