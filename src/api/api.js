import axios from 'axios';
export const BASE_URL = 'https://edu-app-server-beta.herokuapp.com';
const DEV_URL = 'https://edu-app-server-beta.herokuapp.com';

export default axios.create({
    baseURL: DEV_URL+'/rest/v1'
});
