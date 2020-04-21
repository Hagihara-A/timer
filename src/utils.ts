import {
  SectionTreeItemData,
  TimerTreeItemData,
  TreeItemData,
  State,
} from "./types";
import { useSelector } from "react-redux";

export const isSection = (data: TreeItemData): data is SectionTreeItemData => {
  if ("repeat" in data && "count" in data && !("timeLimit" in data))
    return true;
  else return false;
};

export const isTimer = (data: TreeItemData): data is TimerTreeItemData => {
  if ("elapsedTime" in data && "power" in data && !("repeat" in data))
    return true;
  else return false;
};

export const useAppState = <T extends (state: State) => any>(
  fn: T
): ReturnType<T> => useSelector(fn);
