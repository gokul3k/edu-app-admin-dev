import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {ListItemText,ListItem,List,Divider,} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  TextField,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  Slide,
  Grid,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    padding: 64,
  },
  formControl: {
    minWidth: 120,
  },
  add:{
    backgroundColor: "white",
    color: theme.palette.primary.main
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuestionDialog({
  open,
  setOpen,
  question,
  setQuestion,
  addData,
  index,
}) {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setQuestion({});
    formik.resetForm({});
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      no: question.no,
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      type: question.type,
      mark: question.mark,
      neg: question.neg,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2))
      console.log(values);
      addData({ ...values, no: question.no }, index);
      formik.resetForm({});
      handleClose();
    },
  });
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={formik.handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Question
              </Typography>
              <Button autoFocus disableElevation className={classes.add} type="submit">
                Add
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.container}>
            <TextField
              label="Enter question"
              name="question"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              required
              onChange={formik.handleChange}
              value={formik.values.question}
            />
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ marginTop: "16px" }}
            >
              <TextField
                label="mark"
                name="mark"
                variant="outlined"
                type="number"
                required
                onChange={formik.handleChange}
                value={formik.values.mark}
                helperText="Enter Only Numeric Values"
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  label="Type"
                  required
                  alignItems="center"
                >
                  <MenuItem value={"aptitude"}>aptitude</MenuItem>
                  <MenuItem value={"communication"}>communication</MenuItem>
                  <MenuItem value={"logical"}>logical</MenuItem>
                  <MenuItem value={"technical"}>technical</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Negative Score"
                name="neg"
                variant="outlined"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.neg}
                helperText="Enter Only Negative Marks If Applicable. -ve Sign Does Not Matter."
              />
            </Grid>
            <Grid
              container
              direction="column"
              justify="center"
              style={{ marginTop: "16px" }}
              alignItems="stretch"
            >
              <TextField
                label="Option A"
                name="option1"
                fullWidth
                variant="outlined"
                style={{ marginTop: "16px" }}
                required
                onChange={formik.handleChange}
                value={formik.values.option1}
              />
              <TextField
                label="Option B"
                name="option2"
                fullWidth
                variant="outlined"
                style={{ marginTop: "16px" }}
                required
                onChange={formik.handleChange}
                value={formik.values.option2}
              />
              <TextField
                label="Option C"
                name="option3"
                fullWidth
                variant="outlined"
                style={{ marginTop: "16px" }}
                onChange={formik.handleChange}
                value={formik.values.option3}
              />
              <TextField
                label="Option D"
                name="option4"
                fullWidth
                variant="outlined"
                style={{ marginTop: "16px" }}
                onChange={formik.handleChange}
                value={formik.values.option4}
              />
              {/* <TextField
              label="Option 5"
              name="option5"
              fullWidth
              variant="outlined"
              style={{marginTop:"16px"}}
              onChange={formik.handleChange}
              value={formik.values.option5}
            /> */}
              <Grid>
              <FormControl className={classes.formControl} variant="outlined" style={{marginTop:"16px"}} >
                <InputLabel id="answer">Answer</InputLabel>
                <Select
                  labelId="answer"
                  id="answer"
                  name="answer"
                  label="Answer"
                  required
                  alignItems="center"
                  value={formik.values.answer}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={"a"}>A</MenuItem>
                  <MenuItem value={"b"}>B</MenuItem>
                 {formik.values.option3 &&(
                  <MenuItem value={"c"}>C</MenuItem>
                 )}
                 {formik.values.option4 &&(
                  <MenuItem value={"d"}>D</MenuItem>
                 )}
                </Select>
              </FormControl>
              </Grid>
            </Grid>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
