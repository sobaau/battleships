import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';
interface ChatState {
  messages: ChatMessages[];
}
export interface ChatMessages {
  name: string;
  text: string;
}

export class Chat extends React.Component<any, ChatState> {
  constructor(props: any) {
    super(props);
    this.state = {
      messages: [
        {
          name: 'Hue',
          text: 'Hello World!',
        },
        {
          name: 'Random Name',
          text: 'It works!',
        },
        {
          name: 'Keeev',
          text: 'Yay',
        },
        {
          name: 'HotDog',
          text: 'Test',
        },
      ],
    };
  }
  public render(): JSX.Element {
    console.log(this.state);
    return (
      <div className="chat-area" id="chat">
        <ChatBox messages={this.state.messages} />
        <ChatSend sendMessage={this.sendMessage} />
      </div>
    );
  }
  sendMessage = (text: ChatMessages): void => {
    console.log(text);
    const msg: ChatMessages[] = this.state.messages;
    msg.shift();
    msg.push(text);
    console.log(msg);
    this.setState({ messages: msg });
    /*
    this.setState(prevState => {
      const messages = { ...prevState.messages };
      messages.shift();
      messages.push(text);
      console.log(messages);
      return { messages };
    });
    */
  };
}
