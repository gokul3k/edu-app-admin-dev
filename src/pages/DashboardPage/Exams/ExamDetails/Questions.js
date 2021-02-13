import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid, Button, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import QuestionListItem from "../../../../components/list/QuestionListItem";
import QuestionDialog from "../../../../components/dialogs/QuestionDialog";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: 16,
    marginBottom: 32,
    padding: 4,
    maxHeight:600,
    overflowY:"auto",
    overflowX:"hidden",
    scrollbarWidth:"thin"
  },
}));

export default function Questions({ questions }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState({});

  return (
    <div>
      <Paper className={classes.grid}>
        <Typography gutterBottom variant="body2">
         Total Questions : {questions.length}
      </Typography>
        {open && question.id && (
          <QuestionDialog
            open={open}
            setOpen={setOpen}
            question={question}
            setQuestion={setQuestion}
            // addData={addData}
            index={question.no - 1}
          />
        )}
        {questions.map((item, index) => (
          <QuestionListItem
            item={Object.keys(item).reduce((c, k) => (c[k.toLowerCase()] = item[k], c), {})}
            // onEdit={onEdit}
            // onDelete={onDelete}
            index={index}
            edit={false}
          />
        ))}
      </Paper>
    </div>
  )
}
