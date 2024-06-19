// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomePageContainer, Button, Title, Subtitle } from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomePageContainer>
      <Title>Welcome to the Task Management System</Title>
      <Subtitle>Select an option to get started</Subtitle>
      <Button onClick={() => navigate('/tasks')}>
        View Tasks
      </Button>
    </HomePageContainer>
  );
};

export default HomePage;
