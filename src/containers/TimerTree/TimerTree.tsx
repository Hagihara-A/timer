import { connect } from "react-redux";
import { setTimers, setTree } from "../../actions";
import TreeRenderer from "../../components/Tree/TreeRenderer";

const stateToProps = state => (
    {
        tree: state.get('tree').toJS()
    }
)
const dispatchToProps = dispatch => (
    {
        setTree: tree => dispatch(setTree(tree)),
        setTimers: timers => dispatch(setTimers(timers))
    }
)
const TimerTree = connect(stateToProps, dispatchToProps)(TreeRenderer)
export default TimerTree