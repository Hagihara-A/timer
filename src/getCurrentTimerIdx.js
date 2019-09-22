import { timerState } from './reducers';

export const getCurrentTimerIdx = timers => {
    const index = timers.findIndex((v) => {
        const iscurrentTimer = (v.timerState === timerState.ELAPSE) || (v.timerState === timerState.STOP);
        return iscurrentTimer;
    });
    return index >= 0 ? index : 0;
};
