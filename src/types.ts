import {
  ItemId,
  TreeData as AtlasTreeData,
  TreeItem as AtlasTreeItem
} from "@atlaskit/tree";
import { FlattenedItem } from "@atlaskit/tree/dist/cjs/types";
import * as actionCreator from "./actions";

export type State = Readonly<MutableState>;
export interface MutableState {
  tree: TreeData;
  timers: TimersListData;
}
//  state.tree type definition
export interface TreeData extends AtlasTreeData {
  items: Record<ItemId, TreeItem>;
}
export interface TreeItem extends AtlasTreeItem {
  data?: TreeItemData;
}
export type TreeItemData = TimerTreeItemData | SectionTreeItemData;
export interface TimerTreeItemData {
  timeLimit: number;
  power: number;
  comment: string;
  elapsedTime: number;
}

export interface SectionTreeItemData {
  repeat: number;
  count: number;
  comment: string;
}

// state.timers definition
export interface TimersListData {
  timerList: TimerList;
  currentTimerIndex: number | null;
}
export type TimerList = FlattendTreeItem[];

interface FlattendTreeItem extends FlattenedItem {
  item: TreeItem;
}

// Action definition
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type UnWrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
export type Action = UnWrap<ReturnTypes<typeof actionCreator>>;
