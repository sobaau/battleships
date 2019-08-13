import * as React from "react";
import { Board } from "../interface/Board";
import { BoardCell } from "../interface/BoardCell";
import { ICanvas, IMoveListItem } from "../interface/IGameProp";
import { Ship } from "../interface/Ship";
import { GameStatus } from "./PlayArea";

interface IGameState {
    GameStatus: GameStatus;
    ShipRemaining: number;
    ShipParts: {
        Carrier: number,
        Battleship: number,
        Cruiser: number,
        Submarine: number,
        Destroyer: number,
    };
    screen: {
        width: number,
        height: number,
    };
    CurrentShip: string;
    ctx?: any;
}
export class PlayerCanvas extends React.Component<ICanvas, IGameState> {
    public playerBoard: Board;
    public enemyBoard: Board;
    private playerCells: BoardCell[];
    private currentShip: Ship;
    private shipCells: BoardCell[] = [];
    private ships: Ship[];
    private clicks: number;
    private ship: number;
    private height = 510;
    private width = 510;
    private canvasRef = React.createRef<HTMLCanvasElement>();
    constructor(props: any) {
        super(props);
        this.state = {
            CurrentShip: "Carrier",
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
        };
        this.ships = this.createShipList();
        this.playerBoard = new Board("player");
        this.enemyBoard = new Board("enemy");
        this.playerCells = this.addCells(0, 0, "player");
        this.clicks = 0;
        this.ship = 0;
    }

    public render() {
        console.log("Props in PC ");
        console.log(this.props);
        console.log(this.state);
        return (
            <div className="canvas player col">
                <canvas id="playerC" ref={this.canvasRef}
                width={this.state.screen.width} height={this.state.screen.height} />
            </div>
        );
    }
    public componentDidMount() {
        const ctx = this.canvasRef.current.getContext("2d");
        this.setState({ ctx });
        this.startGame();
        this.setEvents();
        requestAnimationFrame(() => { this.update(); });
    }

