import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';
import '../../styles/chat.scss';
import io from 'socket.io-client';

interface ChatState {
  username: string;
}

export interface ChatMessages {
  username: string;
  text: string;
  me: boolean;
}

export class Chat extends React.Component<any, any> {
  socket: SocketIOClient.Socket;
  constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
      username: props.username,
    };
  }
  public componentDidMount(): void {
    this.socket = io('localhost:5005');
    this.socket.emit('join', this.props.username, this.props.roomID);
    this.socket.on('message', (message: any, user: any) => {
      this.updateMessages(message, user);
    });
  }
  public componentWillUnmount(): void {
    this.socket.emit('disconnect');
  }

  public render(): JSX.Element {
    return (
      <div className="chat-area" id="chat">
        <span className="chat-title">Chat</span>
        <ChatBox messages={this.state.messages} />
        <ChatSend onSend={this.sendMessage} username={this.props.username} />
      </div>
    );
  }

  private sendMessage = (message: any, user: any): void => {
    this.socket.emit('sendMessage', message, this.props.roomID, this.props.username);
  };

  private updateMessages = (message: any, user: any): void => {
    let meCheck = false;
    const messages = this.state.messages;
    if (user === this.props.username) {
      meCheck = true;
    }
    const TempMessage = {
      username: user,
      text: message,
      me: meCheck,
    };
    messages.push(TempMessage);
    this.setState({ messages });
  };
}
