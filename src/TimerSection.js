import React from "react";
import TimerListContainer from "./containers/Timer/TimerListContainer";
import TimerHandleButton from "./containers/Timer/buttons/timerHandleButton";
import ResetButton from "./containers/Timer/buttons/resetButton";
import SkipButton from "./containers/Timer/buttons/skipButton";
import Paper from "material-ui/Paper";

const TimerSection = () => (
  <Paper>
    <TimerListContainer />
    <TimerHandleButton />
    <SkipButton />
    <ResetButton />
  </Paper>
);

export default TimerSection;
