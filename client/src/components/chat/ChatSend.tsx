import * as React from 'react';

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
          placeholder="Type a message and press enter..."
          required
        />
      </form>
    );
  }
  handleText(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ chatInput: e.target.value });
  }
  handleSubmit(e: any): void {
    e.preventDefault();
    this.props.onSend(this.state.chatInput, this.props.username);
    this.setState({ chatInput: '' });
  }
}
