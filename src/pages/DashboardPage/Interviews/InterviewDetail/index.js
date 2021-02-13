import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, withRouter, useLocation } from "react-router-dom";
import {
  makeStyles
} from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCredentials } from '../../../../services/authService';
import api from '../../../../api/api';
import InterviewDetailComponent from '../../../../components/InterviewDetailComponent';
import InterviewStudentTable from '../../../../components/tables/InterviewStudentTable';
import InterviewStudentSelection from '../../../../components/InterviewStudentSelection';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function InterviewDetail(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    remoteData(props.match.params.id);
    setInterviewId(props.match.params.id);
  }, []);

  const remoteData = async (interviewId) => {
    try {
      setLoading(true);
      const response = await api.post("/admin/getInterviewStudents", { interviewId }, {
        headers: {
          Authorization: `Bearer ${getCredentials()}`,
          "Content-Type": "application/json",
        },
      },
        { timeout: 1000 }
      );
      setData(response.data.response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  if (loading) {
    return null;
  }
  return (
    <div>
      {loading && (
        <Backdrop className={classes.backdrop} open={loading} >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <InterviewDetailComponent interviewId={props.match.params.id} />
      <InterviewStudentTable history={props.history} data={data} remoteData={remoteData} interviewId={props.match.params.id} />
    </div>
  );
}

export default InterviewDetail;