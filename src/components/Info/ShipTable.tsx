import React from 'react';

function ShipTable(): any {
  return (
    <div className="ship-table-div">
      <table className="ship-table">
        <tr>
          <th>Placed</th>
          <th>Ships</th>
          <th>Size</th>
        </tr>
        <tr>
          <td>First</td>
          <td>Carrier</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Second</td>
          <td>Battleship</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Third</td>
          <td>Cruiser</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Fourth</td>
          <td>Submarine</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Fifth</td>
          <td>Destroyer</td>
          <td>2</td>
        </tr>
      </table>
    </div>
  );
}

export default ShipTable;
