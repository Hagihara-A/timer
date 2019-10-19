import { getCurrentTimerIndex, parseTreeData } from "../util";
import { fromJS, List } from "immutable";
import { timerState as TS } from "../reducers";


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
test('parseTreeData', () => {
    const INIT = 'INIT'
    const initState = {
        // following 'timers' and 'tree' express same structure
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
        ],
        tree: {
            rootId: 'root',
            items: {
                'root': {
                    id: 'root',
                    children: ['0', '1', '2', '3'],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'root',
                    }
                },
                '0': {
                    id: '0',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 3,
                    }
                },
                '1': {
                    id: '1',
                    children: ['1-0', '1-1'],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'second'
                    }
                },
                '1-0': {
                    id: '1-0',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 2,
                    }
                },
                '1-1': {
                    id: '1-1',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 2,
                    }
                },
                '2': {
                    id: '2',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 5,
                    }
                },
                '3': {
                    id: '3',
                    children: ['3-0', '3-1', '3-2'],
                    hasChildren: false,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'second',
                    }
                },
                '3-0': {
                    id: '3-0',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 2,
                    }
                },
                '3-1': {
                    id: '3-1',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 2,
                    }
                },
                '3-2': {
                    id: '3-2',
                    children: ['3-2-0', '3-2-1'],
                    hasChildren: true,
                    isExpanded: true,
                    isChildrenLoading: false,
                    data: {
                        title: 'third'
                    }
                },
                '3-2-0': {
                    id: '3-2-0',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 3
                    }
                },
                '3-2-1': {
                    id: '3-2-1',
                    children: [],
                    hasChildren: false,
                    isExpanded: false,
                    isChildrenLoading: false,
                    data: {
                        timeLimit: 3
                    }
                },
            }
        }
    }
    const { tree, timers } = initState
    expect(parseTreeData(tree)).toEqual(timers)
})