import { ItemId, mutateTree, TreeData, TreeDestinationPosition, TreeItem, TreeSourcePosition } from '@atlaskit/tree'
import { List, Map } from 'immutable'
import { timerState } from './reducers/timersReducer'
import { TreeDataIm, Timers } from './types'

export function getCurrentTimerIndex(timers) {
    for (let idx = 0; idx < timers.size; idx++) {
        let elem = timers.get(idx)
        if (List.isList(elem)) {
            const childIndex = getCurrentTimerIndex(elem)
            if (childIndex) {
                return childIndex.unshift(idx)
            }
        } else {
            const ts = elem.get('timerState')
            if (ts === timerState.INIT || ts === timerState.ELAPSE || ts === timerState.STOP) {
                return List([idx])
            }
        }
    }
    return null
}

export const parseTreeData = (treeData: TreeData): Timers => {
    const parseChild = (treeData: TreeData, item: TreeItem) => {
        const childrenData = []
        if (item.children.length > 0) {
            // eslint-disable-next-line no-unused-vars
            for (const childId of item.children) {
                const childItem = treeData.items[childId]
                const childData = parseChild(treeData, childItem)
                childrenData.push(childData)
            }
            return childrenData.filter(v => v) //remove undefined(in case of child doesn't have children nor timeLimit)
        } else if (item.data.timeLimit) {
            return {
                time: 0,
                timerState: 'INIT',
                timeLimit: item.data.timeLimit
            }
        }
    }

    const rootId = treeData.rootId
    const rootItem = treeData.items[rootId]

    return parseChild(treeData, rootItem)
}
export const getNewItemIds = (tree: TreeData | TreeDataIm, numIds: number) => {
    const startNum = Map.isMap(tree) ? tree.get('items').size - 1 : Object.keys(tree.items).length - 1
    let newIds = List<ItemId>([])
    for (let i = startNum; i < numIds + startNum; i++) {
        newIds = newIds.push(String(i))
    }
    return newIds
}
const initTreeItem = {
    children: [],
    hasChildren: false,
    isExpanded: true,
    isChildrenLoading: false,
    data: {}
}
export const addItemToTree = (tree: TreeData, item: TreeItem) => {
    return {
        ...tree,
        items: {
            ...tree.items,
            [item.id]: {
                ...initTreeItem,
                ...item
            }
        }
    }
}

export const getParentItem = (tree: TreeData, childId: ItemId) => {
    const parentItemEnt = Object.entries(tree.items).filter(ent => ent[1].children.includes(childId))
    return Object.values(Object.fromEntries(parentItemEnt))[0]
}
export const removeItemFromTree = (tree: TreeData, itemId: ItemId) => {
    const parentItem = getParentItem(tree, itemId)

    const newChildren = parentItem.children.filter(id => id !== itemId)
    return mutateTree(tree, parentItem.id, { children: newChildren, hasChildren: newChildren.length > 0 })
}
export const combineTwoTimersToSection = (tree: TreeData, source: TreeSourcePosition, destination: TreeDestinationPosition) => {
    const dstItemId = destination.parentId
    const srcItemId = tree.items[source.parentId].children[source.index]

    const newSectionId = getNewItemIds(tree, 1).get(0)
    const newSection = {
        ...initTreeItem,
        id: newSectionId,
        children: [destination.parentId, srcItemId],
        data: {
            title: 'Write Here!'
        }
    }

    let newTree = removeItemFromTree(tree, srcItemId)

    const dstParentItem = getParentItem(newTree, dstItemId)
    const newChildren = [...dstParentItem.children].map(id => (id === dstItemId) ? newSectionId : id)
    newTree = addItemToTree(tree, newSection)

    newTree = mutateTree(newTree, dstParentItem.id, { children: newChildren })
    return newTree
}