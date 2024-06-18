// src/containers/TaskContainer/TaskContainer.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks } from '../../services/api';
import './TaskContainer.css';

interface Task {
  _id: string;
  name: string;
  objective: string;
}

const TaskContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="task-container">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="task"
          onClick={() => navigate(`/task/${task._id}`)}
        >
          <h2>{task.name}</h2>
          <p>{task.objective}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskContainer;
