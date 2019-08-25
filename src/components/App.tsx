import * as React from 'react';
import { IPlayers } from '../interface/IGameProp';
import { PlayArea } from './PlayArea';
import NaviBar from './NaviBar';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import Info from './Info';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Stats from './Stats/Stats';
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
      login: false,
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
              <Route path="/stats" exact component={Stats} />
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
          <div className="login-container">
            <PlayerDetails handleLogin={this.handleLogin} />
          </div>
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
