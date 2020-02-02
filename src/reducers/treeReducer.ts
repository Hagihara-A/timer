import {
  ItemId,
  moveItemOnTree,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition
} from "@atlaskit/tree";
import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import { Action, TimerTreeData as TreeData } from "../types";

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

export const treeReducer = (tree: Draft<TreeData>, action: Action) => {
  switch (action.type) {
    case AT.ADD_TREE_ITEM: {
      const { parentId, ...data } = action.payload;
      setNewItemOnTree(tree, parentId, { ...data });
      return tree;
    }
    case AT.REMOVE_ITEM: {
      const removeItemId: ItemId = action.payload.removeItemId;
      const allChildIds = getAllChildrenIds(tree, removeItemId);
      for (const id of allChildIds) {
        delete tree.items[id];
      }
      return tree;
    }
    case AT.EDIT_ITEM: {
      const { editItemId, data } = action.payload;
      const originalData = tree.items[editItemId].data;
      tree.items[editItemId].data = { ...originalData, ...data };
      return tree;
    }
    case AT.ON_DRAG_END: {
      const source: TreeSourcePosition = action.payload.source;
      const destination: TreeDestinationPosition = action.payload.destination;
      if (!destination) return tree;
      return moveItemOnTree(tree, source, destination);
    }
    case AT.TOGGLE_PROPERTY: {
      const { id, prop } = action.payload;

      const flag = tree.items[id][prop];
      tree.items[id][prop] = !flag;
      return tree;
    }
    default: {
      return tree;
    }
  }
};
