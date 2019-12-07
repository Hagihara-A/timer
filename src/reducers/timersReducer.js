import { actionTypes as AT } from "../actions";
import { getCurrentTimerIndex } from "../util";
import { initState } from "../initState";
import { List, fromJS } from "immutable";

export const timerState = {
  INIT: "INIT",
  ELAPSE: "ELAPSE",
  STOP: "STOP",
  END: "END"
};

const initTimer = elem => {
  return elem.set("time", 0).set("timerState", timerState.INIT);
};
export const initTimersRecursive = timers => {
  return timers.map(v => {
    if (List.isList(v)) {
      return initTimersRecursive(v);
    } else {
      return initTimer(v);
    }
  });
};

const timersReducer = (timers = initState.get("timers"), action) => {
  const { INIT, ELAPSE, STOP, END } = timerState;
  const idx = getCurrentTimerIndex(timers);

  if (idx) {
    const idxToTime = [...idx, "time"];
    const idxToTs = [...idx, "timerState"];
    const idxToTl = [...idx, "timeLimit"];

    switch (action.type) {
      case AT.ADD:
        return timers.updateIn(idxToTime, time => time + action.payload.time);
      case AT.START:
        return timers.setIn(idxToTs, ELAPSE);
      case AT.PAUSE:
        return timers.setIn(idxToTs, STOP);
      case AT.RESET:
        return initTimersRecursive(timers);
      case AT.FINISH:
        return timers
          .setIn(idxToTs, END)
          .setIn(idxToTime, timers.getIn(idxToTl));
      case AT.ADD_TIMER:
        return timers.push(
          Map({
            time: 0,
            timerState: INIT,
            timeLimit: action.payload.timeLimit
          })
        );
      case AT.SET_TIMERS:
        return fromJS(action.payload.timers);
      default:
        return timers;
    }
  } else {
    switch (action.type) {
      case AT.RESET:
        return initTimersRecursive(timers);
      case AT.SET_TIMERS:
        return fromJS(action.payload.timers);
      default:
        return timers;
    }
  }
};

export default timersReducer;
