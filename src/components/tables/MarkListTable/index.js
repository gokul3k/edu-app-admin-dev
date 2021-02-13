/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";

import {
  AddBox,
  ArrowDownward,
  Search,
  Clear,
  FirstPage,
  LastPage,
  ChevronLeft,
  FilterList,
  Check,
  DeleteOutline,
  Edit,
  SaveAlt,
  Delete,
  ViewColumn,
  ChevronRight,
  Remove,
  PhoneDisabled,
  PersonAddDisabled,
  Refresh
} from "@material-ui/icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
  },
}));
const MarkListTable = ({ history, data, remoteData, loading=false, studentId, examId, isStudentTable = true,
  types = ["AptitudeTotal", "AptitudeOutOf", "CommunicationTotal", "CommunicationOutOf", "LogicalTotal", "LogicalOutOf", "TechnicalTotal", "TechnicalOutOf"] }) => {
  const tableRef = React.createRef();

  const classes = useStyles();
  // const selectedStudents = useSelector((state) => state.selectedStudents);
  const dispatch = useDispatch();

  const tableStudentColumns = [
    { title: "Exam Id", field: "ExamId", align: "left" },
    { title: "Exam title", field: "Title", align: "left" },
    { title: "Marks", field: "Total", align: "left" },
    { title: "Aptitude Score", field: "AptitudeTotal" },
    { title: "Aptitude Total", field: "AptitudeOutOf" },
    { title: "Communication Score", field: "CommunicationTotal" },
    { title: "Commuincation Total", field: "CommunicationOutOf" },
    { title: "Logical Score", field: "LogicalTotal" },
    { title: "Logical Total", field: "LogicalOutOf" },
    { title: "Technical Score", field: "TechnicalTotal" },
    { title: "Technical Total", field: "TechnicalOutOf" },
    { title: "Total", field: "TotalOutOf", align: "left" },
  ];

  const addStudentColumns = (types) => {
    types.map((type) =>
      tableStudentColumns.push({ title: type, feild: [type] })
    )
  }
  const tableExamColumns = [
    { title: "Student Id", field: "StudentId", align: "left" },
    { title: "Email", field: "Email", align: "left" },
    { title: "Marks", field: "Total", align: "left" },
    { title: "Aptitude Score", field: "AptitudeTotal" },
    { title: "Aptitude Total", field: "AptitudeOutOf" },
    { title: "Communication Score", field: "CommunicationTotal" },
    { title: "Commuincation Total", field: "CommunicationOutOf" },
    { title: "Logical Score", field: "LogicalTotal" },
    { title: "Logical Total", field: "LogicalOutOf" },
    { title: "Technical Score", field: "TechnicalTotal" },
    { title: "Technical Total", field: "TechnicalOutOf" },
    { title: "Total", field: "TotalOutOf", align: "left" },
  ];

  const addExamColumns = (types) => {
    types.map((type) =>
      tableExamColumns.push({ title: type, field: [type] })
    )
  }

  // useEffect(() => {
  //   isStudentTable ? addStudentColumns(types) : addExamColumns(types)
  //   return () => {

  //   }
  // }, [])
  const tableOptions = {
    search: true,
    filtering: true,
    exportButton: true,
    headerStyle: {
      backgroundColor: '#1a73e8',
      color: '#FFF'
    }
  };

  const actionsOptions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      exportButton: true,
      // onClick: () => tableRef.current && tableRef.current.onQueryChange,
      onClick: () => remoteData(null)
    }
  ]

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const searchHandler = (text) => {            // 6
    // setSearchText(text);
    tableRef.current.onSearchChange(text);  // 7
  }

  const handleRowclick = (id) => {
    history.push('/app/students/details/' + id)
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        options={tableOptions}
        icons={tableIcons}
        title="Mark list"
        columns={isStudentTable ? tableStudentColumns : tableExamColumns}
        data={data}
        isLoading={loading}
        actions={actionsOptions}
      />
    </div>
  );
};

export default MarkListTable;
