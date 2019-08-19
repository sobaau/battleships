import * as React from 'react';
import StatusMessage from './StatusMessage';
import { IMoveListItem } from '../../interface/IGameProp';

export interface IStatusBoxProps {}

export default class StatusBox extends React.Component<any, any> {
  public render(): JSX.Element {
    const messages: IMoveListItem[] = this.props.messages.map((message, i) => {
      return <StatusMessage key={i} player={message.Player} move={message.Move} />;
    });
    return (
      <div className="status-messages" id="status-list">
        {messages}
      </div>
    );
  }
  componentDidUpdate(): void {
    const objDiv = document.getElementById('status-list');
    objDiv.scrollTop = objDiv.scrollHeight;
  }
}
