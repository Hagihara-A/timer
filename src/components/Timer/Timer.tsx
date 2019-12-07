import React, { useRef, useEffect } from "react";
import { timerState } from "../../reducers/timersReducer";

const { ELAPSE, STOP, END, INIT } = timerState;
const Timer = ({
  timerState,
  timeLimit,
  time,
  onReachTimeLimit,
  whenElapse,
  whenEnd
}) => {
  const timerId = useRef(null);

  const elapsedTime = () => {
    return Math.floor(time);
  };

  useEffect(() => {
    switch (timerState) {
      case ELAPSE:
        if (elapsedTime() >= timeLimit) {
          onReachTimeLimit();
        } else {
          let startedAt = Date.now();
          timerId.current = setTimeout(() => {
            whenElapse((Date.now() - startedAt) / 1000);
          }, 1000);
        }
        break;
      case STOP:
        clearInterval(timerId.current);
        break;
      case END:
        clearInterval(timerId.current);
        whenEnd();
        break;
      case INIT:
        clearInterval(timerId.current);
        break;
      default:
        break;
    }
  });

  return (
    <span>
      {/* TODO: remove */}
      {timerState}: {elapsedTime()}
    </span>
  );
};

export default Timer;
