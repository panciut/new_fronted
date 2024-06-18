// src/components/AddCardModal/AddCardModal.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormContainer, FormLabel, FormInput, FormTextArea, FormButton } from './AddCardModal.styles';
import { createCard } from '../../services/api'; // Import the API function

interface AddCardModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskId: string;
  currentCards: any[];
  onCardCreated: () => void; // Callback to refresh the card list after creation
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onRequestClose, taskId, currentCards, onCardCreated }) => {
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
      await createCard(newCard); // Use the imported function
      onCardCreated();
      onRequestClose();
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Add Card" 
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000, // Ensure overlay is on top
        },
        content: {
          zIndex: 1001, // Ensure modal content is on top
        }
      }}
    >
      <FormContainer>
        <h2>Create New Card</h2>
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
            Previous Cards:
            <select multiple value={previousCards} onChange={(e) => setPreviousCards(Array.from(e.target.selectedOptions, option => option.value))}>
              {currentCards.map(card => (
                <option key={card._id} value={card._id}>{card.title}</option>
              ))}
            </select>
          </FormLabel>
          <FormLabel>
            Next Cards:
            <select multiple value={nextCards} onChange={(e) => setNextCards(Array.from(e.target.selectedOptions, option => option.value))}>
              {currentCards.map(card => (
                <option key={card._id} value={card._id}>{card.title}</option>
              ))}
            </select>
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
    </Modal>
  );
};

export default AddCardModal;
