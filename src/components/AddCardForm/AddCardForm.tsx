// src/components/AddCardForm/AddCardForm.tsx
import React, { useState } from 'react';
import { FormContainer, FormLabel, FormInput, FormTextArea, FormButton } from './AddCardForm.styles';

interface AddCardFormProps {
  taskId: string;
  onCardCreated: () => void; // Callback to refresh the card list after creation
}

const AddCardForm: React.FC<AddCardFormProps> = ({ taskId, onCardCreated }) => {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [previousCards, setPreviousCards] = useState<string[]>([]);
  const [nextCards, setNextCards] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCard = {
      title,
      objective,
      generativeModel: 'gpt35Turbo',
      previousCards,
      nextCards,
      inputs: [
        {
          prompt,
          context,
        },
      ],
      taskId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        onCardCreated();
      } else {
        console.error('Failed to create card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormLabel>
          Title:
          <FormInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </FormLabel>
        <FormLabel>
          Objective:
          <FormInput type="text" value={objective} onChange={(e) => setObjective(e.target.value)} required />
        </FormLabel>
        <FormLabel>
          Previous Cards (comma separated IDs):
          <FormInput type="text" value={previousCards.join(',')} onChange={(e) => setPreviousCards(e.target.value.split(','))} />
        </FormLabel>
        <FormLabel>
          Next Cards (comma separated IDs):
          <FormInput type="text" value={nextCards.join(',')} onChange={(e) => setNextCards(e.target.value.split(','))} />
        </FormLabel>
        <FormLabel>
          Prompt:
          <FormInput type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
        </FormLabel>
        <FormLabel>
          Context:
          <FormTextArea value={context} onChange={(e) => setContext(e.target.value)} required></FormTextArea>
        </FormLabel>
        <FormButton type="submit">Create Card</FormButton>
      </form>
    </FormContainer>
  );
};

export default AddCardForm;
