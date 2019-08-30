import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';
import '../../styles/chat.scss';
import * as chatHistory from './history.json';

interface ChatState {
  messages: ChatMessages[];
  username: string;
}

export interface ChatMessages {
  username: string;
  text: string;
  me: boolean;
}

export class Chat extends React.Component<any, ChatState> {
  constructor(props: any) {
    super(props);
    this.state = {
      messages: chatHistory.messages,
      username: props.username,
    };
    //IO Socket listener here for chat messages from the server
  }

  public render(): JSX.Element {
    return (
      <div className="chat-area" id="chat">
        <span className="chat-title">Chat</span>
        <ChatBox messages={this.state.messages} />
        <ChatSend onSend={this.sendMessage} />
      </div>
    );
  }

  private sendMessage = (message: any): void => {
    const Message = {
      username: this.state.username,
      text: message,
      me: true,
    };
    //Send message to IO Server.
    // temp demo message
    const TempMessage = {
      username: 'Random Name',
      text: 'Random message back',
      me: false,
    };
    this.updateMessages(Message);
    this.updateMessages(TempMessage);
  };

  private updateMessages = (message: any): void => {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  };
}
