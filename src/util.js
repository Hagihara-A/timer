import { List } from 'immutable'
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
            if (ts === 'ELAPSE' || ts === 'STOP' || ts === 'INIT') {
                return List([idx])
            }
        }
    }
}