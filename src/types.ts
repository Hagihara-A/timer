import { TreeData, TreeItem } from "@atlaskit/tree";

export type Timers = TreeItem[];
export interface Action {
  type: string;
  payload: any;
}
export interface State {
  timers: Timers;
  tree: TreeData;
}
