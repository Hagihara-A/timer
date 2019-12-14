import {
  ItemId,
  TreeDestinationPosition,
  TreeSourcePosition
} from "@atlaskit/tree";
import { fromJS, List, Map } from "immutable";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, TreeDataIm, TreeItemIm } from "../types";
import { getNewItemIds } from "../util";

const initTreeItem = fromJS({
  children: [],
  hasChildren: false,
  isExpanded: false,
  isChildrenLoading: false
});
export const setNewItemOnTree = (
  tree: TreeDataIm,
  parentId: ItemId,
  data = {}
) => {
  const newId = getNewItemIds(tree, 1).get(0);
  let newTree = tree.updateIn(["items", parentId, "children"], children =>
    children.push(newId)
  );

  const newItem = initTreeItem.withMutations(item =>
    item.set("id", newId).set("data", Map(data))
  );
  newTree = newTree.setIn(["items", newId], newItem);
  return newTree;
};
const getItemIdFromPosition = (
  tree: TreeDataIm,
  position: TreeDestinationPosition
): ItemId => {
  if (typeof position.index === "undefined") return position.parentId;
  else {
    return tree.getIn(["items", position.parentId, "children", position.index]);
  }
};

export const getParentItem = (
  tree: TreeDataIm,
  childId: ItemId
): TreeItemIm => {
  return tree.get("items").find((item: TreeItemIm) => {
    return item.get("children").includes(childId);
  });
};
export const getAllChildrenIds = (
  tree: TreeDataIm,
  parentItemId: ItemId
): List<ItemId> => {
  return tree
    .getIn(["items", parentItemId, "children"])
    .reduce((accum: List<ItemId>, id: ItemId) => {
      if (tree.getIn(["items", id, "children"]).size > 0) {
        return accum.concat(getAllChildrenIds(tree, id));
      } else {
        return accum.push(id);
      }
    }, List([parentItemId]));
};

export const removeItemFromTree = (
  tree: TreeDataIm,
  position: TreeSourcePosition
): { tree: TreeDataIm; itemRemoved: ItemId } => {
  const sourceParent = tree.getIn(["items", position.parentId]);
  const newSourceChildren = sourceParent.get("children").delete(position.index);
  const itemRemoved = getItemIdFromPosition(tree, position);
  const newTree = tree.withMutations(tree =>
    tree
      .setIn(["items", position.parentId, "children"], newSourceChildren)
      .setIn(
        ["items", position.parentId, "hasChildren"],
        newSourceChildren.size > 0
      )
      .setIn(
        ["items", position.parentId, "isExpanded"],
        newSourceChildren.size > 0 && sourceParent.get("isExpanded")
      )
  );

  return {
    tree: newTree,
    itemRemoved
  };
};

export const addItemToTree = (
  tree: TreeDataIm,
  position: TreeDestinationPosition,
  item: ItemId
): TreeDataIm => {
  const destinationParent = tree.getIn(["items", position.parentId]);
  if (typeof position.index === "undefined") {
    if (destinationParent.get("children").size === 0) {
      return tree.withMutations(tree => {
        const itemToMutate = tree.getIn(["items", position.parentId]);
        const newItem = itemToMutate
          .update("children", children => children.push(item))
          .set("hasChildren", true)
          .set("isExpanded", true);
        return tree.setIn(["items", position.parentId], newItem);
      });
    }
  } else {
    return tree.updateIn(
      ["items", position.parentId, "children"],
      (children: List<ItemId>) => children.insert(position.index, item)
    );
  }
};
const moveItemOnTree = (
  tree: TreeDataIm,
  from: TreeSourcePosition,
  to: TreeDestinationPosition
): TreeDataIm => {
  const { tree: newTree, itemRemoved } = removeItemFromTree(tree, from);
  return addItemToTree(newTree, to, itemRemoved);
};

const treeReducer = (
  tree: TreeDataIm = initState.get("tree"),
  action: Action
) => {
  switch (action.type) {
    case AT.SET_TREE:
      return fromJS(action.payload.tree);
    case AT.ADD_TREE_ITEM: {
      const { parentId, timeLimit } = action.payload;
      return setNewItemOnTree(tree, parentId, { timeLimit });
    }
    case AT.ADD_SECTION: {
      const { parentId, title } = action.payload;
      return setNewItemOnTree(tree, parentId, { title });
    }
    case AT.REMOVE_ITEM: {
      const { removeItemId } = action.payload;
      const parentItem = tree
        .get("items")
        .find((value: TreeItemIm) =>
          value.get("children").some((id: ItemId) => id === removeItemId)
        );
      const parentId = parentItem.get("id");
      const removeItemIndex = parentItem.get("children").indexOf(removeItemId);
      return tree
        .deleteIn(["items", parentId, "children", removeItemIndex])
        .deleteIn(["items", removeItemId]);
    }
    case AT.EDIT_ITEM: {
      const { editItemId, data } = action.payload;
      return tree.updateIn(["items", editItemId, "data"], originData =>
        originData.merge(data)
      );
    }
    case AT.COPY_ITEM: {
      const { originItemId } = action.payload;

      const childrenIds = getAllChildrenIds(tree, originItemId);
      const newItemIds = getNewItemIds(tree, childrenIds.size);
      const correspond = Map(childrenIds.zip(newItemIds));

      const newItems = childrenIds.reduce((accItems, curId) => {
        const curItem: TreeItemIm = tree.getIn(["items", curId]);
        const newId = correspond.get(curId);
        const newChildren = curItem
          .get("children")
          .map((prevId: ItemId) => correspond.get(prevId));
        const itemToAdd = curItem.set("children", newChildren).set("id", newId);

        if (typeof newId === "string") {
          return accItems.set(newId, itemToAdd);
        } else {
          return accItems;
        }
      }, Map({}));

      const parentItem: TreeItemIm = tree
        .get("items")
        .find((item: TreeItemIm) =>
          item.get("children").some((id: ItemId) => id === originItemId)
        );
      const indexToInsert =
        parentItem
          .get("children")
          .findIndex((id: ItemId) => id === originItemId) + 1;
      const newParentChildren = parentItem
        .get("children")
        .insert(indexToInsert, correspond.get(originItemId));

      return tree
        .update("items", items => items.merge(newItems))
        .setIn(["items", parentItem.get("id"), "children"], newParentChildren);
    }
    case AT.ON_DRAG_END:
      const {
        source,
        destination
      }: {
        source: TreeSourcePosition;
        destination: TreeDestinationPosition;
      } = action.payload;
      if (!destination) return tree;
      return moveItemOnTree(tree, source, destination);
    case AT.TOGGLE_PROPERTY:
      const {
        id,
        property
      }: {
        id: ItemId;
        property: Pick<
          TreeItemIm,
          "hasChildren" | "isExpanded" | "isChildrenLoading"
        >;
      } = action.payload;
      return tree.updateIn(["items", id, property], flag => !flag);

    default:
      return tree;
  }
};
export default treeReducer;
