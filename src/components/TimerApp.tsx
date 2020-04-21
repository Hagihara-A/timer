import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTime,
  addTimer as addTimerAct,
  cleanseTree,
  toggleIsDragEnabled as toggleDragAct,
} from "../actions";
import { useAppState } from "../utils";
import { AddTimerDialog } from "./AddTimerDialog";
import { ElapsingButtons } from "./Buttons/ElapsingButtons";
import { TreeButtons } from "./Buttons/TreeButtons";
import TimerTree from "./Tree/TimerTree";

export const TimerApp = () => {
  const isDragEnabled = useAppState((state) => state.options.isDragEnabled);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
  const dispatch = useDispatch();
  const addTimer = (timeLimit: number, power: number) => {
    dispatch(addTimerAct("root", { power, timeLimit, comment: "" }));
  };
  const toggleIsDragEnabled = () => {
    if (isDragEnabled) {
      dispatch(cleanseTree());
    }
    dispatch(toggleDragAct());
  };
  const timerId = useRef<number>();

  const TreeButtonsProps = {
    onClickAdd: toggleIsModalOpen,
    onClickComplete: toggleIsDragEnabled,
    onClickSave: async () => {},
  };
  const ElapsingButtonsProps = {
    onClickStart: () => {
      timerId.current = setInterval(() => dispatch(addTime()), 1000);
    },
    onClickStop: () => {
      clearInterval(timerId.current);
    },
    onClickReset: () => {
      clearInterval(timerId.current);
      toggleIsDragEnabled();
    },
  };
  return (
    <div>
      <TimerTree />
      {isDragEnabled ? (
        <TreeButtons {...TreeButtonsProps} />
      ) : (
        <ElapsingButtons {...ElapsingButtonsProps} />
      )}
      <AddTimerDialog
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        onSubmit={addTimer}
      />
    </div>
  );
};
