import * as React from 'react';
import { ChatBox } from './ChatBox';
import { ChatSend } from './ChatSend';
import { Container, Row , Col} from 'react-bootstrap';

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
      <div className="chat-area" id="chat">
        <Container>
          <Row>
            <Col>
              <ChatBox messages={this.state.messages} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ChatSend sendMessage={this.sendMessage} />
            </Col>
          </Row>
        </Container>
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
