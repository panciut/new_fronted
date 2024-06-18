// src/components/CardDetailPopover/CardDetailPopover.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { fetchCardById } from '../../services/api';
import { CloseButton, PopoverContent } from './CardDetailPopover.styles';

interface CardDetailPopoverProps {
  cardId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const CardDetailPopover: React.FC<CardDetailPopoverProps> = ({ cardId, isOpen, onRequestClose }) => {
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

    if (isOpen) {
      getCard();
    }
  }, [cardId, isOpen]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Card Detail"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000, // Ensure overlay is on top
        },
        content: {
          top: '50px',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, 0)',
          padding: '20px',
          zIndex: 1001, // Ensure modal content is on top
        }
      }}
    >
      <CloseButton onClick={onRequestClose}>×</CloseButton>
      {card && (
        <PopoverContent>
          <h1>{card.title}</h1>
          <p>{card.objective}</p>
          <p>{card.executed ? 'Executed' : 'Not Executed'}</p>
          <p>{card.evaluated ? 'Evaluated' : 'Not Evaluated'}</p>
          {card.output && (
            <div>
              <h2>Output</h2>
              <p>{card.output.generatedText}</p>
              <h3>Evaluation Metrics</h3>
              {card.output.evaluationMetrics.map((metric: any) => (
                <p key={metric._id}>
                  {metric.evaluationDescription}: {metric.evaluationResult}
                </p>
              ))}
            </div>
          )}
        </PopoverContent>
      )}
    </Modal>
  );
};

export default CardDetailPopover;
