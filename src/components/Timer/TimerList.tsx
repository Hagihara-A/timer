import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../types";

export const TimerList = () => {
  const timers = useSelector((state: State) => state.timers);
  return (
    <div>
      {timers.map(item => {
        return <div key={item.id}>{item.id + "  " + item.data.timeLimit} </div>;
      })}
    </div>
  );
};
