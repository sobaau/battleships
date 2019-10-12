import * as React from 'react';
import { PlayArea } from './PlayArea';
import NaviBar from './NaviBar';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import Info from './Info/Info';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Stats from './Stats/Stats';

interface AppState {
  login: boolean;
  playerName?: string;
  roomID?: string;
  enemyName?: string;
  getBoard?: boolean;
  loadGame?: boolean;
}

export default class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: false,
      playerName: 'Player',
      enemyName: 'No Enemy Ready',
    };
  }

  public render(): JSX.Element {
    if (this.state.login) {
      return (
        <Router>
          <div>
            <NaviBar roomid={this.state.roomID} />
            <Switch>
              <Route
                path="/"
                exact
                render={(routeProps): any => (
                  <PlayArea
                    {...routeProps}
                    player={this.state.playerName}
                    enemy={this.state.enemyName}
                    roomid={this.state.roomID}
                    getBoard={this.state.getBoard}
                  />
                )}
              />
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
            <PlayerDetails handleLogin={this.handleLogin} player={this.getDetails} room={this.getRoomID} />
          </div>
        </div>
      );
    }
  }

  getDetails = (name: string): any => {
    this.setState({ playerName: name });
  };

  getRoomID = (id: string): void => {
    if (id.length < 1) {
    } else {
      this.setState({ roomID: id });
    }
  };

  handleLogin = (b: boolean, g: boolean): void => {
    this.setState({ login: b });
    this.setState({ getBoard: g });
  };
}
