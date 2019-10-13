# COSC360: ReactShips
ReactShips is a clone of the classic board game Battle Ships. The game starts out<br> 
with each player placing their 5 ships on their own board. Each ship can only place <br>
in the vertical or horizontal direction, They cannot be placed diagonally or in a <br>
mix of vertical or horizontal.

After the ships are placed each player takes turn guessing which squares the other <br>
player has placed their ships. If a ship is hit a square will turn red and if its <br>
a miss the square will turn white. The first player to sink all the other players ships<br>
is the winner of the game.

Currently hosted at : https://reactships.herokuapp.com

By David Preston.

## Project Details:

The project uses express.js for the server side, Express serves up the follow apis:

* GET [http://localhost:5005/api/gamestate](http://localhost:5005/api/gamestate/roomID&PlayerName)
  * Loads the gamestate from mongodb using the provided roomID and PlayerName as a key.
* GET [http://localhost:5005/api/enemyBoard](http://localhost:5005/api/enemyBoard/roomID&PlayerName)
  * Loads the Enemy Boards from mongodb using the provided roomID and PlayerName as a key.
* GET [http://localhost:5005/playerBoard](http://localhost:5005/playerBoard/roomID&PlayerName)
  * Saves and loads the Player Boards from mongodb using the provided roomID and PlayerName as a key.
* POST [http://localhost:5005/api/gamestate](http://localhost:5005/api/gamestate)
  * Saves the Game State to mongodb.
* POST [http://localhost:5005/api/enemyBoard](http://localhost:5005/api/enemyBoard)
  * Saves the Enemy Boards to mongodb.
* POST [http://localhost:5005/playerBoard](http://localhost:5005/playerBoard)
  * Saves and loads the Player Boards from mongodb using the provided roomID and PlayerName as a key.
* GET [http://localhost:5005/stats](http://localhost:5005/stats)
  * Provides Stats for the all the games.
* GET [http://localhost:5005/gameID](http://localhost:5005/gameID)
  * Generates a gameId for client to use.

The client side uses react with two canvas to draw the game boards, It also uses<br>
d3.js to render stats in a bar-chart that are received from the server. These stats <br>
Can be seen onces you login and hit the stats link up the top.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Installs node modules then Builds the server and client.<br>

### `npm run start`

Runs the server for production from `dist` folder.<br>

### `npm dev`

Runs the express server in development mode. Make sure to run `npm run build` <br>
in the client folder before hand if not running the react clien(Next command)<br>
Open [http://localhost:5005](http://localhost:5005) to view it in the browser.

### `npm run client`

Runs the client in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## In the client folder you can run.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
