import Tree, {
  ItemId,
  RenderItemParams,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import { IconButton } from "@material-ui/core";
import DeleteIconInner from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  onDragEnd as onDragEndAction,
  removeItem,
  toggleProperty,
} from "../../actions";
import { useAppState } from "../../utils";
import EditableContent from "./EditableContent";

const rgb = ({ powerPerFTP }: { powerPerFTP: number | undefined }) => {
  if (powerPerFTP < 0.75) return "#338cff";
  else if (powerPerFTP < 0.9) return "#59bf59";
  else if (powerPerFTP < 1.05) return "#ffcc3f";
  else if (powerPerFTP < 1.2) return "#ff6639";
  else if (powerPerFTP < 1.5) return "#ff330c";
  return "#7d7c78";
};
const TreeContainer = styled.div`
  max-width: 20%;
  margin: auto;
`;

const ItemContainer = styled.div<{ powerPerFTP: number }>`
  border-radius: 2px;
  margin: 1px 0;
  background-color: ${(props) => rgb(props)};
  display: flex;
  justify-content: space-between;
`;
const DeleteIcon = styled(DeleteIconInner)`
  opacity: 0;
  :hover {
    opacity: 1;
  }
  transition: opacity 0.1s 0s ease;
`;

const IconInner = ({ item, onExpand, onCollapse }) => {
  if (item?.children?.length > 0) {
    return item.isExpanded ? (
      <KeyboardArrowDownIcon
        onClick={() => onCollapse(item.id)}
        color="secondary"
      />
    ) : (
      <KeyboardArrowRightIcon
        onClick={() => onExpand(item.id)}
        color="secondary"
      />
    );
  } else {
    return <span> &bull; </span>;
  }
};

const Icon = styled(IconInner)`
  vertical-align: text-bottom;
`;
const TimerTree = () => {
  const dispatch = useDispatch();
  const tree = useAppState((state) => state.tree);
  const isDragEnabled = useAppState((state) => state.options.isDragEnabled);

  const toggleIsExpanded = (itemId: ItemId) => {
    if (isDragEnabled) dispatch(toggleProperty(itemId, "isExpanded"));
  };
  const onDragEnd = (
    source: TreeSourcePosition,
    destination: TreeDestinationPosition
  ) => {
    dispatch(onDragEndAction(source, destination));
  };
  const remove = (id: ItemId) => {
    if (isDragEnabled) dispatch(removeItem(id));
  };

  const renderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
  }: RenderItemParams) => {
    return (
      <ItemContainer
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        powerPerFTP={item.data.power / 250}
      >
        <div>
          <Icon item={item} onExpand={onExpand} onCollapse={onCollapse} />
          <EditableContent itemId={item.id} />
        </div>
        {isDragEnabled ? (
          <IconButton onClick={() => remove(item.id)} size="small">
            <DeleteIcon />
          </IconButton>
        ) : undefined}
      </ItemContainer>
    );
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
