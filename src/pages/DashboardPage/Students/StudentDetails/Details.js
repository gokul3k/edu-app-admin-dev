import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getStudent } from "services/Students";
import { Avatar, Button, Grid, Typography, Card, CardContent } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SchoolIcon from '@material-ui/icons/School';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SimpleLoading from "components/loading/SimpleLoading";
import MyDocument from 'components/Resume'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import api from 'api/api';
import { getCredentials } from 'services/authService';
import StudentMarkList from './StudentMarkList';
import { Switch, Route, } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
    },
    colorBg: {
        backgroundColor: "#023e8a",
        height: 150
    },
    newPaper: {
        marginTop: 8
    },
    newPaper1: {
        marginTop: 32
    },
    card: {
        position: "relative",
    },
    avatar: {
        width: 150,
        height: 150,
        position: "absolute",
        marginTop: -75,
        marginLeft: 18
    },
    leftMargin: {
        marginLeft: 18
    },
    subHeading: {
        fontSize: 20,
        marginLeft: 18
    },
    inline: {
        display: 'inline',
    },
    date: {
        fontSize: 12
    },
    resumeButton: {
        padding: "8px 16px",
        marginLeft: 64,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderRadius: 5,
        maxWidth: 200,
        textAlign: "center",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: "black",
            textDecoration: "none",
            color: "white",
        },

    },
    button: {
        height: 40,
        marginLeft: 12
    },
    paper: {
        padding: 32,
        width: "100%"
    },
    divider: {
        margin: 16
    },
    fullName: {
        color: theme.palette.primary.light,
        fontSize: 22,
    },
    phone: {
        color: theme.palette.text.secondary,
        fontSize: 16,
    },
    email: {
        color: theme.palette.text.secondary,
        fontSize: 16,
    },
    id: {
        color: theme.palette.text.primary,
        fontSize: 16,
    },
    label: {
        color: theme.palette.secondary.light,
        marginRight: 4,
    }
}));

