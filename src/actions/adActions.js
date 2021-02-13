import api from '../api/api';
import {GET_ALL_ADS_FAIL,GET_ALL_ADS_REQUEST,GET_ALL_ADS_SUCCESS} from '../constants/adConstants';
import { getCredentials } from '../services/authService';

const getAllAds = () => { 
    return async (dispatch) => {
        try {
            dispatch({type:GET_ALL_ADS_REQUEST})
            const { data } = await api.post(
                '/admin/getAllAds',
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
                type: GET_ALL_ADS_SUCCESS,
                payload: data.response,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_ADS_FAIL
            });
            console.log(error);
        }
    };
};

const deleteAd = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.post(
                '/admin/deleteAd',
                {id},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCredentials()}`,
                    },
                },
                {timeout:1000}
            );
            dispatch(getAllAds());
        } catch (error) {
            console.log(error);
        }
    };
};

export {getAllAds, deleteAd}