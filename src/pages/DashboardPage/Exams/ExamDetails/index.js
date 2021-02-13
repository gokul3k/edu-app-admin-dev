import React, { useState, useEffect } from "react";
import SimpleLoading from "../../../../components/loading/SimpleLoading";
import api from "../../../../api/api";
import { getCredentials } from "../../../../services/authService";
import ExamDetailsMenu from "../../../../components/menu/ExamDetailsMenu";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Chip, Grid } from "@material-ui/core";
import Details from "./Details";
import Instructions from "./Instructions";
import Questions from "./Questions";
import { getExam } from "../../../../actions/examActions";
import ExamMarkList from './ExamMarkList'
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";
import MarkList from "../MarkLIst";
import ExamAssignStudents from "./ExamAssignStudents";
import EditQuestions from "./EditQuestions";
import SnackBar from "components/SnackBar";

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    display: " flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
export default function ExamDetails(props) {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const exam = useSelector((state) => state.exam);
  const { loading, details, instructions, questions,counts } = exam;
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const [update, setUpdate] = useState(true)
  const [pgs, setPgs] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
 
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getExam(props.match.params.id));
  }, []);
  useEffect(() => {
    setStatus(details.status);
  }, [loading]);
  const disableExam = async (id) => {
    try {
      const { data } = await api.post(
        "/admin/toggleExamStatus",
        { examId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCredentials()}`,
          },
        },
        { timeout: 1000 }
      );
      dispatch(getExam(props.match.params.id));
      // setProgress(false)
    } catch (error) {
      console.log(error);
    }
  };
  const editExam = async (values) => {
    try {
      const res = await api.post(
        "/admin/editExam",
        { exam:values},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCredentials()}`,
          },
        },
        { timeout: 1000 }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onEditClicked = () => {
    setEdit(!edit);
  };

  const onAssignClicked = () => {
    props.history.push("/app/exams/details/" + props.match.params.id + "/assignStudents");
  }
  const onDeleteClicked = () => { };
  const onDisableClicked = () => {
    // setProgress(true)
    disableExam(props.match.params.id);
    // dispatch(getExam(props.match.params.id))
  };
  const onEdit = async (values, mode) => {
    switch (mode) {
      case "details":
        editExam(values);
        dispatch(getExam(props.match.params.id));
        setEdit(false);
        break;

      case "instructions":
        setEdit(false);
        break;

      case "questions":
        setEdit(false);
        break;
    }
  };
  const updateQuestions = () => {
    setUpdate(true)
    setOpen(true)
  }
  const replaceQuestions = () => {
    setUpdate(false)
    setOpen(true)
  }
  const handleSubmit =async () => {
    console.log("ekfbajksnflkn")
    // setProgress(false)
    setPgs(false)
    try {
      const resp = await api.post(update?'/admin/insertAdditionalQuestions':"/admin/replaceQuestions", { examId:details.id,questions:data },
      {
        headers: {
          Authorization: `Bearer ${getCredentials()}`,
          "Content-Type": "application/json",
        },
      }
      );
      // setProgress(true)
      setOpen(false)
      window.location.reload(false);
      

    } catch (error) {
      // setProgress(true)
      console.log(error)
      setPgs(true)


    }
  };

  if (loading && !progress) {
    console.log("d", !!details);
    return <SimpleLoading />;
  } else
    return (
      <div>
        <EditQuestions open={open} handleSubmit={handleSubmit} handleClose={handleClose} update={update} data={data} setData={setData}/>
        <SnackBar open={pgs} message={update?"An error has occured":"An error has occured or exam is on progress. Cannot replace question sheet now !!"} severity="error" setOpen={setPgs} />
        <Switch>
          <Route path="/app/exams/details/:id/marklist" component={ExamMarkList} />
          <Route path="/app/exams/details/:id/assignStudents" component={ExamAssignStudents} />
          <Route
            path="/app/exams/details/:id"
            render={() => (
              <div>
                <div className={classes.menuContainer}>
                  <div></div>
                  <ExamDetailsMenu
                    onEditClicked={onEditClicked}
                    onDeleteClicked={onDeleteClicked}
                    onDisableClicked={onDisableClicked}
                    onAssignClicked={onAssignClicked}
                    onUpdateQuestionsClicked={updateQuestions}
                    onReplaceQuestionsClicked={replaceQuestions}
                    disabled={details.Status === "active"}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      props.history.push("/app/exams/details/" + props.match.params.id + "/marklist")
                    }
                  >
                    Mark list
          </Button>
                </div>
                {details.Status && (
                  <Chip
                    size="small"
                    label={details.Status}
                    color={
                      details.Status === "active" ? "primary" : "secondary"
                    }
                  />
                )}
                <Details details={details} edit={edit} onEdit={onEdit} counts={counts} />
                <Instructions
                  edit={false}
                  onEdit={onEdit}
                  instructions={instructions}
                />
                <Questions questions={questions} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
}
