import { IconButton, makeStyles } from "@material-ui/core";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import StopIcon from "@material-ui/icons/Stop";
import React, { useState } from "react";

const useIconStyles = makeStyles({
  root: {
    fontSize: "5rem"
  }
});

export const TimerListIcons = ({
  onClickStart,
  onClickSkip,
  onClickStop,
  onClickReset
}: {
  onClickStart: () => void;
  onClickSkip: () => void;
  onClickStop: () => void;
  onClickReset: () => void;
}) => {
  const classes = useIconStyles();
  const [isElapsing, setIsElapsing] = useState(false);
  return (
    <div className={classes.root}>
      {isElapsing ? (
        <IconButton
          onClick={() => {
            onClickStop();
            setIsElapsing(!isElapsing);
          }}
        >
          <StopIcon className={classes.root} color="primary" />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            onClickStart();
            setIsElapsing(!isElapsing);
          }}
        >
          <PlayCircleFilledWhiteIcon className={classes.root} color="primary" />
        </IconButton>
      )}

      <IconButton onClick={onClickSkip}>
        <SkipNextIcon className={classes.root} color="primary" />
      </IconButton>
      <IconButton onClick={onClickReset}>
        <RotateLeftIcon className={classes.root} color="primary" />
      </IconButton>
    </div>
  );
};
