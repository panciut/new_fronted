// src/pages/CardListPage/CardListPage.tsx
import React from 'react';
import CardContainer from '../../containers/CardContainer/CardContainer';
import './CardListPage.css';

const CardListPage: React.FC = () => {
  return (
    <div className="card-list-page">
      <h1>All Cards</h1>
      <CardContainer />
    </div>
  );
};

export default CardListPage;
