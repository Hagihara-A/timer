import { connect } from 'react-redux';
import { addTime, startTimer, finishTimer } from '../../actions';
import Timer from '../../components/Timer/Timer';


const mapStateToProps = (state, ownProps) => {
    const { time, timerState, timeLimit } = ownProps
    return {
        time,
        timerState,
        timeLimit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        whenElapse: (time) => dispatch(addTime(time)),
        onReachTimeLimit: () => {
            dispatch(finishTimer())
        },
        whenEnd: () => dispatch(startTimer())
    }
}

const TimerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer)

export default TimerContainer

