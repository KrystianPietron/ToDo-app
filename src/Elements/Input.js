import React from 'react';
import TextField from 'material-ui/TextField';

const Input = (props) => (
    <TextField
    label={props.label}
    hintText={props.hintText}
    fullWidth={props.fullWidth}
    onChange={props.onChange}
    value={props.value}
    onKeyDown={props.onKeyDown}
    />
)
export default Input