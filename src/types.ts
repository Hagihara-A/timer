import { TreeData, TreeItem } from "@atlaskit/tree";
import * as actionCreator from "./actions";
export interface TimersItem extends TreeItem {
  data?: TreeItemData;
}

export type Timers = TimersItem[];

export interface State {
  readonly timers: Timers;
  readonly tree: TimerTreeData;
}

export interface TreeItemData {
  timeLimit: number;
  times: number;
  power: number;
  comment: string;
}

export interface TimerTreeData extends TreeData {
  data?: TreeItemData;
}

type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type UnWrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
export type Action = UnWrap<ReturnTypes<typeof actionCreator>>;
