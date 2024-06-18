// src/components/Flow/CardNode.styles.ts

import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  background-color: #fff;
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 16px;
`;

export const StatusDot = styled.span<{ status: string }>`
  height: 10px;
  width: 10px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'executed':
        return 'green';
      case 'not-executed':
        return 'red';
      case 'evaluated':
        return 'green';
      case 'not-evaluated':
        return 'red';
      default:
        return 'grey';
    }
  }};
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
`;

export const InconsistentStateMessage = styled.p`
  color: red;
  font-weight: bold;
`;

export const ExecuteButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;

  &:hover {
    background-color: #21a1f1;
  }
`;
