import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { resetPassword, signin } from "../../actions/userActions";
import SimpleAlert from "../../components/alerts/SimpleAlert";
import AdornedButton from "../../components/buttons/AdornedButton";
import PasswordResetDialog from "../../components/dialogs/PasswordResetDialog"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
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
  },
  root: {
    backgroundImage: "url(/assets/images/tab_bg.jpg)",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "#1a73e8",
    backgroundBlendMode:"color-burn",
    height:"100vh",
    width:"100%",
    overflow:"hidden"
  },
  paperContainer:{
    maxWidth:350,
    maxHeight:450,
    padding:36,
  }
}));

function SignIn({history}) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, signed } = userSignin;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const resetPasswordOnSubmit = (email, setDone, setError) => {
    dispatch(resetPassword(email, setDone, setError));
  };

  useEffect(() => {
    if (error) {
      setAlert(true);
    } 
  }, [loading]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setError(null);
      // console.log(isLoggedIn===false,isLoggedIn);
      setAlert(false)
      dispatch(signin(values.username, values.password, history, setError));
    },
  });

  const showAlert = () => {
    if (alert) return <SimpleAlert severity="error" msg={error} />;
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paperContainer} elevation={0}>
        {openDialog && (
          <PasswordResetDialog
            resetPasswordOnSubmit={resetPasswordOnSubmit}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={openDialog}
          />
        )}

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          {showAlert()}
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              id="username"
              disabled={loading}
              label="Username"
              name="username"
              autoComplete="email"
              error={!!formik.errors.username && formik.touched.username}
              helperText={
                formik.touched.username && !!formik.errors.username
                  ? !!formik.errors.username
                  : ""
              }
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              disabled={loading}
              label="Password"
              type="password"
              error={formik.touched.password && !!formik.errors.password}
              helperText={
                formik.touched.password && !!formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              onChange={formik.handleChange}
              id="password"
              value={formik.values.password}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
              Sign In
            </AdornedButton>
            <Grid container>
              <Grid item xs>
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => setOpenDialog(true)}
                >
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={8}>
          <Copyright />
        </Box> */}
      </Paper>
    </div>
  );
}

export default SignIn;
