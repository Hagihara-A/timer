import {
  ItemId,
  TreeData as AtlasTreeData,
  TreeItem as AtlasTreeItem,
} from "@atlaskit/tree";
import * as actionCreator from "./actions";

export type State = Readonly<MutableState>;
export interface MutableState {
  tree: TreeData;
  options: Options;
}
export interface Options {
  isDragEnabled: boolean;
}
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

export type EditableTimerData = Pick<
  TimerTreeItemData,
  "power" | "timeLimit" | "comment"
>;
export type EditableSectionData = Pick<
  SectionTreeItemData,
  "repeat" | "comment"
>;

// Action definition
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
type UnWrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
export type Action = UnWrap<ReturnTypes<typeof actionCreator>>;
