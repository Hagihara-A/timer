import List from '@material-ui/core/List';
import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import TimerContainer from '../../containers/Timer/TimerContainer';

const renderTimerList = (timers) => {
    return (<List>
        {timers.map((v, i) => {
            if (Array.isArray(v)) {
                return (<ListItem key={i}>
                    {renderTimerList(v)}
                </ListItem>)
            } else {
                return (<ListItem key={i}>
                    <TimerContainer {...v} />/ {v.timeLimit}
                </ListItem>)
            }
        })}
    </List>)
}

const TimerList = (props) => {
    return renderTimerList(props.timers)
}
export default TimerList