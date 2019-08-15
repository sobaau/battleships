import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';

export class Chat extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [
                {
                    name: 'David Preston',
                    text: <p>Hello World!</p>,
                },
                {
                    name: 'Random Name',
                    text: <p>It works!</p>,
                },
                {
                    name: 'Keeev',
                    text: <p>Yay</p>,
                },
                {
                    name: 'HotDog',
                    text: <p>Test</p>,
                },
            ],
        };
    }
    public render(): JSX.Element {
        console.log(this.state);
        return (
            <div className="chatArea" id="chat">
                <ChatBox messages={this.state.messages} />
                <ChatSend sendMessage={this.sendMessage} />
            </div>
        );
    }
    private sendMessage(text: any): any {
        /*
        this.currentUser.sendMessage({
            text,
        });
        */
    }
}
