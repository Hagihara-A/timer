import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const AddTimerForm = ({onSubmit}) => {
    const [input, setInput] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input > 0) {
            onSubmit(input)
            setInput(0)
        } else {
            return
        }
    }

    const handleChange = (e) => {
        const input = parseInt(e.target.value, 10)
        if (input >= 0) {
            setInput(input)
        } else {
            setInput(0)
        }
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit} >
                <TextField
                    id="timeLimit"
                    label="Time Limit"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    value={input}
                />
                <br />
                <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                >Add Timer</Button>
            </form>
        </Paper>
    )
}

export default AddTimerForm