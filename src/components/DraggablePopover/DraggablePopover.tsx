// src/components/DraggablePopover/DraggablePopover.tsx
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { fetchCardById, executeCard, evaluateCard } from '../../services/api';
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
} from './DraggablePopover.styles';
import executeIcon from '../../assets/execute.svg';
import evaluateIcon from '../../assets/evaluate.svg';

interface DraggablePopoverProps {
  cardId: string;
  onRequestClose: () => void;
  index: number;
  onExecute: (id: string) => void; // New prop to handle execution
}

const DraggablePopover: React.FC<DraggablePopoverProps> = ({
  cardId,
  onRequestClose,
  index,
  onExecute, // Receive the new prop
}) => {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(true);

  useEffect(() => {
    const getCard = async () => {
      try {
        const data = await fetchCardById(cardId);
        setCard(data);
      } catch (err) {
        setError('Failed to fetch card. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCard();
  }, [cardId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const calculateLeftPosition = (index: number) => {
    const position = (index * 25) % 100;
    return position < 75 ? position : 0;
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setIsEvaluating(true); // Disable both buttons
    try {
      await executeCard(cardId);
      const updatedCard = await fetchCardById(cardId);
      setCard(updatedCard);
      onExecute(cardId); // Notify the parent about the execution
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
    } catch (error) {
      console.error('Error evaluating card:', error);
    } finally {
      setIsEvaluating(false);
      setIsExecuting(false); // Re-enable both buttons
    }
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
        {card && (
          <>
            <PopoverContent>
              <Section>
                <Label>Title:</Label>
                <Value>{card.title}</Value>
              </Section>
              <Section>
                <Label>Objective:</Label>
                <Value>{card.objective}</Value>
              </Section>
              <Section>
                <Label>Status:</Label>
                <Value>{card.executed ? 'Executed' : 'Not Executed'}</Value>
              </Section>
              <Section>
                <Label>Evaluation:</Label>
                <Value>{card.evaluated ? 'Evaluated' : 'Not Evaluated'}</Value>
              </Section>
              <Section>
                <SectionTitle onClick={() => setIsInputCollapsed(!isInputCollapsed)}>
                  Inputs {isInputCollapsed ? '▼' : '▲'}
                </SectionTitle>
                <SectionContent isCollapsed={isInputCollapsed}>
                  {card.inputs.map((input: any, index: number) => (
                    <div key={index}>
                      <Label>Prompt:</Label>
                      <Value>{input.prompt}</Value>
                      <br />
                      <Label>Context:</Label>
                      <Value>{input.context}</Value>
                    </div>
                  ))}
                </SectionContent>
              </Section>
              {card.output && (
                <Section>
                  <SectionTitle onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}>
                    Outputs {isOutputCollapsed ? '▼' : '▲'}
                  </SectionTitle>
                  <SectionContent isCollapsed={isOutputCollapsed}>
                    <div>
                      <Label>Generated Text:</Label>
                      <Value>{card.output.generatedText}</Value>
                    </div>
                  </SectionContent>
                </Section>
              )}
              {card.output && (
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
