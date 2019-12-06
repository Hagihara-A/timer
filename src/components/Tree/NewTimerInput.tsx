import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addTreeItem } from "../../actions";

const Input = styled.input`
  width: 3rem;
  margin-left: 5px;
`;

export const NewTimerInput = ({ parentId }) => {
  const dispatch = useDispatch();

  const onSubmit = (timeLimit: number) => {
    dispatch(addTreeItem(parentId, timeLimit));
  };
  const [inputVal, setInputVal] = useState(1);
  const [isHidden, setIsHidden] = useState(true);

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit(e.target.value);
      setInputVal(1);
      setIsHidden(!isHidden);
    }
  };

  const onChange = e => {
    setInputVal(e.target.value);
  };
  const onClick = e => {
    setIsHidden(!isHidden);
  };
  return (
    <span>
      {isHidden ? (
        <AddCircleOutlineIcon onClick={onClick} color="primary" />
      ) : (
        <Input
          onKeyDown={onKeyDown}
          onChange={onChange}
          min={1}
          type="number"
          value={inputVal}
        />
      )}
    </span>
  );
};