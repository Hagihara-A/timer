import React from 'react';
import { connect } from 'react-redux';
import { resetTimer } from '../../../actions';
import Button from '@material-ui/core/Button';
const ResetButtonInner = ({reset}) => {

    const handleClick = (e) => {
        e.preventDefault()
        reset()
    }

    return (
        <Button
            color='primary'
            variant='contained'
            onClick={handleClick}>
                RESET
        </Button>
    )
}


const mapDispatchToProps = dispatch => ({
    reset: () => dispatch(resetTimer())
})

const ResetButton = connect(null, mapDispatchToProps)(ResetButtonInner)
export default ResetButton