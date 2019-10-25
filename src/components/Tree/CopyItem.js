import React from "react";
import { useDispatch } from "react-redux";
import { copyItem } from "../../actions";
const CopyItem = ({ itemId }) => {
    const dispatch = useDispatch()

    const onClick = e => {
        dispatch(copyItem(itemId))
    }
    return <button onClick={onClick}>copy</button>
}
export default CopyItem