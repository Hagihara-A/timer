import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editItem } from '../../actions';

const EditableContent = ({ itemId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const data = useSelector(state => state.getIn(['tree', 'items', itemId, 'data']))
    const dispatch = useDispatch()
    const onChange = e => {
        const content = e.target.value
        dispatch(editItem(itemId, content))
    }
    const onKeyDown = e => {
        if (e.keyCode === 13) {
            setIsEditing(!isEditing)
        }
    }
    const isSection = !!data.get('title')
    const value = isSection ? data.get('title') : data.get('timeLimit')
    const inputAttr = isSection ? {
        type: 'text'
    } : {
            type: 'number',
            min: 1
        }
    const onClick = () => setIsEditing(!isEditing)
    return (
        <span>
            {isEditing ? (
                <TextField
                    value={value}
                    inputProps={inputAttr}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            ) : (
                    <span>
                        {value}
                        <EditIcon onClick={onClick} color='primary' />
                    </span>
                )
            }
        </span>
    )
}

export default EditableContent