import { IShip } from './IShip';

export class Ship implements IShip {
  public size: number;
  public name: string;
  public orientation: string;
  public c: string;
  constructor(n: string, s: number, c: string) {
    this.size = s;
    this.name = n;
    this.c = c;
  }
}
