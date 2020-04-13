import Tree, {
  ItemId,
  RenderItemParams,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import DeleteIconInner from "@material-ui/icons/Delete";
import ExpandLessIconInner from "@material-ui/icons/ExpandLess";
import ExpandMoreIconInner from "@material-ui/icons/ExpandMore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onDragEnd as onDragEndAction, toggleProperty } from "../../actions";
import { State } from "../../types";
import EditableContent from "./EditableContent";

const TreeContainer = styled.div`
  width: 300px;
  margin: auto;
`;

const ItemContainer = styled.div<any>`
  width: 300px;
  border-radius: 2px;
  margin: 1px 0;
  background-color: hsl(${(props) => 40 - props.depth * 15}, 50%, 50%);
`;
const DeleteIcon = styled(DeleteIconInner)`
  opacity: 0;
  :hover {
    opacity: 1;
  }
  transition: opacity 0.1s 0s ease;
`;

const ExpandLessIcon = styled(ExpandLessIconInner)``;
const ExpandMoreIcon = styled(ExpandMoreIconInner)``;
const Icon = ({ item, onExpand, onCollapse, depth }) => {
  if (item.children && item.children.length > 0) {
    return item.isExpanded ? (
      <ExpandLessIcon onClick={() => onCollapse(item.id)} color="secondary" />
    ) : (
      <ExpandMoreIcon onClick={() => onExpand(item.id)} color="secondary" />
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
  snapshot,
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
      <DeleteIcon />
    </ItemContainer>
  );
};

const TimerTree = () => {
  const dispatch = useDispatch();
  const tree = useSelector((state: State) => state.tree);
  const isDragEnabled = useSelector(
    (state: State) => state.options.isDragEnabled
  );

  const toggleIsExpanded = (itemId: ItemId) => {
    dispatch(toggleProperty(itemId, "isExpanded"));
  };
  const onDragEnd = (
    source: TreeSourcePosition,
    destination: TreeDestinationPosition
  ) => {
    dispatch(onDragEndAction(source, destination));
  };

  return (
    <TreeContainer>
      <Tree
        tree={tree}
        renderItem={renderItem}
        isDragEnabled={isDragEnabled}
        isNestingEnabled
        onCollapse={toggleIsExpanded}
        onExpand={toggleIsExpanded}
        onDragEnd={onDragEnd}
      />
    </TreeContainer>
  );
};

export default TimerTree;
