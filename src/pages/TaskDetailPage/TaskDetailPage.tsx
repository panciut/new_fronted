// src/pages/TaskDetailPage/TaskDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../../services/api';
import Flow from '../../components/Flow/Flow';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import { Node, Edge } from 'react-flow-renderer';
import { Button } from './TaskDetailPage.styles';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTaskData = async () => {
    if (id) {
      try {
        const data = await fetchTaskById(id);
        setTask(data);
      } catch (err) {
        setError('Failed to fetch task. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('Task ID is missing.');
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [id]);

  const handleCardCreated = () => {
    fetchTaskData(); // Refresh the task data after a new card is created
  };

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
    // Create edges for nextCards if they exist
    if (Array.isArray(card.nextCards)) {
      card.nextCards.forEach((nextCardId: string) => {
        edges.push({
          id: `e${card._id}-${nextCardId}`,
          source: card._id,
          target: nextCardId,
          animated: true,
          style: { stroke: '#000' },
        });
      });
    }

    // Create edges for previousCards if they exist
    if (Array.isArray(card.previousCards)) {
      card.previousCards.forEach((prevCardId: string) => {
        edges.push({
          id: `e${prevCardId}-${card._id}`,
          source: prevCardId,
          target: card._id,
          animated: true,
          style: { stroke: '#000' },
        });
      });
    } else if (typeof card.previousCards === 'object') {
      Object.keys(card.previousCards).forEach((prevCardId: string) => {
        edges.push({
          id: `e${prevCardId}-${card._id}`,
          source: prevCardId,
          target: card._id,
          animated: true,
          style: { stroke: '#000' },
        });
      });
    }
  });

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.objective}</p>
      <Button onClick={() => setIsModalOpen(true)}>Add Card</Button>
      <Flow initialNodes={nodes} initialEdges={edges} />
      <AddCardModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        taskId={task._id}
        currentCards={task.cards}
        onCardCreated={handleCardCreated}
      />
    </div>
  );
};

export default TaskDetailPage;
