import React from 'react';
import TimerContainer from '../../containers/Timer/TimerContainer';
import List from '@material-ui/core/List'

const TimerList = (props) => (
    <div>
        {renderTimerList(props)}
    </div>
)

const renderTimerList = (props) => {
    return (
        <List>
            {props.timers.map((value, index) => {
                return (
                    <li key={index} >

                        <TimerContainer
                            index={index}
                        /> / {value.timeLimit}
                    </li>)
            })
            }
        </List>)
}

export default TimerList