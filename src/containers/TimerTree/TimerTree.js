import TreeRenderer from "../../components/Tree/TreeRenderer";
import { connect } from "react-redux";
import { addTimer, setTimers } from "../../actions";

const stateToProps = state => (
    {}
)
const dispatchToProps = dispatch => (
    {
        onSubmit: (timeLimit) => dispatch(addTimer(timeLimit)),
        setTimers: timers => dispatch(setTimers(timers))
    }
)
const TimerTree = connect(stateToProps, dispatchToProps)(TreeRenderer)
export default TimerTree