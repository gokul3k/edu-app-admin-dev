import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import styles from './AddUserTextField.module.css';

const AddUserTextField = ({
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
            display: 'flex',
            marginLeft: '16px',
            flex: 3,
        },
    });
    const styleClasses = useStyle();

    return (
        <div className={styles.container}>
            <p className={styles.heading}>{label}</p>
            <TextField
                className={styleClasses.textField}
                name={name}
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
};

export default AddUserTextField;
