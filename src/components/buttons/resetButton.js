import React from 'react';
import { connect } from 'react-redux';
import { resetTimer } from '../../actions';

class ResetButtonInner extends React.Component {
    render() {
        return <button onClick={(e) => this.onClick(e)}>RESET</button>
    }
    onClick(e) {
        e.preventDefault()
        this.props.skip()
    }
}


const mapDispatchToProps = dispatch => ({
    skip: () => dispatch(resetTimer())
})

const ResetButton = connect(null, mapDispatchToProps)(ResetButtonInner)
export default ResetButton