import * as React from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/login.scss';
import { PlayerHeader } from './PlayerHeader';
interface PlayerDetailsProps {
  handleLogin?: any;
  player?: any;
  room?: any;
}

interface PlayerDetailsState {
  playerName: string;
  roomID: string;
}

class PlayerDetails extends React.Component<PlayerDetailsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      playerName: '',
      roomID: '',
    };
  }
  public render(): JSX.Element {
    return (
      <form className="player-details" onSubmit={this.handleSubmit}>
        <PlayerHeader />

        <label>
          <span className="player-name">Please Enter your Player Name</span>
        </label>

        <input type="text" name="playerName" required onChange={this.handleChange} value={this.state.playerName} />

        <label>
          <span className="room-id">Room ID</span> {/** Room ID used to connect to other players*/}
        </label>
        <input
          type="text"
          className="room-input"
          name="roomID"
          onChange={this.handleChange}
          value={this.state.roomID}
        />

        <Button variant="outline-success" type="submit">
          Submit
        </Button>
      </form>
    );
  }

  private handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.player(this.state.playerName);
    this.props.room(this.state.roomID);
    this.props.handleLogin(true);
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default PlayerDetails;
