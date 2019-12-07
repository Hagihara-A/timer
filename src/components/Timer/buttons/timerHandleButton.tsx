import React, { useState } from "react";
import { Button } from "@material-ui/core";

export const TimerHandleButtonInner = ({
  startTimer,
  curTimerState,
  stopTimer
}) => {
  const [buttonValue, setButtonValue] = useState("START");

  const handleClick = () => {
    const curState = curTimerState;
    if (curState === "INIT") {
      startTimer();
      setButtonValue("PAUSE");
    } else if (curState === "STOP") {
      startTimer();
      setButtonValue("RESUME");
    } else if (curState === "ELAPSE") {
      stopTimer();
      setButtonValue("PAUSE");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {buttonValue}
    </Button>
  );
};
