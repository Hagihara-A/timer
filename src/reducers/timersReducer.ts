import produce, { Draft } from "immer";
import { initState } from "../initState";
import { Action, Timers } from "../types";
import { actionTypes as AT } from "../actions";
export const timersReducer = produce((draft: Draft<Timers>, action: Action) => {
  switch (action.type) {
    case AT.CHANGE_FOCUS: {
      const { mode } = action.payload;
      if (mode === "+") {
        draft.currentTimerIndex++;
      } else {
        draft.currentTimerIndex--;
      }
      break;
    }
    case AT.ADD_TIME: {
      const focus = draft.currentTimerIndex;
      draft.timerList[focus].item.data.time++;
      break;
    }
    default:
      break;
  }
}, initState.timers);
