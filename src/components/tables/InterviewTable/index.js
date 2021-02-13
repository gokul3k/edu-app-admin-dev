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
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllInterviews } from "actions/interviewActions";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
    },
}));

const InterviewTable = ( {history}) => {

    const classes = useStyles();
    const interviews = useSelector((state) => state.interviews);
    const { loading, data } = interviews;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllInterviews());
    }, []);

    const tableColumns = [
        { title: "Id", field: "id", align: "left" },
        { title: "Interview Name", field: "InterviewName", align: "left" },
        { title: "Interview By", field: "InterviewBy", align: "left" },
        { title: "Date", field: "Date", align: "left" },
        { title: "Total Candidates", field: "TotalCandidates", align: "left" },
        { title: "Status", field: "Status", align: "left" },
    ];

    const tableOptions = {
        search: true,
        filtering: true,
        headerStyle: {
            backgroundColor: '#1a73e8',
            color: '#FFF'
          }
    };

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

    const handleRowclick = (id) => {
        history.push('/app/interviews/detail/'+id);
    }

    return (
        <div className={classes.root}>
            <MaterialTable
                // editable={editable}
                isLoading={loading}
                options={tableOptions}
                icons={tableIcons}
                title="Interviews"
                columns={tableColumns}
                data={data}
                onRowClick={(event, rowData) => {
                    handleRowclick(rowData.id);
                }}
                >
            </MaterialTable>
        </div>
    );
}

export default InterviewTable;