import { ItemId } from "@atlaskit/tree";
import { fromJS, List, Map } from "immutable";
import { actionTypes as AT } from "../actions";
import { initState } from "../initState";
import { Action, TreeDataIm, TreeItemIm } from "../types";
import { getNewItemIds } from "../util";
const setNewItemOnTree = (tree: TreeDataIm, parentId: ItemId, data = {}) => {
  const newId = getNewItemIds(tree, 1).get(0);
  let newTree = tree.updateIn(["items", parentId, "children"], children =>
    children.push(newId)
  );

  const newItem = fromJS({
    id: newId,
    children: [],
    hasChildren: false,
    isExpanded: false,
    isChildrenLoading: false,
    data
  });

  newTree = newTree.setIn(["items", newId], newItem);
  return newTree;
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
      const { editItemId, content } = action.payload;
      if (tree.getIn(["items", editItemId, "data", "title"])) {
        return tree.setIn(["items", editItemId, "data", "title"], content);
      } else {
        return tree.setIn(["items", editItemId, "data", "timeLimit"], content);
      }
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
    default:
      return tree;
  }
};
export default treeReducer;
