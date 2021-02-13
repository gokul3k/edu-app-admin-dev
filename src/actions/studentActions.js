import {SET_SELECTED_STUDENTS,RESET_SELECTED_STUDENTS} from '../constants/studentConstants.js';

const setSelectedStudents = (data) => (dispatch) => {
    dispatch({ type: SET_SELECTED_STUDENTS, payload:data });
}
const resetSelectedStudents = () => (dispatch) => {
    dispatch({ type: RESET_SELECTED_STUDENTS});
}

export {setSelectedStudents,resetSelectedStudents}