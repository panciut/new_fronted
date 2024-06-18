// src/pages/TaskDetailPage/TaskDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById } from '../../services/api';
import Flow from '../../components/Flow/Flow';
import { Node, Edge } from 'react-flow-renderer';

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

  const nodes: Node[] = task.cards.map((card: any, index: number) => ({
    id: card._id,
    data: { label: card.title },
    position: { x: 100 * index, y: 100 }, // Adjust the positioning as needed
    draggable: true,
  }));

  const edges: Edge[] = [];

  task.cards.forEach((card: any) => {
    // Create edges for nextCards
    card.nextCards.forEach((nextCardId: string) => {
      edges.push({
        id: `e${card._id}-${nextCardId}`,
        source: card._id,
        target: nextCardId,
        animated: true,
        style: { stroke: '#000' },
      });
    });

    // Create edges for previousCards
    Object.keys(card.previousCards).forEach((prevCardId: string) => {
      edges.push({
        id: `e${prevCardId}-${card._id}`,
        source: prevCardId,
        target: card._id,
        animated: true,
        style: { stroke: '#000' },
      });
    });
  });

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.objective}</p>
      <Flow initialNodes={nodes} initialEdges={edges} />
    </div>
  );
};

export default TaskDetailPage;
