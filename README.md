# COSC360: ReactShips
ReactShips is a clone of the classic board game Battle Ships. The game starts out with each player placing
their 5 ships on their own board. Each ship can only place in the vertical or horizontal direction, They
cannot be placed diagonally or a mix of vertical or horizontal.

After the ships are placed each player takes turn guessing which squares the other player has placed their
ships. If a ship is hit a square will turn red and if its a miss the square will turn white. The first
player to sink all the other players ships is the winner of the game.

Currently hosted at : https://reactships.herokuapp.com

By David Preston.

## Project Details:

The project uses express.js for the server side, Express serves up the follow apis:
* [http://localhost:5005/api/gamestate](http://localhost:5005/api/gamestate)
  * Saves and loads the gamestate from mongodb.
* [http://localhost:5005/api/enemyBoard](http://localhost:5005/api/enemyBoard)
  * Saves and loads the Enemy Boards from mongodb.
* [http://localhost:5005/playerBoard](http://localhost:5005/playerBoard)
  * Saves and loads the Player Boards from mongodb.
* [http://localhost:5005/stats](http://localhost:5005/stats)
  * Provides Stats for the game.
* [http://localhost:5005/gameID](http://localhost:5005/gameID)
  * Generates a gameId for client to use.



## Available Scripts
### Make sure install node models from the client folder and the main source folder !
In the project directory, you can run:

### `npm dev`

Runs the express server in development mode. Make sure to run `npm run build` <br>
in the client folder before hand if not running the react clien(Next command)<br>
Open [http://localhost:5005](http://localhost:5005) to view it in the browser.

### `npm run client`
Runs the client in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the server for production to the `dist` folder.<br>

### `npm run start`

Runs the server for production fomr `dist` folder.<br>

## In the client folder you can run.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
