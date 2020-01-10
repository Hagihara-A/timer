import React, { useState } from "react";
import { useSelector } from "react-redux";
import { animated, useSprings } from "react-spring";
import { State } from "../../types";

export const TimerList = () => {
  const timers = useSelector((state: State) => state.timers);

  const [focus, setFocus] = useState(0);
  const [springs, set] = useSprings(timers.length, () => ({
    fontSize: "1rem"
  }));
  const ListItems = springs.map((spring, idx) => {
    const item = timers[idx].item;
    const { timeLimit, power, times } = item.data;
    return (
      <animated.div style={spring} key={item.id}>
        <div key={item.id}>{`${times} x ${timeLimit} sec at ${power} W`}</div>
      </animated.div>
    );
  });
  return (
    <animated.div>
      {ListItems}
      <button
        onClick={() => {
          setFocus((focus + 1) % timers.length);
          set(index => ({ fontSize: index === focus ? "2rem" : "1rem" }));
        }}
      >
        next
      </button>
    </animated.div>
  );
};
