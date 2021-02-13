import { GET_ALL_INTERVIEWS_FAIL,GET_ALL_INTERVIEWS_REQUEST,GET_ALL_INTERVIEWS_SUCCESS } from '../constants/interviewConstants';

function interviewReducer(state = { loading: true, data: [] }, action) {
  switch (action.type) {
    case GET_ALL_INTERVIEWS_REQUEST:
      return { loading: true, data: [] };
    case GET_ALL_INTERVIEWS_SUCCESS:
      return {
        loading: false,
        data: action.payload
      };
    case GET_ALL_INTERVIEWS_FAIL:
      return { loading: false, data: [] };
    default:
      return state;
  }
}

export { interviewReducer }