import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import "./App.scss";
import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import TimerSection from './TimerSection';
import FormSection from './ScheduleSection';
import IntroSection from './components/Intro/IntroSection';
import { Paper } from 'material-ui';

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
                <FormSection />
                <TimerSection />
            </Paper>
        </ Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
