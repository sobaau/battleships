import * as React from 'react';

export interface IChatMessageProps {
  username: string;
  text: string;
  me: boolean;
}

export default class ChatMessage extends React.Component<any, any> {
  public render(): JSX.Element {
    const fromMe = this.props.me ? 'from-me' : 'enemy';
    return (
      <div className={fromMe}>
        <div className="username">{this.props.username}</div>
        <div className="message-body">{this.props.text}</div>
      </div>
    );
  }
}
