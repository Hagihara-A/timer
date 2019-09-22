import { actionTypes as AT } from './actions';
export const timerState = {
    INIT: 'INIT',
    ELAPSE: 'ELAPSE',
    STOP: 'STOP',
    END: 'END'
}
const allowedAction = {
    INIT: new Set([AT.RESET, AT.START]),
    ELAPSE: new Set([AT.RESET, AT.PAUSE, AT.SKIP, AT.ADD, AT.FINISH]),
    STOP: new Set([AT.RESET, AT.START, AT.SKIP, AT.PAUSE, AT.FINISH]),
    END: new Set([AT.RESET])
}
const initState = {
    timers: [
        {
            time: 0,
            timerState: timerState.INIT,
            timeLimit: 3
        },
        {
            time: 0,
            timerState: timerState.INIT,
            timeLimit: 5
        }
    ]
}
export const rootReducer = (state = initState, action) => {
    const pl = action.payload
    const newTimers = state.timers.slice()
    const maxIdx = state.timers.length - 1

    if (pl && pl.hasOwnProperty('index')) {
        if (pl.index > maxIdx ||
            !isValidAction(state.timers[pl.index].timerState, action.type)) {
            return state
        }
    }

    switch (action.type) {
        case AT.ADD:
            newTimers[pl.index].time += pl.time
            return {
                ...state,
                timers: newTimers
            }
        case AT.START:
            newTimers[pl.index].timerState = timerState.ELAPSE
            return {
                ...state,
                timers: newTimers
            }
        case AT.PAUSE:
            newTimers[pl.index].timerState = timerState.STOP
            return {
                ...state,
                timers: newTimers
            }
        case AT.RESET:
            const initTimers = newTimers.map((v) =>
                ({
                    ...v,
                    timerState: timerState.INIT,
                    time: 0
                })
            )
            return {
                ...state,
                timers: initTimers
            }
        case AT.FINISH:
            newTimers[pl.index].timerState = timerState.END
            newTimers[pl.index].time = state.timers[pl.index].timeLimit
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

export function isValidAction(timerState, type) {
    return allowedAction[timerState].has(type)
}

// function getSpecifiedTimer(state, indexes) {
//     let timer = state.timers
//     for (let idx of indexes) {
//         timer = timer[idx]
//     }
//     return timer
// }