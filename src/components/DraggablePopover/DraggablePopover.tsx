// src/components/DraggablePopover/DraggablePopover.tsx
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { fetchCardById, executeCard, evaluateCard } from '../../services/api'; // Import the evaluateCard function
import { CloseButton, PopoverContent, PopoverContainer, Section, SectionTitle, SectionContent, Label, Value, ButtonContainer, ActionButton } from './DraggablePopover.styles';
import executeIcon from '../../assets/execute.svg';
import evaluateIcon from '../../assets/evaluate.svg';

interface DraggablePopoverProps {
  cardId: string;
  onRequestClose: () => void;
  index: number; // Added index prop
}

const DraggablePopover: React.FC<DraggablePopoverProps> = ({ cardId, onRequestClose, index }) => {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

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
    try {
      await executeCard(cardId);
      const updatedCard = await fetchCardById(cardId); // Fetch updated card data
      setCard(updatedCard);
    } catch (error) {
      console.error('Error executing card:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      await evaluateCard(cardId);
      const updatedCard = await fetchCardById(cardId); // Fetch updated card data
      setCard(updatedCard);
    } catch (error) {
      console.error('Error evaluating card:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <Draggable bounds="parent">
      <PopoverContainer style={{ top: '25%', left: `${calculateLeftPosition(index)}%`, transform: 'translateX(-50%)' }}>
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
                      <Label>{metric.evaluationDescription}:</Label>
                      <Value>{metric.evaluationResult}</Value>
                    </div>
                  ))}
                </Section>
              )}
            </PopoverContent>
            <ButtonContainer>
              <ActionButton
                onClick={handleExecute}
                color="green"
                hoverColor="darkgreen"
                data-tooltip="Execute Card"
                disabled={isExecuting}
              >
                <img src={executeIcon} alt="Execute" />
                {isExecuting && <span>Loading...</span>}
              </ActionButton>
              <ActionButton
                onClick={handleEvaluate}
                color="yellow"
                hoverColor="orange"
                data-tooltip="Evaluate Card"
                disabled={isEvaluating}
              >
                <img src={evaluateIcon} alt="Evaluate" />
                {isEvaluating && <span>Loading...</span>}
              </ActionButton>
            </ButtonContainer>
          </>
        )}
      </PopoverContainer>
    </Draggable>
  );
};

export default DraggablePopover;