    private startGame() {
        console.log("start");
        this.setState({
            GameStatus: GameStatus.Setup,
        });
        this.ship = 0;
        this.currentShip = this.ships[this.ship];
        this.playerBoard = new Board("player");
        this.enemyBoard = new Board("enemy");
        this.playerCells = this.addCells(0, 0, "player");
        this.clicks = 0;
        console.log(this.props.GameState.GameStatus);
        this.props.GameState.CurrentShip = "Carrier";
        this.props.updateGameState(this.props.GameState);
        this.setState((prevState) => {
            const ShipParts = { ...prevState.ShipParts };
            ShipParts.Carrier = 5;
            ShipParts.Battleship = 4;
            ShipParts.Cruiser = 3;
            ShipParts.Submarine = 3;
            ShipParts.Destroyer = 2;
            return { ShipParts };
        });
        this.setState({ ShipRemaining: 5 });

    }
    private update() {
        this.drawCells(this.playerCells);
        if (this.props.GameState.ResP) {
            this.startGame();
            this.props.GameState.ResP = false;
            this.props.updateGameState(this.props.GameState);
        }
        if (this.props.GameState.GameStatus === 1 && this.props.GameState.CurrentTurn === "Enemy") {
            this.playGame();
        }
        if (this.state.GameStatus === 2) {
            // #TODO ENDGAME
        }
        requestAnimationFrame(() => {
            this.update();
        });
    }
    private checkRemainingShips() {
        this.setState({
            ShipRemaining: this.state.ShipRemaining - 1,
        });
        if (this.state.ShipRemaining === 0) {
            this.props.GameState.Winner = "Enemy Wins!";
            this.props.GameState.GameStatus = GameStatus.GameOver;
            this.props.updateGameState(this.props.GameState);
        }
    }
    private playGame() {
        const randomCell: number = Math.floor(Math.random() * (99 - 0 + 1)) + 0;
        const cell = this.playerCells[randomCell];
        if (cell.part !== "empty" && !cell.hit) {
            if (cell.part === "Carrier") {
                this.setState((prevState) => {
                    const ShipParts = { ...prevState.ShipParts };
                    ShipParts.Carrier--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Carrier === 0) {
                    this.checkRemainingShips();
                }
            } else if (cell.part === "Battleship") {
                this.setState((prevState) => {
                    const ShipParts = { ...prevState.ShipParts };
                    ShipParts.Battleship--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Battleship === 0) {
                    this.checkRemainingShips();
                }
            } else if (cell.part === "Cruiser") {
                this.setState((prevState) => {
                    const ShipParts = { ...prevState.ShipParts };
                    ShipParts.Cruiser--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Cruiser === 0) {
                    this.checkRemainingShips();
                }
            } else if (cell.part === "Submarine") {
                this.setState((prevState) => {
                    const ShipParts = { ...prevState.ShipParts };
                    ShipParts.Submarine--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Submarine === 0) {
                    this.checkRemainingShips();
                }
            } else {
                this.setState((prevState) => {
                    const ShipParts = { ...prevState.ShipParts };
                    ShipParts.Destroyer--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Destroyer === 0) {
                    this.checkRemainingShips();
                }
            }
            this.playerCells[randomCell].hit = true;
            this.playerCells[randomCell].c = "red";
            this.playerCells[randomCell].part = "empty"; // #TODO: Fix this up.
            this.props.GameState.CurrentTurn = "Player";
            const move: IMoveListItem = {
                Player: "Enemy",
                Move: "Hit!",
            };
            this.props.updateMoves(move);
            this.props.updateGameState(this.props.GameState);
        } else if (cell.part === "empty" && !cell.hit) {
            this.playerCells[randomCell].hit = true;
            this.playerCells[randomCell].c = "white";
            this.playerCells[randomCell].part = "empty"; // #TODO: Fix this up.
            this.props.GameState.CurrentTurn = "Player";
            const move: IMoveListItem = {
                Player: "Enemy",
                Move: "Miss!",
            };
            this.props.updateMoves(move);
            this.props.updateGameState(this.props.GameState);
        } else {
            this.playGame();
        }

    }
    private endGame() {

    }

    private setEvents() {
        const canvas = this.canvasRef.current;
        canvas.addEventListener("click", (event) => {
            const x = event.clientX - canvas.getBoundingClientRect().left;
            const y = event.clientY - canvas.getBoundingClientRect().top;
            if (this.state.GameStatus === 0) {
                this.toggleCell(this.playerCells, x, y);
                this.checkValid();
                if (this.clicks === this.currentShip.size) {
                    this.finalCheck();
                }
                this.checkShipTurn();
            }
        });

        this.canvasRef.current.addEventListener("mousemove", (event) => {
            const x = event.clientX - canvas.getBoundingClientRect().left;
            const y = event.clientY - canvas.getBoundingClientRect().top;
            // console.log(`${x}, ${y}`);
            if (this.state.GameStatus === 0) {
                this.hoverEffect(this.playerCells, x, y);
            }
        });
    }
    private updateCurrentShip() {
        this.props.GameState.CurrentShip = this.state.CurrentShip;
        this.props.updateGameState(this.props.GameState);
    }
    private createShipList(): Ship[] {
        const ships = [];
        const carr = new Ship("Carrier", 5, "#a6a6a6");
        const bat = new Ship("Battleship", 4, "#c7c7c7");
        const cru = new Ship("Cruiser", 3, "#ded9d9");
        const sub = new Ship("Submarine", 3, "#e8e1e1");
        const dest = new Ship("Destroyer", 2, "#ededed");
        ships.push(carr);
        ships.push(bat);
        ships.push(cru);
        ships.push(sub);
        ships.push(dest);
        return ships;
    }

    private drawCells(cells: BoardCell[]) {
        const ctx = this.state.ctx;
        cells.forEach((cell) => {
            if (cell.part === "empty") {
                ctx.fillStyle = cell.c;
                ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            } else if (cell.part !== "empty") {
                this.ships.forEach((ship) => {
                    if (ship.name === cell.part) {
                        ctx.fillStyle = ship.c;
                    }
                });
                ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            }
        });

    }
    private addCells(x: number, y: number, s: string): BoardCell[] {
        const narr: BoardCell[] = new Array(100);
        for (let i = 0; i < 10; i++) {
            for (let n = 0; n < 10; n++) {
                narr[i + n * 10] = new BoardCell((i * 50) + x, (n * 50) + y, s);
                narr[i + n * 10].c = (s === "enemy" ? "#8F282F" : "#464478");
            }
        }
        return narr;
    }
    private finalCheck() {
        let dirc: string;
        const cellCheck = this.playerCells.filter((cell) => cell.part === this.currentShip.name);
        if (cellCheck[0].x === cellCheck[1].x) {
            dirc = "v";
        } else if (cellCheck[0].y === cellCheck[1].y) {
            dirc = "h";
        }
        for (let i = 0, n = 1; i < cellCheck.length - 1; i++ , n++) {
            if (dirc === "h") {
                if (cellCheck[i].x + 50 === cellCheck[n].x ||
                    cellCheck[i].x - 50 === cellCheck[n].x) {
                    continue;
                }

                this.clearInvalid();
                return;
            }
            if (dirc === "v") {
                if (cellCheck[i].y + 50 === cellCheck[n].y ||
                    cellCheck[i].y - 50 === cellCheck[n].y) {
                    continue;
                }
                this.clearInvalid();
                return;
            }
        }
    }

    private checkShipTurn() {
        if (this.shipCells.length === this.currentShip.size) {
            if (this.currentShip.name === "Destroyer") {
                this.setState({ GameStatus: GameStatus.Playing });
                this.props.GameState.GameStatus = this.state.GameStatus;
                this.props.GameState.CurrentTurn = "Player";
                this.props.updateGameState(this.props.GameState);
                this.playerBoard = new Board("player");
                this.playerCells.forEach((cell) => {
                    if (cell.part === "empty") {
                        this.playerBoard.board.push(0);
                    } else if (cell.part === "Carrier") {
                        this.playerBoard.board.push(1);
                    } else if (cell.part === "Battleship") {
                        this.playerBoard.board.push(2);
                    } else if (cell.part === "Cruiser") {
                        this.playerBoard.board.push(3);
                    } else if (cell.part === "Submarine") {
                        this.playerBoard.board.push(4);
                    } else {
                        this.playerBoard.board.push(5);
                    }
                });
                console.log(this.playerBoard);
            } else {
                this.clicks = 0;
                this.ship++;
                this.currentShip = this.ships[this.ship];
                this.setState({ CurrentShip: this.currentShip.name });
                this.updateCurrentShip();
                this.shipCells = [];
            }
        }
    }
    private toggleCell(arr: BoardCell[], x: number, y: number) {
        const ctx = this.state.ctx;
        if (this.state.GameStatus === 0) {
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = this.currentShip.name;
                    this.clicks++;
                }
            });
        } else {
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = "enemy";
                    ctx.fillStyle = "red";
                    ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
                    this.clicks++;
                }
            });
        }

    }
    private checkValid() {
        if (!this.checkValidCell()) {
            this.clearInvalid();
        }
    }
    private clearInvalid() {
        console.log("Invalid");
        this.props.GameState.SetupMessages = "Invalid Ship Placement",
        this.props.updateGameState(this.props.GameState);
        this.playerCells.forEach((cell) => {
            if (cell.part === this.currentShip.name) {
                cell.part = "empty";
            }
        });
        this.shipCells = [];
        this.clicks = 0;
    }
    private checkValidCell() {
        let dirc: string;
        if (this.shipCells.length === 1) {
            return true;

        } else if (this.shipCells.length > 1) {
            if (this.shipCells[0].x === this.shipCells[1].x) {
                dirc = "h";
            } else if (this.shipCells[0].y === this.shipCells[1].y) {
                dirc = "v";
            } else {
                return false;
            }

            for (let i = 0; i < this.shipCells.length; i++) {
                if (dirc == "h") {
                    if (this.shipCells[0].x !== this.shipCells[i].x) {
                        return false;
                    }
                } else if (dirc === "v") {
                    if (this.shipCells[0].y !== this.shipCells[i].y) {
                        return false;
                    }
                }
            }

            return true;
        }
        return false;
    }

    private hoverEffect(arr: BoardCell[], x: number, y: number) {
        const ctx = this.state.ctx;
        arr.forEach((cell) => {
            if (cell.contains(x, y) && cell.part === "empty") {
                ctx.fillStyle = "white";
                ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            } else if (cell.part === "empty") {
                ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
    private exportBoard() {
        return this.playerBoard;
    }
}
