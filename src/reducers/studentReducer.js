import {SET_SELECTED_STUDENTS,RESET_SELECTED_STUDENTS} from '../constants/studentConstants.js';

function selectedStudentsReducer(state={selected:[]},action){
    switch (action.type) {
        case SET_SELECTED_STUDENTS:
            return {selected:action.payload};
        case RESET_SELECTED_STUDENTS:
            return {selected:[]};
        default:
            return state;
    }

}

export {selectedStudentsReducer}