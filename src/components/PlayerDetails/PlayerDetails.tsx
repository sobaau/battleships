import * as React from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/login.scss';
import { PlayerHeader } from './PlayerHeader';
interface PlayerDetailsProps {
  handleLogin?: any;
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
          <span className="player-name">Please Enter your player name</span>
        </label>

        <input type="text" name="playerName" required onChange={this.handleChange} value={this.state.playerName} />

        <label>
          <span id="room-id">Room ID</span>
        </label>
        <input
          type="text"
          className="room-input"
          required
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

  handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.handleLogin(true);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default PlayerDetails;
