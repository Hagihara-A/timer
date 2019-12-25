import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../types";
import styled from "styled-components";

const List = styled.div`
  text-align: center;
`;
export const TimerList = () => {
  const timers = useSelector((state: State) => state.timers);
  const ListItems = timers.map(item => {
    const { timeLimit, times, power } = item.data;
    return <li key={item.id}> {`${times} x ${timeLimit} at ${power} W`}</li>;
  });
  return <List>{ListItems}</List>;
};
