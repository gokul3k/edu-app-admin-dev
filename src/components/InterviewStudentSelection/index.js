import React, { useState, useEffect } from 'react';
import { Card, CardContent, makeStyles, Grid, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../api/api';
import { getCredentials } from '../../services/authService';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        marginTop: 24
    },
    card: {
        width: '100%'
    },
    heading: {
        color: '#4169E1',
        fontWeight: "bold",
    },
    dropDown: {
        height: 24,
    },
    form: {
        width: '100%'
    },
    textField: {
        marginLeft: 24
    },
    formGroup: {
        marginLeft: 24
    },
    gridItem: {
        marginTop: 16
    }
}));

function InterviewStudentSelection(props) {

    const classes = useStyles();
    const [status, setStatus] = useState('pending');
    const [rejectState, setRejectState] = useState({
        aptitude: false,
        language: false,
        logical: false,
        coding: false,
        others: false
    });

    const [selectState, setSelectState] = useState({
        aptitude: false,
        language: false,
        logical: false,
        coding: false,
        others: false
    });

    const [studentData, setStudentData] = useState({});

    const [interviewId, setInterviewId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setInterviewId(props.match.params.intId);
        getInterviewStudentData(props.match.params.id, props.match.params.intId);
    }, []);

    const getInterviewStudentData = async (studentId, interview) => {
        try {
            const res = await api.post(
                "/admin/getInterviewStudentDetail",
                { studentId, interview }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }
            );
            setStudentData(res.data.response);
        } catch (error) {
            console.log(error);
        }
    }

    const submitInterview = async (interviewId, studentId, studentName, selectionStatus, timesAttended = '', postponedDate = '', reason = '', salary = '', improvements = '', joiningDate = '') => {
        const apiData = {
            interviewId,
            studentId,
            studentName,
            selectionStatus,
            timesAttended,
            postponedDate,
            reason,
            salary,
            improvements,
            joiningDate
        };
        console.log("APID ATTA ", apiData);
        try {
            const res = await api.post(
                "/admin/addInterviewResult",
                { apiData }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }
            );
            setLoading(false);
            props.history.replace('/app/interviews/detail/'+interviewId);
            console.log("RESONSESSS ", res.data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const submitInterviewStudentData = async (values, selectState, rejectState, status) => {
        setLoading(true);
        const studentId = studentData.id;
        if (status === 'selected') {
            var reason = '';
            for (const property in selectState) {
                if (selectState[property]) {
                    if (property === 'others') {
                        reason += values.selectReason;
                    } else {
                        reason += String(property) + ", ";
                    }
                }
            }
            submitInterview(interviewId, studentData.id, studentData.Name, status, studentData.Count, values.postponedDate, reason, values.salary, values.improvements, values.joiningDate);
        } else if (status === 'rejected') {
            var reason = '';
            for (const property in rejectState) {
                if (rejectState[property]) {
                    if (property === 'others') {
                        reason += values.rejectReason;
                    } else {
                        reason += String(property) + ", ";
                    }
                }
            }
            submitInterview(interviewId, studentData.id, studentData.Name, status, studentData.Count, values.postponedDate, reason, values.salary, values.improvements, values.joiningDate);
        } else if (status === 'postponed') {
            submitInterview(interviewId, studentData.id, studentData.Name, status, studentData.Count, values.postponedDate, reason, values.salary, values.improvements, values.joiningDate);
        }
    }

    const handleRejectionChange = (event) => {
        setRejectState({ ...rejectState, [event.target.name]: event.target.checked });
    };

    const handleSelectionChange = (event) => {
        setSelectState({ ...selectState, [event.target.name]: event.target.checked });
    };


    const formik = useFormik({
        initialValues: {
            selectReason: '',
            salary: '',
            joiningDate: '',
            postponedDate: '',
            rejectReason: '',
            improvements: ''
        },
        onSubmit: (values) => {
            submitInterviewStudentData(values, selectState, rejectState, status);
        }
    });

    return (
        <div className={classes.container}>
            {loading && (
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
            <form onSubmit={formik.handleSubmit} noValidate className={classes.form}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                        >
                            <Grid
                                item
                                direction="column"
                                justify="space-between"
                            >
                                <Grid
                                    className={classes.gridItem}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignContent="flex-start"
                                >
                                    <p className={classes.heading}>Candidate ID :</p>
                                    <p className={classes.subHeading}>{studentData.id}</p>
                                </Grid>

                                <Grid
                                    className={classes.gridItem}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignContent="flex-start"
                                >
                                    <p className={classes.heading}>Times Attended :</p>
                                    <p className={classes.subHeading}>{studentData.Count}</p>
                                </Grid>

                                {
                                    status === 'selected' &&
                                    <>
                                        <Grid
                                            className={classes.gridItem}
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignContent="flex-start"
                                        >
                                            <p className={classes.heading}>Reason for Selection :</p>
                                            <FormGroup column className={classes.formGroup}>
                                                <FormControlLabel
                                                    control={<Checkbox checked={selectState.aptitude} onChange={handleSelectionChange} name="aptitude" />}
                                                    label="Aptitude"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={selectState.language} onChange={handleSelectionChange} name="language" />}
                                                    label="Language"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={selectState.logical} onChange={handleSelectionChange} name="logical" />}
                                                    label="Logical Reasoning"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={selectState.coding} onChange={handleSelectionChange} name="coding" />}
                                                    label="Coding"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={selectState.others} onChange={handleSelectionChange} name="others" />}
                                                    label="Others"
                                                />
                                                {
                                                    selectState.others &&
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        multiline
                                                        rows={4}
                                                        placeholder="Specify the reasons"
                                                        variant="outlined"
                                                        name="selectReason"
                                                        value={formik.values.selectReason}
                                                        onChange={(event) => {
                                                            formik.setFieldValue('selectReason', event.target.value);
                                                        }}
                                                    />
                                                }
                                            </FormGroup>
                                        </Grid>

                                        <Grid
                                            className={classes.gridItem}
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignContent="flex-start"
                                        >
                                            <p className={classes.heading}>Salary Package :</p>
                                            <TextField
                                                name="salary"
                                                size="small"
                                                variant='outlined'
                                                type="text"
                                                value={formik.values.salary}
                                                onChange={(event) => {
                                                    formik.setFieldValue('salary', event.target.value);
                                                }}
                                            />
                                        </Grid>

                                        <Grid
                                            className={classes.gridItem}
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignContent="flex-start"
                                        >
                                            <p className={classes.heading}>Joining Date</p>
                                            <TextField
                                                className={classes.textField}
                                                size="small"
                                                type="date"
                                                variant='outlined'
                                                name="joiningDate"
                                                InputLabelProps={{ shrink: true }}
                                                value={formik.values.joiningDate}
                                                onChange={(event) => {
                                                    formik.setFieldValue('joiningDate', event.target.value);
                                                }}
                                            />
                                        </Grid>
                                    </>
                                }


                            </Grid>

                            <Grid
                                item
                                direction="column"
                                justify="space-between"
                            >

                                <Grid
                                    className={classes.gridItem}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignContent="flex-start"
                                >
                                    <p className={classes.heading}>Candidate Name :</p>
                                    <p className={classes.subHeading}>{studentData.Name}</p>
                                </Grid>

                                <Grid
                                    className={classes.gridItem}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignContent="flex-start"
                                    alignItems="center"
                                >
                                    <p className={classes.heading}>Status :</p>
                                    <Select
                                        className={classes.dropDown}
                                        labelId='demo-simple-select-label'
                                        id='status'
                                        variant='outlined'
                                        size="small"
                                        value={status}
                                        onChange={(event) => setStatus(event.target.value)}
                                    >
                                        <MenuItem value='pending'>Pending</MenuItem>
                                        <MenuItem value='selected'>Selected</MenuItem>
                                        <MenuItem value='rejected'>Rejected</MenuItem>
                                        <MenuItem value='postponed'>Postponed</MenuItem>
                                    </Select>
                                </Grid>
                                {
                                    status === 'postponed' &&
                                    <Grid
                                        className={classes.gridItem}
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignContent="flex-start"
                                    >
                                        <p className={classes.heading}>Postponed Date :</p>
                                        <TextField
                                            className={classes.textField}
                                            size="small"
                                            type="date"
                                            variant='outlined'
                                            name="postponedDate"
                                            InputLabelProps={{ shrink: true }}
                                            value={formik.values.postponedDate}
                                            onChange={(event) => {
                                                formik.setFieldValue('postponedDate', event.target.value);
                                            }}
                                        />
                                    </Grid>
                                }

                                {
                                    status === 'rejected' &&
                                    <Grid
                                        className={classes.gridItem}
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignContent="flex-start"
                                    >
                                        <p className={classes.heading}>Reason for Rejection :</p>
                                        <FormGroup column className={classes.formGroup}>
                                            <FormControlLabel
                                                control={<Checkbox checked={rejectState.aptitude} onChange={handleRejectionChange} name="aptitude" />}
                                                label="Aptitude"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={rejectState.language} onChange={handleRejectionChange} name="language" />}
                                                label="Language"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={rejectState.logical} onChange={handleRejectionChange} name="logical" />}
                                                label="Logical Reasoning"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={rejectState.coding} onChange={handleRejectionChange} name="coding" />}
                                                label="Coding"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={rejectState.others} onChange={handleRejectionChange} name="others" />}
                                                label="Others"
                                            />
                                            {
                                                rejectState.others &&
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    multiline
                                                    rows={4}
                                                    placeholder="Specify the reasons"
                                                    variant="outlined"
                                                    name="rejectReason"
                                                    value={formik.values.rejectReason}
                                                    onChange={(event) => {
                                                        formik.setFieldValue('rejectReason', event.target.value);
                                                    }}
                                                />
                                            }

                                        </FormGroup>
                                    </Grid>
                                }


                                <Grid
                                    className={classes.gridItem}
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignContent="flex-start"
                                >
                                    <p className={classes.heading}>Sectors to Improve :</p>
                                    <TextField
                                        className={classes.textField}
                                        id="outlined-multiline-static"
                                        multiline
                                        rows={4}
                                        placeholder="Comment if any..."
                                        variant="outlined"
                                        name="improvements"
                                        value={formik.values.improvements}
                                        onChange={(event) => {
                                            formik.setFieldValue('improvements', event.target.value);
                                        }}
                                    />
                                </Grid>

                            </Grid>


                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                        >
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}

export default InterviewStudentSelection;