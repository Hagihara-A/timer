import { connect } from "react-redux";
import { addTreeItem } from "../../actions";
import { NewTimerInput } from "../../components/Tree/NewTimerInput";

const dispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (timeLimit) => dispatch(addTreeItem(ownProps.parentId, timeLimit))
    }
}

const AddNewTimer = connect(null, dispatchToProps)(NewTimerInput)
export default AddNewTimer