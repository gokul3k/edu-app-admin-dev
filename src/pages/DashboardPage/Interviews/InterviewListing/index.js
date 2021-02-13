import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InterviewTable from '../../../../components/tables/InterviewTable';

const useStyles = makeStyles((theme) => ({
    btn: {},
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
}));

export default function InterviewListing(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <div className={classes.btnContainer}>
                <Button
                    className={classes.btn}
                    disableElevation
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    variant='outlined'
                    color='primary'
                    size='small'
                >
                    Actions
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        props.history.push('/app/interviews/add');
                    }}>Create Interview</MenuItem>
                </Menu>
            </div>
            <InterviewTable history={props.history} />
        </div>
    );
}