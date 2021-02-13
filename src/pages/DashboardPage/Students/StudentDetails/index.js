import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getStudent } from "services/Students";
import { Avatar, Button, Divider, Grid, Typography } from "@material-ui/core";
import SimpleLoading from "components/loading/SimpleLoading";
import useStyles from "./styles";
import MyDocument from 'components/Resume'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import api from 'api/api';
import { getCredentials } from 'services/authService';
import StudentMarkList from './StudentMarkList';
import { Switch,Route,} from "react-router-dom";
import Details from "./Details";
function StudentDetails(props) {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Entered");
    getStudentDetails(props.match.params.id);
  }, []);

  const getStudentDetails = async (studentId) => {
    try {
      setLoading(true);
      const response = await api.post("/admin/getStudentDetails", { studentId }, {
        headers: {
          Authorization: `Bearer ${getCredentials()}`,
          "Content-Type": "application/json",
        },
      },
        { timeout: 1000 }
      );

      console.log("STUD DETAILD ", response.data.response);
      setData(response.data.response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (!loading) {
    return (
      <div className={classes.root}>
          
     
        <Switch>
          <Route  path="/app/students/details/:id/marklist" component={StudentMarkList} />
          <Route path="/app/students/details/:id" component={Details} />
        </Switch>

      </div>
    );
  } else return <SimpleLoading />;
}

export default StudentDetails;
