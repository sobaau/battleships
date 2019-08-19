import * as React from 'react';
import { IPlayers } from '../interface/IGameProp';
import { PlayArea } from './PlayArea';
import NaviBar from './NaviBar';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import Info from './Info';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
interface AppState {
  login: boolean;
}
export default class App extends React.Component<any, AppState> {
  private players: IPlayers = {
    PlayerName: 'Player',
    EnemyName: 'Enemy',
  };
  constructor(props: any) {
    super(props);
    this.state = {
      login: true,
    };
  }
  public render(): JSX.Element {
    if (this.state.login) {
      return (
        <Router>
          <div>
            <NaviBar />
            <Switch>
              <Route path="/" exact render={routeProps => <PlayArea {...routeProps} Players={this.players} />} />
              <Route path="/info" exact component={Info} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <div>
          <Navbar variant="dark" expand="lg">
          <Navbar.Brand>ReactShips</Navbar.Brand>
          </Navbar>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <PlayerDetails handleLogin={this.handleLogin} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
  private getDetails(name: string): any {
    this.players.PlayerName = name;
  }
  private getEnemyDetails(name: string): any {
    this.players.EnemyName = name;
  }
  handleLogin = (b: boolean): void => {
    this.setState({ login: b });
  };
}