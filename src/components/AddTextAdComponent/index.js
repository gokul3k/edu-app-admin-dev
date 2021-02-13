import React, { useState, useRef } from 'react';
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
import AdTextField from '../AdTextField';
import { StyleSharp } from '@material-ui/icons';
import api from '../../api/api';
import { getCredentials } from '../../services/authService';
import SnackBar from '../SnackBar';

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
    buttonZoneContainer: {
        marginTop: 18
    }
}));

const AddTextAdComponent = () => {

    const styleClasses = useStyles();
    const [adZone, setAdZone] = useState('adZone1');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMesssage] = useState('');
    const [severity, setSeverity] = useState(''); 

    const { selected } = useSelector((state) => state.selectedStudents);

    const saveAd = async (ad, students) => {
        try {
            setLoading(true);
            ad.adZone = "adZone5";
            const res = await api.post(
                "/admin/createTextAd",
                { ad: ad, students: students },
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
            setMesssage('Ad succesfully created');
            setSeverity('success');
            setOpen(true);
            console.log("res em", res);
        } catch (err) {
            setLoading(false);
            setMesssage('Ad creation failed');
            setSeverity('error');
            setOpen(true);
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues: {
            adName: '',
            companyName: '',
            skills: '',
            designation: '',
            phoneNo: '',
            experience: '',
            email: '',
            domain: '',
            adZone: 'adZone5'
        },
        validationSchema: Yup.object({
            adName: Yup.string().required('This field is required'),
            companyName: Yup.string().required('This field is required'),
            skills: Yup.string().required('This field is required'),
            designation: Yup.string().required('This field is required'),
            phoneNo: Yup.string().required('This field is required'),
            experience: Yup.string().required('This field is required'),
            email: Yup.string().required('This field is required'),
            domain: Yup.string().required('This field is required'),
            adZone: Yup.string().required('This field is required')
        }),
        onSubmit: (values) => {
            const formValue = { ...values, adZone };
            saveAd(formValue, selected);
        }
    });

    const formRef = useRef(null);
    
    const handleReset = () => {
        formik.resetForm();
        formRef.current.reset();
    };


    return (
        <div className={styleClasses.container}>
            {loading && (
                <Backdrop className={styleClasses.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
            {open && (
                <SnackBar open={open} message={message} severity={severity} setOpen={setOpen}/>
            )}
            <form ref={formRef} noValidate className={styleClasses.form} onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>
                        <Grid
                            container
                            justify="center"
                        >
                            <Typography variant="h6" className={styleClasses.heading}>
                                Upload Text Ad
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
                            <AdTextField
                                error={!!formik.errors.adName && formik.touched.adName}
                                helperText={
                                    !!formik.errors.adName && formik.touched.adName
                                        ? formik.errors.adName
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.adName}
                                name='adName'
                                label='Ad Name'
                            />
                            <AdTextField
                                error={!!formik.errors.companyName && formik.touched.companyName}
                                helperText={
                                    !!formik.errors.companyName && formik.touched.companyName
                                        ? formik.errors.companyName
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.companyName}
                                name='companyName'
                                label='Company Name'
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <AdTextField
                                error={!!formik.errors.skills && formik.touched.skills}
                                helperText={
                                    !!formik.errors.skills && formik.touched.skills
                                        ? formik.errors.skills
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.skills}
                                name='skills'
                                label='Skills'
                            />
                            <AdTextField
                                error={!!formik.errors.designation && formik.touched.designation}
                                helperText={
                                    !!formik.errors.designation && formik.touched.designation
                                        ? formik.errors.designation
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.designation}
                                name='designation'
                                label='Designation'
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <AdTextField
                                error={!!formik.errors.phoneNo && formik.touched.phoneNo}
                                helperText={
                                    !!formik.errors.phoneNo && formik.touched.phoneNo
                                        ? formik.errors.phoneNo
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.phoneNo}
                                name='phoneNo'
                                label='Phone Number'
                            />
                            <AdTextField
                                error={!!formik.errors.experience && formik.touched.experience}
                                helperText={
                                    !!formik.errors.experience && formik.touched.experience
                                        ? formik.errors.experience
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.experience}
                                name='experience'
                                label='Experience'
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <AdTextField
                                error={!!formik.errors.email && formik.touched.email}
                                helperText={
                                    !!formik.errors.email && formik.touched.email
                                        ? formik.errors.email
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                name='email'
                                label='Email'
                            />
                            <AdTextField
                                error={!!formik.errors.domain && formik.touched.domain}
                                helperText={
                                    !!formik.errors.domain && formik.touched.domain
                                        ? formik.errors.domain
                                        : ''
                                }
                                onChange={formik.handleChange}
                                value={formik.values.domain}
                                name='domain'
                                label='Domain'
                            />
                        </Grid>
                        {/* <Grid
                            className={styleClasses.buttonZoneContainer}
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <Select
                                labelId='demo-simple-select-label'
                                id='adZone'
                                variant='outlined'
                                size="small"
                                value={adZone}
                                onChange={(event) => setAdZone(event.target.value)}
                            >
                                <MenuItem value='adZone5'>Ad Zone 5</MenuItem>
                            </Select>

                        </Grid> */}
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}

export default AddTextAdComponent;
