// src/pages/HomePage/HomePage.styles.ts
import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  height: 100vh;
  justify-content: center;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #282c34;
  margin-bottom: 40px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
`;
