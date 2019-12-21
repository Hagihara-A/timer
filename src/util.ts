import {
  ItemId,
  mutateTree,
  Path,
  TreeData,
  TreeDestinationPosition,
  TreeItem,
  TreeSourcePosition
} from "@atlaskit/tree";
import { timerState } from "./reducers/timersReducer";

export type TreeItemData = any;
export type FlattenedItem = {
  item: TreeItem;
  path: Path;
};

export const getNewItemIds = (tree: TreeData, numIds: number) => {
  const startNum = Object.keys(tree.items).length - 1;
  const newIds: ItemId[] = [];
  for (let i = startNum; i < numIds + startNum; i++) {
    newIds.push(String(i));
  }
  return newIds;
};
