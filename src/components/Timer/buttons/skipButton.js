import React from 'react';
import { connect } from 'react-redux';
import { getCurrentTimerIdx } from '../../../getCurrentTimerIdx';
import { finishTimer } from '../../../actions';

class SkipButtonInner extends React.Component {
    render() {
        return <button onClick={(e) => this.onClick(e)}>SKIP</button>
    }
    onClick(e) {
        e.preventDefault()
        this.props.skip(this.props.currentTimerIdx)
    }
}

const mapStateToProps = state => {
    const currentTimerIdx = getCurrentTimerIdx(state.timers);
    return {
        currentTimerIdx
    }
}

const mapDispatchToProps = dispatch => ({
    skip: index => dispatch(finishTimer(index))
})

const SkipButton = connect(mapStateToProps, mapDispatchToProps)(SkipButtonInner)
export default SkipButton