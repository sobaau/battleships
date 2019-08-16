import * as React from 'react';

interface LeaderProps {}
interface TopPlayers {
    name: string;
    time: string;
}
interface LeaderState {
    topPlayers: TopPlayers[];
}

class LeaderBoard extends React.Component<LeaderProps, LeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            topPlayers: [
                {
                    name: 'Test',
                    time: '1:00',
                },
                {
                    name: 'Test2',
                    time: '1:13',
                },
                {
                    name: 'Test3',
                    time: '1:14',
                },
                {
                    name: 'Test2',
                    time: '1:15',
                },
            ],
        };
    }
    public render(): JSX.Element {
        return (
            <div className="leader-board">
                <LBoard topPlayers={this.state.topPlayers} />
            </div>
        );
    }
}

export default LeaderBoard;

const LBoard: React.FC<LeaderState> = ({ topPlayers }): JSX.Element => {
    return (
        <table className="leader-list">
            <tr>
                <td>Name</td>
                <td>Time</td>
            </tr>
            <tr>
                {topPlayers.map((message: any, index: any) => {
                    return (
                        <LeaderCell name={message.name}/>
                        <leader
                        <div key={index} className="leader-list">
                            <td>{message.name}</td>
                            <td>{message.time}</td>
                        </div>
                    );
                })}
            </tr>
        </table>
    );
};

const LeaderCell: React.FC<any> = (props: any) => {
    return <td>{props}</td>;
};