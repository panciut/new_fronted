// src/components/Flow/CardNode.styles.ts
import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  background-color: #fff;
  width: 200px;
  height: 120px;
  position: relative;
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 16px;
`;

export const StatusDot = styled.span<{ status: string }>`
  height: 20px;
  width: 20px;
  background-color: ${({ status }) => (status === 'executed' ? 'green' : 'red')};
  border-radius: 50%;
  border: 2px solid black; /* Added black stroke */
  display: inline-block;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px; /* Adjusted width for a single dot */
`;

export const ExecuteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: green;
  border: 2px solid black; /* Added black stroke */
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: darkgreen;
  }

  img {
    filter: brightness(0);
    width: 20px;
    height: 20px;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    display: none;
    white-space: nowrap;
  }

  &:hover::after {
    display: block;
  }
`;

export const ExecutionStatus = styled.span`
  display: flex;
  align-items: center;
`;

export const LoadingMessage = styled.p`
  margin: 0 10px; /* Add margin to center the loading message */
  font-size: 14px;
  color: #000;
`;
