import { ItemId } from "@atlaskit/tree";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editSection, editTimer } from "../../actions";
import { SectionTreeItemData, TimerTreeItemData } from "../../types";
import { isSection, isTimer, useAppState } from "../../utils";

const numInputProps = { type: "number", min: 1 };
const NarrowTextField = styled(TextField)`
  width: 55px;
`;
const EditableSection = ({
  id,
  data,
}: {
  id: ItemId;
  data: SectionTreeItemData;
}) => {
  const { repeat, count } = data;
  const dispatch = useDispatch();
  const isDraggable = useAppState((state) => state.options.isDragEnabled);
  const onChange = (e) => {
    dispatch(editSection(id, { repeat: Number(e.target.value) }));
  };
  return (
    <>
      {isDraggable ? (
        <>
          <NarrowTextField
            value={repeat}
            inputProps={numInputProps}
            onChange={onChange}
          />
          {"Times"}
        </>
      ) : (
        `${count}  /  ${repeat}`
      )}
    </>
  );
};

const EditableTimer = ({
  id,
  data,
}: {
  id: ItemId;
  data: TimerTreeItemData;
}) => {
  const dispatch = useDispatch();
  const isDraggable = useAppState((state) => state.options.isDragEnabled);

  const { power, timeLimit, elapsedTime } = data;

  const onChangeTimeLimit = (e) => {
    dispatch(editTimer(id, { timeLimit: Number(e.target.value) }));
  };
  const onChangePower = (e) => {
    dispatch(editTimer(id, { power: Number(e.target.value) }));
  };
  return (
    <>
      {isDraggable ? (
        <>
          <NarrowTextField
            value={timeLimit}
            inputProps={numInputProps}
            onChange={onChangeTimeLimit}
          />
          {"Sec @"}
          <NarrowTextField
            value={power}
            inputProps={numInputProps}
            onChange={onChangePower}
          />
          {" W"}
        </>
      ) : (
        `${elapsedTime} / ${timeLimit}  Sec @ ${power} W`
      )}
    </>
  );
};

const EditableContent = ({ itemId }: { itemId: ItemId }) => {
  const item = useAppState((state) => state.tree.items[itemId]);
  const { data } = item;
  if (isSection(data)) {
    return <EditableSection id={item.id} data={data} />;
  } else if (isTimer(data)) {
    return <EditableTimer id={item.id} data={data} />;
  }
};

export default EditableContent;
