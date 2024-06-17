// src/pages/CardPage/CardPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const CardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Card Page {id}</h1>
    </div>
  );
};

export default CardPage;
