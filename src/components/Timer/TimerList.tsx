import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { animated, useSprings } from "react-spring";
import { State } from "../../types";

const AnimatedTyporaphy = animated(Typography);

export const TimerList = () => {
  const timers = useSelector((state: State) => state.timers.timerList);
  const focus = useSelector((state: State) => state.timers.currentTimerIndex);

  const springs = useSprings(
    timers.length,
    timers.map((_, index) => {
      return {
        fontSize: index === focus ? "2rem" : "1rem"
      };
    })
  );

  const ListItems = springs.map((spring, idx) => {
    const item = timers[idx].item;
    const { timeLimit, power, times, time } = item.data;
    return (
      <AnimatedTyporaphy style={spring} key={item.id}>
        {`${time}  :: ${times} x ${timeLimit} sec at ${power} W`}
      </AnimatedTyporaphy>
    );
  });
  return <div style={{ textAlign: "center" }}>{ListItems}</div>;
};
