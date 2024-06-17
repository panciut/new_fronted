//src/components/Card/Card.tsx
import React from 'react';
import { Card as MUICard, CardContent, Typography } from '@mui/material';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <MUICard>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </MUICard>
  );
};

export default Card;
