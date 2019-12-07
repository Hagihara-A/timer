import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addSection } from "../../actions";

const Input = styled.input`
  width: 5rem;
  margin-left: 5px;
`;

const NewSectionInput = ({ parentId }) => {
  const dispatch = useDispatch();
  const onSubmit = (title: number) => {
    dispatch(addSection(parentId, title));
  };
  const [inputVal, setInputVal] = useState("");
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit(e.target.value);
      setInputVal("");
    }
  };
  const onChange = e => {
    setInputVal(e.target.value);
  };

  return <Input onKeyDown={onKeyDown} onChange={onChange} value={inputVal} />;
};

export default NewSectionInput;
