import { copyItem } from "../actions";
import treeReducer, {
  addItemToTree,
  getAllChildrenIds,
  removeItemFromTree,
  setNewItemOnTree
} from "../reducers/treeReducer";
import { getNewItemIds } from "../util";
import { sampleState } from "./testData";

test("getAllChildrenIds of id:root", () => {
  const tree = sampleState.get("tree");
  const parentId = tree.get("rootId");
  const children = getAllChildrenIds(tree, parentId);
  expect(children.size).toBe(tree.get("items").size);
});
test("getAllChildrenIds of id:3-2", () => {
  const tree = sampleState.get("tree");
  const parentId = "3-2";
  const children = getAllChildrenIds(tree, parentId);
  expect(children.sort().toJS()).toEqual(["3-2", "3-2-0", "3-2-1"]);
});
test("COPY_ITEM", () => {
  const copyId = "3-2";
  const prevTree = sampleState.get("tree");
  const allChildrenIds = getAllChildrenIds(prevTree, copyId);
  const newIds = getNewItemIds(prevTree, allChildrenIds.size);
  const newTree = treeReducer(prevTree, copyItem(copyId));
  expect(newTree.getIn(["items", newIds.get(0), "children"]).size).toBe(
    prevTree.getIn(["items", allChildrenIds.get(0), "children"]).size
  );
  expect(newTree.getIn(["items", newIds.get(1), "children"]).size).toBe(
    prevTree.getIn(["items", allChildrenIds.get(1), "children"]).size
  );
  expect(newTree.getIn(["items", newIds.get(2), "children"]).size).toBe(
    prevTree.getIn(["items", allChildrenIds.get(2), "children"]).size
  );
});

test("setNewItemOnTree", () => {
  const tree = sampleState.get("tree");
  const dataToadd = { test: "testItem" };
  const parentId = "3-2-1";
  const newTree = setNewItemOnTree(tree, parentId, dataToadd);
  expect(newTree.get("items").size - 1).toEqual(tree.get("items").size);
  const childId = newTree.getIn(["items", parentId, "children"]).last();
  expect(newTree.getIn(["items", childId, "data"]).toJS()).toEqual(dataToadd);
});

test("removeItemFromTree", () => {
  const tree = sampleState.get("tree");
  const itemIdToRemove = "3-2";
  const removeItemPosition = {
    parentId: "3",
    index: 2
  };
  const { tree: removedTree, itemRemoved } = removeItemFromTree(
    tree,
    removeItemPosition
  );
  expect(
    tree.getIn([
      "items",
      removeItemPosition.parentId,
      "children",
      removeItemPosition.index
    ])
  ).toBe(itemRemoved);
  expect(
    removedTree.getIn([
      "items",
      removeItemPosition.parentId,
      "children",
      removeItemPosition.index
    ])
  ).not.toBe(itemIdToRemove);
});

test("addItemToTree", () => {
  const newId = "hogehoge";
  const newTree = addItemToTree(
    sampleState.get("tree"),
    {
      parentId: "3-2",
      index: 0
    },
    newId
  );

  expect(newTree.getIn(["items", "3-2", "children", 0])).toBe(newId);
});
