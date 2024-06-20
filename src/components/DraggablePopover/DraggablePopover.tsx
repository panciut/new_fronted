// src/components/DraggablePopover/DraggablePopover.tsx

import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { fetchCardById, fetchPreviousCardsOutputs, executeCard, evaluateCard, updateCard } from '../../services/api';
import {
  CloseButton,
  PopoverContent,
  PopoverContainer,
  Section,
  SectionTitle,
  SectionContent,
  Label,
  Value,
  ButtonContainer,
  ExecuteButton,
  EvaluateButton,
  LoadingMessage,
  EditButton
} from './DraggablePopover.styles';
import executeIcon from '../../assets/execute.svg';
import evaluateIcon from '../../assets/evaluate.svg';
import editIcon from '../../assets/edit.svg';
import doneIcon from '../../assets/done.svg';

interface DraggablePopoverProps {
  cardId: string;
  onRequestClose: () => void;
  index: number;
  onExecute: (id: string) => void;
  onCardUpdate: (card: any) => void; // New prop to handle card updates
}

const DraggablePopover: React.FC<DraggablePopoverProps> = ({
  cardId,
  onRequestClose,
  index,
  onExecute,
  onCardUpdate, // Receive the new prop
}) => {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isPromptCollapsed, setIsPromptCollapsed] = useState(false); // Default to open
  const [isContextCollapsed, setIsContextCollapsed] = useState(true); // Default to open
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(true);
  const [previousCardsOutputs, setPreviousCardsOutputs] = useState<{ [key: string]: string | null }>({});
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [updatedCard, setUpdatedCard] = useState<any>({}); // State to track updated card details

  useEffect(() => {
    const getCard = async () => {
      try {
        const data = await fetchCardById(cardId);
        setCard(data);
        setUpdatedCard(data); // Initialize updated card state
      } catch (err) {
        setError('Failed to fetch card. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCard();
  }, [cardId]);

  useEffect(() => {
    const getPreviousCardsOutputs = async () => {
      try {
        const data = await fetchPreviousCardsOutputs(cardId);
        setPreviousCardsOutputs(data);
      } catch (err) {
        console.error('Failed to fetch previous cards outputs', err);
      }
    };

    if (card) {
      getPreviousCardsOutputs();
    }
  }, [card]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const calculateLeftPosition = (index: number) => {
    const position = (index * 33 + 2) % 100;
    return position <= 75 ? position : 0;
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setIsEvaluating(true); // Disable both buttons
    try {
      await executeCard(cardId);
      const updatedCard = await fetchCardById(cardId);
      setCard(updatedCard);
      onExecute(cardId); // Notify the parent about the execution
      onCardUpdate(updatedCard); // Notify the parent about the card update
    } catch (error) {
      console.error('Error executing card:', error);
    } finally {
      setIsExecuting(false);
      setIsEvaluating(false); // Re-enable both buttons
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setIsExecuting(true); // Disable both buttons
    try {
      await evaluateCard(cardId);
      const updatedCard = await fetchCardById(cardId);
      setCard(updatedCard);
      onExecute(cardId); // Notify the parent about the evaluation
      onCardUpdate(updatedCard); // Notify the parent about the card update
    } catch (error) {
      console.error('Error evaluating card:', error);
    } finally {
      setIsEvaluating(false);
      setIsExecuting(false); // Re-enable both buttons
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      // If currently editing, save the changes
      try {
        await updateCard(updatedCard);
        setCard(updatedCard);
        onCardUpdate(updatedCard); // Notify the parent about the card update
      } catch (error) {
        console.error('Error updating card:', error);
      }
    }
    setIsEditing(!isEditing);
    setIsContextCollapsed(false);
    setIsPromptCollapsed(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedCard((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Draggable bounds="parent">
      <PopoverContainer
        style={{
          top: '25%',
          left: `${calculateLeftPosition(index)}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <EditButton onClick={handleEditClick}>
          <img src={isEditing ? doneIcon : editIcon} alt="Edit" />
        </EditButton>
        {card && (
          <>
            <PopoverContent>
              <Section>
                <Label>Title:</Label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={updatedCard.title}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{card.title}</Value>
                )}
              </Section>
              <Section>
                <Label>Objective:</Label>
                {isEditing ? (
                  <input
                    type="text"
                    name="objective"
                    value={updatedCard.objective}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{card.objective}</Value>
                )}
              </Section>
              <Section>
                <SectionTitle onClick={() => setIsPromptCollapsed(!isPromptCollapsed)}>
                  Prompt {isPromptCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <SectionContent isCollapsed={isPromptCollapsed}>
                  <div>
                    <Label>Prompt:</Label>
                    {isEditing ? (
                      <textarea
                        name="prompt"
                        value={updatedCard.prompt}
                        onChange={handleChange}
                      ></textarea>
                    ) : (
                      <Value>{card.prompt}</Value>
                    )}
                  </div>
                </SectionContent>
              </Section>
              <Section>
                <SectionTitle onClick={() => setIsContextCollapsed(!isContextCollapsed)}>
                  Context {isContextCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <SectionContent isCollapsed={isContextCollapsed}>
                  <div>
                    <Label>Context:</Label>
                    {isEditing ? (
                      <textarea
                        name="context"
                        value={updatedCard.context}
                        onChange={handleChange}
                      ></textarea>
                    ) : (
                      <Value>{card.context}</Value>
                    )}
                  </div>
                  {card.previousCards && Object.keys(card.previousCards).length > 0 && !isEditing && (
                    <div>
                      <Label>Previous Cards Outputs:</Label>
                      {Object.entries(previousCardsOutputs).map(([prevCardId, output]) => (
                        <div key={prevCardId}>
                          <Value>{output || 'No output generated'}</Value>
                        </div>
                      ))}
                    </div>
                  )}
                </SectionContent>
              </Section>
              <Section>
                <SectionTitle onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}>
                  Output {isOutputCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <SectionContent isCollapsed={isOutputCollapsed}>
                  <div>
                    {card.output ? (
                      <>
                        <Label>Generated Text:</Label>
                        <Value>{card.output.generatedText}</Value>
                      </>
                    ) : (
                      <Value>No output generated yet</Value>
                    )}
                  </div>
                </SectionContent>
              </Section>
              {card.output && card.output.evaluationMetrics && (
                <Section>
                  <h3>Evaluation Metrics</h3>
                  {card.output.evaluationMetrics.map((metric: any) => (
                    <div key={metric._id}>
                      <Label>{metric.type}:</Label>
                      <Value>{metric.evaluationResult}</Value>
                    </div>
                  ))}
                </Section>
              )}
            </PopoverContent>
            <ButtonContainer>
              <ExecuteButton
                onClick={handleExecute}
                data-tooltip="Execute Card"
                disabled={isExecuting}
              >
                <img src={executeIcon} alt="Execute" />
              </ExecuteButton>
              {isExecuting || isEvaluating ? (
                <LoadingMessage>Loading...</LoadingMessage>
              ) : (
                <div style={{ width: '100px' }}></div>
              )}
              <EvaluateButton
                onClick={handleEvaluate}
                data-tooltip="Evaluate Card"
                disabled={isEvaluating || !card.executed}
              >
                <img src={evaluateIcon} alt="Evaluate" />
              </EvaluateButton>
            </ButtonContainer>
          </>
        )}
      </PopoverContainer>
    </Draggable>
  );
};

export default DraggablePopover;
