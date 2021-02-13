// import { STORAGE_KEYS } from '../../constants';
import Cookie from 'js-cookie';

const isLoggedIn = () => {
    console.log("admtk",Cookie.get("admtk")?true:false);
    // return localStorage.getItem("tk")? true:false;
    return Cookie.get("admtk") ? true:false;
};

export default isLoggedIn;
