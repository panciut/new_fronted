// src/components/DraggablePopover/DraggablePopover.styles.ts
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

export const PopoverContainer = styled.div`
  position: absolute;
  width: 28%;
  height: 50vh;
  padding: 20px;
  padding-bottom: 60px; /* Add padding to account for the button container */
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  overflow: hidden;
`;

export const PopoverContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  overflow-y: auto;
  height: calc(100% - 40px);
  padding-right: 10px; /* For scrollbar space */
`;

export const Section = styled.div`
  margin-bottom: 10px;
`;

export const SectionTitle = styled.div`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;

  &:hover {
    color: #007bff;
  }
`;

interface SectionContentProps {
  isCollapsed: boolean;
}

export const SectionContent = styled.div<SectionContentProps>`
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  display: ${(props) => (props.isCollapsed ? 'none' : 'block')};
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 5px;
`;

export const Value = styled.span`
  margin-left: 5px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background: white;
`;

interface ExecuteButtonProps {
  disabled?: boolean;
}

export const ExecuteButton = styled.button<ExecuteButtonProps>`
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  background-color: green;
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-bottom: 5px; /* Add margin to separate buttons */

  &:hover {
    background-color: darkgreen;
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

interface EvaluateButtonProps {
  disabled?: boolean;
}

export const EvaluateButton = styled.button<EvaluateButtonProps>`
  padding: 8px 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  background-color: yellow;
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-bottom: 5px; /* Add margin to separate buttons */

  &:hover {
    background-color: orange;
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

export const LoadingMessage = styled.p`
  margin: 0 10px; /* Add margin to center the loading message */
  font-size: 14px;
  color: #000;
`;


// New styled component for the edit button
export const EditButton = styled.button`
position: absolute;
top: 10px;
right: 50px; /* Adjust position as needed */
background: orange; /* Orange background color */
padding: 5px 10px;
border: 2px solid black;
border-radius: 5px;
cursor: pointer;
display: flex;
align - items: center;

  img {
  width: 15px;
  height: 15px;
  margin - right: 3px;
  filter: brightness(0); /* Change the image color to black */
}

  &:hover {
  background: #ff8c00; /* Darker orange on hover */
}
`;
