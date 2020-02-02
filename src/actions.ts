import {
  ItemId,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition
} from "@atlaskit/tree";
import { Timers, TimerTreeItemData } from "./types";

export const actionTypes = {
  START: "START",
  PAUSE: "PAUSE",
  RESET: "RESET",
  FINISH: "FINISH",
  ADD_TIMER: "ADD_TIMER",
  SET_TIMERS: "SET_TIMERS",
  SET_TREE: "SET_TREE",
  ADD_TREE_ITEM: "ADD_TREE_ITEM",
  ADD_SECTION: "ADD_SECTION",
  REMOVE_ITEM: "REMOVE_ITEM",
  EDIT_ITEM: "EDIT_ITEM",
  COPY_ITEM: "COPY_ITEM",
  ON_DRAG_END: "ON_DRAG_END",
  TOGGLE_PROPERTY: "TOGGLE_PROPERTY",
  FLATTEN_TREE: "FLATTEN_TREE"
} as const;

export const startTimer = () => {
  return {
    type: actionTypes.START
  };
};
export const stopTimer = () => {
  return {
    type: actionTypes.PAUSE
  };
};
export const resetTimer = () => {
  return {
    type: actionTypes.RESET
  };
};
export const finishTimer = () => {
  return {
    type: actionTypes.FINISH
  };
};
export const addTimer = (parentId: ItemId, timeLimit: number) => {
  return {
    type: actionTypes.ADD_TIMER,
    payload: {
      parentId,
      timeLimit
    }
  };
};
export const setTimers = (timers: Timers) => {
  return {
    type: actionTypes.SET_TIMERS,
    payload: {
      timers
    }
  };
};

export const setTree = (tree: TreeData) => {
  return {
    type: actionTypes.SET_TREE,
    payload: {
      tree
    }
  };
};

export const addTreeItem = (
  parentId: ItemId,
  treeItemData: Pick<TimerTreeItemData, "timeLimit" | "times" | "power">
) => {
  return {
    type: actionTypes.ADD_TREE_ITEM,
    payload: {
      parentId,
      ...treeItemData
    }
  };
};
export const addSection = (parentId: ItemId, title: number) => {
  return {
    type: actionTypes.ADD_SECTION,
    payload: {
      parentId,
      title
    }
  };
};
export const removeItem = (removeItemId: ItemId) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: {
      removeItemId
    }
  };
};
export const editItem = (
  editItemId: ItemId,
  data: Partial<TimerTreeItemData>
) => {
  return {
    type: actionTypes.EDIT_ITEM,
    payload: {
      editItemId,
      data
    }
  };
};
export const copyItem = (originItemId: ItemId) => {
  return {
    type: actionTypes.COPY_ITEM,
    payload: {
      originItemId
    }
  };
};
export const onDragEnd = (
  source: TreeSourcePosition,
  destination: TreeDestinationPosition
) => {
  return {
    type: actionTypes.ON_DRAG_END,
    payload: {
      source,
      destination
    }
  };
};

export const toggleProperty = (
  id: ItemId,
  prop: "isExpanded" | "isChildrenLoading" | "hasChildren"
) => {
  return {
    type: actionTypes.TOGGLE_PROPERTY,
    payload: {
      id,
      prop
    }
  };
};

export const parseTreeToTimers = () => {
  return {
    type: actionTypes.FLATTEN_TREE
  };
};
