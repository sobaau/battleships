import * as React from 'react';

export interface IAppProps {
}

export default class Nav extends React.Component<any> {
  public render() {
    return (
      <div className="navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">BattleShips</a>
      </div>
    );
  }
}
