import {BoardCell} from "./BoardCell";
import {Board} from "./Board";

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

    constructor() {
        this.canvas =  document.getElementById("can") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.testCell = new BoardCell(20, 20);
        this.playerBoard = new Board("player");
        this.enemyBoard = new Board("enemy");
        this.enemyCells = new Array(100);
        this.playerCells = new Array(100);
        this.addCells(this.enemyCells, 100, 200);
        this.addCells(this.playerCells, 900, 200);
        this.setEvents();
    }

    public draw(): void {
        this.drawCells(this.enemyCells);
        this.drawCells(this.playerCells);
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    private drawCells(cells: BoardCell[]) {
    cells.forEach((cell) => {
        this.ctx.clearRect(cell.x + 5, cell.y + 5, cell.w - 10 , cell.w - 10);
        this.ctx.fillRect(cell.x + 5, cell.y + 5, cell.w - 10 , cell.w - 10 );
        this.ctx.fillStyle = cell.c;

    });

}
    private addCells(arr: BoardCell[], x: number, y: number) {
        for (let i = 0; i < 10 ; i++ ) {
            for (let n = 0; n < 10; n++) {
                arr[i + n * 10] = new BoardCell((i * 50) + x, (n * 50) + y);
                if (i % 2 === 0){
                    arr[i + n * 10].c = "green";
                } else {
                    arr[i + n * 10].c = "blue";
                }
            }
    }
}
    private setEvents() {
        this.canvas.addEventListener("click", (event) => {
                this.angle = event.clientX;
                this.testCell.x = event.x;
                this.testCell.y = event.y;
                console.log(event);
        });
        this.canvas.addEventListener("mousemove", (event) =>{
            const x = event.pageX - this.canvas.offsetLeft;
            const y = event.pageY - this.canvas.offsetTop;
            this.playerCells.forEach((cell) => {
                if (cell.contains(x,y)) {
                    this.ctx.fillRect(cell.x, cell.y,cell.w,cell.w);
                    this.ctx.fillStyle = "white";
                }
            });
            this.enemyCells.forEach((cell) => {
                    if (cell.contains(x, y)) {
                        this.ctx.fillRect(cell.x,cell.y,cell.w,cell.w);
                        this.ctx.fillStyle = "white";
                    }
            });
        });
        this.canvas.addEventListener("mousedown", (event) =>{
});
    }

    private spinningCube() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate((this.angle * Math.PI) / 180);
        this.ctx.fillStyle = "#4397AC";
        this.ctx.fillRect(-this.width / 4, -this.height / 4, this.width / 2, this.height / 2);
        this.ctx.restore();
    }
}