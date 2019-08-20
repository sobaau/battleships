import * as React from 'react';

interface InfoProps {}

interface InfoState {}

class Info extends React.Component<InfoProps, InfoState> {
  public render(): JSX.Element {
    return <span>Info Area</span>;
  }
}

export default Info;
