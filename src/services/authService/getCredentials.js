import Cookies from 'js-cookie'

const getCredentials = () => {
     const tk = Cookies.get("admtk")
    // return localStorage.getItem("tk")
    return tk;
};

export default getCredentials;
