import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Timer from '../components/Timer/Timer';

jest.useFakeTimers()
let container

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    document.body.removeChild(container)
    container = null
})

it('render Time', () => {
    act(() => {
        ReactDOM.render(
            <Timer
                timerState='INIT'
                time={10}
            />
            , container)
    })
    const time = container.querySelector('span')

    expect(time.textContent).toBe('INIT: 10')
})

it('confirm dispatch: INIT', () => {
    const mapDispatchToProps = {
        onReachTimeLimit: jest.fn(),
        whenElapse: jest.fn(),
        whenEnd: jest.fn()
    }

    act(() => {
        let timerState = 'INIT'
        ReactDOM.render(
            <Timer
                {...mapDispatchToProps}
                timerState={timerState}
                time={0}
                timeLimit={3}
            />, container
        )
    })
    expect(mapDispatchToProps.onReachTimeLimit.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenElapse.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenEnd.mock.calls.length).toBe(0)


})

it('confirm dispatch : ELAPSE', () => {
    const mapDispatchToProps = {
        onReachTimeLimit: jest.fn(),
        whenElapse: jest.fn(),
        whenEnd: jest.fn()
    }

    act(() => {
        let timerState = 'ELAPSE'
        ReactDOM.render(
            <Timer
                {...mapDispatchToProps}
                timerState={timerState}
                time={0}
                timeLimit={3}
            />, container
        )
    })
    jest.runOnlyPendingTimers()
    expect(mapDispatchToProps.onReachTimeLimit.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenElapse.mock.calls.length).toBe(1)
    expect(mapDispatchToProps.whenEnd.mock.calls.length).toBe(0)
})

it('confirm dispatch: ELAPSE & timeLimit', () => {
    const mapDispatchToProps = {
        onReachTimeLimit: jest.fn(),
        whenElapse: jest.fn(),
        whenEnd: jest.fn()
    }

    act(() => {
        let timerState = 'ELAPSE'
        ReactDOM.render(
            <Timer
                {...mapDispatchToProps}
                timerState={timerState}
                time={3}
                timeLimit={3}
            />, container
        )
    })
    jest.runOnlyPendingTimers()
    expect(mapDispatchToProps.onReachTimeLimit.mock.calls.length).toBe(1)
    expect(mapDispatchToProps.whenElapse.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenEnd.mock.calls.length).toBe(0)
})

it('confirm dispatch: STOP', () => {
    const mapDispatchToProps = {
        onReachTimeLimit: jest.fn(),
        whenElapse: jest.fn(),
        whenEnd: jest.fn()
    }

    act(() => {
        let timerState = 'STOP'
        ReactDOM.render(
            <Timer
                {...mapDispatchToProps}
                timerState={timerState}
                time={0}
                timeLimit={3}
            />, container
        )
    })
    jest.runOnlyPendingTimers()
    expect(mapDispatchToProps.onReachTimeLimit.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenElapse.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenEnd.mock.calls.length).toBe(0)
})

it('confirm dispatch: END', () => {
    const mapDispatchToProps = {
        onReachTimeLimit: jest.fn(),
        whenElapse: jest.fn(),
        whenEnd: jest.fn()
    }

    act(() => {
        let timerState = 'END'
        ReactDOM.render(
            <Timer
                {...mapDispatchToProps}
                timerState={timerState}
                time={0}
                timeLimit={3}
            />, container
        )
    })
    jest.runOnlyPendingTimers()
    expect(mapDispatchToProps.onReachTimeLimit.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenElapse.mock.calls.length).toBe(0)
    expect(mapDispatchToProps.whenEnd.mock.calls.length).toBe(1)
})