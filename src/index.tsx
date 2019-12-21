import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import TimerTree from "./components/Tree/TimerTree";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#555555"
    },
    secondary: {
      main: "#e57373"
    }
  },
  overrides: {
    MuiTextField: {
      root: {
        maxWidth: "50px"
      }
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TimerTree />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
