import React from 'react';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class AddTimerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    render() {
        const { input } = this.state
        return (
            <Paper>
                <form onSubmit={this.handleSubmit} >
                    <TextField
                        id="timeLimit"
                        label="Time Limit"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleChange}
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
    handleSubmit(e) {
        e.preventDefault()
        const input = this.state.input
        if (input > 0) {
            this.props.onSubmit(input)
            this.setState({
                input: 0
            })
        } else {
            return
        }
    }
    handleChange(e) {
        const input = e.target.value
        if (input >= 0) {
            this.setState({ input })
        } else {
            this.setState({ input: 0 })
        }
    }
}

export default AddTimerForm