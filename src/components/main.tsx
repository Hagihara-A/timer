import { Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTime,
  addTimer as addTimerAct,
  toggleIsDragEnabled as toggleDragAct,
  cleanseTree,
} from "../actions";
import { AddTimerDialog } from "./AddTimerDialog";
import { ElapsingButtons } from "./Buttons/ElapsingButtons";
import TimerTree from "./Tree/TimerTree";
import { TreeButtons } from "./Buttons/TreeButtons";
import { State } from "../types";

const TimerApp = () => {
  const isDragEnabled = useSelector(
    (state: State) => state.options.isDragEnabled
  );
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

  const toggleIsDragEnabled = () => {
    dispatch(cleanseTree());
    dispatch(toggleDragAct());
  };

  // TimerList callback
  const timerId = useRef<number>();
  const startTimerDispatch = () => {
    timerId.current = setInterval(() => dispatch(addTime()), 1000);
  };

  const resetTimerDispatch = () => {
    clearInterval(timerId.current);
    toggleIsDragEnabled();
  };

  const stopTimerDispatch = () => {
    clearInterval(timerId.current);
  };

  return (
    <div>
      <Typography variant="h1" paragraph align="center">
        Training Timer
      </Typography>
      <TimerTree />
      {isDragEnabled ? (
        <TreeButtons
          onClickAdd={toggleIsModalOpen}
          onClickComplete={toggleIsDragEnabled}
        />
      ) : (
        <ElapsingButtons
          onClickStart={startTimerDispatch}
          onClickStop={stopTimerDispatch}
          onClickReset={resetTimerDispatch}
        />
      )}
      <AddTimerDialog
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        onSubmit={addTimer}
      />
    </div>
  );
};

export const Main = () => <TimerApp />;
