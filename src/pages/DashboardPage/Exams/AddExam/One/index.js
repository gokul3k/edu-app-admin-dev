import React, { useEffect } from "react";
import { useFormik } from "formik";
import MaterialTable from "material-table";
import * as Yup from 'yup';
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";

import Grid from '@material-ui/core/Grid';
import { getExamDetails } from "../../../../../actions/examActions";

import moment from 'moment'

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
  }
}));

export default function One({ handleNext }) {
  const publishExam = useSelector((state) => state.publishExam);
  const { details } = publishExam;
  const dispatch = useDispatch();

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      title: !!details ? details.title : "",
      startDate: !!details ? details.startDate : null,
      endDate: !!details ? details.endDate : null,
      startTime: !!details ? details.startTime : null,
      endTime: !!details ? details.endTime : null,
      duration: !!details ? details.duration : 40,
      difficulty:"medium",
      examtype:"free"
    },

    onSubmit: (values) => {
      console.log(publishExam);
      dispatch(getExamDetails(values))
      handleNext()
    },
  });

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify="space-between" className={classes.grid} >
          <TextField
            id="title"
            name="title"
            label="Name"
            multiline
            style={{ flex: ".5", marginRight: "12px" }}
            rowsMax={4}
            required
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <TextField
            id="title"
            name="duration"
            label="Duration"
            type="number"
            style={{ flex: ".2", marginRight: "12px" }}
            required
            value={formik.values.duration}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
  
        <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="examtype">Exam Type</InputLabel>
                <Select
                  labelId="examtype"
                  id="examtype"
                  name="examtype"
                  value={formik.values.examtype}
                  onChange={formik.handleChange}
                  fullWidth
                  style={{ flex: ".3", marginRight: "12px" }}

                  label="Exam type"
                  required
                  alignItems="center"
                >
                  <MenuItem value={"free"}>Free</MenuItem>
                  <MenuItem value={"paid"}>Paid(NA)</MenuItem>

                </Select>
              </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="difficulty">Difficulty</InputLabel>
                <Select
                  labelId="difficulty"
                  id="difficulty"
                  name="difficulty"
                  value={formik.values.difficulty}
                  onChange={formik.handleChange}
                  label="Difficulty"
                  required
                  alignItems="center"
                >
                  <MenuItem value={"easy"}>easy</MenuItem>
                  <MenuItem value={"medium"}>medium</MenuItem>
                  <MenuItem value={"hard"}>hard</MenuItem>
                </Select>
              </FormControl>
        </Grid>
        <Grid container justify="space-between" className={classes.grid}>
          <TextField
            margin="normal"
            label="Start date"
            required
            name="startDate"
            type="date"
            format="MM/dd/yyyy"
            value={formik.values.startDate}
            onChange={(event) => {
              console.log('event', event.target.value);
              formik.setFieldValue('startDate', event.target.value);
            }}
            InputLabelProps={{ shrink: true,}}
            InputProps={{inputProps: { min:moment().format('YYYY-MM-DD')} }}
          />
          <TextField
            margin="normal"
            label="Start time"
            name="startTime"
            type="time"
            required
            value={formik.values.startTime}
            onChange={(event) => {
              console.log('event', event.target.value);
              formik.setFieldValue('startTime', event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            label="End date"
            name="endDate"
            type="date"
            format="MM/dd/yyyy"
            value={formik.values.endDate}
            onChange={(event) => {
              console.log('event', event.target.value);
              formik.setFieldValue('endDate', event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
            InputProps={{inputProps: { min:moment().format('YYYY-MM-DD')} }}

          />
          <TextField
            margin="normal"
            label="End time"
            name="endTime"
            type="time"
            value={formik.values.endTime}
            onChange={(event) => {
              console.log('event', event.target.value);
              formik.setFieldValue('endTime', event.target.value);
            }}
            InputLabelProps={{ shrink: true }}
          />

        </Grid>
        <Button type="submit" variant="contained" color="primary" disableElevation>Next</Button>
      </form>
    </div>
  );
}
