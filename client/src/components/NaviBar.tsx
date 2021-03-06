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
            <Nav.Link onClick={this.props.stats}>Stats</Nav.Link>
            <div className="navbar-text">Room ID: {this.props.roomid}</div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
