import { IconButton } from "@material-ui/core";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import StopIcon from "@material-ui/icons/Stop";
import React, { useState } from "react";
import { ButtonsContainer, fontSize } from "./TreeButtons";

export const ElapsingButtons = ({
  onClickStart,
  onClickStop,
  onClickReset,
}: {
  onClickStart: () => void;
  onClickStop: () => void;
  onClickReset: () => void;
}) => {
  const [isElapsing, setIsElapsing] = useState(false);
  return (
    <ButtonsContainer>
      <div>
        {isElapsing ? (
          <IconButton
            onClick={() => {
              onClickStop();
              setIsElapsing(!isElapsing);
            }}
          >
            <StopIcon color="primary" style={{ fontSize }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              onClickStart();
              setIsElapsing(!isElapsing);
            }}
          >
            <PlayCircleFilledWhiteIcon color="primary" style={{ fontSize }} />
          </IconButton>
        )}

        <IconButton onClick={onClickReset}>
          <RotateLeftIcon color="primary" style={{ fontSize }} />
        </IconButton>
      </div>
    </ButtonsContainer>
  );
};
