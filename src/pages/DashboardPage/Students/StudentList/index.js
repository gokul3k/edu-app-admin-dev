import React, { useState, useEffect } from 'react';
import StudentTable from '../../../../components/tables/StudentTable';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import api from "../../../../api/api";
import { getCredentials } from "../../../../services/authService";
import StudentListMenu from '../../../../components/menu/StudentListMenu'
import { useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
    btn: {},
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
export default function ExamList(props) {
    const selectedStudents = useSelector((state) => state.selectedStudents);
    const { selected } = selectedStudents;
    const classes = useStyles();
    const goToMail = () => {
        props.history.push('/app/students/mail')
    }
    const [data, setData] = useState([])

    const remoteData = async () => {
        api.post(
            '/admin/getStudents',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCredentials()}`,
                },
            },
            { timeout: 1000 }
        ).then((res) => {
            console.log("res", res)
            setData(res.data.response)
        })
            .catch((err) => { console.log(err); })


    }
    useEffect(() => {
        remoteData()
        return () => {

        }
    }, [])

    const assignStudents = async () => {
        return
    }
    return (
        <div>
            <div className={classes.btnContainer}>
                <div></div>
                {selected.length > 0 && (
                    <StudentListMenu goToMail={goToMail} assignStudents={assignStudents} />
                )}
          
            </div>
            <StudentTable history={props.history} data={data} remoteData={remoteData} />
        </div>
    );
}
