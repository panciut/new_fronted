// src/pages/TaskDetailPage/TaskDetailPage.styles.ts

import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 98vh;
  overflow: hidden;
  box-sizing: border-box;
`;

export const OptionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* Remove top and bottom padding */
  background-color: #282c34;
  color: white;
  height: 60px;
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #61dafb;
  }
`;

export const Button = styled.button`
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

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 60px); /* Adjust based on the height of the OptionsBar */
  box-sizing: border-box;
`;
