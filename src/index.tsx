import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Main } from "./components/main";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f55333"
    },
    secondary: {
      main: "#062457"
    }
  }
});

theme = responsiveFontSizes(theme);
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
