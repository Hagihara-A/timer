import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./Login";
import { TimerApp } from "./TimerApp";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import styled from "styled-components";

const RightButton = styled(Button)`
  margin-left: auto;
`;
const Bar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" align="left">
          Training Timer
        </Typography>
        <RightButton variant="outlined"> Login</RightButton>
      </Toolbar>
    </AppBar>
  );
};
export const Main = () => {
  return (
    <BrowserRouter>
      <Bar />
      <div style={{ height: "10px" }}></div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <TimerApp />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
