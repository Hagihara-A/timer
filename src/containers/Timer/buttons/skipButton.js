import React from 'react';
import { connect } from 'react-redux';
import { getCurrentTimerIdx } from '../../../getCurrentTimerIdx';
import { finishTimer } from '../../../actions';
import { Button } from '@material-ui/core';

class SkipButtonInner extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        return <Button
            variant='contained'
            color='primary'
            onClick={this.handleClick} >SKIP</Button>
    }

    handleClick(e) {
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