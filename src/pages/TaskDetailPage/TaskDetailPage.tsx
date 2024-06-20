// src/pages/TaskDetailPage/TaskDetailPage.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskById, executeCard } from '../../services/api';
import Flow from '../../components/Flow/Flow';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import { Node, Edge } from 'react-flow-renderer';
import { Button, OptionsBar, TaskInfo, ContentContainer, PageContainer } from './TaskDetailPage.styles';
import DraggablePopover from '../../components/DraggablePopover/DraggablePopover';

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
  const [openPopovers, setOpenPopovers] = useState<string[]>([]); // Allow multiple popovers but not duplicates
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const fetchTaskData = async () => {
    if (id) {
      try {
        const data = await fetchTaskById(id);
        setTask(data);

        const newNodes = data.cards.map((card: any, index: number) => ({
          id: card._id,
          data: {
            id: card._id, // Ensure ID is passed here
            title: card.title,
            executed: card.executed,
            inconsistentState: card.inconsistentState,
            onExecute: handleExecute, // Pass the handleExecute function
            onDelete: handleDelete, // Pass the handleDelete function
            onCardUpdate: handleCardUpdate, // Pass the handleCardUpdate function
          },
          position: { x: 200 * index, y: 100 },
          type: 'cardNode',
          draggable: true,
        }));
        setNodes(newNodes);

        const newEdges: Edge[] = [];
        data.cards.forEach((card: any) => {
          if (typeof card.nextCards === 'object') {
            Object.keys(card.nextCards).forEach((nextCardId: string) => {
              newEdges.push({
                id: `e${card._id}-${nextCardId}`,
                source: card._id,
                target: nextCardId,
                ...edgeOptions,
              });
            });
          }

          if (typeof card.previousCards === 'object') {
            Object.keys(card.previousCards).forEach((prevCardId: string) => {
              newEdges.push({
                id: `e${prevCardId}-${card._id}`,
                source: prevCardId,
                target: card._id,
                ...edgeOptions,
              });
            });
          }
        });
        setEdges(newEdges);
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
    if (!openPopovers.includes(node.id)) {
      setOpenPopovers((prev) => [...prev, node.id]);
    }
  }, [openPopovers]);

  const handleClosePopover = (cardId: string) => {
    setOpenPopovers((prev) => prev.filter((id) => id !== cardId));
  };

  const handleExecute = async (cardId: string) => {
    try {
      const updatedCard = await executeCard(cardId);
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === updatedCard._id) {
            node.data = {
              ...node.data,
              executed: updatedCard.executed,
              inconsistentState: updatedCard.inconsistentState,
            };
          }
          return node;
        })
      );
      fetchTaskData(); // Refresh the task data to update the execution status
    } catch (error) {
      console.error('Error executing card:', error);
    }
  };

  const handleCardUpdate = (updatedCard: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === updatedCard._id) {
          node.data = {
            ...node.data,
            title: updatedCard.title,
            objective: updatedCard.objective,
            prompt: updatedCard.prompt,
            context: updatedCard.context,
            executed: updatedCard.executed,
            inconsistentState: updatedCard.inconsistentState,
          };
        }
        return node;
      })
    );
  };

  const handleDelete = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        <Flow initialNodes={nodes} initialEdges={edges} onNodeClick={handleNodeClick} onExecute={handleExecute} />
      </ContentContainer>
      <AddCardModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} taskId={task._id} currentCards={task.cards} onCardCreated={handleCardCreated} />
      {openPopovers.map((cardId, index) => (
        <DraggablePopover key={cardId} cardId={cardId} onRequestClose={() => handleClosePopover(cardId)} index={index} onExecute={handleExecute} onCardUpdate={handleCardUpdate} />
      ))}
    </PageContainer>
  );
};

export default TaskDetailPage;
