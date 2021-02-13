import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const CustomTextField = ({
    error,
    helperText,
    value,
    onChange,
    name,
    type = 'text',
    label,
    InputLabelProps
}) => {

    const useStyle = makeStyles({
        textField: {
            minWidth: 300
        },
        container: {
            marginBottom: 24
        }
    });
    const styleClasses = useStyle();

    return (
        <div className={styleClasses.container}>
            <TextField
                label={label}
                className={styleClasses.textField}
                name={name}
                size="small"
                variant='outlined'
                autoFocus
                type={type}
                error={error}
                helperText={helperText}
                onChange={onChange}
                value={value}
                InputLabelProps={InputLabelProps}
            />
        </div>
    );
}

export default CustomTextField;