
import { fromJS, List } from "immutable";
import { timerState as TS } from "../reducers/timersReducer";
import { getCurrentTimerIndex } from "../util";

test('get index from initState', () => {
    const initState = fromJS({
        timers: [
            { time: 0, timerState: TS.INIT, timeLimit: 1 },
            [
                { time: 0, timerState: TS.INIT, timeLimit: 2 },
                { time: 0, timerState: TS.INIT, timeLimit: 2 },
            ],
            { time: 0, timerState: TS.INIT, timeLimit: 1 },
            [
                { time: 0, timerState: TS.INIT, timeLimit: 2 },
                [
                    { time: 0, timerState: TS.INIT, timeLimit: 3 },
                    { time: 0, timerState: TS.INIT, timeLimit: 3 },
                ]
            ]
        ]
    })
    const indexes = getCurrentTimerIndex(initState.get('timers'))

    expect(indexes).toEqual(List([0]))
})

test('get index from elapsed state', () => {
    const elapsedState = fromJS({
        timers: [
            { time: 0, timerState: TS.END, timeLimit: 1 },
            [
                { time: 0, timerState: TS.END, timeLimit: 2 },
                { time: 0, timerState: TS.END, timeLimit: 2 },
            ],
            { time: 0, timerState: TS.END, timeLimit: 1 },
            [
                { time: 0, timerState: TS.END, timeLimit: 2 },
                [
                    { time: 0, timerState: TS.END, timeLimit: 3 },
                    { time: 0, timerState: TS.ELAPSE, timeLimit: 3 },
                ]
            ]
        ]
    })

    const indexes = getCurrentTimerIndex(elapsedState.get('timers'))
    expect(indexes).toEqual(List([3, 1, 1]))
})

test('get index from  all-END timers', () => {
    const timers = fromJS(
        [
            {
                time: 3,
                timerState: TS.END,
                timeLimit: 3
            },
            [
                {
                    time: 2,
                    timerState: TS.END,
                    timeLimit: 2
                },
                {
                    time: 2,
                    timerState: TS.END,
                    timeLimit: 2
                },
            ],
            {
                time: 5,
                timerState: TS.END,
                timeLimit: 5
            },
            [
                {
                    time: 2,
                    timerState: TS.END,
                    timeLimit: 2
                },
                {
                    time: 2,
                    timerState: TS.END,
                    timeLimit: 2
                },
                [
                    {
                        time: 3,
                        timerState: TS.END,
                        timeLimit: 3
                    },
                    {
                        time: 3,
                        timerState: TS.END,
                        timeLimit: 3
                    },
                ],
            ],
        ]
    )
    const idx = getCurrentTimerIndex(timers)
    expect(idx).toBeNull()
})