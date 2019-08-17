import * as React from 'react';
import { Nav, Navbar, Form, Button, FormControl, NavDropdown } from 'react-bootstrap';
export interface IAppProps {}
interface INavProp {
    text: string;
    link?: string;
    classN?: string;
}
export default class NaviBar extends React.Component<any> {
    public render(): JSX.Element {
        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="#home">ReactShips</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Info</Nav.Link>
                        <Nav.Link href="#leader">LeaderBoard</Nav.Link>
                        <Nav.Link href="#stats">Stats</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const NavLink: React.FC<INavProp> = ({ text, link, classN }): JSX.Element => {
    return <span className={classN}>{text}</span>;
};
