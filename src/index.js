import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import "./App.scss";
import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import TimerSection from './TimerSection';
import ScheduleSection from './ScheduleSection';
import { Container } from '@material-ui/core';
import IntroSection from './components/Intro/IntroSection';

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
            <Container>
                <IntroSection />
                <ScheduleSection />
                <TimerSection />
            </Container>
        </ Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
