// src/components/AddCardModal/AddCardModal.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormTextArea,
  FormButton,
  CloseButton,
  modalStyles,
} from './AddCardModal.styles';
import { createCard } from '../../services/api'; // Import the API function

interface AddCardModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskId: string;
  currentCards: any[];
  onCardCreated: () => void; // Callback to refresh the card list after creation
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onRequestClose,
  taskId,
  onCardCreated,
}) => {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [generativeModel, setGenerativeModel] = useState('gpt35Turbo'); // Set default value

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCard = {
      title,
      objective,
      generativeModel,
      prompt,
      context,
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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Card" style={modalStyles}>
      <FormContainer>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
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
            Generative Model:
            <FormInput as="select" value={generativeModel} onChange={(e) => setGenerativeModel(e.target.value)}>
              <option value="gpt35Turbo">gpt35Turbo</option>
              {/* Future options can be added here */}
            </FormInput>
          </FormLabel>
          <FormLabel>
            Prompt:
            <FormTextArea value={prompt} onChange={(e) => setPrompt(e.target.value)} required></FormTextArea>
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
