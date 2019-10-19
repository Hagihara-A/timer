export const actionTypes = {
    ADD: 'ADD',
    START: 'START',
    PAUSE: 'PAUSE',
    RESET: 'RESET',
    FINISH: 'FINISH',
    ADD_TIMER: 'ADD_TIMER',
    SET_TIMERS: 'SET_TIMERS'
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
export const setTimers = (timers) => {
    return {
        type: actionTypes.SET_TIMERS,
        payload: {
            timers
        }
    }
}