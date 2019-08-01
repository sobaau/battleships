import * as React from "react";

export class Canvas extends React.Component {
    public render() {
        return(
            <div>
                <canvas ref="render" width={800} height={600}></canvas>
            </div>
        )
    }
}
