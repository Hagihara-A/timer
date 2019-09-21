import { connect } from "react-redux";
import { startTimer } from '../actions';
import TimerList from "../components/TimerList";

const mapStateToProps = state => {
    return {
        timers: state.timers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchStartTimer: (index) => dispatch(startTimer(index)),
    }
}

const TimerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList)

export default TimerListContainer