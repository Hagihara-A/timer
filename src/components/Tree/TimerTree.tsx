import Tree, {
  ItemId,
  RenderItemParams,
  TreeDestinationPosition,
  TreeSourcePosition
} from "@atlaskit/tree";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  onDragEnd as onDragEndAction,
  removeItem,
  toggleProperty
} from "../../actions";
import { State } from "../../types";
import EditableContent from "./EditableContent";
const TreeContainer = styled.div`
  max-width: 300px;
  margin: auto;
`;
const ItemContainer = styled.div<any>`
  border-radius: 2px;
  margin: 1px 0;
  background-color: hsl(${props => 40 - props.depth * 15}, 50%, 50%);
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

const renderItem = ({
  item,
  depth,
  onExpand,
  onCollapse,
  provided,
  snapshot
}: RenderItemParams) => {
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
      <EditableContent itemId={item.id} />
    </ItemContainer>
  );
};

const TimerTree = () => {
  const dispatch = useDispatch();
  const tree = useSelector((state: State) => state.tree);

  const toggleIsExpanded = (itemId: ItemId) => {
    dispatch(toggleProperty(itemId, "isExpanded"));
  };
  const onDragEnd = (
    source: TreeSourcePosition,
    destination: TreeDestinationPosition
  ) => {
    if (!destination) dispatch(removeItem(source));
    dispatch(onDragEndAction(source, destination));
  };

  return (
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
  );
};

export default TimerTree;
