import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import api from 'api/api';
import { getCredentials } from 'services/authService'
import MaterialTable from "material-table";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DetailDialog({ open, handleClose, ConditionName }) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const columns = [
        { title: "No", field: "ConditionNo", align: "left" },
        { title: "ConditionTag", field: "ConditionTag", align: "left" },
        { title: "LowerCgpa", field: "LowerCgpa", align: "left" },
        { title: "LowerPercentage", field: "LowerPercentage", align: "left" },
        { title: "UpperCgpa", field: "UpperCgpa", align: "left" },
        { title: "UpperPercentage", field: "UpperPercentage", align: "left" },

    ];
    const getDetail = async (ConditionName) => {
        try {
            setLoading(true);
            const res = await api.post(
                "/admin/getConditions",
                {
                    conditionName: ConditionName
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            setLoading(false);
            console.log(res.data.response)
            setData(res.data.response)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    const tableOptions = {
        search: false,
        filtering: false,
        // header:false,
        paging: false,
        toolbar:false,
        showTitle:false,
        headerStyle:{
            backgroundColor:"transparent"
        }
    };
    useEffect(() => {
        getDetail(ConditionName)
        return () => {

        }
    }, [ConditionName])
    return (
        <div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}
                maxWidth="lg" >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {ConditionName}
                </DialogTitle>
                <DialogContent dividers>
                    <MaterialTable
                    
                        isLoading={loading}
                        options={tableOptions}
                        columns={columns}
                        data={data}
                        style={{ zIndex: 0, border: "1px solid ", borderRadius: 5 }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}