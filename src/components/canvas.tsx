import * as React from "react";
import {CanvasArea as Can} from "../interface/CanvasArea";

export class Canvas extends React.Component {
    public render() {
        return (
        <div>
        <canvas id="can" width="1500" height="850"  />
        </div>
        );
    }
    public componentDidMount() {
    const render = new Can();
    render.draw();
    }
}
