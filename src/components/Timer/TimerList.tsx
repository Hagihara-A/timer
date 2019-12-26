import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../types";
import styled from "styled-components";
import { useSprings, animated } from "react-spring";

export const TimerList = () => {
  const timers = useSelector((state: State) => state.timers);

  const [focus, setFocus] = useState(0);
  const [springs, set] = useSprings(timers.length, () => ({
    fontSize: "10px"
  }));
  const ListItems = springs.map((spring, idx) => {
    const item = timers[idx];
    const { timeLimit, power, times } = item.data;
    return (
      <animated.div style={spring} key={item.id}>
        {`${times} x ${timeLimit} sec at ${power} W`}
      </animated.div>
    );
  });
  return (
    <animated.div style={{ textAlign: "center" }}>
      {ListItems}
      <button
        onClick={e => {
          setFocus((focus + 1) % timers.length);
          set(i => (i === focus ? { fontSize: "20px" } : { fontSize: "10px" }));
        }}
      >
        next
      </button>
    </animated.div>
  );
};
