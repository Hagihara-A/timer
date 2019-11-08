import { fromJS } from "immutable"
import { actionTypes as AT } from "../actions"
import { getNewItemId } from "../util"
import { initState } from "../initState"

const setNewItemOnTree = (tree, parentId, data = {}) => {
    const newId = getNewItemId(tree)
    let newTree = tree.updateIn(['items', parentId, 'children'], children => children.push(newId))

    const newItem = fromJS({
        id: newId,
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data
    })

    newTree = newTree.setIn(['items', newId], newItem)
    return newTree
}
export const countAllChildren = (tree, parentItemId) => {
    return tree.getIn(['items', parentItemId, 'children']).reduce((accum, childId) => {
        const childrenOfChild = tree.getIn(['items', childId, 'children'])
        if (childrenOfChild.size > 0) {
            return accum + countAllChildren(tree, childId) + 1
        } else {
            return accum + 1
        }
    }, 0)
}
const treeReducer = (tree = initState.get('tree'), action) => {
    switch (action.type) {
        case AT.SET_TREE:
            return fromJS(action.payload.tree)
        case AT.ADD_TREE_ITEM: {
            const { parentId, timeLimit } = action.payload
            return setNewItemOnTree(tree, parentId, { timeLimit })
        }
        case AT.ADD_SECTION: {
            const { parentId, title } = action.payload
            return setNewItemOnTree(tree, parentId, { title })
        }
        case AT.REMOVE_ITEM: {
            const { removeItemId } = action.payload
            const parentItem = tree.get('items').find(value => value.get('children').some(id => id === removeItemId))
            const parentId = parentItem.get('id')
            const removeItemIndex = parentItem.get('children').indexOf(removeItemId)
            return tree
                .deleteIn(['items', parentId, 'children', removeItemIndex])
                .deleteIn(['items', removeItemId])
        }
        case AT.EDIT_ITEM: {
            const { editItemId, content } = action.payload
            if (tree.getIn(['items', editItemId, 'data', 'title'])) {
                return tree.setIn(['items', editItemId, 'data', 'title'], content)
            } else {
                return tree.setIn(['tree', 'items', editItemId, 'data', 'timeLimit'], content)
            }
        }
        case AT.COPY_ITEM: {
            const { originItemId } = action.payload
            const originItem = tree.getIn(['items', originItemId])
            const numChildren = countAllChildren(tree, originItem)
            const newItemId = getNewItemId(tree)
            const newItem = originItem.set('id', newItemId)
            return tree
                .setIn(['items', newItemId], newItem)
                .updateIn(['items', 'root', 'children'], children => children.push(newItemId))
        }
        default:
            return tree
    }
}
export default treeReducer