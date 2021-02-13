import api from '../api/api';
import {GET_ALL_INTERVIEWS_FAIL,GET_ALL_INTERVIEWS_REQUEST,GET_ALL_INTERVIEWS_SUCCESS} from '../constants/interviewConstants';
import { getCredentials } from '../services/authService';

const getAllInterviews = () => { 
    return async (dispatch) => {
        try {
            dispatch({type:GET_ALL_INTERVIEWS_REQUEST})
            const { data } = await api.post(
                '/admin/getInterviews',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            dispatch({
                type: GET_ALL_INTERVIEWS_SUCCESS,
                payload: data.response,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_INTERVIEWS_FAIL
            });
            console.log(error);
        }
    };
};


export {getAllInterviews};