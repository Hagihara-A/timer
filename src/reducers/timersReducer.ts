import produce, { Draft } from "immer";
import { Timers } from "../types";
import { initState } from "../initState";
import { Action } from "../types";
import { actionTypes as AT } from "../actions";
import { flattenTree } from "@atlaskit/tree/dist/cjs/utils/tree";
export const timersReducer = produce(
  (timers: Draft<Timers> = initState.timers, action: Action) => {
    switch (action.type) {
      case AT.FLATTEN_TREE: {
        return flattenTree(action.payload.sourceTree);
      }
      default:
        return timers;
    }
  }
);
