import { connect } from 'react-redux'
import RemoveIcon from '../../components/Tree/RemoveIcon'
import { removeItem } from '../../actions'

const mapDispatch = (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(removeItem(ownProps.removeItemId))
    }
}

const RemoveItem = connect(null, mapDispatch)(RemoveIcon)
export default RemoveItem