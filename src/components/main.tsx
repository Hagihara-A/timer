import { Typography } from "@material-ui/core";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import StopIcon from "@material-ui/icons/Stop";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { animated, useTransition } from "react-spring";
import { parseTimers } from "../actions";
import { State } from "../types";
import { TimerList } from "./Timer/TimerList";
import TimerTree from "./Tree/TimerTree";

const TimerApp = () => {
  const [isTree, setIsTree] = useState(true);
  const toggleIsTree = () => setIsTree(!isTree);
  const toggle = () => {
    if (isTree) {
      parseTimers(tree);
    }
    toggleIsTree();
  };
  const tree = useSelector((state: State) => state.tree);
  const transitions = useTransition(isTree, null, {
    from: {
      opacity: 0,
      transform: `translate3d(${isTree ? 100 : -100}%,0,0)`,
      position: "absolute",
      left: "0",
      right: "0",
      margin: "auto"
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: {
      opacity: 0,
      transform: `translate3d(${isTree ? -50 : 50}%,0,0)`
    }
  } as const);

  return (
    <>
      {transitions.map(({ item, key, props }) => (
        <animated.div style={props} key={key}>
          {item ? <TimerTree /> : <TimerList />}
        </animated.div>
      ))}

      {transitions.map(({ item, key, props }) => {
        const iconStyles = {
          color: "primary",
          fontSize: "large",
          onClick: toggle,
          cursor: "pointer",
          style: { height: "100px", width: "100px" }
        } as const;
        return (
          <animated.div
            key={key}
            style={{
              ...props,
              position: "fixed",
              bottom: "10px",
              width: "100%",
              textAlign: "center"
            }}
          >
            {item ? (
              <PlayCircleFilledWhiteIcon {...iconStyles} />
            ) : (
              <StopIcon {...iconStyles} />
            )}
          </animated.div>
        );
      })}
    </>
  );
};

export const Main = () => (
  <>
    <Typography variant="h1" align="center" style={{ lineHeight: "initial" }}>
      Training Timer
    </Typography>
    <TimerApp />
  </>
);
