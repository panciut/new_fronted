// src/containers/TaskContainer/TaskContainer.styles.ts
import styled from 'styled-components';

export const TaskContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TaskItem = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  cursor: pointer;

  h2 {
    margin: 0;
  }
`;
