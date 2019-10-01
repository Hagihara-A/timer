import { List } from 'immutable'
import { timerState } from './reducers'

export function getCurrentTimerIndex(timers) {
    for (let idx = 0; idx < timers.size; idx++) {
        let elem = timers.get(idx)
        if (List.isList(elem)) {
            const childIndex = getCurrentTimerIndex(elem)
            if (childIndex) {
                return childIndex.unshift(idx)
            }
        } else {
            const ts = elem.get('timerState')
            if (ts === timerState.INIT || ts === timerState.ELAPSE || ts === timerState.STOP) {
                return List([idx])
            }
        }
    }
    return null
}