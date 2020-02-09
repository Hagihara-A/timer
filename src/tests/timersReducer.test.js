import { timersReducer } from "../reducers/timersReducer";
import { actionTypes as AT, addTime } from "../actions";
import { sampleState } from "./testData";
const timers = sampleState.timers;

test(AT.ADD_TIME, () => {
  const reduced = timersReducer(timers, addTime());
  expect(timers.timerList[timers.currentTimerIndex].item.data.time + 1).toBe(
    reduced.timerList[reduced.currentTimerIndex].item.data.time
  );
});
