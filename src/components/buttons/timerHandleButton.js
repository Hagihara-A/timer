import React from 'react';
import { timerState } from '../../reducers';

export class TimerHandleButtonInner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonValue: 'START'
        }
    }
    render() {
        return (
            <button onClick={() => this.onClick()}>{this.state.buttonValue}</button>
        )
    }
    onClick() {
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

