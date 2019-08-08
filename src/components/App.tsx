import * as React from "react";

import { IPlayers } from "../interface/IGameProp";
import { Chat } from "./Chat";
import { PlayArea } from "./PlayArea";

export default class App extends React.Component<any> {
    private players: IPlayers = {
        PlayerName: "Player",
        EnemyName: "Enemy",
    };
  public render() {
    return (
      <div>
        <PlayArea Players={this.players}/>
        <Chat />
      </div>
    );
  }
  private getDetails(name: string) {
    this.players.PlayerName = name;
  }
  private getEnemyDetails(name: string) {
      this.players.EnemyName = name;
  }
}
