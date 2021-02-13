import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useFormik } from "formik";
import Alert from '@material-ui/lab/Alert';
import AdornedButton from "../../components/buttons/AdornedButton";

import * as yup from "yup";

import {updatePassword} from '../../services/authService'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height:"32px"
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">
        BestEnlist portal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function ResetPassword(props) {
  const [loading, setLoading] = useState(false);
  const [st, setSt] = useState(0);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      pass: "",
      pass2: "",
    },
    validationSchema: yup.object({
        pass: yup
        .string()
        .required("Password must contain at least 8 characters, one uppercase, one number and one special case character")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      pass2: yup
        .string()
        .required("This feild is required")
        .oneOf([yup.ref("pass"), null], "Password mismatch"),
    }),
    onSubmit: (values) => {
        setLoading(true);
        setSt(0)
        updatePassword(props.match.params.token,values.pass).then((val)=>setSt(val))
    },
  });
useEffect(() => {

    console.log(props.match.params.token);
    if(st===200)
        props.history.replace("/")
    if(st>0){
    setLoading(false)
    formik.values.pass=""
    formik.values.pass2=""
}

}, [st])
  const goToSignup = () => {
    props.history.push("/signup");
  };
  const goToLogin = () => {
    props.history.push("/signin");
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <SimpleHeader goToLogin={goToLogin} goToSignup={goToSignup} loc="pr" /> */}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password reset
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
              {(st!==0&&st!==200)&&(<Alert severity="error">Password reset failed</Alert>)}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.pass}
            name="pass"
            label="Password"
            type={passwordShown ? "text" : "password"}
            helperText={formik.errors.pass}
            id="password"
            error={formik.touched.pass && formik.errors.pass }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisiblity}
                  >
                    {passwordShown ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type={passwordShown ? "text" : "password"}
            fullWidth
            error={formik.touched.pass2 && formik.errors.pass2 }
            onChange={formik.handleChange}
            value={formik.values.pass2}
            helperText={formik.errors.pass2}
            id="pass2"
            label="Confirm pasword"
            name="pass2"
          />
       <AdornedButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              color={loading ? "secondary" : "primary"}
              // disabled={loading}
              loading={loading}
              className={classes.submit}
            >
              Reset
            </AdornedButton>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
