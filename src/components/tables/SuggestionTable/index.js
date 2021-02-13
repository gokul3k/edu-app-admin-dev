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
    TrainRounded,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import api from '../../../api/api';
import { getCredentials } from '../../../services/authService';
import DetailDialog from "./DetailDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
    },
}));

const SuggestionTable = () => {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState()
    const handleClose = ()=>{
        setOpen(false)
    }
    const classes = useStyles();

    const [suggestions, setSuggestions] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSuggestions();
    }, []);

    const getSuggestions = async() => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/getSuggestions",
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );

            setSuggestions(res.data.response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const deleteSuggestion = async(suggestionName) => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/deleteSuggestion",
                {
                    suggestionName
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            getSuggestions();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const tableColumns = [
        // { title: "Id", field: "id", align: "left" },
        { title: "Condition Name", field: "ConditionName", align: "left" },
        { title: "Colleges", field: "Colleges", align: "left" },
        { title: "Improvements", field: "Improvements", align: "left" },
        { title: "Courses", field: "Courses", align: "left" },
        { title: "Companies", field: "Companies", align: "left" },
        { title: "Sectors", field: "Sectors", align: "left" },
        { title: "Average Package", field: "AvgPackage", align: "left" },
    ];

    const editable = {
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                console.log("OLD", oldData);
                deleteSuggestion(oldData.ConditionName);
                resolve()
            })
    }

    const tableOptions = {
        search: true,
        filtering: true,
        actionsColumnIndex: -1,
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
const handleRowclick =(ConditionName)=>{
 setId(ConditionName)
 setOpen(TrainRounded)
}
    return(
        <div className={classes.root}>
           {open && ( <DetailDialog open={open} handleClose={handleClose} ConditionName={id} />)}
        <MaterialTable
            editable={editable}
            isLoading={loading}
            options={tableOptions}
            icons={tableIcons}
            title="Suggestions"
            columns={tableColumns}
            onRowClick={(event,rowData)=>{handleRowclick(rowData.ConditionName)}}
            data={suggestions}>
        </MaterialTable>
    </div>
    )
}

export default SuggestionTable;