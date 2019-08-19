import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NaviBar extends React.Component<any> {
  public render(): JSX.Element {
    return (
      <Navbar variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>ReactShips</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/info">
              <Nav.Link>Info</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leaderboard">
              <Nav.Link>LeaderBoard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stats">
              <Nav.Link>Stats</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
