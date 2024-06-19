// src/components/Flow/CardNode.tsx
import React from 'react';
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
  };
}

const CardNode: React.FC<CardNodeProps> = ({ data }) => {
  const handleExecute = async () => {
    try {
      await executeCard(data.id);
      // Handle success, e.g., update state or show notification
    } catch (error) {
      console.error('Error executing card:', error);
    }
  };

  return (
    <CardContainer>
      <CardTitle>{data.title}</CardTitle>
      <StatusContainer>
        <ExecuteButton onClick={handleExecute}>
          <img src={executeIcon} alt="Execute" />
        </ExecuteButton>
        <StatusDot status={data.executed ? 'executed' : 'not-executed'} />
      </StatusContainer>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </CardContainer>
  );
};

export default CardNode;
