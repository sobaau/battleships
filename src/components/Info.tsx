import * as React from 'react';

interface InfoProps {};

interface InfoState {};

class Info extends React.Component<InfoProps, InfoState> {
    public render(): JSX.Element {
        return (<span>ComponentName</span>);
    }
}

export default Info;
