import { IconButton, makeStyles } from "@material-ui/core";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import StopIcon from "@material-ui/icons/Stop";
import React from "react";

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

  return (
    <div className={classes.root}>
      <IconButton>
        <PlayCircleFilledWhiteIcon
          onClick={onClickStart}
          className={classes.root}
          color="primary"
        />
      </IconButton>
      <IconButton>
        <SkipNextIcon
          onClick={onClickSkip}
          className={classes.root}
          color="primary"
        />
      </IconButton>
      <IconButton>
        <StopIcon
          onClick={onClickStop}
          className={classes.root}
          color="primary"
        />
      </IconButton>
      <IconButton>
        <RotateLeftIcon
          onClick={onClickReset}
          className={classes.root}
          color="primary"
        />
      </IconButton>
    </div>
  );
};
