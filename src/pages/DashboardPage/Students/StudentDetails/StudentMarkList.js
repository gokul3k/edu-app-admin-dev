import React,{useState,useEffect} from "react";
import MarkListTable from "components/tables/MarkListTable";
import api from 'api/api';
import {getCredentials} from 'services/authService'
import SimpleLoading from "components/loading/SimpleLoading";
export default function StudentMarkList(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    remoteData()
    return () => {
      
    }
  }, [])
    const remoteData = async () =>{
      try {
        setLoading(true);
        const response = await api.post("/admin/getStudentExams", { studentId:props.match.params.id }, {
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
  return (
    <div>
      {loading &&(<SimpleLoading open={loading}/>)}
      <MarkListTable
        data={data}
        loading={loading}
        studentId={props.match.params.id}
        history={props.history}
        remoteData={remoteData}
      />
    </div>
  );
}
