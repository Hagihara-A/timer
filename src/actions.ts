import {
  ItemId,
  TreeDestinationPosition,
  TreeSourcePosition
} from "@atlaskit/tree";
import { EditableSectionData, EditableTimerData } from "./types";

export const actionTypes = {
  // for rootReducer
  PARSE_TREE: "PARSE_TREE",
  // for treeReducer
  ADD_TIMER: "ADD_TIMER",
  REMOVE_ITEM: "REMOVE_ITEM",
  EDIT_TIMER: "EDIT_TIMER",
  EDIT_SECTION: "EDIT_SECTION",
  ON_DRAG_END: "ON_DRAG_END",
  TOGGLE_PROPERTY: "TOGGLE_PROPERTY",
  // for timersReducer
  ADD_TIME: "ADD_TIME",
  FORWARD_FOCUS: "FORWARD_FOCUS"
} as const;

export const addTime = () => {
  return {
    type: actionTypes.ADD_TIME,
    payload: {}
  };
};

export const forwardCurrentTimerIndex = () => {
  return {
    type: actionTypes.FORWARD_FOCUS
  };
};
export const addTimer = (parentId: ItemId, treeItemData: EditableTimerData) => {
  return {
    type: actionTypes.ADD_TIMER,
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
  data: Partial<EditableTimerData>
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
  data: Partial<EditableSectionData>
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

export const parseTree = () => {
  return {
    type: actionTypes.PARSE_TREE
  };
};
