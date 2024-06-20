// src/containers/TaskContainer/TaskContainer.styles.ts
import styled from 'styled-components';

export const TaskContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TaskItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid black; /* Black stroke */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #666;
  }

  .highlight {
    color: #faa419;
  }
`;
