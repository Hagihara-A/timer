// TODO Remove following
/* eslint-disable no-case-declarations */
import {
  ItemId,
  moveItemOnTree,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition
} from "@atlaskit/tree";
import produce from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { TimerTreeData as TreeData, Action } from "../types";
const initTreeItem: TreeItem = {
  id: undefined,
  children: [],
  hasChildren: false,
  isExpanded: false,
  isChildrenLoading: false
};

export const getNewItemIds = (tree: TreeData, numIds: number) => {
  const startNum = Object.keys(tree.items).length - 1;
  const newIds: ItemId[] = [];
  for (let i = startNum; i < numIds + startNum; i++) {
    newIds.push(String(i));
  }
  return newIds;
};

export const setNewItemOnTree = (
  tree: TreeData,
  parentId: ItemId,
  data = {}
) => {
  const newId = getNewItemIds(tree, 1)[0];
  const newItem = produce(initTreeItem, draft => {
    draft.id = newId;
    draft.data = data;
  });
  tree.items[parentId].children.push(newId);
  tree.items[newId] = newItem;
};
export const getAllChildrenIds = (
  tree: TreeData,
  parentItemId: ItemId
): ItemId[] => {
  return tree.items[parentItemId].children.reduce(
    (accum, id) => {
      if (tree.items[id].children.length > 0) {
        return accum.concat(getAllChildrenIds(tree, id));
      } else {
        return [...accum, id];
      }
    },
    [parentItemId]
  );
};
export const treeReducer = produce(
  (tree: TreeData = initState.tree, action: Action) => {
    switch (action.type) {
      case AT.ADD_TREE_ITEM: {
        const { parentId, timeLimit } = action.payload;
        setNewItemOnTree(tree, parentId, { timeLimit });
        break;
      }
      case AT.REMOVE_ITEM: {
        const removeItemId: ItemId = action.payload.removeItemId;
        const allChildIds = getAllChildrenIds(tree, removeItemId);
        for (const id of allChildIds) {
          delete tree.items[id];
        }
        break;
      }
      case AT.EDIT_ITEM: {
        const { editItemId, data } = action.payload;
        const originalData = tree.items[editItemId].data;
        tree.items[editItemId].data = { ...originalData, ...data };
        break;
      }
      case AT.ON_DRAG_END:
        const source: TreeSourcePosition = action.payload.source;
        const destination: TreeDestinationPosition = action.payload.destination;
        if (!destination) return tree;
        return moveItemOnTree(tree, source, destination);
      case AT.TOGGLE_PROPERTY:
        const { id, prop } = action.payload;
        const flag = tree.items[id][prop];
        tree.items[id][prop] = !flag;
        break;
      default:
        return tree;
    }
  }
);
