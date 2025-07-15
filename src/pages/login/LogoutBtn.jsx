import axios from "axios";
import { useAuth } from "/context/AuthContext";

export default function LogoutBtn() {
    const { logout } = useAuth();

    const onLogout = () => {
        axios.get("/api/auth/logout")
        logout();
    }

    return <button onClick={onLogout} className="btn border border-gray border-radius-12 btn-sm">로그아웃</button>
}