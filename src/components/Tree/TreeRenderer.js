import Tree, { moveItemOnTree, mutateTree } from '@atlaskit/tree';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styled from 'styled-components';
import useDeepCompareEffect from 'use-deep-compare-effect';
import AddNewTimer from '../../containers/TimerTree/AddNewTimer';
import { parseTreeData } from '../../util';

const ItemContainerOuter = styled.div`
    margin: 20px;
`

const ItemContainerInner = styled.span`
    box-sizing: border-box;
    background-color: white;
    border: 3px solid lightgray;
    border-radius: 5px;
    padding: 8px;

`

export const Input = styled.input`
    width: 3rem;
    margin-left: 5px;
`
const Icon = ({ item, onExpand, onCollapse, depth }) => {
    if (item.children && item.children.length > 0) {
        return (item.isExpanded ? (
            <span onClick={() => onCollapse(item.id)}>&nbsp; - &nbsp;</span>
        ) : (
                <span onClick={() => onExpand(item.id)}>&nbsp; + &nbsp;</span>
            ));
    } else {
        return depth === 0 ? (<span> ・</span>) : (<span>└</span>)
    }
}
const AddSection = ({ itemId }) => {
    return (
        <Input />
    )
}

const Content = ({ item }) => {
    if (item.children.length > 0) {
        return <span>{'title :' + item.data.title}  <AddNewTimer parentId={item.id} /><AddSection /></span>
    } else {
        return <span>{'time limit :' + item.data.timeLimit}</span>
    }
}

const renderItem = ({ item, depth, onExpand, onCollapse, provided }) => {
    return (
        <ItemContainerOuter
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <ItemContainerInner>
                <Icon
                    item={item}
                    onExpand={onExpand}
                    onCollapse={onCollapse}
                    depth={depth}
                />
                <Content item={item} />
            </ItemContainerInner>
        </ItemContainerOuter>
    )
}

const TreeRenderer = ({ tree, setTree, setTimers }) => {

    const onCollapse = itemId => {
        setTree(mutateTree(tree, itemId, { isExpanded: false }))
    }
    const onExpand = itemId => {
        setTree(
            mutateTree(tree, itemId, { isExpanded: true })
        )
    }
    const onDragEnd = (source, destination) => {
        if (!destination) return
        setTree(
            moveItemOnTree(tree, source, destination)
        )
    }

    useDeepCompareEffect(() => {
        setTimers(parseTreeData(tree))
    }, [tree])

    return (
        <Paper>
            <Tree
                tree={tree}
                renderItem={renderItem}
                isDragEnabled
                isNestingEnabled
                onCollapse={onCollapse}
                onExpand={onExpand}
                onDragEnd={onDragEnd}
            />
        </Paper>
    )
}

export default TreeRenderer