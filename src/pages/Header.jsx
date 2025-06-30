import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { USERS, URL } from "/config/constants";
import Logo from "/components/Logo";
import { UsersContext } from "/context/UsersContext";
import classes from "./Header.module.scss";

export default function Header() {
    const { usersInfo = {}, dispatch } = useContext(UsersContext);
    const { auth } = usersInfo;
    const navigate = useNavigate();
    const isLogin = !!auth;

    const logout = e => {
        e.preventDefault();
        dispatch({ type: USERS.LOGOUT });
        navigate('/');
    }

    return <>
        <nav className={classes.header} style={{ height: 55 }}>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <Logo />
            </NavLink>
            <ul className="navbar-nav">
    <li className="nav-item">
        {/* [TODO]:: 유저 알림 구현 */}
    </li>
    <li className="nav-item">
        {!isLogin && (
            <>
                <NavLink to={URL.LOGIN} className={({ isActive }) => isActive ? 'active' : ''}>로그인</NavLink>
                <NavLink to={URL.REGISTER} className={({ isActive }) => isActive ? 'active' : ''}>회원가입</NavLink>
            </>
        )}
        {isLogin && (
            <NavLink to="/logout" onClick={logout}>로그아웃</NavLink>
        )}
    </li>
</ul>
        </nav>
    </>
}