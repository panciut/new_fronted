// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TaskDetailPage from './pages/TaskDetailPage/TaskDetailPage';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage';
import TasksPage from './pages/TasksPage/TasksPage';
import CardListPage from './pages/CardListPage/CardListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/task/:id" element={<TaskDetailPage />} />
        <Route path="/card/:id" element={<CardDetailPage />} />
        <Route path="/cards" element={<CardListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
