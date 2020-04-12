import produce from "immer";
import { actionTypes as AT, addTime } from "../actions";
import { initState } from "../initState";
import { countUp, timersReducer, traverse } from "../reducers/timersReducer";
import { TreeItem } from "../types";
import { isTimer } from "../utils";
const { timers } = initState;

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCountedTo(count: number | "max"): R;
    }
  }
}
expect.extend({
  toBeCountedTo(received: TreeItem, count: number | "max") {
    let pass: boolean;
    let expected: number;
    let actual: number;
    if (count === "max") {
      if (isTimer(received.data)) {
        expected = received.data.timeLimit;
        actual = received.data.elapsedTime;
        pass = actual === expected;
      } else {
        expected = received.data.repeat;
        actual = received.data.count;
        pass = actual === expected;
      }
      return {
        pass,
        message: () => `expected ${expected} but got ${actual}`
      };
    } else {
      if (isTimer(received.data)) {
        actual = received.data.elapsedTime;
        pass = actual === count;
      } else {
        actual = received.data.count;
        pass = actual === count;
      }
      return {
        pass,
        message: () => `expected ${count} but got ${actual}`
      };
    }
  }
});
test(`${AT.ADD_TIME} simply for Timer`, () => {
  const oldTimerData = timers.timerList[timers.currentTimerId].item.data;
  const reduced = timersReducer(timers, addTime());
  const newTimerData = reduced.timerList[reduced.currentTimerId].item.data;
  expect(newTimerData.elapsedTime).toBe(oldTimerData.elapsedTime + 1);
});

test(`${AT.ADD_TIME} 10 times, step over Section`, () => {
  // iterate 10 times
  let reduced = timers;
  for (let i = 0; i < 10; i++) {
    reduced = timersReducer(reduced, addTime());
  }
  expect(reduced.timerTree.items["0"].data.elapsedTime).toBe(3);
  expect(reduced.timerList[1].item.data.count).toBe(1);

  expect(reduced.timerList[2].item.data.elapsedTime).toBe(2);
  expect(reduced.timerList[3].item.data.elapsedTime).toBe(2);
  expect(reduced.timerList[4].item.data.elapsedTime).toBe(3);

  expect(reduced.currentTimerId).toBe(4);
});

const times = 20;
test(`${AT.ADD_TIME} ${times} times, start from path:[3, 0]`, () => {
  //` iterate ${times} times`;
  let reduced = produce(timers, draft => {
    draft.currentTimerId = 6;
  });
  for (let i = 0; i < times; i++) {
    reduced = timersReducer(reduced, addTime());
  }
  expect(reduced.timerList[6].item.data.elapsedTime).toBe(2);
  expect(reduced.timerList[7].item.data.elapsedTime).toBe(2);

  expect(reduced.timerList[8].item.data.count).toBe(2);
  expect(reduced.timerList[9].item.data.elapsedTime).toBe(3);
  expect(reduced.timerList[10].item.data.elapsedTime).toBe(1);
});

describe(`traverse`, () => {
  test(`traverse initState`, () => {
    const toBeCountedId = traverse(timers.timerTree, timers.timerTree.rootId);
    expect(toBeCountedId).toBe("0");
  });

  test(`traverse tree elapsed till "1-0"`, () => {
    const elapsedTree = produce(timers.timerTree, draft => {
      draft.items["0"].data.elapsedTime = draft.items["0"].data.timeLimit;
      draft.items["1-0"].data.elapsedTime = draft.items["1-0"].data.timeLimit;
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("1-1");
  });

  test(`traverse tree elapsed till "1-1"`, () => {
    const elapsedTree = produce(timers.timerTree, draft => {
      draft.items["0"].data.elapsedTime = draft.items["0"].data.timeLimit;
      draft.items["1-0"].data.elapsedTime = draft.items["1-0"].data.timeLimit;
      draft.items["1-1"].data.elapsedTime = draft.items["1-1"].data.timeLimit;
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("1");
  });

  test(`traverse tree elapsed till "1"`, () => {
    const elapsedTree = produce(timers.timerTree, draft => {
      draft.items["0"].data.elapsedTime = draft.items["0"].data.timeLimit;
      draft.items["1"].data.count = draft.items["1"].data.repeat;
      draft.items["1-0"].data.elapsedTime = draft.items["1-0"].data.timeLimit;
      draft.items["1-1"].data.elapsedTime = draft.items["1-1"].data.timeLimit;
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("2");
  });

  test(`traverse tree elapsed till "2"`, () => {
    const elapsedTree = produce(timers.timerTree, draft => {
      draft.items["0"].data.elapsedTime = draft.items["0"].data.timeLimit;
      draft.items["1"].data.count = draft.items["1"].data.repeat;
      draft.items["1-0"].data.elapsedTime = draft.items["1-0"].data.timeLimit;
      draft.items["1-1"].data.elapsedTime = draft.items["1-1"].data.timeLimit;
      draft.items["2"].data.elapsedTime = draft.items["2"].data.timeLimit;
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("3-0");
  });
});

describe(`countUp`, () => {
  test(`countUp initState`, () => {
    const counted = produce(timers, draft => countUp(draft));
    expect(counted.timerTree.items["0"]).toBeCountedTo(1);
  });
});
