import React, { useState } from 'react';
import styled from 'styled-components'

const Input = styled.input`
    width: 3rem;
    margin-left: 5px;
`


export const NewTimerInput = ({ onSubmit }) => {
    const [inputVal, setInputVal] = useState(1)
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit(e.target.value)
            setInputVal(1)
        }
    }

    const onChange = (e) => {
        setInputVal(e.target.value)
    }

    return (<Input
        onKeyDown={onKeyDown}
        onChange={onChange}
        min={1}
        type='number'
        value={inputVal}
    />)
}