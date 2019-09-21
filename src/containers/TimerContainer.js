import { connect } from 'react-redux';
import Timer from '../components/Timer'
import { addTime, startTimer, finishTimer } from '../actions';


const mapStateToProps = (state, ownProps) => {
    const idx = ownProps.index
    const ownTimer = state.timers[idx]
    return {
        time: ownTimer.time,
        timerState: ownTimer.timerState,
        timeLimit: ownTimer.timeLimit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const index = ownProps.index
    return {
        whenElapse: (time) => dispatch(addTime(index, time)),
        onReachTimeLimit: () => dispatch(finishTimer(index)),
        whenEnd: () => dispatch(startTimer(index + 1))
    }
}

const TimerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer)

export default TimerContainer

