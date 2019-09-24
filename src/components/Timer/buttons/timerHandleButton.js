import React from 'react';
import { timerState } from '../../../reducers';
import { Button } from '@material-ui/core';

export class TimerHandleButtonInner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonValue: 'START'
        }
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={this.handleClick}>{this.state.buttonValue}</Button>
        )
    }
    handleClick() {
        const curIdx = this.props.currentTimerIdx
        if (this.props.timerState === timerState.INIT) {
            this.props.startTimer(curIdx)
            this.setState({buttonValue: 'PAUSE'})
        } else if (this.props.timerState === timerState.ELAPSE) {
            this.props.stopTimer(curIdx)
            this.setState({buttonValue: 'RESUME'})
        } else if (this.props.timerState === timerState.STOP) {
            this.props.startTimer(curIdx)
            this.setState({buttonValue: 'PAUSE'})
        }
    }
}

