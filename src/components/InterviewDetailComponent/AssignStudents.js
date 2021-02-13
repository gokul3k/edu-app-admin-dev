import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import api from "api/api";
import { getCredentials } from "services/authService";
import StudentTable from "components/tables/StudentTable";
import SnackBar from "components/SnackBar";
import { resetSelectedStudents } from 'actions/studentActions';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const AssignStudents = (props) => {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMesssage] = useState('');
    const [severity, setSeverity] = useState('');

    const students = useSelector((state) => state.selectedStudents);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSelectedStudents())
        remoteData();
        return ()=>{
            dispatch(resetSelectedStudents())
        }
    }, []);
    

    const assignStudents = async (students, id) => {
        try {
            setLoading(true);
            const res = await api.post(
                '/admin/assignStudentsToInterview',
                { students, interviewId:id },
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
            dispatch(resetSelectedStudents())
            props.handleClose()

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
                '/admin/getInterviewUnassignedStudents',
                { interviewId: props.id },
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
        assignStudents(students.selected, props.id);
    }

    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">Assign students</DialogTitle>
                <DialogContent>
                    {loading && (
                        <Backdrop className={classes.backdrop} open={loading} >
                            <CircularProgress color="primary" />
                        </Backdrop>
                    )}
                    {open && (
                        <SnackBar open={open} message={message} severity={severity} setOpen={setOpen} />
                    )}
                    
                    <StudentTable minimal={true} history={props.history} data={data} remoteData={remoteData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleAssign} color="primary" variant="contained">
                        Assign
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AssignStudents;