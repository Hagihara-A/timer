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
      xy: isTree ? [-100, 0] : [100, 0]
    },
    enter: { opacity: 1, xy: [0, 0] },
    leave: {
      opacity: 0,
      xy: isTree ? [50, 0] : [-50, 0]
    }
  });

  const iconStyles = {
    color: "primary",
    onClick: toggle,
    cursor: "pointer",
    style: { height: "100px", width: "100px" }
  } as const;

  const translate = (x: Number, y: Number) => {
    if (x === 0 && y === 0) return "none";
    return `translate(${x}%, ${y}%`;
  };

  const View = transitions.map(({ item, key, props }) => {
    return (
      <div key={key}>
        <animated.div
          style={{
            ...props,
            transform: props.xy.to(translate),
            position: "absolute",
            left: 0,
            right: 0
          }}
        >
          {item ? <TimerTree /> : <TimerList />}
        </animated.div>

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
      </div>
    );
  });
  return (
    <div>
      <Typography variant="h1" align="center" style={{ lineHeight: "initial" }}>
        Training Timer
      </Typography>
      {View}
    </div>
  );
};

export const Main = () => <TimerApp />;
