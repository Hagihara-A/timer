export const actionTypes = {
    ADD: 'ADD',
    START: 'START',
    PAUSE: 'PAUSE',
    RESET: 'RESET',
    FINISH: 'FINISH',
    ADD_TIMER: 'ADD_TIMER'
}

export const addTime = (index, time) => {
    return {
        type: actionTypes.ADD,
        payload: {
            time,
            index
        }
    }
}
export const startTimer = (index) => {
    return {
        type: actionTypes.START,
        payload: {
            index
        }
    }
}
export const stopTimer = (index) => {
    return {
        type: actionTypes.PAUSE,
        payload: {
            index
        }
    }
}
export const resetTimer = () => {
    return {
        type: actionTypes.RESET
    }
}
export const finishTimer = (index) => {
    return {
        type: actionTypes.FINISH,
        payload: {
            index
        }
    }
}
export const addTimer = (timeLimit) => {
    return {
        type: actionTypes.ADD_TIMER,
        payload: {
            timeLimit
        }
    }
}