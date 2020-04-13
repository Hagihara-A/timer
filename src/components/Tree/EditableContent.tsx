import { ItemId } from "@atlaskit/tree";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSection, editTimer } from "../../actions";
import { SectionTreeItemData, State, TimerTreeItemData } from "../../types";
import { isSection, isTimer } from "../../utils";

const EditableInput = ({
  value,
  onChange,
  inputProps,
}: {
  value: string | number;
  onChange: any;
  inputProps?: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setIsEditing(!isEditing);
    }
  };
  const onBlur = () => {
    setIsEditing(false);
  };
  const onClick = () => setIsEditing(!isEditing);
  return (
    <span>
      {isEditing ? (
        <TextField
          value={value}
          inputProps={inputProps}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <span onClick={onClick}>&nbsp; {value} &nbsp;</span>
      )}
    </span>
  );
};

const EditableSection = ({
  id,
  data,
}: {
  id: ItemId;
  data: SectionTreeItemData;
}) => {
  const { repeat } = data;
  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch(editSection(id, { repeat: Number(e.target.value) }));
  };
  return (
    <span>
      <EditableInput
        value={repeat}
        onChange={onChange}
        inputProps={{ type: "number", min: 1 }}
      />
      {" Times"}
    </span>
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

  const { power, timeLimit } = data;

  const onChangeTimeLimit = (e) => {
    dispatch(editTimer(id, { timeLimit: Number(e.target.value) }));
  };
  const onChangePower = (e) => {
    dispatch(editTimer(id, { power: Number(e.target.value) }));
  };
  return (
    <span>
      <EditableInput
        value={timeLimit}
        onChange={onChangeTimeLimit}
        inputProps={{ type: "number", min: 1 }}
      />
      {"Sec @"}
      <EditableInput
        value={power}
        onChange={onChangePower}
        inputProps={{ type: "number", min: 1 }}
      />
      {" W"}
    </span>
  );
};

const EditableContent = ({ itemId }: { itemId: ItemId }) => {
  const item = useSelector((state: State) => state.tree.items[itemId]);
  const { data } = item;
  if (isSection(data)) {
    return <EditableSection id={item.id} data={data} />;
  } else if (isTimer(data)) {
    return <EditableTimer id={item.id} data={data} />;
  }
};

export default EditableContent;
