import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { finishTimer } from '../../../actions';

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
        this.props.skip()
    }
}


const mapDispatchToProps = dispatch => ({
    skip: () => dispatch(finishTimer())
})

const SkipButton = connect(null, mapDispatchToProps)(SkipButtonInner)
export default SkipButton