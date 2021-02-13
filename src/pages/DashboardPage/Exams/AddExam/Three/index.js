import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  Divider,
} from "@material-ui/core";
import ExcelReader from "../../../../../components/buttons/ExcelReader";
import Add from "@material-ui/icons/Add";
import QuestionDialog from "../../../../../components/dialogs/QuestionDialog";
import QuestionListItem from "../../../../../components/list/QuestionListItem";
import { useDispatch, useSelector } from "react-redux";
import { getExamQuestions } from "../../../../../actions/examActions";
import index from "../../ExamDetails";
import { useFormik } from "formik";
import { set } from "js-cookie";

const useStyles = makeStyles({
  root: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 24,
  },
  input: {
    display: "none",
  },
  insert: {
    textTransform: "none",
    marginLeft: 32,
  },
  paper: {
    padding: 8,
    maxHeight: 600,
    overflowY: "auto",
    scrollbarWidth: "thin",
  },
});
export default function Three({ handleNext, handleBack }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const publishExam = useSelector((state) => state.publishExam);
  const { questions } = publishExam;
  const [ac, setAc] = useState(0)
  const [lc, setLc] = useState(0)
  const [cc, setCc] = useState(0)
  const [tc, setTc] = useState(0)
  const dispatch = useDispatch([]);
  useEffect(() => {
    setData(questions);
  }, []);
  useEffect(() => {
    dispatch(getExamQuestions(data));
  }, [data]);
  useEffect(() => {
    var a = 0
    var l = 0
    var t = 0
    var c = 0
    questions.map((item, index) => {
      if (item.type === 'aptitude') {
        a++
      }
      if (item.type === 'logical')
        l++
      if (item.type === 'technical')
        t++
      if (item.type === 'communication')
        c++
    })
    setAc(a)
    setLc(l)
    setTc(t)
    setCc(c)
  }, [questions])
  const addData = (values) => {
    let index = -1;
    try {
      data.map((val, i) => {
        if (val.no == values.no) index = i;
      });
      if (index === -1) {
        setData((data) => data.concat(values));
      } else {
        let items = [...data];
        items[index] = values;
        setData(items);
      }
    } catch (error) { }
  };
  const onEdit = (item) => {
    setQuestion(item);
    setOpen(true);
  };
  const onDelete = (item) => {
    var index = data.findIndex((x) => x.no == item.no);
    setData((data) => data.filter((item, j) => index !== j));
  };
  const formik = useFormik({
    initialValues: {
      lc: 0,
      cc: 0,
      tc: 0,
      ac: 0
    },

    onSubmit: (values) => {
      dispatch(getExamQuestions(data, values));
      handleNext();
    },
  });
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="body2">
        Upload or manually enter questions here.
      </Typography>
      <Grid
        direction="row"
        container
        spacing={2}
        alignItems="center"
        style={{ margin: "16px" }}
      >
        <ExcelReader setData={setData} />
        <Typography variant="subtitle1" style={{ marginLeft: "32px" }}>
          - or -
        </Typography>
        <Button
          className={classes.insert}
          size="small"
          variant="outlined"
          onClick={() => {
            setQuestion({ no: data.length + 1 });
            setOpen(true);
          }}
        >
          <Add />
          Insert Question
        </Button>
      </Grid>
      <Paper className={classes.paper}>
        {open && question.no && (
          <QuestionDialog
            open={open}
            setOpen={setOpen}
            question={question}
            setQuestion={setQuestion}
            addData={addData}
            index={question.no - 1}
          />
        )}
        {data.length === 0 && (
          <Typography variant="subtitle2" style={{ textAlign: "center" }}>
            No Questions added
          </Typography>
        )}
        {data.map((item, index) => (
          <QuestionListItem
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
            edit={true}
          />
        ))}
      </Paper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justify="space-between" style={{ marginTop: 32 }}>
          <TextField
            id="ac"
            name="ac"
            label="Aptitude Qtns"
            variant="outlined"
            type="number"
            style={{ flex: ".2", marginRight: "16px" }}
            required
            value={formik.values.ac}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{ inputProps: { min: 0, max: ac } }}
          />
          <TextField
            id="lc"
            name="lc"
            label="Logical Qtns"
            variant="outlined"
            type="number"
            style={{ flex: ".2", marginRight: "16px" }}
            required
            value={formik.values.lc}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{ inputProps: { min: 0, max: lc } }}
          />
          <TextField
            id="cc"
            name="cc"
            label="Comm Qtns"
            variant="outlined"
            type="number"
            style={{ flex: ".2", marginRight: "16px" }}
            required
            value={formik.values.cc}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{ inputProps: { min: 0, max: cc } }}
          />
          <TextField
            id="tc"
            name="tc"
            label="Tech Qtns"
            variant="outlined"
            type="number"
            style={{ flex: ".2", marginRight: "16px" }}
            required
            value={formik.values.tc}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{ inputProps: { min: 0, max: tc } }}
          />
        </Grid>
        <Typography variant="subtitle1">*Cannot leave all question type count as 0</Typography>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secodary"
            disableElevation
            style={{ marginRight: "16px" }}
            onClick={handleBack}
          >
            Previous
        </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={data.length === 0 || (formik.values.ac === 0 && formik.values.lc === 0 && formik.values.cc === 0 && formik.values.tc === 0)}
          // onClick={() => {

          // }}
          >
            Next
        </Button>
        </div>
      </form>
    </div>
  );
}
