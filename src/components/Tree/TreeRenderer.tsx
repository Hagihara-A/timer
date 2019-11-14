import Tree, { moveItemOnTree, mutateTree } from '@atlaskit/tree';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';
import styled from 'styled-components';
import useDeepCompareEffect from 'use-deep-compare-effect';
import AddNewTimer from '../../containers/TimerTree/AddNewTimer';
import RemoveItem from '../../containers/TimerTree/RemoveItem';
import { combineTwoTimersToSection, parseTreeData } from '../../util';
import CopyItem from './CopyItem';
import EditableContent from './EditableContent';

const TreeContainer = styled.div`
    max-width: 600px;
    position: absolute;
    left: 45%;
`
const ItemContainer = styled.div`
    border: solid lightblue;
    vertical-align: text-top;
`
const Icon = ({ item, onExpand, onCollapse, depth }) => {
    if (item.children && item.children.length > 0) {
        return (item.isExpanded ? (
            <ArrowDropDownIcon onClick={() => onCollapse(item.id)} color='primary' />
        ) : (
                <ArrowRightIcon onClick={() => onExpand(item.id)} color='primary' />
            ))
    } else {
        return <span> &bull; </span>
    }
}

const Content = ({ item }) => {
    if (item.data && item.data.title) {
        return (
            <span>
                <EditableContent itemId={item.id} />
                <AddNewTimer parentId={item.id} />
                <RemoveItem removeItemId={item.id} />
                <CopyItem itemId={item.id} />
            </span>)
    } else {
        return (
            <span>
                <EditableContent itemId={item.id} />
                <RemoveItem removeItemId={item.id} />
                <CopyItem itemId={item.id} />
            </span>)
    }
}

const renderItem = ({ item, depth, onExpand, onCollapse, provided, snapshot }) => {
    return (
        <ItemContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            depth={depth}
        >
            <Icon
                item={item}
                onExpand={onExpand}
                onCollapse={onCollapse}
                depth={depth}
            />
            <Content item={item} />
        </ItemContainer>
    )
}

const TreeRenderer = ({ tree, setTree, setTimers }) => {

    // TODO: relocate onXxx to reducer 
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
        // *************when  combine two timers into section***********
        // const srcItemId = tree.items[source.parentId].children[source.index]
        // const srcItem = tree.items[srcItemId]
        // const dstItem = tree.items[destination.parentId]
        // if (typeof destination.index === 'undefined' && srcItem.children.length === 0 && dstItem.children.length === 0) {
        //     // when two timers combined
        //     setTree(combineTwoTimersToSection(tree, source, destination))
        // } else {
        //     setTree(moveItemOnTree(tree, source, destination))
        // }
        //  *************************************************************

    }
    useDeepCompareEffect(() => {
        setTimers(parseTreeData(tree))
    }, [tree])

    return (
        <Paper
            style={{
                position: 'relative',
                height: '700px'
            }}
        >
            <TreeContainer>
                <Tree
                    tree={tree}
                    renderItem={renderItem}
                    isDragEnabled
                    isNestingEnabled
                    onCollapse={onCollapse}
                    onExpand={onExpand}
                    onDragEnd={onDragEnd}
                />
            </TreeContainer>
        </Paper>
    )
}

export default TreeRenderer