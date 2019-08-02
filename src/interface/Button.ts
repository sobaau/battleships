export class Button {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public innerText: string;
    constructor(x: number, y: number, w: number, h: number, text: string) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.innerText = text;
    }
    public contains(x: number, y: number): boolean {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }
}
