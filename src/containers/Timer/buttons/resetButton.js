import React from 'react';
import { connect } from 'react-redux';
import { resetTimer } from '../../../actions';
import Button from '@material-ui/core/Button';
class ResetButtonInner extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        return <Button
            color='primary'
            variant='contained'
            onClick={this.handleClick}>RESET</Button>
    }
    handleClick(e) {
        e.preventDefault()
        this.props.skip()
    }
}


const mapDispatchToProps = dispatch => ({
    skip: () => dispatch(resetTimer())
})

const ResetButton = connect(null, mapDispatchToProps)(ResetButtonInner)
export default ResetButton