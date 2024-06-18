// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomePageContainer, Button } from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomePageContainer>
      <h1>Home Page</h1>
      <Button onClick={() => navigate('/tasks')}>
        View Tasks
      </Button>
      <Button onClick={() => navigate('/cards')}>
        View All Cards
      </Button>
    </HomePageContainer>
  );
};

export default HomePage;
