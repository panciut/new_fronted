// src/components/CardDetailPopover/CardDetailPopover.styles.ts
import styled from 'styled-components';

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

export const PopoverContent = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;
