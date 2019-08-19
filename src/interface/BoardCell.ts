export class BoardCell {
  public x: number;
  public y: number;
  public h: number;
  public w: number;
  public c: string;
  public part: string;
  public owner: string;
  public hover = false;
  public hit = false;
  constructor(x: number, y: number, o: string) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.part = 'empty';
    this.owner = o;
  }
  public contains(x: number, y: number): boolean {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
  }
}
