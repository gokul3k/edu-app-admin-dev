import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Button,
  Grid,
  TextField,
  Icon,
  Backdrop,
  CircularProgress,
  Snackbar,
  Paper,
  useEventCallback,
} from "@material-ui/core";
import { useFormik } from "formik";
import api from "../../../../api/api";
import MuiAlert from "@material-ui/lab/Alert";
import { getCredentials } from "../../../../services/authService";
import { resetSelectedStudents } from "../../../../actions/studentActions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  form: {},
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function StudentMail(props) {
  const selectedStudents = useSelector((state) => state.selectedStudents);
  const { selected } = selectedStudents;
  const dispatch = useDispatch();

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  useEffect(() => {
    if (selected.length === 0) props.history.goBack()

    selected.map((item) => {
      setEmails((emails) => emails.concat(item.Email));
    });
    return () => { };
  }, []);

  const handleDelete = (email) => {
    console.log(email)
    setEmails((chips) => chips.filter((chip) => chip !== email));
    if (emails.length === 0) props.history.goBack()
  };
  const sendEmail = async (emails, values) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/admin/sendBulkEmail",
        { emails: emails, content: values.message, subject: values.subject },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCredentials()}`,
          },
        },
        { timeout: 1000 }
      );
      console.log("res em", res);
      setLoading(false);
      setComplete(true);
      setOpen(true);
      setTimeout(()=>{
        props.history.goBack();
      }, 1000)
    } catch (err) {
      setLoading(false);
      setComplete(false);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false)
    setComplete(false);
  };
  const formik = useFormik({
    initialValues: {
      message: "",
      subject: "",
    },
    onSubmit: (values) => {
      sendEmail(emails, values);
    },
  });
  return (
    <div className={classes.root}>
      {loading && (
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={complete ? "success" : "error"}
          >
            {complete ? "Email successfully send" : "Error"}
          </Alert>
        </Snackbar>
      )}
      <div>
        {emails.map((em) => {
          let icon;
          return (
            <li key={em}>
              <Chip
                icon={icon}
                label={em}
                onDelete={() => handleDelete(em)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </div>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          style={{ margin: 8 }}
          label="Subject"
          variant="outlined"
          name="subject"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.subject}
          disabled={loading}
        />
        <TextField
          style={{ margin: 8 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          name="message"
          label="Message"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          disabled={loading}
        />
        <Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || emails.length < 1}
          >
            send
          </Button>
        </Grid>
      </form>
    </div>
  );
}
