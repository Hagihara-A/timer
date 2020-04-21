import {
  ItemId,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import { EditableSectionData, EditableTimerData } from "./types";
import { User } from "firebase";

export const actionTypes = {
  ADD_TIMER: "ADD_TIMER",
  REMOVE_ITEM: "REMOVE_ITEM",
  EDIT_TIMER: "EDIT_TIMER",
  EDIT_SECTION: "EDIT_SECTION",
  ON_DRAG_END: "ON_DRAG_END",
  TOGGLE_PROPERTY: "TOGGLE_PROPERTY",
  ADD_TIME: "ADD_TIME",
  RESET_TIMER: "RESET_TIMER",
  CLEANSE_TREE: "CLEANSE_TREE",
  TOGGLE_IS_DRAG_ENABLED: "TOGGLE_IS_DRAG_ENABLED",
  SET_USER: "SET_USER",
} as const;

export const addTime = () => {
  return {
    type: actionTypes.ADD_TIME,
    payload: {},
  };
};

export const addTimer = (parentId: ItemId, treeItemData: EditableTimerData) => {
  return {
    type: actionTypes.ADD_TIMER,
    payload: {
      parentId,
      ...treeItemData,
    },
  };
};
export const removeItem = (id: ItemId) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: {
      id,
    },
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
      data,
    },
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
      data,
    },
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
      destination,
    },
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
      prop,
    },
  };
};

export const toggleIsDragEnabled = () => {
  return {
    type: actionTypes.TOGGLE_IS_DRAG_ENABLED,
  };
};

export const resetTimer = () => {
  return {
    type: actionTypes.RESET_TIMER,
  };
};

export const cleanseTree = () => {
  return {
    type: actionTypes.CLEANSE_TREE,
  };
};

export const setUser = (user: User) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      user,
    },
  };
};
