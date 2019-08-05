import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChatBox} from "./components/ChatBox";
import "./styles/app.scss";
import { PlayArea } from "./components/PlayArea";
import { Chat } from "./components/Chat";

ReactDOM.render(
    <div>
        <PlayArea />
        <Chat />
    </div>, document.getElementById("app"));
