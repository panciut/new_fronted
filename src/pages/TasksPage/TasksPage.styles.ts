// src/pages/TasksPage/TasksPage.styles.ts
import styled from 'styled-components';

export const TasksPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  min-height: 100vh;
  padding: 20px;
`;

export const TaskItem = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #282c34;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #666;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #282c34;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
`;
