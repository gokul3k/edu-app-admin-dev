import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Features from "./Features";
import api from '../../../api/api';
import { getCredentials } from '../../../services/authService';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function Home(props) {

  const classes = useStyles();
  const [studentCount, setStudentCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [adCount, setAdCount] = useState(0);
  const {roles} = useSelector((state) => state.userRole);

  useEffect(() => {
    getCountDetails();
  }, []);

  const getCountDetails = async () => {
    try {
      const res = await api.post(
        "/admin/getCountDetails",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCredentials()}`,
          }
        },
        { timeout: 1000 }
      );
      setStudentCount(res.data.response.enrolledStudCount.Count);
      setExamCount(res.data.response.upcomingExamCount.Count);
      setAdCount(res.data.response.adsCount.Count);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <p className={styles.welcome}>Welcome,admin!</p>
        <Grid container justify="space-around" spacing={2} alignItems="center">
          <Grid item>
            <Paper className={styles.paper} elevation={0}>
              <p className={styles.paperTitle}>Total Students</p>
              <p className={styles.paperContent}>{studentCount}</p>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={styles.paper} elevation={0}>
              <p className={styles.paperTitle}>Total Exams</p>
              <p className={styles.paperContent}>{examCount}</p>
            </Paper>
          </Grid>
          {roles.ENROLLMENTS&&roles.ENROLLMENTS.ADVERTISEMENTS&&(<Grid item>
            <Paper className={styles.paper} elevation={0} >
              <p className={styles.paperTitle}>Ads Published</p>
              <p className={styles.paperContent}>{adCount}</p>
            </Paper>
          </Grid>)}
        </Grid>
      </div>
      <Features history={props.history} />
    </div>
  );
}
