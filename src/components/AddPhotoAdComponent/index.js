import React, { useState, useRef } from 'react';
import Axios from 'axios';
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
import api from '../../api/api';
import { getCredentials } from '../../services/authService';
import SnackBar from '../SnackBar';
import adUploadImg from "assets/images/ad_uploadimg.svg"

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
    },
    dropdown: {
        marginTop: 24
    },
    img: {
        display: 'flex',
        flex: 1,
        width: '100%',
        maxHeight: 350
    },
    button: {
        marginLeft: 16
    },
    submitButton: {
        marginTop: 16
    }
}));



const AddPhotoAdComponent = () => {

    const styleClasses = useStyles();
    const [adZone, setAdZone] = useState('adZone1');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMesssage] = useState('');
    const [severity, setSeverity] = useState('');
    const [picture, setPicture] = useState(
        adUploadImg
    );
    const [adPic, setAdPic] = useState(null);

    const { selected } = useSelector((state) => state.selectedStudents);

    const formik = useFormik({
        initialValues: {
            adName: '',
            adZone: 'adZone3'
        },
        validationSchema: Yup.object({
            adName: Yup.string().required('This field is required'),
            adZone: Yup.string().required('This field is required')
        }),
        onSubmit: (values) => {
            const formValues = { ...values, adZone };
            console.log(values);
            saveAd(formValues, selected);
        }
    });

    const formRef = useRef(null);
    const inputFile = useRef(null);

    const saveAd = async (data, students) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('adName', data.adName);
            formData.append('adZone', data.adZone);
            formData.append('students', JSON.stringify(students));
            formData.append('adPic', adPic);

            const config = {
                method: 'POST',
                url: 'https://edu-app-server-beta.herokuapp.com/rest/v1/admin/uploadPhotoAd',
                data: formData,
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
            };

            const response = await Axios(config);
            handleReset();
            setLoading(false);
            setMesssage('Ad succesfully created');
            setSeverity('success');
            setOpen(true);

        } catch (error) {
            setLoading(false);
            setMesssage('Ad creation failed');
            setSeverity('error');
            setOpen(true);
            console.log(error);
        }
    }

    const selectImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (data) => {
            setAdPic(file);
            setPicture(data.target.result);
        });
        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        formik.resetForm();
        setPicture(adUploadImg);
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
                <SnackBar open={open} message={message} severity={severity} setOpen={setOpen} />
            )}
            <form ref={formRef} noValidate className={styleClasses.form} onSubmit={formik.handleSubmit}>
                <Card>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid
                                direction="column"
                                item
                                xs

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
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    className={styleClasses.dropdown}
                                >
                                    <Select

                                        labelId='demo-simple-select-label'
                                        id='adZone'
                                        variant='outlined'
                                        size="small"
                                        value={adZone}
                                        onChange={(event) => setAdZone(event.target.value)}
                                    >
                                        <MenuItem value='adZone1'>Ad Zone 1</MenuItem>
                                        <MenuItem value='adZone2'>Ad Zone 2</MenuItem>
                                        <MenuItem value='adZone3'>Ad Zone 3</MenuItem>
                                        <MenuItem value='adZone4'>Ad Zone 4</MenuItem>
                                    </Select>
                                    <div>
                                        <Button
                                            className={styleClasses.button}
                                            variant='outlined'
                                            onClick={() => inputFile.current.click()}
                                        >
                                            Upload
                                    </Button>
                                    </div>
                                </Grid>
                                <Button
                                    className={styleClasses.submitButton}
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                >
                                    Submit
                                </Button>
                                <input
                                    type='file'
                                    id='file'
                                    accept='image/*'
                                    ref={inputFile}
                                    onChange={selectImage}
                                    style={{ marginTop: 16, display: 'none' }}
                                />

                            </Grid>
                            <Grid item xs>
                                <img
                                    className={styleClasses.img}
                                    src={picture}
                                    onClick={() => inputFile.current.click()}
                                    alt='upload certificate'
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="column">
                            <Typography>Recommended Dimensions</Typography>
                            <Typography variant="subtitle1" >Please note that to follow the minimum dimensions of the photos to be uploaded should be of below specifed sizes and if is larger it should have the same Width x Height ratio of the below specifed dimesnions.</Typography>
                            <Typography variant="subtitle1" ><em>Ad Zone 1</em>: 1910 X 275</Typography>
                            <Typography variant="subtitle1" ><em>Ad Zone 2</em>: 1910 X 275</Typography>
                            <Typography variant="subtitle1" ><em>Ad Zone 3</em>: lksnlalskndl</Typography>
                            <Typography variant="subtitle1" ><em>Ad Zone 4</em>: lksnlalskndl</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </div >
    );
}

export default AddPhotoAdComponent;