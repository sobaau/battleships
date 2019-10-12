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
  disableButton: boolean;
  newGame: boolean;
}

class PlayerDetails extends React.Component<PlayerDetailsProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      playerName: '',
      roomID: '',
      disableButton: false,
    };
  }
  public render(): JSX.Element {
    return (
      <form className="player-details">
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
        <Button variant="outline-success" type="submit" name="New" onClick={this.handleSubmit}>
          New / Join Game
        </Button>
        <Button variant="outline-success" type="submit" name="Load" onClick={this.handleLoad}>
          Load Game
        </Button>
      </form>
    );
  }

  private handleLoad = (e: any): void => {
    e.preventDefault();
    if (this.state.disableButton) {
      return;
    }
    this.props.player(this.state.playerName);
    if (this.state.roomID !== '') {
      this.props.room(this.state.roomID);
      this.props.handleLogin(true, true);
    }
    this.setState({ disableButton: true });
  };

  private handleSubmit = (e: any): void => {
    e.preventDefault();
    if (this.state.disableButton) {
      return;
    }
    this.props.player(this.state.playerName);
    if (this.state.roomID !== '') {
      this.props.room(this.state.roomID);
      this.props.handleLogin(true, false);
    } else {
      this.setRoom();
    }
    this.setState({ disableButton: true });
  };

  private setRoom = async (): Promise<any> => {
    const gameID = await fetch('https://reactships.herokuapp.com/api/gameID');
    const json = await gameID.json();
    this.setState({ roomID: json.id });
    this.props.room(this.state.roomID);
    this.props.handleLogin(true, false);
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default PlayerDetails;
