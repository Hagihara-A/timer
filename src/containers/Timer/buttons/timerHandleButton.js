import { connect } from "react-redux";
import { startTimer, stopTimer } from '../../../actions';
import { TimerHandleButtonInner } from '../../../components/Timer/buttons/timerHandleButton';
import { getCurrentTimerIdx } from "../../../getCurrentTimerIdx";

const mapStateToProps = state => {
    const currentTimerIdx = getCurrentTimerIdx(state.timers);
    return {
        timerState: state.timers[currentTimerIdx].timerState,
        currentTimerIdx
    };
};

const mapDispatchToProps = dispatch => ({
    startTimer: index => dispatch(startTimer(index)),
    stopTimer: index => dispatch(stopTimer(index)),
});

const TimerHandleButton = connect(mapStateToProps, mapDispatchToProps)(TimerHandleButtonInner);
export default TimerHandleButton;
