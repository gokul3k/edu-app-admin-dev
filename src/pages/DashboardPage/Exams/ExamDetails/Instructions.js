import React, { useState, forwardRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button, Paper, TextField } from "@material-ui/core";

import {
  Add,
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
  ViewColumn,
  ChevronRight,
  Remove,
} from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 12,
    display:"flex",
    justifyContent:"flex-end"
  },
});
export default function Instructions({ instructions,edit,onEdit }) {
  const classes = useStyles();


  const tableColumns = [
    {
      title: "Instruction",
      field: "instruction",
      cellStyle: { width: "100%" },
      editComponent: (props) => (
        <TextField
          style={{ width: "100%" }}
          fullWidth
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("ins",instructions)
    setData(instructions);
    return () => {};
  }, []);
  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("new",newData)
          setData([...data, newData.instruction]);

          resolve();
        }, 0);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("new",newData)
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData.instruction;
          setData([...dataUpdate]);
          resolve();
        }, 0);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve();
        }, 0);
      }),
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
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
  const tableOptions = {
    filtering: false,
    search: false,
    sorting: false,
    pageSizeOptions: [5, 10],
  };

  return (
    <div className={classes.root}>
    <Paper>
      <MaterialTable
        columns={tableColumns}
        data={data.map((val)=>({instruction:val.Instruction}))}
        icons={tableIcons}
        editable={edit?editable:{}}
        disableElevation
        options={tableOptions}
        title="Instructions to be displayed to students"
      />
      <div className={classes.buttonContainer}>
       {edit&& (<Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={()=>{onEdit(data,"instructions")}}
        >
          Save
        </Button>)}
      </div>
      </Paper>
    </div>
  );
}
