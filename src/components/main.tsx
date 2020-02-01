import { ItemId } from "@atlaskit/tree";
import { styled, Typography, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import StopIcon from "@material-ui/icons/Stop";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { animated, useTransition } from "react-spring";
import {
  addTimer,
  removeItem,
  startTimer,
  finishTimer,
  stopTimer
} from "../actions";
import { TimerList } from "./Timer/TimerList";
import TimerTree from "./Tree/TimerTree";

const Heading = styled(({ children }) => (
  <Typography variant="h1" align="center">
    {children}
  </Typography>
))({
  lineHeight: "initial"
});

const iconStyles = {
  color: "primary",
  style: { height: "100px", width: "100px" }
} as const;

const TimerApp = () => {
  const [isTree, setIsTree] = useState(true);
  const toggleIsTree = () => setIsTree(!isTree);
  const toggle = () => {
    toggleIsTree();
  };
  const dispatch = useDispatch();

  const addTimerDispatch = (timeLimit: number) => {
    dispatch(addTimer("root", timeLimit));
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

  const TimerTreeIcons = () => {
    return (
      <>
        <IconButton>
          <AddCircleIcon {...iconStyles} />
        </IconButton>
        <IconButton onClick={toggle}>
          <CheckCircleIcon {...iconStyles} />
        </IconButton>
      </>
    );
  };

  const TimerListIcons = () => {
    return (
      <>
        <IconButton>
          <PlayCircleFilledWhiteIcon
            {...iconStyles}
            onClick={startTimerDispatch}
          />
        </IconButton>

        <IconButton>
          <SkipNextIcon {...iconStyles} onClick={skipTimerDisparch} />
        </IconButton>
        <IconButton>
          <StopIcon {...iconStyles} onClick={stopTimerDispatch} />
        </IconButton>
        <IconButton>
          <RotateLeftIcon {...iconStyles} onClick={toggle} />
        </IconButton>
      </>
    );
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
          {item ? <TimerTreeIcons /> : <TimerListIcons />}
        </animated.div>
      </div>
    );
  });

  return (
    <div>
      <Heading>Training Timer</Heading>
      {View}
    </div>
  );
};

export const Main = () => <TimerApp />;
