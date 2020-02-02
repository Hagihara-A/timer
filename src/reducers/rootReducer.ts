import { flattenTree } from "@atlaskit/tree/dist/cjs/utils/tree";
import produce from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action } from "../types";
import { timersReducer } from "./timersReducer";
import { treeReducer } from "./treeReducer";

// Child reducer should return draft state passed from parent reducer.
// It doen't make a difference between `return draft` and `break`.Former is preferred.
export const rootReducer = produce((draft, action: Action) => {
  switch (action.type) {
    case AT.FLATTEN_TREE: {
      draft.timers = flattenTree(draft.tree);
      return draft;
    }
    default: {
      draft.timers = timersReducer(draft.timers, action);
      draft.tree = treeReducer(draft.tree, action);
      return draft;
    }
  }
}, initState);
