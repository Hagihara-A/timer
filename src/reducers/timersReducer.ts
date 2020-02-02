import { Draft } from "immer";
import { initState } from "../initState";
import { Action, Timers } from "../types";
export const timersReducer = (
  timers: Draft<Timers> = initState.timers,
  action: Action
) => {
  switch (action.type) {
    default:
      return timers;
  }
};
