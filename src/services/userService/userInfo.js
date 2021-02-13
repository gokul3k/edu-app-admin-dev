export const setUserInfo = (email,name,role)=>{
    localStorage.setItem("email",email);
    localStorage.setItem("name",name);
    localStorage.setItem("role",role);
}
export const getUserInfo = ()=>{
    return {email:localStorage.getItem("email"),name:localStorage.getItem("name"),role:localStorage.getItem("role")}
}