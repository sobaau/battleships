import { Board } from "./Board";
import { BoardCell } from "./BoardCell";

export class EnemyArea {
    public angle = 0;
    public canvas: HTMLCanvasElement;
    public ctx: any;
    public enemyBoard: Board;
    public lastMoveResult: string;
    private enemyCells: BoardCell[];
    private gameState = "start";
    private tempBoard: number[];
    private shipCount: Map<string, number>;
    private shipsRemaining = 5;
    constructor() {
        this.canvas = document.getElementById("enemy") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.setEvents();
        this.startGame();
        this.setTempBoard();
    }

    public draw() {
        this.drawCells(this.enemyCells);
        this.checkStatus();
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    public startGame() {
        console.log("start");
        this.gameState = "start";
        this.enemyBoard = new Board("enemy");
        this.enemyCells = new Array(100);
        this.addCells(this.enemyCells, 0, 0, "enemy");
    }
    private checkStatus(){
        if (this.shipsRemaining === 0){
            console.log("Player Wins!");
        };
    }
    private drawCells(cells: BoardCell[]) {
        cells.forEach((cell) => {
                this.ctx.fillStyle = cell.c;
                this.ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
        });
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
            if (this.gameState !== "setup") {
                this.toggleCell(this.enemyCells, x, y);
            }
        });

        this.canvas.addEventListener("mousemove", (event) => {
            const x = event.pageX - this.canvas.offsetLeft;
            const y = event.pageY - this.canvas.offsetTop;
            console.log(`${x}, ${y}`);
            if (this.gameState !== "setup" && this.gameState !== "over") {
                this.hoverEffect(this.enemyCells, x, y);
            }
        });
    }
    private toggleCell(arr: BoardCell[], x: number, y: number) {
        arr.forEach((cell) => {
            if (cell.contains(x, y)) {
                if ( cell.part !== "empty" && !cell.hit) {
                    cell.c = "red";
                    this.lastMoveResult = "Hit!";
                    cell.hit = true;
                    this.shipCount.set(cell.part, this.shipCount.get(cell.part) - 1);
                    if(this.shipCount.get(cell.part) === 0) {
                        console.log(`${cell.part} Was sunk`);
                        this.shipsRemaining--;
                        console.log(this.shipsRemaining)
                        if(this.shipsRemaining === 0){
                            this.gameState = "over";
                        }
                    }
                }else if(cell.part === "empty") {
                    cell.c = "white";
                    this.lastMoveResult = "Miss!";
                    cell.hit = true;

                }
            }
        });
    }
    private setTempBoard() {
        this.tempBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0 , 0 ,
                          0, 0, 0, 0, 1, 1, 1, 1, 1 , 0 ,
                          0, 0, 0, 0, 0, 0, 0, 0, 0 , 0 ,
                          0, 0, 0, 0, 0, 0, 0, 0, 0 , 0 ,
                          0, 0, 0, 0, 0, 0, 0, 0, 0 , 0 ,
                          4, 4, 4, 0, 0, 0, 2, 2, 2 , 2 ,
                          0, 0, 0, 0, 0, 0, 0, 0, 0 , 0 ,
                          0, 0, 0, 3, 3, 3, 0, 0, 0 , 0 ,
                          0, 0, 0, 0, 0, 0, 5, 0, 0 , 0 ,
                          0, 0, 0, 0, 0, 0, 5, 0, 0 , 0];
        for (let i = 0 ; i < this.tempBoard.length; i++) {
            if (this.tempBoard[i] == 0) {
                this.enemyCells[i].part = "empty";
            } else if (this.tempBoard[i] == 1) {
                this.enemyCells[i].part = "Carrier";
            } else if (this.tempBoard[i] == 2) {
                this.enemyCells[i].part = "Battleship";
            } else if (this.tempBoard[i] == 3) {
                this.enemyCells[i].part = "Cruiser";
            } else if (this.tempBoard[i] == 4) {
                this.enemyCells[i].part = "Submarine";
            } else {
                this.enemyCells[i].part = "Destroyer";
            }
        }
        this.shipCount = new Map();
        this.shipCount.set("Carrier", 5);
        this.shipCount.set("Battleship", 4);
        this.shipCount.set("Cruiser", 3);
        this.shipCount.set("Submarine", 3);
        this.shipCount.set("Destroyer", 2);
    }
    private hoverEffect(arr: BoardCell[], x: number, y: number) {
        arr.forEach((cell) => {
            if (cell.contains(x, y) ) {
                this.ctx.fillStyle = "white";
                this.ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            } else  {
                this.ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
}
