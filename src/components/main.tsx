import { ItemId } from "@atlaskit/tree";
import { styled, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { animated, useTransition } from "react-spring";
import {
  addTreeItem,
  finishTimer,
  removeItem,
  startTimer,
  stopTimer,
  parseTreeToTimers
} from "../actions";
import { AddTimerDialog } from "./AddTimerDialog";
import { TimerList } from "./Timer/TimerList";
import { TimerListIcons } from "./Timer/TimerListButtons";
import TimerTree from "./Tree/TimerTree";
import { TimerTreeIcons } from "./Tree/TimerTreeButtons";

const Heading = styled(({ children }) => (
  <Typography variant="h1" align="center">
    {children}
  </Typography>
))({
  lineHeight: "initial"
});

const TimerApp = () => {
  const [isTree, setIsTree] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleIsTree = () => setIsTree(!isTree);
  const toggleIsOpen = () => setIsOpenModal(!isOpenModal);

  const dispatch = useDispatch();

  // TimerTreeButton callback
  const addTimer = (times: number, timeLimit: number, power: number) => {
    dispatch(addTreeItem("root", { times, power, timeLimit }));
  };

  const slideToTimerList = () => {
    dispatch(parseTreeToTimers());
    toggleIsTree();
  };

  const removeTimerDispatch = (itemId: ItemId) => {
    dispatch(removeItem(itemId));
  };

  const startTimerDispatch = () => {
    dispatch(startTimer());
  };

  const skipTimerDisparch = () => {
    dispatch(finishTimer());
  };

  const stopTimerDispatch = () => {
    dispatch(stopTimer());
  };

  const transitions = useTransition(isTree, null, {
    from: {
      opacity: 0,
      xy: isTree ? [-100, 0] : [100, 0]
    },
    enter: { opacity: 1, xy: [0, 0] },
    leave: {
      opacity: 0,
      xy: isTree ? [50, 0] : [-50, 0]
    }
  });

  const View = transitions.map(({ item, key, props }) => {
    return (
      <div key={key}>
        <animated.div
          style={{
            ...props,
            transform: props.xy.to((x, y) =>
              x === 0 && y === 0 ? "none" : `translate(${x}%, ${y}%)`
            ),
            position: "absolute",
            left: 0,
            right: 0
          }}
        >
          {item ? <TimerTree /> : <TimerList />}
        </animated.div>

        <animated.div
          style={{
            opacity: props.opacity,
            position: "fixed",
            width: "100%",
            textAlign: "center",
            bottom: "10px"
          }}
        >
          {item ? (
            <TimerTreeIcons
              onClickAdd={toggleIsOpen}
              onClickComplete={slideToTimerList}
            />
          ) : (
            <TimerListIcons
              onClickStart={startTimerDispatch}
              onClickSkip={skipTimerDisparch}
              onClickStop={stopTimerDispatch}
              onClickReset={toggleIsTree}
            />
          )}
        </animated.div>
      </div>
    );
  });

  return (
    <div>
      <Heading>Training Timer</Heading>
      {View}
      <AddTimerDialog
        open={isOpenModal}
        onClose={toggleIsOpen}
        onSubmit={addTimer}
      />
    </div>
  );
};

export const Main = () => <TimerApp />;
