import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { editItem } from '../../actions';

const EditItem = ({ itemId }) => {
    const data = useSelector(state => state.getIn(['tree', 'items', itemId, 'data']))
    const dispatch = useDispatch()
    const onChange = e => {
        const content = e.target.value
        dispatch(editItem(itemId, content))
    }
    const isSection = !!data.get('title')
    const inputAttr = isSection ? {
        type: 'text'
    } : {
            type: 'number',
            min: 1
        }
    return (<input
        value={isSection ? data.get('title') : data.get('timeLimit')}
        {...inputAttr}
        onChange={onChange}
    />)
}

export default EditItem