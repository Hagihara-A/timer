import { timerState } from './reducers'

const { ELAPSE, STOP, INIT } = timerState

export function getCurrentTimerIndex(array) {
    for (let idx in array) {
        let elem = array[idx]

        if (Array.isArray(elem)) {
            const childIndex = getCurrentTimerIndex(elem)

            if (childIndex) {
                childIndex.unshift(Number(idx))
                return childIndex
            }
        } else if (elem.timerState === ELAPSE || elem.timerState === STOP || elem.timerState === INIT) {
            return [Number(idx)]
        }
    }
}

export function getElementWithIndex(array, indexes) {
    let elem = array
    for (let idx of indexes) {
        elem = array[idx]
        if (!elem) {
            throw new Error('index is out of range')
        }
    }
    return elem
}