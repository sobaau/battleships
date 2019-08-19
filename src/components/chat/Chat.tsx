import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';
import '../../styles/chat.scss';
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
      messages: [
        {
          username: 'Hue',
          text: 'Friendly Text',
          me: true,
        },
        {
          username: 'Random Name',
          text: 'Enemy text',
          me: false,
        },
        {
          username: 'Random Name',
          text: 'Enemy text 2',
          me: false,
        },
        {
          username: 'Random Name',
          text: 'Enemy text 3',
          me: false,
        },
      ],
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
    console.log(message);
    const Message = {
      username: 'Hue', //this.props.username,
      text: message,
      me: true,
    };
    //this.socket.emit(‘client:message’, Message);
    Message.me = true;
    this.addMessage(Message);
  };
  addMessage = (message: any): void => {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  };
}
