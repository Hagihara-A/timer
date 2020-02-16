import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, TimersListData, TimerList } from "../types";
import { isTimer } from "../utils";

export const nextFocus = (timerList: TimerList, focus: number) => {
  return (
    timerList.slice(focus + 1).findIndex(v => isTimer(v.item.data)) + focus + 1
  );
};
export const timersReducer = produce(
  (draft: Draft<TimersListData>, action: Action) => {
    switch (action.type) {
      case AT.CHANGE_FOCUS: {
        draft.currentTimerIndex = nextFocus(
          draft.timerList,
          draft.currentTimerIndex
        );
        break;
      }
      case AT.ADD_TIME: {
        const focus = draft.currentTimerIndex;
        const currTimer = draft.timerList[focus].item;
        if (isTimer(currTimer.data)) {
          if (currTimer.data.elapsedTime < currTimer.data.timeLimit) {
            currTimer.data.elapsedTime++;
          }
          // do focus++ until item is Timer
          if (currTimer.data.elapsedTime >= currTimer.data.timeLimit) {
            const nextTimerIdx = nextFocus(draft.timerList, focus);
            draft.currentTimerIndex = nextTimerIdx;
          }
        } else {
          throw new TypeError(
            `currentTimerIndex:${draft.currentTimerIndex}  indecates Section`
          );
        }
        break;
      }
      default:
        break;
    }
  },
  initState.timers
);
