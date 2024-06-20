// src/pages/TasksPage/TasksPage.tsx
import React from 'react';
import TaskContainer from '../../containers/TaskContainer/TaskContainer';
import { TasksPageContainer, Title, Subtitle } from './TasksPage.styles';

const TasksPage: React.FC = () => {
  return (
    <TasksPageContainer>
      <Title>Tasks</Title>
      <Subtitle>Select a task to view details</Subtitle>
      <TaskContainer />
    </TasksPageContainer>
  );
};

export default TasksPage;
