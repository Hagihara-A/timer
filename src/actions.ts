import {
  ItemId,
  TreeDestinationPosition,
  TreeSourcePosition
} from "@atlaskit/tree";
import { SectionTreeItemData, TimerTreeItemData } from "./types";

export const actionTypes = {
  ADD_TIME: "ADD_TIME",
  // for rootReducer
  FLATTEN_TREE: "FLATTEN_TREE",
  CHANGE_FOCUS: "CHANGE_FOCUS",
  // for treeReducer
  ADD_TREE_ITEM: "ADD_TREE_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  EDIT_TIMER: "EDIT_TIMER",
  EDIT_SECTION: "EDIT_SECTION",
  ON_DRAG_END: "ON_DRAG_END",
  TOGGLE_PROPERTY: "TOGGLE_PROPERTY"
} as const;

export const addTime = () => {
  return {
    type: actionTypes.ADD_TIME,
    payload: {}
  };
};

export const moveCurrentTimerIndex = (mode: "+" | "-") => {
  return {
    type: actionTypes.CHANGE_FOCUS,
    payload: { mode }
  };
};
export const addTreeItem = (
  parentId: ItemId,
  treeItemData: Pick<TimerTreeItemData, "timeLimit" | "power">
) => {
  return {
    type: actionTypes.ADD_TREE_ITEM,
    payload: {
      parentId,
      ...treeItemData
    }
  };
};
export const removeItem = (source: TreeSourcePosition) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: {
      source
    }
  };
};
export const editTimer = (
  editItemId: ItemId,
  data: Partial<TimerTreeItemData>
) => {
  return {
    type: actionTypes.EDIT_TIMER,
    payload: {
      editItemId,
      data
    }
  };
};

export const editSection = (
  editItemId: ItemId,
  data: Partial<SectionTreeItemData>
) => {
  return {
    type: actionTypes.EDIT_SECTION,
    payload: {
      editItemId,
      data
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
