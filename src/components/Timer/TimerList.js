import React from 'react';
import TimerContainer from '../../containers/Timer/TimerContainer';


const TimerList = (props) => (
    <div>
        {renderTimerList(props)}
    </div>
)

const renderTimerList = (props) => {
    return (
        <ul>
            {props.timers.map((value, index) => {
                return (
                    <li key={index} >

                        <TimerContainer
                            index={index}
                        /> / {value.timeLimit}
                    </li>)
            })
            }
        </ul >)
}

export default TimerList