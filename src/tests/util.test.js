import { List } from "immutable";
import { getCurrentTimerIndex } from "../util";
import { allFinishedTimers, elapsedTimers, initTimers } from "./testData";

test('get index from initState', () => {
    const indexes = getCurrentTimerIndex(initTimers)
    expect(indexes).toEqual(List([0]))
})

test('get index from elapsed state', () => {
    const indexes = getCurrentTimerIndex(elapsedTimers)
    expect(indexes).toEqual(List([3, 1, 1]))
})

test('get index from  all-END timers', () => {
    const idx = getCurrentTimerIndex(allFinishedTimers)
    expect(idx).toBeNull()
})