import * as React from 'react';
import { ChatMessages } from './Chat';

export class ChatSend extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      chatInput: '',
    };
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit} className="chat-input">
        <input
          type="text"
          onChange={this.handleText}
          id="chat-box"
          value={this.state.chatInput}
          placeholder="Write a message"
          required
        />
      </form>
    );
  }
  handleText(e): void {
    this.setState({ chatInput: e.target.value });
  }
  handleSubmit(e: any): void {
    e.preventDefault();
    this.props.onSend(this.state.chatInput);
    this.setState({chatInput: ''})
  }
}
