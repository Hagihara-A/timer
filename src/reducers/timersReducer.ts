import produce from "immer";
import { Action, Timers } from "../types";
import { initState } from "../initState";

export const timersReducer = produce(
  (timers: Timers = initState.timers, action: Action) => {
    switch (action.type) {
      default:
        return timers;
    }
  }
);
