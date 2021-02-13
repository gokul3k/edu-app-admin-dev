import {TOGGLE_SIDEBAR} from '../constants/layoutConstants';

function sidebarReducer(state={ isSidebarOpened: false},action){
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            console.log( !state.isSidebarOpened ,"state")
            return { ...state, isSidebarOpened: !state.isSidebarOpened };
        default:
            return state;
    }

}

export {sidebarReducer}