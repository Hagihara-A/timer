import { ItemId, TreeItem } from "@atlaskit/tree";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../actions";
import { State } from "../../types";
import { isSection } from "../../utils";

const EditableInput = ({
  value,
  onChange,
  inputProps
}: {
  value: string | number;
  onChange: any;
  inputProps?: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const onKeyDown = e => {
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

const EditableSection = ({ item }: { item: TreeItem }) => {
  const val = item.data.times;
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(editItem(item.id, { repeat: Number(e.target.value) }));
  };
  return (
    <span>
      <EditableInput
        value={val}
        onChange={onChange}
        inputProps={{ type: "number", min: 1 }}
      />
      {" Times"}
    </span>
  );
};

const EditableTimer = ({ item }: { item: TreeItem }) => {
  const dispatch = useDispatch();

  const itemId = item.id;
  const { times, power, timeLimit } = item.data;

  const onChangeTimes = e => {
    dispatch(editItem(itemId, { repeat: Number(e.target.value) }));
  };
  const onChangeTimeLimit = e => {
    dispatch(editItem(itemId, { timeLimit: Number(e.target.value) }));
  };
  const onChangePower = e => {
    dispatch(editItem(itemId, { power: Number(e.target.value) }));
  };
  return (
    <span>
      <EditableInput
        value={times}
        onChange={onChangeTimes}
        inputProps={{ type: "number", min: 1 }}
      />
      {"x"}
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
  return isSection(item.data) ? (
    <EditableSection item={item} />
  ) : (
    <EditableTimer item={item} />
  );
};

export default EditableContent;
