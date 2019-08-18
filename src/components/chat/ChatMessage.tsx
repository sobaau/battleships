import * as React from 'react';
import { jsxAttribute, jsxClosingFragment } from '@babel/types';

export interface IChatMessageProps {}

export default class ChatMessage extends React.Component<any, any> {
  public render(): JSX.Element {
    const fromMe = this.props.fromMe ? 'from-me' : 'enemy';
    console.log(this.props)
    return (
      <div className={fromMe}>
        <div className="username">{this.props.username}</div>
        <div className="message-body">{this.props.text}</div>
      </div>
    );
  }
}
