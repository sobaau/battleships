import * as React from 'react';

interface ComponentNameProps {}

interface ComponentNameState {
    playerName: string;
    roomID: number;
}

class PlayerDetails extends React.Component<ComponentNameProps, ComponentNameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            playerName: undefined,
            roomID: undefined,
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
                    name="player-input"
                    required
                    onChange={this.handleChange}
                    value={this.state.playerName}
                />
                <label>
                    <span id="room-id">Room ID</span>
                </label>
                <input
                    type="number"
                    className="room-input"
                    required
                    name="room"
                    onChange={this.handleChange}
                    value={this.state.roomID}
                />
                <button className="n">Submit</button>
            </form>
        );
    }
    handleSubmit = (e: any): void => {
        e.preventDefault();
        console.log('Wee');
    };
    handleChange = (e: any): void => {
        console.log(e.target);
        if (e.name === 'player-input') {
            this.setState({ playerName: e.target.value });
        }
        if (e.name === 'room') this.setState({ roomID: e.target.value });
    };
}

export default PlayerDetails;

const PlayerHeader = (): JSX.Element => {
    return <h1 id="player-h">Player Details</h1>;
};
