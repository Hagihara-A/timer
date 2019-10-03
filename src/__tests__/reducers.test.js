import { fromJS, Map } from "immutable"
import { timerState, initTimersRecursive, rootReducer } from "../reducers"
import { actionTypes as AT } from "../actions"

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
const elapsedState = fromJS({
    timers: [
        {
            time: 3,
            timerState: END,
            timeLimit: 3
        },
        [
            {
                time: 2,
                timerState: END,
                timeLimit: 2
            },
            {
                time: 0,
                timerState: END,
                timeLimit: 2
            },
        ],
        {
            time: 5,
            timerState: END,
            timeLimit: 5
        },
        [
            {
                time: 2,
                timerState: END,
                timeLimit: 2
            },
            {
                time: 2,
                timerState: END,
                timeLimit: 2
            },
            [
                {
                    time: 3,
                    timerState: END,
                    timeLimit: 3
                },
                {
                    time: 2,
                    timerState: ELAPSE,
                    timeLimit: 3
                },

            ],

        ],
    ]
})
test('initTimerRecursive', () => {
    const initTimers = initTimersRecursive(elapsedState.get('timers'))
    expect(initTimers).toEqual(initState.get('timers'))
})
test('type: ADD', () => {
    const state = initState.setIn(['timers', 0, 'timerState'], ELAPSE)
    const nextState = rootReducer(state, {
        type: AT.ADD,
        payload: {
            time: 1
        }
    })
    expect(nextState).toEqual(initState.setIn(['timers', 0], Map({ timerState: ELAPSE, timeLimit: 3, time: 1 })))
})

test('type: START', () => {
    const state = initState
        .setIn(['timers', 0, 'timerState'], END)
        .setIn(['timers', 1, 0, 'timerState'], END)

    const nextState = rootReducer(state, { type: AT.START })
    const exp = state.setIn(['timers', 1, 1, 'timerState'], ELAPSE)
    expect(nextState).toEqual(exp)
})

test('type: PAUSE', () => {
    const state = initState
        .setIn(['timers', 0, 'timerState'], END)
        .setIn(['timers', 1, 0, 'timerState'], ELAPSE)

    const nextState = rootReducer(state, { type: 'PAUSE' })
    expect(nextState).toEqual(state.setIn(['timers', 1, 0, 'timerState'], STOP))
})

test('type: RESET', () => {
    const nextState = rootReducer(elapsedState, { type: 'RESET' })
    expect(nextState).toEqual(initState)
})

test('type: FINISH', () => {
    const state = initState
        .setIn(['timers', 0, 'timerState'], END)
        .setIn(['timers', 1, 0, 'timerState'], ELAPSE)
    const nextState = rootReducer(state, { type: 'FINISH' })
    let target = state.getIn(['timers', 1, 0])
    target = target.set('time', target.get('timeLimit')).set('timerState', END)
    expect(nextState).toEqual(state.setIn(['timers', 1, 0], target))
})