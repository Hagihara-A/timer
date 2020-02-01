import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { animated, useSprings } from "react-spring";
import { State } from "../../types";

const AnimatedTyporaphy = animated(Typography);

export const TimerList = () => {
  const timers = useSelector((state: State) => state.timers);

  const [springs, set] = useSprings(timers.length, () => ({
    fontSize: "1rem"
  }));
  const ListItems = springs.map((spring, idx) => {
    const item = timers[idx].item;
    const { timeLimit, power, times } = item.data;
    return (
      <AnimatedTyporaphy style={spring} key={item.id}>
        {`${times} x ${timeLimit} sec at ${power} W`}
      </AnimatedTyporaphy>
    );
  });
  return <div style={{ textAlign: "center" }}>{ListItems}</div>;
};
