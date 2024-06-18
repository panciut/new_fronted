// src/pages/HomePage/HomePage.styles.ts
import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  margin: 20px;
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
