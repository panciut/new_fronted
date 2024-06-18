// src/pages/CardDetailPage/CardDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCardById } from '../../services/api';

const CardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const getCard = async () => {
        try {
          const data = await fetchCardById(id);
          setCard(data);
        } catch (err) {
          setError('Failed to fetch card. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      getCard();
    } else {
      setLoading(false);
      setError('Card ID is missing.');
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
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
    </div>
  );
};

export default CardDetailPage;
