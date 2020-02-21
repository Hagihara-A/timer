import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, TimersListData, TimerList } from "../types";
import { isTimer } from "../utils";
import { Path } from "@atlaskit/tree";

export const nextFocus = (timerList: TimerList, focus: number) => {
  return (
    timerList.slice(focus + 1).findIndex(v => isTimer(v.item.data)) + focus + 1
  );
};
export const isParent = (a: Path, b: Path) => {
  if (a.length > b.length) {
    return b.every((n, i) => n === a[i]);
  } else if (a.length < b.length) {
    return a.every((n, i) => n === b[i]);
  } else {
    return false;
  }
};
export const getAllParentIdxs = (timerList: TimerList, basePath: Path) => {
  return timerList.reduce((accum, val, idx) => {
    if (isParent(val.path, basePath)) return accum.concat(idx);
    return accum;
  }, []);
};
export const timersReducer = produce(
  (draft: Draft<TimersListData>, action: Action) => {
    switch (action.type) {
      case AT.FORWARD_FOCUS: {
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
