import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { TimerApp } from "./TimerApp";
import { Typography } from "@material-ui/core";
export const Main = () => {
  return (
    <BrowserRouter>
      <Typography variant="h1" paragraph align="center">
        Training Timer
      </Typography>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <TimerApp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
