import { TreeData, TreeItem } from "@atlaskit/tree";

export type Timers = TreeItem[];
export interface Action {
  type: string;
  payload: any;
}
export interface State {
  readonly timers: Timers;
  readonly tree: TreeData;
}

export interface TreeItemData {
  timeLimit: number;
  times: number;
  power: number;
  comment: string;
}
