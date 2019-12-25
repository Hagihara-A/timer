import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { TimerList } from "./components/Timer/TimerList";
import TimerTree from "./components/Tree/TimerTree";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { useTransition, animated } from "react-spring";
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

const App = () => {
  const [isTree, setIsTree] = useState(true);
  const transitions = useTransition(isTree, null, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const Contents = transitions.map(({ item, key, props }) =>
    item ? (
      <animated.div style={props}>
        <TimerTree />
      </animated.div>
    ) : (
      <animated.div style={props}>
        <TimerList />
      </animated.div>
    )
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {Contents}
        <button
          onClick={() => setIsTree(!isTree)}
          style={{ position: "relative", top: "500px" }}
        >
          TOGGLE
        </button>
      </ThemeProvider>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
