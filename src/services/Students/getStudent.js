import api from "../../api/api";
import {getCredentials} from '../authService'

export default async function getStudent(id) {
try {
  const response = await api.post("/admin/getStudentDetails",{id}, {
    headers: { 
      Authorization: `Bearer ${getCredentials()}`,
      "Content-Type": "application/json",
        },
      },
      {timeout:1000}
  );
  return response.data.response;
} catch (error) {
  console.log(error,"rol");
}
}
