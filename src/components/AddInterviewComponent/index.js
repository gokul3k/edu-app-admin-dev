import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    MenuItem,
    InputLabel,
    makeStyles,
    Select,
    Grid, Card, CardContent, Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomTextField from '../CustomTextField';
import CustomDateField from '../CustomDateField';
import { StyleSharp } from '@material-ui/icons';
import api from '../../api/api';
import { getCredentials } from '../../services/authService';
import SnackBar from '../SnackBar';
import { resetSelectedStudents} from 'actions/studentActions'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        display: 'flex',
        flex: 1
    },
    form: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    heading: {
        fontSize: 14,
        fontWeight: 600
    },
    dropDown: {
        height: 35,
        width: 200
    },

}));

const AddInterviewComponent = (props) => {
    const styleClasses = useStyles();
    const [loading, setLoading] = useState(false);
    const [adminUsers, setAdminUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMesssage] = useState('');
    const [severity, setSeverity] = useState('');
    const [assignTo, setAssignTo] = useState('assignTo');
    const dispatch = useDispatch()

    const { selected } = useSelector((state) => state.selectedStudents);
    const { roles } = useSelector((state) => state.userRole);

    useEffect(() => {
        dispatch(resetSelectedStudents())
        return () => {
        }
    }, [])
    const formik = useFormik({
        initialValues: {
            interviewName: '',
            interviewBy: '',
            date: '',
            assignTo: 'assignTo'
        },
        validationSchema: Yup.object({
            interviewName: Yup.string().required('This field is required'),
            interviewBy: Yup.string().required('This field is required'),
            date: Yup.date().required('This field is required'),
        }),
        onSubmit: (values) => {
            const formValues = {
                ...values, assignTo
            };
            saveInterview(formValues, selected);
        }
    });

    const formRef = useRef(null);

    const handleReset = () => {
        formik.resetForm();
        formRef.current.reset();
    };

    useEffect(() => {
        getAdminUsers();
    },[]);

    const saveInterview = async (interview, students) => {
        try {
            setLoading(true);
            await api.post(
                "/admin/saveInterview",
                {interview, students},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            handleReset();
            setLoading(false);
            setMesssage('Interview succesfully created');
            setSeverity('success');
            setOpen(true);
            setTimeout(()=>{props.history.goBack()},1000);
        } catch (error) {
            setLoading(false);
            setMesssage('Interview creation failed');
            setSeverity('error');
            setOpen(true);
            console.log(error);
        }
    }

    const getAdminUsers = async () => {
        try {
            const res = await api.post(
                "/admin/getAdminUsers",
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            setAdminUsers(res.data.response);
        } catch (error) {   
            console.log(error);
        }
    }

    return (
        <div className={styleClasses.container}>
            {loading && (
                <Backdrop className={styleClasses.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
            {open && (
                <SnackBar open={open} message={message} severity={severity} setOpen={setOpen} />
            )}

            <form ref={formRef} noValidate className={styleClasses.form} onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>
                        <Grid
                            container
                            justify="center"
                        >
                            <Typography variant="h6" className={styleClasses.heading}>
                                Create Interview
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                        >
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                type='submit'
                            >
                                Upload
                             </Button>
                        </Grid>
                        <Grid 
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <CustomTextField
                                error={!!formik.errors.interviewName && formik.touched.interviewName}
                                helperText={
                                    !!formik.errors.interviewName && formik.touched.interviewName
                                        ? formik.errors.interviewName
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.interviewName}
                                name='interviewName'
                                label='Interview Name'
                                InputLabelProps={{ shrink: true }}
                            />
                            <CustomDateField
                                label='Date of Interview'
                                type='date'
                                name='date'
                                InputProps={{inputProps: { min:moment().format('YYYY-MM-DD')} }}
                                error={!!formik.errors.date && formik.touched.date}
                                helperText={
                                    !!formik.errors.date && formik.touched.date
                                        ? formik.errors.date
                                        : ''
                                }
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.date}
                                onChange={(event) => {
                                    formik.setFieldValue('date', event.target.value);
                                }}
                            />


                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <CustomTextField
                                error={!!formik.errors.interviewBy && formik.touched.interviewBy}
                                helperText={
                                    !!formik.errors.interviewBy && formik.touched.interviewBy
                                        ? formik.errors.interviewBy
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.interviewBy}
                                name='interviewBy'
                                label='Interview By'
                                InputLabelProps={{ shrink: true }}
                            />

                            <Select
                                className={styleClasses.dropDown}
                                labelId='demo-simple-select-label'
                                id='assignTo'
                                variant='outlined'
                                size="small"
                                value={assignTo}
                                disabled={roles.ROLE!=='SUPER_USER'}
                                onChange={(event) => setAssignTo(event.target.value)}
                            >
                                <MenuItem value='assignTo'>Assign To</MenuItem>
                                {
                                    adminUsers.map((user) => {
                                        return (<MenuItem value={user.id}>{user.Username}</MenuItem>)
                                    })
                                }
                            </Select>

                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default AddInterviewComponent;