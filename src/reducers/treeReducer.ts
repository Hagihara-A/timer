// TODO Remove following
/* eslint-disable no-case-declarations */
import {
  ItemId,
  moveItemOnTree,
  TreeData,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition
} from "@atlaskit/tree";
import produce from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action } from "../types";
import { getNewItemIds } from "../util";
const initTreeItem: TreeItem = {
  id: undefined,
  children: [],
  hasChildren: false,
  isExpanded: false,
  isChildrenLoading: false
};
export const setNewItemOnTree = (
  tree: TreeData,
  parentId: ItemId,
  data = {}
) => {
  const newId: ItemId = getNewItemIds(tree, 1)[0];
  const newItem = produce(initTreeItem, draft => {
    draft.id = newId;
    draft.data = data;
  });
  const newTree = produce(tree, draft => {
    draft.items[parentId].children.push(newId);
    draft.items[newId] = newItem;
  });
  return newTree;
};
const treeReducer = (tree = initState.tree, action: Action) => {
  switch (action.type) {
    case AT.ADD_TREE_ITEM: {
      const { parentId, timeLimit } = action.payload;
      return setNewItemOnTree(tree, parentId, { timeLimit });
    }
    case AT.REMOVE_ITEM: {
      const { removeItemId }: { removeItemId: ItemId } = action.payload;
      const parentItem = Object.values(tree.items).find(item =>
        item.children.some(id => id === removeItemId)
      );
      const parentId = parentItem.id;
      const removeItemIndex = parentItem.children.indexOf(removeItemId);
      return produce(tree, draft => {
        draft.items[parentId].children.splice(removeItemIndex, 1);
        delete draft.items[removeItemId];
      });
    }
    case AT.EDIT_ITEM: {
      const { editItemId, data } = action.payload;
      return produce(tree, draft => {
        const originalData = draft.items[editItemId].data;
        draft.items[editItemId].data = { ...originalData, data };
      });
    }
    case AT.ON_DRAG_END:
      const source: TreeSourcePosition = action.payload.source;
      const destination: TreeDestinationPosition = action.payload.destination;
      if (!destination) return tree;
      return moveItemOnTree(tree, source, destination);
    case AT.TOGGLE_PROPERTY:
      const {
        id,
        property
      }: {
        id: ItemId;
        property: "hasChildren" | "isExpanded" | "isChildrenLoading";
      } = action.payload;
      return produce(tree, draft => {
        const flag = draft.items[id][property];
        draft.items[id][property] = !flag;
      });
    default:
      return tree;
  }
};
export default treeReducer;
