// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CardPage from './pages/CardPage/CardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
