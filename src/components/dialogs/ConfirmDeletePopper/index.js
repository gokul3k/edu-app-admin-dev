import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    padding: 16,
  },
  button:{
      textTransform:"none",
  }
}));

export default function ConfirmDeletePopper({
  handleClick,
  handleClose,
  anchorEl,
  setAnchorEl,
  onDelete,
  item,
}) {
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div className={classes.root}>
          <Typography className={classes.typography}>Confirm delete</Typography>
          <Grid
            direction="row"
            alignItems="center"
            justify="space-between"
            container
          >
            <Button
              className={classes.button}
              size="small"
              onClick={handleClose}
            >
              {" "}
              cancel
            </Button>
            <Button
              size="small"
              className={classes.button}
              onClick={() => {
                onDelete(item);
                handleClose();
              }}
              color="secondary"
            >
              Delete
            </Button>
          </Grid>
        </div>
      </Popover>
    </div>
  );
}
