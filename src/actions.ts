import { ItemId, TreeData } from "@atlaskit/tree"
import { Timers } from "./types"

export const actionTypes = {
    ADD: 'ADD',
    START: 'START',
    PAUSE: 'PAUSE',
    RESET: 'RESET',
    FINISH: 'FINISH',
    ADD_TIMER: 'ADD_TIMER',
    SET_TIMERS: 'SET_TIMERS',
    SET_TREE: 'SET_TREE',
    ADD_TREE_ITEM: 'ADD_TREE_ITEM',
    ADD_SECTION: 'ADD_SECTION',
    REMOVE_ITEM: 'REMOVE_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    COPY_ITEM: 'COPY_ITEM'
}

export const addTime = (time: number) => {
    return {
        type: actionTypes.ADD,
        payload: {
            time,
        }
    }
}
export const startTimer = () => {
    return {
        type: actionTypes.START,
    }
}
export const stopTimer = () => {
    return {
        type: actionTypes.PAUSE,
    }
}
export const resetTimer = () => {
    return {
        type: actionTypes.RESET
    }
}
export const finishTimer = () => {
    return {
        type: actionTypes.FINISH,
    }
}
export const addTimer = (parentId: ItemId, timeLimit: number) => {
    return {
        type: actionTypes.ADD_TIMER,
        payload: {
            parentId,
            timeLimit
        }
    }
}
export const setTimers = (timers: Timers) => {
    return {
        type: actionTypes.SET_TIMERS,
        payload: {
            timers
        }
    }
}

export const setTree = (tree: TreeData) => {
    return {
        type: actionTypes.SET_TREE,
        payload: {
            tree
        }
    }
}

export const addTreeItem = (parentId: ItemId, timeLimit: number) => {
    return {
        type: actionTypes.ADD_TREE_ITEM,
        payload: {
            parentId,
            timeLimit
        }
    }
}
export const addSection = (parentId: ItemId, title: number) => {
    return {
        type: actionTypes.ADD_SECTION,
        payload: {
            parentId,
            title
        }
    }
}
export const removeItem = (removeItemId: ItemId) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        payload: {
            removeItemId
        }
    }
}
export const editItem = (editItemId: ItemId, content: any) => {
    return {
        type: actionTypes.EDIT_ITEM,
        payload: {
            editItemId,
            content
        }
    }
}
export const copyItem = (originItemId: ItemId) => {
    return {
        type: actionTypes.COPY_ITEM,
        payload: {
            originItemId
        }
    }
}