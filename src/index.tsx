import * as React from "react";
import * as ReactDOM from "react-dom";
import {Canvas} from "./components/canvas";
import {ChatBox} from "./components/chat";
import {Board} from "./interface/Board";
import "./styles/app.css";


ReactDOM.render(
    <div>
        <Canvas />
        <ChatBox />
    </div>, document.getElementById("app"));
