export class Board {
  public board: number[];
  public boardName: string;
  constructor(bn: string) {
    this.boardName = bn;
    this.board = [];
  }
}
