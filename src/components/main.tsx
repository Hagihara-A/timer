import { Typography } from "@material-ui/core";
import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTimer as addTimerAct, parseTree, addTime } from "../actions";
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
  lineHeight: "initial",
});

const MainAppContainer = styled.div`
  display: flex;
`;
const TimerApp = () => {
  // const [isTree, setIsTree] = useState(true);
  // const toggleIsTree = () => setIsTree(!isTree);
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
    // toggleIsTree();
  };

  // TimerList callback
  const timerId = useRef<number>();
  const startTimerDispatch = () => {
    timerId.current = setInterval(() => dispatch(addTime()), 1000);
  };

  const resetTimerDispatch = () => {
    clearInterval(timerId.current);
    dispatch(parseTree());
    // toggleIsTree();
  };

  const stopTimerDispatch = () => {
    clearInterval(timerId.current);
  };

  const focus = useSelector((state: State) => state.timers.currentTimerId);
  if (focus == null) clearInterval(timerId.current);

  return (
    <div>
      <Heading>Training Timer</Heading>
      <MainAppContainer>
        <TimerTree />
        <TimerList />
      </MainAppContainer>
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
