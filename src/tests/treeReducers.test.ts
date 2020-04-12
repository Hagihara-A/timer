import produce from "immer";
import {
  actionTypes as AT,
  addTimer,
  editSection,
  editTimer,
  onDragEnd,
  removeItem,
  toggleProperty,
} from "../actions";
import { initState } from "../initState";
import {
  getNewItemIds,
  setNewItemOnTree,
  treeReducer,
} from "../reducers/treeReducer";
const { tree } = initState;

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
