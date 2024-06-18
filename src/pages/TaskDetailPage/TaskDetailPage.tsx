// src/pages/TaskDetailPage/TaskDetailPage.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskById } from '../../services/api';
import Flow from '../../components/Flow/Flow';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import { Node, Edge } from 'react-flow-renderer';
import { Button, OptionsBar, TaskInfo, ContentContainer, PageContainer } from './TaskDetailPage.styles';
import DraggablePopover from '../../components/DraggablePopover/DraggablePopover'; // Import the new component

const edgeOptions = {
  animated: true,
  style: { stroke: '#000' },
  arrowHeadType: 'arrowclosed',
};

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopovers, setOpenPopovers] = useState<string[]>([]); // State for open popovers

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
    fetchTaskData();
  };

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setOpenPopovers((prev) => [...prev, node.id]);
  }, []);

  const handleClosePopover = (cardId: string) => {
    setOpenPopovers((prev) => prev.filter((id) => id !== cardId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const nodes: Node[] = task.cards.map((card: any, index: number) => ({
    id: card._id,
    data: {
      title: card.title,
      executed: card.executed,
      evaluated: card.evaluated,
      inconsistentState: card.inconsistentState,
    },
    position: { x: 200 * index, y: 100 },
    type: 'cardNode',
    draggable: true,
  }));

  const edges: Edge[] = [];

  task.cards.forEach((card: any) => {
    if (Array.isArray(card.nextCards)) {
      card.nextCards.forEach((nextCardId: string) => {
        edges.push({
          id: `e${card._id}-${nextCardId}`,
          source: card._id,
          target: nextCardId,
          ...edgeOptions,
        });
      });
    }

    if (Array.isArray(card.previousCards)) {
      card.previousCards.forEach((prevCardId: string) => {
        edges.push({
          id: `e${prevCardId}-${card._id}`,
          source: prevCardId,
          target: card._id,
          ...edgeOptions,
        });
      });
    } else if (typeof card.previousCards === 'object') {
      Object.keys(card.previousCards).forEach((prevCardId: string) => {
        edges.push({
          id: `e${prevCardId}-${card._id}`,
          source: prevCardId,
          target: card._id,
          ...edgeOptions,
        });
      });
    }
  });

  return (
    <PageContainer>
      <OptionsBar>
        <TaskInfo>
          <h1>{task.name}</h1>
          <p>{task.objective}</p>
        </TaskInfo>
        <Button onClick={() => setIsModalOpen(true)}>Add Card</Button>
      </OptionsBar>
      <ContentContainer>
        <Flow initialNodes={nodes} initialEdges={edges} onNodeClick={handleNodeClick} /> {/* Pass the onNodeClick handler */}
      </ContentContainer>
      <AddCardModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        taskId={task._id}
        currentCards={task.cards}
        onCardCreated={handleCardCreated}
      />
      {openPopovers.map((cardId, index) => (
        <DraggablePopover
          key={cardId}
          cardId={cardId}
          onRequestClose={() => handleClosePopover(cardId)}
          index={index} // Pass the index to position the popovers
        />
      ))}
    </PageContainer>
  );
};

export default TaskDetailPage;
