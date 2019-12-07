import { initTimersRecursive, timerState } from "../reducers/timersReducer";
import { initTimers } from "./testData";

const T = "timerState";
test("initTimerRecursive", () => {
  const { END } = timerState;
  const almostFinishedTimers = initTimers.withMutations(timers => {
    return timers
      .setIn([0, T], END)
      .setIn([1, 0, T], END)
      .setIn([1, 1, T], END)
      .setIn([2, T], END)
      .setIn([3, 0, T], END)
      .setIn([3, 1, 1, T], END);
  });
  const actual = initTimersRecursive(almostFinishedTimers);
  expect(actual).toEqual(initTimers);
});
