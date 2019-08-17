import * as React from 'react';

import { IPlayers } from '../interface/IGameProp';
import { Chat } from './chat/Chat';
import { PlayArea } from './PlayArea';
import NaviBar from './NaviBar';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import Info from './Info';
import { Container, Row, Col } from 'react-bootstrap';

export default class App extends React.Component<any> {
    private players: IPlayers = {
        PlayerName: 'Player',
        EnemyName: 'Enemy',
    };
    public render(): JSX.Element {
        return (
            <div>
                <NaviBar />
                <Container fluid={true}>
                    <PlayerDetails />
                    <Row>
                        <Col>
                            <PlayArea Players={this.players} />
                        </Col>
                    </Row>
                    <Row>
                        <Chat />
                    </Row>
                    <LeaderBoard />
                    <Info />
                </Container>
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
