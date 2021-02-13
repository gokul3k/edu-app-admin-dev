import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { NoEncryption } from "@material-ui/icons";
import { Switch, Route, Redirect, withRouter, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid,Link } from "@material-ui/core";
import AdListing from './AdListing/index';
import TextAd from './TextAd';
import PhotoAd from "./PhotoAd";
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 24,
        backgroundColor: "white",
    },
    link: {
        color: theme.palette.grey[800],
        fontSize:14,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
          textDecoration: "none",
          color: theme.palette.primary,
        },
      },
    heading: {
        fontWeight: 600
    }
}));

function AdManager() {
    const classes = useStyles();
    const location = useLocation();
    return (
        <Container className={classes.root}>
               

            <Grid
                container
                direction="row"
                justify="flex-start"
            >
                <Typography variant="h6" className={classes.heading}>
                    Advertisement Board
                </Typography>
            </Grid>
            {ActiveLastBreadcrumb(false,location)}

            <Switch>
                <Route exact path="/app/ad" component={AdListing} />
                <Route exact path="/app/ad/textad" component={TextAd} />
                <Route exact path="/app/ad/photoad" component={PhotoAd}/>
            </Switch>
        </Container>
    )
}
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
const mapp ={
    "ad":"Advertisement",
    "textad": "Text Ad",
}

function ActiveLastBreadcrumb(exam,location) {
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
       {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                  if(value==='app') return
                  return last ? (
                    <Typography style={{textTransform:"capitalize"}} color="textPrimary" key={to}>
                      {mapp[value]}
                    </Typography>
                  ) : (
                    <LinkRouter style={{textTransform:"capitalize"}} color="inherit" to={to} key={to}>
                      {mapp[value]}
                    </LinkRouter>
                  );
                })}
    </Breadcrumbs>
  )
}

export default withRouter(AdManager);
