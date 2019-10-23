import { List } from 'immutable'
import { timerState } from './reducers'

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

export const parseTreeData = treeData => {
    const parseChild = (treeData, item) => {
        const childrenData = []
        if (item.children.length > 0) {
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
export const getNewItemId = (tree) => {
    return String(tree.get('items').size - 1) //except root, start id from 0
}