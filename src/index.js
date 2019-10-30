import { createMuiTheme } from '@material-ui/core/styles';
import { Paper } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./App.scss";
import IntroSection from './components/Intro/IntroSection';
import TimerTree from './containers/TimerTree/TimerTree';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import TimerSection from './TimerSection';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1e88e5',
        },
        secondary: {
            main: '#e57373',
        },
    },
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store} >
            <Paper>
                <IntroSection />
                <Paper style={{height: '1000px'}}>
                    <TimerTree />
                </Paper>
                <TimerSection />
            </Paper>
        </ Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
