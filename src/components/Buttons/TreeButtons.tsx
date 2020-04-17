import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import styled, { keyframes } from "styled-components";

const floatUp = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
export const ButtonsContainer = styled.div`
  animation: ${floatUp} 1s ease;
  display: flex;
  justify-content: space-around;
`;

export const fontSize = "5rem";

export const TreeButtons = ({
  onClickAdd,
  onClickComplete,
}: {
  onClickAdd: () => void;
  onClickComplete: () => void;
}) => {
  return (
    <ButtonsContainer>
      <div>
        <IconButton onClick={onClickAdd}>
          <AddCircleIcon color="primary" style={{ fontSize }} />
        </IconButton>
        <IconButton onClick={onClickComplete}>
          <CheckCircleIcon color="primary" style={{ fontSize }} />
        </IconButton>
      </div>
    </ButtonsContainer>
  );
};
