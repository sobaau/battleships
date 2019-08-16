import * as React from 'react';
import { Board } from '../../interface/Board';
import { BoardCell } from '../../interface/BoardCell';
import { ICanvas, IMoveListItem } from '../../interface/IGameProp';
import { GameStatus } from '../PlayArea';

interface IGameState {
    GameStatus: GameStatus;
    CurrentTurn: string;
    screen: {
        width: number;
        height: number;
    };
    ctx?: CanvasRenderingContext2D;
}
export class EnemyCanvas extends React.Component<ICanvas, IGameState> {
    public enemyBoard: Board;
    public lastMoveResult: string;
    private enemyCells: BoardCell[];
    private tempBoard: number[];
    private shipCount: Map<string, number>;
    private shipsRemaining = 5;
    private height = 510;
    private width = 510;
    private canvasRef = React.createRef<HTMLCanvasElement>();
    constructor(props: any) {
        super(props);
        this.state = {
            GameStatus: props.GameState.GameStatus,
            CurrentTurn: props.GameState.CurrentTurn,
            screen: {
                width: this.width,
                height: this.height,
            },
            ctx: null,
        };
        this.enemyBoard = new Board('enemy');
        this.enemyCells = new Array(100);
        this.enemyCells = this.addCells(0, 0, 'enemy');
        this.tempBoard = [];
        this.setTempBoard();
    }

    public render(): JSX.Element {
        console.log('Props in E ');
        console.log(this.props);
        return (
            <div className="canvas enemy">
                <canvas id="enemyC" ref={this.canvasRef} width="510" height="510" />
            </div>
        );
    }
    public componentDidMount(): void {
        const ctx = this.canvasRef.current.getContext('2d');
        this.setState({ ctx });
        this.startGame();
        this.setEvents();
        requestAnimationFrame(() => {
            this.update();
        });
    }
    private update(): void {
        if (this.props.GameState.ResE) {
            this.startGame();
            this.props.GameState.ResE = false;
            this.props.updateGameState(this.props.GameState);
        }
        this.drawCells(this.enemyCells);
        this.checkStatus();
        requestAnimationFrame(() => {
            this.update();
        });
    }
    private checkStatus(): void {
        if (this.shipsRemaining === 0) {
            console.log('Player Wins!');
            this.props.GameState.GameStatus = 3;
            this.props.GameState.Winner = 'Player Wins!';
            this.props.updateGameState(this.props.GameState);
        }
    }

    private setEvents(): void {
        const canvas = this.canvasRef.current;
        canvas.addEventListener('click', event => {
            const x = event.clientX - canvas.getBoundingClientRect().left;
            const y = event.clientY - canvas.getBoundingClientRect().top;
            if (this.props.GameState.GameStatus === 1 && this.props.GameState.CurrentTurn === 'Player') {
                this.toggleCell(this.enemyCells, x, y);
            }
        });

        this.canvasRef.current.addEventListener('mousemove', event => {
            const x = event.clientX - canvas.getBoundingClientRect().left;
            const y = event.clientY - canvas.getBoundingClientRect().top;
            // console.log(`${x}, ${y}`);
            if (this.props.GameState.GameStatus === 1) {
                this.hoverEffect(this.enemyCells, x, y);
            }
        });
    }
    private startGame(): void {
        console.log('start in enm');
        this.setState({
            GameStatus: GameStatus.Setup,
        });
        this.enemyBoard = new Board('enemy');
        this.enemyCells = new Array(100);
        this.enemyCells = this.addCells(0, 0, 'enemy');
        this.setTempBoard();
    }

    private drawCells(cells: BoardCell[]): void {
        const ctx = this.state.ctx;
        cells.forEach(cell => {
            ctx.fillStyle = cell.c;
            ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
        });
    }
    private addCells(x: number, y: number, s: string): BoardCell[] {
        const narr: BoardCell[] = new Array(100);
        for (let i = 0; i < 10; i++) {
            for (let n = 0; n < 10; n++) {
                narr[i + n * 10] = new BoardCell(i * 50 + x, n * 50 + y, s);
                narr[i + n * 10].c = s === 'enemy' ? '#8F282F' : '#464478';
            }
        }
        return narr;
    }
    private toggleCell(arr: BoardCell[], x: number, y: number): void {
        arr.forEach(cell => {
            if (cell.contains(x, y)) {
                if (cell.part !== 'empty' && !cell.hit) {
                    cell.c = 'red';
                    this.lastMoveResult = 'Hit!';
                    const move: IMoveListItem = {
                        Player: 'Enemy',
                        Move: `Hit!`,
                    };
                    cell.hit = true;
                    this.shipCount.set(cell.part, this.shipCount.get(cell.part) - 1);
                    if (this.shipCount.get(cell.part) === 0) {
                        console.log(`${cell.part} Was sunk`);
                        move.Player = 'Enemy';
                        move.Move = `${cell.part} was sunk`;
                        this.shipsRemaining--;
                        console.log(this.shipsRemaining);
                        if (this.shipsRemaining === 0) {
                            this.setState({
                                GameStatus: GameStatus.GameOver,
                            });
                            this.props.GameState.GameStatus = GameStatus.GameOver;
                        }
                    }
                    this.props.updateMoves(move);
                    this.props.GameState.CurrentTurn = 'Enemy';
                    this.props.updateGameState(this.props.GameState);
                } else if (cell.part === 'empty' && !cell.hit) {
                    cell.c = 'white';
                    const move: IMoveListItem = {
                        Player: 'Enemy',
                        Move: 'Miss!',
                    };
                    this.props.updateMoves(move);
                    cell.hit = true;
                    this.props.GameState.CurrentTurn = 'Enemy';
                    this.props.updateGameState(this.props.GameState);
                }
            }
        });
    }

    private setTempBoard(): void {
        this.tempBoard = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            4,
            4,
            4,
            0,
            0,
            0,
            2,
            2,
            2,
            2,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            3,
            3,
            3,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            5,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            5,
            0,
            0,
            0,
        ];
        for (let i = 0; i < this.tempBoard.length; i++) {
            if (this.tempBoard[i] == 0) {
                this.enemyCells[i].part = 'empty';
            } else if (this.tempBoard[i] == 1) {
                this.enemyCells[i].part = 'Carrier';
            } else if (this.tempBoard[i] == 2) {
                this.enemyCells[i].part = 'Battleship';
            } else if (this.tempBoard[i] == 3) {
                this.enemyCells[i].part = 'Cruiser';
            } else if (this.tempBoard[i] == 4) {
                this.enemyCells[i].part = 'Submarine';
            } else {
                this.enemyCells[i].part = 'Destroyer';
            }
        }
        this.shipCount = new Map();
        this.shipCount.set('Carrier', 5);
        this.shipCount.set('Battleship', 4);
        this.shipCount.set('Cruiser', 3);
        this.shipCount.set('Submarine', 3);
        this.shipCount.set('Destroyer', 2);
    }

    private hoverEffect(arr: BoardCell[], x: number, y: number): void {
        const ctx = this.state.ctx;
        arr.forEach(cell => {
            if (cell.contains(x, y)) {
                ctx.fillStyle = 'white';
                ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            } else {
                ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
}