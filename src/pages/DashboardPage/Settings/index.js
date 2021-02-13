import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Grid,
    Typography,
    Button
} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import api from '../../../api/api';
import { getCredentials } from '../../../services/authService';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 24,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        color: "#023e8a",
        margin: 16,
        fontWeight: "bold"
    },
    paper: {
        minHeight: 400
    },
    nested: {
        paddingLeft: theme.spacing(4),
        marginTop: 24,
        paddingRight: theme.spacing(4)
    },
    textField: {
        width: "100%"
    },
    button: {
        marginTop: 16
    }
}));

export default function Settings(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [defaultAbout, setDefaultAbout] = useState('');
    const [buttonText, setButtonText] = useState('Submit');

    useEffect(() => {
        getDefaultAboutUs();
    }, [])

    const formik = useFormik({
        initialValues: {
            aboutUs: defaultAbout
        },
        validationSchema: Yup.object({
            aboutUs: Yup.string().required('This field is required')
        }),
        onSubmit: (values) => {
            console.log(values);
            setDefaultAboutUs(values.aboutUs);
        },
        enableReinitialize: true
    });

    const handleSuggestionClick = () => {
        props.history.push("/app/suggestion");
    }

    const handleAboutClick = () => {
        setOpen(!open);
    }

    const setDefaultAboutUs = async (aboutUs) => {
        try {
            setButtonText('Saving...');
            const res = await api.post(
                "/admin/setDefaultAboutUs",
                {aboutUs},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );

            getDefaultAboutUs();
            setButtonText('Saved');
            setTimeout(() => {
                setButtonText('Submit');
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    const getDefaultAboutUs = async () => {
        try {
            const res = await api.post(
                "/admin/getDefaultAboutUs",
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            console.log("RESPON ", res.data);
            if(res.data.response.length > 0){
                setDefaultAbout(res.data.response[0].About);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.container}>
            <Grid
                container
                direction="column"
                justify="center"
            >
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>Settings</Typography>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button onClick={handleSuggestionClick}>
                            <ListItemIcon>
                                <AnnouncementIcon />
                            </ListItemIcon>
                            <ListItemText primary="Suggestions" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleAboutClick}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Set About" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <form noValidate className={classes.nested} onSubmit={formik.handleSubmit}>
                                <TextField
                                    error={!!formik.errors.aboutUs && formik.touched.aboutUs}
                                    helperText={
                                        !!formik.errors.aboutUs && formik.touched.aboutUs
                                            ? formik.errors.aboutUs
                                            : ''
                                    }
                                    className={classes.textField}
                                    id="filled-multiline-static"
                                    label="Default About"
                                    multiline
                                    name="aboutUs"
                                    rows={4}
                                    defaultValue={defaultAbout}
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    value={formik.values.aboutUs}
                                />
                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                >
                                    {buttonText}
                                </Button>
                            </form>
                        </Collapse>
                    </List>
                </Paper>
            </Grid>
        </div>
    )
}
