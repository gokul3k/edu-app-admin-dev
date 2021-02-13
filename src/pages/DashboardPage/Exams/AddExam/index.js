import React, { useEffect, useState } from "react";
import {
  Paper,
  Step,
  StepContent,
  StepLabel,
  Grid,
  Stepper,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import One from "./One";
import Three from "./Three";
import Two from "./Two";
import { useDispatch, useSelector } from "react-redux";
import { resetPublishExam, createExam } from "../../../../actions/examActions";
import StudentTable from "../../../../components/tables/StudentTable";
import api from "../../../../api/api";
import { getCredentials } from '../../../../services/authService';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
  grid: {
    marginTop: 16,
    marginBottom: 32,
  },
  resetContainer: {
    marginTop: 16,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.light[100],
    backgroundColor: '#fff'
  },
  button: {
    marginLeft: 24
  }
}));

export default function AddExam(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const publishExam = useSelector((state) => state.publishExam);
  const students = useSelector((state) => state.selectedStudents);
  const { loading, details, instructions, questions, complete, counts } = publishExam;
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    dispatch(resetPublishExam());
    remoteData();
    return () => { };
  }, []);

  const remoteData = async () => {
    try {
      const res = await api.post(
        '/admin/getStudents',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCredentials()}`,
          },
        },
        { timeout: 1000 }
      );

      setData(res.data.response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (complete) props.history.replace("/app/exams")
    return () => { };
  }, [complete]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePublish = () => {
    dispatch(createExam(details, instructions, questions, students.selected, counts,checked?"yes":"no"))
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.root}>
      {loading && (<Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>)}
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={1}>
          <StepLabel>Exam details</StepLabel>
          <StepContent>
            <One handleNext={handleNext} />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Instructions</StepLabel>
          <StepContent>
            <Two handleBack={handleBack} handleNext={handleNext} />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Questions</StepLabel>
          <StepContent>
            <Three handleBack={handleBack} handleNext={handleNext} />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Assign Students</StepLabel>
          <StepContent>
            <StudentTable history={props.history} data={data} remoteData={remoteData} />
            <Grid container direction="row" style={{ marginTop: 24 }}>
              <Button
                style={{ marginLeft: 24 }}
                variant="contained"
                color="secodary"
                disableElevation
                onClick={handleBack}
              >Back</Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleNext}
              >Next</Button>
            </Grid>
          </StepContent>
        </Step>
        {activeStep === 4 && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography style={{ marginBottom: "8px" }}>All steps completed</Typography>
            {/* <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                    labelPlacement="start"
                  />
                }
                label="Practise test"
              />
            </FormGroup> */}
            <Button onClick={handleBack} className={classes.button}>
              previous
            </Button>
            <Button
              onClick={handlePublish}
              className={classes.button}
              color="primary"
              variant="contained"
              disabled={!details && !instructions && !questions}
            >
              Publish Exam
            </Button>
          </Paper>
        )}
      </Stepper>
    </div>
  );
}
