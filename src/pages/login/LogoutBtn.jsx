import { NavLink } from "react-router-dom";
import { useAuth } from "/context/AuthContext";

export default function LogoutBtn() {
    const { logout } = useAuth();

    const onLogout = e => {
        e.preventDefault();
        logout();
    }

    return <NavLink to="/logout" onClick={onLogout} className="btn border border-gray border-radius-12 btn-sm">로그아웃</NavLink>
}