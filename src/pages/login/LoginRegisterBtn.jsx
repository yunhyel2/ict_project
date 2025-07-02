import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { URL } from "/config/constants";
import { UsersContext } from "/context/UsersContext";

export default function LoginRegisterBtn() {
    const { usersInfo = {} } = useContext(UsersContext);
    const { auth } = usersInfo;
    const isLogin = !!auth;

    if (isLogin) return null;

    return <>
        <NavLink to={URL.LOGIN} className="btn border border-gray border-radius-12 p-3">로그인</NavLink>
        <NavLink to={URL.REGISTER} className="btn border border-gray border-radius-12 p-3">회원가입</NavLink>
    </>
}