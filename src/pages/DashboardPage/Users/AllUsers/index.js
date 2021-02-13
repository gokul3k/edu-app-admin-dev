import React from 'react';
import UserTable from '../../../../components/tables/UserTable';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    btn: {},
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
}));
export default function AllUsers(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.btnContainer}>
                <Button
                    className={classes.btn}
                    disableElevation
                    onClick={() => props.history.push('/app/users/add')}
                    variant='contained'
                    color='primary'
                >
                    Add User
                </Button>
            </div>
            <UserTable history={props.history}/>
        </div>
    );
}
