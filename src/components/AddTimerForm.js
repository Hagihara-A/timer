import React from 'react';

class AddTimerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: 0
        }
    }
    render() {
        return (
            <form onSubmit={(e) => this.onSubmit(e)} >
                <label>
                   新しく追加するタイマーの制限時間を入力してください:<br />
                    <input
                        type="number"
                        value={this.state.input}
                        onChange={(e) => this.onChange(e)}
                    />
                </label>
                <input type="submit" value="タイマーを追加" />
            </form>
        )
    }
    onChange(e) {
        this.setState({
            input: e.target.value
        })
    }
    onSubmit(e) {
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
}

export default AddTimerForm