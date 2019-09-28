import React from 'react';
import { Button } from '@material-ui/core';

export class TimerHandleButtonInner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonValue: 'START',
        }
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        return (
            <Button
                variant='contained'
                color='primary'
                onClick={this.handleClick}
            >{this.state.buttonValue}
            </Button>
        )
    }
    handleClick() {
        const curState = this.props.curTimerState
        console.log(curState);
        
        if (curState === 'INIT') {
            this.props.startTimer()
            this.setState({ buttonValue: 'PAUSE' })
        } else if (curState === 'STOP') {
            this.props.startTimer()
            this.setState({ buttonValue: 'RESUME' })
        } else if (curState === 'ELAPSE') {
            this.props.stopTimer()
            this.setState({ buttonValue: 'PAUSE' })
        }
    }
}

