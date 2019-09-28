import { actionTypes as AT } from './actions';
export const timerState = {
    INIT: 'INIT',
    ELAPSE: 'ELAPSE',
    STOP: 'STOP',
    END: 'END'
}
const initState = {
    timers: [
        {
            time: 0,
            timerState: timerState.INIT,
            timeLimit: 3
        },
        [
            {
                time: 0,
                timerState: timerState.INIT,
                timeLimit: 2
            },
            {
                time: 0,
                timerState: timerState.INIT,
                timeLimit: 2
            },
        ],
        {
            time: 0,
            timerState: timerState.INIT,
            timeLimit: 5
        },
        [
            {
                time: 0,
                timerState: timerState.INIT,
                timeLimit: 2
            },
            {
                time: 0,
                timerState: timerState.INIT,
                timeLimit: 2
            },
            [
                {
                    time: 0,
                    timerState: timerState.INIT,
                    timeLimit: 3
                },
                {
                    time: 0,
                    timerState: timerState.INIT,
                    timeLimit: 3
                },

            ],

        ],
    ]
}
export const changeElementRecursively = (array, callback) => {

    for (let idx in array) {
        let elem = array[idx]
        let retval = callback(elem)
        let isArr = Array.isArray(elem)

        if (isArr) {
            let isFound = changeElementRecursively(array[idx], callback)
            if (!isFound) continue
            return isFound
        } else if (retval) {
            array.splice(idx, 1, retval)
            return true
        }
    }
    return false
}
export const changeAllElementRecursively = (array, callback) => {
    for (let idx in array) {
        let elem = array[idx]
        let retval = callback(elem)
        if (Array.isArray(elem)) {
            changeAllElementRecursively(array[idx], callback)
        } else if (retval) {
            array.splice(idx, 1, retval)
        }
    }
}
export const rootReducer = (state = initState, action) => {
    const pl = action.payload
    let newTimers = JSON.parse(JSON.stringify(state.timers))
    switch (action.type) {
        case AT.ADD:
            changeElementRecursively(newTimers, elem => {
                const ts = elem.timerState
                if (ts === timerState.ELAPSE) {
                    return {
                        ...elem,
                        time: elem.time + action.payload.time
                    }
                } else {
                    return null
                }
            })
            return {
                ...state,
                timers: newTimers
            }
        case AT.START:
            changeElementRecursively(newTimers, elem => {
                const ts = elem.timerState
                if (ts === timerState.INIT || ts === timerState.STOP) {
                    return {
                        ...elem,
                        timerState: timerState.ELAPSE
                    }
                } else {
                    return null
                }
            })
            return {
                ...state,
                timers: newTimers
            }
        case AT.PAUSE:
            changeElementRecursively(newTimers, elem => {
                const ts = elem.timerState
                if (ts === timerState.ELAPSE) {
                    return {
                        ...elem,
                        timerState: timerState.STOP
                    }
                } else {
                    return null
                }
            })
            return {
                ...state,
                timers: newTimers
            }
        case AT.RESET:
            changeAllElementRecursively(newTimers, elem => {
                const ts = elem.timerState
                if (ts === timerState.STOP || ts === timerState.END) {
                    return {
                        ...elem,
                        timerState: timerState.INIT,
                        time: 0
                    }
                } else {
                    return null
                }
            })
            return {
                ...state,
                timers: newTimers
            }
        case AT.FINISH:
            changeElementRecursively(newTimers, elem => {
                const ts = elem.timerState
                if (ts === timerState.ELAPSE || ts === timerState.STOP) {
                    return {
                        ...elem,
                        timerState: timerState.END,
                        time: elem.timeLimit
                    }
                } else {
                    return null
                }
            })
            return {
                ...state,
                timers: newTimers
            }
        case AT.ADD_TIMER:
            newTimers.push({
                time: 0,
                timerState: timerState.INIT,
                timeLimit: pl.timeLimit
            })
            return {
                ...state,
                timers: newTimers
            }
        default:
            return state
    }
}