import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { USERS, URL } from "/config/constants";
import { UsersContext } from "/context/UsersContext";

export default function LogoutBtn() {
    const { usersInfo = {}, dispatch } = useContext(UsersContext);
    const { auth } = usersInfo;
    const navigate = useNavigate();
    const isLogin = !!auth;

    const logout = e => {
        e.preventDefault();
        dispatch({ type: USERS.LOGOUT });
        navigate(URL.LOGIN);
    }

    // if (!isLogin) return null;

    return <NavLink to="/logout" onClick={logout} className="btn border border-gray border-radius-12 btn-sm">로그아웃</NavLink>
}