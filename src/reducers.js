import { actionTypes as AT } from './actions'
import { Map, List, fromJS } from 'immutable'
import { getCurrentTimerIndex } from './util'
export const timerState = {
    INIT: 'INIT',
    ELAPSE: 'ELAPSE',
    STOP: 'STOP',
    END: 'END'
}
const { INIT, ELAPSE, STOP, END } = timerState
const initState = fromJS({
    timers: [
        {
            time: 0,
            timerState: INIT,
            timeLimit: 3
        },
        [
            {
                time: 0,
                timerState: INIT,
                timeLimit: 2
            },
            {
                time: 0,
                timerState: INIT,
                timeLimit: 2
            },
        ],
        {
            time: 0,
            timerState: INIT,
            timeLimit: 5
        },
        [
            {
                time: 0,
                timerState: INIT,
                timeLimit: 2
            },
            {
                time: 0,
                timerState: INIT,
                timeLimit: 2
            },
            [
                {
                    time: 0,
                    timerState: INIT,
                    timeLimit: 3
                },
                {
                    time: 0,
                    timerState: INIT,
                    timeLimit: 3
                },

            ],

        ],
    ]
})
const initTimer = (elem) => {
    return elem.set('time', 0).set('timerState', INIT)
}
export const initTimersRecursive = (timers) => {
    return timers.map((v, i) => {
        if (List.isList(v)) {
            return initTimersRecursive(v)
        } else {
            return initTimer(v)
        }
    })
}
export const rootReducer = (state = initState, action) => {
    const idx = getCurrentTimerIndex(state.get('timers'))
    if (idx) {
        const idxToTime = ['timers', ...idx, 'time']
        const idxToTs = ['timers', ...idx, 'timerState']
        const idxToTl = ['timers', ...idx, 'timeLimit']

        switch (action.type) {
            case AT.ADD:
                return state.updateIn(idxToTime, time => time + action.payload.time)
            case AT.START:
                return state.setIn(idxToTs, ELAPSE)
            case AT.PAUSE:
                return state.setIn(idxToTs, STOP)
            case AT.RESET:
                return state.set('timers', initTimersRecursive(state.get('timers')))
            case AT.FINISH:
                return state.setIn(idxToTs, END).setIn(idxToTime, state.getIn(idxToTl))
            case AT.ADD_TIMER:
                return state.update('timers', timers => timers.push(
                    Map({
                        time: 0,
                        timerState: INIT,
                        timeLimit: action.payload.timeLimit
                    })
                ))
            default:
                return state
        }
    } else {
        switch (action.type) {
            case AT.RESET:
                return state.set('timers', initTimersRecursive(state.get('timers')))
            default:
                return state
        }
    }
}