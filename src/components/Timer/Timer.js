import React from 'react';
import { timerState } from '../../reducers';
export default class Timer extends React.Component {
    render() {
        return (
            <span>
                {/* TODO: remove */}
                {this.props.timerState}:
                {this.elapsedTime()}
            </span>
        )
    }

    componentDidUpdate() {
        switch (this.props.timerState) {
            case timerState.ELAPSE:
                if (this.elapsedTime() >= this.props.timeLimit) {
                    this.props.onReachTimeLimit()
                    return
                } else {
                    let startedAt = Date.now()
                    this.timerId = setTimeout(() => {
                        this.props.whenElapse((Date.now() - startedAt) / 1000)
                    }, 1000)
                    return
                }

            case timerState.STOP:
                clearInterval(this.timerId)
                return
            case timerState.END:
                clearInterval(this.timerId)
                this.props.whenEnd()
                return
            default:
                return
        }
    }
    elapsedTime() {
        return Math.floor(this.props.time)
    }
}
