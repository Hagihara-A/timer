import { ItemId } from "@atlaskit/tree";
import produce from "immer";
import {
  actionTypes as AT,
  addTime,
  addTimer,
  editSection,
  editTimer,
  onDragEnd,
  removeItem,
  toggleProperty,
} from "../actions";
import { initState } from "../initState";
import {
  countUp,
  getNewItemIds,
  normalizeTree,
  resetDescendant,
  setNewItemOnTree,
  traverse,
  treeReducer,
} from "../reducers/treeReducer";
import { TreeData, TreeItem } from "../types";
import { isTimer } from "../utils";
const tree = initState;
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
test("setNewItemOnTree", () => {
  const dataToadd = { power: 120, timeLimit: 40, comment: "" };
  const parentId = "3-2-1";
  const newTree = produce(tree, (draft) =>
    setNewItemOnTree(draft, parentId, dataToadd)
  );
  expect(Object.keys(newTree.items)).toHaveLength(
    Object.keys(tree.items).length + 1
  );
  const parentItem = newTree.items[parentId];
  const childId = parentItem.children[parentItem.children.length - 1];
  expect(newTree.items[childId].data).toMatchObject(dataToadd);
});

test("getNewItemIds", () => {
  const newIds = getNewItemIds(tree, 3);
  expect(newIds).toEqual(["11", "12", "13"]);
});

describe("treeReducer", () => {
  test(AT.ADD_TIMER, () => {
    const parentId = "3-2";
    const dataToAdd = { timeLimit: 4, power: 123, comment: "" };
    const action = addTimer(parentId, dataToAdd);
    const newTree = treeReducer(tree, action);
    const parentItem = newTree.items[parentId];

    expect(parentItem.children).toHaveLength(
      tree.items[parentId].children.length + 1
    );

    expect(
      newTree.items[parentItem.children[parentItem.children.length - 1]].data
    ).toMatchObject(dataToAdd);
  });

  test(AT.REMOVE_ITEM, () => {
    const source = { parentId: "3-2", index: 1 };
    const action = removeItem(source);
    const childId = tree.items[source.parentId].children[source.index];

    const newTree = treeReducer(tree, action);
    expect(newTree.items[source.parentId].children).toHaveLength(
      tree.items[source.parentId].children.length - 1
    );
    expect(newTree.items[childId]).toBeUndefined();
    expect(newTree.items["3-1"]).not.toBeUndefined();
  });

  test(AT.EDIT_TIMER, () => {
    const id = "3-2-0";
    const data = { power: 30, timeLimit: 345 };
    const action = editTimer(id, data);
    const newTree = treeReducer(tree, action);
    expect(newTree.items[id].data).toMatchObject(data);
  });

  test(AT.EDIT_SECTION, () => {
    const id = "3-2";
    const data = { repeat: 10 };
    const action = editSection(id, data);
    const newTree = treeReducer(tree, action);
    expect(newTree.items[id].data).toMatchObject(data);
  });

  test(AT.TOGGLE_PROPERTY, () => {
    const id = "3-2-1";
    const action = toggleProperty(id, "isExpanded");
    const newTree = treeReducer(tree, action);
    expect(newTree.items[id].isExpanded).toBe(!tree.items[id].isExpanded);
  });
  test(`${AT.ON_DRAG_END} Timer -> Timer`, () => {
    const srcPos = { parentId: "1", index: 0 };
    const dstPos = { parentId: "3-2-0" };
    const srcId = tree.items[srcPos.parentId].children[srcPos.index];
    const dstId = dstPos.parentId;
    const action = onDragEnd(srcPos, dstPos);
    const newTree = treeReducer(tree, action);
    const newSrcParent = Object.values(newTree.items).find((item) =>
      item.children.some((id) => id === srcId)
    );
    const newDstParent = Object.values(newTree.items).find((item) =>
      item.children.some((id) => id === dstId)
    );
    expect(newSrcParent.id).toBe(newDstParent.id);
    expect(newTree.items[srcPos.parentId].children).not.toContain(srcId);
    expect(newTree.items[dstPos.parentId].children).not.toContain(dstId);
    expect(newSrcParent.children).toEqual([dstId, srcId]);
  });

  test(`${AT.ON_DRAG_END} Timer -> Timer @ same Level`, () => {
    const srcPos = { parentId: "1", index: 0 };
    const dstPos = { parentId: "1-1" };
    const srcId = tree.items[srcPos.parentId].children[srcPos.index];
    const dstId = dstPos.parentId;
    const action = onDragEnd(srcPos, dstPos);
    const newTree = treeReducer(tree, action);
    const newSrcParent = Object.values(newTree.items).find((item) =>
      item.children.some((id) => id === srcId)
    );
    const newDstParent = Object.values(newTree.items).find((item) =>
      item.children.some((id) => id === dstId)
    );
    expect(newSrcParent.id).toBe(newDstParent.id);
    expect(newTree.items[srcPos.parentId].children).not.toContain(srcId);
    expect(newTree.items[dstPos.parentId].children).not.toContain(dstId);
    expect(newSrcParent.children).toEqual([dstId, srcId]);
  });

  test(`${AT.ON_DRAG_END} Timer -> Section`, () => {
    const srcPos = { parentId: "1", index: 0 };
    const dstPos = { parentId: "3" };
    const srcId = tree.items[srcPos.parentId].children[srcPos.index];
    const action = onDragEnd(srcPos, dstPos);
    const newTree = treeReducer(tree, action);
    const newSrcParent = Object.values(newTree.items).find((item) =>
      item.children.some((id) => id === srcId)
    );
    expect(newSrcParent.id).toBe(dstPos.parentId);
    expect(newSrcParent.children).toContain(srcId);
  });
});

