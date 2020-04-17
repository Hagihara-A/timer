import { SectionTreeItemData, TimerTreeItemData, TreeItemData } from "./types";

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
