import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTime,
  addTimer as addTimerAct,
  cleanseTree,
  toggleIsDragEnabled as toggleDragAct,
} from "../actions";
import { State } from "../types";
import { AddTimerDialog } from "./AddTimerDialog";
import { ElapsingButtons } from "./Buttons/ElapsingButtons";
import { TreeButtons } from "./Buttons/TreeButtons";
import TimerTree from "./Tree/TimerTree";

export const TimerApp = () => {
  const isDragEnabled = useSelector(
    (state: State) => state.options.isDragEnabled
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  const dispatch = useDispatch();
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
    if (isDragEnabled) {
      dispatch(cleanseTree());
    }
    dispatch(toggleDragAct());
  };
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
