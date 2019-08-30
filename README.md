# cosc360: ReactShips
ReactShips is a clone of the classic board game Battle Ships. The game starts out with each player placing
their 5 ships on their own board. Each ship can only place in the vertical or horizontal direction, They
cannot be placed diagonally or a mix of vertical or horizontal. Ships consist of the following sizes:
| Order Placed | Ship        | Size |
| ------------ | ----------- | ---- |
| First        | Carrier     | 5    |
| Second       | BattleShips | 4    |
| Third        | Cruiser     | 3    |
| Fourth       | Submarine   | 3    |
| Fifth        | Destroyer   | 2    |

After these ships are placed each player takes turn guessing which squares the other player has placed their
ships. If a ship is hit a square will turn red and if its a miss the square will turn white. The first
player to sink all the other players ships is the winner of the game.

Currently hosted at : https://reactships.herokuapp.com

By David Preston.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
