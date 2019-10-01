import AddTimerForm from "../../components/Form/AddTimerForm";
import { connect } from "react-redux";
import { addTimer } from "../../actions";

const stateToProps = state => (
    {}
)
const dispatchToProps = dispatch => (
    {
        onSubmit: (timeLimit) => dispatch(addTimer(timeLimit))
    }
)
const AddTimerFormContainer = connect(stateToProps, dispatchToProps)(AddTimerForm)
export default AddTimerFormContainer