export const actionTypes = {
    ADD: 'ADD',
    START: 'START',
    PAUSE: 'PAUSE',
    RESET: 'RESET',
    FINISH: 'FINISH',
    ADD_TIMER: 'ADD_TIMER'
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
export const addTimer = (timeLimit) => {
    return {
        type: actionTypes.ADD_TIMER,
        payload: {
            timeLimit
        }
    }
}