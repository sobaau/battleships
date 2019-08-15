import * as React from 'react';

import { IPlayers } from '../interface/IGameProp';
import { Chat } from './chat/Chat';
import { PlayArea } from './PlayArea';
import Nav from './Nav';
import PlayerDetails from './PlayerDetails/PlayerDetails';
export default class App extends React.Component<any> {
    private players: IPlayers = {
        PlayerName: 'Player',
        EnemyName: 'Enemy',
    };
    public render(): JSX.Element {
        return (
            <div className="container">
                <Nav />
                <PlayerDetails />
                <Chat />
            </div>
        );
    }
    private getDetails(name: string): any {
        this.players.PlayerName = name;
    }
    private getEnemyDetails(name: string): any {
        this.players.EnemyName = name;
    }
}
//<PlayArea Players={this.players}/>
