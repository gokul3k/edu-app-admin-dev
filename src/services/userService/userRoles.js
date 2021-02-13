import axios from "axios";
import { get } from "js-cookie";
import api from "../../api/api";
import {getCredentials} from '../authService'

export default async function getUserRoles() {
try {
  const response = await api.post("/getFeatures",{}, {
    headers: { 
      Authorization: `Bearer ${getCredentials()}`,
      "Content-Type": "application/json",
        },
      },
      {timeout:1000}
  );
  console.log("roles",response.data.response)
  return response.data.response;
} catch (error) {
  console.log(error,"rol");
}
}