test(`normalizeTree`, () => {
  const unNormalizedTree = produce(tree, (draft) => {
    draft.items["someId"] = {
      id: "someId",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        repeat: 1,
        count: 0,
        comment: "",
      },
    };

    draft.items["3"].children.push("someId");
  });

  const normalizedTree = produce(unNormalizedTree, (draft) =>
    normalizeTree(draft)
  );
  expect(normalizedTree.items["someId"]).toBeUndefined();
  expect(normalizedTree).toEqual(tree);
  expect(normalizedTree.items["3"].children).not.toContain("someId");
});

describe(`${AT.ADD_TIME}`, () => {
  test(`${AT.ADD_TIME} simply for Timer`, () => {
    const reduced = treeReducer(tree, addTime());
    expect(reduced.items["0"]).toBeCountedTo(1);
  });

  test(`${AT.ADD_TIME} 40 times`, () => {
    // iterate 40 times
    let reduced = tree;
    for (let i = 0; i < 40; i++) {
      reduced = treeReducer(reduced, addTime());
    }
    const reducedItems = reduced.items;

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
    let reduced = tree;
    for (let i = 0; i < 50; i++) {
      reduced = treeReducer(reduced, addTime());
    }
    const reducedItems = reduced.items;
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
    const toBeCountedId = traverse(tree, tree.rootId);
    expect(toBeCountedId).toBe("0");
  });

  test(`traverse tree elapsed till "1-0"`, () => {
    const elapsedTree = produce(tree, (draft) => {
      elapse(draft, ["0", "1-0"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("1-1");
  });

  test(`traverse tree elapsed till "1-1"`, () => {
    const elapsedTree = produce(tree, (draft) => {
      elapse(draft, ["0", "1-0", "1-1"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("1");
  });

  test(`traverse tree elapsed till "1"`, () => {
    const elapsedTree = produce(tree, (draft) => {
      elapse(draft, ["0", "1", "1-0", "1-1"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("2");
  });

  test(`traverse tree elapsed till "2"`, () => {
    const elapsedTree = produce(tree, (draft) => {
      elapse(draft, ["0", "1", "1-0", "1-1", "2"]);
    });
    const toBeCountedId = traverse(elapsedTree, elapsedTree.rootId);
    expect(toBeCountedId).toBe("3-0");
  });
});

describe(`countUp`, () => {
  test(`countUp initState`, () => {
    const counted = produce(tree, (draft) => countUp(draft));
    expect(counted.items["0"]).toBeCountedTo(1);
  });
});

test(`resetDescendant`, () => {
  const elapsedTree = produce(tree, (draft) => {
    elapse(
      draft,
      Object.keys(tree.items).filter((id) => id !== tree.rootId)
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
