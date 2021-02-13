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
    PersonAdd
} from "@material-ui/icons";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllAds, deleteAd } from '../../../actions/adActions';
import AssignStudents from './AssignStudents'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const AdTable = (props) => {
    const classes = useStyles();
    const ads = useSelector((state) => state.ads);
    const { loading, data } = ads;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        dispatch(getAllAds());
    }, []);


    const tableColumns = [
        { title: "Id", field: "id", align: "left" },
        { title: "Ad Name", field: "AdName", align: "left" },
        { title: "Ad Type", field: "AdType", align: "left" },
        { title: "Ad Zone", field: "AdZone", align: "left" },
    ];

    const editable = {
        onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                console.log("OLD", oldData);
                dispatch(deleteAd(oldData.id));
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

    return (
        <div className={classes.root}>

            {loading && (
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
             { open &&id&& (<AssignStudents id={id} open={open} handleClose={handleClose} />) }
            <MaterialTable
                editable={editable}
                isLoading={false}
                options={tableOptions}
                icons={tableIcons}
                title="Advertisements"
                columns={tableColumns}
                actions={[
                    {
                        icon: ()=><PersonAdd />,
                        tooltip: 'Assign Students',
                        onClick: (event, rowData) =>{setId(rowData.id);setOpen(true)}

                    }
                ]}
                data={data}>
            </MaterialTable>
        </div>
    );
}

export default AdTable;