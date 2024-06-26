// src/components/AddCardPopover/AddCardPopover.tsx
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormTextArea,
  FormButton,
  CloseButton,
  TitleBand,
} from './AddCardPopover.styles';
import { createCard } from '../../services/api';

interface AddCardPopoverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  taskId: string;
  currentCards: any[];
  onCardCreated: () => void;
}

const AddCardPopover: React.FC<AddCardPopoverProps> = ({
  isOpen,
  onRequestClose,
  taskId,
  onCardCreated,
}) => {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [generativeModel, setGenerativeModel] = useState('gpt35Turbo');

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
      await createCard(newCard);
      onCardCreated();
      onRequestClose();
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Draggable bounds="parent">
      <FormContainer style={{ top: '10%', left: '10%' }}>
        <TitleBand>Create New Card</TitleBand>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
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
            <FormTextArea value={context} onChange={(e) => setContext(e.target.value)}></FormTextArea>
          </FormLabel>
          <FormButton type="submit">Create Card</FormButton>
        </form>
      </FormContainer>
    </Draggable>
  );
};

export default AddCardPopover;
