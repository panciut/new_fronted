// src/components/Card/Card.tsx
import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  objective: string;
  hasOutput: boolean;
}

const Card: React.FC<CardProps> = ({ title, objective, hasOutput }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{objective}</p>
      <p>{hasOutput ? 'Has Output' : 'No Output'}</p>
    </div>
  );
};

export default Card;
