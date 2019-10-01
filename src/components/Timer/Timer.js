import React from 'react';
import { timerState } from '../../reducers';

const { ELAPSE, STOP, END , INIT} = timerState
export default class Timer extends React.Component {
    render() {
        return (
            <span>
                {/* TODO: remove */}
                {this.props.timerState}: {this.elapsedTime()}
            </span>
        )
    }

    componentDidUpdate() {
        switch (this.props.timerState) {
            case ELAPSE:
                if (this.elapsedTime() >= this.props.timeLimit) {
                    this.props.onReachTimeLimit()
                } else {
                    let startedAt = Date.now()
                    this.timerId = setTimeout(() => {
                        this.props.whenElapse((Date.now() - startedAt) / 1000)
                    }, 1000)
                }
                break
            case STOP:
                clearInterval(this.timerId)
                break
            case END:
                clearInterval(this.timerId)
                this.props.whenEnd()
                break
            case INIT:
                clearInterval(this.timerId)
                break
            default:
                break
        }
    }
    elapsedTime() {
        return Math.floor(this.props.time)
    }
}
