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
import Chip from '@material-ui/core/Chip';
import { icon } from "@fortawesome/fontawesome-svg-core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
    },
}));
const InterviewStudentTable = ({ history, data, remoteData, interviewId }) => {
    const tableRef = React.createRef();

    const classes = useStyles();


    const tableColumns = [
        // {
        //     title: 'Avatar', field: 'avatar', filtering: false, sorting: false,
        //     render: rowData => (
        //         <img style={{ height: 36, borderRadius: '50%' }} src={rowData.ProfilePic} />
        //     ),
        // },
        { title: "Id", field: "id", align: "left" },
        { title: "Name", field: "FullName", align: "left" },
        { title: "Email", field: "Email", align: "left" },
        { title: "10th Marks", field: "Cgpa10", align: "left" },
        { title: "10th Mark Type", field: "MarkType10", align: "left" },
        { title: "12th Marks", field: "Cgpa12", align: "left" },
        { title: "12th Mark Type", field: "MarkType12", align: "left" },
        { title: "Degree 1 Marks", field: "degree1", align: "left" },
        { title: "Degree 1 Mark Type", field: "degree1MarkType", align: "left" },
        {
            title: "Status", field: "Status", align: "left",
            render: rowData => (
                <Chip label={rowData.Status} color="primary"/>
            )
        }
    ];

    const tableOptions = {
        search: true,
        filtering: true,
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


    const handleRowclick = (id, status) => {
        if(status === 'pending'){
            history.push('/app/interviews/edit/'+id+'/'+interviewId);
        }
    }

    return (
        <div className={classes.root}>
            <MaterialTable
                options={tableOptions}
                icons={tableIcons}
                title="Students"
                columns={tableColumns}
                data={data}
                // isLoading={data.length === 0}
                actions={actionsOptions}
                onRowClick={(event, rowData) => { console.log(rowData.id, "r"); handleRowclick(rowData.id, rowData.Status) }}
            />
        </div>
    );
};

export default InterviewStudentTable;
