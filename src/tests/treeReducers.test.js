import produce from "immer";
import {
  setNewItemOnTree,
  treeReducer,
  getNewItemIds
} from "../reducers/treeReducer";
import { sampleState } from "./testData";
import {
  actionTypes as AT,
  addTreeItem,
  removeItem,
  editItem,
  toggleProperty
} from "../actions";

const tree = sampleState.tree;
test("setNewItemOnTree", () => {
  const dataToadd = { test: "testItem" };
  const parentId = "3-2-1";
  const newTree = produce(tree, draft =>
    setNewItemOnTree(draft, parentId, dataToadd)
  );
  expect(Object.keys(newTree.items)).toHaveLength(
    Object.keys(tree.items).length + 1
  );
  const parentItem = newTree.items[parentId];
  const childId = parentItem.children[parentItem.children.length - 1];
  expect(newTree.items[childId].data).toEqual(dataToadd);
});

test("getNewItemIds", () => {
  const newIds = getNewItemIds(tree, 3);
  expect(newIds).toEqual(["11", "12", "13"]);
});

describe("treeReducer", () => {
  test(AT.ADD_TREE_ITEM, () => {
    const parentId = "3-2";
    const action = addTreeItem(parentId, 1234);
    const newTree = treeReducer(tree, action);
    const parentItem = newTree.items[parentId];

    expect(parentItem.children).toHaveLength(
      tree.items[parentId].children.length + 1
    );

    expect(
      newTree.items[parentItem.children[parentItem.children.length - 1]].data
        .timeLimit
    ).toEqual(1234);
  });

  test(AT.REMOVE_ITEM, () => {
    const removeItemId = "3-2";
    const action = removeItem(removeItemId);
    const newTree = treeReducer(tree, action);
    expect(newTree.items[removeItemId]).toBeUndefined();
    const childId = tree.items[removeItemId].children[0];
    expect(newTree.items[childId]).toBeUndefined();
    expect(newTree.items["3-1"]).not.toBeUndefined();
  });

  test(AT.EDIT_ITEM, () => {
    const id = "3-2";
    const newData = { title: "edited" };
    const action = editItem(id, newData);
    const newTree = treeReducer(tree, action);
    expect(newTree.items[id].data.title).toBe(newData.title);
    expect(newTree.items[id].data).toEqual({
      ...tree.items[id].data,
      ...newData
    });
  });

  test(AT.TOGGLE_PROPERTY, () => {
    const id = "3-2-1";
    const action = toggleProperty(id, "isExpanded");
    const newTree = treeReducer(tree, action);
    expect(newTree.items[id].isExpanded).toBe(!tree.items[id].isExpanded);
  });

  test("unknown action", () => {
    const action = { unknown: "no action" };
    const newTree = treeReducer(tree, action);
    expect(newTree).toBe(tree);
  });
});
