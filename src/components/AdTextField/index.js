import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const AdTextField = ({
    error,
    helperText,
    value,
    onChange, 
    name,
    type = 'text',
    label,
}) => {

    const useStyle = makeStyles({
        textField: {
            minWidth: 300
        },
    });
    const styleClasses = useStyle();

    return (
        <div>
            <p>{label}</p>
            <TextField
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
            />
        </div>
    );
}

export default AdTextField;