import React, { useEffect, useState } from 'react';
import AddInterviewComponent from '../../../../components/AddInterviewComponent';
import StudentTable from '../../../../components/tables/StudentTable';
import {getCredentials} from '../../../../services/authService';
import api from '../../../../api/api';

export default function AddInterview(props) {
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
        remoteData();
    }, []);


    return ( 
        <div>
            <AddInterviewComponent history={props.history}/>
            <StudentTable history={props.history} data={data} remoteData={remoteData} />
        </div>
    );
}  