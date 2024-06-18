// src/pages/TasksPage/TasksPage.tsx
import React from 'react';
import TaskContainer from '../../containers/TaskContainer/TaskContainer';

const TasksPage: React.FC = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <TaskContainer />
    </div>
  );
};

export default TasksPage;
