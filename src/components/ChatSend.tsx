import * as React from "react";

export class ChatSend extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            message: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public handleChange(e: any) {
        this.setState({
            message: e.target.value,
        });
    }
    public handleSubmit(e: any) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: "",
        });
    }
    public render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-box">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        );
    }
}
