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
export const resetTimer = (index) => {
    return {
        type: actionTypes.RESET,
        payload: {
            index
        }
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
// export const skipTimer = (index) => {
//     return {
//         type: actionTypes.SKIP,
//         payload: {
//             index
//         }
//     }
// }

// export const timeLimitTimer = (index) => {
//     return {
//         type: actionTypes.TIME_LIMIT,
//         payload: {
//             index
//         }
//     }
// }
export const addTimer = (timeLimit) => {
    return {
        type: actionTypes.ADD_TIMER,
        payload: {
            timeLimit
        }
    }
}