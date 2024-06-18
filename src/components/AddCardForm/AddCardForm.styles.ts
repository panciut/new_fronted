// src/components/AddCardForm/AddCardForm.styles.ts
import styled from 'styled-components';

export const FormContainer = styled.div`
  margin: 20px 0;
`;

export const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;

  &:hover {
    background-color: #21a1f1;
  }
`;
