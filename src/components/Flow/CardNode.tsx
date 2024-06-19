// src/components/Flow/CardNode.tsx
import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CardContainer, CardTitle, StatusDot, ExecuteButton, StatusContainer } from './CardNode.styles';
import executeIcon from '../../assets/execute.svg'; // Adjust the path as necessary
import { executeCard } from '../../services/api';

interface CardNodeProps {
  data: {
    id: string;
    title: string;
    executed: boolean;
    evaluated: boolean;
    inconsistentState: boolean;
    onExecute: (id: string) => void; // Add the onExecute prop
  };
}

const CardNode: React.FC<CardNodeProps> = ({ data }) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      await executeCard(data.id);
      data.onExecute(data.id); // Trigger the onExecute callback
    } catch (error) {
      console.error('Error executing card:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <CardContainer>
      <CardTitle>{data.title}</CardTitle>
      <StatusContainer>
        <ExecuteButton
          onClick={handleExecute}
          data-tooltip="Execute Card"
          disabled={isExecuting}
        >
          <img src={executeIcon} alt="Execute" />
          {isExecuting && <span>Loading...</span>}
        </ExecuteButton>
        <StatusDot status={data.executed ? 'executed' : 'not-executed'} />
      </StatusContainer>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </CardContainer>
  );
};

export default CardNode;
