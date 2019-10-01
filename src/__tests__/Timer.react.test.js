import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Timer from '../components/Timer/Timer';

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