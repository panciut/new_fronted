// src/components/Card/Card.tsx
import React from 'react';
import { CardContainer, CardTitle } from './Card.styles';

interface CardProps {
  title: string;
  objective: string;
  hasOutput: boolean;
  executed: boolean;
  evaluated: boolean;
}

const Card: React.FC<CardProps> = ({ title, objective, hasOutput, executed, evaluated }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <p>{objective}</p>
      <p>{hasOutput ? 'Has Output' : 'No Output'}</p>
      <p>{executed ? 'Executed' : 'Not Executed'}</p>
      <p>{evaluated ? 'Evaluated' : 'Not Evaluated'}</p>
    </CardContainer>
  );
};

export default Card;
