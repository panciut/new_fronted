// src/components/Flow/CardNode.tsx

import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CardContainer, CardTitle, StatusDot, InconsistentStateMessage, ExecuteButton } from './CardNode.styles';

interface CardNodeProps {
  data: {
    title: string;
    executed: boolean;
    evaluated: boolean;
    inconsistentState: boolean;
  };
}

const CardNode: React.FC<CardNodeProps> = ({ data }) => {
  const handleExecute = () => {
    // Handle execute button click
    console.log(`Executing card: ${data.title}`);
  };

  return (
    <CardContainer>
      <CardTitle>{data.title}</CardTitle>
      <div>
        <StatusDot status={data.executed ? 'executed' : 'not-executed'} />
        <span>EX</span>
        <StatusDot status={data.evaluated ? 'evaluated' : 'not-evaluated'} />
        <span>EV</span>
        {data.inconsistentState && <InconsistentStateMessage>Inconsistent State</InconsistentStateMessage>}
      </div>
      <ExecuteButton onClick={handleExecute}>Execute</ExecuteButton>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </CardContainer>
  );
};

export default CardNode;
