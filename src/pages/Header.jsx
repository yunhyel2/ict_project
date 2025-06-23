import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { USERS } from "../config/constants";
import { UsersContext } from "../context/UsersContext";

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
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top" style={{ height: 55 }}>
            <div className="container-fluid">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}><i className="fa-solid fa-house" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="mynavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {!isLogin && <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>로그인</NavLink>}
                            {isLogin && <NavLink to="/logout" onClick={logout}>로그아웃</NavLink>}
                        </li>
                        <li className="nav-item">
                            {/* <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>회원</NavLink> */}
                            <NavLink to="/users-nested" className={({ isActive }) => isActive ? 'active' : ''}>회원</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/bbs" className={({ isActive }) => isActive ? 'active' : ''}>게시판</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/photo" className={({ isActive }) => isActive ? 'active' : ''}>사진 앨범</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}