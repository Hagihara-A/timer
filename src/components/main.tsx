import { AppBar, Button, Link, Toolbar } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";
import { Login } from "./Login";
import { TimerApp } from "./TimerApp";

const RightButton = styled(Button)`
  margin-left: auto;
`;
const Bar = () => {
  const hist = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" color="initial" underline="none" variant="h6">
          Training Timer
        </Link>
        <RightButton variant="outlined" onClick={() => hist.push("/login")}>
          {" "}
          Login
        </RightButton>
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
