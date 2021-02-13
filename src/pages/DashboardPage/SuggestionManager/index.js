import React from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter, useLocation } from "react-router-dom";
import { Typography, Grid,Link,Breadcrumbs } from "@material-ui/core";
import SuggestionForm from '../../../components/SuggestionForm';
import SuggestionTable from '../../../components/tables/SuggestionTable';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 24,
        backgroundColor: "white",
    },
    heading: {
        fontWeight: 600
    }
}));

function SuggestionManager() {

    const classes = useStyles();
    const location = useLocation();
    return (
        <Container className={classes.root}>
             {ActiveLastBreadcrumb(false,location)}
            <Grid
                container
                direction="row"
                justify="flex-start"
            >
                <Typography variant="h6" className={classes.heading}>
                    Career Assessment Settings
                </Typography>
            </Grid>
            <Switch>
                <Route exact path="/app/suggestion/list" component={SuggestionTable} />
                <Route path="/app/suggestion" component={SuggestionForm} />
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
                  if(value==='app'||value=='detail') return
                  return last ? (
                    <Typography style={{textTransform:"capitalize"}} color="textPrimary" key={to}>
                      {value}
                    </Typography>
                  ) : (
                    <LinkRouter style={{textTransform:"capitalize"}} color="inherit" to={to} key={to}>
                      {value}
                    </LinkRouter>
                  );
                })}
    </Breadcrumbs>
  )
}
export default withRouter(SuggestionManager);