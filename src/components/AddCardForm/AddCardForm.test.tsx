// src/components/AddCardForm/AddCardForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCardForm from './AddCardForm';

describe('AddCardForm', () => {
  const mockOnCardCreated = jest.fn();

  test('renders form correctly', () => {
    render(<AddCardForm taskId="testTaskId" onCardCreated={mockOnCardCreated} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Objective/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Previous Cards/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Next Cards/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Context/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Card/i })).toBeInTheDocument();
  });

  test('submits form with correct data', async () => {
    render(<AddCardForm taskId="testTaskId" onCardCreated={mockOnCardCreated} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Objective/i), { target: { value: 'Test Objective' } });
    fireEvent.change(screen.getByLabelText(/Previous Cards/i), { target: { value: 'card1,card2' } });
    fireEvent.change(screen.getByLabelText(/Next Cards/i), { target: { value: 'card3,card4' } });
    fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'Test Prompt' } });
    fireEvent.change(screen.getByLabelText(/Context/i), { target: { value: 'Test Context' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Card/i }));

    expect(mockOnCardCreated).toHaveBeenCalled();
  });
});
