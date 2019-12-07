import List from "@material-ui/core/List";
import React from "react";
import ListItem from "material-ui/List/ListItem";
import TimerContainer from "../../containers/Timer/TimerContainer";
import { List as ListIm } from "immutable";

const renderTimerList = timers => {
  return (
    <List>
      {timers.map((v, i) => {
        if (ListIm.isList(v)) {
          return <ListItem key={i}>{renderTimerList(v)}</ListItem>;
        } else {
          return (
            <ListItem key={i}>
              <TimerContainer {...v.toJS()} />/ {v.get("timeLimit")}
            </ListItem>
          );
        }
      })}
    </List>
  );
};

const TimerList = props => {
  return renderTimerList(props.timers);
};
export default TimerList;
