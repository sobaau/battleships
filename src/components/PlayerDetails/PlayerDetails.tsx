import * as React from 'react';
import { Button } from 'react-bootstrap';
interface ComponentNameProps {}

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
                <PlayerHeader />
                <label>
                    <span className="player-name">Please Enter your player name</span>
                </label>
                <input
                    type="text"
                    name="playerName"
                    required
                    onChange={this.handleChange}
                    value={this.state.playerName}
                />
                <label>
                    <span id="room-id">Room ID</span>
                </label>
                <input
                    type="text"
                    className="room-input"
                    required
                    name="roomId"
                    onChange={this.handleChange}
                    value={this.state.roomId}
                />
                <Button variant="outline-success" type="submit">
                    Submit
                </Button>
            </form>
        );
    }
    handleSubmit = (e: any): void => {
        e.preventDefault();
        console.log('Wee');
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
