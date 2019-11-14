import { connect } from 'react-redux';
import NewSectionInput from "../../components/Tree/NewSectionInput";
import { addSection } from '../../actions';


const mapDispatch = (dispatch, ownProps) => {
    return {
        onSubmit: title => dispatch(addSection(ownProps.parentId, title))
    }
}

const AddNewSection = connect(null, mapDispatch)(NewSectionInput)
export default AddNewSection