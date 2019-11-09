import { fromJS } from "immutable"
import { timerState, initTimersRecursive } from "../reducers/timersReducer"

const initState = fromJS({
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
})

test('initTimerRecursive', () => {
    const state = fromJS({
        timers: [
            {
                time: 3,
                timerState: timerState.END,
                timeLimit: 3
            },
            [
                {
                    time: 2,
                    timerState: timerState.END,
                    timeLimit: 2
                },
                {
                    time: 0,
                    timerState: timerState.END,
                    timeLimit: 2
                },
            ],
            {
                time: 5,
                timerState: timerState.END,
                timeLimit: 5
            },
            [
                {
                    time: 2,
                    timerState: timerState.END,
                    timeLimit: 2
                },
                {
                    time: 2,
                    timerState: timerState.END,
                    timeLimit: 2
                },
                [
                    {
                        time: 3,
                        timerState: timerState.END,
                        timeLimit: 3
                    },
                    {
                        time: 2,
                        timerState: timerState.ELAPSE,
                        timeLimit: 3
                    },

                ],

            ],
        ]
    })
    const ret = initTimersRecursive(state.get('timers'))

    expect(ret).toEqual(initState.get('timers'))
})