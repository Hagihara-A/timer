import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { animated, useSprings } from "react-spring";
import { State } from "../../types";
import { isSection } from "../../utils";

const AnimatedTyporaphy = animated(Typography);

export const TimerList = () => {
  const { timerList, currentTimerId } = useSelector(
    (state: State) => state.timers
  );
  const focus = timerList.findIndex(elem => elem.item.id === currentTimerId);

  const springs = useSprings(
    timerList.length,
    timerList.map((_, index) => {
      return {
        fontSize: index === focus ? "2rem" : "1rem"
      };
    })
  );

  const ListItems = springs.map((spring, idx) => {
    const item = timerList[idx].item;
    if (isSection(item.data)) {
      // must be Section
      const { repeat, count } = item.data;
      return (
        <AnimatedTyporaphy style={spring} key={item.id}>
          {`${count}/ ${repeat}`}
        </AnimatedTyporaphy>
      );
    } else {
      const { timeLimit, power, elapsedTime } = item.data;
      return (
        <AnimatedTyporaphy style={spring} key={item.id}>
          {`${elapsedTime} /  ${timeLimit} sec @ ${power} W`}
        </AnimatedTyporaphy>
      );
    }
  });
  return <div style={{ textAlign: "center" }}>{ListItems}</div>;
};
