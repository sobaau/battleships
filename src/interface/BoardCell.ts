//import {IDrawAble} from "./IDrawAble";

export class BoardCell  {

    public x: number;    public y: number;
    public h: number;
    public w: number;
    public m : boolean;
    public c : string ;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    public contains(x: number, y: number): boolean {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }
}
