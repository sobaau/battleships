import * as React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import '../../styles/login.scss'
import { Navbar } from 'react-bootstrap';
interface ComponentNameProps {
  handleLogin?: any;
}

interface ComponentNameState {
  playerName: string;
  roomID: number;
}

class PlayerDetails extends React.Component<ComponentNameProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      playerName: undefined,
      roomId: undefined,
    };
  }
  public render(): JSX.Element {
    return (
      <form className="player-details" onSubmit={this.handleSubmit}>
        <Container>
          <Row>
            <Col>
              <PlayerHeader />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                <span className="player-name">Please Enter your player name</span>
              </label>
              <Row>
                <Col>
                  <input
                    type="text"
                    name="playerName"
                    required
                    onChange={this.handleChange}
                    value={this.state.playerName}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                <span id="room-id">Room ID</span>
              </label>
              <Row>
                <Col>
                  <input
                    type="text"
                    className="room-input"
                    required
                    name="roomId"
                    onChange={this.handleChange}
                    value={this.state.roomId}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </form>
    );
  }
  handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.handleLogin(true);
  };
  handleChange = (e: any): void => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default PlayerDetails;

const PlayerHeader = (): JSX.Element => {
  return <h1 id="player-h">Player Details</h1>;
};
