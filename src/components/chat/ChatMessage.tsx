import * as React from 'react';

export interface ChatMessageProps {
  username: string;
  text: string;
  me: boolean;
}

export default class ChatMessage extends React.Component<ChatMessageProps, any> {
  public render(): JSX.Element {
    const sender = this.props.me ? 'player-message' : 'enemy';
    return (
      <div className={sender}>
        <div className="username">{this.props.username}</div>
        <div className="message-body">{this.props.text}</div>
      </div>
    );
  }
}
