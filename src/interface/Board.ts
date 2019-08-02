export class Board {
    public board: number[];
    public boardName: string;
        constructor(bn: string) {
            this.boardName = bn;
            this.board = [];
    }
    public newBoard() {
        for (let i = 0; i < 100; i++) {
            this.board[i] = 0;
        }
        this.board[0 + 9 * 10] = 1;
    }
}
