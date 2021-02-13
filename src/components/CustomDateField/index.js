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
    InputProps
}) => {

    const useStyle = makeStyles({
        textField: {
            minWidth: 200
        },
        container: {
            marginBottom: 24
        }
    });
    const styleClasses = useStyle();

    return (
        <div className={styleClasses.container}>
            <TextField
                className={styleClasses.textField}
                label="Date"
                size="small"
                type={type}
                variant='outlined'
                name={name}
                error={error}
                helperText={helperText}
                InputLabelProps={{ shrink: true }}
                value={value}
                onChange={onChange}
                InputProps={InputProps}
            />
        </div>
    );
}

export default CustomTextField;