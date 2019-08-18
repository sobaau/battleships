import * as React from 'react';
import { timingSafeEqual } from 'crypto';
import { ChatMessages } from './Chat';

export class ChatSend extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public handleChange(e: any): void {
    this.setState({
      message: e.target.value,
    });
  }
  public handleSubmit(e: any): void {
    e.preventDefault();
    const msg: ChatMessages = {
      name: 'Hue',
      text: this.state.message,
    };
    this.props.sendMessage(msg);
    this.setState({
      message: '',
    });
  }
  public render(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit} className="send-box">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}
