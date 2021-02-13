import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { string } from "yup";
import { useSelector, useDispatch } from "react-redux";
import { passwordResetComplete } from "../../../actions/userActions";
import SimpleAlert from '../../alerts/SimpleAlert';

export default function PasswordResetDialog({
  handleClickOpen,
  open,
  handleClose,
  resetPasswordOnSubmit,
}) {
  const userSignin = useSelector((state) => state.userSignin);
  const { ploading  } = userSignin;
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const onClickOk = () => {
    resetPasswordOnSubmit(email,setDone,setError);
    // handleClose()
  };
  const onClickClose = () => {
    handleClose();
    dispatch(passwordResetComplete());
  };

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    setEmail(value);
    setValid(string().required().email().isValidSync(value));
  };

  const renderAlert = () => {
    if(!!error &&!ploading)
      return <SimpleAlert severity="error" msg={error} />
  };
  const renderMsg = () => {
    if (done)
      return "A password reset link has been sent to your email address";
    else if (!!error &&! ploading) return "network error";
    else return "We will send a password reset link to your email address.";
  };
  const renderButtons = () => {
    if (done)
      return (
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleClose}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      );
    else
      return (
        <DialogActions>
          <Button size="small" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            disableElevation
            disabled={!valid}
            onClick={onClickOk}
            color="primary"
          >
            Reset password
          </Button>
        </DialogActions>
      );
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
          {renderAlert()}
        <DialogContent>
          <DialogContentText>{renderMsg()}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="name"
            fullWidth
            disabled={done}
            error={!valid && email.length > 3}
            value={email}
            onChange={handleChange}
          />
        </DialogContent>
        {renderButtons()}
      </Dialog>
    </div>
  );
}
