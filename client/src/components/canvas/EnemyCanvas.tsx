import * as React from 'react';
import { Board } from '../../interface/Board';
import { BoardCell } from '../../interface/BoardCell';
import { ICanvas, IMoveListItem } from '../../interface/IGameProp';
import { GameStatus } from '../PlayArea';
import io from 'socket.io-client';

interface EnemyCanvasState {
  GameStatus: GameStatus;
  CurrentTurn: string;
  ShipsRemaining: number;
  screen: {
    width: number;
    height: number;
  };
  ctx?: CanvasRenderingContext2D;
  getBoard: boolean;
}

export class EnemyCanvas extends React.Component<ICanvas, EnemyCanvasState> {
  public enemyBoard: Board;
  public lastMoveResult: string;
  private enemyCells: BoardCell[];
  private importBoard: number[];
  private shipCount: Record<string, number>;
  private height = 510;
  private width = 510;
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private b = true;
  enemySocket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);
    this.state = {
      GameStatus: props.GameState.GameStatus,
      CurrentTurn: props.GameState.CurrentTurn,
      ShipsRemaining: props.GameState.EnemyShipsR,
      screen: {
        width: this.width,
        height: this.height,
      },
      ctx: undefined,
      getBoard: props.getBoard,
    };
    this.shipCount = { Carrier: 5, Battleship: 5, Cruiser: 3, Submarine: 3, Destroyer: 2 };
    this.enemyCells = new Array(100);
    this.enemyCells = this.addCells(0, 0, 'enemy');
    this.lastMoveResult = ' ';
  }

  public render(): JSX.Element {
    return (
      <div className="canvas-enemy">
        <canvas id="enemyC" ref={this.canvasRef} width="510" height="510" />
      </div>
    );
  }

  /**
   * Sets the context for the boards canvas and then starts the main animation loop.
   *
   * @memberof EnemyCanvas
   */
  public componentDidMount(): void {
    const ctx = this.canvasRef.current.getContext('2d');
    if (this.props.getBoard) {
      this.getBoard();
    }
    this.setSocket();
    this.setState({ ctx });
    this.startGame();
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
      boardCell: this.enemyCells,
      lastMoveResult: this.lastMoveResult,
      enemyBoard: this.enemyBoard,
      importBoard: this.importBoard,
      shipCount: this.shipCount,
      state: this.state,
    };
    const response = await fetch(`http://localhost:5005/api/enemyBoard/${this.props.roomID}`, {
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
    const request = await fetch(
      `http://localhost:5005/api/enemyBoard/${this.props.roomID}&${this.props.PlayerName}`,
    );
    const json = await request.json();
    for (let i = 0; i < this.enemyCells.length; i++) {
      this.enemyCells[i].x = json.boardCell[i].x;
      this.enemyCells[i].y = json.boardCell[i].y;
      this.enemyCells[i].h = json.boardCell[i].h;
      this.enemyCells[i].w = json.boardCell[i].w;
      this.enemyCells[i].c = json.boardCell[i].c;
      this.enemyCells[i].part = json.boardCell[i].part;
      this.enemyCells[i].owner = json.boardCell[i].owner;
      this.enemyCells[i].hover = json.boardCell[i].hover;
      this.enemyCells[i].hit = json.boardCell[i].hit;
    }
    this.setState({
      GameStatus: json.state.GameStatus,
      CurrentTurn: json.state.CurrentTurn,
      ShipsRemaining: json.state.ShipsRemaining,
    });
    this.setState({ getBoard: false });
    this.b = false;
  };
  private setSocket(): void {
    this.enemySocket = io('http://localhost:5005/play');
    this.enemySocket.emit('join', this.props.roomID);
    this.enemySocket.on('setEnemyBoard', (board: any) => {
      if (this.props.PlayerName !== board.boardName) {
        this.setupBoard(board.board);
      }
    });
  }

  private setupBoard(board: number[]): void {
    this.importBoard = board;
    this.setBoard();
  }
  /**
   * Main Gameloop. Checks to see if the game is set to restart. If it is the game
   * is restarted. After this the cells are drawn and the main game loop is run.
   *
   * @private
   * @memberof EnemyCanvas
   */
  private update(): void {
    this.drawCells(this.enemyCells);
    this.checkStatus();
    requestAnimationFrame(() => {
      this.update();
    });
  }

  /**
   * Starts the game for the enemies board. Also used to reset a game.
   *
   * @private
   * @memberof EnemyCanvas
   */
  private startGame(): void {
    this.setState({
      GameStatus: GameStatus.Setup,
    });
    this.enemyBoard = new Board('enemy');
    this.enemyCells = new Array(100);
    this.enemyCells = this.addCells(0, 0, 'enemy');
  }

  /**
   * Checks to see if the player has won the game or not.
   *
   * @private
   * @memberof EnemyCanvas
   */
  private checkStatus(): void {
    if (this.state.ShipsRemaining === 0) {
      this.props.GameState.GameStatus = GameStatus.GameOver;
      this.props.GameState.Winner = 'Player Wins!';
      this.props.updateGameState(this.props.GameState);
    }
  }

  /**
   * Sets the onclick and on mousemove events for the canvas
   *
   * @private
   * @memberof EnemyCanvas
   */
  private setEvents(): void {
    const canvas = this.canvasRef.current;
    canvas.addEventListener('click', event => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      this.saveBoard();
      if (this.props.GameState.GameStatus === 1 && this.props.GameState.CurrentTurn !== this.props.PlayerName) {
        this.enemySocket.emit('enemyMove', this.props.roomID, x, y, this.props.PlayerName);
        this.toggleCell(this.enemyCells, x, y);
      }
    });
    this.canvasRef.current.addEventListener('mousemove', event => {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      if (this.props.GameState.GameStatus === 1) {
        this.hoverEffect(this.enemyCells, x, y);
      }
    });
  }

  /**
   * Draws the cells within the BoardCell array.
   *
   * @private
   * @param {BoardCell[]} cells
   * @memberof EnemyCanvas
   */
  private drawCells(cells: BoardCell[]): void {
    const ctx = this.state.ctx;
    cells.forEach(cell => {
      ctx.fillStyle = cell.c;
      ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
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
   * @memberof EnemyCanvas
   */
  private addCells(x: number, y: number, s: string): BoardCell[] {
    const narr: BoardCell[] = new Array(100);
    for (let i = 0; i < 10; i++) {
      for (let n = 0; n < 10; n++) {
        narr[i + n * 10] = new BoardCell(i * 50 + x, n * 50 + y, s);
        narr[i + n * 10].c = s === 'enemy' ? '#8F282F' : '#464478';
      }
    }
    return narr;
  }

  /**
   * Toggles the cell depending on the if the cell is empty or not and updates the
   * current move history depending on the cells status.
   *
   * @private
   * @param {BoardCell[]} arr
   * @param {number} x
   * @param {number} y
   * @memberof EnemyCanvas
   */
  private toggleCell(arr: BoardCell[], x: number, y: number): void {
    arr.forEach(cell => {
      if (cell.contains(x, y)) {
        if (cell.part !== 'empty' && !cell.hit) {
          cell.c = 'red';
          this.lastMoveResult = 'Hit!';
          const move: IMoveListItem = {
            Player: 'Player',
            Move: `Hit!`,
          };
          cell.hit = true;
          this.shipCount[cell.part] = this.shipCount[cell.part] - 1;
          if (this.shipCount[cell.part] === 0) {
            move.Player = 'Player';
            move.Move = `${cell.part} was sunk`;
            this.props.GameState.EnemyShipsR--;
            this.setState({ ShipsRemaining: this.state.ShipsRemaining - 1 });
            if (this.state.ShipsRemaining === 0) {
              this.setState({
                GameStatus: GameStatus.GameOver,
              });
              this.props.GameState.GameStatus = GameStatus.GameOver;
            }
          }
          this.props.updateMoves(move);
          this.props.GameState.CurrentTurn = this.props.PlayerName;
          this.props.updateGameState(this.props.GameState);
        } else if (cell.part === 'empty' && !cell.hit) {
          cell.c = 'white';
          const move: IMoveListItem = {
            Player: 'Player',
            Move: 'Miss!',
          };
          this.props.updateMoves(move);
          cell.hit = true;
          this.props.GameState.CurrentTurn = this.props.PlayerName;
          this.props.updateGameState(this.props.GameState);
        }
      }
    });
  }
  private sendStats(m: string): void {
    if (m === 'Hit') {
      this.enemySocket.emit('hit');
    } else {
      this.enemySocket.emit('miss');
    }
  }
  /**
   * Import the board from the server and sets the board cells relative to the array
   * received.
   *
   * @private
   * @memberof EnemyCanvas
   */
  private setBoard(): void {
    //Import the board from the server.
    for (let i = 0; i < this.importBoard.length; i++) {
      if (this.importBoard[i] === 0) {
        this.enemyCells[i].part = 'empty';
      } else if (this.importBoard[i] === 1) {
        this.enemyCells[i].part = 'Carrier';
      } else if (this.importBoard[i] === 2) {
        this.enemyCells[i].part = 'Battleship';
      } else if (this.importBoard[i] === 3) {
        this.enemyCells[i].part = 'Cruiser';
      } else if (this.importBoard[i] === 4) {
        this.enemyCells[i].part = 'Submarine';
      } else {
        this.enemyCells[i].part = 'Destroyer';
      }
    }
    this.shipCount = { Carrier: 5, Battleship: 5, Cruiser: 3, Submarine: 3, Destroyer: 2 };
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
}
