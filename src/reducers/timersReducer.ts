import produce, { Draft } from "immer";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, TimersListData, TimerList } from "../types";
import { isTimer, isSection } from "../utils";
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
export const isSamePath = (a: Path, b: Path) => {
  if (a.length === b.length) {
    return a.every((_, i) => a[i] === b[i]);
  } else {
    return false;
  }
};
export const getAllParentIdxs = (
  timerList: TimerList,
  basePath: Path
): number[] => {
  return timerList.reduce((accum, val, idx) => {
    if (isParent(val.path, basePath)) return accum.concat(idx);
    return accum;
  }, []);
};

export const isLastTimer = (timerList: TimerList, path: Path) => {
  const lastIdx = path.length - 1;
  const nextSiblingPath = [...path];
  nextSiblingPath.splice(lastIdx, 1, path[lastIdx] + 1);
  const nextSiblingItem = timerList.find(item =>
    isSamePath(item.path, nextSiblingPath)
  );
  if (typeof nextSiblingItem === "undefined") return true;
  return !isTimer(nextSiblingItem.item.data);
};
export const getItemFromPath = (timerList: TimerList, path: Path) => {
  return timerList.find(item => isSamePath(item.path, path));
};

export const isFullyCounted = (timerList: TimerList, path: Path) => {
  const item = getItemFromPath(timerList, path).item;
  if (isSection(item.data)) {
    return item.data.repeat === item.data.count;
  } else {
    return item.data.elapsedTime === item.data.elapsedTime;
  }
};

export const countUpNearestSection = (timerList: TimerList, currPath: Path) => {
  const parentIdxs = getAllParentIdxs(timerList, currPath).reverse();
  for (let idx of parentIdxs) {
    let parentItem = timerList[idx];
    if (
      !isFullyCounted(timerList, parentItem.path) &&
      isSection(parentItem.item.data)
    ) {
      parentItem.item.data.count++;
      return parentItem.path;
    }
  }

  return;
};

export const getFirstTimerIdx = (timerList: TimerList, path: Path) => {
  return timerList.findIndex(
    v => isParent(path, v.path) && isTimer(v.item.data)
  );
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
        // if ("focusがタイマーを指していたら") {
        //   if ("経過時間がタイムリミットより小さいなら") {
        //     "タイマーを1カウントアップ";
        //   }
        //   if ("タイムリミットに達したら") {
        //     if ("階層の最後のタイマーだったら") {
        //       "一番近い親からカウントアップ";
        //       if ("全ての親が最大カウントになったら") {
        //         "次のタイマーへ";
        //       } else {
        //         "カウントアップされた親の子アイテムを初期化";
        //         "カウントアップされた親の、最初の子タイマーへ移動";
        //       }
        //     } else {
        //       "次の弟タイマーへ";
        //     }
        //   }
        // } else {
        //   "エラー";
        // }
        const focus = draft.currentTimerIndex;
        const { item: currTimer, path: currPath } = draft.timerList[focus];
        if (isTimer(currTimer.data)) {
          if (!isFullyCounted(draft.timerList, currPath)) {
            currTimer.data.elapsedTime++;
          }
          if (isFullyCounted(draft.timerList, currPath)) {
            if (isLastTimer(draft.timerList, currPath)) {
              const ltRepeatParentPath = countUpNearestSection(
                draft.timerList,
                currPath
              );
              if (isFullyCounted(draft.timerList, currPath)) {
                draft.currentTimerIndex = nextFocus(draft.timerList, focus);
              } else {
                initItems(draft.timerList, ltRepeatParentPath);
                draft.currentTimerIndex = getFirstTimerIdx(
                  draft.timerList,
                  ltRepeatParentPath
                );
              }
            }
          } else {
            draft.currentTimerIndex = nextFocus(draft.timerList, focus);
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
