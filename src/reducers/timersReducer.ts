import { ItemId } from "@atlaskit/tree";
import { flattenTree } from "@atlaskit/tree/dist/cjs/utils/tree";
import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, TimersListData, TreeData, TreeItem } from "../types";
import { isSection, isTimer } from "../utils";

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
    else resetDescendant(tree, child.id);
  }
};

export const countUp = (timers: TimersListData) => {
  const { timerTree } = timers;

  let toBeCountedId = traverse(timerTree, timerTree.rootId);

  if (toBeCountedId === timers.timerTree.rootId) return;
  const item = timerTree.items[toBeCountedId];
  if (isTimer(item.data)) {
    item.data.elapsedTime++;
  } else {
    item.data.count++;
    resetDescendant(timerTree, item.id);
    toBeCountedId = traverse(timerTree, timerTree.rootId);
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
export const timersReducer = produce(
  (draft: Draft<TimersListData>, action: Action) => {
    switch (action.type) {
      case AT.ADD_TIME: {
        // TODO reduce expensive computation
        countUp(draft); //update draft.timerTree
        draft.timerList = flattenTree(draft.timerTree);
        draft.currentTimerId = traverse(
          draft.timerTree,
          draft.timerTree.rootId
        );
        break;
      }
      default:
        break;
    }
  },
  initState.timers
);
