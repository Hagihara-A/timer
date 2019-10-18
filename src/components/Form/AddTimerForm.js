import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Tree, { mutateTree, moveItemOnTree } from '@atlaskit/tree'
import { initState } from '../../initState';


const parseTreeData = treeData => {
    const rootId = treeData.rootId
    const rootItem = treeData.items[rootId]

    const parseChildItem = (treeData, item) => {

        const childrenData = []
        if (item.children.length > 0) {
            for (const childId of item.children) {
                let childItem = treeData.items[childId]
                childrenData.push(parseChildItem(treeData, childItem))
            }
            return childrenData
        } else {
            return item.data
        }
    }
    return parseChildItem(treeData, rootItem)
}

const AddTimerForm = ({ onSubmit }) => {
    const [tree, setTree] = useState(initState.get('tree').toJS())

    const onCollapse = itemId => {
        setTree(mutateTree(tree, itemId, { isExpanded: false }))
    }
    const onExpand = itemId => {
        setTree(
            mutateTree(tree, itemId, { isExpanded: true })
        )
    }
    const getIcon = (item, onExpand, onCollapse) => {
        if (item.children && item.children.length > 0) {
            return (item.isExpanded ? (
                <span onClick={() => onCollapse(item.id)}>&nbsp; - &nbsp;</span>
            ) : (
                    <span onClick={() => onExpand(item.id)}>&nbsp; + &nbsp;</span>
                ));
        }
        return <span>&nbsp;&bull; &nbsp;</span>
    }
    const onDragEnd = (source, destination) => {
        if (!destination) return
        setTree(
            moveItemOnTree(tree, source, destination)
        )
    }
    const renderItem = ({ item, onExpand, onCollapse, provided }) => {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <span> {getIcon(item, onExpand, onCollapse)}</span>
                <span>{item.data && item.data.title ? 'title :' + item.data.title : 'time limit :' + item.data.timeLimit}</span>
            </div>
        )
    }
    return (
        <Paper>
            <form >
                <Tree
                    tree={tree}
                    renderItem={renderItem}
                    isDragEnabled
                    isNestingEnabled
                    onCollapse={onCollapse}
                    onExpand={onExpand}
                    onDragEnd={onDragEnd}
                />

                <TextField
                    id="timeLimit"
                    label="Time Limit"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                // onChange={handleChange}
                // value={input}
                />
                <br />
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                >Add Timer</Button>
            </form>
        </Paper>
    )
}

export default AddTimerForm