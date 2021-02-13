import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    makeStyles,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../api/api";
import { getCredentials } from "../../../../services/authService";
import StudentTable from "../../../../components/tables/StudentTable";
import SnackBar from "../../../../components/SnackBar";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const ExamAssignStudents = (props) => {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMesssage] = useState('');
    const [severity, setSeverity] = useState('');
    const students = useSelector((state) => state.selectedStudents);

    useEffect(() => {
        remoteData();
    }, []);

    const assignStudents = async (students, examId) => {
        try {
            setLoading(true);
            const res = await api.post(
                '/admin/assignStudentsToExam',
                { students, examId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            setMesssage('Students successfully assigned');
            setSeverity('success');
            setOpen(true);
            remoteData();
        } catch (error) {
            setLoading(false);
            setMesssage('Student assignment failed');
            setSeverity('error');
            setOpen(true);
            console.log(error);
        }
    }

    const remoteData = async () => {
        try {
            setLoading(true);
            const res = await api.post(
                '/admin/getExamUnassignedStudents',
                { examId: props.match.params.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );

            setData(res.data.response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleAssign = () => {
        assignStudents(students.selected, props.match.params.id);
    }

    return (
        <div>
            {loading && (
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
            {open && (
                <SnackBar open={open} message={message} severity={severity} setOpen={setOpen}/>
            )}
            <Grid
                container
                direction="row"
                color="primary"
                justify="flex-end"
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleAssign}
                >
                    Assign
                </Button>
            </Grid>
            <StudentTable history={props.history} data={data} remoteData={remoteData} />
        </div>
    )
}

export default ExamAssignStudents;