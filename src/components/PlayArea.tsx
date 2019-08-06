import * as React from "react";
import { EnemyCanvas } from "./EnemyCanvas";
import { PlayerCanvas } from "./PlayerCanvas";
import { StatusArea } from "./StatusArea";

export enum GameStatus {
    Setup,
    Playing,
    GameOver,
}

export class PlayArea extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            GameState: {
                CurrentShip: null,
                CurrentTurn: null,
                LastMove: null,
                GameStatus: GameStatus.Setup,
                ResE: false,
                ResP: false,

            },
        };
    }
    public handle = (dataFromChild: any) => {
        this.setState({ GameState: dataFromChild });
    }
    public handleClick = () => {
        this.setState((prevState: any) => {
            let GameState = { ...prevState.GameState };
            GameState.ResE = true;
            GameState.ResP = true;
            return { GameState };
        });
    }
    public render() {
        console.log("Game State in PlayA");
        console.log(this.state);
        return (
            <div>
                <PlayerCanvas update={this.handle} GameState={this.state.GameState} />
                <button onClick={this.handleClick}>Rest</button>
                <StatusArea GameState={this.state.GameState} />
                <EnemyCanvas update={this.handle} GameState={this.state.GameState} />
            </div>
        );
    }
}
