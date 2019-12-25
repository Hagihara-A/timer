import produce from "immer";
import { Timers } from "../types";
import { initState } from "../initState";
import { Action } from "../types";

export const timersReducer = produce(
  (timers: Timers = initState.timers, action: Action) => {
    switch (action.type) {
      default:
        return timers;
    }
  }
);
