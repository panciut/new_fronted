// src/containers/CardContainer/CardContainer.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from '../../components/Card/Card';
import { setCards } from '../../redux/slices/cardSlice';
import { fetchCards } from '../../services/api';

const CardContainer: React.FC = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCards = async () => {
      setLoading(true);
      try {
        const data = await fetchCards();
        dispatch(setCards(data));
      } catch (err) {
        setError('Failed to fetch cards. Please try again later.');
        console.error('Error fetching cards:', err);
      } finally {
        setLoading(false);
      }
    };

    getCards();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default CardContainer;