import * as React from 'react';
import { Board } from '../../interface/Board';
import { BoardCell } from '../../interface/BoardCell';
import { ICanvas, IMoveListItem } from '../../interface/IGameProp';
import { Ship } from '../../interface/Ship';
import { GameStatus } from '../PlayArea';
import io from 'socket.io-client';

interface IGameState {
  GameStatus: GameStatus;
  ShipRemaining: number;
  ShipParts: {
    Carrier: number;
    Battleship: number;
    Cruiser: number;
    Submarine: number;
    Destroyer: number;
  };
  screen: {
    width: number;
    height: number;
  };
  CurrentShip: string;
  clicks: number;
  getBoard: boolean;
  ctx?: CanvasRenderingContext2D;
}

export class PlayerCanvas extends React.Component<ICanvas, IGameState> {
  public playerBoard: Board;
  private playerCells: BoardCell[];
  private currentShip: Ship;
  private shipCells: BoardCell[] = [];
  private ships: Ship[];
  private ship: number;
  private height = 510;
  private width = 510;
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private exported = 0;
  private b = true;

  playerSocket: SocketIOClient.Socket;
  private saveB = false;
  constructor(props: any) {
    super(props);
    this.state = {
      CurrentShip: 'Carrier',
      GameStatus: props.GameState.GameStatus,
      ShipRemaining: 5,
      ShipParts: {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Submarine: 3,
        Destroyer: 2,
      },
      screen: {
        width: this.width,
        height: this.height,
      },
      clicks: 0,
      getBoard: props.getBoard,
    };
    this.ships = this.createShipList();
    this.playerBoard = new Board(this.props.PlayerName);
    this.playerCells = this.addCells(0, 0, 'player');
    this.ship = 0;
  }

  public render(): JSX.Element {
    return (
      <div className="canvas-player">
        <canvas id="playerC" ref={this.canvasRef} width={this.state.screen.width} height={this.state.screen.height} />
      </div>
    );
  }

