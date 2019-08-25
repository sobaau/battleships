import * as React from 'react';
import { ChatMessages } from './Chat';
import ChatMessage from './ChatMessage';

interface IChatProps {
  messages: ChatMessages[];
}
export class ChatBox extends React.Component<IChatProps, any> {
  public render(): JSX.Element {
    const messages = this.props.messages.map((message, i) => {
      return <ChatMessage key={i} username={message.username} text={message.text} me={message.me} />;
    });

    return (
      <div className="messages" id="messageList">
        {messages}
      </div>
    );
  }
  componentDidUpdate(): void {
    const chatDiv = document.getElementById('messageList');
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }
}
