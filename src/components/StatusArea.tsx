import * as React from "react";
import { IGameProp } from "../interface/IGameProp";

export class StatusArea extends React.Component<IGameProp, IGameProp> {
    constructor(props: any) {
        super(props);
        this.state = {
            GameState: props.GameState,
        };

    }
    public render() {
        console.log(`Props in SA ${this.props}`);
        console.log(`State in SA ${this.state}`);
        return (
            <div className = "StatusArea">
            <PlayingGame GameState={this.props.GameState} />
            </div>
        );
    }

}

export function PlayingGame(props: IGameProp): any {
    if (props.GameState.GameStatus === 0) {
        return <SetupStatus GameState={props.GameState} />;
    } else {
        return (
            <div className = "col-sm">
                <LastMoveStatus GameState={props.GameState} />
                <CurrentTurn GameState={props.GameState} />
            </div>
        );
    }
}
const SetupStatus: React.SFC<IGameProp> = (props: IGameProp) => {
    return <div>Currently Placing: {props.GameState.CurrentShip}</div>;
};

export function LastMoveStatus(props: IGameProp): any {
    return <div>Last Move: {props.GameState.Moves}</div>;
}

export function CurrentTurn(props: IGameProp): any {
    return <div>Currently {props.GameState.CurrentTurn}'s turn.</div>;
}

function MoveList(): any{
    
}