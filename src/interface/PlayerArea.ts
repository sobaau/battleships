import { string } from "prop-types";
import { Board } from "./Board";
import { BoardCell } from "./BoardCell";
import { Button } from "./Button";
import { Ship } from "./Ship";

export class PlayerArea {
    public angle = 2;
    public canvas: HTMLCanvasElement;
    public ctx: any;
    public testCell: BoardCell;
    public playerBoard: Board;
    public enemyBoard: Board;
    private playerCells: BoardCell[];
    private currentShip: Ship;
    private shipCells: BoardCell[] = [];
    private ships: Ship[];
    private clicks: number;
    private ship: number;
    private gameState = "setup";
    constructor() {
        this.canvas = document.getElementById("player") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.setEvents();
        this.createShipList();
        this.startGame();
    }

    public draw() {
        this.drawCells(this.playerCells);
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    public startGame() {
        console.log("start");
        this.gameState = "setup";
        this.ship = 0;
        this.currentShip = this.ships[this.ship];
        this.playerBoard = new Board("player");
        this.enemyBoard = new Board("enemy");
        this.playerCells = new Array(100);
        this.addCells(this.playerCells, 0, 0, "player");
        this.clicks = 0;
    }

    private drawCells(cells: BoardCell[]) {
        cells.forEach((cell) => {
            if (cell.part === "empty") {
                this.ctx.fillStyle = cell.c;
                this.ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            } else if (cell.part !== "empty") {
                this.ships.forEach((ship) => {
                    if (ship.name === cell.part) {
                        this.ctx.fillStyle = ship.c;
                    }
                });
                this.ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            }
        });

    }

    private createShipList() {
        this.ships = [];
        const carr = new Ship("Carrier", 5, "#a6a6a6");
        const bat = new Ship("Battleship", 4, "#c7c7c7");
        const cru = new Ship("Cruiser", 3, "#ded9d9");
        const sub = new Ship("Submarine", 3, "#e8e1e1");
        const dest = new Ship("Destroyer", 2, "#ededed");
        this.ships.push(carr);
        this.ships.push(bat);
        this.ships.push(cru);
        this.ships.push(sub);
        this.ships.push(dest);
    }
    private addCells(arr: BoardCell[], x: number, y: number, s: string) {
        for (let i = 0; i < 10; i++) {
            for (let n = 0; n < 10; n++) {
                arr[i + n * 10] = new BoardCell((i * 50) + x, (n * 50) + y, s);
                arr[i + n * 10].c = (s === "enemy" ? "#8F282F" : "#464478");
            }
        }
    }
    private setEvents() {
        this.canvas.addEventListener("click", (event) => {
            const x = event.pageX - this.canvas.offsetLeft;
            const y = event.pageY - this.canvas.offsetTop;
            if (this.gameState === "setup") {
                this.toggleCell(this.playerCells, x, y);
                this.checkValid();
                if (this.clicks === this.currentShip.size) {
                    this.finalCheck();
                }
                this.checkShipTurn();
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            const x = event.pageX - this.canvas.offsetLeft;
            const y = event.pageY - this.canvas.offsetTop;
            // console.log(`${x}, ${y}`);
            if (this.gameState === "setup") {
                this.hoverEffect(this.playerCells, x, y);
            }
        });
    }
    private finalCheck() {
        let dirc: string;
        const cellCheck = this.playerCells.filter((cell) => cell.part === this.currentShip.name);
        if (cellCheck[0].x === cellCheck[1].x) {
                dirc = "h";
        } else if (cellCheck[0].y === cellCheck[1].y) {
                dirc = "v";
        }
        for (let i = 0, n = 1; i < cellCheck.length - 1; i++, n++) {
            if( dirc = "h" ) {
                if (cellCheck[i].x + 50 === cellCheck[n].x ||
                    cellCheck[i].x - 50 === cellCheck[n].x ) {
                        continue;
                    }
                this.clearInvalid();
                return;
            } else{
                if (cellCheck[i].y + 50 === cellCheck[n].x ||
                    cellCheck[i].y - 50 === cellCheck[n].x ) {
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
                this.gameState = "playing";
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
            } else {
                this.clicks = 0;
                this.ship++;
                this.currentShip = this.ships[this.ship];
                this.shipCells = [];
            }
        }
    }
    private toggleCell(arr: BoardCell[], x: number, y: number) {
        if (this.gameState === "setup") {
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = this.currentShip.name;
                    this.clicks++;
                    console.log(this.shipCells);
                }
            });
        } else {
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = "enemy";
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
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
        arr.forEach((cell) => {
            if (cell.contains(x, y) && cell.part === "empty") {
                this.ctx.fillStyle = "white";
                this.ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            } else if (cell.part === "empty") {
                this.ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
    private exportBoard() {
        return this.playerBoard;
    }
}
