import { ItemId } from '@atlaskit/tree'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeItem } from '../../actions'

const RemoveIcon = ({ removeItemId }: { removeItemId: ItemId }) => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(removeItem(removeItemId))
    }
    return <DeleteIcon onClick={onClick} color='primary' />
}
export default RemoveIcon