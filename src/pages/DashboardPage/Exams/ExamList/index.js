import React from 'react';
import ExamTable from '../../../../components/tables/ExamTable';
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
export default function ExamList(props) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.btnContainer}>
                <Button
                    className={classes.btn}
                    disableElevation
                    onClick={() => props.history.push('/app/exams/add')}
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Create
                </Button>
            </div>
            <ExamTable history={props.history}/>
        </div>
    );
}
