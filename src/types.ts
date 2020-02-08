import { ItemId, TreeData, TreeItem } from "@atlaskit/tree";
import { FlattenedItem } from "@atlaskit/tree/dist/cjs/types";
import * as actionCreator from "./actions";

export type State = Readonly<MutableState>;
export interface MutableState {
  tree: TimerTreeData;
  timers: Timers;
}
//  state.tree type definition
export interface TimerTreeData extends TreeData {
  items: Record<ItemId, TimerTreeItem>;
}
export interface TimerTreeItem extends TreeItem {
  data?: TimerTreeItemData;
}

export interface TimerTreeItemData {
  timeLimit: number;
  times: number;
  power: number;
  comment: string;
  time: number;
}

// state.timers definition
export interface Timers {
  timerList: TimerList;
  currentTimerIndex: number;
}
export type TimerList = FlattendTreeItem[];

interface FlattendTreeItem extends FlattenedItem {
  item: TimerTreeItem;
}

// Action definition
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type UnWrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
export type Action = UnWrap<ReturnTypes<typeof actionCreator>>;
