import { flattenTree } from "@atlaskit/tree/dist/cjs/utils/tree";
import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, State } from "../types";
import { timersReducer } from "./timersReducer";
import { treeReducer } from "./treeReducer";
import { isTimer } from "../utils";

// Child reducer should return draft state passed from parent reducer.
// It doen't make a difference between `return draft` and `break`.Former is preferred.
export const rootReducer = produce((draft: Draft<State>, action: Action) => {
  switch (action.type) {
    case AT.FLATTEN_TREE: {
      draft.timers.timerList = flattenTree(draft.tree);
      draft.timers.currentTimerIndex = draft.timers.timerList.findIndex(elem =>
        isTimer(elem.item.data)
      );
      break;
    }
    default: {
      draft.timers = timersReducer(draft.timers, action);
      draft.tree = treeReducer(draft.tree, action);
      break;
    }
  }
}, initState);
