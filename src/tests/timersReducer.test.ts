import { ItemId } from "@atlaskit/tree";
import produce from "immer";
import { actionTypes as AT, addTime } from "../actions";
import { initState } from "../initState";
import {
  countUp,
  timersReducer,
  traverse,
  resetDescendant,
} from "../reducers/timersReducer";
import { TreeData, TreeItem } from "../types";
import { isTimer } from "../utils";

const { timers } = initState;
const { timerTree } = timers;

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
        message: () => `expected ${expected} but got ${actual}`,
      };
    } else {
      if (isTimer(received.data)) {
        actual = received.data.elapsedTime;
      } else {
        actual = received.data.count;
      }
      pass = actual === count;

      return {
        pass,
        message: () => `expected ${count} but got ${actual}`,
      };
    }
  },
});

const elapse = (tree: TreeData, ids: ItemId[], count?: number) => {
  for (const id of ids) {
    const item = tree.items[id];
    if (typeof count === "undefined") {
      if (isTimer(item.data)) item.data.elapsedTime = item.data.timeLimit;
      else item.data.count = item.data.repeat;
    } else {
      if (isTimer(item.data)) item.data.elapsedTime = count;
      else item.data.count = count;
    }
  }
};

describe(`${AT.ADD_TIME}`, () => {
  test(`${AT.ADD_TIME} simply for Timer`, () => {
    const reduced = timersReducer(timers, addTime());
    expect(reduced.timerTree.items["0"]).toBeCountedTo(1);
  });

  test(`${AT.ADD_TIME} 40 times`, () => {
    // iterate 40 times
    let reduced = timers;
    for (let i = 0; i < 40; i++) {
      reduced = timersReducer(reduced, addTime());
    }
    const reducedItems = reduced.timerTree.items;

    expect(reducedItems["0"]).toBeCountedTo("max");
    expect(reducedItems["1"]).toBeCountedTo("max");
    expect(reducedItems["1-0"]).toBeCountedTo("max");
    expect(reducedItems["3"]).toBeCountedTo(1);
    expect(reducedItems["3-2"]).toBeCountedTo(1);
    expect(reducedItems["3-2-0"]).toBeCountedTo(2);
    expect(reducedItems["3-2-1"]).toBeCountedTo(0);
  });

  test(`${AT.ADD_TIME} 50 times, should be ended`, () => {
    //` iterate 50 times`;
    let reduced = timers;
    for (let i = 0; i < 50; i++) {
      reduced = timersReducer(reduced, addTime());
    }
    const reducedItems = reduced.timerTree.items;
    expect(reducedItems["0"]).toBeCountedTo("max");
    expect(reducedItems["1"]).toBeCountedTo("max");
    expect(reducedItems["1-0"]).toBeCountedTo("max");
    expect(reducedItems["3"]).toBeCountedTo("max");
    expect(reducedItems["3-2-1"]).toBeCountedTo("max");
    expect(reducedItems["3-2"]).toBeCountedTo("max");
  });
});

describe(`traverse`, () => {
  test(`traverse initState`, () => {
    const toBeCountedId = traverse(timers.timerTree, timers.timerTree.rootId);
    expect(toBeCountedId).toBe("0");
  });

  test(`traverse tree elapsed till "1-0"`, () => {
    const elapsedTree = produce(timers.timerTree, (draft) => {
      elapse(draft, ["0", "1-0"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("1-1");
  });

  test(`traverse tree elapsed till "1-1"`, () => {
    const elapsedTree = produce(timers.timerTree, (draft) => {
      elapse(draft, ["0", "1-0", "1-1"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("1");
  });

  test(`traverse tree elapsed till "1"`, () => {
    const elapsedTree = produce(timers.timerTree, (draft) => {
      elapse(draft, ["0", "1", "1-0", "1-1"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("2");
  });

  test(`traverse tree elapsed till "2"`, () => {
    const elapsedTree = produce(timers.timerTree, (draft) => {
      elapse(draft, ["0", "1", "1-0", "1-1", "2"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("3-0");
  });
});

describe(`countUp`, () => {
  test(`countUp initState`, () => {
    const counted = produce(timers.timerTree, (draft) => countUp(draft));
    expect(counted.items["0"]).toBeCountedTo(1);
  });
});

test(`resetDescendant`, () => {
  const elapsedTree = produce(timerTree, (draft) => {
    elapse(
      draft,
      Object.keys(timerTree.items).filter((id) => id !== timerTree.rootId)
    );
  });

  const resetUnder3 = produce(elapsedTree, (draft) => {
    resetDescendant(draft, "3");
  });

  expect(resetUnder3.items["1-0"]).toBeCountedTo("max");
  expect(resetUnder3.items["3"]).toBeCountedTo("max");
  expect(resetUnder3.items["3-1"]).toBeCountedTo(0);
  expect(resetUnder3.items["3-2"]).toBeCountedTo(0);
  expect(resetUnder3.items["3-2-1"]).toBeCountedTo(0);
});
