import { BoardCell } from "./BoardCell";
import { Board } from "./Board";
import { Button } from "./Button";
import { Ship } from "./Ship";
export class CanvasArea {
    public angle = 0;
    public canvas: HTMLCanvasElement;
    public ctx: any;
    public width: number;
    public height: number;
    public testCell: BoardCell;
    public playerBoard: Board;
    public enemyBoard: Board;
    private playerCells: BoardCell[];
    private enemyCells: BoardCell[];
    private currentShip: Ship;
    private shipCells: BoardCell[] = [];
    private ships: Ship[];
    private buttons: Button[]
    private clicks = 0;
    private ship = 0;
    private gameState = "setup";
    constructor() {
        this.canvas = document.getElementById("can") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.playerBoard = new Board("player");
        this.enemyBoard = new Board("enemy");
        this.enemyCells = new Array(100);
        this.playerCells = new Array(100);
        this.addCells(this.enemyCells, 100, 200, "enemy");
        this.addCells(this.playerCells, 900, 200, "player");
        this.setEvents();
        this.buttons = [];
        this.createShipList();
        this.createButtons();
        this.currentShip = this.ships[this.ship];
    }

    public draw(): void {
        this.drawCells(this.enemyCells);
        this.drawCells(this.playerCells);
        this.drawButtons();
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    private drawCells(cells: BoardCell[]) {
        cells.forEach((cell) => {
            if (cell.part === "empty") {
                this.ctx.fillStyle = cell.c;
                this.ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            } else if (cell.part != "empty") {
                this.ships.forEach((ship) => {
                    if (ship.name == cell.part) {
                        this.ctx.fillStyle = ship.c;
                    }
                })
                this.ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w- 2)
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
        console.log(this.ships);

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
            if (this.gameState === 'setup') {
                this.toggleCell(this.playerCells, x, y)
                this.checkValid();
                this.checkShipTurn();
            } else {
                this.toggleCell(this.enemyCells, x, y)
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            const x = event.pageX - this.canvas.offsetLeft;
            const y = event.pageY - this.canvas.offsetTop;
            if (this.gameState === 'setup') {
                this.hoverEffect(this.playerCells, x, y);
            } else {
                this.hoverEffect(this.enemyCells, x, y);
            }
        });

        this.canvas.addEventListener("mousedown", (event) => {

        });
    }
    private checkShipTurn() {
        if (this.shipCells.length === this.currentShip.size) {
            if (this.currentShip.name === "Destroyer") {
                this.gameState = "playing"
                this.playerBoard = new Board("player");
                this.playerCells.forEach((cell)=>{
                    if(cell.part == "empty"){
                        this.playerBoard.board.push(0)
                    }else if(cell.part == "Carrier"){
                        this.playerBoard.board.push(1)
                    }else if(cell.part == "Battleship"){
                        this.playerBoard.board.push(2)
                    }else if(cell.part == "Cruiser"){
                        this.playerBoard.board.push(3)
                    }else if(cell.part == "Submarine"){
                        this.playerBoard.board.push(4)
                    }else{
                        this.playerBoard.board.push(5)
                    }
                });
                console.log(this.playerBoard.board)
            } else {
                this.clicks = 0;
                this.ship++
                this.currentShip = this.ships[this.ship]
                this.shipCells = [];
            }
        }
    }
    private createButtons() {
        const restBtn = new Button(30, 30, 20, 30, "Rest");
        const shipBtn = new Button(900, 150, 110, 30, "Battleship")
        this.buttons.push(shipBtn);
    }
    private drawButtons() {
        this.buttons.forEach((b) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = "gray";
            this.ctx.fillRect(b.x, b.y - 30, b.w + 10, b.h + 30);
            this.ctx.fillStyle = "black"
            this.ctx.font = "20px Arial";
            if(this.gameState === 'setup'){
                this.ctx.fillText("Current ship:", b.x + 2, b.y - 10);
                this.ctx.fillText(this.currentShip.name, b.x + 2, b.y + 23)
            }else{
                this.ctx.fillText("Current Player:", b.x + 2, b.y - 10);
                this.ctx.fillText("test", b.x + 2, b.y + 23)
            }

            this.ctx.stroke();
        })
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
        }else{
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = "enemy";
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(cell.x, cell.y, cell.w, cell.w)
                    this.clicks++;
                    console.log(this.shipCells);
                }
            });
        }

    }
    private checkValid() {
        if (!this.checkValidCell())
            this.clearInvalid();
    }
    private clearInvalid() {
        console.log('Invalid')
        this.playerCells.forEach((cell) => {
            if (cell.part === this.currentShip.name) {
                cell.part = "empty";
            }
        })
        this.shipCells = [];
        this.clicks = 0;
    }
    private checkValidCell() {
        let dirc: string;
        if (this.shipCells.length === 1) {
            return true;

        } else if (this.shipCells.length > 1) {
            if (this.shipCells[0].x === this.shipCells[1].x) {
                dirc = "h"
            } else if (this.shipCells[0].y === this.shipCells[1].y) {
                dirc = "v"
            } else {
                return false;
            }

            for (let i = 0; i < this.shipCells.length; i++) {
                console.log(this.shipCells[0].x + 50)
                if (dirc == "h") {
                    if (this.shipCells[0].x !== this.shipCells[i].x) {
                        return false;
                    }
                } else if (dirc == "v") {
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
            if (cell.contains(x, y) && cell.part == "empty") {
                this.ctx.fillStyle = "white";
                this.ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            } else if (cell.part == "empty") {
                this.ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
}