import * as React from 'react';

export interface IAppProps {}
interface INavProp {
    text: string;
    link?: string;
    classN?: string;
}
export default class Nav extends React.Component<any> {
    public render(): JSX.Element {
        return (
            <div className="navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    BattleShips
                </a>
                <NavLink text="Info" classN="nav-info"/>
                <NavLink text="LeaderBoard" classN="nav-leader"/>
                <NavLink text="Play" classN="nav-play"/>
            </div>
        );
    }
}

const NavLink: React.FC<INavProp> = ({text,link,classN}): JSX.Element => {
    return <span className={classN}>{text}</span>;
};
