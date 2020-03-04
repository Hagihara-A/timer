import produce from "immer";
import { actionTypes as AT, addTime } from "../actions";
import {
  countUpNearestSection,
  getAllParentIdxs,
  isLastTimer,
  isParent,
  isSamePath,
  timersReducer,
  getFirstTimerIdx,
  initItems,
  isFullyCounted
} from "../reducers/timersReducer";
import { sampleState } from "./testData";

const timers = sampleState.timers;

test(`${AT.ADD_TIME} simply for Timer`, () => {
  const oldTimerData = timers.timerList[timers.currentTimerIndex].item.data;
  const reduced = timersReducer(timers, addTime());
  const newTimerData = reduced.timerList[reduced.currentTimerIndex].item.data;
  expect(newTimerData.elapsedTime).toBe(oldTimerData.elapsedTime + 1);
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
test(`isParent`, () => {
  const a = [1, 2, 3, 4];
  const b = [1, 2, 3, 4, 5];

  const c = [1, 2, 3, 4, 5];

  const d = [5, 4, 3, 2, 2];
  expect(isParent(a, b)).toBeFalsy();
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

test(`getFirstTimerIdx`, () => {
  const path1 = [3];
  const path2 = [3, 2];

  const idx1 = getFirstTimerIdx(timers.timerList, path1);
  const idx2 = getFirstTimerIdx(timers.timerList, path2);

  expect(idx1).toBe(6);
  expect(idx2).toBe(9);
});

test(`initItems`, () => {
  const elapsed = produce(timers.timerList, draft => {
    draft[0].item.data.elapsedTime = 3;
    draft[1].item.data.count = 1;
    draft[2].item.data.elapsedTime = 2;
    draft[3].item.data.elapsedTime = 1;

    draft[6].item.data.elapsedTime = 2;
    draft[7].item.data.elapsedTime = 2;
    draft[8].item.data.count = 2;
    draft[9].item.data.elapsedTime = 3;
    draft[10].item.data.elapsedTime = 2;
  });

  const init1 = produce(elapsed, draft => {
    initItems(draft, [1]);
  });
  expect(init1[0].item.data.elapsedTime).toBe(3);
  expect(init1[1].item.data.count).toBe(1);
  expect(init1[2].item.data.elapsedTime).toBe(0);
  expect(init1[3].item.data.elapsedTime).toBe(0);
  expect(init1[7].item.data.elapsedTime).toBe(2);
  expect(init1[10].item.data.elapsedTime).toBe(2);

  const init2 = produce(elapsed, draft => {
    initItems(draft, [3, 2]);
  });
  expect(init1[0].item.data.elapsedTime).toBe(3);
  expect(init2[1].item.data.count).toBe(1);
  expect(init2[2].item.data.elapsedTime).toBe(2);
  expect(init2[3].item.data.elapsedTime).toBe(1);
  expect(init2[7].item.data.elapsedTime).toBe(2);
  expect(init2[9].item.data.elapsedTime).toBe(0);
  expect(init2[10].item.data.elapsedTime).toBe(0);
});

test(`isFullyCounted`, () => {
  const elapsed = produce(timers.timerList, draft => {
    draft[0].item.data.elapsedTime = 3;
    draft[1].item.data.count = 1;
    draft[2].item.data.elapsedTime = 2;
    draft[3].item.data.elapsedTime = 1;

    draft[6].item.data.elapsedTime = 2;
    draft[7].item.data.elapsedTime = 2;
    draft[8].item.data.count = 2;
    draft[9].item.data.elapsedTime = 3;
    draft[10].item.data.elapsedTime = 2;
  });

  expect(isFullyCounted(elapsed, [0])).toBeTruthy();
  expect(isFullyCounted(elapsed, [1])).toBeTruthy();
  expect(isFullyCounted(elapsed, [1, 0])).toBeTruthy();
  expect(isFullyCounted(elapsed, [1, 1])).toBeFalsy();
  expect(isFullyCounted(elapsed, [2])).toBeFalsy();
  expect(isFullyCounted(elapsed, [3, 0])).toBeTruthy();
  expect(isFullyCounted(elapsed, [3, 1])).toBeTruthy();
  expect(isFullyCounted(elapsed, [3, 2])).toBeFalsy();
  expect(isFullyCounted(elapsed, [3, 2, 0])).toBeTruthy();
  expect(isFullyCounted(elapsed, [3, 2, 1])).toBeFalsy();
});
