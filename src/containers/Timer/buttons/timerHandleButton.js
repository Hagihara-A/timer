import { connect } from "react-redux";
import { startTimer, stopTimer } from '../../../actions';
import { TimerHandleButtonInner } from '../../../components/Timer/buttons/timerHandleButton';
import { getCurrentTimerIndex, getElementWithIndex } from "../../../util";

const mapStateToProps = (state) => {
    const curTimerIndexes = getCurrentTimerIndex(state.timers)
    return {
        curTimerIndexes,
        curTimerState : getElementWithIndex(state.timers, curTimerIndexes).timerState
    }

}
const mapDispatchToProps = dispatch => ({
    startTimer: () => dispatch(startTimer()),
    stopTimer: () => dispatch(stopTimer()),
});

const TimerHandleButton = connect(mapStateToProps, mapDispatchToProps)(TimerHandleButtonInner);
export default TimerHandleButton;
