import React from 'react';

interface Props {
  currentTurn: string;
}

export const StatusTurn: React.FC<Props> = (props: Props): JSX.Element => {
  return <div className="current-turn">{props.currentTurn}'s Turn</div>;
};
