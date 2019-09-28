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
export const startTimer = (index) => {
    return {
        type: actionTypes.START,
    }
}
export const stopTimer = (index) => {
    return {
        type: actionTypes.PAUSE,
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