import { actionTypes as AT, addTime } from "../actions";
import { timersReducer } from "../reducers/timersReducer";
import { sampleState } from "./testData";

const timers = sampleState.timers;

test(`${AT.ADD_TIME} simply for Timer`, () => {
  const reduced = timersReducer(timers, addTime());
  const oldTimerData = timers.timerList[timers.currentTimerIndex].item.data;
  expect(oldTimerData.elapsedTime + 1).toBe(
    reduced.timerList[reduced.currentTimerIndex].item.data.elapsedTime
  );
});

test(`${AT.ADD_TIME} several times, move over Section`, () => {
  // iterate 5 times
  let reduced = timers;
  for (let i = 0; i < 5; i++) {
    reduced = timersReducer(reduced, addTime());
  }
  expect(reduced.timerList[0].item.data.elapsedTime).toBe(
    reduced.timerList[0].item.data.timeLimit
  );
  // WIP currently, disabled
  // expect(reduced.timerList[1].item.data.count).toBe(1);

  expect(reduced.timerList[2].item.data.elapsedTime).toBe(2);

  expect(reduced.currentTimerIndex).toBe(3);
});
