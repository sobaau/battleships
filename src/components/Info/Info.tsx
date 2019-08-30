import * as React from 'react';
import ShipTable from './ShipTable';
import '../../styles/info.scss';

/**
 * TODO: Create a drop down box with this information within the player area, Currently not implemented
 * 
 *
 * @class Info
 * @extends {React.Component<any, any>}
 */
class Info extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="info-area">
        <div className="info-heading">
          <h1>Info</h1>
        </div>
        <div className="info-text">
          <p>
            ReactShips is a clone of the classic board game Battle Ships. The game starts out with each player placing
            their 5 ships on their own board. Each ship can only place in the vertical or horizontal direction, They
            cannot be placed diagonally or a mix of vertical or horizontal. Ships consist of the following sizes:
            <ShipTable />
            After these ships are placed each player takes turn guessing which squares the other player has placed their
            ships. If a ship is hit a square will turn red and if its a miss the square will turn white. The first
            player to sink all the other players ships is the winner of the game.
          </p>
        </div>
      </div>
    );
  }
}

export default Info;
