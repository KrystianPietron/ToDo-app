import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style={
    margin:15
}
const Button = (props)=>(
    <RaisedButton 
    label={props.label}
    primary={true}
    onClick={props.onClick}
    style={style}
    />
)
export default Button