import { List, Map } from "immutable";
import { ItemId } from "@atlaskit/tree";

export interface TreeDataIm extends Map<string, any> {
  rootId: ItemId;
  items: Map<ItemId, TreeItemIm>;
}

interface data extends Map<string, number | string> {
  timeLimit: number;
  times: number;
  power: number;
  comment: string;
}

export interface TreeItemIm extends Map<string, any> {
  id: ItemId;
  children: List<ItemId>;
  hasChildren?: boolean;
  isExpanded?: boolean;
  isChildrenLoading?: boolean;
  data?: data;
}

export interface TimerItem {
  time: number;
  timerState: string;
  timeLimit: number;
}

export interface Timers {
  [index: number]: TimerItem | Timers;
}
export interface Action {
  type: string;
  payload: any;
}

export interface State extends Map<string, any> {
  timers: Map<string, any>;
  tree: TreeDataIm;
}
