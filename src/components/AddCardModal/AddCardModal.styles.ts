// src/components/AddCardModal/AddCardModal.styles.ts
import styled from 'styled-components';

export const FormContainer = styled.div`
  position: relative;
  padding: 20px;
  background: #fff;
  height: calc(100vh - 40px); /* Full height with padding */
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1001; /* Higher z-index to ensure it's on top of the flow */
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
  height: 150px; /* Increased height */
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

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

export const DropdownSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: auto;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  color: #fff;

  &:hover {
    background-color: #21a1f1;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

interface DropdownMenuProps {
  show: boolean;
}

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1002; /* Ensure dropdown is above other elements */
  display: ${props => (props.show ? 'block' : 'none')};
`;

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000, // Ensure overlay is on top
  },
  content: {
    top: '10px',
    right: '10px',
    bottom: '10px',
    left: 'auto',
    width: '30%', // Takes one-third of the page width
    padding: '20px',
    zIndex: 1001, // Ensure modal content is on top
  },
};
