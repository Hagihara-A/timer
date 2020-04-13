import { Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTime, addTimer as addTimerAct, parseTree } from "../actions";
import { AddTimerDialog } from "./AddTimerDialog";
import { TimerListIcons } from "./Timer/TimerListButtons";
import TimerTree from "./Tree/TimerTree";
import { TimerTreeIcons } from "./Tree/TimerTreeButtons";

const TimerApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  const dispatch = useDispatch();

  // TimerTreeButton callback
  const addTimer = ({
    timeLimit,
    power,
  }: {
    timeLimit: number;
    power: number;
  }) => {
    dispatch(addTimerAct("root", { power, timeLimit, comment: "" }));
  };

  const slideToTimerList = () => {
    dispatch(parseTree());
  };

  // TimerList callback
  const timerId = useRef<number>();
  const startTimerDispatch = () => {
    timerId.current = setInterval(() => dispatch(addTime()), 1000);
  };

  const resetTimerDispatch = () => {
    clearInterval(timerId.current);
    dispatch(parseTree());
  };

  const stopTimerDispatch = () => {
    clearInterval(timerId.current);
  };

  // const focus = useSelector((state: State) => state.timers.currentTimerId);
  // if (focus == null) clearInterval(timerId.current);

  return (
    <div>
      <Typography variant="h1" paragraph align="center">
        Training Timer
      </Typography>
      <TimerTree />
      <TimerTreeIcons
        onClickAdd={toggleIsModalOpen}
        onClickComplete={slideToTimerList}
      />
      <TimerListIcons
        onClickStart={startTimerDispatch}
        onClickStop={stopTimerDispatch}
        onClickReset={resetTimerDispatch}
      />
      <AddTimerDialog
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        onSubmit={addTimer}
      />
    </div>
  );
};

export const Main = () => <TimerApp />;