  /**
   * Sets the context for the boards canvas and then starts the main animation loop.
   *
   *
   */
  public componentDidMount(): void {
    const ctx = this.canvasRef.current.getContext('2d');
    if (this.props.getBoard) {
      this.getBoard();
    }
    this.setState({ ctx });
    this.startGame();

    this.setSocket();
    this.setEvents();
    requestAnimationFrame(() => {
      this.update();
    });
  }
  public componentDidUpdate(): void {
    this.saveBoard();
  }
  private saveBoard = async (): Promise<any> => {
    const obj = {
      roomID: this.props.roomID,
      player: this.props.PlayerName,
      boardCell: this.playerCells,
      state: this.state,
      ships: this.ships,
      ship: this.ship,
      playerBoard: this.playerBoard,
      currentShip: this.currentShip,
      shipCells: this.shipCells,
      exported: this.exported,
    };
    const response = await fetch(`https://reactships.herokuapp.com/api/playerBoard/${this.props.roomID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    const json = await response.json();
    console.log(json);
  };
  private getBoard = async (): Promise<any> => {
    const response = await fetch(
      `https://reactships.herokuapp.com/api/playerBoard/${this.props.roomID}&${this.props.PlayerName}`,
    );
    const json = await response.json();
    for (let i = 0; i < this.playerCells.length; i++) {
      this.playerCells[i].x = json.boardCell[i].x;
      this.playerCells[i].y = json.boardCell[i].y;
      this.playerCells[i].h = json.boardCell[i].h;
      this.playerCells[i].w = json.boardCell[i].w;
      this.playerCells[i].c = json.boardCell[i].c;
      this.playerCells[i].part = json.boardCell[i].part;
      this.playerCells[i].owner = json.boardCell[i].owner;
      this.playerCells[i].hover = json.boardCell[i].hover;
      this.playerCells[i].hit = json.boardCell[i].hit;
    }
    this.exported = json.exported;
    for (let i = 0; i < this.ships.length; i++) {
      this.ships[i].c = json.ships[i].c;
      this.ships[i].name = json.ships[i].name;
      this.ships[i].size = json.ships[i].size;
    }
    for (let i = 0; i < this.shipCells.length; i++) {
      this.shipCells[i].x = json.shipCells[i].x;
      this.shipCells[i].y = json.shipCells[i].y;
      this.shipCells[i].h = json.shipCells[i].h;
      this.shipCells[i].w = json.shipCells[i].w;
      this.shipCells[i].c = json.shipCells[i].c;
      this.shipCells[i].part = json.shipCells[i].part;
      this.shipCells[i].owner = json.shipCells[i].owner;
      this.shipCells[i].hover = json.shipCells[i].hover;
      this.shipCells[i].hit = json.shipCells[i].hit;
    }
    this.currentShip = json.currentShip;
    this.ship = json.ship;
    this.setState(prevState => {
      const ShipParts = { ...prevState.ShipParts };
      ShipParts.Carrier = json.state[0].ShipParts.Carrier;
      ShipParts.Battleship = json.state[0].ShipParts.Battleship;
      ShipParts.Cruiser = json.state[0].ShipParts.Cruiser;
      ShipParts.Submarine = json.state[0].ShipParts.Submarine;
      ShipParts.Destroyer = json.state[0].ShipParts.Destroyer;
      return { ShipParts };
    });
    this.setState({ ShipRemaining: json.state[0].ShipRemaining, clicks: json.state[0].clicks });
    this.setState({
      CurrentShip: json.state[0].CurrentShip,
    });
    this.saveB = true;
    this.updateCurrentShip();
    this.setState({ getBoard: false });
    this.b = false;
  };
  private setSocket(): void {
    this.playerSocket = io('https://reactships.herokuapp.com/play');
    this.playerSocket.emit('join', this.props.roomID);
    this.playerSocket.on('enemySendMove', (x: number, y: number, name: string) => {
      if (name !== this.props.PlayerName) {
        for (const cell of this.playerCells) {
          if (cell.contains(x, y)) {
            if (cell.part === 'Carrier') {
              this.setState(prevState => {
                const ShipParts = { ...prevState.ShipParts };
                ShipParts.Carrier--;
                return { ShipParts };
              });
              if (this.state.ShipParts.Carrier === 0) {
                this.checkRemainingShips();
              }
            } else if (cell.part === 'Battleship') {
              this.setState(prevState => {
                const ShipParts = { ...prevState.ShipParts };
                ShipParts.Battleship--;
                return { ShipParts };
              });
              if (this.state.ShipParts.Battleship === 0) {
                this.checkRemainingShips();
              }
            } else if (cell.part === 'Cruiser') {
              this.setState(prevState => {
                const ShipParts = { ...prevState.ShipParts };
                ShipParts.Cruiser--;
                return { ShipParts };
              });
              if (this.state.ShipParts.Cruiser === 0) {
                this.checkRemainingShips();
              }
            } else if (cell.part === 'Submarine') {
              this.setState(prevState => {
                const ShipParts = { ...prevState.ShipParts };
                ShipParts.Submarine--;
                return { ShipParts };
              });
              if (this.state.ShipParts.Submarine === 0) {
                this.checkRemainingShips();
              }
            } else if (cell.part === 'empty') {
              cell.hit = true;
              cell.c = 'white';
              cell.part = 'empty'; // #TODO: Fix this up.
              this.props.GameState.CurrentTurn = 'Player';
              const move: IMoveListItem = {
                Player: 'Enemy',
                Move: 'Miss!',
              };
              this.props.updateMoves(move);
              this.props.updateGameState(this.props.GameState);
              break;
            } else {
              this.setState(prevState => {
                const ShipParts = { ...prevState.ShipParts };
                ShipParts.Destroyer--;
                return { ShipParts };
              });
              if (this.state.ShipParts.Destroyer === 0) {
                this.checkRemainingShips();
              }
            }
            cell.hit = true;
            cell.c = 'red';
            cell.part = 'empty'; // #TODO: Fix this up.
            this.props.GameState.CurrentTurn = 'Player';
            const move: IMoveListItem = {
              Player: 'Enemy',
              Move: 'Hit!',
            };
            this.props.updateMoves(move);
            this.props.updateGameState(this.props.GameState);
          }
        }
      }
    });
  }
  /**
   * Main drawloop. Resets the game if flagged and then calls the update functions
   * for the game.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private update(): void {
    this.drawCells(this.playerCells);
    if (this.props.GameState.GameStatus === 1) {
      if (this.exported === 0) {
        this.exportBoard();
      }
    }
    if (this.state.GameStatus === 2) {
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }

  /**
   * Sets up the game for the player and also resets the game when flagged.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private startGame(): void {
    this.setState({
      GameStatus: GameStatus.Setup,
    });
    this.playerCells = [];
    this.shipCells = [];
    this.ship = 0;
    this.currentShip = this.ships[this.ship];
    this.playerBoard = new Board(this.props.PlayerName);
    this.playerCells = this.addCells(0, 0, 'player');
    this.props.GameState.CurrentShip = 'Carrier';
    this.props.GameState.GameStatus = GameStatus.Setup;
    this.setState({ CurrentShip: 'Carrier' });
    this.ships = this.createShipList();
    this.props.updateGameState(this.props.GameState);
    this.setState(prevState => {
      const ShipParts = { ...prevState.ShipParts };
      ShipParts.Carrier = 5;
      ShipParts.Battleship = 4;
      ShipParts.Cruiser = 3;
      ShipParts.Submarine = 3;
      ShipParts.Destroyer = 2;
      return { ShipParts };
    });
    this.setState({ ShipRemaining: 5, clicks: 0 });
  }

  /**
   * Checks the remaining ships for the player. If none are Left the enemy has won.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private checkRemainingShips(): void {
    this.setState({
      ShipRemaining: this.state.ShipRemaining - 1,
    });
    this.props.GameState.PlayerShipsR--;
    this.props.updateGameState(this.props.GameState);
    if (this.state.ShipRemaining === 0) {
      this.props.GameState.Winner = 'Enemy Wins!';
      this.props.GameState.GameStatus = GameStatus.GameOver;
      this.props.updateGameState(this.props.GameState);
    }
  }

  /**
   * Sets the events for mouse clicks and mouse overs.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private setEvents(): void {
    const canvas = this.canvasRef.current;
    canvas.addEventListener('click', event => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      if (this.props.GameState.GameStatus === 0) {
        this.toggleCell(this.playerCells, x, y);
        this.checkValid();
        this.saveBoard();
        if (this.state.clicks === this.currentShip.size) {
          this.finalCheck();
        }
        this.checkShipTurn();
      }
    });

    this.canvasRef.current.addEventListener('mousemove', event => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      if (this.props.GameState.GameStatus === 0) {
        this.hoverEffect(this.playerCells, x, y);
      }
    });
  }

  /**
   * Update which ship is being placed in the game state.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private updateCurrentShip(): void {
    this.props.GameState.CurrentShip = this.state.CurrentShip;
    this.props.updateGameState(this.props.GameState);
  }

  /**
   * Generates and sets the ship parts for the player.
   *
   * @private
   * @returns {Ship[]}
   * @memberof PlayerCanvas
   */
  private createShipList(): Ship[] {
    const ships = [];
    const carr = new Ship('Carrier', 5, '#752323');
    const bat = new Ship('Battleship', 4, '#442375');
    const cru = new Ship('Cruiser', 3, '#2e7523');
    const sub = new Ship('Submarine', 3, '#23756e');
    const dest = new Ship('Destroyer', 2, '#727523');
    ships.push(carr);
    ships.push(bat);
    ships.push(cru);
    ships.push(sub);
    ships.push(dest);
    return ships;
  }

