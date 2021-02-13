import React, { useState, useEffect } from 'react';
import { Card, CardContent, makeStyles, Grid, Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../api/api';
import { getCredentials } from '../../services/authService';
import { useHistory } from 'react-router-dom';
import AssignStudents from './AssignStudents';

const useStyles = makeStyles((theme) => ({
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
        fontWeight: 'bold',
        color: "#4169E1"
    },
    value: {
        fontSize: 14,
        color: "#FFA500"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function InterviewDetailComponent({ interviewId }) {

    const classes = useStyles();
    const [interview, setInterview] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    useEffect(() => {
        getInterviewDetail(interviewId);
    }, []);

    const handleStatusClick = async (interviewId) => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/toggleInterviewStatus",
                { interviewId }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }
            );
            getInterviewDetail(interviewId);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getInterviewDetail = async (interviewId) => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/getInterviewDetails",
                { interviewId }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }

            );

            setInterview(res.data.response);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="primary" />
            </Backdrop>
        )
    }
    const handleClose=()=>{
        setOpen(false)
    }
    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                    >
                        {interview.Status==='pending'&&(<Button variant="contained" color="primary" style={{marginLeft:8,marginRight:8}} onClick={()=>setOpen(true)}>Assign students</Button>)}
                        {open&&(<AssignStudents id={interviewId} open={open} handleClose={handleClose}/>)}
                        {
                            (interview.Status === 'pending') ?
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    onClick={() => { handleStatusClick(interview.id) }}
                                > Mark as completed</Button>
                                :
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    onClick={() => { handleStatusClick(interview.id) }}
                                > Completed</Button>
                        }
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                    >
                        <Grid
                            item
                            direction="column"
                        >
                            <p className={classes.heading}>ID  : <span className={classes.value}>{interview.id}</span></p>
                            <p className={classes.heading}>Interview Name  : <span className={classes.value}>{interview.InterviewName}</span></p>
                            <p className={classes.heading}>Interview By  : <span className={classes.value}>{interview.InterviewBy}</span></p>
                        </Grid>
                        <Grid
                            item
                            direction="column"
                        >
                            <p className={classes.heading}>Date  : <span className={classes.value}>{interview.Date}</span></p>
                            <p className={classes.heading}>Total Candidates  : <span className={classes.value}>{interview.TotalCandidates}</span></p>
                            <p className={classes.heading}>Status  : <span className={classes.value}>{interview.Status}</span></p>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
