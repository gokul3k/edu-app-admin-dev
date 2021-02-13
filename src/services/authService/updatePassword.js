import api from '../../api/api';
import setCredentials from "./setCredentials";

const updatePassword = async (token,password) => {
    try {
        const data = await api.post('/admin/resetPassword',{ encodedString:token,password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(data);
        // setCredentials(tk)
        return 200;
    } catch (err) {
        console.log(err);
        return 400;
    }
};
    
export default updatePassword;