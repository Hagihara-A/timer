import Tree, { ItemId, TreeDestinationPosition, TreeSourcePosition } from "@atlaskit/tree";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onDragEnd as onDragEndAction, toggleProperty } from "../../actions";
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
  if (item.data.timeLimit) {
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

  const toggleIsExpanded = (itemId: ItemId) => {
    dispatch(toggleProperty(itemId, "isExpanded"));
  };
  const onDragEnd = (
    source: TreeSourcePosition,
    destination: TreeDestinationPosition
  ) => {
    if (!destination) {
      return;
    } else {
      dispatch(onDragEndAction(source, destination));
    }
  };

  return (
    <Paper>
      <TreeContainer>
        <Tree
          tree={tree}
          renderItem={renderItem}
          isDragEnabled
          isNestingEnabled
          onCollapse={toggleIsExpanded}
          onExpand={toggleIsExpanded}
          onDragEnd={onDragEnd}
        />
      </TreeContainer>
    </Paper>
  );
};

export default TimerTree;
