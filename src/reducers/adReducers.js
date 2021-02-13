import { GET_ALL_ADS_FAIL, GET_ALL_ADS_REQUEST, GET_ALL_ADS_SUCCESS } from '../constants/adConstants';

function adsReducer(state = { loading: true, data: [] }, action) {
  switch (action.type) {
    case GET_ALL_ADS_REQUEST:
      return { loading: true, data: [] };
    case GET_ALL_ADS_SUCCESS:
      return {
        loading: false,
        data: action.payload
      };
    case GET_ALL_ADS_FAIL:
      return { loading: false, data: [] };
    default:
      return state;
  }
}

export { adsReducer }