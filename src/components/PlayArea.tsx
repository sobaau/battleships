import * as React from "react";
import { IGameProp, IGameState, IMoveListItem, IPlayAreaProp } from "../interface/IGameProp";
import { EnemyCanvas } from "./EnemyCanvas";
import { PlayerCanvas } from "./PlayerCanvas";
import { StatusArea } from "./StatusArea";

export enum GameStatus {
    Setup,
    Playing,
    GameOver,
}

export class PlayArea extends React.Component<IPlayAreaProp, IGameProp> {
    constructor(props: any) {
        super(props);
        this.state = {
            GameState: {
                CurrentShip: null,
                CurrentTurn: null,
                Moves: [],
                GameStatus: GameStatus.Setup,
                ResE: false,
                ResP: false,
                Winner: null,
                PlayerName: this.props.Players.PlayerName,
                EnemyName: this.props.Players.EnemyName,
                EnemyShipsR: 5,
                PlayerShipsR: 5,
                SetupMessages: null,
            },
        };
    }
    public render() {
        console.log("Game State in PlayA");
        console.log(this.state);
        return (
            <div>
                <PlayerCanvas updateGameState={this.updateGameState}
                updateMoves={this.updateMoves}
                GameState={this.state.GameState} />
                <button onClick={this.restartGame}>Rest</button>
                <StatusArea GameState={this.state.GameState} />
                <EnemyCanvas updateGameState={this.updateGameState}
                updateMoves={this.updateMoves}
                GameState={this.state.GameState} />
            </div>
        );
    }
    private updateGameState = (dataFromChild: IGameState) => {
        this.setState((prevState: any) => {
            let GameState: IGameState = { ...prevState.GameState };
            GameState = dataFromChild;
            return { GameState };
        });
    }
    private updateMoves = (moveUpdate: IMoveListItem) => {
        this.setState((prevState: any) => {
            const GameState: IGameState = { ...prevState.GameState };
            GameState.Moves.push(moveUpdate);
            return { GameState };
        });
    }
    private restartGame = () => {
        this.setState((prevState: any) => {
            const GameState: IGameState = { ...prevState.GameState };
            console.log(prevState);
            GameState.CurrentShip = null;
            GameState.CurrentTurn = null;
            GameState.Moves = [];
            GameState.GameStatus = GameStatus.Setup;
            GameState.ResE = false;
            GameState.ResP = false;
            GameState.Winner = null;
            GameState.PlayerName = this.props.Players.PlayerName;
            GameState.EnemyName = this.props.Players.EnemyName;
            GameState.EnemyShipsR = 5;
            GameState.PlayerShipsR = 5;
            GameState.ResE = true;
            GameState.ResP = true;
            return { GameState };
        });
    }
}
