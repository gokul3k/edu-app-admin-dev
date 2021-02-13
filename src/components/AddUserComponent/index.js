import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './AddUser.module.css';
import {
    TextField,
    Button,
    MenuItem,
    InputLabel,
    makeStyles,
    Select,
} from '@material-ui/core';
import AddUserTextField from '../AddUserTextField';

const AddUserComponent = ({ onSubmitClicked, loading }) => {
    const [role, setRole] = useState('SUPER_USER');

    const useStyle = makeStyles({
        textField: {
            marginTop: 16,
        },
        button: {
            backgroundColor: '#ed6c1f',
            color: 'white',
            textTransform: 'capitalize',
            fontSize: 16,
            borderRadius: 10,
        },
    });

    const styleClasses = useStyle();

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            organization: '',
            password: '',
            confirmpassword: '',
            role: 'SUPER_USER',
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .required(
                    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
                )
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
                ),
            confirmpassword: Yup.string()
                .required('This field is required')
                .oneOf([Yup.ref('password'), null], 'Password mismatch'),
            email: Yup.string()
                .required('Enter valid email')
                .email('Enter valid email'),
            name: Yup.string().required('This field is required'),
            organization: Yup.string().required('This field is required'),
        }),
        onSubmit: (values) => {
            console.log(loading);
            onSubmitClicked({ ...values, role });
        },
    });

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <AddUserTextField
                    error={!!formik.errors.email && formik.touched.email}
                    helperText={
                        !!formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    disabled={loading}
                    name='email'
                    label='Email'
                />
                <AddUserTextField
                    error={!!formik.errors.name && formik.touched.name}
                    helperText={
                        !!formik.errors.name && formik.touched.name
                            ? formik.errors.name
                            : ''
                    }
                    disabled={loading}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name='name'
                    label='Username'
                />
                <AddUserTextField
                    disabled={loading}
                    error={
                        !!formik.errors.organization &&
                        formik.touched.organization
                    }
                    helperText={
                        !!formik.errors.organization &&
                        formik.touched.organization
                            ? formik.errors.organization
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.organization}
                    name='organization'
                    label='Organization Name'
                />
                <AddUserTextField
                    error={!!formik.errors.password && formik.touched.password}
                    helperText={
                        !!formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : ''
                    }
                    onChange={formik.handleChange}
                    disabled={!loading}
                    value={formik.values.password}
                    name='password'
                    type='password'
                    label='Password'
                />
                <AddUserTextField
                    disabled={loading}
                    error={
                        !!formik.errors.confirmpassword &&
                        formik.touched.confirmpassword
                    }
                    helperText={
                        !!formik.errors.confirmpassword &&
                        formik.touched.confirmpassword
                            ? formik.errors.confirmpassword
                            : ''
                    }
                    onChange={formik.handleChange}
                    value={formik.values.confirmpassword}
                    name='confirmpassword'
                    type='password'
                    label='Confirm Password'
                />
                <div className={styles.buttonRoleHeadingContainer}>
                    <p className={styles.heading} id='demo-simple-select-label'>
                        Role
                    </p>
                    <div className={styles.buttonRoleContainer}> 
                        <Select
                            labelId='demo-simple-select-label'
                            id='role'
                            variant='outlined'
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <MenuItem value='SUPER_USER'>Admin</MenuItem>
                            <MenuItem value='HR_USER'>HR Admin</MenuItem>
                        </Select>
                        <Button
                            className={styleClasses.button}
                            variant='contained'
                            disableElevation
                            // disabled={loading}
                            type='submit'
                        >
                            Create User
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUserComponent;
