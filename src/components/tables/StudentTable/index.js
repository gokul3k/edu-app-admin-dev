/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect,useState } from "react";
import MaterialTable from "material-table";

import { setSelectedStudents,resetSelectedStudents } from "../../../actions/studentActions";
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
const StudentTable = ({history,data,remoteData,minimal=false}) => {
  const tableRef = React.createRef();

  const classes = useStyles();
    // const selectedStudents = useSelector((state) => state.selectedStudents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSelectedStudents());
  }, []);

  const tableColumns = [
    // { title: 'Avatar',field: 'avatar', filtering: false,sorting: false,
    //   render: rowData => (
    //     <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar}/>
    // ),},
    { title: "Id", field: "id", align: "left" },
    { title: "Name", field: "FullName", align: "left" },
    { title: "10th Marks", field: "Cgpa10", align: "left" },
    { title: "10th Mark Type", field: "MarkType10", align: "left" },
    { title: "12th Marks", field: "Cgpa12", align: "left" },
    { title: "12th Mark Type", field: "MarkType12", align: "left" },
    { title: "Degree Marks", field: "degree1", align: "left" },
    { title: "Degree Mark Type", field: "degree1MarkType", align: "left" },
    // { title: "Degree 2 Marks", field: "degree2", align: "left" },
    // { title: "Degree Mark Type", field: "degree1", align: "left" },
    // { title: "Degree 3 Marks", field: "degree3", align: "left" },
    // { title: "Degree Mark Type", field: "degree1", align: "left" },
    { title: "Email", field: "Email", align: "left" },
    { title: "City/Town", field: "City", align: "left" },
    { title: "Date of Birth", field: "Dob", align: "left" },
    { title: "Interviews Attended", field: "InterviewsAttended", align: "left" },
    // { title: "Certification Name", field: "InterviewsAttended", align: "left" },
    // { title: "Experience", field: "InterviewsAttended", align: "left" },
    // { title: "HSST score", field: "score", align: "left" },
    // { title: "Category", field: "Category", align: "left" ,lookup:{active:"active",inactive:'inactive'}},
  ];
  const tableColumnsMinimal = [
    // { title: 'Avatar',field: 'avatar', filtering: false,sorting: false,
    //   render: rowData => (
    //     <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar}/>
    // ),},
    { title: "Id", field: "id", align: "left" },
    { title: "Name", field: "FullName", align: "left" },
    // { title: "10th Marks", field: "Cgpa10", align: "left" },
    // { title: "12th Marks", field: "Cgpa12", align: "left" },
    { title: "Degree Marks", field: "degree1", align: "left" },
    { title: "Email", field: "Email", align: "left" },
    // { title: "Skills", field: "InterviewsAttended", align: "left" },
    { title: "Date of Birth", field: "Dob", align: "left" },
    { title: "Interviews Attended", field: "InterviewsAttended", align: "left" },
    // { title: "Certification Name", field: "InterviewsAttended", align: "left" },
    // { title: "Experience", field: "InterviewsAttended", align: "left" },
  ];

  const tableOptions = {
    search: true,
    selection: true,
    filtering: true,
    exportButton: true,
    headerStyle: {
      backgroundColor: '#1a73e8',
      color: '#FFF'
    }
  };

  const actionsOptions=[
    {
      icon: ()=><Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      exportButton: true,
      // onClick: () => tableRef.current && tableRef.current.onQueryChange,
      onClick:()=>remoteData(null)
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
 
 const searchHandler = (text)=>{            // 6
    // setSearchText(text);
    tableRef.current.onSearchChange(text);  // 7
 }

  const handleRowclick=(id)=>{
    history.push('/app/students/details/'+id)  }

  return (
    <div className={classes.root}>
      <MaterialTable
        options={tableOptions}
        icons={tableIcons}
        title="Students"
        columns={minimal?tableColumnsMinimal:tableColumns}
        data={data}
        // isLoading={data.length===0}
        actions={actionsOptions}
        onSelectionChange={(rows) => dispatch(setSelectedStudents(rows))}
        onRowClick={(event,rowData)=>{handleRowclick(rowData.id)}}
      />
    </div>
  );
};

export default StudentTable;
