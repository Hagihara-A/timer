import { actionTypes as AT, addTime } from "../actions";
import {
  timersReducer,
  isParent,
  getAllParentIdxs
} from "../reducers/timersReducer";
import { sampleState } from "./testData";

const timers = sampleState.timers;

test(`${AT.ADD_TIME} simply for Timer`, () => {
  const reduced = timersReducer(timers, addTime());
  const oldTimerData = timers.timerList[timers.currentTimerIndex].item.data;
  expect(oldTimerData.elapsedTime + 1).toBe(
    reduced.timerList[reduced.currentTimerIndex].item.data.elapsedTime
  );
});

test(`${AT.ADD_TIME} 5 times, step over Section`, () => {
  // iterate 5 times
  let reduced = timers;
  for (let i = 0; i < 5; i++) {
    reduced = timersReducer(reduced, addTime());
  }
  expect(reduced.timerList[0].item.data.elapsedTime).toBe(
    reduced.timerList[0].item.data.timeLimit
  );
  // WIP currently, disabled
  expect(reduced.timerList[1].item.data.count).toBe(1);

  expect(reduced.timerList[2].item.data.elapsedTime).toBe(2);

  expect(reduced.currentTimerIndex).toBe(3);
});

const getItemFromId = (timerList, id) => {
  return timerList.find(item => item.item.id === id);
};
test(`${AT.ADD_TIME}: Parent Section is counted up, when child Section finished`, () => {
  let reduced = timers;
  // iterate just before count up
  while (getItemFromId(reduced.timerList, "3-2-1").item.data.elapsedTime < 3) {
    reduced = timersReducer(reduced, addTime());
  }

  let shouldBeCountedUp = timersReducer(reduced, addTime());

  expect(
    getItemFromId(shouldBeCountedUp.timerList, "3-2").item.data.count
  ).toBe(1);

  expect(getItemFromId(shouldBeCountedUp.timerList, "3").item.data.count).toBe(
    1
  );
});

test(`isParent`, () => {
  const a = [1, 2, 3, 4];
  const b = [1, 2, 3, 4, 5];

  const c = [1, 2, 3, 4, 5];

  const d = [5, 4, 3, 2, 2];
  expect(isParent(a, b)).toBeTruthy();
  expect(isParent(b, a)).toBeTruthy();
  expect(isParent(b, c)).toBeFalsy();
  expect(isParent(a, d)).toBeFalsy();
});

test(`getAllParentIdxs`, () => {
  const childPath = [3, 2, 1];
  const ParentIdxs = [5, 8];

  expect(getAllParentIdxs(timers.timerList, childPath)).toEqual(ParentIdxs);
});
