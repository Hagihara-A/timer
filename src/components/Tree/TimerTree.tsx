import Tree, {
  moveItemOnTree,
  mutateTree,
  TreeSourcePosition,
  TreeDestinationPosition
} from "@atlaskit/tree";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useDeepCompareEffect from "use-deep-compare-effect";
import { setTimers, setTree } from "../../actions";
import { parseTreeData, combineTwoTimersToSection } from "../../util";
import EditableContent from "./EditableContent";
const TreeContainer = styled.div`
  max-width: 600px;
  position: absolute;
  left: 45%;
`;
const ItemContainer = styled.div`
  border: solid lightblue;
  vertical-align: text-top;
`;
const Icon = ({ item, onExpand, onCollapse, depth }) => {
  if (item.children && item.children.length > 0) {
    return item.isExpanded ? (
      <ArrowDropDownIcon onClick={() => onCollapse(item.id)} color="primary" />
    ) : (
      <ArrowRightIcon onClick={() => onExpand(item.id)} color="primary" />
    );
  } else {
    return <span> &bull; </span>;
  }
};

const Content = ({ item }) => {
  if (item.data && item.data.title) {
    return (
      <span>
        <EditableContent itemId={item.id} />
        {/* <NewTimerInput parentId={item.id} /> */}
        {/* <RemoveIcon removeItemId={item.id} /> */}
        {/* <CopyItem itemId={item.id} /> */}
      </span>
    );
  } else {
    return (
      <span>
        <EditableContent itemId={item.id} />
        {/* <RemoveIcon removeItemId={item.id} /> */}
        {/* <CopyItem itemId={item.id} /> */}
      </span>
    );
  }
};

const renderItem = ({
  item,
  depth,
  onExpand,
  onCollapse,
  provided,
  snapshot
}) => {
  return (
    <ItemContainer
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Icon
        item={item}
        onExpand={onExpand}
        onCollapse={onCollapse}
        depth={depth}
      />
      <Content item={item} />
    </ItemContainer>
  );
};

const TimerTree = () => {
  const dispatch = useDispatch();
  const tree = useSelector((state: Map<string, any>) =>
    state.get("tree").toJS()
  );

  // TODO: relocate onXxx to reducer
  const onCollapse = itemId => {
    dispatch(setTree(mutateTree(tree, itemId, { isExpanded: false })));
  };
  const onExpand = itemId => {
    dispatch(setTree(mutateTree(tree, itemId, { isExpanded: true })));
  };
  const onDragEnd = (
    source: TreeSourcePosition,
    destination: TreeDestinationPosition
  ) => {
    if (!destination) return;
    // dispatch(setTree(moveItemOnTree(tree, source, destination)));
    // *************when  combine two timers into section***********
    const srcItemId = tree.items[source.parentId].children[source.index];
    const srcItem = tree.items[srcItemId];
    const dstItem = tree.items[destination.parentId];
    if (
      typeof destination.index === "undefined" &&
      srcItem.children.length === 0 &&
      dstItem.children.length === 0
    ) {
      // when two timers combined
      dispatch(setTree(combineTwoTimersToSection(tree, source, destination)));
    } else {
      dispatch(setTree(moveItemOnTree(tree, source, destination)));
    }
    //  *************************************************************
  };
  // useDeepCompareEffect(() => {
  //   dispatch(setTimers(parseTreeData(tree)));
  // }, [tree]);

  return (
    <Paper
      style={{
        position: "relative",
        height: "700px"
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
  );
};

export default TimerTree;
