import { Breadcrumbs, Container,Link,Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation, withRouter } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { resetPublishExam } from "../../../actions/examActions";
import AddExam from './AddExam';
import ExamDetails from "./ExamDetails";
import ExamList from "./ExamList";
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

function Exams(props) {
  const classes = useStyles();
  const [clickedUserm, setClickedUser] = useState();
  const location = useLocation();
  const dispatch = useDispatch([]);

  useEffect(() => {
    dispatch(resetPublishExam())
    return () => {
    }
  }, [])

  return (
    <Container className={classes.root}>
      {ActiveLastBreadcrumb(false,location)}
      <div>
          
      </div>
      <Switch>
        <Route exact path="/app/exams" component={ExamList} />
        <Route exact path="/app/exams/add" component={AddExam} />
        <Route path="/app/exams/details/:id" component={ExamDetails} />
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

export default withRouter(Exams)