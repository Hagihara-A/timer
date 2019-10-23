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
}

export const addTime = (time) => {
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
export const addTimer = (parentId, timeLimit) => {
    return {
        type: actionTypes.ADD_TIMER,
        payload: {
            parentId,
            timeLimit
        }
    }
}
export const setTimers = (timers) => {
    return {
        type: actionTypes.SET_TIMERS,
        payload: {
            timers
        }
    }
}

export const setTree = tree => {
    return {
        type: actionTypes.SET_TREE,
        payload: {
            tree
        }
    }
}

export const addTreeItem = (parentId, timeLimit) => {
    return {
        type: actionTypes.ADD_TREE_ITEM,
        payload: {
            parentId,
            timeLimit
        }
    }
}