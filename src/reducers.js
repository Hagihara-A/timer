import { actionTypes as AT } from './actions'
import { Map, List, fromJS } from 'immutable'
import { getCurrentTimerIndex, getNewItemId } from './util'
import { initState } from './initState'
export const timerState = {
    INIT: 'INIT',
    ELAPSE: 'ELAPSE',
    STOP: 'STOP',
    END: 'END'
}
const { INIT, ELAPSE, STOP, END } = timerState

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
    switch (action.type) {
        case AT.SET_TIMERS:
            return state.set('timers', fromJS(action.payload.timers))
        case AT.SET_TREE:
            return state.set('tree', fromJS(action.payload.tree))
        case AT.ADD_TREE_ITEM:
            const { parentId, timeLimit } = action.payload
            let tree = state.get('tree')
            const newId = getNewItemId(tree)
            tree = tree.updateIn(['items', parentId, 'children'], children => children.push(newId))

            const newItem = fromJS({
                id: newId,
                children: [],
                hasChildren: false,
                isExpanded: false,
                isChildrenLoading: false,
                data: {
                    timeLimit
                }
            })

            tree = tree.setIn(['items', newId], newItem)
            return state.set('tree', tree)
        default:
            break
    }
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