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
  DropdownSelect,
  DropdownButton,
  DropdownContainer,
  DropdownMenu,
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
  currentCards,
  onCardCreated,
}) => {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [previousCards, setPreviousCards] = useState<string[]>([]);
  const [nextCards, setNextCards] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [generativeModel, setGenerativeModel] = useState('gpt35Turbo'); // Set default value
  const [showPreviousDropdown, setShowPreviousDropdown] = useState(false);
  const [showNextDropdown, setShowNextDropdown] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newCard = {
      title,
      objective,
      generativeModel,
      previousCards,
      nextCards,
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

  const togglePreviousDropdown = () => {
    setShowPreviousDropdown(!showPreviousDropdown);
  };

  const toggleNextDropdown = () => {
    setShowNextDropdown(!showNextDropdown);
  };

  const handlePreviousCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreviousCards(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const handleNextCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNextCards(Array.from(e.target.selectedOptions, (option) => option.value));
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
            Previous Cards:
            <DropdownContainer>
              <DropdownButton type="button" onClick={togglePreviousDropdown}>
                Select Previous Cards
              </DropdownButton>
              <DropdownMenu show={showPreviousDropdown}>
                <DropdownSelect multiple value={previousCards} onChange={handlePreviousCardChange}>
                  {currentCards.map((card) => (
                    <option key={card._id} value={card._id}>
                      {card.title}
                    </option>
                  ))}
                </DropdownSelect>
              </DropdownMenu>
            </DropdownContainer>
          </FormLabel>
          <FormLabel>
            Next Cards:
            <DropdownContainer>
              <DropdownButton type="button" onClick={toggleNextDropdown}>
                Select Next Cards
              </DropdownButton>
              <DropdownMenu show={showNextDropdown}>
                <DropdownSelect multiple value={nextCards} onChange={handleNextCardChange}>
                  {currentCards.map((card) => (
                    <option key={card._id} value={card._id}>
                      {card.title}
                    </option>
                  ))}
                </DropdownSelect>
              </DropdownMenu>
            </DropdownContainer>
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
