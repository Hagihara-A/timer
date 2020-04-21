import { AppBar, Button, Link, Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import * as firebase from "firebase";
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
import { useAppState } from "../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../actions";

const RightButton = styled(Button)`
  margin-left: auto;
`;
const Bar = () => {
  const hist = useHistory();
  const user = useAppState((state) => state.options.user);
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" color="initial" underline="none" variant="h6">
          Training Timer
        </Link>
        {user ? (
          <RightButton
            variant="outlined"
            onClick={() => firebase.auth().signOut()}
          >
            {"log out"}
          </RightButton>
        ) : (
          <RightButton variant="outlined" onClick={() => hist.push("/login")}>
            {"log in"}
          </RightButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
export const Main = () => {
  const dispatch = useDispatch();
  const user = useAppState((state) => state.options.user);
  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((newUser) => {
      dispatch(setUser(newUser));
    });
    return unsubscribeAuth;
  }, [user, dispatch]);
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
