// src/components/Flow/CardNode.styles.ts
import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  background-color: #fff;
  width: 200px;
  height: 120px; /* Adjusted height */
  position: relative; /* Added for positioning child elements */
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 16px;
`;

export const StatusDot = styled.span<{ status: string }>`
  height: 20px; /* Increased size */
  width: 20px; /* Increased size */
  background-color: ${({ status }) => (status === 'executed' || status === 'evaluated' ? 'green' : 'red')};
  border-radius: 50%;
  border: 2px solid black; /* Added black stroke */
  display: inline-block;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Added for spacing */
  position: absolute;
  bottom: 10px; /* Positioning at the bottom */
  left: 50%;
  transform: translateX(-50%);
  width: 80px; /* Adjusted width for spacing */
`;

export const ExecuteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background-color: green; /* Changed to green */
  border: 2px solid black; /* Added black stroke */
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: darkgreen; /* Darker green on hover */
  }

  img {
    filter: brightness(0); /* Change the image color to black */
    width: 20px;
    height: 20px;
  }

  &::after {
    content: attr(data-tooltip); /* Use data-tooltip attribute for tooltip content */
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
