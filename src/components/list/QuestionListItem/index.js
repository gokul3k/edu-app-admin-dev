import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Chip,
  Divider,
} from "@material-ui/core";
import ConfirmDeletePopper from "../../dialogs/ConfirmDeletePopper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  option: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  span: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "300px",
  },
  ansPaper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: "300px",
    color:"white",
    backgroundColor:"#1a73e8",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  optionLabel: {
    color: "white",
    backgroundColor: "grey",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  ansLabel: {
    backgroundColor:"#1a73e8",
    color: "white",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
}));
export default function QuestionListItem({ item, onEdit, onDelete,edit,index }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root} key={index}>
      <div className={classes.header}>
        <Typography>{index+1 + "." + item.question}</Typography>
        {edit&&(<div className={classes.buttonContainer}>
          <IconButton
            area-label="edit"
            color="primary"
            size="small"
            className={classes.edit}
            onClick={() => onEdit(item)}
          >
            <EditIcon />
          </IconButton>
          <ConfirmDeletePopper
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            onDelete={onDelete}
            item={item}
          />
          <IconButton
            area-label="delete"
            color="secondary"
            size="small"
            className={classes.delete}
            onClick={handleClick}
          >
            <DeleteIcon />
          </IconButton>
        </div>)}
      </div>
      <Grid justify="space-between" container>
        <span className={classes.span}>
          <Chip
            label="Basic"
            label={item.type}
            size="small"
            clickable
            variant="outlined"
            color="primary"
          />
        </span>

        <span className={classes.span}>
          {" "}
          <Typography
            variant="body1"
            className={classes.label}
          ></Typography>{" "}
          <Typography>{item.neg}</Typography>
        </span>
        <span className={classes.span}>
          {" "}
          <Typography variant="subtitle1" className={classes.label}>
            Mark :{" "}
          </Typography>{" "}
          <Typography>{item.mark}</Typography>
        </span>

      </Grid>
      <Grid
        direction="row"
        container
        style={{ marginTop: "8px" }}
        spacing={5}
      >
        <Grid item xs>
          <Paper variant="outlined" elevation={0} className={classes.span}>
            <Typography variant="body1" className={item.answer==='a'?classes.ansLabel:classes.optionLabel}>
              a
            </Typography>{" "}
            <Typography className={classes.option}>{item.option1}</Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            variant="outlined"
            square
            elevation={0}
            className={classes.span}
          >
            <Typography variant="body1" className={item.answer==='b'?classes.ansLabel:classes.optionLabel}>
              b
            </Typography>{" "}
            <Typography className={classes.option}>{item.option2}</Typography>
          </Paper>
        </Grid>
        {item.option3 && (
          <Grid item xs>
            <Paper
              variant="outlined"
              square
              elevation={0}
              className={classes.span}
            >
              <Typography variant="body1" className={item.answer==='c'?classes.ansLabel:classes.optionLabel}>
                c
              </Typography>
              <Typography className={classes.option}>{item.option3}</Typography>
            </Paper>
          </Grid>
        )}
        {item.option4 && (
          <Grid item xs>
            <Paper
              variant="outlined"
              square
              elevation={0}
              className={classes.span}
            >
              <Typography variant="body1" className={item.answer==='d'?classes.ansLabel:classes.optionLabel}>
                d
              </Typography>
              <Typography className={classes.option}>{item.option4}</Typography>
            </Paper>
          </Grid>
        )}
        {/* {item.option5 && (
          <Grid item xs>
            <Paper
              variant="outlined"
              square
              elevation={0}
              className={classes.span}
            >
              <Typography variant="body1" className={classes.optionLabel}>
                e
              </Typography>
              <Typography className={classes.option}>
                {" "}
                {item.option5}
              </Typography>
            </Paper>
          </Grid>
        )} */}
        {/* <Grid item xs>
          <Paper className={classes.ansPaper} elevation={0}>
            <Typography className={classes.ansLabel}>ans</Typography>
            <Typography variant="body1">{item.answer}</Typography>
          </Paper>
        </Grid> */}
      </Grid>

      <Divider style={{ margin: "8px" }} />
    </div>
  );
}
