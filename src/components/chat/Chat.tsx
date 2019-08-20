import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';
import '../../styles/chat.scss';
import * as chatHistory from './history.json';
interface ChatState {
  messages: ChatMessages[];
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
    };
  }
  public render(): JSX.Element {
    return (
      <div className="chat-area" id="chat">
        <span className="chat-title">Chat</span>
        <ChatBox messages={this.state.messages} />
        <ChatSend onSend={this.sendHandler} />
      </div>
    );
  }
  sendHandler = (message: any): void => {
    const Message = {
      username: 'Player', //this.props.username,
      text: message,
      me: true,
    };
    const TempMessage = {
      username: 'Random Name', //this.props.username,
      text: 'Random message back',
      me: false,
    };
    //send over socket
    this.addMessage(Message);
    this.addMessage(TempMessage);
  };
  addMessage = (message: any): void => {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  };
}
