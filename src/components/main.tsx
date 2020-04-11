import { styled, Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTimer as addTimerAct,
  parseTreeToTimers,
  forwardCurrentTimerIndex,
  addTime
} from "../actions";
import { AddTimerDialog } from "./AddTimerDialog";
import { TimerList } from "./Timer/TimerList";
import { TimerListIcons } from "./Timer/TimerListButtons";
import TimerTree from "./Tree/TimerTree";
import { TimerTreeIcons } from "./Tree/TimerTreeButtons";
import { State } from "../types";

const Heading = styled(({ children }) => (
  <Typography variant="h1" align="center">
    {children}
  </Typography>
))({
  lineHeight: "initial"
});

const TimerApp = () => {
  // const [isTree, setIsTree] = useState(true);
  // const toggleIsTree = () => setIsTree(!isTree);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsOpen = () => setIsModalOpen(!isModalOpen);

  const dispatch = useDispatch();
  // TimerTreeButton callback
  const addTimer = ({
    timeLimit,
    power
  }: {
    timeLimit: number;
    power: number;
  }) => {
    dispatch(addTimerAct("root", { power, timeLimit, comment: "" }));
  };

  const slideToTimerList = () => {
    dispatch(parseTreeToTimers());
    // toggleIsTree();
  };

  // TimerList callback
  let timerId = useRef<number>();
  const startTimerDispatch = () => {
    timerId.current = setInterval(() => dispatch(addTime()), 1000);
  };

  const skipTimerDisparch = () => {
    clearInterval(timerId.current);
    dispatch(forwardCurrentTimerIndex());
    timerId.current = setInterval(() => dispatch(addTime()), 1000);
  };

  const resetTimerDispatch = () => {
    clearInterval(timerId.current);
    // toggleIsTree();
  };

  const stopTimerDispatch = () => {
    clearInterval(timerId.current);
  };

  const focus = useSelector((state: State) => state.timers.currentTimerIndex);
  if (focus === -1) clearInterval(timerId.current);

  return (
    <div>
      <Heading>Training Timer</Heading>
      <TimerTree />
      <TimerList />
      <TimerTreeIcons
        onClickAdd={toggleIsOpen}
        onClickComplete={slideToTimerList}
      />
      <TimerListIcons
        onClickStart={startTimerDispatch}
        onClickSkip={skipTimerDisparch}
        onClickStop={stopTimerDispatch}
        onClickReset={resetTimerDispatch}
      />
      <AddTimerDialog
        open={isModalOpen}
        onClose={toggleIsOpen}
        onSubmit={addTimer}
      />
    </div>
  );
};

export const Main = () => <TimerApp />;
