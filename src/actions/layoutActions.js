
import {TOGGLE_SIDEBAR} from '../constants/layoutConstants';

const toggleSidebar = () => (dispatch) => {
    console.log("here")
    dispatch({ type: TOGGLE_SIDEBAR });
};

export {toggleSidebar}