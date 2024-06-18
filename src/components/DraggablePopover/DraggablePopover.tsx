// src/components/DraggablePopover/DraggablePopover.tsx
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { fetchCardById } from '../../services/api';
import { CloseButton, PopoverContent, PopoverContainer, Section, SectionTitle, SectionContent, Label, Value } from './DraggablePopover.styles';

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

  return (
    <Draggable bounds="parent">
      <PopoverContainer style={{ top: '25%', left: `${calculateLeftPosition(index)}%`, transform: 'translateX(-50%)' }}>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        {card && (
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
        )}
      </PopoverContainer>
    </Draggable>
  );
};

export default DraggablePopover;
