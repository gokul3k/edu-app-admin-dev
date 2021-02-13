import React, { useState, useEffect } from 'react';
import { Card, CardContent, makeStyles, Grid, Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCredentials } from '../../../../services/authService';
import api from '../../../../api/api';
import StudentTable from '../../../../components/tables/StudentTable';

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

const UserItemDetails = (props) => {

    const classes = useStyles();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const { selected } = useSelector((state) => state.selectedStudents);

    useEffect(() => {
        getUserData(props.match.params.id);
        remoteData(props.match.params.id);
    }, []);

    const getUserData = async (userId) => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/getAdminUserDetail",
                { userId }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }
            );

            setUser(res.data.response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const assignStudents = async () => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/assignStudentsToAdmin",
                { students: selected, adminId: props.match.params.id }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }
            );
            remoteData(props.match.params.id);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const remoteData = async (userId) => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/getUnassignedStudents",
                { userId }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
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

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="primary" />
            </Backdrop>
        )
    }

    return (
        <>
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                        >
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                onClick={assignStudents}
                            >Assign Students</Button>

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
                                <p className={classes.heading}>ID  : <span className={classes.value}>{user.id}</span></p>
                                <p className={classes.heading}>Name  : <span className={classes.value}>{user.Name}</span></p>
                                <p className={classes.heading}>Username  : <span className={classes.value}>{user.Username}</span></p>
                            </Grid>
                            <Grid
                                item
                                direction="column"
                            >
                                <p className={classes.heading}>Email  : <span className={classes.value}>{user.Email}</span></p>
                                <p className={classes.heading}>Role  : <span className={classes.value}>{user.Role}</span></p>
                                <p className={classes.heading}>Status  : <span className={classes.value}>{user.Status}</span></p>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
            <StudentTable history={props.history} data={data} remoteData={remoteData} />
        </>
    )
}

export default UserItemDetails;
