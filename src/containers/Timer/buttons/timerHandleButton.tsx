import { connect } from "react-redux";
import { startTimer, stopTimer } from '../../../actions';
import { TimerHandleButtonInner } from '../../../components/Timer/buttons/timerHandleButton';
import { getCurrentTimerIndex } from "../../../util";

const mapStateToProps = (state) => {
    const idx = getCurrentTimerIndex(state.get('timers'))
    const curTimerState = !!idx ? state.getIn(['timers', ...idx, 'timerState']) : idx
    return {
        curTimerState
    }

}
const mapDispatchToProps = dispatch => ({
    startTimer: () => dispatch(startTimer()),
    stopTimer: () => dispatch(stopTimer()),
});

const TimerHandleButton = connect(mapStateToProps, mapDispatchToProps)(TimerHandleButtonInner);
export default TimerHandleButton;
