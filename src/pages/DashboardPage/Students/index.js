import React, { useState, useEffect } from "react";
import {Container,Typography,Link} from "@material-ui/core";
import { emphasize, makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { Switch, Route, Redirect, withRouter,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import StudentMail from "./StudentMail";
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 24,
    backgroundColor:"white",
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
}));

function Students(props) {
  const classes = useStyles();
  const [clickedUserm, setClickedUser] = useState();
  const location = useLocation();
  const dispatch = useDispatch([]);


  return (
    <Container className={classes.root}>
      {ActiveLastBreadcrumb(false,location)}
      <div>
          
      </div>
      <Switch>
        <Route exact path="/app/students" component={StudentList} />
        <Route exact path="/app/students/mail" component={StudentMail} />
        <Route path="/app/students/details/:id" component={StudentDetails} />
      </Switch>
    </Container>
  );
}
const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
function ActiveLastBreadcrumb(exam,location) {
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
       {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                if(value==='app'||value==='details') return
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

export default withRouter(Students)