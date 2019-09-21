import React from 'react';
import TimerContainer from '../containers/TimerContainer';


const TimerList = (props) => (
    <div>
        {renderTimerList(props)}
        <button onClick={() => props.dispatchStartTimer(0)}>START</button>
    </div>
)

const renderTimerList = (props) => {
    // const maxIdx = props.timers.length - 1
    return (
        <ul>
            {props.timers.map((value, index) => {
                return (
                    <li key={index} >

                        <TimerContainer
                            index={index}
                            // onTimeEnd={
                            //     (index < maxIdx) ?
                            //         (index) => props.onTimeEnd(index) :
                            //         props.onChildTimersEnd
                            // }
                        /> / {value.timeLimit}
                    </li>)
            })
            }
        </ul >)
}

export default TimerList