import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AdTable from '../../../../components/tables/AdTable';

const useStyles = makeStyles((theme) => ({
    btn: {},
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
}));

export default function AdListing(props) {
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
                    variant='contained'
                    color='primary'
                    size='small'
                >
                    Upload
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
                        props.history.push('/app/ad/photoad');
                    }}>Photo Ad</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        props.history.push('/app/ad/textad');
                    }}>Text Ad</MenuItem>
                </Menu>
            </div>
            <AdTable />
        </div>
    );
}