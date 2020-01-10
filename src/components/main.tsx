import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";
import TimerTree from "./Tree/TimerTree";
import { TimerList } from "./Timer/TimerList";
import { parseTimers } from "../actions";
import { State } from "../types";

export const Main = () => {
  const [isTree, setIsTree] = useState(true);
  const toggleIsTree = () => setIsTree(!isTree);
  const dispatch = useDispatch();
  const tree = useSelector((state: State) => state.tree);
  const transitions = useTransition(isTree, null, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  } as const);

  return (
    <>
      {transitions.map(({ item, key, props }) => (
        <animated.div style={props} key={key}>
          {item ? <TimerTree /> : <TimerList />}
        </animated.div>
      ))}
      <button
        onClick={() => {
          if (isTree) {
            dispatch(parseTimers(tree));
          }
          toggleIsTree();
        }}
        style={{ position: "absolute", top: "500px", left: "45%" }}
      >
        TOGGLE
      </button>
    </>
  );
};
