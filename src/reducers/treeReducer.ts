import {
  ItemId,
  moveItemOnTree,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import {
  Action,
  EditableTimerData,
  SectionTreeItemData,
  TreeData,
  TreeItem,
} from "../types";
import { isSection, isTimer } from "../utils";
import { initState } from "../initState";

const initTreeItem: TreeItem = {
  id: undefined,
  children: [],
  hasChildren: false,
  isExpanded: false,
  isChildrenLoading: false,
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
  data: EditableTimerData
) => {
  const newId = getNewItemIds(tree, 1)[0];
  const newItem = produce(initTreeItem, (draft) => {
    draft.id = newId;
    draft.data = {
      elapsedTime: 0,
      comment: "",
      ...data,
    };
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

export const getItemFromPosition = (
  tree: TreeData,
  position: TreeDestinationPosition
) => {
  if (typeof position.index === "undefined") {
    return tree.items[position.parentId];
  } else {
    const id = tree.items[position.parentId].children[position.index];
    return tree.items[id];
  }
};
export const combineTwoTimersIntoSection = (
  tree: TreeData,
  src: TreeSourcePosition,
  dst: TreeDestinationPosition
) => {
  // construct new section
  const dstItem = getItemFromPosition(tree, dst);
  const srcItem = getItemFromPosition(tree, src);
  const newSectionId = getNewItemIds(tree, 1)[0];
  const newSectionData: SectionTreeItemData = {
    repeat: 1,
    count: 0,
    comment: "",
  };
  const newSection = {
    ...initTreeItem,
    id: newSectionId,
    data: newSectionData,
    children: [dstItem.id, srcItem.id],
  };

  const dstParentItem = Object.values(tree.items).find((item) =>
    item.children.some((id) => id === dstItem.id)
  );
  const dstItemPosition = {
    parentId: dstParentItem.id,
    index: dstParentItem.children.findIndex((id) => id === dstItem.id),
  };

  // remove src deps
  tree.items[src.parentId].children = tree.items[src.parentId].children.filter(
    (id) => id !== srcItem.id
  );
  // replace dstItem.id to newSection
  tree.items[dstItemPosition.parentId].children = tree.items[
    dstItemPosition.parentId
  ].children.map((id) => (id === dstItem.id ? newSectionId : id));

  // add newSection
  tree.items[newSectionId] = newSection;
};

export const normalizeTree = (tree: TreeData) => {
  for (const id of Object.keys(tree.items)) {
    const item = tree.items[id];
    if (item.children.length === 0 && isSection(item.data)) {
      // remove item from its parent
      const parentItem = Object.values(tree.items).find((it) =>
        it.children.includes(item.id)
      );
      const parentId = parentItem.id;
      const index = parentItem.children.findIndex((id) => id === item.id);
      tree.items[parentId].children.splice(index, 1);
      delete tree.items[id];
    }
  }
};

export const isFullyCounted = (item: TreeItem) => {
  if (isSection(item.data)) {
    return item.data.count >= item.data.repeat;
  } else {
    return item.data.elapsedTime >= item.data.timeLimit;
  }
};

export const resetDescendant = (tree: TreeData, parentId: ItemId) => {
  const parent = tree.items[parentId];
  for (const id of parent.children) {
    const child = tree.items[id];
    if (isTimer(child.data)) child.data.elapsedTime = 0;
    else {
      child.data.count = 0;
      resetDescendant(tree, child.id);
    }
  }
};

export const countUp = (timerTree: TreeData) => {
  const toBeCountedId = traverse(timerTree, timerTree.rootId);

  if (typeof toBeCountedId === "undefined") return;
  const item = timerTree.items[toBeCountedId];

  if (isTimer(item.data)) {
    item.data.elapsedTime++;
  } else {
    item.data.count++;
    if (!isFullyCounted(item)) {
      resetDescendant(timerTree, item.id);
    }
  }
  const nextId = traverse(timerTree, timerTree.rootId);
  if (nextId && isSection(timerTree.items[nextId].data)) {
    countUp(timerTree);
  }
};

export const traverse = (
  tree: TreeData,
  rootId: ItemId
): ItemId | undefined => {
  const childIds = tree.items[rootId].children;
  for (const id of childIds) {
    const currItem = tree.items[id];
    const isBelowRepeat = !isFullyCounted(currItem);

    if (isTimer(currItem.data) && isBelowRepeat) return currItem.id;
    else if (isSection(currItem.data)) {
      const toBeCountedId = traverse(tree, currItem.id);
      if (typeof toBeCountedId !== "undefined") return toBeCountedId;
      else if (isBelowRepeat) return currItem.id;
    }
  }
};

export const treeReducer = produce((tree: Draft<TreeData>, action: Action) => {
  switch (action.type) {
    case AT.ADD_TIMER: {
      const { parentId, ...data } = action.payload;
      setNewItemOnTree(tree, parentId, { ...data });
      break;
    }
    case AT.REMOVE_ITEM: {
      const { parentId, index } = action.payload.source;

      const allChildIds = getAllChildrenIds(
        tree,
        tree.items[parentId].children[index]
      );
      tree.items[parentId].children.splice(index, 1);

      for (const id of allChildIds) {
        delete tree.items[id];
      }
      break;
    }
    case AT.EDIT_TIMER: {
      const { editItemId, data } = action.payload;
      const originalData = tree.items[editItemId].data;
      const newData = { ...originalData, ...data };
      if (isTimer(newData)) {
        tree.items[editItemId].data = newData;
      } else {
        throw new TypeError(
          `data:${JSON.stringify(newData)} must be TimerTreeItemData`
        );
      }
      break;
    }
    case AT.EDIT_SECTION: {
      const { editItemId, data } = action.payload;
      const originalData = tree.items[editItemId].data;
      const newData = { ...originalData, ...data };
      if (isSection(newData)) {
        tree.items[editItemId].data = newData;
      } else {
        throw new TypeError(
          `data:${JSON.stringify(data)} must be SectionTreeItemData`
        );
      }
      break;
    }
    case AT.ON_DRAG_END: {
      const src = action.payload.source;
      const dst = action.payload.destination;
      if (!dst) break;

      const dstItem = getItemFromPosition(tree, dst);

      if (typeof dst.index === "undefined" && isTimer(dstItem.data)) {
        combineTwoTimersIntoSection(tree, src, dst);
        break;
      } else {
        return moveItemOnTree(tree, src, dst);
      }
    }
    case AT.TOGGLE_PROPERTY: {
      const { id, prop } = action.payload;

      const flag = tree.items[id][prop];
      tree.items[id][prop] = !flag;
      break;
    }
    case AT.PARSE_TREE: {
      normalizeTree(tree);
      break;
    }
    case AT.ADD_TIME: {
      countUp(tree);
      break;
    }
    default: {
      break;
    }
  }
}, initState);
