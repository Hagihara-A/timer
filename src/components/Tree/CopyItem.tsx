import { ItemId } from '@atlaskit/tree';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React from "react";
import { useDispatch } from "react-redux";
import { copyItem } from "../../actions";

const CopyItem = ({ itemId }: {itemId: ItemId}) => {
    const dispatch = useDispatch()

    const onClick = e => {
        dispatch(copyItem(itemId))
    }
    return <FileCopyIcon onClick={onClick} color='primary' />
}
export default CopyItem