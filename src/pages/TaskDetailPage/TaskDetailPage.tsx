// src/pages/TaskDetailPage/TaskDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById } from '../../services/api';
import Card from '../../components/Card/Card';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getTask = async () => {
        try {
          const data = await fetchTaskById(id);
          setTask(data);
        } catch (err) {
          setError('Failed to fetch task. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      getTask();
    } else {
      setLoading(false);
      setError('Task ID is missing.');
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.objective}</p>
      <div className="card-container">
        {task.cards.map((card: any) => (
          <div key={card._id} onClick={() => navigate(`/card/${card._id}`)}>
            <Card
              title={card.title}
              objective={card.objective}
              hasOutput={!!card.output}
              executed={card.executed}
              evaluated={card.evaluated}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetailPage;