  /**
   * Draws the cells within the BoardCell array.
   *
   * @private
   * @param {BoardCell[]} cells
   * @memberof PlayerCanvas
   */
  private drawCells(cells: BoardCell[]): void {
    const ctx = this.state.ctx;
    cells.forEach(cell => {
      if (cell.part === 'empty') {
        ctx.fillStyle = cell.c;
        ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
      } else if (cell.part !== 'empty') {
        this.ships.forEach(ship => {
          if (ship.name === cell.part) {
            ctx.fillStyle = ship.c;
          }
        });
        ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
      }
    });
  }

  /**
   * Generates the BoardCell array.
   *
   * @private
   * @param {number} x
   * @param {number} y
   * @param {string} s
   * @returns {BoardCell[]}
   * @memberof PlayerCanvas
   */
  private addCells(x: number, y: number, s: string): BoardCell[] {
    const newArray: BoardCell[] = new Array(100);
    for (let i = 0; i < 10; i++) {
      for (let n = 0; n < 10; n++) {
        newArray[i + n * 10] = new BoardCell(i * 50 + x, n * 50 + y, s);
        newArray[i + n * 10].c = s === 'enemy' ? '#8F282F' : '#464478';
      }
    }
    return newArray;
  }

  /**
   * Check which ship the player should be currently placing and then starts the
   * game when the last ship is placed.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private checkShipTurn(): void {
    if (this.shipCells.length === this.currentShip.size) {
      if (this.currentShip.name === 'Destroyer') {
        this.setState({ GameStatus: GameStatus.Playing });
        this.props.GameState.GameStatus = this.state.GameStatus;
        this.props.GameState.CurrentTurn = 'Player';
        this.props.updateGameState(this.props.GameState);
        this.playerBoard = new Board(this.props.PlayerName);
        this.playerCells.forEach(cell => {
          if (cell.part === 'empty') {
            this.playerBoard.board.push(0);
          } else if (cell.part === 'Carrier') {
            this.playerBoard.board.push(1);
          } else if (cell.part === 'Battleship') {
            this.playerBoard.board.push(2);
          } else if (cell.part === 'Cruiser') {
            this.playerBoard.board.push(3);
          } else if (cell.part === 'Submarine') {
            this.playerBoard.board.push(4);
          } else {
            this.playerBoard.board.push(5);
          }
        });
      } else {
        this.setState({ clicks: 0 });
        this.ship++;
        this.currentShip = this.ships[this.ship];
        this.setState({ CurrentShip: this.currentShip.name });
        this.updateCurrentShip();
        this.shipCells = [];
      }
    }
  }

  /**
   * Toggles the BoardCells depending what ship the player is placing.
   *
   * @private
   * @param {BoardCell[]} arr
   * @param {number} x
   * @param {number} y
   * @memberof PlayerCanvas
   */
  private toggleCell(arr: BoardCell[], x: number, y: number): void {
    const ctx = this.state.ctx;
    if (this.props.GameState.GameStatus === 0) {
      this.props.GameState.SetupMessages = '';
      this.props.updateGameState(this.props.GameState);
      arr.forEach(cell => {
        if (cell.contains(x, y) && this.state.clicks !== this.currentShip.size && cell.part === 'empty') {
          this.shipCells.push(cell);
          cell.part = this.currentShip.name;
          this.setState({ clicks: this.state.clicks + 1 });
        }
      });
    } else {
      arr.forEach(cell => {
        if (cell.contains(x, y) && this.state.clicks !== this.currentShip.size && cell.part === 'empty') {
          this.shipCells.push(cell);
          cell.part = 'enemy';
          ctx.fillStyle = 'red';
          ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
          this.setState({ clicks: this.state.clicks + 1 });
        }
      });
    }
  }

