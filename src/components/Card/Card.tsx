// src/components/Card/Card.tsx

import React from 'react';
import { CardContainer, CardTitle, StatusDot, InconsistentStateMessage } from './Card.styles';

interface CardProps {
  title: string;
  objective: string;
  executed: boolean;
  evaluated: boolean;
  inconsistentState: boolean;
}

const Card: React.FC<CardProps> = ({ title, objective, executed, evaluated, inconsistentState }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <p>{objective}</p>
      <div>
        <p>Status:</p>
        <StatusDot status={executed ? 'executed' : 'not-executed'} />
        <span>Executed</span>
        <StatusDot status={evaluated ? 'evaluated' : 'not-evaluated'} />
        <span>Evaluated</span>
        {inconsistentState && <InconsistentStateMessage>Inconsistent State</InconsistentStateMessage>}
      </div>
    </CardContainer>
  );
};

export default Card;
