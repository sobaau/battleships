import * as React from "react";
import { EnemyArea as enemy } from "../interface/EnemyArea";
import { PlayerArea as player } from "../interface/PlayerArea";

export class Canvas extends React.Component<any , any> {
    private PlayerBoard: player;
    private enemyBoard: enemy;
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public render() {

        return (
            <div>
                <canvas id="enemy" width="510" height="510" />
                <p>This is a test of </p>
                <canvas id="player" width="510" height="510" />
                <button onClick={this.handleClick}>Rest</button>
            </div>
        );
    }
    public componentDidMount() {
        this.PlayerBoard = new player();
        this.enemyBoard = new enemy();
        this.PlayerBoard.draw();
        this.enemyBoard.draw();
    }
    private handleClick() {
        this.PlayerBoard.startGame();
        this.PlayerBoard.startGame();
}
}
