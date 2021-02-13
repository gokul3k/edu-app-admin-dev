import React, { useState } from 'react';
import {
    makeStyles,
    TextField,
    Grid,
    Select,
    MenuItem,
    Button
} from "@material-ui/core";
import { Formik, Field, FieldArray, Form } from 'formik';
import ChipInput from "material-ui-chip-input";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from '../SnackBar';
import api from '../../api/api';
import { getCredentials } from '../../services/authService';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    container: {
        display: 'flex',
        flex: 1,
    },
    label: {
        marginRight: 24,
        marginBottom: 24,
        fontWeight: "bold"
    },
    textField: {
        minHeight: 50,
        minWidth: 300,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#D3D3D3",
        padding: 5
    },
    form: {
        marginTop: 24,
    },
    dropDown: {
        height: 50,
        marginBottom: 24
    },
    row: {
        marginBottom: 24
    },
    and: {
        marginLeft: 18,
        marginRight: 18
    }
}));

const initialValues = {
    conditionName: '',
    conditions: [
        {
            lowerCgpa: '',
            lowerPercentage: '',
            upperCgpa: '',
            upperPercentage: ''
        },
    ],
    avgPackage: ''
};


const SuggestionForm = (props) => {
    const classes = useStyles();

    const [conditionTag, setConditionTag] = useState(['10th']);

    const [college, setCollege] = useState([]);

    const [improvement, setImprovement] = useState([]);

    const [sector, setSector] = useState([]);

    const [company, setCompany] = useState([]);

    const [course, setCourse] = useState([]);

    const [loading, setLoading] = useState(false);

    const [message, setMesssage] = useState('');

    const [severity, setSeverity] = useState('');

    const [open, setOpen] = useState(false);

    const handleCourseChange = (chips) => {
        setCourse(chips);
    }

    const handleCompanyChange = (chips) => {
        setCompany(chips);
    }

    const handleSectorChange = (chips) => {
        setSector(chips);
    }

    const handleCollegeChange = (chips) => {
        setCollege(chips);
    };

    const handleImprovementChange = (chips) => {
        setImprovement(chips);
    }

    const handleButtonClick = () => {
        props.history.push("/app/suggestion/list");
    }

    const checkConditionExist = async (conditionName) => {
        try {
            const res = await api.post(
                "/admin/checkConditionExist",
                {
                    conditionName
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                { timeout: 1000 }
            );
            console.log("CONDITON ", res.data);
            return res.data.response;
        } catch (error) {
            setMesssage('Something went wrong');
            setSeverity('error');
            setOpen(true);
            console.log(error);
        }
    }

    const saveSuggestion = async (conditions, conditionName, avgPackage) => {
        try {
            setLoading(true);
            await api.post(
                "/admin/saveSuggestion",
                {
                    conditions,
                    conditionName,
                    colleges: college,
                    improvements: improvement,
                    courses: course,
                    companies: company,
                    sectors: sector,
                    avgPackage
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
            setMesssage('Suggestion succesfully created');
            setSeverity('success');
            setOpen(true);
            setTimeout(()=>{props.history.replace("/app/suggestion/list")},1000);
        } catch (error) {
            setLoading(false);
            setMesssage('Suggestion creation failed');
            setSeverity('error');
            setOpen(true);
            console.log(error);
        }
    }

    return (
        <div className={classes.container}>
            {loading && (
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
            )}
            {open && (
                <SnackBar open={open} message={message} severity={severity} setOpen={setOpen} />
            )}
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    conditionTag.map((condition, index) => {
                        values.conditions[index].condition = condition;
                    });
                    var flag = false;
                    values.conditions.forEach(cond => {
                        if (cond.lowerCgpa == '' || cond.lowerPercentage == '' || cond.upperCgpa == '' || cond.upperPercentage == '') {
                            flag = true;
                        }
                    });
                    if (flag || values.conditionName == '' || values.avgPackage == '' || college.length == 0 || improvement.length == 0 || course.length == 0 || company.length == 0 || sector.length == 0) {
                        setMesssage('Fields cannot be empty');
                        setSeverity('error');
                        setOpen(true);
                    }else if (await checkConditionExist(values.conditionName)) {
                        setMesssage('Condition name already exist');
                        setSeverity('error');
                        setOpen(true);
                    } else {
                        saveSuggestion(values.conditions, values.conditionName, values.avgPackage);
                    }
                }}
            >
                {({ values }) => (
                    <Form className={classes.form}>
                        <Grid
                            container
                            direction="column"
                        >
                            <Grid
                                className={classes.row}
                                container
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label} >Condition Name : </label>
                                </Grid>
                                <Grid item xs>
                                    <Field
                                        className={classes.textField}
                                        name="conditionName"
                                        placeholder="name"
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
                            <FieldArray name="conditions">
                                {({ insert, remove, push }) => (
                                    <>
                                        {values.conditions.map((condition, index) => (
                                            <Grid
                                                container
                                                direction="column"
                                                className={classes.row}
                                                justify="space-between"
                                            >
                                                <label className={classes.label} >Set Condition {index + 1} :</label>
                                                <Select
                                                    className={classes.dropDown}
                                                    labelId='demo-simple-select-label'
                                                    id='conditionTag'
                                                    variant='outlined'
                                                    size="small"
                                                    value={conditionTag[index]}
                                                    onChange={(event) => {
                                                        var items = [...conditionTag];
                                                        items[index] = event.target.value;
                                                        setConditionTag(items);
                                                    }}
                                                >
                                                    <MenuItem value='10th'>10th Standard</MenuItem>
                                                    <MenuItem value='12th'>12th Standard</MenuItem>
                                                    <MenuItem value='degree'>Degree</MenuItem>
                                                    <MenuItem value='communication'>Communication</MenuItem>
                                                    <MenuItem value='aptitude'>Aptitude</MenuItem>
                                                    <MenuItem value='logical'>Logical Reasoning</MenuItem>
                                                    <MenuItem value='technical'>Technical</MenuItem>
                                                </Select>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    className={classes.row}
                                                    justify="space-around"
                                                    alignItems="center"
                                                >
                                                    <label className={classes.label}>Lower Limit :</label>
                                                    <Field
                                                        className={classes.textField}
                                                        name={`conditions.${index}.lowerCgpa`}
                                                        placeholder="CGPA"
                                                        type="text"
                                                    />
                                                    <label className={classes.and}>and</label>
                                                    <Field
                                                        className={classes.textField}
                                                        name={`conditions.${index}.lowerPercentage`}
                                                        placeholder="Percentage"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    className={classes.row}
                                                    justify="space-around"
                                                    alignItems="center"
                                                >
                                                    <label className={classes.label}>Upper Limit :</label>
                                                    <Field
                                                        className={classes.textField}
                                                        name={`conditions.${index}.upperCgpa`}
                                                        placeholder="CGPA"
                                                        type="text"
                                                    />
                                                    <label className={classes.and}>and</label>
                                                    <Field
                                                        className={classes.textField}
                                                        name={`conditions.${index}.upperPercentage`}
                                                        placeholder="Percentage"
                                                        type="text"
                                                    />
                                                </Grid>
                                                {
                                                    (index === 0) ?
                                                        null
                                                        :
                                                        <Button
                                                            type="button"
                                                            className="secondary"
                                                            onClick={() => remove(index)}
                                                        >
                                                            X
                                                        </Button>
                                                }
                                            </Grid>
                                        ))}
                                        <Button
                                            type="button"
                                            className="secondary"
                                            onClick={() => push({
                                                condition: '',
                                                lowerCgpa: '',
                                                lowerPercentage: '',
                                                upperCgpa: '',
                                                upperPercentage: ''
                                            })}
                                        >
                                            Add
                                        </Button>
                                    </>
                                )}
                            </FieldArray>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className={classes.row}
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label}>Set Colleges : </label>
                                </Grid>
                                <Grid item xs>
                                    <ChipInput
                                        className={classes.textField}
                                        variant="outlined"
                                        placeholder="eg: college 1 , college 2"
                                        helperText="Press enter after each college"
                                        onChange={(chips) => handleCollegeChange(chips)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className={classes.row}
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label}>Sectors To Improve : </label>
                                </Grid>
                                <Grid item xs>
                                    <ChipInput
                                        className={classes.textField}
                                        variant="outlined"
                                        placeholder="eg: improvement 1 , improvement 2"
                                        helperText="Press enter after each improvement"
                                        onChange={(chips) => handleImprovementChange(chips)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className={classes.row}
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label}>Courses To Pursue : </label>
                                </Grid>
                                <Grid item xs>
                                    <ChipInput
                                        className={classes.textField}
                                        variant="outlined"
                                        placeholder="eg: course 1 , course 2"
                                        helperText="Press enter after each course"
                                        onChange={(chips) => handleCourseChange(chips)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className={classes.row}
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label}>Offering Companies : </label>
                                </Grid>
                                <Grid item xs>
                                    <ChipInput
                                        className={classes.textField}
                                        variant="outlined"
                                        placeholder="eg: company 1 , company 2"
                                        helperText="Press enter after each company"
                                        onChange={(chips) => handleCompanyChange(chips)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className={classes.row}
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label}>Strong Sectors : </label>
                                </Grid>
                                <Grid item xs>
                                    <ChipInput
                                        className={classes.textField}
                                        variant="outlined"
                                        placeholder="eg: sector 1 , sector 2"
                                        helperText="Press enter after each sector"
                                        onChange={(chips) => handleSectorChange(chips)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className={classes.row}
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs>
                                    <label className={classes.label}>Average Package : </label>
                                </Grid>
                                <Grid item xs>
                                    <Field
                                        className={classes.textField}
                                        name="avgPackage"
                                        placeholder="Package"
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                            >
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    onClick={handleButtonClick}
                                >View Saved suggestions</Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    type="submit"
                                >Submit</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SuggestionForm;