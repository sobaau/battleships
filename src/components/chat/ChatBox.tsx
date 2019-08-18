import * as React from 'react';

interface IChatProps {
  messages: [];
}
export class ChatBox extends React.Component<IChatProps, any> {
  public render(): JSX.Element {
    return (
      <ul className="message-list">
        {this.props.messages.map((message: any, index: any) => {
          return (
            <li key={index} className="message">
              <div className="message-name">{message.name}</div>
              <div className="message-text">{message.text}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