  private checkValid(): void {
    if (!this.checkValidCell()) {
      this.clearInvalid();
    }
  }

  /**
   * Resets the cells the players ship is in if its invalid.
   *
   * @private
   * @memberof PlayerCanvas
   */
  private clearInvalid(): void {
    this.props.GameState.SetupMessages = 'Invalid Ship Placement';
    this.props.updateGameState(this.props.GameState);
    this.playerCells.forEach(cell => {
      if (cell.part === this.currentShip.name) {
        cell.part = 'empty';
      }
    });
    this.shipCells = [];
    this.setState({ clicks: 0 });
  }

  /**
   * Checks to see if there are any invalid moves from the player once their ship
   * has been replaced. This is done by checking their direction it was placed
   * and flagging it invalid if its invalid if they are not along the right x/y
   * location
   *
   * @private
   * @returns {boolean}
   * @memberof PlayerCanvas
   */
  private checkValidCell(): boolean {
    let direction: string;
    if (this.shipCells.length === 1) {
      return true;
    } else if (this.shipCells.length > 1) {
      if (this.shipCells[0].x === this.shipCells[1].x) {
        direction = 'h';
      } else if (this.shipCells[0].y === this.shipCells[1].y) {
        direction = 'v';
      } else {
        return false;
      }

      for (let i = 0; i < this.shipCells.length; i++) {
        if (direction === 'h') {
          if (this.shipCells[0].x !== this.shipCells[i].x) {
            return false;
          }
        } else if (direction === 'v') {
          if (this.shipCells[0].y !== this.shipCells[i].y) {
            return false;
          }
        }
      }

      return true;
    }
    return false;
  }

  /**
   * Last check to see if the player has correctly placed the ship. Every cell
   * is checked within 50 pixels to make sure they are all connected.
   *
   * @private
   * @returns {void}
   * @memberof PlayerCanvas
   */
  private finalCheck(): void {
    let direction: string;
    const cellCheck = this.playerCells.filter(cell => cell.part === this.currentShip.name);
    if (cellCheck[0].x === cellCheck[1].x) {
      direction = 'v';
    } else if (cellCheck[0].y === cellCheck[1].y) {
      direction = 'h';
    }
    for (let i = 0, n = 1; i < cellCheck.length - 1; i++, n++) {
      if (direction === 'h') {
        if (cellCheck[i].x + 50 === cellCheck[n].x || cellCheck[i].x - 50 === cellCheck[n].x) {
          continue;
        }

        this.clearInvalid();
        return;
      }
      if (direction === 'v') {
        if (cellCheck[i].y + 50 === cellCheck[n].y || cellCheck[i].y - 50 === cellCheck[n].y) {
          continue;
        }
        this.clearInvalid();
        return;
      }
    }
  }

  /**
   * Creates a hover type effect over the given boardcell.
   *
   * @private
   * @param {BoardCell[]} arr
   * @param {number} x
   * @param {number} y
   * @memberof EnemyCanvas
   */
  private hoverEffect(arr: BoardCell[], x: number, y: number): void {
    const ctx = this.state.ctx;
    arr.forEach(cell => {
      if (cell.contains(x, y)) {
        ctx.fillStyle = 'white';
        ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
      } else {
        ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
      }
    });
  }

  /**
   * Exports the current board to the server
   *
   * @private
   * @memberof PlayerCanvas
   */
  private exportBoard(): void {
    this.playerSocket.emit('playerBoard', this.playerBoard, this.props.roomID);
    this.exported = 1;
  }
}
