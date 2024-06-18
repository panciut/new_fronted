// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <button className="tasks-button" onClick={() => navigate('/tasks')}>
        View Tasks
      </button>
      <button className="cards-button" onClick={() => navigate('/cards')}>
        View All Cards
      </button>
    </div>
  );
};

export default HomePage;
