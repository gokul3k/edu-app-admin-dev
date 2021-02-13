import React, { useEffect, useState } from 'react';
import { AppBar, Box, Container, CssBaseline, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getRoles, logout } from '../../actions/userActions';
import SimpleLoading from '../../components/loading/SimpleLoading';
import HeaderProfileMenu from '../../components/widgets/HeaderProfileMenu';
import clearStorage from '../../services/clearStorage';
import Routing from './Routing';
import Sidebar from './Sidebar';
import useStyles from './styles';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' to='/app/dashboard'>
                BestEnlist admin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Dashboard(props) {
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.userRole);
    const { roles } = userRole;
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [showProgress, setShowProgress] = useState(true);
    const [status, setStatus] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    //redirect back to login page if request is unauthorised
    useEffect(() => {
        if (status === 401) dispatch(logout(props.history));
    }, [status]);

    const logoutClicked = () => {
        clearStorage();
        dispatch(logout(props.history));
    };
    // TODO
    useEffect(() => {
        dispatch(getRoles(setShowProgress, setStatus));
    }, []);
    if (showProgress) return <SimpleLoading/>;
    else
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='absolute'
                    elevation={0}
                    className={clsx(
                        classes.appBar,
                        open && classes.appBarShift
                    )}
                    // style={{backgroundColor:"#1976d2"}}
                >
                    <Toolbar className={classes.toolbar}>
                        {/* <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton> */}
                        <Typography
                            component='h1'
                            variant='h6'
                            noWrap
                            className={classes.title}
                            style={
                                open
                                    ? { marginLeft: '20px' }
                                    : { marginLeft: '70px' }
                            }
                        >
                            BestEnlist Admin
                        </Typography>
                        {/* <IconButton style={{color:"white"}}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
                        <HeaderProfileMenu logoutClicked={logoutClicked} />
                    </Toolbar>
                </AppBar>
                <Sidebar
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerOpen={handleDrawerOpen}
                    open={open}
                    roles={roles}
                />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth='xl' className={classes.container}>
                        <Routing />
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        );
}
export default withRouter(Dashboard);
