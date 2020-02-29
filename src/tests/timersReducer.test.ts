import { actionTypes as AT, addTime } from "../actions";
import {
  timersReducer,
  isParent,
  getAllParentIdxs,
  isSamePath,
  isLastTimer,
  countUpNearestSection
} from "../reducers/timersReducer";
import { sampleState } from "./testData";
import produce from "immer";

const timers = sampleState.timers;

test(`${AT.ADD_TIME} simply for Timer`, () => {
  const oldTimerData = timers.timerList[timers.currentTimerIndex].item.data;
  const reduced = timersReducer(timers, addTime());
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
  const parentIdxs = [5, 8];

  expect(getAllParentIdxs(timers.timerList, childPath)).toEqual(parentIdxs);
});

test(`isSamePath`, () => {
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  const c = [1, 2];
  const d = [1, 2, 3, 4];
  const e = [1, 2, 4];

  expect(isSamePath(a, b)).toBeTruthy();
  expect(isSamePath(a, c)).toBeFalsy();
  expect(isSamePath(a, d)).toBeFalsy();
  expect(isSamePath(a, e)).toBeFalsy();
});

test(`isLastTimer`, () => {
  const { timerList } = timers;
  const a = timerList.find(item => item.item.id === "1-0").path;
  const b = timerList.find(item => item.item.id === "1-1").path;
  const c = timerList.find(item => item.item.id === "3-2-0").path;
  const d = timerList.find(item => item.item.id === "3-2-1").path;

  expect(isLastTimer(timerList, a)).toBeFalsy();
  expect(isLastTimer(timerList, b)).toBeTruthy();
  expect(isLastTimer(timerList, c)).toBeFalsy();
  expect(isLastTimer(timerList, d)).toBeTruthy();
});

describe(`countUpNearestSection`, () => {
  test(`countUpNearestSection once`, () => {
    const id = "3-2-1";
    const path = getItemFromId(timers.timerList, id).path;
    const countUp1 = produce(timers.timerList, draft => {
      const countedPath = countUpNearestSection(draft, path);
      expect(countedPath).toEqual([3, 2]);
    });
    const parents = getAllParentIdxs(timers.timerList, path).reverse();
    expect(countUp1[parents[0]].item.data.count).toBe(1);
  });

  test(`countUpNearestSection 5 times`, () => {
    const id = "3-2-1";
    const path = getItemFromId(timers.timerList, id).path;
    let counted;
    let countUp = produce(timers.timerList, draft => {
      countUpNearestSection(draft, path);
    });
    countUp = produce(countUp, draft => {
      countUpNearestSection(draft, path);
    });
    countUp = produce(countUp, draft => {
      counted = countUpNearestSection(draft, path);
      expect(counted).toEqual([3, 2]);
    });
    countUp = produce(countUp, draft => {
      const counted = countUpNearestSection(draft, path);
      expect(counted).toEqual([3]);
    });
    countUp = produce(countUp, draft => {
      const counted = countUpNearestSection(draft, path);
      expect(counted).toBeUndefined();
    });
    const parents = getAllParentIdxs(countUp, path).reverse();
    expect(countUp[parents[0]].item.data.count).toBe(
      countUp[parents[0]].item.data.repeat
    );

    expect(countUp[parents[1]].item.data.count).toBe(
      countUp[parents[1]].item.data.repeat
    );
  });
});