function Details(props) {
    const classes = useStyles();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStudentDetails(props.match.params.id);
    }, []);

    const getStudentDetails = async (studentId) => {
        try {
            setLoading(true);
            const response = await api.post("/admin/getStudentDetails", { studentId }, {
                headers: {
                    Authorization: `Bearer ${getCredentials()}`,
                    "Content-Type": "application/json",
                },
            },
                { timeout: 1000 }
            );

            console.log("STUD DETAILD ", response.data.response);
            setData(response.data.response);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    if (!loading) {
        return (
            <div className={classes.root}>

                <Grid container className={classes.newPaper} justify="center">
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardContent className={classes.card}>
                                <div className={classes.colorBg}></div>
                                <Avatar
                                    src={data.studentInfo.ProfilePic}
                                    alt={data.studentInfo.FullName}
                                    className={classes.avatar}
                                />
                                <Grid container direction="row" alignItems="center" justify="flex-end" style={{ marginTop: 14 }}>
                                    {
                                        data.studentInfo && (
                                            <PDFDownloadLink document={<MyDocument data={data} />} fileName="resume.pdf">
                                                {({ blob, url, loading, error }) => (loading ? null :
                                                    <Typography className={classes.resumeButton}>
                                                        Resume
                                                </Typography>
                                                )}
                                            </PDFDownloadLink>
                                        )
                                    }
                                    <Button className={classes.button} variant="contained" color="primary" onClick={() => props.history.push("/app/students/details/" + props.match.params.id + "/marklist")}>mark list</Button>
                                </Grid>

                                <Grid container direction="row" justify="space-between" style={{ marginTop: 8 }}>
                                    <Grid item direction="column" className={classes.leftMargin}>
                                        <Typography className={classes.fullName}>
                                            {data.studentInfo.FullName}
                                        </Typography>
                                        <Typography>
                                            {data.credDetails.Email}
                                        </Typography>
                                        <Typography>
                                            {data.addrDetails.AddressLine1}, {data.addrDetails.City}
                                        </Typography>
                                        <Typography>
                                            {data.addrDetails.State}, Phone {data.addrDetails.PhoneNo}
                                        </Typography>
                                    </Grid>
                                    <Grid item direction="column">
                                        <Typography style={{marginLeft:18}}>
                                            Gender <b>{data.studentInfo.Gender == 'M' ? 'MALE' : data.studentInfo.Gender == 'F' ? 'FEMALE' : 'TRANSGENDER'}</b>
                                        </Typography>
                                        <Typography style={{marginLeft:18}}>
                                            Date of Birth <b>{data.studentInfo.Dob}</b>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>


                <Grid container className={classes.newPaper1} justify="center">
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography className={classes.subHeading}>Schooling</Typography>

                                <List>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <SchoolIcon />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={data.acadDetails.SchoolName10}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {data.acadDetails.Board10}, {data.acadDetails.Location10}
                                                    </Typography>

                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <AccountBalanceIcon />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={data.acadDetails.SchoolName12}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {data.acadDetails.Board12}, {data.acadDetails.Location12}
                                                    </Typography>

                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>


                <Grid container className={classes.newPaper1} justify="center">
                    <Grid item xs={12} sm={9}>
                        <Card>
                            <CardContent className={classes.card}>
                                <Typography className={classes.subHeading}>Degrees</Typography>

                                <List>
                                    {
                                        data.degreeDetails.map((element) => {
                                            return (
                                                <>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <SchoolIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={element.CollegeName}
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography
                                                                        component="span"
                                                                        variant="body2"
                                                                        className={classes.inline}
                                                                        color="textPrimary"
                                                                    >
                                                                        {element.Degree}, {element.Location}
                                                                    </Typography>

                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </>
                                            )
                                        })
                                    }
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {
                    (data.certifications.length > 0) ? (
                        <Grid container className={classes.newPaper1} justify="center">
                            <Grid item xs={12} sm={9}>
                                <Card>
                                    <CardContent className={classes.card}>
                                        <Typography className={classes.subHeading}>Certifications</Typography>

                                        <List>
                                            {
                                                data.certifications.map((element) => {
                                                    return (
                                                        <>
                                                            <ListItem alignItems="flex-start">
                                                                <ListItemAvatar>
                                                                    <CardMembershipIcon />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={element.CertificationName}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                component="span"
                                                                                variant="body2"
                                                                                className={classes.inline}
                                                                                color="textPrimary"
                                                                            >
                                                                                {element.Institute}
                                                                            </Typography>

                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    )
                                                })
                                            }
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : null
                }

                {
                    (data.studentExperience.length > 0) ? (
                        <Grid container className={classes.newPaper1} justify="center">
                            <Grid item xs={12} sm={9}>
                                <Card>
                                    <CardContent className={classes.card}>
                                        <Typography className={classes.subHeading}>Experiences</Typography>

                                        <List>
                                            {
                                                data.studentExperience.map((element) => {
                                                    return (
                                                        <>
                                                            <ListItem alignItems="flex-start">
                                                                <ListItemAvatar>
                                                                    <CardMembershipIcon />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={element.CompanyName}
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                component="span"
                                                                                variant="body2"
                                                                                className={classes.inline}
                                                                                color="textPrimary"
                                                                            >
                                                                                {element.JobTitle}
                                                                            </Typography>
                                                                            <Typography className={classes.date}>{element.FromDate} to {element.ToDate.length<1?"Present":element.ToDate.length}</Typography>
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />
                                                        </>
                                                    )
                                                })
                                            }
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : null
                }

                {
                    (data.studentSkills.length > 0) ? (
                        <Grid container className={classes.newPaper1} justify="center">
                            <Grid item xs={12} sm={9}>
                                <Card>
                                    <CardContent className={classes.card}>
                                        <Typography className={classes.subHeading}>Skills</Typography>

                                        <List component="nav" aria-label="secondary mailbox folders">
                                            {
                                                data.studentSkills.map((element) => {
                                                    return (
                                                        <>
                                                            <ListItem>
                                                                <ListItemText primary={element.Skill} />
                                                            </ListItem>
                                                            <Divider />
                                                        </>
                                                    )
                                                })
                                            }
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : null
                }


                {/* <Paper className={classes.paper}>
                    <Grid>
                        <Grid container direction="row" spacing={3} alignItems="center">
                            <Grid item>
                                <Avatar
                                    src={data.studentInfo.ProfilePic}
                                    alt={data.studentInfo.FullName}
                                    className={classes.avatar}
                                />
                            </Grid>
                            <Grid item>
                                <Typography className={classes.fullName}>
                                    {data.studentInfo.FullName}
                                </Typography>
                                <Typography className={classes.id}>{data.credDetails.id}</Typography>
                                <Typography className={classes.email}>
                                    {data.credDetails.Email}
                                </Typography>
                                <Typography className={classes.phone}>
                                    {data.addrDetails.PhoneNo}
                                </Typography>
                                {
                                    data.studentInfo && (
                                        <PDFDownloadLink className={classes.link} document={<MyDocument data={data} />} fileName="resume.pdf">
                                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                                        </PDFDownloadLink>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid className={classes.divider}>
                            <Divider />
                        </Grid>
                        <Grid container direction="row" spacing={3}>
                            <Grid item>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>DOB</Typography>
                                    <Typography className={classes.val}>
                                        {data.studentInfo.Dob}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>Gender</Typography>
                                    <Typography className={classes.val}>
                                        {data.studentInfo.Gender}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>Register No</Typography>
                                    <Typography className={classes.val}>
                                        {data.studentInfo.RegNumber}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>Address line 1</Typography>
                                    <Typography className={classes.val}>{data.addrDetails.AddressLine1}</Typography>
                                </Grid>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>
                                        Address line2
                  </Typography>
                                    <Typography className={classes.val}>
                                        {data.addrDetails.AddressLine2}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>City/Town</Typography>
                                    <Typography className={classes.val}>
                                        {data.addrDetails.City}
                                    </Typography>
                                </Grid>
                                <Grid container direction="row">
                                    <Typography className={classes.label}>state</Typography>
                                    <Typography className={classes.val}>
                                        {data.addrDetails.State}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.divider}>
                            <Divider />
                        </Grid>
                        <Grid container direction="row" spacing={3}>
                            <Grid item xs>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>
                                        10th School name
                  </Typography>
                                    <Typography className={classes.val}>
                                        {data.acadDetails.SchoolName10}
                                    </Typography>
                                </Grid>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>CGPA/Percentage</Typography>
                                    <Typography className={classes.val}>{data.acadDetails.Cgpa10}</Typography>
                                </Grid>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>Board</Typography>
                                    <Typography className={classes.val}>{data.acadDetails.Board10}</Typography>
                                </Grid>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>Location</Typography>
                                    <Typography className={classes.val}>
                                        {data.acadDetails.Location10}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>
                                        12th School name
                  </Typography>
                                    <Typography className={classes.val}>
                                        {data.acadDetails.SchoolName12}
                                    </Typography>
                                </Grid>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>CGPA/Percentage</Typography>
                                    <Typography className={classes.val}>{data.acadDetails.Cgpa12}</Typography>
                                </Grid>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>Board</Typography>
                                    <Typography className={classes.val}>{data.acadDetails.Board12}</Typography>
                                </Grid>
                                <Grid item direction="row" spacing={3}>
                                    <Typography className={classes.label}>Location</Typography>
                                    <Typography className={classes.val}>
                                        {data.acadDetails.Location12}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.divider}>
                            <Divider />
                        </Grid>
                        {
                            data.degreeDetails.map(element => {
                                return (
                                    <Grid >
                                        <Grid item direction="row" spacing={3}>
                                            <Typography className={classes.label}>College name</Typography>
                                            <Typography className={classes.val}>
                                                {element.CollegeName}
                                            </Typography>
                                        </Grid>
                                        <Grid item direction="row" spacing={3}>
                                            <Typography className={classes.label}>CGPA/Percentage</Typography>
                                            <Typography className={classes.val}>{element.Cgpa}</Typography>
                                        </Grid>
                                        <Grid item direction="row" spacing={3}>
                                            <Typography className={classes.label}>degree</Typography>
                                            <Typography className={classes.val}>{element.Degree}</Typography>
                                        </Grid>
                                        <Grid item direction="row" spacing={3}>
                                            <Typography className={classes.label}>Location</Typography>
                                            <Typography className={classes.val}>{element.Location}</Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Paper> */}

            </div>
        );
    } else return <SimpleLoading />;
}

export default Details;
