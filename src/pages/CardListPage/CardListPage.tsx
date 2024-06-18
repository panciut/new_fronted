// src/pages/CardListPage/CardListPage.tsx
import React from 'react';
import CardContainer from '../../containers/CardContainer/CardContainer';
import { CardListPageContainer } from './CardListPage.styles';

const CardListPage: React.FC = () => {
  return (
    <CardListPageContainer>
      <h1>All Cards</h1>
      <CardContainer />
    </CardListPageContainer>
  );
};

export default CardListPage;
