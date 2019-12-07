import { ItemId } from "@atlaskit/tree";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../../actions";
import { State, TreeItemIm } from "../../types";

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
  const onClick = e => setIsEditing(!isEditing);
  return (
    <span>
      {isEditing ? (
        <TextField
          value={value}
          inputProps={inputProps}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      ) : (
        <span onClick={onClick}>&nbsp; {value} &nbsp;</span>
      )}
    </span>
  );
};

const EditableSection = ({ item }: { item: TreeItemIm }) => {
  const val = item.getIn(["data", "times"]) as number;
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(editItem(item.get("id"), { times: e.target.value }));
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

const EditableTimer = ({ item }: { item: TreeItemIm }) => {
  const dispatch = useDispatch();

  const itemId = item.get("id");
  const times = item.getIn(["data", "times"]);
  const timeLimit = item.getIn(["data", "timeLimit"]);
  const power = item.getIn(['data', 'power'])

  const onChangeTimes = e => {
    dispatch(editItem(itemId, { times: e.target.value }));
  };
  const onChangeTimeLimit = e => {
    dispatch(editItem(itemId, { timeLimit: e.target.value }));
  };
  const onChangePower = e => {
    dispatch(editItem(itemId, {power: e.target.value}))
  }
  return (
    <span>
      <EditableInput
        value={times}
        onChange={onChangeTimes}
        inputProps={{ type: "number", min: 1 }}
      />
      ×
      <EditableInput
        value={timeLimit}
        onChange={onChangeTimeLimit}
        inputProps={{ type: "number", min: 1 }}
      />
      Sec @
      <EditableInput
        value={power}
        onChange={onChangePower}
        inputProps={{ type: "number", min: 1 }} /> W
    </span>
  );
};

const EditableContent = ({ itemId }: { itemId: ItemId }) => {
  const item = useSelector((state: State) =>
    state.getIn(["tree", "items", itemId])
  );
  const isSection = item.get("children").size > 0;
  return isSection ? (
    <EditableSection item={item} />
  ) : (
    <EditableTimer item={item} />
  );
};

export default EditableContent;
